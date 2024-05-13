<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear roles predefinidos
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Edit']);
        Role::create(['name' => 'User']);

        ProjectUser::factory()->count(10)->create();
    }
}
