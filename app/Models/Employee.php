<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'email',
        'phone',
        'dob',
        'job_title',
        'department',
        'salary',
        'start_date',
        'end_date',
        'photo_path',
        'cv_path'
    ];

    public function timesheets()
    {
        return $this->hasMany(Timesheet::class);
    }
}
