<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExpertProfile extends Model
{
    protected $fillable = [
        'user_id',
        'professional_title',
        'bio',
        'years_of_experience',
        'location',
        'profile_photo',
        'is_verified',
    ];

    // An expert profile belongs to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // An expert can have many services
    public function services(): HasMany
    {
        return $this->hasMany(Service::class, 'expert_id');
    }

    // An expert can have many availability records
    public function availability(): HasMany
    {
        return $this->hasMany(Availability::class, 'expert_id');
    }

    // An expert can have many bookings
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'expert_id');
    }

    // An expert can receive many reviews
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'expert_id');
    }
}
