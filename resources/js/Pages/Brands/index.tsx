import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { BrandsData } from "./BrandsData";
import { FetchProvider } from "@/hooks/FetchContext";

export default function Index() {
    const [url, setUrl] = useState(`/fetch-brands`);
    return (
        <Authenticated>
            <Head title="Brands">
                <meta
                    name="description"
                    content="Manage and track your Brands in one convenient location."
                />
            </Head>
            <FetchProvider urls={[url]}>
                <BrandsData url={url} setUrl={setUrl} />
            </FetchProvider>
        </Authenticated>
    );
}
