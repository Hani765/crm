// BrandsData.tsx
import { DataTableSkeleton } from "@/components/tableComponents/tableSkeleton";
import { LucideServerCrash } from "lucide-react";
import { DataTable } from "@/components/table";

import { useFetchContext } from "@/hooks/useFetchContext";
import { Columns } from "@/Pages/Complaints/columns";

export function Data({ url, setUrl }: { url: string; setUrl: any }) {
    const { data, error, isLoading } = useFetchContext(url);

    return (
        <>
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
                />
            )}
        </>
    );
}
