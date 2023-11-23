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

    public function updateScore($id, Request $request)
    {
        $match = Matches::findOrFail($id);
        $p1score = $request->input('participant1_score');
        $p2score = $request->input('participant2_score');
        $nextMatchId = $match->next_match_id;
        $matchorder = $match->match_order;
        $winnerid = $p1score > $p2score ? $match->participant1_id : $match->participant2_id;
        $match->participant1_score = $p1score;
        $match->participant2_score = $p2score;
        $match->winner_id = $winnerid;
        $match->save();
        $nextmatch = Matches::findOrFail($nextMatchId);
        if($matchorder % 2 == 1){
            $nextmatch->participant1_id = $winnerid;
        }
        else{
            $nextmatch->participant2_id = $winnerid;
        }
        $nextmatch->save();
        return response()->json($match, 200);
    }

    public function getMatchesforUpdate($tournamentId) {
        $matches = Matches::whereNotNull('participant1_id')
                    ->whereNotNull('participant2_id')
                    ->whereNull('winner_id')
                    ->where('TournamentID', $tournamentId)
                    ->with('participant1')
                    ->with('participant2')
                    ->get();
        $matcheswithnicks = $matches->map(function ($match) {
            $match->nick1 = $match->participant1->name;
            $match->nick2 = $match->participant2->name;
            return $match;
        });
        return response()->json($matcheswithnicks, 200);
    }

    public function getMatchesForTournament($tournamentId)
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
                'resultText' => $match->participant1_score, 
                'isWinner' => $match->participant1->id == $match->winner_id ? true : false, 
                'status' => null, 
                'name' => $match->participant1->name,
                'picture' => 'teamlogos/client_team_default_logo' 
            ];
        }

        // Dodanie uczestnika 2, jeśli istnieje
        if ($match->participant2) {
            $participants[] = [
                'id' => $match->participant2->id,
                'resultText' => $match->participant2_score, 
                'isWinner' => $match->participant2->id == $match->winner_id ? true : false, 
                'status' => null, 
                'name' => $match->participant2->name,
                'picture' => 'teamlogos/client_team_default_logo' 
            ];
        }

        return [
            'id' => $match->id,
            'nextMatchId' => $match->next_match_id, 
            'tournamentRoundText' => $match->round, 
            'startTime' => null, 
            'state' => 'WALK_OVER', 
            'participants' => $participants,
        ];
    });

    return response()->json($formattedMatches, 200);
}
}
