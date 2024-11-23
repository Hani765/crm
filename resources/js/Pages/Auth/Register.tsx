import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { PasswordInput } from "@/components/ui/password-input";
import SubmitBtn from "@/components/ui/SubmitBtn";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <Link
                href={route("login")}
                className="rounded-md text-sm text-gray-600 underline absolute top-4 right-4 hover:text-gray-900"
            >
                Login
            </Link>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details below to create your account
                </p>
            </div>
            <form onSubmit={submit} className="space-y-2">
                <div className="flex gap-2">
                    <LabelInputContainer
                        label="First Name"
                        type="text"
                        id="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => setData("first_name", e.target.value)}
                        required
                        errorMessage={errors.first_name}
                        placeholder="eg: John"
                    />
                    <LabelInputContainer
                        label="Last Name"
                        type="text"
                        id="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="last_name"
                        onChange={(e) => setData("last_name", e.target.value)}
                        required
                        placeholder="eg: Doe"
                        errorMessage={errors.last_name}
                    />
                </div>
                <div className="flex gap-2">
                    <LabelInputContainer
                        id="username"
                        type="text"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("username", e.target.value)}
                        required
                        errorMessage={errors.username}
                        placeholder="eg: johndoe"
                    />
                    <LabelInputContainer
                        id="email"
                        type="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        errorMessage={errors.email}
                        placeholder="example@domain.com"
                    />
                </div>
                <PasswordInput
                    label="password"
                    id="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="current-password"
                    onChange={(e) => setData("password", e.target.value)}
                    errorMessage={errors.password}
                />

                <PasswordInput
                    label="Confirm Password"
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    errorMessage={errors.password_confirmation}
                />

                <SubmitBtn
                    label="Create new account"
                    processing={processing}
                    className="w-full"
                />
            </form>
        </GuestLayout>
    );
}
