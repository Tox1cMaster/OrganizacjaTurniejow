<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Participant;

class ParticipantsController extends Controller
{
    public function store(Request $request)
    {
        $existingParticipant = Participant::where([
            'TournamentID' => $request->input('TournamentID'),
            'UserID' => $request->input('UserID')
        ])->first();
        
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
            // Pobierz uczestników danego turnieju wraz z ich danymi użytkownika
            $participants = Participant::where('TournamentID', $id)
                                        ->with('user') // 'user' to nazwa relacji w modelu Participant
                                        ->get();

            // Przetwórz uczestników, aby zawierali tylko potrzebne informacje
            $participantsWithNicknames = $participants->map(function ($participant) {
                // Sprawdź, czy relacja z użytkownikiem istnieje
                if ($participant->user) {
                    $participant->nickname = $participant->user->name; // Dodaj nick użytkownika do uczestnika
                } else {
                    $participant->nickname = 'Nieznany użytkownik'; // Alternatywna wartość, jeśli użytkownik nie istnieje
                }

                // Usuń niepotrzebne już pełne dane użytkownika z obiektu uczestnika
                unset($participant->user);

                return $participant;
            });

            return response()->json($participantsWithNicknames);
        }
}
