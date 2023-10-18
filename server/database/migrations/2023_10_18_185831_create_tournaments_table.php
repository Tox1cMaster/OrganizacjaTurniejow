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
        Schema::create('tournaments', function (Blueprint $table) {
            $table->increments('TournamentID');
            $table->integer('id'); //relacja z Users i ID
            $table->integer('GameID'); //relacja z Games i gameid
            $table->integer('Privacy');
            $table->integer('TournamentFormat');
            $table->integer('Status');
            $table->integer('Prizepool');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tournaments');
    }
};
