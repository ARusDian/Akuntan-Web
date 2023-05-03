<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $accounts = Account::all();
        return Inertia::render('Admin/Account/Index', [
            'accounts' => $accounts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/Account/Create', [
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'id' => 'required|string|size:4|unique:accounts',
            'name' => 'required|string|max:255',
        ]);

        Account::create([
            'id' => $request->id,
            'name' => $request->name,
        ]);

        return redirect()->route('account.index')->banner('Account created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Account $account)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $account = Account::find($id);
        return Inertia::render('Admin/Account/Edit', [
            'account' => $account
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([
            'id' => 'required|string|size:4|unique:accounts,id,'.$id,
            'name' => 'required|string|max:255',
        ]);
        $account = Account::find($id);
        $account->update([
            'id' => $request->id,
            'name' => $request->name,
        ]);

        return redirect()->route('account.index')->banner('Account updated.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $account = Account::find($id);
        $account->delete();

        return redirect()->route('account.index')->banner('Account deleted.');
    }
}
