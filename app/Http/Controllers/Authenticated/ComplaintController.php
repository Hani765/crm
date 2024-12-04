<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Controllers\Controller;
use App\Models\Branches;
use App\Models\Brands;
use App\Models\Complaint;
use App\Models\ComplaintHistory;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Complaints/index', );
    }
    public function fetchComplaints(Request $request)
    {
        $perPage = $request->input('per_page', 50);
        $page = $request->input('page', 1);
        $searchQuery = $request->input('q', '');
        $statusFilter = $request->input('status', '');
        $brandIdFilter = $request->input('brand_id', '');
        $branchFilter = $request->input('branch_id', '');

        // Build the query for complaints
        $complaintsQuery = Complaint::query();

        if ($searchQuery) {
            // Adjust field name to 'contact_name' if searching by contact name
            $complaintsQuery->where('complain_num', 'like', "%{$searchQuery}%")->orWhere('contact_name', 'like', "%{$searchQuery}%")->orWhere('contact_email', 'like', "%{$searchQuery}%")->orWhere('company_complaint_no', 'like', "%{$searchQuery}%")->orWhere('phone_no', 'like', "%{$searchQuery}%")->orWhere('whatsapp_no', 'like', "%{$searchQuery}%")->orWhere('serial_number_ind', 'like', "%{$searchQuery}%")->orWhere('serial_number_oud', 'like', "%{$searchQuery}%")->orWhere('sender', 'like', "%{$searchQuery}%");
        }
        if ($statusFilter) {
            $complaintsQuery->where('status', $statusFilter);
        }
        if ($brandIdFilter) {
            $complaintsQuery->where('brand_id', $brandIdFilter);
        }
        if ($branchFilter) {
            $complaintsQuery->where('branch_id', $branchFilter);
        }

        // Get the total count of complaints after filters
        $totalComplaints = $complaintsQuery->count();

        // Fetch paginated complaints with proper associations and formatted response
        $complaints = $complaintsQuery->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get()
            ->map(function ($complaint) {
                // Fetch the associated brand name if it exists
                $complaint->brand_name = $complaint->brand ? $complaint->brand->name : null;
                $complaint->username = $complaint->user ? $complaint->user->username : null;
                return $complaint;
            });

        // Prepare pagination details
        $paginationData = [
            'current_page' => $page,
            'last_page' => ceil($totalComplaints / $perPage),
            'first_page' => 1,
            'per_page' => $perPage,
            'total' => $totalComplaints,
            'next_page' => ($page < ceil($totalComplaints / $perPage)) ? $page + 1 : null,
            'prev_page' => ($page > 1) ? $page - 1 : null,
        ];

        return response()->json([
            'data' => $complaints,
            'pagination' => $paginationData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Fetch brands with unique_id and name only
        $brands = Brands::select('unique_id', 'name')->get();
        $branchs = Branches::select('unique_id', 'name')->get();
        $technicians = User::select('unique_id', 'username as name')->where('role', 'technician')->get();
        return Inertia::render('Complaints/create/index', [
            'data' => $brands,
            'branchData' => $branchs,
            'technicians' => $technicians,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */


    public function store(Request $request)
    {
        // Step 1: Validate the incoming request
        $payload = $request->validate([
            'contact_name' => 'required|string',
            'company_complaint_no' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'phone_no' => 'required|string',
            'whatsapp_no' => 'nullable|string',
            'address' => 'required|string',
            'sender' => 'required|string',
            'city' => 'required|string',
            'brand_id' => 'required|exists:brands,unique_id', // Ensure this matches your DB schema
            'branch_id' => 'required|exists:branches,unique_id', // Ensure this matches your DB schema
            'product' => 'required|string',
            'model' => 'required|string',
            'serial_number_ind' => 'nullable|string',
            'serial_number_oud' => 'nullable|string',
            'mq_nmb' => 'nullable|string',
            'p_date' => 'nullable|date',
            'description' => 'nullable|string',
            'amount' => 'nullable|string',
            'technician' => 'nullable|string',
            'extra' => 'nullable|string',
            'complaint_type' => 'required|string',
            'provided_services' => 'required|string',
            'status' => 'required|in:open,pending',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Add nullable here if images aren't required
        ]);

        // Step 3: Generate the complaint number
        $lastComplaint = Complaint::latest('id')->first();
        $newId = $lastComplaint ? $lastComplaint->id + 1 : 1;
        $formattedId = now()->format('Y') . $newId;
        $complain_num = 'FC' . $formattedId;

        // Step 4: Handle image uploads
        $folderPath = "complaints/{$complain_num}";
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imageName = uniqid() . '-' . $image->getClientOriginalName(); // Ensure uniqueness
                $image->storeAs($folderPath, $imageName, 'public');
                $imagePaths[] = Storage::url("{$folderPath}/{$imageName}");
            }
        }
        $payload['images'] = $imagePaths;
        $payload['complain_num'] = $complain_num;
        $user = Auth::user();
        $unique_id = $user->unique_id;
        $payload['user_id'] = $unique_id;

        // Step 5: Create the complaint
        $create = Complaint::create($payload);
        return redirect('/complaint');
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $complaint = Complaint::find($id);
        $complaint->brand_name = $complaint->brand ? $complaint->brand->name : null;
        $history = ComplaintHistory::where('complaint_id', $complaint->id)
            ->orderBy('created_at', 'desc') // Sort by latest first
            ->get();
        return response()->json($history);
        return Inertia::render('Complaints/View/index', [
            'data' => $complaint,
            'history' => $history,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $complaint = Complaint::find($id);
        $brands = Brands::select('unique_id', 'name')->get();
        $branchs = Branches::select('unique_id', 'name')->get();
        $technicians = User::select('unique_id', 'username as name')->where('role', 'technician')->get();

        return Inertia::render('Complaints/Edit/index', [
            'data' => $complaint,
            'brands_data' => $brands,
            'branchData' => $branchs,
            'technicians' => $technicians,
        ]);
    }
    public function copyComplaint(string $id)
    {
        $complaint = Complaint::find($id);
        $brands = Brands::select('unique_id', 'name')->get();
        return Inertia::render('Complaints/copy/index', [
            'data' => $complaint,
            'brands_data' => $brands,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $payload = $request->validate([
            'contact_name' => 'required|string',
            'company_complaint_no' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'phone_no' => 'required|string',
            'whatsapp_no' => 'nullable|string',
            'address' => 'required|string',
            'sender' => 'required|string',
            'city' => 'required|string',
            'brand_id' => 'required|exists:brands,unique_id',
            'branch_id' => 'required|exists:branches,unique_id',
            'product' => 'required|string',
            'model' => 'required|string',
            'serial_number_ind' => 'nullable|string',
            'serial_number_oud' => 'nullable|string',
            'mq_nmb' => 'nullable|string',
            'p_date' => 'nullable|date',
            'description' => 'nullable|string',
            'amount' => 'nullable|string',
            'technician' => 'nullable|string',
            'extra' => 'nullable|string',
            'complaint_type' => 'required|string',
            'provided_services' => 'required|string',
            'status' => 'required',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Fetch the complaint
        $complaint = Complaint::findOrFail($id);

        // Save the old version in the history table
        ComplaintHistory::create([
            'complaint_id' => $complaint->id,
            'complaint_data' => $complaint,
        ]);

        // Update the complaint with new data
        $complaint->update($payload);

        return response()->json(['message' => 'Complaint updated successfully.']);
    }

    public function showHistory(string $id)
    {
        // Find the complaint by its ID
        $complaint = Complaint::findOrFail($id);

        // Fetch all history records for the complaint
        $history = ComplaintHistory::where('complaint_id', $complaint->id)
            ->orderBy('created_at', 'desc') // Sort by latest first
            ->get();
        return response()->json([
            'complaint' => $complaint,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
