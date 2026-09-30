<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'expert_id',
        'service_id',
        'booking_date',
        'start_time',
        'end_time',
        'status',
        'notes',
    ];

    // A booking belongs to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // A booking belongs to one expert
    public function expert(): BelongsTo
    {
        return $this->belongsTo(ExpertProfile::class, 'expert_id');
    }

    // A booking belongs to one service
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    // A booking has one payment
    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    // A booking can have one review
    public function review(): HasOne
    {
        return $this->hasOne(Review::class);
    }
}
