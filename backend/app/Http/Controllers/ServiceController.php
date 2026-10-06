<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ExpertProfile;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // Get all services
    public function index()
    {
        return response()->json(
            Service::with('expert')->get()
        );
    }

    // Get one service
    public function show($id)
    {
        $service = Service::with('expert')->findOrFail($id);

        return response()->json($service);
    }

    // Create a service
    public function store(Request $request)
    {
        $user = $request->user();

        // Only experts can create services
        if ($user->role !== 'expert') {
            return response()->json([
                'message' => 'Only expert users can create services.'
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
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'is_active' => 'sometimes|boolean',
        ]);

        // Automatically assign the logged-in expert
        $validated['expert_id'] = $expert->id;

        $service = Service::create($validated);

        return response()->json([
            'message' => 'Service created successfully',
            'data' => $service
        ], 201);
    }

    // Update a service
    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        // Only experts can update services
        if ($request->user()->role !== 'expert') {
            return response()->json([
                'message' => 'Only expert users can update services.'
            ], 403);
        }

        // Only the owner can update the service
        $expert = ExpertProfile::where(
            'user_id',
            $request->user()->id
        )->first();

        if (!$expert || $service->expert_id !== $expert->id) {
            return response()->json([
                'message' => 'You can only update your own services.'
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'duration' => 'sometimes|required|integer|min:1',
            'is_active' => 'sometimes|boolean',
        ]);

        $service->update($validated);

        return response()->json([
            'message' => 'Service updated successfully',
            'data' => $service
        ]);
    }

    // Delete a service
    public function destroy($id)
    {
        $service = Service::findOrFail($id);

        // Only experts can delete services
        if (request()->user()->role !== 'expert') {
            return response()->json([
                'message' => 'Only expert users can delete services.'
            ], 403);
        }

        // Only the owner can delete the service
        $expert = ExpertProfile::where(
            'user_id',
            request()->user()->id
        )->first();

        if (!$expert || $service->expert_id !== $expert->id) {
            return response()->json([
                'message' => 'You can only delete your own services.'
            ], 403);
        }

        $service->delete();

        return response()->json([
            'message' => 'Service deleted successfully'
        ]);
    }
}
