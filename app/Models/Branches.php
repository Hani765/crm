<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branches extends Model
{
    protected $fillable = ['name', 'unique_id', 'branch_manager', 'branch_contact_no', 'branch_address', 'image', 'status'];

    // Correcting the method name to 'branch' to reflect the relationship properly
    public function branch()
    {
        return $this->belongsTo(User::class, 'branch_manager', 'unique_id');
    }
    public function complaints()
    {
        return $this->hasMany(Complaint::class, 'branch_id', 'unique_id');
    }
}
