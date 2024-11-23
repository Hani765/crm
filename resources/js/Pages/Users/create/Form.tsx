"use client";
import React, { FormEventHandler, ChangeEvent } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/usefetch";
import SearchSelect from "@/components/ui/search-select";
import { Skeleton } from "@/components/ui/skeleton";
import { getRoleOptions } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import InputError from "@/components/InputError";
export default function Form() {
    const {
        data: branchData,
        isLoading,
        error,
    } = useFetch("fetch-branches-ids");
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        branch_id: "",
        role: "",
    });

    // Handle form submission
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("users.store"), {
            onSuccess: () => {
                toast.success("User has been added!");
                reset();
            },
            onError: (errors) => {
                toast.error(errors.name || "An error occurred.");
            },
            preserveScroll: true,
        });
    };
    const page = usePage();
    const user = page.props.auth.user;
    const role = user.role;
    const roleOptions = getRoleOptions(role);

    return (
        <form className="w-full p-2 sm:p-0" onSubmit={submit}>
            <div className="w-full flex flex-col gap-2 items-end mb-2">
                <div className="w-full grid grid-cols-2 gap-2">
                    <LabelInputContainer
                        type="text"
                        label="First Name"
                        placeholder="eg: John"
                        required
                        className="bg-gray-50"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        errorMessage={errors.first_name}
                    />
                    <LabelInputContainer
                        type="text"
                        label="Last Name"
                        placeholder="eg: Doe"
                        required
                        className="bg-gray-50"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        errorMessage={errors.last_name}
                    />
                    <LabelInputContainer
                        type="text"
                        label="Username"
                        autoComplete="username"
                        placeholder="eg: john doe"
                        required
                        className="bg-gray-50"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        errorMessage={errors.username}
                    />
                    <LabelInputContainer
                        type="email"
                        label="Email"
                        autoComplete="email"
                        placeholder="example@gmail.com"
                        required
                        className="bg-gray-50"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        errorMessage={errors.email}
                    />
                    <LabelInputContainer
                        type="password"
                        label="Password"
                        autoComplete="password"
                        required
                        className="bg-gray-50"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        errorMessage={errors.password}
                        placeholder="********"
                    />
                    <LabelInputContainer
                        label="Confirm Password"
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        errorMessage={errors.password_confirmation}
                        required
                        placeholder="********"
                    />
                    {isLoading ? (
                        <div className="space-y-1 col-span-2">
                            <Skeleton className="h-3 w-[30%]" />
                            <Skeleton className="h-10" />
                        </div>
                    ) : (
                        <SearchSelect
                            className="col-span-2"
                            items={branchData || []}
                            selected_value={data.branch_id}
                            label="Select Branch"
                            onSelect={(unique_id: string) =>
                                setData("branch_id", unique_id)
                            }
                        />
                    )}
                    <div className="col-span-2">
                        <Label htmlFor="message">Select Role:</Label>
                        <Select
                            required
                            value={data.role}
                            onValueChange={(role) => setData("role", role)}
                        >
                            <SelectTrigger className="h-9 my-1">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {roleOptions.map((roleOption) => (
                                    <SelectItem
                                        key={roleOption}
                                        value={roleOption}
                                    >
                                        {roleOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>
                </div>

                <SubmitBtn
                    processing={processing}
                    label="Add New Brand"
                    className="w-full"
                />
            </div>
        </form>
    );
}
