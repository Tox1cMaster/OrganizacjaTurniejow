<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\Models\Tournament;
use App\Models\Matches;

class TournamentsController extends Controller
{

    public function show($id)
    {
        $tournament = Tournament::findOrFail($id);
        $tournament->organizer = $tournament->user->name;
        return response()->json($tournament);
    }

    public function index()
{
    // Pobierz wszystkie turnieje, możesz także zaimplementować paginację lub sortowanie
    $tournaments = Tournament::all();
    $tournaments = $tournaments->map(function ($tournament) {
        $tournament->organizer = $tournament->user->name;
        unset($tournament->user);
        return $tournament;
    });
    
    // Jeśli chcesz, aby tylko zalogowany użytkownik widział swoje turnieje, użyj:
    // $userId = auth('api')->id();
    // $tournaments = Tournament::where('user_id', $userId)->get();
    
    return response()->json($tournaments);
}

    public function store(Request $request)
    {
        try {
            // Uzyskaj użytkownika na podstawie przesłanego tokenu JWT
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            // Obsługa błędów związanych z JWT, np. token nieprawidłowy, token wygasł itp.
            return response()->json(['error' => 'could_not_authenticate'], 401);
        }
    
        // Sprawdź, czy użytkownik został prawidłowo zautoryzowany i pobierz jego ID
        if (!$user) {
            return response()->json(['error' => 'user_not_found'], 404);
        }
        $tournament = new Tournament();
        $tournament->user_id = $user->id;    
        $tournament->GameID = $request->input('GameID');
        $tournament->TournamentName = $request->input('TournamentName');
        $tournament->Privacy = $request->input('Privacy');
        $tournament->TournamentFormat = $request->input('TournamentFormat');
        $tournament->Status = $request->input('Status');
        $tournament->Prizepool = $request->input('Prizepool');
        $tournament->save();
        return response()->json($tournament, 201);
    }

    public function update(Request $request, $id)
    {
        $tournament = Tournament::findOrFail($id);
        if ($tournament->user_id !== auth('api')->id()) {
            return response()->json(['error' => 'Brak autoryzacji'], 403);
        }
        $tournament->GameID = $request->input('GameID');
        $tournament->TournamentName = $request->input('TournamentName');
        $tournament->Privacy = $request->input('Privacy');
        $tournament->TournamentFormat = $request->input('TournamentFormat');
        $tournament->Status = $request->input('Status');
        $tournament->Prizepool = $request->input('Prizepool');
        $tournament->save();
        return response()->json($tournament, 200);
    }

    public function changeStatus(Request $request, $id)
    {
        $tournament = Tournament::findOrFail($id);
        if ($tournament->user_id !== auth('api')->id()) {
            return response()->json(['error' => 'Brak autoryzacji'], 403);
        }
        // Zmiana statusu - zależnie od implementacji może to być int lub string
        $tournament->Status = $request->input('Status');
        $tournament->save();
        return response()->json($tournament, 200);
    }

    public function destroy($id)
    {
        $tournament = Tournament::findOrFail($id);
        if ($tournament->user_id !== auth('api')->id()) {
            return response()->json(['error' => 'Brak autoryzacji'], 403);
        }
        $tournament->delete();
        return response()->json(null, 204);
    }

    public function generateMatches($tournamentId)
    {
        $tournament = Tournament::findOrFail($tournamentId);
        if($tournament->Status != 0) {
            return response()->json(['error' => 'Nie można wygenerować meczy dla turnieju, który nie jest w trakcie rejestracji'], 403);
        }
        $participants = $tournament->participants()->get()->shuffle();

        $participantCount = $participants->count();
        $nearestPowerOfTwo = pow(2, ceil(log($participantCount, 2)));
        $matchesFirstRound = $nearestPowerOfTwo / 2;
        $byesFirstRound = $nearestPowerOfTwo - $participantCount;

        $matches = [];
        $secondRoundParticipants = [];

        // Tworzenie meczów dla pierwszej rundy
        for ($i = 0; $i < $matchesFirstRound; $i++) {
            $match = new Matches();
            $match->TournamentID = $tournamentId;
            $match->round = 1;
            $match->match_order = $i + 1;

            $match->participant1_id = $participants->shift()->UserID ?? null;
            if ($byesFirstRound > 0) {
                $secondRoundParticipants[] = $match->participant1_id;
                $byesFirstRound--;
            } else {
                $match->participant2_id = $participants->isNotEmpty() ? $participants->shift()->UserID : null;
                if ($match->participant2_id === null) {
                    $secondRoundParticipants[] = $match->participant1_id;
                }
            }
            $match->save();
            $matches[] = $match;
        }

        // Tworzenie meczów dla drugiej rundy
        $secondRoundMatches = count($secondRoundParticipants) / 2;
        for ($i = 0; $i < $secondRoundMatches; $i++) {
            $match = new Matches();
            $match->TournamentID = $tournamentId;
            $match->round = 2;
            $match->match_order = $i + 1;

            $match->participant1_id = array_shift($secondRoundParticipants);
            $match->participant2_id = array_shift($secondRoundParticipants);

            $match->save();
            $matches[] = $match;
        }

        // Zmień status turnieju na "w trakcie"
        $tournament->Status = '1';
        $tournament->save();

        return response()->json($matches, 200);
    }


}
