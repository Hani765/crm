<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Controllers\Controller;
use App\Models\WebRoutes;

class WebRoutesController extends Controller
{
    public function index()
    {
        $routes = WebRoutes::all();
        return $routes;
    }
}
