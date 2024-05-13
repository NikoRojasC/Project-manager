<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('/projects', ProjectController::class);
    Route::get('projects/{project}/edit/users', [ProjectController::class, 'users'])->name('projects.edit.users');
    Route::post('projects/{project}/edit/users', [ProjectController::class, 'addUsers'])->name('projects.edit.addUsers');

    // Route::put('/tasks/prueba/{task}', [TaskController::class, 'prueba'])->name('tasks.prueba');
    Route::resource('/users', UserController::class);
    Route::resource('/tasks', TaskController::class);
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
