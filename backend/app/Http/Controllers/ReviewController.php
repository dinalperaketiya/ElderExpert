<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Booking;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // Get all reviews
    public function index()
    {
        return response()->json(
            Review::with(['user', 'expert', 'booking'])->get()
        );
    }

    // Get one review
    public function show($id)
    {
        $review = Review::with(['user', 'expert', 'booking'])
            ->findOrFail($id);

        return response()->json($review);
    }

    // Create a review
    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $booking = Booking::findOrFail($validated['booking_id']);
        $user = $request->user();

        // Only the person who made the booking can review it
        if ($booking->user_id !== $user->id) {
            return response()->json([
                'message' => 'You can only review your own bookings.'
            ], 403);
        }

        // Only completed bookings can be reviewed
        if ($booking->status !== 'completed') {
            return response()->json([
                'message' => 'You can only review completed bookings.'
            ], 422);
        }

        // Prevent duplicate reviews
        if (Review::where('booking_id', $booking->id)->exists()) {
            return response()->json([
                'message' => 'A review already exists for this booking.'
            ], 409);
        }

        $review = Review::create([
            'booking_id' => $booking->id,
            'user_id' => $user->id,
            'expert_id' => $booking->expert_id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
        ]);

        return response()->json([
            'message' => 'Review created successfully',
            'data' => $review
        ], 201);
    }

    // Update a review
    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        $user = $request->user();

        // Only the review owner or admin can update
        if ($review->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json([
                'message' => 'You are not authorized to update this review.'
            ], 403);
        }

        $validated = $request->validate([
            'rating' => 'sometimes|required|integer|min:1|max:5',
            'comment' => 'sometimes|nullable|string|max:1000',
        ]);

        $review->update($validated);

        return response()->json([
            'message' => 'Review updated successfully',
            'data' => $review
        ]);
    }

    // Delete a review
    public function destroy(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        $user = $request->user();

        // Only the review owner or admin can delete
        if ($review->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json([
                'message' => 'You are not authorized to delete this review.'
            ], 403);
        }

        $review->delete();

        return response()->json([
            'message' => 'Review deleted successfully'
        ]);
    }
}
