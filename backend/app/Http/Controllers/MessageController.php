<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // Get all messages
    public function index()
    {
        $messages = Message::with(['sender', 'receiver'])
            ->latest()
            ->get();

        return response()->json($messages);
    }

    // Get one message
    public function show($id)
    {
        $message = Message::with(['sender', 'receiver'])
            ->findOrFail($id);

        return response()->json($message);
    }

    // Send a message
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id|different:sender_id',
            'message' => 'required|string|max:5000',
        ]);

        $newMessage = Message::create([
            'sender_id' => $validated['sender_id'],
            'receiver_id' => $validated['receiver_id'],
            'message' => $validated['message'],
            'is_read' => false,
        ]);

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $newMessage
        ], 201);
    }

    // Update a message
    public function update(Request $request, $id)
    {
        $message = Message::findOrFail($id);

        $validated = $request->validate([
            'message' => 'sometimes|required|string|max:5000',
            'is_read' => 'sometimes|required|boolean',
        ]);

        $message->update($validated);

        return response()->json([
            'message' => 'Message updated successfully',
            'data' => $message
        ]);
    }

    // Delete a message
    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();

        return response()->json([
            'message' => 'Message deleted successfully'
        ]);
    }
}
