"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter, // Importing CardFooter
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFetchContext } from "@/hooks/useFetchContext";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideServerCrash } from "lucide-react";

interface StatusPercentage {
    status: string;
    count: number;
    percentage: number;
}

interface ApiResponse {
    message: string;
    data: {
        start_date: string;
        end_date: string;
        total_complaints: number;
        status_percentages: StatusPercentage[];
    };
}

const chartConfig: ChartConfig = {
    active: {
        label: "Active",
        color: "hsl(var(--chart-1))",
    },
    inactive: {
        label: "Inactive",
        color: "hsl(var(--chart-2))",
    },
    paused: {
        label: "Paused",
        color: "hsl(var(--chart-3))",
    },
    open: {
        label: "Open",
        color: "hsl(var(--chart-4))",
    },
    "part-demand": {
        label: "Part Demand",
        color: "hsl(var(--chart-5))",
    },
    "service-lifting": {
        label: "Service Lifting",
        color: "hsl(var(--chart-6))",
    },
    "party-lifting": {
        label: "Party Lifting",
        color: "hsl(var(--chart-7))",
    },
    "unit-in-service-center": {
        label: "Unit in Service Center",
        color: "hsl(var(--chart-8))",
    },
    "installation-pending": {
        label: "Installation Pending",
        color: "hsl(var(--chart-9))",
    },
    "in-progress": {
        label: "In Process",
        color: "hsl(var(--chart-10))",
    },
    delivered: {
        label: "Delivered",
        color: "hsl(var(--chart-11))",
    },
    completed: {
        label: "Completed",
        color: "hsl(var(--chart-12))",
    },
    cancelled: {
        label: "Cancelled",
        color: "hsl(var(--chart-13))",
    },
    closed: {
        label: "Closed",
        color: "hsl(var(--chart-14))",
    },
};

export function ComplaintsPercentagePie({ url }: { url: string }) {
    const { data, isLoading, error } = useFetchContext<ApiResponse>(url);
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
    const id = "pie-interactive";
    const [activeStatus, setActiveStatus] = React.useState<string>("all");

    // Process the dynamic data into a suitable format for the chart
    const processedData = React.useMemo(() => {
        if (!data?.data?.status_percentages) return [];

        return data.data.status_percentages.map((item: any) => ({
            status: item.status,
            desktop: item.count,
            fill:
                chartConfig[item.status as keyof ChartConfig]?.color || "gray", // Default color if not found
        }));
    }, [data]);

    // Find the active index based on the selected status
    const activeIndex = React.useMemo(
        () =>
            activeStatus === "all"
                ? -1
                : processedData.findIndex(
                      (item: any) => item.status === activeStatus
                  ),
        [activeStatus, processedData]
    );

    const handleSelectChange = (status: string) => {
        setActiveStatus(status);
    };

    return (
        <Card data-chart={id} className="flex flex-col">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="">
                <CardTitle className="flex justify-between items-center">
                    Comlaints Overview
                    <Select
                        value={activeStatus}
                        onValueChange={handleSelectChange}
                    >
                        <SelectTrigger
                            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent align="end" className="rounded-xl">
                            <SelectItem
                                key="all"
                                value="all"
                                className="rounded-lg"
                            >
                                <div className="flex items-center gap-2 text-xs">
                                    All Statuses
                                </div>
                            </SelectItem>
                            {Object.keys(chartConfig).map((statusKey) => {
                                const status =
                                    chartConfig[statusKey as keyof ChartConfig];
                                return (
                                    <SelectItem
                                        key={statusKey}
                                        value={statusKey}
                                        className="rounded-lg"
                                    >
                                        <div className="flex items-center gap-2 text-xs">
                                            <span
                                                className="flex h-3 w-3 shrink-0 rounded-sm"
                                                style={{
                                                    backgroundColor:
                                                        status.color,
                                                }}
                                            />
                                            {status.label}
                                        </div>
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </CardTitle>
                <CardDescription>
                    {data?.data?.start_date && data?.data?.end_date && (
                        <span>
                            <strong>Period:</strong> {data.data.start_date} to{" "}
                            {data.data.end_date}
                        </span>
                    )}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 justify-center pb-0 h-[400px]">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px] h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={processedData}
                            dataKey="desktop"
                            nameKey="status"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={(props: PieSectorDataItem) => {
                                const outerRadius = props.outerRadius ?? 0; // Fallback to 0 if undefined
                                return (
                                    <g>
                                        <Sector
                                            {...props}
                                            outerRadius={outerRadius + 10}
                                        />
                                        <Sector
                                            {...props}
                                            outerRadius={outerRadius + 25}
                                            innerRadius={outerRadius + 12}
                                        />
                                    </g>
                                );
                            }}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {activeStatus === "all"
                                                        ? processedData.reduce(
                                                              (
                                                                  sum: any,
                                                                  item: any
                                                              ) =>
                                                                  sum +
                                                                  item.desktop,
                                                              0
                                                          )
                                                        : processedData[
                                                              activeIndex
                                                          ].desktop.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Complaints
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="text-sm text-muted-foreground">
                <strong>Total Complaints: </strong>
                {data?.data?.total_complaints}
                <em> Powered by Your Data Insights</em>
            </CardFooter>
        </Card>
    );
}
