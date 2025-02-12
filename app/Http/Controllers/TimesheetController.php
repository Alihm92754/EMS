<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Timesheet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TimesheetController extends Controller
{
    public function index(): Response
    {
        $timesheets = Timesheet::with('employee')->paginate(10);
        return Inertia::render('Timesheets/Index', ['timesheets' => $timesheets]);
    }

    public function create(): Response
    {
        $employees = Employee::all();
        return Inertia::render('Timesheets/create', ['employees' => $employees]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'summary' => 'nullable|string'
        ]);

        Timesheet::create($request->all());
        return redirect()->route('timesheets.index');
    }

    public function edit(Timesheet $timesheet): Response {
        return Inertia::render('Timesheets/Edit', ['timesheet' => $timesheet]);
    }

    public function update(Request $request, Timesheet $timesheet) {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'summary' => 'nullable|string'
        ]);
        
        $timesheet->update($request->all());
        return redirect()->route('timesheets.index');
    }

    public function destroy(Timesheet $timesheet) {
        $timesheet->delete();
        return redirect()->route('timesheets.index');
    }
}
