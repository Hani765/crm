<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Controllers\Controller;
use App\Models\Branches;
use App\Models\Brands;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FetchCortroller extends Controller
{

    public function fetchBrands()
    {
        $brands = Brands::select('unique_id', 'name', 'logo')->get();
        return response()->json($brands);
    }
    public function fetchBranches(Request $request)
    {
        // Get the current user
        $user = Auth::user();

        // Check if the user is an admin
        if ($user->role === 'admin') {
            // If the user is an admin, fetch all branches
            $branches = Branches::select('id', 'unique_id', 'name', 'branch_manager')
                ->withCount([
                    'complaints' => function ($query) {
                        $query->where('status', 'open');
                    }
                ])
                ->get()->map(function ($branch) {
                    // Assuming 'branch' is a related model and you want the 'username' of the branch manager
                    $branch->branch_manager = $branch->branch ? $branch->branch->username : null;
                    return $branch;
                });        // Adding the "All Teams" or "Admin" option at the beginning of the branches
            $allTeamsOption = [
                'id' => null,  // No ID for All Teams
                'unique_id' => '#',  // A custom unique ID for All Teams
                'name' => 'All Branches',  // Name for the option
                'branch_manager' => 'Branches',  // Default branch manager name for Admin
                // Calculate the sum of open complaints for all branches
                'complaints_count' => $branches->reduce(function ($carry, $branch) {
                    // Add the number of open complaints for each branch
                    return $carry + $branch->complaints_count;
                }, 0)
            ];
            $branches->prepend((object) $allTeamsOption);

        } else {
            // If the user is not an admin, fetch only branches where the branch_manager is the user's unique_id
            $branches = Branches::select('id', 'unique_id', 'name', 'branch_manager')
                ->where('branch_manager', $user->unique_id)
                ->withCount([
                    'complaints' => function ($query) {
                        $query->where('status', 'open');
                    }
                ])
                ->get()->map(function ($branch) {
                    // Assuming 'branch' is a related model and you want the 'username' of the branch manager
                    $branch->branch_manager = $branch->branch ? $branch->branch->username : null;
                    return $branch;
                });
        }


        // Prepend the "All Teams" option to the list of branches

        // Return the branches in JSON format
        return response()->json($branches);
    }



}
