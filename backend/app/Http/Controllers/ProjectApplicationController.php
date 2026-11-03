<?php

namespace App\Http\Controllers;

use App\Mail\ProjectApplicationConfirmation;
use App\Mail\ProjectApplicationReceived;
use App\Models\Project;
use App\Models\ProjectApplication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ProjectApplicationController extends Controller
{
    public function mine(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'expert', 403, 'Only expert accounts can view applications.');
        $expertProfile = $request->user()->expertProfile;
        abort_unless($expertProfile, 422, 'Complete your expert profile before viewing applications.');

        $applications = ProjectApplication::query()
                ->with('project.companyProfile:id,company_name,industry,location')
                ->where('expert_profile_id', $expertProfile->id)
                ->latest()
                ->get();

        $applications->each(fn (ProjectApplication $application) => $application->project?->makeHidden('attachments'));
        $applications->each(fn (ProjectApplication $application) => $application->makeHidden('resume_path'));

        return response()->json(['data' => $applications]);
    }

    public function companyIndex(Request $request): JsonResponse
    {
        abort_unless($request->user()->role === 'company', 403, 'Only company accounts can view incoming applications.');

        $applications = ProjectApplication::query()
            ->with(['project.companyProfile:id,company_name,industry,location', 'expertProfile.user:id,name,email'])
            ->whereHas('project', fn ($query) => $query->where('user_id', $request->user()->id))
            ->latest()
            ->get();

        $applications->each(function (ProjectApplication $application): void {
            $application->project?->makeHidden('attachments');
            $application->makeHidden('resume_path');
        });

        return response()->json(['data' => $applications]);
    }

    public function resume(Request $request, ProjectApplication $application): StreamedResponse
    {
        abort_unless($request->user()->role === 'company', 403, 'Only company accounts can download applicant resumes.');
        abort_unless($application->project()->where('user_id', $request->user()->id)->exists(), 404);
        abort_unless($application->resume_path && Storage::disk('local')->exists($application->resume_path), 404);

        return Storage::disk('local')->download($application->resume_path, $application->resume_name ?: 'resume');
    }

    public function store(Request $request, Project $project): JsonResponse
    {
        abort_unless($request->user()->role === 'expert', 403, 'Only expert accounts can apply to projects.');
        abort_unless($project->status === 'published', 404);
        $expertProfile = $request->user()->expertProfile;
        abort_unless($expertProfile, 422, 'Complete your expert profile before applying.');

        $validated = $request->validate([
            'cover_letter' => ['required', 'string', 'min:30', 'max:5000'],
            'resume' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
            'proposed_budget' => ['nullable', 'numeric', 'min:0', 'max:999999999.99'],
        ]);

        if (ProjectApplication::query()->where('project_id', $project->id)->where('expert_profile_id', $expertProfile->id)->exists()) {
            return response()->json(['message' => 'You have already applied to this project.'], 409);
        }

        $application = ProjectApplication::create([
            'project_id' => $project->id,
            'expert_profile_id' => $expertProfile->id,
            'cover_letter' => $validated['cover_letter'],
            'resume_name' => $validated['resume']->getClientOriginalName(),
            'resume_path' => $validated['resume']->store('project-applications/resumes', 'local'),
            'proposed_budget' => $validated['proposed_budget'] ?? null,
        ]);

        $application->load('project.companyProfile:id,company_name,industry,location,email', 'project.user:id,name,email', 'expertProfile.user:id,name,email');
        $emailsSent = $this->sendApplicationEmails($application);
        $application->project?->makeHidden('attachments');
        $application->makeHidden('resume_path');

        return response()->json([
            'message' => 'Your application has been sent to the company.',
            'emails_sent' => $emailsSent,
            'data' => $application,
        ], 201);
    }

    private function sendApplicationEmails(ProjectApplication $application): int
    {
        if (in_array(config('mail.default'), ['log', 'array'], true)) {
            Log::warning('Project application emails were not delivered because no real mail transport is configured.', [
                'application_id' => $application->id,
            ]);

            return 0;
        }

        $recipients = [
            'expert' => $application->expertProfile?->user?->email,
            'company' => $application->project?->companyProfile?->email ?: $application->project?->user?->email,
        ];
        $mailables = [
            'expert' => new ProjectApplicationConfirmation($application),
            'company' => new ProjectApplicationReceived($application),
        ];
        $emailsSent = 0;

        foreach ($recipients as $recipientType => $email) {
            if (! $email) {
                Log::warning('A project application email was skipped because the recipient address is missing.', [
                    'application_id' => $application->id,
                    'recipient_type' => $recipientType,
                ]);

                continue;
            }

            try {
                Mail::to($email)->send($mailables[$recipientType]);
                $emailsSent++;
            } catch (\Throwable $exception) {
                Log::error('A project application email could not be delivered.', [
                    'application_id' => $application->id,
                    'recipient_type' => $recipientType,
                    'exception' => $exception::class,
                ]);
            }
        }

        return $emailsSent;
    }
}
