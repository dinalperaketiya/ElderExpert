<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    // Get all bookings
    public function index()
    {
        return response()->json(
            Booking::with(['user', 'service', 'availability'])->get()
        );
    }

    // Get one booking
    public function show($id)
    {
        $booking = Booking::with([
            'user',
            'service',
            'availability'
        ])->findOrFail($id);

        return response()->json($booking);
    }

    // Create a booking
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'availability_id' => 'required|exists:availability,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'status' => 'sometimes|in:pending,confirmed,cancelled,completed',
            'notes' => 'nullable|string',
        ]);

        $service = Service::findOrFail($validated['service_id']);

        $booking = new Booking();

        $booking->user_id = $validated['user_id'];
        $booking->expert_id = $service->expert_id;
        $booking->service_id = $validated['service_id'];
        $booking->availability_id = $validated['availability_id'];
        $booking->booking_date = $validated['booking_date'];
        $booking->start_time = $validated['start_time'];
        $booking->end_time = $validated['end_time'];
        $booking->status = $validated['status'] ?? 'pending';
        $booking->notes = $validated['notes'] ?? null;

        $booking->save();

        return response()->json([
            'message' => 'Booking created successfully',
            'data' => $booking
        ], 201);
    }
    // Update a booking
    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $validated = $request->validate([
            'booking_date' => 'sometimes|required|date|after_or_equal:today',
            'start_time' => 'sometimes|required|date_format:H:i',
            'end_time' => 'sometimes|required|date_format:H:i',
            'status' => 'sometimes|required|in:pending,confirmed,cancelled,completed',
            'notes' => 'sometimes|nullable|string',
        ]);

        $booking->fill($validated);

        if ($booking->start_time >= $booking->end_time) {
            return response()->json([
                'message' => 'End time must be later than start time.'
            ], 422);
        }

        $booking->save();

        return response()->json([
            'message' => 'Booking updated successfully',
            'data' => $booking
        ]);
    }

    // Delete a booking
    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);

        $booking->delete();

        return response()->json([
            'message' => 'Booking deleted successfully'
        ]);
    }
}
