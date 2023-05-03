<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\SubAccount;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $subAccounts = SubAccount::with('account')->get();
        return Inertia::render('Admin/SubAccount/Index', [
            'subAccounts' => $subAccounts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $accounts = Account::all();
        return Inertia::render('Admin/SubAccount/Create', [
            'accounts' => $accounts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'id' => 'required|string|size:4|unique:accounts|unique:sub_accounts',
            'name' => 'required|string|max:255',
            'account_id' => 'required|exists:accounts,id',
        ]);

        SubAccount::create([
            'id' => $request->id,
            'name' => $request->name,
            'account_id' => $request->account_id,
        ]);

        return redirect()->route('subaccount.index')->banner('Sub Account created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SubAccount $subAccount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
  public function edit($id)
    {
        //
        $accounts = Account::all();
        $subAccount = SubAccount::find($id);
        return Inertia::render('Admin/SubAccount/Edit', [
            'accounts' => $accounts,
            'subAccount' => $subAccount
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //


        $request->validate([
            'id' => 'required|string|size:4|unique:accounts|unique:sub_accounts,id,' . $id,
            'name' => 'required|string|max:255',
            'account_id' => 'required|exists:accounts,id',
        ]);

        $subAccount = SubAccount::find($id);

        $subAccount->update([
            'id' => $request->id,
            'name' => $request->name,
            'account_id' => $request->account_id,
        ]);


        return redirect()->route('subaccount.index')->banner('Sub Account updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        
        $subAccount = SubAccount::find($id);
        $subAccount->delete();

        return redirect()->route('subaccount.index')->banner('Sub Account deleted.');
    }
}
