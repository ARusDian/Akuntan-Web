<?php

namespace App\Http\Controllers;

use App\Models\Period;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PeriodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $period = Period::all();
        return Inertia::render('Admin/Period/Index', [
            'period' => $period
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Admin/Period/Create', [
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'start' => 'required|date_format:|unique:periods,start',
            'end' => 'required|date_format:Y-m-d',
            'is_active' => 'required|boolean'
        ]);

        Account::create([
            'start' => $request->start,
            'end' => $request->end,
            'is_active' => $request->is_active,
        ]);

        return redirect()->route('period.index')->banner('Period created.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Period $period)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Period $period)
    {
        //
        $period = Period::find($period->id);
        return Inertia::render('Admin/Period/Edit', [
            'period' => $period
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Period $period)
    {
        //
        $request->validate([
            'start' => 'required|date_format:',
            'end' => 'required|date_format:',
            'is_active' => 'required|boolean'
        ]);
        $period = Period::find($period->id);
        $period->update([
            'start' => $request->start,
            'end' => $request->end,
            'is_active' => $request->is_active
         ]);

        return redirect()->route('period.index')->banner('Period updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Period $period)
    {
        //
        $period = period::find($period->id);
        $period->delete();

        return redirect()->route('period.index')->banner('Period deleted');
    }
}
 