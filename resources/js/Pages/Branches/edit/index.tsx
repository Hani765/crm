import { Label } from "@/components/ui/label";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { Textarea } from "@/components/ui/textarea";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { statusOptions } from "@/lib/utils";
import { User } from "@/types";
import { BranchType } from "@/types/global";
import { Head, useForm } from "@inertiajs/react";
import React, { ChangeEvent, FormEventHandler } from "react";
import { toast } from "sonner";

export default function Form({
    managers,
    branch,
}: {
    managers: User[];
    branch: BranchType;
}) {
    const { put, data, setData, processing, errors } = useForm({
        name: branch.name,
        branch_manager: branch.branch_manager,
        branch_contact_no: branch.branch_contact_no,
        branch_address: branch.branch_address,
        status: branch.status,
        image: null as File | null,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("branches.update", branch.unique_id), {
            onSuccess: () => {
                toast.success("Branch has been updated!");
            },
        });
    };

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData("image", e.target.files[0]);
        }
    };

    return (
        <Authenticated>
            <Head title="Update Branch" />
            <form onSubmit={onSubmit} className="space-y-2">
                <LabelInputContainer
                    label="Branch Name:"
                    type="text"
                    placeholder="e.g: Lahore branch"
                    required
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    errorMessage={errors.name}
                />
                <LabelInputContainer
                    label="Branch Contact No:"
                    type="number"
                    placeholder="e.g: 030001112233"
                    required
                    value={data.branch_contact_no}
                    onChange={(e) =>
                        setData("branch_contact_no", e.target.value)
                    }
                    errorMessage={errors.branch_contact_no}
                />
                <div>
                    <Label>Select Branch Manager</Label>
                    <Select
                        value={data.branch_manager}
                        onValueChange={(unique_id) =>
                            setData("branch_manager", unique_id)
                        }
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="select branch manager" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Managers</SelectLabel>
                                {managers.map((manager) => (
                                    <SelectItem
                                        key={manager.id}
                                        value={manager.unique_id}
                                    >
                                        {manager.username}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.branch_manager && (
                        <p className="text-xs text-red-500">
                            {errors.branch_manager}
                        </p>
                    )}
                </div>
                <div>
                    <Label>Address:</Label>
                    <Textarea
                        rows={10}
                        placeholder="Write branch address..."
                        value={data.branch_address}
                        onChange={(e) =>
                            setData("branch_address", e.target.value)
                        }
                        required
                    />
                    {errors.branch_address && (
                        <p className="text-xs text-red-500">
                            {errors.branch_address}
                        </p>
                    )}
                </div>
                <div>
                    <LabelInputContainer
                        type="file"
                        onChange={handleLogoChange}
                        label="Select Images"
                    />
                    {errors.image && (
                        <p className="text-xs text-red-500">{errors.image}</p>
                    )}
                </div>
                <div className="flex justify-end gap-2">
                    <div className="max-w-[300px]">
                        <Select
                            onValueChange={(value) => setData("status", value)}
                            defaultValue={data.status}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((option) => (
                                    <SelectItem
                                        value={option.value}
                                        key={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.status && (
                            <p className="text-red-600">{errors.status}</p>
                        )}
                    </div>
                    <SubmitBtn
                        label={`Update Branch ${branch.id}`}
                        processing={processing}
                    />
                </div>
            </form>
        </Authenticated>
    );
}
