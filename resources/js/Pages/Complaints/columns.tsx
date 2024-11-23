import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Dropdown from "./dropdown";
import { DataTableColumnHeader } from "@/components/tableComponents/data-table-column-header";
import { formatDate } from "@/lib/utils";
import Status from "@/components/tableComponents/status";
import { ComplaintType } from "@/types/global"; // Assuming ComplaintType defines the complaint data type

export const Columns = (): ColumnDef<ComplaintType>[] => [
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
        accessorKey: "complain_num",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Complaint Number" />
        ),
    },
    {
        accessorKey: "company_complaint_no",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Company Complaint Number"
            />
        ),
    },

    {
        accessorKey: "username",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Username" />
        ),
    },
    {
        accessorKey: "brand.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Brand Name" />
        ),
    },
    {
        accessorKey: "contact_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Contact Name" />
        ),
    },
    {
        accessorKey: "contact_email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Contact Email" />
        ),
    },
    {
        accessorKey: "phone_no",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone Number" />
        ),
    },
    {
        accessorKey: "whatsapp_no",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Whats App Phone Number"
            />
        ),
    },
    {
        accessorKey: "city",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="City" />
        ),
    },
    {
        accessorKey: "address",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" />
        ),
    },
    {
        accessorKey: "product",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product" />
        ),
    },
    {
        accessorKey: "model",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Model" />
        ),
    },

    {
        accessorKey: "complaint_type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Complaint Type" />
        ),
    },
    {
        accessorKey: "provided_services",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Provided Services" />
        ),
    },
    {
        accessorKey: "technician",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Technician" />
        ),
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount" />
        ),
    },
    {
        accessorKey: "p_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Purchase Date" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
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
            return <Dropdown rowCurrent={rowCurrent} />;
        },
    },
];
