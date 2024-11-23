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
import { User } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import React, { ChangeEvent, FormEventHandler } from "react";
import { toast } from "sonner";

export default function Form({ managers }: { managers: User[] }) {
    const { post, data, setData, processing, errors } = useForm({
        name: "",
        branch_manager: "",
        branch_contact_no: "",
        branch_address: "",
        image: null as File | null,
    });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("branches.store"), {
            onSuccess: () => {
                toast.success("Branch has been added!");
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
            <Head title="Add new brach" />
            <form onSubmit={onSubmit} className="space-y-2">
                <LabelInputContainer
                    label="Branch Name:"
                    type="text"
                    placeholder="eg: lahore branch"
                    required
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    errorMessage={errors.name}
                />{" "}
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
                <div className="">
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
                                <SelectLabel>Mangers</SelectLabel>
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
                        placeholder="Write branch adress..."
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
                <div className="flex justify-end">
                    <SubmitBtn label="Submit Branch" processing={processing} />
                </div>
            </form>
        </Authenticated>
    );
}
