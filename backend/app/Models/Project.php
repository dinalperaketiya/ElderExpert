<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'user_id',
        'company_profile_id',
        'title',
        'category',
        'description',
        'required_skills',
        'budget',
        'expected_duration',
        'work_arrangement',
        'experts_needed',
        'preferred_completion_date',
        'experience_level',
        'additional_requirements',
        'attachments',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'required_skills' => 'array',
            'attachments' => 'array',
            'preferred_completion_date' => 'date:Y-m-d',
            'published_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function companyProfile(): BelongsTo
    {
        return $this->belongsTo(CompanyProfile::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(ProjectApplication::class);
    }
}
