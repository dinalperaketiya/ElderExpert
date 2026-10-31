<?php

use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\ExpertMatchController;
use App\Http\Controllers\ExpertProfileController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProjectApplicationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\YoungProfessionalProfileController;
use Illuminate\Support\Facades\Route;

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Test route
Route::get('/test', [TestController::class, 'test']);

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/expert-profile-photos/{filename}', [ExpertProfileController::class, 'photo'])
    ->where('filename', '[A-Za-z0-9._-]+');
Route::get('/young-professional-profile-photos/{filename}', [YoungProfessionalProfileController::class, 'photo'])
    ->where('filename', '[A-Za-z0-9._-]+');

// ==========================================
// PROTECTED ROUTES
// ==========================================

Route::middleware('auth:sanctum')->group(function () {

    // Authentication
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // ======================================
    // EXPERTS
    // ======================================

    Route::get('/experts/me', [ExpertProfileController::class, 'mine'])->middleware('role:expert');
    Route::get('/experts', [ExpertProfileController::class, 'index']);
    Route::get('/experts/{id}', [ExpertProfileController::class, 'show'])
        ->middleware('role:expert,admin');
    Route::post('/experts', [ExpertProfileController::class, 'store']);
    Route::put('/experts/{id}', [ExpertProfileController::class, 'update']);
    Route::delete('/experts/{id}', [ExpertProfileController::class, 'destroy']);

    // ======================================
    // COMPANIES
    // ======================================

    Route::get('/companies/me', [CompanyProfileController::class, 'mine']);
    Route::get('/companies', [CompanyProfileController::class, 'index']);
    Route::get('/companies/{id}', [CompanyProfileController::class, 'show']);
    Route::post('/companies', [CompanyProfileController::class, 'store']);
    Route::put('/companies/{id}', [CompanyProfileController::class, 'update']);
    Route::delete('/companies/{id}', [CompanyProfileController::class, 'destroy']);

    // COMPANY PROJECTS
    Route::post('/expert-matches', ExpertMatchController::class)->middleware(['role:company', 'throttle:10,1']);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
    Route::get('/applications/me', [ProjectApplicationController::class, 'mine']);
    Route::post('/projects/{project}/applications', [ProjectApplicationController::class, 'store']);

    // ======================================
    // YOUNG PROFESSIONALS
    // ======================================

    Route::get('/young-professionals/me', [YoungProfessionalProfileController::class, 'mine'])->middleware('role:young_professional');
    Route::get('/young-professionals', [YoungProfessionalProfileController::class, 'index']);
    Route::get('/young-professionals/{id}', [YoungProfessionalProfileController::class, 'show']);
    Route::post('/young-professionals', [YoungProfessionalProfileController::class, 'store']);
    Route::put('/young-professionals/{id}', [YoungProfessionalProfileController::class, 'update']);
    Route::delete('/young-professionals/{id}', [YoungProfessionalProfileController::class, 'destroy']);

    // ======================================
    // SERVICES
    // ======================================

    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{id}', [ServiceController::class, 'show']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // ======================================
    // AVAILABILITY
    // ======================================

    Route::get('/availability', [AvailabilityController::class, 'index']);
    Route::get('/availability/{id}', [AvailabilityController::class, 'show']);
    Route::post('/availability', [AvailabilityController::class, 'store']);
    Route::put('/availability/{id}', [AvailabilityController::class, 'update']);
    Route::delete('/availability/{id}', [AvailabilityController::class, 'destroy']);

    // ======================================
    // BOOKINGS
    // ======================================

    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::put('/bookings/{id}', [BookingController::class, 'update']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);

    // ======================================
    // PAYMENTS
    // ======================================

    Route::get('/payments', [PaymentController::class, 'index']);
    Route::get('/payments/{id}', [PaymentController::class, 'show']);
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::put('/payments/{id}', [PaymentController::class, 'update']);
    Route::delete('/payments/{id}', [PaymentController::class, 'destroy']);

    // ======================================
    // REVIEWS
    // ======================================

    Route::get('/reviews', [ReviewController::class, 'index']);
    Route::get('/reviews/{id}', [ReviewController::class, 'show']);
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);

    // ======================================
    // MESSAGES
    // ======================================

    Route::get('/messages', [MessageController::class, 'index']);
    Route::get('/messages/{id}', [MessageController::class, 'show']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::put('/messages/{id}', [MessageController::class, 'update']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);

    // ======================================
    // NOTIFICATIONS
    // ======================================

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/{id}', [NotificationController::class, 'show']);
    Route::post('/notifications', [NotificationController::class, 'store']);
    Route::put('/notifications/{id}', [NotificationController::class, 'update']);
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);

    // ======================================
    // USERS
    // ======================================

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

});
