<?php

namespace App\Http\Controllers;

use App\Models\SubAccount;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SubAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $subAccount = SubAccount::all();
        return Inertia::render('Admin/SubAccount/Index', [
            'subAccount' => $subAccount
        ])
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/SubAccount/Create', [
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'id' => 'required|string|size:4|unique:subaccount',
            'name' => 'required|string|max:255',
        ]);

        SubAccount::create([
            'id' => $request->id,
            'name' => $request->name,
        ]);

        return redirect()->route('subaccount.index')->banner('Sub-account created.');
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
    public function edit(SubAccount $subAccount)
    {
        //
        $subAccount = SubAccount::find($id);
        return Inertia::render('Admin/SubAccount/Edit', [
            'subAccount' => $subAccount
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SubAccount $subAccount)
    {
        //
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubAccount $subAccount)
    {
        //
        $subAccount = SubAccount::find($id);
        $subAccount->delete();

        return redirect()->route('subaccount.index')->banner('Sub-account deleted');
    }
}
