import { DataTable } from "@/components/table";
import { DataTableSkeleton } from "@/components/tableComponents/tableSkeleton";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import useFetch from "@/hooks/usefetch";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { FetchedDataTypes } from "@/types";
import { Head } from "@inertiajs/react";
import { LucideServerCrash } from "lucide-react";
import React, { useState } from "react";
import { Columns } from "./columns";
import Create from "./create/CreateDialogue";

export default function index() {
    const [url, setUrl] = useState(`/fetch-branches`);
    const { data, isLoading, error } = useFetch<FetchedDataTypes>(url);

    return (
        <Authenticated>
            <Head title="Branches">
                <meta
                    name="description"
                    content="Manage and track your Branches in one convenient location."
                />
            </Head>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg">Branches</h2>
                    <p className="text-sm text-gray-500 hidden sm:block">
                        Manage and track your Branches in one convenient
                        location.
                    </p>
                </div>
                <DateRangePicker
                    endPoint={url}
                    onUrlChange={(url: string) => setUrl(url)}
                />
            </div>
            <>
                {error ? (
                    <div className="min-h-72 mt-6 bg-white flex border flex-col border-gray-200 dark:border-gray-700 dark:bg-gray-900 w-full shadow-sm justify-center items-center px-2 rounded py-4 text-gray-100 dark:text-gray-600">
                        <LucideServerCrash size={44} />
                        <div>
                            Something went wrong, please try to refresh the
                            page.
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
        </Authenticated>
    );
}
