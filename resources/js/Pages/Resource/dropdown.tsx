"use client";
import React, { ReactNode, useState } from "react";
import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaDescription,
} from "@/components/ui/credenza";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Link, useForm } from "@inertiajs/react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

export default function Dropdown({ rowCurrent }: { rowCurrent: any }) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const { delete: destroy, processing } = useForm({ id: "" });
    const deleteRow = (uniqueId: string) => {
        destroy(`/brands/${uniqueId}`, {
            onSuccess: () => {
                toast.success("Item deleted");
                setDeleteOpen(false);
            },
            onError: () => {
                toast.error("Failed to delete item.");
            },
        });
    };

    return (
        <>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="focus:outline-none">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="max-w-10">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <a
                                href={`/copy-complaint/${rowCurrent.id}`}
                                target="_blank"
                            >
                                Copy Complaint
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <a
                                href={`/complaint/${rowCurrent.id}`}
                                target="_blank"
                            >
                                View Details
                            </a>
                        </DropdownMenuItem>
                        {rowCurrent.status !== "closed" && (
                            <DropdownMenuItem>
                                {" "}
                                <a
                                    href={`/complaint/${rowCurrent.id}/edit`}
                                    target="_blank"
                                >
                                    Edit
                                </a>
                            </DropdownMenuItem>
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            className="py-1 w-full m-0 flex gap-4 text-red-600"
                            onClick={() => setDeleteOpen(true)}
                        >
                            Delete
                            <FaTrashAlt size={11} />
                        </Button>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Credenza open={deleteOpen} onOpenChange={setDeleteOpen}>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle>
                            Are you sure you want to delete?
                        </CredenzaTitle>
                        <CredenzaDescription>
                            This action cannot be undone. You are about to
                            delete ({rowCurrent.name})
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <div className="flex justify-between flex-col gap-2 p-2">
                        <Button
                            className="w-full"
                            variant="destructive"
                            disabled={processing}
                            onClick={() => deleteRow(rowCurrent.id)}
                        >
                            {processing ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting
                                </>
                            ) : (
                                "Yes Delete"
                            )}
                        </Button>
                        <CredenzaClose className="w-full">Cancel</CredenzaClose>
                    </div>
                </CredenzaContent>
            </Credenza>
        </>
    );
}
