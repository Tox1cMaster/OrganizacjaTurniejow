<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\ParticipantsController;
use App\Http\Controllers\TournamentsController;
use App\Http\Controllers\MatchesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Wszyscy
//Użytkownicy
Route::post('login', [AuthController::class,'login']);
Route::post('register', [AuthController::class,'register']);
Route::get('check-username', [AuthController::class, 'checkUsername']);
//Turnieje
Route::get('tournaments', [TournamentsController::class, 'index']);
Route::get('tournaments/{id}', [TournamentsController::class, 'show']);
Route::get('tournaments/{id}/participants', [ParticipantsController::class, 'getParticipantsByTournament']);

//Tylko zalogowani użytkownicy
Route::group(['middleware'=>'api'],function(){
    //Uczestnicy
    Route::post('participants', [ParticipantsController::class,'store']);
    Route::delete('participants/{userID}', [ParticipantsController::class,'destroyByUser']);
    //Turnieje
    Route::post('tournaments', [TournamentsController::class,'store']);
    Route::put('tournaments/{id}', [TournamentsController::class, 'update']);
    Route::delete('tournaments/{id}', [TournamentsController::class, 'destroy']);
    Route::patch('tournaments/{id}/status', [TournamentsController::class, 'changeStatus']);
    //Mecze
    Route::post('/tournaments/{id}/generate', [TournamentsController::class, 'generateMatches']);
    Route::get('/tournaments/{id}/matches', [MatchesController::class, 'getMatchesForTournament']);
    Route::get('/tournaments/{id}/matchesorg', [MatchesController::class, 'getMatchesforUpdate']);
    Route::put('/updatematch/{id}', [MatchesController::class, 'updateScore']);
    //Gry
    Route::post('games', [GamesController::class, 'store']);
    Route::get('games', [GamesController::class, 'games']);
    //Użytkownicy
    Route::get('users', [AuthController::class, 'users']);
    Route::get('user/stats/{id}', [AuthController::class, 'userstats']); //Statystyki użytkownika
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
});