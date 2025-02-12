<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    protected $model = Employee::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'dob' => fake()->date(),
            'job_title' => fake()->jobTitle(),
            'department' => fake()->word(),
            'salary' => fake()->randomFloat(2, 3000, 10000),
            'start_date' => fake()->date(),
            'end_date' => null, // optional
        ];
    }
}
