<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    protected $fillable = [
        'expert_id',
        'title',
        'description',
        'price',
        'duration',
        'is_active',
    ];

    // A service belongs to one expert
    public function expert(): BelongsTo
    {
        return $this->belongsTo(ExpertProfile::class, 'expert_id');
    }

    // A service can have many bookings
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'service_id');
    }
}
