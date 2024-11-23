import React, { ReactNode } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Dropdown from "./dropdown";
import { DataTableColumnHeader } from "@/components/tableComponents/data-table-column-header";
import { formatDate } from "@/lib/utils";
import Status from "@/components/tableComponents/status";
import { BrandType } from "@/types/global";
import ProfilePic from "@/components/ui/profile_pic";

export const Columns = (): ColumnDef<BrandType>[] => [
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
            <DataTableColumnHeader column={column} title="ID" />
        ),
    },
    {
        accessorKey: "logo",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Brand Logo" />
        ),
        cell: ({ row }) => {
            const path = String(row.getValue("logo"));

            return (
                <>
                    <ProfilePic path={path} />
                </>
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Brand Name" />
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
