<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;

class GamesController extends Controller
{
    public function show($id)
    {
        $tournament = Game::findOrFail($id);
        return response()->json($tournament);
    }

    public function games()
    {
        $games = Game::all();
        return response()->json($games);
    }

    public function store(Request $request)
    {
        $game = new Game();
        $game->GameName = $request->input('GameName');
        $game->save();
        return response()->json($game, 201);
    }
}
