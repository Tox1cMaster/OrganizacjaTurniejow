<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB; 

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->increments('GameID');
            $table->string('GameName');
            $table->text('GameDescription')->nullable();
            $table->string('GameImage', 255)->nullable();
        });
        DB::table('games')->insert([
            ['GameName' => 'Counter-Strike 2', 'GameDescription' => 'Najpopularniejsza strzelanka FPS od Valve', 'GameImage' => 'csgo.png'],
            ['GameName' => 'League of Legends', 'GameDescription' => 'Riot Games', 'GameImage' => 'lol.png'],
            ['GameName' => 'EA FC 24', 'GameDescription' => 'Electronic Arts', 'GameImage' => 'eafc.png'],
            // Add more rows as needed
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
