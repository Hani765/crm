// BrandsData.tsx
import React, { useState } from "react";
import useFetch from "@/hooks/usefetch";
import { BrandType } from "@/types/global";
import { DataTableSkeleton } from "@/components/tableComponents/tableSkeleton";
import { LucideServerCrash } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DataTable } from "@/components/table";
import { Columns } from "./columns";
import Create from "./create/CreateDialogue";
import { useFetchContext } from "@/hooks/useFetchContext";

interface DataType {
    data: BrandType[];
    pagination: any;
}

export function BrandsData({ url, setUrl }: { url: string; setUrl: any }) {
    const { data, error, isLoading } = useFetchContext(url);

    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg">Brands</h2>
                    <p className="text-sm text-gray-500 hidden sm:block">
                        Manage and track your Brands in one convenient location.
                    </p>
                </div>
                <DateRangePicker endPoint={url} onUrlChange={setUrl(url)} />
            </div>
            {error ? (
                <div className="min-h-72 mt-6 bg-white flex border flex-col border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm justify-center items-center px-2 rounded py-4 text-gray-100 dark:text-gray-600">
                    <LucideServerCrash size={44} />
                    <div>
                        Something went wrong, please try to refresh the page.
                    </div>
                </div>
            ) : !data ? (
                <DataTableSkeleton
                    rowCount={8}
                    columnCount={8}
                    showViewOptions={false}
                />
            ) : (
                <DataTable
                    isLoading={isLoading}
                    data={data.data}
                    pagination={data.pagination}
                    endPoint={url}
                    columns={Columns()}
                    onUrlChange={(url: string) => setUrl(url)}
                    isPagination
                    Create={Create}
                />
            )}
        </>
    );
}
