import { LucideServerCrash, TrendingUp } from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useFetchContext } from "@/hooks/useFetchContext";
import { Skeleton } from "@/components/ui/skeleton";

// Define the types for the API response and status percentages
interface StatusPercentage {
    brand: string;
    open_complaints: number;
    closed_complaints: number;
    total_complaints: number;
    status_percentages: {
        open_percentage: number;
        closed_percentage: number;
    };
}

interface ApiResponse {
    message: string;
    data: {
        start_date: string;
        end_date: string;
        total_complaints: number;
        brand_complaint_stats: Record<string, StatusPercentage>; // Updated to match your response
    };
}

const chartConfig = {
    open: {
        label: "Open Complaints",
        color: "hsl(var(--chart-1))",
    },
    closed: {
        label: "Closed Complaints",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function ComplaintsChart({ url }: { url: string }) {
    const { data, isLoading, error } = useFetchContext<ApiResponse>(url);

    // Handle loading, error, or empty data gracefully
    if (isLoading)
        return (
            <div>
                <Skeleton className="w-full h-[400px] rounded" />
            </div>
        );
    if (error)
        return (
            <div className="mt-6 h-[400px] bg-white flex border flex-col border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm justify-center items-center px-2 rounded py-4 text-gray-100 dark:text-gray-600">
                <LucideServerCrash size={44} />
                <div>Something went wrong, please try to refresh the page.</div>
            </div>
        );

    const brandStats = data?.data?.brand_complaint_stats;

    // Map the API response to chart-friendly data format
    const chartData = Object.entries(brandStats).map(([brand, stats]) => {
        const statsData = stats as StatusPercentage; // Type assertion to StatusPercentage
        return {
            brand,
            open: statsData.open_complaints,
            closed: statsData.closed_complaints,
        };
    });

    const totalComplaints = data?.data?.total_complaints || 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Complaints by Brand</CardTitle>
                <CardDescription>{`Showing complaints from ${data?.data.start_date} to ${data?.data.end_date}`}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="h-[250px] w-full"
                >
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="brand" // Use 'brand' as the X-Axis label
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis />
                        <ChartTooltip
                            content={<ChartTooltipContent />}
                            cursor={false}
                            defaultIndex={1}
                        />
                        <Legend />
                        <Bar
                            dataKey="open"
                            stackId="a"
                            fill={chartConfig.open.color}
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="closed"
                            stackId="a"
                            fill={chartConfig.closed.color}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Total complaints for the selected date range:{" "}
                    {totalComplaints}
                </div>
            </CardFooter>
        </Card>
    );
}
