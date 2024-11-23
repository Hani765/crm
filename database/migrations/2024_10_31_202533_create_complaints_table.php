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
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('complain_num');
            $table->string('brand_id');
            $table->string('branch_id');
            $table->string('contact_name');
            $table->string('company_complaint_no')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('phone_no');
            $table->string('whatsapp_no')->nullable();
            $table->string('address');
            $table->string('city');
            $table->string('product');
            $table->string('model');
            $table->string('serial_number_ind')->nullable();
            $table->string('serial_number_oud')->nullable();
            $table->string('mq_nmb')->nullable();
            $table->date('p_date')->nullable();
            $table->date('complete_date')->nullable();
            $table->text('description')->nullable();
            $table->integer('amount')->nullable();
            $table->string('technician')->nullable();
            $table->string('status');
            $table->string('complaint_type');
            $table->string('provided_services');
            $table->text('extra')->nullable();
            $table->text('images')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
