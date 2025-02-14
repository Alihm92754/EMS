<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TimesheetController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    // Authentication routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/logout', [ProfileController::class, 'destroy'])->name('logout');

    // Application routes
    Route::get('/', [EmployeeController::class, 'index']);
    Route::get('/timesheets/calendar', [TimesheetController::class, 'calendar'])->name('timesheets.calendar');
    Route::resource('employees', EmployeeController::class)->except('index');
    Route::resource('timesheets', TimesheetController::class);
});

require __DIR__.'/auth.php';