<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\ExpertProfileController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\YoungProfessionalProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;

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

Route::get('/bookings', [BookingController::class, 'index']);
Route::get('/bookings/{id}', [BookingController::class, 'show']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::put('/bookings/{id}', [BookingController::class, 'update']);
Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);

Route::get('/payments', [PaymentController::class, 'index']);
Route::get('/payments/{id}', [PaymentController::class, 'show']);
Route::post('/payments', [PaymentController::class, 'store']);
Route::put('/payments/{id}', [PaymentController::class, 'update']);
Route::delete('/payments/{id}', [PaymentController::class, 'destroy']);

Route::get('/reviews', [ReviewController::class, 'index']);
Route::get('/reviews/{id}', [ReviewController::class, 'show']);
Route::post('/reviews', [ReviewController::class, 'store']);
Route::put('/reviews/{id}', [ReviewController::class, 'update']);
Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);

Route::get('/messages', [MessageController::class, 'index']);
Route::get('/messages/{id}', [MessageController::class, 'show']);
Route::post('/messages', [MessageController::class, 'store']);
Route::put('/messages/{id}', [MessageController::class, 'update']);
Route::delete('/messages/{id}', [MessageController::class, 'destroy']);

Route::get('/notifications', [NotificationController::class, 'index']);
Route::get('/notifications/{id}', [NotificationController::class, 'show']);
Route::post('/notifications', [NotificationController::class, 'store']);
Route::put('/notifications/{id}', [NotificationController::class, 'update']);
Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);
