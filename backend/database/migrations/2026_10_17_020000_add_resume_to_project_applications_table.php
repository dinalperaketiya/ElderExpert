<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('project_applications', function (Blueprint $table): void {
            $table->string('resume_path')->nullable()->after('cover_letter');
            $table->string('resume_name')->nullable()->after('resume_path');
        });
    }

    public function down(): void
    {
        Schema::table('project_applications', function (Blueprint $table): void {
            $table->dropColumn(['resume_path', 'resume_name']);
        });
    }
};
