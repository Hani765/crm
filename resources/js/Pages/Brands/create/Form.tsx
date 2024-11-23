"use client";
import React, { FormEventHandler, ChangeEvent } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { PageProps } from "@/types";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { FaCodeBranch } from "react-icons/fa";
import { Input } from "@/components/ui/input";

export default function Form() {
    const page = usePage<PageProps>();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        logo: null as File | null, // Adding logo field to the form state
    });

    // Handle form submission
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("brands.store"), {
            onSuccess: () => {
                toast.success("Brand has been added!");
                reset();
            },
            onError: (errors) => {
                toast.error(errors.name || "An error occurred.");
            },
            preserveScroll: true,
        });
    };

    // Handle logo file input change
    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData("logo", e.target.files[0]); // Update the logo in form state
        }
    };

    return (
        <form className="w-full p-2 sm:p-0" onSubmit={submit}>
            <div className="w-full flex flex-col gap-2 items-end mb-2">
                <div className="w-full">
                    <LabelInputContainer
                        label="Brand Name"
                        description="Please enter the brand name."
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        id="large-url"
                        placeholder="eg: pel"
                        errorMessage={errors.name}
                        Icon={FaCodeBranch}
                    />
                </div>

                {/* Logo Upload Field */}
                <div className="w-full">
                    <label
                        htmlFor="logo"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Upload Logo
                    </label>
                    <Input
                        type="file"
                        id="logo"
                        accept="image/*"
                        onChange={handleLogoChange}
                    />
                    {errors.logo && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.logo}
                        </p>
                    )}
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
