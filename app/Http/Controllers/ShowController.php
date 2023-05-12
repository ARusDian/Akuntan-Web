<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Period;
use App\Models\SubAccount;
use App\Models\TransactionJournal;
use App\Models\TransactionJournalDetail;
use Illuminate\Http\Request;
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

    public function TransactionJournalPeriod(Request $request)
    {
        $transactionJournals = TransactionJournal::with(['period', 'transactionJournalDetails.subAccount'])->where('period_id', 1)->get();
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
                        'type' => 'debit'
                    ]);
                }else{
                    array_push($arrCreditDetails, [
                        'id_subaccount' => $detail->subAccount->id,
                        'subaccount' => $detail->subAccount->name,
                        'amount' => $detail->amount,
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

    public function SubAccountByDateView()
    {
        return Inertia::render('Show/SubaccountbyDate', [
        ]);
    }

    public function SubAccountByDate(Request $request)
    {
        $startDate = $request->start;
        $endDate = $request->end;
        $transactionJournalsWithDetailsByDate = TransactionJournal::with(['period', 'transactionJournalDetails.subAccount'])->whereBetween('date', [$startDate, $endDate])->get();
        $transactionJournalsWithDetails = [];
        $subAccountsSumByDate = [];
        foreach($transactionJournalsWithDetailsByDate as $transaction){
            $arrDebitDetails = [];
            $arrCreditDetails = [];
            foreach($transaction->transactionJournalDetails as $detail){
                if($detail->type == 'debit'){
                    // $arrDebitDetails[] = $detail;
                    array_push($arrDebitDetails, [
                        'id_subaccount' => $detail->subAccount->id,
                        'subaccount' => $detail->subAccount->name,
                        'amount' => $detail->amount,
                        'type' => 'debit'
                    ]);
                }else{
                    array_push($arrCreditDetails, [
                        'id_subaccount' => $detail->subAccount->id,
                        'subaccount' => $detail->subAccount->name,
                        'amount' => $detail->amount,
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

        foreach($transactionJournalsWithDetails as $transaction){
            foreach($transaction['debit_details'] as $detail){
                if(array_key_exists($detail['id_subaccount'], $subAccountsSumByDate)){
                    $subAccountsSumByDate[$detail['id_subaccount']]['debit'] += $detail['amount'];
                }else{
                    $subAccountsSumByDate[$detail['id_subaccount']] = [
                        'id' => $detail['id_subaccount'], 
                        'subaccount' => $detail['subaccount'],
                        'debit' => $detail['amount'],
                        'credit' => 0
                    ];
                }
            }

            foreach($transaction['credit_details'] as $detail){
                if(array_key_exists($detail['id_subaccount'], $subAccountsSumByDate)){
                    $subAccountsSumByDate[$detail['id_subaccount']]['credit'] += $detail['amount'];
                }else{
                    $subAccountsSumByDate[$detail['id_subaccount']] = [
                        'id' => $detail['id_subaccount'],
                        'subaccount' => $detail['subaccount'],
                        'debit' => 0,
                        'credit' => $detail['amount']
                    ];
                }
            }
        }

        return response()->json(['data' => $subAccountsSumByDate], 200);
    }


}
