<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function index(): Response 
    {
        $employees = Employee::paginate(10);
        return inertia('Employees/Index', ['employees' => $employees]);
    }

    public function create(): Response 
    {
        return inertia('Employees/Create');
    }

    public function store(Request $request) 
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:employees',
            'phone' => 'required',
            'dob' => 'required|date',
            'job_title' => 'required',
            'department' => 'required',
            'salary' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date'
        ]);

        Employee::create($request->all());
        return redirect()->route('employee.index')->with('success', 'Employee created successfully.');
    }

    public function edit(Employee $employee): Response
    {
        return Inertia::render('Employees/Edit', ['employee' => $employee]);
    }

    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'dob' => 'required|date',
            'job_title' => 'required',
            'department' => 'required',
            'salary' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date'
        ]);

        $employee->update($request->all());
        return redirect()->route('employees.index');
    }

    public function destory(Employee $employee)
    {
        $employee->delete();
        return redirect()->route('employees.index');
    }
}
