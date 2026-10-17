<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_applications', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('expert_profile_id')->constrained('expert_profiles')->cascadeOnDelete();
            $table->text('cover_letter');
            $table->decimal('proposed_budget', 12, 2)->nullable();
            $table->string('status', 20)->default('pending');
            $table->timestamps();
            $table->unique(['project_id', 'expert_profile_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_applications');
    }
};
