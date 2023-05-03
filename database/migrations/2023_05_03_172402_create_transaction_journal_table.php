<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaction_journal', function (Blueprint $table) {
            $table->id();
            $table->foreignId('period_id')->constrained('period');
            $table->foreignId('sub_account_id')->constrained('sub_account');
            $table->string('description');
            $table->bigInteger('amount');
            $table->enum('type', ['debt', 'credit']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_journal');
    }
};
