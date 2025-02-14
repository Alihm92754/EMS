<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Timesheet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TimesheetController extends Controller
{
    public function index()
    {
        $timesheets = Timesheet::with('employee')->latest()->paginate(10);
        return inertia('Timesheets/Home', ['timesheets' => $timesheets]);
    }

    public function create()
    {
        $employees = Employee::all();
        return inertia('Timesheets/Create', ['employees' => $employees]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'date' => 'required|date_format:Y-m-d',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'summary' => 'nullable|string'
        ]);

        $validatedData['start_time'] = $validatedData['date'] . ' ' . $validatedData['start_time'];
        $validatedData['end_time'] = $validatedData['date'] . ' ' . $validatedData['end_time'];

        Timesheet::create($validatedData);
        return redirect()->route('timesheets.index');
    }

    public function show(Timesheet $timesheet)
    {
        $previous = Timesheet::where('id', '<', $timesheet->id)->orderBy('id', 'desc')->first();
        $next = Timesheet::where('id', '>', $timesheet->id)->orderBy('id', 'asc')->first();
        return inertia('Timesheets/Show', [
            'timesheet' => $timesheet, 
            'previous' => $previous ? $previous->id : null,
            'next' => $next ? $next->id : null,
        ]);
    }

    public function edit(Timesheet $timesheet)
    {
        $employees = Employee::all();
        return inertia('Timesheets/Edit', ['timesheet' => $timesheet, 'employees' => $employees]);
    }

    public function update(Request $request, Timesheet $timesheet) {
        $fields = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:Y-m-d\TH:i',
            'end_time' => 'required|date_format:Y-m-d\TH:i|after:start_time',
            'summary' => 'nullable|string|max:255'
        ]);

        $fields['start_time'] = str_replace('T', ' ', $fields['start_time']) . ':00';
        $fields['end_time'] = str_replace('T', ' ', $fields['end_time']) . ':00';
        
        $timesheet->update($fields);
        return redirect()->route('timesheets.index');
    }

    public function destroy(Timesheet $timesheet) {
        $timesheet->delete();
        return redirect()->route('timesheets.index');
    }

    public function calendar()
    {
        $timesheets = Timesheet::all();
        return inertia('Timesheets/Calendar', ['timesheets' => $timesheets]);
    }
}
