<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();
        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_dir", "asc");
        if (request('name')) {
            $query->where('name', 'like', "%" . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $projects = $query->orderBy($sortField, $sortDirection)->paginate(15)->withQueryString();




        return inertia('Project/Index', ['projects' => ProjectResource::collection($projects), 'queryParams' => request()->query() ?: null, 'success' => session('success')]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
        Log::debug('niko: debe crear');
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['img_path'] = $image->store('projects/' . $data['name'] . Carbon::now()->timestamp, 'public');
        }
        Project::create($data);
        return to_route('projects.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {

        $query = $project->tasks();
        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString();

        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Form', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        Log::debug("niko: deberia actualizar");
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($project->img_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->img_path));
            }
            $data['img_path'] = $image->store('projects/' . $data['name'] . Carbon::now()->timestamp, 'public');
        }
        $project->update($data);
        return to_route('projects.index')
            ->with('success', "Project \"$project->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {

        $tasks = $project->tasks()->get();
        foreach ($tasks as $task) {
            $task->delete();
        }

        $name = $project->name;
        if ($project->img_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->img_path));
        }
        $project->delete();

        return to_route('projects.index')->with('success', "Project \"$name\" was deleted.");
    }
}
