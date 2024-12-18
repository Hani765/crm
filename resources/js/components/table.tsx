import {
    ColumnDef,
    flexRender,
    SortingState,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DataTablePagination } from "./tableComponents/Pagination";
import { DataTableToolbar } from "./tableComponents/data-table-toolbar";
import { ReloadIcon } from "@radix-ui/react-icons";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination?: any;
    isLoading?: boolean;
    endPoint: string;
    onUrlChange?: any;
    tableViewOption?: boolean;
    isPagination?: true;
    Create?: any;
}

export function DataTable<TData extends { status: string }, TValue>({
    columns,
    data,
    pagination,
    endPoint,
    isLoading,
    onUrlChange,
    isPagination,
    Create,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    return (
        <div className="relative">
            <div className="flex items-center py-3">
                <DataTableToolbar
                    table={table}
                    Create={Create}
                    endPoint={endPoint}
                    onUrlChange={onUrlChange}
                />
            </div>

            <div className="rounded-md border shadow my-2 w-full dark:bg-gray-900 bg-white">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="whitespace-nowrap"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {!isLoading ? (
                            <>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={
                                                row.getIsSelected() &&
                                                "selected"
                                            }
                                            className={`whitespace-nowrap text-center ${
                                                [
                                                    "inactive",
                                                    "rejected",
                                                    "blocked",
                                                ].includes(row.original.status)
                                                    ? "bg-red-700 text-white font-serif hover:bg-red-700"
                                                    : ""
                                            }`}
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-16 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-16 text-center"
                                >
                                    <div className="flex justify-center items-center gap-2">
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Loading...
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {isPagination && (
                <div className="pt-3">
                    <DataTablePagination
                        table={table}
                        pagination={pagination}
                        endPoint={endPoint}
                        onUrlChange={onUrlChange}
                    />
                </div>
            )}
        </div>
    );
}
