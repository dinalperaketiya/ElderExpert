<?php

namespace App\Http\Controllers;

use App\Models\Service;
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
        $validated = $request->validate([
            'expert_id' => 'required|exists:expert_profiles,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'is_active' => 'sometimes|boolean',
        ]);

        $service = Service::create($validated);

        return response()->json([
            'message' => 'Service created successfully',
            'data' => $service
        ], 201);
    }
    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

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

        $service->delete();

        return response()->json([
            'message' => 'Service deleted successfully'
        ]);
    }
}
