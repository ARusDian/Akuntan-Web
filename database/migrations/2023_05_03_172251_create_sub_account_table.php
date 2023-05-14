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
        Schema::create('sub_accounts', function (Blueprint $table) {
            $table->string('id', 4)->primary();
            $table->string('name');
            $table->enum('category', [
                'CURRENT ASSET', 
                'FIXED ASSET', 
                'LIABILITY',
                'LIABILITY OTHER',
                'EQUITY',
            ])->default('CURRENT ASSET');
            $table->string('account_id')->references('id')->on('accounts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_accounts');
    }
};
