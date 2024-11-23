<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brands extends Model
{
    protected $fillable = ['unique_id', 'name', 'logo'];
}
