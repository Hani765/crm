<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\WebRoutes;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Pest\Laravel\get;

class HomeController extends Controller
{
    public function index()
    {
        $meta = WebRoutes::findOrFail(1);
        $routes = WebRoutes::select('name', 'url')->get();
        return Inertia::render('Public/Home/index', [
            "meta" => $meta,
            "routes" => $routes
        ]);
    }
}
