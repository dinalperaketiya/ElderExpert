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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:expert_profiles,user_id',
            'professional_title' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'years_of_experience' => 'nullable|integer|min:0',
            'location' => 'nullable|string|max:255',
            'profile_photo' => 'nullable|string|max:255',
            'is_verified' => 'sometimes|boolean',
        ]);

        $expert = ExpertProfile::create($validated);

        return response()->json([
            'message' => 'Expert profile created successfully',
            'data' => $expert
        ], 201);
    }
    public function update(Request $request, $id)
    {
        $expert = ExpertProfile::findOrFail($id);

        $validated = $request->validate([
            'professional_title' => 'sometimes|string|max:255',
            'bio' => 'sometimes|nullable|string',
            'years_of_experience' => 'sometimes|nullable|integer|min:0',
            'location' => 'sometimes|nullable|string|max:255',
        ]);

        $expert->update($validated);

        return response()->json([
            'message' => 'Expert profile updated successfully',
            'data' => $expert
        ]);
    }
    public function destroy($id)
    {
        $expert = ExpertProfile::findOrFail($id);

        $expert->delete();

        return response()->json([
            'message' => 'Expert profile deleted successfully'
        ]);
    }

}
