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

Route::get('/tournaments/{id}', 'TournamentsController@show');
Route::post('/tournaments', 'TournamentsController@store')->middleware('auth:api');
Route::put('/tournaments/{id}', 'TournamentsController@update')->middleware('auth:api');
Route::patch('/tournaments/{id}/status', 'TournamentsController@changeStatus')->middleware('auth:api');
Route::delete('/tournaments/{id}', 'TournamentsController@destroy')->middleware('auth:api');

Route::group(['middleware'=>'api'],function(){
    Route::get('users', [AuthController::class, 'users']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
});