<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProjectUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::factory()->create([
            'password' => bcrypt('abcd123!'),
            'email_verified_at' => time()
        ]);

        $project = Project::factory()
            ->hasTasks(20)
            ->create();

        return [
            'project_id' => $project->id,
            'user_id' => $user->id,
            'role_id' => 1,
        ];
    }
}
