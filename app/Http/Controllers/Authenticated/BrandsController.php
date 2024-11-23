<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Controllers\Controller;
use App\Models\Brands;
use App\Models\Complaint;
use App\Services\CreateNotificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

class BrandsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Brands/index', );
    }
    public function fetchBrands(Request $request)
    {
        $perPage = $request->input('per_page', 50);
        $page = $request->input('page', 1);
        $q = $request->input('q', '');
        $status = $request->input('status', '');

        // Build the query for brands
        $brandsQuery = Brands::query();

        if ($q) {
            $brandsQuery->where('name', 'like', "%$q%");
        }
        if ($status) {
            $brandsQuery->where('status', 'like', "%$status%");
        }

        // Get the total number of brands
        $total = $brandsQuery->count();

        // Get the paginated brands with complaints counts
        $brands = $brandsQuery->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get()
            ->map(function ($brand) {
                // Fetch complaint counts for each status (open, pending, and closed)
                $openCount = Complaint::where('brand_id', $brand->unique_id)
                    ->where('status', 'open')
                    ->count();

                $pendingCount = Complaint::where('brand_id', $brand->unique_id)
                    ->where('status', 'pending')
                    ->count();

                $closedCount = Complaint::where('brand_id', $brand->unique_id)
                    ->where('status', 'closed')
                    ->whereDate('updated_at', now()->toDateString()) // Only closed today
                    ->count();


                $brand->open = $openCount;
                $brand->pending = $pendingCount;
                $brand->closed_today = $closedCount;

                return $brand;
            });

        // Prepare custom pagination data
        $paginationData = [
            'current_page' => $page,
            'last_page' => ceil($total / $perPage),
            'first_page' => 1,
            'per_page' => $perPage,
            'total' => $total,
            'next_page' => ($page < ceil($total / $perPage)) ? $page + 1 : null,
            'prev_page' => ($page > 1) ? $page - 1 : null,
        ];

        return response()->json([
            'data' => $brands,
            'pagination' => $paginationData,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $notificationSerive = new CreateNotificationService();
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048', // Validate the logo file
        ]);

        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('logos', 'public');
        }

        // Save the brand to the database with the logo path
        Brands::create([
            'unique_id' => Str::uuid(),
            'name' => $request->name,
            'logo' => $logoPath ?? null,
        ]);
        $user = Auth::user();
        if ($user->role === 'admin') {
            $user_id = '';
        } else {
            $user_id = $user->unique_id;
        }
        $notificationSerive->clickConversoin($user_id, 'admin');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $unqiue_id)
    {
        $brand = Brands::where('unique_id', $unqiue_id)->first();
        return Inertia::render('Complaints/index', [
            'prop' => $brand,
            'label' => 'brand_id'
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Find the brand by ID
        $brand = Brands::find($id);

        // Check if brand exists
        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }

        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $brand->id,
        ]);

        // Update the brand name
        $brand->name = $request->name;
        $brand->save();

        // Return a success response
        return Redirect::route('brands.index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Auth::user();

        $notificationSerive = new CreateNotificationService();

        $delete = Brands::destroy($id);

        if ($user->role === 'admin') {
            $user_id = '';
        } else {
            $user_id = $user->unique_id;
        }
        $notificationSerive->clickConversoin($user_id, 'admin');
    }
}
