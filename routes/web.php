<?php

use App\Http\Controllers\Authenticated\BranchesController;
use App\Http\Controllers\Authenticated\BrandsController;
use App\Http\Controllers\Authenticated\ComplaintController;
use App\Http\Controllers\Authenticated\DashboardController;
use App\Http\Controllers\Authenticated\FetchCortroller;
use App\Http\Controllers\Authenticated\ResourcesController;
use App\Http\Controllers\Authenticated\UserController;
use App\Http\Controllers\Authenticated\WebRoutesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\ServicesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('/users', UserController::class);
    Route::resource('/complaint', ComplaintController::class);
    Route::resource('/branches', BranchesController::class);
    Route::resource('/brands', BrandsController::class);
    Route::resource('/resources', ResourcesController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/fetch-brands', [BrandsController::class, 'fetchBrands']);
    Route::get('/fetch-branches', [BranchesController::class, 'fetchBranches']);
    Route::get('/fetch-resources', [ResourcesController::class, 'fetchResources']);
    Route::get('/fetch-complaints', [ComplaintController::class, 'fetchComplaints']);
    Route::get('/fetch-users', [UserController::class, 'fetchUsers']);
    Route::get('/fetch-brands-ids', [FetchCortroller::class, 'fetchBrands']);
    Route::get('/fetch-branches-ids', [FetchCortroller::class, 'fetchBranches']);
    Route::get('/dashboard-chart-data', [DashboardController::class, 'FetchComplaintChartData']);
    Route::get('/dashboard-complaints-percentage', [DashboardController::class, 'getComplaintStatusPercentage']);
    Route::get('/dashboard-complaints-by-brand', [DashboardController::class, 'getComplaintStatusByBrand']);
    Route::get('/copy-complaint/{unique_id}', [ComplaintController::class, 'copyComplaint']);
});


Route::get('/home', [HomeController::class, 'index'])->name('home.index');
Route::resource('/get-routes-list', WebRoutesController::class);
Route::resource('/fetch-services', ServicesController::class);
require __DIR__ . '/auth.php';
