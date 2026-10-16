<?php

namespace App\Http\Controllers;

use App\Models\ExpertProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ExpertProfileController extends Controller
{
    public function photo(string $filename)
    {
        abort_unless(preg_match('/^[A-Za-z0-9._-]+$/', $filename) === 1, 404);
        $path = 'expert-profiles/'.$filename;
        abort_unless(Storage::disk('public')->exists($path), 404);

        return response()->file(Storage::disk('public')->path($path));
    }

    public function mine(Request $request)
    {
        if ($request->user()->role !== 'expert') {
            return response()->json(['message' => 'Only expert users can view an expert profile.'], 403);
        }

        return response()->json([
            'data' => ExpertProfile::with('user')->where('user_id', $request->user()->id)->first(),
        ]);
    }

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
            'profile_photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_verified' => 'sometimes|boolean',
        ]);

        // Automatically use the logged-in expert's ID
        $validated['user_id'] = $user->id;

        // Expert should not verify themselves
        $validated['is_verified'] = false;

        if ($request->hasFile('profile_photo')) {
            $validated['profile_photo'] = $request->file('profile_photo')->store('expert-profiles', 'public');
        }

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
            'profile_photo' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'remove_profile_photo' => 'sometimes|boolean',
        ]);

        if ($request->boolean('remove_profile_photo')) {
            $oldPhoto = $expert->getRawOriginal('profile_photo');
            if ($oldPhoto && !str_starts_with($oldPhoto, 'http')) {
                Storage::disk('public')->delete($oldPhoto);
            }
            $validated['profile_photo'] = null;
        }

        if ($request->hasFile('profile_photo')) {
            $oldPhoto = $expert->getRawOriginal('profile_photo');
            $validated['profile_photo'] = $request->file('profile_photo')->store('expert-profiles', 'public');
            if ($oldPhoto && !str_starts_with($oldPhoto, 'http')) {
                Storage::disk('public')->delete($oldPhoto);
            }
        }

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
