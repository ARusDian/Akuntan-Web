<?php

use App\Http\Controllers\ShowController;
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

Route::get('period-transaction-journals-api/{period_id}', [ShowController::class,'TransactionJournalPeriod'])->name('period-transaction-journals-api');
Route::post('/date-subaccount-api', [ShowController::class, 'SubAccountsByDate'])->name('date-subaccount-api');
Route::post('/date-subaccount-category-api', [ShowController::class, 'SubAccountsCategoryByDate'])->name('date-subaccount-category-api');
Route::post('/date-subaccount-details-api', [ShowController::class, 'SubAccountsDetailsByDate'])->name('date-subaccount-details-api');
Route::post('/date-subaccount-transactions-api', [ShowController::class, 'SubAccountsTransactionsByDate'])->name('date-subaccount-transactions-api');
