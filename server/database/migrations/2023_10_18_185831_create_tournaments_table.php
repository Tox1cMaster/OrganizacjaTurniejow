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
            $table->integer('user_id'); //relacja z Users i ID
            $table->string('TournamentName',255);
            $table->integer('GameID'); //relacja z Games i gameid
            $table->string('Privacy', 50);
            $table->string('TournamentFormat', 20);
            $table->integer('Status');
            $table->integer('Prizepool');
            $table->text('Description')->nullable();
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
