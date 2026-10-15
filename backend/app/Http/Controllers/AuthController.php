<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Register
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:expert,company,young_professional',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        $token = $user->createToken('elderexpert-token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    // Login
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'identifier' => 'required_without:email|string|max:255',
            'email' => 'required_without:identifier|email|max:255',
            'password' => 'required|string',
        ]);
        $identifier = $validated['identifier'] ?? $validated['email'];

        $user = User::where('email', $identifier)->first();

        if (!$user) {
            $usernameMatches = User::where('name', $identifier)->limit(2)->get();
            $user = $usernameMatches->count() === 1 ? $usernameMatches->first() : null;
        }

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'identifier' => ['The username/email or password is incorrect.'],
            ]);
        }

        $token = $user->createToken('elderexpert-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ]);
    }

    // Current authenticated user
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }
}
