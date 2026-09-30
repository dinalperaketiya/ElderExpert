<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Availability extends Model
{
    protected $table = 'availability';

    protected $fillable = [
        'expert_id',
        'day_of_week',
        'start_time',
        'end_time',
        'is_available',
    ];

    // An availability record belongs to one expert
    public function expert(): BelongsTo
    {
        return $this->belongsTo(ExpertProfile::class, 'expert_id');
    }
}
