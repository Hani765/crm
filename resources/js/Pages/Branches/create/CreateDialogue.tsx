import { buttonVariants } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";

export default function Create() {
    return (
        <Link
            className={`w-full sm:w-fit ${buttonVariants({
                variant: "outline",
                size: "sm",
            })}`}
            href={route("branches.create")}
        >
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            Add new Branch
        </Link>
    );
}