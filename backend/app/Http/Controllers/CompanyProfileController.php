<?php

namespace App\Http\Controllers;

use App\Models\CompanyProfile;
use Illuminate\Http\Request;

class CompanyProfileController extends Controller
{
    // Get all company profiles
    public function index()
    {
        $companies = CompanyProfile::with('user')->get();

        return response()->json($companies);
    }

    // Get one company profile
    public function show($id)
    {
        $company = CompanyProfile::with('user')->findOrFail($id);

        return response()->json($company);
    }

    // Create company profile
    public function store(Request $request)
    {
        $user = $request->user();

        // Only company users can create a company profile
        if ($user->role !== 'company') {
            return response()->json([
                'message' => 'Only company users can create a company profile.'
            ], 403);
        }

        // Check if this company already has a profile
        if (CompanyProfile::where('user_id', $user->id)->exists()) {
            return response()->json([
                'message' => 'You already have a company profile.'
            ], 422);
        }

        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'industry' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'email' => 'nullable|email|max:255',
            'company_logo' => 'nullable|string|max:255',
        ]);

        // Automatically use the logged-in user's ID
        $validated['user_id'] = $user->id;

        $company = CompanyProfile::create($validated);

        return response()->json([
            'message' => 'Company profile created successfully',
            'data' => $company
        ], 201);
    }

    // Update company profile
    public function update(Request $request, $id)
    {
        $company = CompanyProfile::findOrFail($id);

        // Only company users can update
        if ($request->user()->role !== 'company') {
            return response()->json([
                'message' => 'Only company users can update a company profile.'
            ], 403);
        }

        // Only the owner can update their profile
        if ($company->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'You can only update your own company profile.'
            ], 403);
        }

        $validated = $request->validate([
            'company_name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'industry' => 'sometimes|nullable|string|max:255',
            'location' => 'sometimes|nullable|string|max:255',
            'website' => 'sometimes|nullable|url|max:255',
            'email' => 'sometimes|nullable|email|max:255',
            'company_logo' => 'sometimes|nullable|string|max:255',
        ]);

        $company->update($validated);

        return response()->json([
            'message' => 'Company profile updated successfully',
            'data' => $company
        ]);
    }

    // Delete company profile
    public function destroy($id)
    {
        $company = CompanyProfile::findOrFail($id);

        // Only company users can delete
        if (request()->user()->role !== 'company') {
            return response()->json([
                'message' => 'Only company users can delete a company profile.'
            ], 403);
        }

        // Only the owner can delete their profile
        if ($company->user_id !== request()->user()->id) {
            return response()->json([
                'message' => 'You can only delete your own company profile.'
            ], 403);
        }

        $company->delete();

        return response()->json([
            'message' => 'Company profile deleted successfully'
        ]);
    }
}
