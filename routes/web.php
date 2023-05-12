<?php

use App\Actions\Fortify\UserProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ShowController;
use App\Http\Controllers\SubAccountController;
use App\Http\Controllers\PeriodController;
use App\Http\Controllers\TransactionJournalController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::resource('/account', AccountController::class);
Route::resource('/subaccount', SubAccountController::class);
Route::resource('/period', PeriodController::class);
Route::resource('/transaction-journal', TransactionJournalController::class);
Route::get('/period-transaction-journals', [ShowController::class, 'TransactionJournalPeriodView'])->name('period-transaction-journals');
Route::get('/date-subaccount-transactions', [ShowController::class, 'SubAccountsByDateView'])->name('date-subaccount-transactions');
Route::get('/date-subaccount-details', [ShowController::class, 'SubAccountDetailsByDateView'])->name('date-subaccount-details');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/user/profile', [UserProfileController::class, 'show'])->name('profile.show');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::middleware(['role:admin|super-admin'])->group(function () {
        Route::middleware(['role:super-admin'])->group(function () {
            Route::resource('/user', UserController::class);
        });
    });
});
