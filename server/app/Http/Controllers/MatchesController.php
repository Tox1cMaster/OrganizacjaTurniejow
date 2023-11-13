<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Matches;

class MatchesController extends Controller
{
    public function index()
    {
        $matches = Matches::all();
        return response()->json($matches, 200);
    }

    public function show($id)
    {
        $match = Matches::findOrFail($id);
        return response()->json($match, 200);
    }
    public function getMatchesForTournament($tournamentId)
    {
    $matches = Matches::where('TournamentID', $tournamentId)
                      ->with('participant1', 'participant2')
                      ->get();

    $matchesWithNicknames = $matches->map(function ($match) {
        if ($match->participant1) {
            $match->participant1_nick = $match->participant1->name;
        } else {
            $match->participant1_nick = 'BRAK';
        }

        if ($match->participant2) {
            $match->participant2_nick = $match->participant2->name;
        } else {
            $match->participant2_nick = 'BRAK';
        }

        unset($match->participant1);
        unset($match->participant2);

        return $match;
    });

        return response()->json($matchesWithNicknames, 200);
    }

    public function getMatchesForTournament2($tournamentId)
{
    $matches = Matches::where('TournamentID', $tournamentId)
                    ->get();

    $formattedMatches = $matches->map(function ($match) {
        // Tworzenie tablicy uczestników
        $participants = [];

        // Dodanie uczestnika 1, jeśli istnieje
        if ($match->participant1) {
            $participants[] = [
                'id' => $match->participant1->id,
                'resultText' => null, // Dodaj odpowiednią logikę
                'isWinner' => $match->participant1->id == $match->winner_id ? true : false, // Dodaj odpowiednią logikę
                'status' => null, // Dodaj odpowiednią logikę
                'name' => $match->participant1->name,
                'picture' => 'teamlogos/client_team_default_logo' // Adjust as necessary
            ];
        }

        // Dodanie uczestnika 2, jeśli istnieje
        if ($match->participant2) {
            $participants[] = [
                'id' => $match->participant2->id,
                'resultText' => null, // Dodaj odpowiednią logikę
                'isWinner' => $match->participant2->id == $match->winner_id ? true : false, // Dodaj odpowiednią logikę
                'status' => null, // Dodaj odpowiednią logikę
                'name' => $match->participant2->name,
                'picture' => 'teamlogos/client_team_default_logo' // Adjust as necessary
            ];
        }

        return [
            'id' => $match->id,
            'nextMatchId' => $match->next_match_id, // Wyznacz lub pobierz tę wartość
            'tournamentRoundText' => $match->round, // Wyznacz lub pobierz tę wartość
            'startTime' => '2021-05-30', // Dostosuj zgodnie z potrzebami
            'state' => 'WALK_OVER', // Dostosuj zgodnie z potrzebami
            'participants' => $participants,
        ];
    });

    return response()->json($formattedMatches, 200);
}
}
