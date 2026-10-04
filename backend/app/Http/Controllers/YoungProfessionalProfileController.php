<?php

namespace App\Http\Controllers;

use App\Models\YoungProfessionalProfile;
use Illuminate\Http\Request;

class YoungProfessionalProfileController extends Controller
{
    public function index()
    {
        return response()->json(
            YoungProfessionalProfile::with('user')->get()
        );
    }

    public function show($id)
    {
        $profile = YoungProfessionalProfile::with('user')->findOrFail($id);

        return response()->json($profile);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:young_professional_profiles,user_id',
            'professional_title' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'profile_photo' => 'nullable|string|max:255',
        ]);

        $profile = YoungProfessionalProfile::create($validated);

        return response()->json([
            'message' => 'Young professional profile created successfully',
            'data' => $profile
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $profile = YoungProfessionalProfile::findOrFail($id);

        $validated = $request->validate([
            'professional_title' => 'sometimes|nullable|string|max:255',
            'bio' => 'sometimes|nullable|string',
            'location' => 'sometimes|nullable|string|max:255',
            'profile_photo' => 'sometimes|nullable|string|max:255',
        ]);

        $profile->update($validated);

        return response()->json([
            'message' => 'Young professional profile updated successfully',
            'data' => $profile
        ]);
    }
    public function destroy($id)
    {
        $profile = YoungProfessionalProfile::findOrFail($id);

        $profile->delete();

        return response()->json([
            'message' => 'Young professional profile deleted successfully'
        ]);
    }

}
