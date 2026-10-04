<?php

namespace App\Http\Controllers;

use App\Models\Availability;
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
        $validated = $request->validate([
            'expert_id' => 'required|exists:expert_profiles,id',
            'day_of_week' => 'required|integer|min:0|max:6',
            'available_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'is_available' => 'sometimes|boolean',
        ]);

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

        $validated = $request->validate([
            'expert_id' => 'sometimes|required|exists:expert_profiles,id',
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

        $availability->delete();

        return response()->json([
            'message' => 'Availability deleted successfully'
        ]);
    }
}
