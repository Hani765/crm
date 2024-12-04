<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Controllers\Controller;
use App\Models\Branches;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Users/index");
    }
    public function fetchUsers(Request $request)
    {
        $perPage = $request->input('per_page', 50);
        $page = $request->input('page', 1);
        $q = $request->input('q', '');
        $status = $request->input('status', '');

        // Build the query for branches
        $branchesQuery = User::query();

        if ($q) {
            $branchesQuery->where('name', 'like', "%$q%")->where('email', 'like', "%$q%")->where('first_name', 'like', "%$q%")->where('last_name', 'like', "%$q%");
        }
        if ($status) {
            $branchesQuery->where('status', 'like', "%$status%");
        }

        // Get the total number of branches
        $total = $branchesQuery->count();

        // Get the paginated branches with complaints counts
        $branches = $branchesQuery->skip(($page - 1) * $perPage)
            ->take($perPage)
            // Eager load the branch (manager) relationship
            ->get();


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
            'data' => $branches,
            'pagination' => $paginationData,
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/create/index');
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:11',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'branch_id' => 'nullable|exists:branches,unique_id', // Ensure this matches your DB schema
            'role' => 'required|string', // Ensure this matches your DB schema
            'monthly_salary' => 'required|string', // Ensure this matches your DB schema
            'reference_name' => 'required|string', // Ensure this matches your DB schema
        ]);
        $user = User::create([
            'unique_id' => Str::uuid(),
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'branch_id' => 'nullable|exists:branches,unique_id', // Ensure this matches your DB schema
            'role' => $request->role,
            'monthly_salary' => $request->monthly_salary,
            'reference_name' => $request->reference_name,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }
}
