<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use App\Models\Availability;
use Illuminate\Http\Request;
use Carbon\Carbon;
class BookingController extends Controller
{
    // Get bookings
    public function index()
    {
        $user = request()->user();

        // Admin can see everything
        if ($user->role === 'admin') {
            return response()->json(
                Booking::with(['user', 'service', 'availability'])->get()
            );
        }

        // Experts see bookings for their services
        if ($user->role === 'expert') {
            $expert = $user->expertProfile;

            if (!$expert) {
                return response()->json([]);
            }

            return response()->json(
                Booking::with(['user', 'service', 'availability'])
                    ->where('expert_id', $expert->id)
                    ->get()
            );
        }

        // Companies / young professionals see their own bookings
        return response()->json(
            Booking::with(['user', 'service', 'availability'])
                ->where('user_id', $user->id)
                ->get()
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

        $user = request()->user();

        // Admin can see everything
        if ($user->role === 'admin') {
            return response()->json($booking);
        }

        // Booking owner can see it
        if ($booking->user_id === $user->id) {
            return response()->json($booking);
        }

        // Expert who owns the booking can see it
        if (
            $user->role === 'expert' &&
            $booking->expert_id === optional($user->expertProfile)->id
        ) {
            return response()->json($booking);
        }

        return response()->json([
            'message' => 'You do not have permission to view this booking.'
        ], 403);
    }

    // Create a booking
    public function store(Request $request)
    {
        $user = $request->user();

        // Only companies and young professionals can make bookings
        if (!in_array($user->role, ['company', 'young_professional'])) {
            return response()->json([
                'message' => 'Only companies and young professionals can create bookings.'
            ], 403);
        }

        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'availability_id' => 'required|exists:availability,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'notes' => 'nullable|string',
        ]);

        // Find service
        $service = Service::findOrFail($validated['service_id']);

        // Find availability
        $availability = Availability::findOrFail(
            $validated['availability_id']
        );

        // Make sure service and availability belong to the same expert
        if ($service->expert_id !== $availability->expert_id) {
            return response()->json([
                'message' => 'The selected service and availability belong to different experts.'
            ], 422);
        }

        // Booking date must match availability date
        if (
            $validated['booking_date'] !==
            $availability->available_date->format('Y-m-d')
        ) {
            return response()->json([
                'message' => 'The booking date does not match the selected availability date.'
            ], 422);
        }

        // Availability must be active
        if (!$availability->is_available) {
            return response()->json([
                'message' => 'This availability slot is not available.'
            ], 422);
        }

        // Booking time must be inside availability time
        $bookingStart = Carbon::createFromFormat(
            'H:i',
            $validated['start_time']
        );

        $bookingEnd = Carbon::createFromFormat(
            'H:i',
            $validated['end_time']
        );

        $availabilityStart = Carbon::createFromFormat(
            'H:i:s',
            $availability->start_time
        );

        $availabilityEnd = Carbon::createFromFormat(
            'H:i:s',
            $availability->end_time
        );

        if (
            $bookingStart->lt($availabilityStart) ||
            $bookingEnd->gt($availabilityEnd)
        ) {
            return response()->json([
                'message' => 'The booking time must be within the expert availability period.'
            ], 422);
        }

        // Check whether the availability slot is already booked
        $existingBooking = Booking::where(
            'availability_id',
            $availability->id
        )
            ->whereIn('status', ['pending', 'confirmed'])
            ->where(function ($query) use ($validated) {
                $query->where('start_time', '<', $validated['end_time'])
                    ->where('end_time', '>', $validated['start_time']);
            })
            ->exists();

        if ($existingBooking) {
            return response()->json([
                'message' => 'This time slot is already booked.'
            ], 422);
        }

        $booking = new Booking();

        // Automatically use logged-in user
        $booking->user_id = $user->id;

        // Automatically get expert from service
        $booking->expert_id = $service->expert_id;

        $booking->service_id = $service->id;
        $booking->availability_id = $availability->id;
        $booking->booking_date = $validated['booking_date'];
        $booking->start_time = $validated['start_time'];
        $booking->end_time = $validated['end_time'];

        // New bookings always start as pending
        $booking->status = 'pending';

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

        $user = $request->user();

        $isOwner = $booking->user_id === $user->id;

        $isExpert = (
            $user->role === 'expert' &&
            $booking->expert_id === optional($user->expertProfile)->id
        );

        if (!$isOwner && !$isExpert && $user->role !== 'admin') {
            return response()->json([
                'message' => 'You do not have permission to update this booking.'
            ], 403);
        }

        // Booking owner can change booking details
        if ($isOwner) {
            $validated = $request->validate([
                'booking_date' => 'sometimes|required|date|after_or_equal:today',
                'start_time' => 'sometimes|required|date_format:H:i',
                'end_time' => 'sometimes|required|date_format:H:i',
                'notes' => 'sometimes|nullable|string',
                'status' => 'sometimes|required|in:cancelled',
            ]);
        }

        // Expert can manage booking status
        elseif ($isExpert || $user->role === 'admin') {
            $validated = $request->validate([
                'status' => 'sometimes|required|in:confirmed,cancelled,completed',
                'notes' => 'sometimes|nullable|string',
            ]);
        }

        $booking->fill($validated);

        if (
            $booking->start_time !== null &&
            $booking->end_time !== null &&
            $booking->start_time >= $booking->end_time
        ) {
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

        $user = request()->user();

        $isOwner = $booking->user_id === $user->id;

        if (!$isOwner && $user->role !== 'admin') {
            return response()->json([
                'message' => 'You can only delete your own bookings.'
            ], 403);
        }

        $booking->delete();

        return response()->json([
            'message' => 'Booking deleted successfully'
        ]);
    }
}
