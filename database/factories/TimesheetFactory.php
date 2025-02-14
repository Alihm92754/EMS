<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Timesheet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class TimesheetFactory extends Factory
{
    protected $model = Timesheet::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => Employee::inRandomOrder()->first()->id,
            'date' => fake()->date(),
            'start_time' => fake()->dateTimeBetween('-1 week', 'now'),
            'end_time' => fake()->dateTimeBetween('now', '+1 hour'),
            'summary' => fake()->sentence()
        ];
    }
}
