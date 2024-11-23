import React, { ReactNode } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/tableComponents/data-table-column-header";
import { formatDate } from "@/lib/utils";
import Status from "@/components/tableComponents/status";
import { BranchType, BrandType } from "@/types/global";
import ProfilePic from "@/components/ui/profile_pic";
import Dropdown from "./dropdown";

export const Columns = (): ColumnDef<BranchType>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Branch ID" />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Branch Name" />
        ),
    },
    {
        accessorKey: "branch_manager",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Branch Manager" />
        ),
    },
    {
        accessorKey: "branch_contact_no",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Branch Contant No" />
        ),
    },
    {
        accessorKey: "pending",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Open Complaints" />
        ),
    },
    {
        accessorKey: "open",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Pending Camplaints" />
        ),
    },
    {
        accessorKey: "closed_today",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Closed in today" />
        ),
    },

    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Updated At" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = String(row.getValue("status"));
            return <Status status={status} />;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const rowCurrent = row.original;
            return (
                <>
                    <Dropdown rowCurrent={rowCurrent} />
                </>
            );
        },
    },
];
