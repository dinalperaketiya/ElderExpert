<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanyProfile extends Model
{
    protected $table = 'company_profile';

    protected $fillable = [
        'user_id',
        'company_name',
        'description',
        'industry',
        'location',
        'website',
        'email',
        'company_logo',
    ];

    // A company profile belongs to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
