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
        Schema::create('transaction_journal_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_journal_id')->constrained('transaction_journals');
            $table->string('sub_account_id')->references('id')->on('sub_accounts')->onUpdate('cascade')->onDelete('cascade');
            $table->enum('type', ['debit', 'credit']);
            $table->bigInteger('amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_journal_details');
    }
};
