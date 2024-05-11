<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'name',
        'description',
        'img_path',
        'status',
        'priority',
        'due_date',
        'assigned_user',
        'created_by',
        'updated_by',
        'project_id'
    ];
    use HasFactory;
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_user');
    }
}
