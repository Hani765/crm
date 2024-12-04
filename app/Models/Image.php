<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    // Define the table associated with the model (optional if it's named 'images')
    protected $table = 'images';

    // You can specify the fillable fields here
    protected $fillable = ['resource_id', 'path'];

    // Define the relationship with the Resource model
    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }
}
