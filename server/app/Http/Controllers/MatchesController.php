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
}
