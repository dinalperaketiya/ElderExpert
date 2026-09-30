<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    protected $fillable = [
        'booking_id',
        'user_id',
        'expert_id',
        'rating',
        'comment',
    ];

    // A review belongs to one booking
    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    // A review belongs to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // A review belongs to one expert
    public function expert(): BelongsTo
    {
        return $this->belongsTo(ExpertProfile::class, 'expert_id');
    }
}
