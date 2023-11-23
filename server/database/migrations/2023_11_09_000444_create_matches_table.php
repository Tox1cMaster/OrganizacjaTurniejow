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
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->integer('TournamentID');
            $table->integer('participant1_id')->nullable();
            $table->integer('participant2_id')->nullable();
            $table->integer('participant1_score')->nullable(); 
            $table->integer('participant2_score')->nullable();
            $table->integer('winner_id')->nullable();
            $table->integer('round');
            $table->integer('match_order'); 
            $table->integer('prev_match_id')->nullable();
            $table->integer('next_match_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
