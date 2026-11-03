<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        if ($request->user()->role === 'expert') {
            $expertProfile = $request->user()->expertProfile;
            abort_unless($expertProfile, 422, 'Complete your expert profile before browsing projects.');

            $projects = Project::query()
                    ->with('companyProfile:id,company_name,industry,location')
                    ->withExists(['applications as has_applied' => fn ($query) => $query->where('expert_profile_id', $expertProfile->id)])
                    ->where('status', 'published')
                    ->latest('published_at')
                    ->get();

            $projects->each(fn (Project $project) => $project->makeHidden('attachments'));

            return response()->json(['data' => $projects]);
        }

        abort_unless($request->user()->role === 'company', 403, 'Only company and expert accounts can view projects.');

        return response()->json([
            'data' => Project::query()
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        abort_unless($user->role === 'company', 403, 'Only company accounts can create projects.');
        $companyProfile = $user->companyProfile;
        abort_unless($companyProfile, 422, 'Create a company profile before creating a project.');

        $status = $request->input('status', 'published');
        if (! in_array($status, ['draft', 'published'], true)) {
            throw ValidationException::withMessages(['status' => ['Choose draft or published status.']]);
        }

        $required = $status === 'published' ? 'required' : 'nullable';
        $validated = $request->validate([
            'title' => [$required, 'string', 'max:160'],
            'category' => [$required, 'string', 'max:100'],
            'description' => [$required, 'string', 'max:10000'],
            'skills' => [$required, 'array', 'min:1', 'max:30'],
            'skills.*' => ['required', 'string', 'max:80'],
            'budget' => ['nullable', 'string', 'max:100'],
            'duration' => ['nullable', 'string', 'max:100'],
            'workArrangement' => ['nullable', 'string', Rule::in(['Remote', 'On-site', 'Hybrid'])],
            'expertsNeeded' => ['nullable', 'string', 'max:100'],
            'preferredDate' => ['nullable', 'date'],
            'experience' => ['nullable', 'string', 'max:100'],
            'additionalRequirements' => ['nullable', 'string', 'max:10000'],
            'attachments' => ['nullable', 'array', 'max:5'],
            'attachments.*' => ['file', 'mimes:pdf,doc,docx,jpg,jpeg,png', 'max:10240'],
        ]);

        $project = Project::create([
            'user_id' => $user->id,
            'company_profile_id' => $companyProfile->id,
            'title' => $validated['title'] ?? 'Untitled draft',
            'category' => $validated['category'] ?? null,
            'description' => $validated['description'] ?? null,
            'required_skills' => $validated['skills'] ?? [],
            'budget' => $validated['budget'] ?? null,
            'expected_duration' => $validated['duration'] ?? null,
            'work_arrangement' => $validated['workArrangement'] ?? null,
            'experts_needed' => $validated['expertsNeeded'] ?? null,
            'preferred_completion_date' => $validated['preferredDate'] ?? null,
            'experience_level' => $validated['experience'] ?? null,
            'additional_requirements' => $validated['additionalRequirements'] ?? null,
            'status' => $status,
            'published_at' => $status === 'published' ? now() : null,
        ]);

        $storedAttachments = collect($request->file('attachments', []))
            ->map(fn ($file): array => [
                'name' => $file->getClientOriginalName(),
                'path' => $file->store("projects/{$project->id}", 'local'),
                'size' => $file->getSize(),
            ])->all();

        if ($storedAttachments !== []) {
            $project->update(['attachments' => $storedAttachments]);
        }

        return response()->json([
            'message' => $status === 'draft' ? 'Project draft saved.' : 'Project published successfully.',
            'data' => $project->fresh(),
        ], 201);
    }

    public function destroy(Request $request, Project $project): JsonResponse
    {
        abort_unless($request->user()->role === 'company', 403, 'Only company accounts can delete projects.');
        abort_unless($project->user_id === $request->user()->id, 404);

        foreach ($project->attachments ?? [] as $attachment) {
            if (isset($attachment['path'])) {
                Storage::disk('local')->delete($attachment['path']);
            }
        }

        $project->delete();

        return response()->json(['message' => 'Project deleted successfully.']);
    }
}
