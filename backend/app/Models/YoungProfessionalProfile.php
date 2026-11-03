<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class YoungProfessionalProfile extends Model
{
    protected $fillable = [
        'user_id',
        'professional_title',
        'bio',
        'location',
        'profile_photo',
    ];

    public function getProfilePhotoAttribute($value): ?string
    {
        if (!$value || str_starts_with($value, 'http')) {
            return $value;
        }

        return url('/api/young-professional-profile-photos/'.basename($value));
    }

    // A young professional profile belongs to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
