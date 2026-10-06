<?php

namespace App\Http\Controllers;

use App\Models\Availability;
use App\Models\ExpertProfile;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{
    // Get all availability records
    public function index()
    {
        return response()->json(
            Availability::with('expert')->get()
        );
    }

    // Get one availability record
    public function show($id)
    {
        $availability = Availability::with('expert')->findOrFail($id);

        return response()->json($availability);
    }

    // Create availability
    public function store(Request $request)
    {
        $user = $request->user();

        // Only experts can create availability
        if ($user->role !== 'expert') {
            return response()->json([
                'message' => 'Only expert users can create availability.'
            ], 403);
        }

        // Find the logged-in expert's profile
        $expert = ExpertProfile::where('user_id', $user->id)->first();

        if (!$expert) {
            return response()->json([
                'message' => 'You must create an expert profile first.'
            ], 422);
        }

        $validated = $request->validate([
            'day_of_week' => 'required|integer|min:0|max:6',
            'available_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'is_available' => 'sometimes|boolean',
        ]);

        // Automatically assign the logged-in expert
        $validated['expert_id'] = $expert->id;

        $availability = Availability::create($validated);

        return response()->json([
            'message' => 'Availability created successfully',
            'data' => $availability
        ], 201);
    }

    // Update availability
    public function update(Request $request, $id)
    {
        $availability = Availability::findOrFail($id);

        // Only experts can update availability
        if ($request->user()->role !== 'expert') {
            return response()->json([
                'message' => 'Only expert users can update availability.'
            ], 403);
        }

        // Find the logged-in expert's profile
        $expert = ExpertProfile::where(
            'user_id',
            $request->user()->id
        )->first();

        // Only the owner can update the availability
        if (!$expert || $availability->expert_id !== $expert->id) {
            return response()->json([
                'message' => 'You can only update your own availability.'
            ], 403);
        }

        $validated = $request->validate([
            'day_of_week' => 'sometimes|required|integer|min:0|max:6',
            'available_date' => 'sometimes|required|date|after_or_equal:today',
            'start_time' => 'sometimes|required|date_format:H:i',
            'end_time' => 'sometimes|required|date_format:H:i',
            'is_available' => 'sometimes|boolean',
        ]);

        $availability->fill($validated);

        if ($availability->start_time >= $availability->end_time) {
            return response()->json([
                'message' => 'End time must be later than start time.'
            ], 422);
        }

        $availability->save();

        return response()->json([
            'message' => 'Availability updated successfully',
            'data' => $availability
        ]);
    }

    // Delete availability
    public function destroy($id)
    {
        $availability = Availability::findOrFail($id);

        // Only experts can delete availability
        if (request()->user()->role !== 'expert') {
            return response()->json([
                'message' => 'Only expert users can delete availability.'
            ], 403);
        }

        // Find the logged-in expert's profile
        $expert = ExpertProfile::where(
            'user_id',
            request()->user()->id
        )->first();

        // Only the owner can delete
        if (!$expert || $availability->expert_id !== $expert->id) {
            return response()->json([
                'message' => 'You can only delete your own availability.'
            ], 403);
        }

        $availability->delete();

        return response()->json([
            'message' => 'Availability deleted successfully'
        ]);
    }
}
