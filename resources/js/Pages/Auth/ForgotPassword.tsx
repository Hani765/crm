import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SubmitBtn from "@/components/ui/SubmitBtn";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

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
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </p>
            </div>
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <LabelInputContainer
                    id="email"
                    type="email"
                    value={data.email}
                    label="Email"
                    className="mt-1 block w-full"
                    autoFocus
                    onChange={(e) => setData("email", e.target.value)}
                    errorMessage={errors.email}
                    placeholder="example@domain.com"
                />

                <div className="mt-4 flex items-center justify-end">
                    <SubmitBtn
                        label="Email Password Reset Link"
                        processing={processing}
                        className="w-full"
                    />
                </div>
            </form>
        </GuestLayout>
    );
}
