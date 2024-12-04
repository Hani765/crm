<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebRoutes extends Model
{
    protected $fillable = ["name", "url", "title", "description", "keywords"];
}
