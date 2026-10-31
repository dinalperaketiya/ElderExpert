<?php

namespace App\Http\Controllers;

use App\Services\ExpertMatchingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExpertMatchController extends Controller
{
    public function __invoke(Request $request, ExpertMatchingService $matchingService): JsonResponse
    {
        abort_unless($request->user()->role === 'company', 403, 'Only company accounts can request expert matches.');

        $validated = $request->validate([
            'description' => ['required', 'string', 'min:10', 'max:5000'],
            'category' => ['nullable', 'string', 'max:100'],
            'required_skills' => ['nullable', 'array', 'max:20'],
            'required_skills.*' => ['required', 'string', 'max:100'],
        ]);

        return response()->json($matchingService->recommend(
            $validated['description'],
            $validated['category'] ?? null,
            $validated['required_skills'] ?? [],
        ));
    }
}
