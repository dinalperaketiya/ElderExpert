<?php

namespace App\Http\Controllers;

use App\Models\YoungProfessionalProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class YoungProfessionalProfileController extends Controller
{
    public function mine(Request $request)
    {
        if ($request->user()->role !== 'young_professional') {
            return response()->json(['message' => 'Only young professional users can view this profile.'], 403);
        }

        return response()->json([
            'data' => YoungProfessionalProfile::with('user')->where('user_id', $request->user()->id)->first(),
        ]);
    }

    public function photo(string $filename)
    {
        abort_unless(preg_match('/^[A-Za-z0-9._-]+$/', $filename) === 1, 404);
        $path = 'young-professional-profiles/'.$filename;
        abort_unless(Storage::disk('public')->exists($path), 404);

        return response()->file(Storage::disk('public')->path($path));
    }

    // Get all young professional profiles
    public function index()
    {
        return response()->json(
            YoungProfessionalProfile::with('user')->get()
        );
    }

    // Get one young professional profile
    public function show($id)
    {
        $profile = YoungProfessionalProfile::with('user')->findOrFail($id);

        return response()->json($profile);
    }

    // Create young professional profile
    public function store(Request $request)
    {
        $user = $request->user();

        // Only young professionals can create this profile
        if ($user->role !== 'young_professional') {
            return response()->json([
                'message' => 'Only young professional users can create a profile.'
            ], 403);
        }

        // Check if the user already has a profile
        if (YoungProfessionalProfile::where('user_id', $user->id)->exists()) {
            return response()->json([
                'message' => 'You already have a young professional profile.'
            ], 422);
        }

        $validated = $request->validate([
            'professional_title' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'profile_photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('profile_photo')) {
            $validated['profile_photo'] = $request->file('profile_photo')->store('young-professional-profiles', 'public');
        }

        // Automatically use the logged-in user's ID
        $validated['user_id'] = $user->id;

        $profile = YoungProfessionalProfile::create($validated);

        return response()->json([
            'message' => 'Young professional profile created successfully',
            'data' => $profile
        ], 201);
    }

    // Update young professional profile
    public function update(Request $request, $id)
    {
        $profile = YoungProfessionalProfile::findOrFail($id);

        // Only young professionals can update
        if ($request->user()->role !== 'young_professional') {
            return response()->json([
                'message' => 'Only young professional users can update a profile.'
            ], 403);
        }

        // Only the owner can update
        if ($profile->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'You can only update your own profile.'
            ], 403);
        }

        $validated = $request->validate([
            'professional_title' => 'sometimes|nullable|string|max:255',
            'bio' => 'sometimes|nullable|string',
            'location' => 'sometimes|nullable|string|max:255',
            'profile_photo' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('profile_photo')) {
            $oldPhoto = $profile->getRawOriginal('profile_photo');
            $validated['profile_photo'] = $request->file('profile_photo')->store('young-professional-profiles', 'public');
            if ($oldPhoto && !str_starts_with($oldPhoto, 'http')) {
                Storage::disk('public')->delete($oldPhoto);
            }
        }

        $profile->update($validated);

        return response()->json([
            'message' => 'Young professional profile updated successfully',
            'data' => $profile
        ]);
    }

    // Delete young professional profile
    public function destroy($id)
    {
        $profile = YoungProfessionalProfile::findOrFail($id);

        // Only young professionals can delete
        if (request()->user()->role !== 'young_professional') {
            return response()->json([
                'message' => 'Only young professional users can delete a profile.'
            ], 403);
        }

        // Only the owner can delete
        if ($profile->user_id !== request()->user()->id) {
            return response()->json([
                'message' => 'You can only delete your own profile.'
            ], 403);
        }

        $profile->delete();

        return response()->json([
            'message' => 'Young professional profile deleted successfully'
        ]);
    }
}
