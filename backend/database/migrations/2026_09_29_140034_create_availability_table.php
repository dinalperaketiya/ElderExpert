<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('availability', function (Blueprint $table) {
            $table->id();

            $table->foreignId('expert_id')
                ->constrained('expert_profiles')
                ->onDelete('cascade');

            $table->string('day_of_week');

            $table->time('start_time');
            $table->time('end_time');

            $table->boolean('is_available')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('availability');
    }
};
