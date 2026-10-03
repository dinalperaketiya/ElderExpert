<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\ExpertProfileController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/test', [TestController::class, 'test']);


Route::get('/experts', [ExpertProfileController::class, 'index']);
Route::get('/experts/{id}', [ExpertProfileController::class, 'show']);
Route::post('/experts', [ExpertProfileController::class, 'store']);
Route::put('/experts/{id}', [ExpertProfileController::class, 'update']);
Route::delete('/experts/{id}', [ExpertProfileController::class, 'destroy']);
