<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('company_profile_id')->constrained('company_profile')->cascadeOnDelete();
            $table->string('title', 160);
            $table->string('category', 100)->nullable();
            $table->text('description')->nullable();
            $table->json('required_skills')->nullable();
            $table->string('budget')->nullable();
            $table->string('expected_duration')->nullable();
            $table->string('work_arrangement')->nullable();
            $table->string('experts_needed')->nullable();
            $table->date('preferred_completion_date')->nullable();
            $table->string('experience_level')->nullable();
            $table->text('additional_requirements')->nullable();
            $table->json('attachments')->nullable();
            $table->string('status', 20)->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
