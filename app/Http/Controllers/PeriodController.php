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
        $periods = Period::all();
        return Inertia::render('Admin/Period/Index', [
            'periods' => $periods
        ]);
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
            'start' => 'required|date_format:Y-m-d|before:end',
            'end' => 'required|date_format:Y-m-d|after:start',
            'is_active' => 'required|boolean'
        ]);

        Period::create([
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
    public function edit($id)
    {
        //
        $period = Period::find($id);
        return Inertia::render('Admin/Period/Edit', [
            'period' => $period
        ]);
 
    }
 
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
         $request->validate([
            'start' => 'required|date_format:Y-m-d|before:end',
            'end' => 'required|date_format:Y-m-d|after:start',
            'is_active' => 'required|boolean'
        ]);
        $period = Period::find($id);
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
    public function destroy($id)
    {
        //
        $period = Period::find($id);
        $period->delete();
 
        return redirect()->route('period.index')->banner('Period deleted');
    }
}
 