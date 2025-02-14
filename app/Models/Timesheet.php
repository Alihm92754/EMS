<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timesheet extends Model
{
    protected $fillable = [
        'employee_id',
        'date',
        'start_time',
        'end_time',
        'summary'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
