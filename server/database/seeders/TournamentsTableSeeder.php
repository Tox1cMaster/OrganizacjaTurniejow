<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Type\Integer;

class TournamentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $names = ['Prywatny', 'Publiczny'];
        DB::table('tournaments')->insert([
            'user_id' => rand(1, 10),
            'GameID' => rand(1, 2),
            'TournamentName' => Str::random(30),
            'Privacy' => $names[rand(0, 1)],
            'TournamentFormat' => '1v1',
            'Status' => '0',
            'Prizepool' => rand(100, 10000),
        ]);
    }
}
