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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:company_profile,user_id',
            'company_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'industry' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'email' => 'nullable|email|max:255',
            'company_logo' => 'nullable|string|max:255',
        ]);

        $company = CompanyProfile::create($validated);

        return response()->json([
            'message' => 'Company profile created successfully',
            'data' => $company
        ], 201);
    }
    public function update(Request $request, $id)
    {
        $company = CompanyProfile::findOrFail($id);

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
    public function destroy($id)
    {
        $company = CompanyProfile::findOrFail($id);

        $company->delete();

        return response()->json([
            'message' => 'Company profile deleted successfully'
        ]);
    }
}
