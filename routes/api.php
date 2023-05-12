<?php

use App\Http\Controllers\TransactionJournalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('period-transaction-journals-byPeriod/{period_id}', [TransactionJournalController::class,'TransactionJournalPeriod'])->name('period-transaction-journals-byPeriod');
