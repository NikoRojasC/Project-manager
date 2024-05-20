<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\RoleResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\ProjectUser;
use App\Models\Role;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
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

        $user = auth()->user();
        $query = Project::query();
        $sortField = request("sort_field", 'updated_at');
        $sortDirection = request("sort_dir", "desc");
        // $query->where('user')
        if (request('name')) {
            $query->where('name', 'like', "%" . request('name') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }
        // $query->whereHas('users', function ($q) use ($user) {
        //     $q->where('user_id', $user->id)
        //         ->where('role_id', '!=', null); // Considerar solo proyectos en los que el usuario tenga un rol asignado
        // });

        $projects = $user->projects();


        $projects = $projects->orderBy($sortField, $sortDirection)->paginate(15)->withQueryString();


        // dd($projects);


        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
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
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['img_path'] = $image->store('projects/' . $data['name'] . Carbon::now()->timestamp, 'public');
        }
        $project = Project::create($data);
        $ProUser = new ProjectUser();
        $ProUser->user_id = auth()->id();
        $ProUser->project_id = $project->id;
        $ProUser->role_id = 1;
        $ProUser->save();
        $name = $data['name'];
        return to_route('projects.index')
            ->with('success', "Project \"$name\" was created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {


        $query = $project->tasks();
        $sortField = request("sort_field", 'updated_at');
        $sortDirection = request("sort_direction", "desc");

        // dd($sortField, $sortDirection);
        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString();

        // dd($project);

        $project->role = Auth::user()->projects()->where('project_id', $project->id)->first()->getOriginal('pivot_role_id');



        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $project->role = Auth::user()->projects()->where('project_id', $project->id)->first()->getOriginal('pivot_role_id');
        if ($project->role === 3) {
            return to_route('projects.show', $project);
        }
        return inertia('Project/Form', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {

        $route = $request->prevLoc;
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
        Log::debug('niko ----->');
        Log::debug($data);
        Log::debug('<----- niko');

        if ($route === 'show') {

            return to_route('projects.show', $project)
                ->with('success', "Project \"$project->name\" was updated");
        }
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
        $project->users()->detach();
        $project->delete();

        return to_route('projects.index')->with('success', "Project \"$name\" was deleted.");
    }

    public function users(Project $project)
    {
        $project->role = Auth::user()->projects()->where('project_id', $project->id)->first()->getOriginal('pivot_role_id');
        if ($project->role !== 1) {
            return to_route('projects.edit', $project);
        }
        $users = $project->users()->get();
        $roles = Role::get();
        return inertia('Project/FormUsers', [
            'project' => new ProjectResource($project),
            'users' => UserResource::collection($users),
            'roles' => RoleResource::collection($roles)
        ]);
    }

    public function addUsers(Project $project, Request $request)
    {
        $request->validate([
            'email' => 'email',
        ]);
        $user = User::where('email', 'like', $request->email)->first();

        $projectUser = new ProjectUser([
            'user_id' => $user->id,
            'project_id' => $project->id,
            'role_id' => 2
        ]);
        $projectUser->save();

        return to_route('projects.edit.users', ['project' => $project]);
    }

    public function modUsers(Project $project, Request $request)
    {
        $request->validate([
            'user' => 'numeric|max_digits:10',
            'rol' => 'numeric|max_digits:10',

        ]);
        $projectUser = ProjectUser::where('user_id', $request->user)->where('project_id', $project->id)->first();
        $projectUser->role_id = $request->rol;
        $projectUser->save();
        $success = [
            $request->user,
            'Saved'
        ];

        return to_route('projects.edit.users', ['project' => $project])->with('success', $success);
    }
}
