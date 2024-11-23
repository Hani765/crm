<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function FetchComplaintChartData()
    {
        // Get the start of the current month and today
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now();

        // Generate all dates from the start of the month to today
        $dates = $this->generateDateRange($startOfMonth, $endOfMonth);

        // Fetch open and closed complaint counts grouped by date
        $openComplaints = $this->getComplaintCounts('open', $startOfMonth, $endOfMonth);
        $closedComplaints = $this->getComplaintCounts('closed', $startOfMonth, $endOfMonth);

        // Combine the data into the desired format: {date, closed, opened}
        $result = array_map(function ($date) use ($openComplaints, $closedComplaints) {
            return [
                'date' => $date,
                'closed' => $closedComplaints[$date] ?? 0,
                'opened' => $openComplaints[$date] ?? 0,
            ];
        }, $dates);

        // Return the result
        return response()->json($result);
    }

    public function getComplaintStatusPercentage(Request $request)
    {
        // Determine start and end dates from the request or defaults
        $startDate = $request->has('start_date')
            ? Carbon::parse($request->start_date)
            : Carbon::now()->startOfMonth();

        $endDate = $request->has('end_date')
            ? Carbon::parse($request->end_date)
            : Carbon::now();

        // Total complaints in the given date range
        $totalComplaints = Complaint::whereBetween('created_at', [$startDate, $endDate])->count();

        if ($totalComplaints === 0) {
            return response()->json([
                'message' => 'No complaints found for the given date range.',
                'data' => [
                    'start_date' => $startDate->toDateString(),
                    'end_date' => $endDate->toDateString(),
                    'total_complaints' => $totalComplaints,
                    'status_percentages' => []
                ]
            ], 200);
        }

        // Group by status and count each within the date range
        $statusCounts = Complaint::select('status', DB::raw('count(*) as count'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('status')
            ->get();

        // Calculate percentage for each status
        $percentages = $statusCounts->map(function ($status) use ($totalComplaints) {
            return [
                'status' => $status->status,
                'count' => $status->count,
                'percentage' => round(($status->count / $totalComplaints) * 100, 2)
            ];
        });

        return response()->json([
            'message' => 'Status percentages and complaints retrieved successfully.',
            'data' => [
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
                'total_complaints' => $totalComplaints,
                'status_percentages' => $percentages
            ]
        ], 200);
    }
    public function getComplaintStatusByBrand(Request $request)
    {
        // Determine start and end dates from the request or defaults
        $startDate = $request->has('start_date')
            ? Carbon::parse($request->start_date)
            : Carbon::now()->startOfMonth();

        $endDate = $request->has('end_date')
            ? Carbon::parse($request->end_date)
            : Carbon::now();

        // Total complaints in the given date range
        $totalComplaints = Complaint::whereBetween('created_at', [$startDate, $endDate])->count();

        if ($totalComplaints === 0) {
            return response()->json([
                'message' => 'No complaints found for the given date range.',
                'data' => [
                    'start_date' => $startDate->toDateString(),
                    'end_date' => $endDate->toDateString(),
                    'total_complaints' => $totalComplaints,
                    'brand_complaint_stats' => []
                ]
            ], 200);
        }

        // Group complaints by brand_id and status (open/closed)
        $brandStats = Complaint::select('brand_id', 'status', DB::raw('count(*) as count'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('brand_id', 'status')
            ->get()
            ->map(function ($brandStats) {
                // Fetch the associated brand name if it exists
                $brandStats->brand_name = $brandStats->brand ? $brandStats->brand->name : 'Unknown Brand'; // Default to 'Unknown Brand' if no brand found
                return $brandStats;
            });

        // Organize the data by brand_name instead of brand_id
        $brandStatsFormatted = $brandStats->groupBy('brand_name')->map(function ($statusGroup) {
            $openCount = $statusGroup->where('status', 'open')->sum('count');
            $closedCount = $statusGroup->where('status', 'closed')->sum('count');

            return [
                'brand' => $statusGroup->first()->brand_name,  // Label as 'brand' instead of 'brand_name'
                'open_complaints' => $openCount,
                'closed_complaints' => $closedCount,
                'total_complaints' => $openCount + $closedCount,
                'status_percentages' => [
                    'open_percentage' => $openCount > 0 ? round(($openCount / ($openCount + $closedCount)) * 100, 2) : 0,
                    'closed_percentage' => $closedCount > 0 ? round(($closedCount / ($openCount + $closedCount)) * 100, 2) : 0,
                ]
            ];
        });

        return response()->json([
            'message' => 'Brand-wise complaint statistics retrieved successfully.',
            'data' => [
                'start_date' => $startDate->toDateString(),
                'end_date' => $endDate->toDateString(),
                'total_complaints' => $totalComplaints,
                'brand_complaint_stats' => $brandStatsFormatted
            ]
        ], 200);
    }



    /**
     * Generate a range of dates from the start date to the end date.
     *
     * @param Carbon $startDate
     * @param Carbon $endDate
     * @return array
     */
    private function generateDateRange(Carbon $startDate, Carbon $endDate)
    {
        $dates = [];
        $currentDate = $startDate->copy();

        // Loop through all the days between start and end dates
        while ($currentDate <= $endDate) {
            $dates[] = $currentDate->toDateString(); // Store the date as 'YYYY-MM-DD'
            $currentDate->addDay();
        }

        return $dates;
    }

    /**
     * Get complaint counts for a specific status (open or closed) grouped by date.
     *
     * @param string $status
     * @param Carbon $startOfMonth
     * @param Carbon $endOfMonth
     * @return array
     */
    private function getComplaintCounts($status, Carbon $startOfMonth, Carbon $endOfMonth)
    {
        // Fetch complaint counts grouped by date
        return Complaint::select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->where('status', $status)
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('count', 'date')
            ->toArray();
    }

}
