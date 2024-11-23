<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Controllers\Controller;
use App\Models\Branches;
use App\Models\Complaint;
use App\Models\User;
use App\Services\CreateNotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BranchesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Branches/index");
    }
    public function fetchBranches(Request $request)
    {
        $perPage = $request->input('per_page', 50);
        $page = $request->input('page', 1);
        $q = $request->input('q', '');
        $status = $request->input('status', '');

        // Build the query for branches
        $branchesQuery = Branches::query();

        if ($q) {
            $branchesQuery->where('name', 'like', "%$q%");
        }
        if ($status) {
            $branchesQuery->where('status', 'like', "%$status%");
        }

        // Get the total number of branches
        $total = $branchesQuery->count();
        $user = Auth::user();
        $role = $user->role;
        if ($role !== "admin") {
            $branchesQuery->where("branch_manager", $user->unique_id);
        }
        // Get the paginated branches with complaints counts
        $branches = $branchesQuery->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->with('branch') // Eager load the branch (manager) relationship
            ->get()
            ->map(function ($branch) {
                // Fetch complaint counts for each status (open, pending, and closed)
                $openCount = Complaint::where('branch_id', $branch->unique_id)
                    ->where('status', 'open')
                    ->count();

                $pendingCount = Complaint::where('branch_id', $branch->unique_id)
                    ->where('status', 'pending')
                    ->count();

                $closedCount = Complaint::where('branch_id', $branch->unique_id)
                    ->where('status', 'closed')
                    ->whereDate('updated_at', now()->toDateString()) // Only closed today
                    ->count();

                $branch->branch_manager = $branch->branch ? $branch->branch->username : null;
                $branch->open = $openCount;
                $branch->pending = $pendingCount;
                $branch->closed_today = $closedCount;

                return $branch;
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
            'data' => $branches,
            'pagination' => $paginationData,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $managers = User::where('role', 'manager')->get();
        return Inertia::render("Branches/create/Form", [
            'managers' => $managers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'branch_manager' => 'required|string|max:255',
            'branch_contact_no' => 'required|string|max:255',
            'branch_address' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);
        // Handle image upload if files are present
        if ($request->hasFile(key: 'image')) {
            $imagePath = $request->file('image')->store('branches', 'public');
        }
        // Prepare data for saving
        $branch = Branches::create([
            'name' => $validated['name'],
            'unique_id' => Str::uuid(),
            'branch_manager' => $validated['branch_manager'],
            'branch_contact_no' => $validated['branch_contact_no'],
            'branch_address' => $validated['branch_address'],
            'images' => $imagePath ?? null, // Save images as JSON in the database
        ]);

        return redirect()
            ->route('branches.index')
            ->with('success', 'Branch created successfully!');
    }

    /**
     * Display the specified resource.
     */

    public function show(string $unqiue_id)
    {
        $branch = Branches::where('unique_id', $unqiue_id)->first();
        return Inertia::render('Complaints/index', [
            'prop' => $branch,
            'label' => 'branch_id'
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $unique_id)
    {
        $branch = Branches::where('unique_id', $unique_id)->first();
        $managers = User::where('role', 'manager')->get();
        return Inertia::render("Branches/edit/index", [
            'managers' => $managers,
            'branch' => $branch
        ]);
    }

    public function update(Request $request, string $unique_id)
    {
        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'branch_manager' => 'required|exists:users,unique_id',
            'branch_contact_no' => 'required|string',
            'branch_address' => 'required|string',
            'status' => 'required|string',
            'image' => 'nullable|image|max:2048', // Allow image upload, max 2MB
        ]);

        // Find the branch using the unique_id
        $branch = Branches::where('unique_id', $unique_id)->first();

        if (!$branch) {
            return response()->json(['message' => 'Branch not found!'], 404);
        }

        // Update the branch attributes
        $branch->name = $request->input('name');
        $branch->branch_manager = $request->input('branch_manager');
        $branch->branch_contact_no = $request->input('branch_contact_no');
        $branch->branch_address = $request->input('branch_address');
        $branch->status = $request->input('status');

        // Handle image upload if there is one
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($branch->image && Storage::exists($branch->image)) {
                Storage::delete($branch->image);
            }

            // Store the new image and update the 'image' field
            $imagePath = $request->file('image')->store('branches/images');
            $branch->image = $imagePath;
        }

        // Save the updated branch
        $branch->save();

        // Return a response (you can modify this as per your requirement)
        return redirect()
            ->route('branches.index')
            ->with('success', 'Branch updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $delete = Branches::destroy($id);
        $user = Auth::user();

        $notificationSerive = new CreateNotificationService();
        $delete = Branches::destroy($id);


        if ($user->role === 'admin') {
            $user_id = '';
        } else {
            $user_id = $user->unique_id;
        }
        $notificationSerive->clickConversoin($user_id, 'admin');
    }
}
