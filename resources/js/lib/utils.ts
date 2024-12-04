import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(
    date: Date | string | number,
    opts: Intl.DateTimeFormatOptions = {}
) {
    return new Intl.DateTimeFormat("en-US", {
        month: opts.month ?? "long",
        day: opts.day ?? "numeric",
        year: opts.year ?? "numeric",
        ...opts,
    }).format(new Date(date));
}
export const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "paused", label: "Paused" },
    { value: "open", label: "Open" },
    { value: "part-demand", label: "Part Demand" },
    { value: "service-lifting", label: "Service Lifting" },
    { value: "party-lifting", label: "Party Lifting" },
    { value: "unit-in-service-center", label: "Unit in service center" },
    { value: "installation-pending", label: "Installation Pending" },
    { value: "in-progress", label: "In Process" },
    { value: "deliverd", label: "Deliverd" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
    { value: "closed", label: "Closed" },
];

export const getRoleOptions = (role: string) => {
    switch (role) {
        case "admin":
            return [
                "manager",
                "cso",
                "cro",
                "assistant",
                "data specialist",
                "operator",
                "technician",
            ];
        case "manager":
            return [
                "cso",
                "cro",
                "assistant",
                "data specialist",
                "operator",
                "technician",
            ];
        default:
            return [];
    }
};
