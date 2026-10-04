<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\ExpertProfileController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\YoungProfessionalProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AvailabilityController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/test', [TestController::class, 'test']);


Route::get('/experts', [ExpertProfileController::class, 'index']);
Route::get('/experts/{id}', [ExpertProfileController::class, 'show']);
Route::post('/experts', [ExpertProfileController::class, 'store']);
Route::put('/experts/{id}', [ExpertProfileController::class, 'update']);
Route::delete('/experts/{id}', [ExpertProfileController::class, 'destroy']);

Route::get('/companies', [CompanyProfileController::class, 'index']);
Route::get('/companies/{id}', [CompanyProfileController::class, 'show']);
Route::post('/companies', [CompanyProfileController::class, 'store']);
Route::put('/companies/{id}', [CompanyProfileController::class, 'update']);
Route::delete('/companies/{id}', [CompanyProfileController::class, 'destroy']);

Route::get('/young-professionals', [YoungProfessionalProfileController::class, 'index']);
Route::get('/young-professionals/{id}', [YoungProfessionalProfileController::class, 'show']);
Route::post('/young-professionals', [YoungProfessionalProfileController::class, 'store']);
Route::put('/young-professionals/{id}', [YoungProfessionalProfileController::class, 'update']);
Route::delete('/young-professionals/{id}', [YoungProfessionalProfileController::class, 'destroy']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::post('/services', [ServiceController::class, 'store']);
Route::put('/services/{id}', [ServiceController::class, 'update']);
Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

Route::get('/availability', [AvailabilityController::class, 'index']);
Route::get('/availability/{id}', [AvailabilityController::class, 'show']);
Route::post('/availability', [AvailabilityController::class, 'store']);
Route::put('/availability/{id}', [AvailabilityController::class, 'update']);
Route::delete('/availability/{id}', [AvailabilityController::class, 'destroy']);
