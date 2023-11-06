<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Participant;

class ParticipantsController extends Controller
{
    public function store(Request $request)
    {
        $existingParticipant = Participant::firstWhere([
            'TournamentID' => $request->input('TournamentID'),
            'UserID' => $request->input('UserID')
        ]);//sprawdzam czy juz jest ktoś w danym turnieju

        if ($existingParticipant) {
            return response()->json(['error' => 'Uczestnik już istnieje w tym turnieju'], 409);
        }

        $participant = new Participant();
        $participant->TournamentID = $request->input('TournamentID');
        $participant->UserID = $request->input('UserID');
        $participant->save();

        return response()->json($participant, 201);
    }

        public function getParticipantsByTournament($id)
    {
        $participants = Participant::where('TournamentID', $id)->with('user')->get();

        // Przekształć uczestników, aby zawierali nick użytkownika
        $participants = $participants->map(function ($participant) {
            $participant->nickname = $participant->user->name; // Dodaj nick użytkownika do uczestnika
            unset($participant->user); // Usuń niepotrzebne już dane użytkownika
            return $participant;
        });

        return response()->json($participants);
}
}
