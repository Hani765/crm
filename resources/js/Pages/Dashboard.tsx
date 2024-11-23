import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DashboardTableIndex from "@/components/dashboard/table";
import ChartsIndex from "@/components/dashboard/charts";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardTab from "@/components/dashboard/tabs/dashboard";
import { MdFilterList } from "react-icons/md";
export default function Dashboard() {
    return (
        <Authenticated>
            <Tabs defaultValue="dashboard" className="space-y-4">
                <Head title="Dashboard" />
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg">Dashboard</h2>
                        <p className="text-sm text-gray-500 hidden sm:block">
                            Manage and track your All Data in one convenient
                            location.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <CalendarDateRangePicker />
                        <Button className="flex gap-2">
                            Filter <MdFilterList />
                        </Button>
                    </div>
                </div>
                <TabsList>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports" disabled>
                        Reports
                    </TabsTrigger>
                    <TabsTrigger value="notifications" disabled>
                        Notifications
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="space-y-4">
                    <DashboardTab />
                </TabsContent>
            </Tabs>
        </Authenticated>
    );
}
