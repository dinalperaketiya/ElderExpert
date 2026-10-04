<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    // Get all payments
    public function index()
    {
        return response()->json(
            Payment::with('booking')->get()
        );
    }

    // Get one payment
    public function show($id)
    {
        $payment = Payment::with('booking')->findOrFail($id);

        return response()->json($payment);
    }

    // Create payment record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|string|max:100',
            'status' => 'sometimes|required|in:pending,paid,failed,refunded',
            'transaction_id' => 'nullable|string|max:255',
        ]);

        // Prevent duplicate payment records for one booking
        if (Payment::where('booking_id', $validated['booking_id'])->exists()) {
            return response()->json([
                'message' => 'A payment record already exists for this booking.'
            ], 409);
        }

        $payment = Payment::create([
            ...$validated,
            'status' => $validated['status'] ?? 'pending',
        ]);

        return response()->json([
            'message' => 'Payment record created successfully',
            'data' => $payment
        ], 201);
    }

    // Update payment
    public function update(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);

        $validated = $request->validate([
            'amount' => 'sometimes|required|numeric|min:0.01',
            'payment_method' => 'sometimes|required|string|max:100',
            'status' => 'sometimes|required|in:pending,paid,failed,refunded',
            'transaction_id' => 'sometimes|nullable|string|max:255',
        ]);

        $payment->update($validated);

        return response()->json([
            'message' => 'Payment updated successfully',
            'data' => $payment
        ]);
    }

    // Delete payment
    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json([
            'message' => 'Payment deleted successfully'
        ]);
    }
}
