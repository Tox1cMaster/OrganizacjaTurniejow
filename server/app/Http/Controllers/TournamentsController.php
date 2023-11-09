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
        //Jeżeli status jest inny niż 0 nie wykonuj dalszych operacji  
        if($tournament->Status != 0) {
            return response()->json(['error' => 'Nie można wygenerować meczy dla turnieju, który nie jest w trakcie rejestracji'], 403);
        }
        $participants = $tournament->participants()->get();

        // Przemieszaj listę uczestników
        $participants = $participants->shuffle();

        // Oblicz najbliższą potęgę 2 mniejszą lub równą liczbie uczestników
        $nearestPowerOfTwo = pow(2, floor(log($participants->count(), 2)));

        // Utwórz mecze dla najbliższej potęgi 2
        $matches = [];
        for ($i = 0; $i < $nearestPowerOfTwo; $i += 2) {
            $match = new Matches();
            $match->TournamentID = $tournamentId;
            $match->participant1_id = $participants[$i]->UserID;
            $match->participant2_id = $participants[$i + 1]->UserID;
            $match->round = 1;
            $match->match_order = $i / 2 + 1; // Ustaw match_order
            $match->prev_match_id = null; // Ustaw prev_match_id na null
            $match->next_match_id = null; // Ustaw next_match_id na null
            $match->save();
            $matches[] = $match;
        }

        // Uczestnicy, którzy nie mają pary, automatycznie awansują do następnej rundy
        for ($i = $nearestPowerOfTwo; $i < $participants->count(); $i++) {
            $match = new Matches();
            $match->TournamentID = $tournamentId;
            $match->participant1_id = $participants[$i]->UserID;
            $match->participant2_id = null;
            $match->winner_id = $participants[$i]->UserID;
            $match->round = 2;
            $match->match_order = $i - $nearestPowerOfTwo + 1; // Ustaw match_order
            $match->prev_match_id = null; // Ustaw prev_match_id na null
            $match->next_match_id = null; // Ustaw next_match_id na null
            $match->save();
            $matches[] = $match;
        }

        // Zmień status turnieju na "w trakcie"
        $tournament->Status = '1';
        $tournament->save();

        return response()->json($matches, 200);
    }
}
