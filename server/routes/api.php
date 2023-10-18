<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TournamentsController;

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

Route::post('login', [AuthController::class,'login']);
Route::post('register', [AuthController::class,'register']);

Route::get('check-username', [AuthController::class, 'checkUsername']);
Route::get('/tournaments/{id}', [TournamentsController::class, 'show']);

Route::group(['middleware'=>'api'],function(){
    Route::post('/tournaments', [TournamentsController::class,'store']);
    Route::put('/tournaments/{id}', [TournamentsController::class, 'update']);
    Route::delete('/tournaments/{id}', [TournamentsController::class, 'destroy']);
    Route::patch('/tournaments/{id}/status', [TournamentsController::class, 'changeStatus']);
    Route::get('users', [AuthController::class, 'users']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
});