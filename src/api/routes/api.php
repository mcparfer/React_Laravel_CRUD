<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/* Our created controllers. */
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\SellController;
use App\Http\Controllers\API\UnitController;
use App\Http\Controllers\API\UnitEventController;
use App\Http\Controllers\AuthController;

/* API Routes: here you can register API routes for your application. These
routes are loaded by the RouteServiceProvider within a group which
is assigned the "api" middleware group. Enjoy building your API! */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/* Define a group of routes for a specific controller. */
Route::controller(EventController::class)->group(function() {
    Route::get('/events', 'index');
    Route::post('/event', 'store');
    Route::get('/event/{id}', 'show');
    Route::patch('/event/{id}', 'update');
    Route::delete('/event/{id}', 'destroy');
});

Route::controller(UnitController::class)->group(function() {
    Route::get('/units', 'index');
});


Route::controller(UnitEventController::class)->group(function() {
    Route::get('/set-songs', 'index');
    Route::get('/get-songs/{id}', 'getEventUnits');
    Route::post('/set-songs', 'checkUnitInEvent');
});

Route::controller(SellController::class)->group(function() {
    Route::get('/sellings', 'index');
    Route::post('/sell/{id}', 'store');
    Route::get('/sell/{id}', 'show');
    Route::put('/sell/{id}', 'update');
    Route::delete('/sell/{id}', 'destroy');
});

Route::post('/login', [AuthController::class, 'login' ]);
Route::post('/register', [AuthController::class, 'register' ]);

Route::group(['middleware' => 'api'], function(){
    Route::post('/logout', [AuthController::class, 'logout' ]);
    Route::post('/refresh', [AuthController::class, 'refresh' ]);
    Route::post('/me', [AuthController::class, 'me' ]);
});



