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
<<<<<<< HEAD
        $subAccount = SubAccount::all();
        return Inertia::render('Admin/SubAccount/Index', [
            'subAccount' => $subAccount
        ])
=======
        $subAccounts = SubAccount::with('account')->get();
        return Inertia::render('Admin/SubAccount/Index', [
            'subAccounts' => $subAccounts
        ]);
>>>>>>> 8c8f59000a66e302438fcedfb9c33528d29bd742
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
<<<<<<< HEAD
        return Inertia::render('Admin/SubAccount/Create', [
=======
        $accounts = Account::all();
        return Inertia::render('Admin/SubAccount/Create', [
            'accounts' => $accounts
>>>>>>> 8c8f59000a66e302438fcedfb9c33528d29bd742
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
<<<<<<< HEAD
            'id' => 'required|string|size:4|unique:subaccount',
            'name' => 'required|string|max:255',
=======
            'id' => 'required|string|size:4|unique:accounts|unique:sub_accounts',
            'name' => 'required|string|max:255',
            'account_id' => 'required|exists:accounts,id',
>>>>>>> 8c8f59000a66e302438fcedfb9c33528d29bd742
        ]);

        SubAccount::create([
            'id' => $request->id,
            'name' => $request->name,
<<<<<<< HEAD
        ]);

        return redirect()->route('subaccount.index')->banner('Sub-account created.');
=======
            'account_id' => $request->account_id,
        ]);

        return redirect()->route('subaccount.index')->banner('Sub Account created.');
>>>>>>> 8c8f59000a66e302438fcedfb9c33528d29bd742
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
<<<<<<< HEAD
        $subAccount = SubAccount::find($id);
        return Inertia::render('Admin/SubAccount/Edit', [
=======
        $accounts = Account::all();
        $subAccount = SubAccount::find($id);
        return Inertia::render('Admin/SubAccount/Edit', [
            'accounts' => $accounts,
>>>>>>> 8c8f59000a66e302438fcedfb9c33528d29bd742
            'subAccount' => $subAccount
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
<<<<<<< HEAD
        $request->validate([
            'id' => 'required|string|size:4|unique:subaccounts,id'
            'subAccount' => 'required'
        ]);
        $subAccount = SubAccount::find($id);
        $subAccount->update([
            'id' => $request->id,
            'name' => $request->name,
        ]);

        return redirect()->route('subaccount.index')->banner('Sub-account updated.');
=======


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
>>>>>>> 8c8f59000a66e302438fcedfb9c33528d29bd742
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
<<<<<<< HEAD
        $subAccount = SubAccount::find($id);
        $subAccount->delete();

        return redirect()->route('subaccount.index')->banner('Sub-account deleted');
=======
        
        $subAccount = SubAccount::find($id);
        $subAccount->delete();

        return redirect()->route('subaccount.index')->banner('Sub Account deleted.');
>>>>>>> 8c8f59000a66e302438fcedfb9c33528d29bd742
    }
}
