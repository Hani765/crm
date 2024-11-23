import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { FetchProvider } from "@/hooks/FetchContext";
import { Data } from "./Data";

export default function Index() {
    const [url, setUrl] = useState(`/fetch-users`);
    return (
        <Authenticated>
            <Head title="Users">
                <meta
                    name="description"
                    content="Manage and track your Users in one convenient location."
                />
            </Head>
            <FetchProvider urls={[url]}>
                <Data url={url} setUrl={setUrl} />
            </FetchProvider>
        </Authenticated>
    );
}
