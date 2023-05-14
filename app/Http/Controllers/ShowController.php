<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Period;
use App\Models\SubAccount;
use App\Models\TransactionJournal;
use App\Models\TransactionJournalDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ShowController extends Controller
{
    //
    public function TransactionJournalPeriodView()
    {
        $periods = Period::all();
        return Inertia::render('Show/TransactionByPeriod', [
            'periods' => $periods 
        ]);
    }

    public function TransactionJournalPeriod(Request $request, $period_id)
    {
        $transactionJournals = TransactionJournal::with(['period', 'transactionJournalDetails.subAccount'])->where('period_id', $period_id)->get();
        $transactionJournalsWithDetails = [];
        foreach($transactionJournals as $transaction){
            $arrDebitDetails = [];
            $arrCreditDetails = [];
            foreach($transaction->transactionJournalDetails as $detail){
                if($detail->type == 'debit'){
                    // $arrDebitDetails[] = $detail;
                    array_push($arrDebitDetails, [
                        'id_subaccount' => $detail->subAccount->id,
                        'subaccount' => $detail->subAccount->name,
                        'amount' => $detail->amount,
                        'category' => $detail->category,
                        'type' => 'debit'
                    ]);
                }else{
                    array_push($arrCreditDetails, [
                        'id_subaccount' => $detail->subAccount->id,
                        'subaccount' => $detail->subAccount->name,
                        'amount' => $detail->amount,
                        'category' => $detail->category,
                        'type' => 'credit'
                    ]);
                }
            }
            array_push($transactionJournalsWithDetails, [
                'transaction_journal' => $transaction,
                'debit_details' => $arrDebitDetails,
                'credit_details' => $arrCreditDetails
            ]);
        }
        return response()->json(['data' => $transactionJournalsWithDetails], 200); 
    }

    public function SubAccountsByDateView()
    {
        return Inertia::render('Show/SubaccountsbyDate', [
        ]);
    }

    public function SubAccountsByDate(Request $request)
    {
        $startDate = $request->start;
        $endDate = $request->end;
        $transactionJournalsWithDetailsByDate = TransactionJournal::with(['period', 'transactionJournalDetails.subAccount'])->whereBetween('date', [$startDate, $endDate])->get();
        $subAccountsSumByDate = [];
        foreach($transactionJournalsWithDetailsByDate as $transaction){
            foreach($transaction->transactionJournalDetails as $detail){
                if($detail->type == 'debit'){
                    if(array_key_exists($detail->subAccount->id, $subAccountsSumByDate)){
                        $subAccountsSumByDate[$detail->subAccount->id]['debit'] += $detail->amount;
                    }else{
                        $subAccountsSumByDate[$detail->subAccount->id] = [
                            'id' => $detail->subAccount->id,
                            'name' => $detail->subAccount->name,
                            'debit' => $detail->amount,
                            'credit' => 0
                        ];
                    }
                }else{
                    if(array_key_exists($detail->subAccount->id, $subAccountsSumByDate)){
                        $subAccountsSumByDate[$detail->subAccount->id]['credit'] += $detail->amount;
                    }else{
                        $subAccountsSumByDate[$detail->subAccount->id] = [
                            'id' => $detail->subAccount->id,
                            'name' => $detail->subAccount->name,
                            'debit' => 0,
                            'credit' => $detail->amount
                        ];
                    }
                }
            }
        }

        return response()->json(['data' => $subAccountsSumByDate], 200);
    }

    public function SubAccountsDetailsByDateView()
    {
        return Inertia::render('Show/SubaccountsWithDetailsbyDate', [
        ]);
    }

     public function SubAccountsDetailsByDate(Request $request)
    {
        $startDate = $request->start;
        $endDate = $request->end;
        $transactionJournalsWithDetailsByDate = TransactionJournal::with(['period', 'transactionJournalDetails.subAccount'])->whereBetween('date', [$startDate, $endDate])->get();
        $subAccountsSumByDate = [];
        foreach($transactionJournalsWithDetailsByDate as $transaction){
            foreach($transaction->transactionJournalDetails as $detail){
                if($detail->type == 'debit'){
                    if(array_key_exists($detail->subAccount->id, $subAccountsSumByDate)){
                        $subAccountsSumByDate[$detail->subAccount->id]['debit'] += $detail->amount;
                    }else{
                        $subAccountsSumByDate[$detail->subAccount->id] = [
                            'id' => $detail->subAccount->id,
                            'name' => $detail->subAccount->name,
                            'debit' => $detail->amount,
                            'credit' => 0
                        ];
                    }
                }else{
                    if(array_key_exists($detail->subAccount->id, $subAccountsSumByDate)){
                        $subAccountsSumByDate[$detail->subAccount->id]['credit'] += $detail->amount;
                    }else{
                        $subAccountsSumByDate[$detail->subAccount->id] = [
                            'id' => $detail->subAccount->id,
                            'name' => $detail->subAccount->name,
                            'debit' => 0,
                            'credit' => $detail->amount
                        ];
                    }
                }
            }
        }

        return response()->json(['data' => $subAccountsSumByDate], 200);
    }

    public function SubAccountsTransactionsByDateView()
    {
        return Inertia::render('Show/SubaccountsWithTransactionsbyDate', [
        ]);
    }

    public function SubAccountsTransactionsByDate(Request $request)
    {
        $startDate = $request->start;
        $endDate = $request->end;
        $transactionJournalsWithDetailsByDate = TransactionJournal::with(['period', 'transactionJournalDetails.subAccount'])->whereBetween('date', [$startDate, $endDate])->get();
        $subAccountswithTransactions = [];
        foreach($transactionJournalsWithDetailsByDate as $transaction){
            foreach($transaction->transactionJournalDetails as $detail){
               if(array_key_exists($detail->subAccount->id, $subAccountswithTransactions)){
                    array_push($subAccountswithTransactions[$detail->subAccount->id]['transactions'], [
                        'description' => $transaction->description,
                        'date' => $transaction->date,
                        'type' => $detail->type,
                        'amount' => $detail->amount,
                    ]);
                }else{
                    $subAccountswithTransactions[$detail->subAccount->id] = [
                        'id' => $detail->subAccount->id,
                        'name' => $detail->subAccount->name,
                        'transactions' => [[
                            'description' => $transaction->description,
                            'date' => $transaction->date,
                            'type' => $detail->type,
                            'amount' => $detail->amount,
                        ]]
                    ];
                }
            }
        }
        return response()->json(['data' => $subAccountswithTransactions], 200);
    }

    public function SubaccountsCategorybyDateView()
    {
        return Inertia::render('Show/SubaccountsCategorybyDate', [
        ]);
    }

    public function SubaccountsCategorybyDate(Request $request)
    {
        $startDate = $request->start;
        $endDate = $request->end;
        $transactionJournalDetailsByDate = TransactionJournalDetail::with(['subAccount'])->whereHas('transactionJournal', function($q) use ($startDate, $endDate){
            $q->whereBetween('date', [$startDate, $endDate]);
        })->get();

        $transactionJournalDetailsGroupByCategory = [];
        foreach($transactionJournalDetailsByDate as $detail){
            if(array_key_exists($detail->category, $transactionJournalDetailsGroupByCategory)){
                if(array_key_exists($detail->subAccount->id, $transactionJournalDetailsGroupByCategory[$detail->category])){
                    if($detail->type == 'debit'){
                        $transactionJournalDetailsGroupByCategory[$detail->category][$detail->subAccount->id]['debit'] += $detail->amount;
                    }else{
                        $transactionJournalDetailsGroupByCategory[$detail->category][$detail->subAccount->id]['credit'] += $detail->amount;
                    }
                }else{
                    if($detail->type == 'debit'){
                        $transactionJournalDetailsGroupByCategory[$detail->category][$detail->subAccount->id] = [
                            'id' => $detail->subAccount->id,
                            'subaccount' => $detail->subAccount->name,
                            'category' => $detail->category,
                            'debit' => $detail->amount,
                            'credit' => 0
                        ];
                    }else{
                        $transactionJournalDetailsGroupByCategory[$detail->category][$detail->subAccount->id] = [
                            'id' => $detail->subAccount->id,
                            'subaccount' => $detail->subAccount->name,
                            'category' => $detail->category,
                            'debit' => 0,
                            'credit' => $detail->amount
                        ];
                    }
                }
            }else{
                if(array_key_exists($detail->subAccount->id, $transactionJournalDetailsGroupByCategory)){
                    if($detail->type == 'debit'){
                        $transactionJournalDetailsGroupByCategory[$detail->category][$detail->subAccount->id]['debit'] += $detail->amount;
                    }else{
                        $transactionJournalDetailsGroupByCategory[$detail->category][$detail->subAccount->id]['credit'] += $detail->amount;
                    }
                }else{
                    if($detail->type == 'debit'){
                        $transactionJournalDetailsGroupByCategory[$detail->category][$detail->subAccount->id] = [
                            'id' => $detail->subAccount->id,
                            'subaccount' => $detail->subAccount->name,
                            'category' => $detail->category,
                            'debit' => $detail->amount,
                            'credit' => 0
                        ];
                    }else{
                        $transactionJournalDetailsGroupByCategory[$detail->category][$detail->subAccount->id] = [
                            'id' => $detail->subAccount->id,
                            'subaccount' => $detail->subAccount->name,
                            'category' => $detail->category,
                            'debit' => 0,
                            'credit' => $detail->amount
                        ];
                    } 
                }
            }
        }        
        return response()->json(['data' => $transactionJournalDetailsGroupByCategory], 200);
    }
}
