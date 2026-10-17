<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectApplication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

        $application->load('project.companyProfile:id,company_name,industry,location');
        $application->project?->makeHidden('attachments');
        $application->makeHidden('resume_path');

        return response()->json([
            'message' => 'Your application has been sent to the company.',
            'data' => $application,
        ], 201);
    }
}
