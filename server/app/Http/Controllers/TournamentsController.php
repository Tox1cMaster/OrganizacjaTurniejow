<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use App\Models\Tournament;

class TournamentsController extends Controller
{

    public function show($id)
    {
        $tournament = Tournament::findOrFail($id);
        return response()->json($tournament);
    }

    public function index()
{
    // Pobierz wszystkie turnieje, możesz także zaimplementować paginację lub sortowanie
    $tournaments = Tournament::all();
    
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
}
