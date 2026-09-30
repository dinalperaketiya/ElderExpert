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

    // A young professional profile belongs to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
