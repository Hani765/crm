import { Checkbox } from "@/components/ui/checkbox";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { PasswordInput } from "@/components/ui/password-input";
import SubmitBtn from "@/components/ui/SubmitBtn";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <Link
                href={route("register")}
                className="rounded-md text-sm text-gray-600 underline absolute top-4 right-4 hover:text-gray-900 "
            >
                Create new account
            </Link>
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Login to your account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email adn password below to login your account
                </p>
            </div>
            <form onSubmit={submit}>
                <div>
                    <LabelInputContainer
                        label="Email"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        autoFocus
                        id="email"
                        type="email"
                        errorMessage={errors.email}
                        placeholder="username@domain.com"
                    />
                </div>

                <div className="mt-4">
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
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData("remember", !data.remember)}
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="mt-4 w-full">
                    <SubmitBtn
                        label="Login to you account"
                        processing={processing}
                        className="w-full"
                    />
                </div>
            </form>
        </GuestLayout>
    );
}
