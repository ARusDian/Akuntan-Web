<?php

namespace App\Http\Controllers;

use App\Models\Period;
use App\Models\SubAccount;
use App\Models\TransactionJournal;
use App\Models\TransactionJournalDetail;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionJournalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $transactionJournals = TransactionJournal::with(['period'])->get();
        return Inertia::render('Admin/TransactionJournal/Index', [
            'transactionJournals' => $transactionJournals
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $periods = Period::all();
        $subAccounts = SubAccount::all();
        return Inertia::render('Admin/TransactionJournal/Create', [
            'periods' => $periods,
            'subAccounts' => $subAccounts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'period_id' => 'required|exists:periods,id|integer',
            'date' => 'required|date|date_format:Y-m-d',
            'description' => 'required|string',
            'transaction_journal_details.*.sub_account_id' => 'required|exists:sub_accounts,id|integer',
            'transaction_journal_details.*.amount' => 'required|numeric',
            'transaction_journal_details.*.type' => 'required|in:debit,credit',
        ]);
        return DB::transaction(function () use ($request) {
            $transactionJournal = TransactionJournal::create([
                'period_id' => $request->period_id,
                'date' => $request->date,
                'description' => $request->description,
            ]);

            foreach ($request->transaction_journal_details as $detail) {
                TransactionJournalDetail::create([
                    'transaction_journal_id' => $transactionJournal->id,
                    'sub_account_id' => $detail['sub_account_id'],
                    'amount' => $detail['amount'],
                    'type' => $detail['type'],
                ]);
            }
            
            return redirect()->route('transaction-journal.index')->banner('Transaction Journal created successfully');
        });
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $transactionJournal = TransactionJournal::with(['period', 'transactionJournalDetails.subAccount'])->find($id);
        return Inertia::render('Admin/TransactionJournal/Show', [
            'transactionJournal' => $transactionJournal
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $periods = Period::all();
        $subAccounts = SubAccount::all();
        $transactionJournal = TransactionJournal::with(['period', 'transactionJournalDetails.subAccount'])->find($id);
        // dd($transactionJournal);    
        return Inertia::render('Admin/TransactionJournal/Edit', [
            'periods' => $periods,
            'subAccounts' => $subAccounts,
            'transactionJournal' => $transactionJournal
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
       $request->validate([
            'period_id' => 'required|exists:periods,id|integer',
            'date' => 'required|date|date_format:Y-m-d',
            'description' => 'required|string',
            'transaction_journal_details.*.sub_account_id' => 'required|exists:sub_accounts,id|integer',
            'transaction_journal_details.*.amount' => 'required|numeric',
            'transaction_journal_details.*.type' => 'required|in:debit,credit',
        ]);



        return DB::transaction(function () use ($request, $id) {

            $transactionJournal = TransactionJournal::find($id);
            $detailsDiff = array_diff($transactionJournal->transactionJournalDetails->pluck('id')->toArray(), collect($request->transaction_journal_details)->pluck('id')->toArray());
            $transactionJournal->update([
                'period_id' => $request->period_id,
                'date' => $request->date,
                'description' => $request->description,
            ]);

            foreach ($detailsDiff as $detailId) {
                TransactionJournalDetail::find($detailId)->delete();
            }

            foreach ($request->transaction_journal_details as $detail) {
                TransactionJournalDetail::updateOrCreate([
                    'id' => $detail['id'] ?? null
                ], [
                    'transaction_journal_id' => $transactionJournal->id,
                    'sub_account_id' => $detail['sub_account_id'],
                    'amount' => $detail['amount'],
                    'type' => $detail['type'],
                ]);
            }
            
            return redirect()->route('transaction-journal.index')->banner('Transaction Journal created successfully');
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        return DB::transaction(function () use ($id) {
        $transactionJournal = TransactionJournal::find($id);
        foreach ($transactionJournal->transactionJournalDetails as $detail) {
            $detail->delete();
        }
        $transactionJournal->delete();
        return redirect()->route('transaction-journal.index')->banner('Transaction Journal Deleted Successfully');
        });
    }
}
