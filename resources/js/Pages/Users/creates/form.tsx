import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function form() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });
    return (
        <Authenticated>
            <form className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        errorMessage={errors.password}
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
                </div>
            </form>
        </Authenticated>
    );
}
