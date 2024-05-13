<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::paginate(10);
        // dd($tasks);
        return inertia("Task/Index", [
            'tasks' => TaskResource::collection($tasks)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $data = $request->query();
        $project = Project::find($data[0]);
        $users = $project->users()->get();

        // dd($users);
        return inertia('Task/Form', ['project' => new ProjectResource($project), 'users' => UserResource::collection($users)]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        // dd($request);
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['assigned_user'] = Auth::id();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        // dd($data);

        if ($image) {
            $data['img_path'] = $image->store('tasks/' . $data['name'] . Carbon::now()->timestamp, 'public');
        }

        $name = $data['name'];
        // Log::debug('niko: ');
        Task::create($data);
        return to_route('projects.show', [$data['project_id']])
            ->with('success', "Task \"$name\" was created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task, Request $request)
    {


        $data = $request->query();
        $project = Project::find($data[0]);
        // dd($task);
        $users = $project->users()->get();

        return inertia('Task/Form', [
            'task' => new TaskResource($task),
            'project' => new ProjectResource($project),
            'users' => UserResource::collection($users)
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        // Log::debug("niko: tasks update");
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($task->img_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->img_path));
            }
            $data['img_path'] = $image->store('tasks/' . $data['name'] . Carbon::now()->timestamp, 'public');
        }
        $task->update($data);
        // Log::debug('niko: ');
        // Log::debug($task);

        // dd($data);
        // return inertia("Projects/Index");
        return to_route('projects.show', $data['project_id'])
            ->with('success', "Task \"$task->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        if ($task->img_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->img_path));
        }
        $task->delete();

        return to_route('projects.show', $task->project_id)
            ->with('success', "Task \"$name\" was deleted.");
    }
}
