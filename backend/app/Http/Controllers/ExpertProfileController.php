<?php

namespace App\Http\Controllers;

use App\Models\ExpertProfile;
use Illuminate\Http\Request;

class ExpertProfileController extends Controller
{
    // Get all expert profiles
    public function index()
    {
        return response()->json(
            ExpertProfile::with('user')->get()
        );
    }

    // Get one expert profile
    public function show($id)
    {
        $expert = ExpertProfile::with('user')->find($id);

        if (!$expert) {
            return response()->json([
                'message' => 'Expert not found'
            ], 404);
        }

        return response()->json($expert);
    }

    // Create expert profile
    public function store(Request $request)
    {
        $user = $request->user();

        // Only experts can create an expert profile
        if ($user->role !== 'expert') {
            return response()->json([
                'message' => 'Only expert users can create an expert profile.'
            ], 403);
        }

        // Check if this expert already has a profile
        if (ExpertProfile::where('user_id', $user->id)->exists()) {
            return response()->json([
                'message' => 'You already have an expert profile.'
            ], 422);
        }

        $validated = $request->validate([
            'professional_title' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'years_of_experience' => 'nullable|integer|min:0',
            'location' => 'nullable|string|max:255',
            'profile_photo' => 'nullable|string|max:255',
            'is_verified' => 'sometimes|boolean',
        ]);

        // Automatically use the logged-in expert's ID
        $validated['user_id'] = $user->id;

        // Expert should not verify themselves
        $validated['is_verified'] = false;

        $expert = ExpertProfile::create($validated);

        return response()->json([
            'message' => 'Expert profile created successfully',
            'data' => $expert
        ], 201);
    }

    // Update expert profile
    public function update(Request $request, $id)
    {
        $expert = ExpertProfile::findOrFail($id);

        // Only experts can update
        if ($request->user()->role !== 'expert') {
            return response()->json([
                'message' => 'Only expert users can update an expert profile.'
            ], 403);
        }

        // Only the owner can update
        if ($expert->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'You can only update your own expert profile.'
            ], 403);
        }

        $validated = $request->validate([
            'professional_title' => 'sometimes|string|max:255',
            'bio' => 'sometimes|nullable|string',
            'years_of_experience' => 'sometimes|nullable|integer|min:0',
            'location' => 'sometimes|nullable|string|max:255',
            'profile_photo' => 'sometimes|nullable|string|max:255',
        ]);

        $expert->update($validated);

        return response()->json([
            'message' => 'Expert profile updated successfully',
            'data' => $expert
        ]);
    }

    // Delete expert profile
    public function destroy($id)
    {
        $expert = ExpertProfile::findOrFail($id);

        // Only experts can delete
        if (request()->user()->role !== 'expert') {
            return response()->json([
                'message' => 'Only expert users can delete an expert profile.'
            ], 403);
        }

        // Only the owner can delete
        if ($expert->user_id !== request()->user()->id) {
            return response()->json([
                'message' => 'You can only delete your own expert profile.'
            ], 403);
        }

        $expert->delete();

        return response()->json([
            'message' => 'Expert profile deleted successfully'
        ]);
    }
}
