<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tournament;

class TournamentsController extends Controller
{
    public function show($id)
    {
        $tournament = Tournament::findOrFail($id);
        return response()->json($tournament);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $tournament = new Tournament();
        $tournament->id = $user->id;
        $tournament->GameID = $request->input('GameID');
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
        if ($tournament->id !== Auth::user()->id) {
            return response()->json(['error' => 'Brak autoryzacji'], 403);
        }
        $tournament->GameID = $request->input('GameID');
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
        if ($tournament->id !== Auth::user()->id) {
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
        if ($tournament->id !== Auth::user()->id) {
            return response()->json(['error' => 'Brak autoryzacji'], 403);
        }
        $tournament->delete();
        return response()->json(null, 204);
    }
}
