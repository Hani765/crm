<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('unique_id')->unique();
            $table->string('branch_id')->nullable();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('provider')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('password');
            $table->string('role')->default('user');
            $table->string('monthly_salary')->nullable();
            $table->string('reference_name')->nullable();
            $table->string('manager_id')->nullable();
            $table->string('phone')->nullable();
            $table->string('skype')->nullable();
            $table->string('whats_app')->nullable();
            $table->string('details')->nullable();
            $table->string('gender')->nullable();
            $table->unsignedTinyInteger('age')->nullable();
            $table->date('dob')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('time_zone')->nullable();
            $table->string('language')->nullable()->default('English');
            $table->string('email_verification_token')->nullable();
            $table->string('profile_image')->nullable();
            $table->enum('status', ['active', 'inactive', 'banned'])->default('active');
            $table->enum('notification', ['yes', 'no'])->default('yes');
            $table->enum('isVerified', ['yes', 'no'])->default('no');
            $table->timestamp('email_verified_at')->nullable();
            $table->integer('login_attempts')->default(0);
            $table->timestamp('lockout_time')->nullable();
            $table->rememberToken();
            $table->timestamps();
            // Indexes
            $table->index('role');
            $table->index('manager_id');
            $table->index('status');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
