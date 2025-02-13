<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function index() 
    {
        $employees = Employee::latest()->paginate(10);
        return inertia('Employees/Index', ['employees' => $employees]);
    }

    public function create()
    {
        return inertia('Employees/Create');
    }

    public function store(Request $request) 
    {
        $fields = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:employees',
            'phone' => 'required|digits:8',
            'dob' => 'required|date',
            'job_title' => 'required',
            'department' => 'required',
            'salary' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date'
        ]);

        Employee::create($fields);
        return redirect('/');
    }

    public function show(Employee $employee)
    {
        return inertia('Employees/Show', ['employee' => $employee]);
    }

    public function edit(Employee $employee)
    {
        return inertia('Employees/Edit', ['employee' => $employee]);
    }

    public function update(Request $request, Employee $employee)
    {
        $fields = $request->validate([
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

        $employee->update($fields);
        return redirect()->route('employees.show', ['employee' => $employee])->with('message', 'Employee Information updated successfully!');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return redirect('/')->with('message', 'Employee was deleted successfully!');
    }
}
