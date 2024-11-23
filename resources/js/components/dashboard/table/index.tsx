import { useState } from "react";
import { FetchProvider } from "@/hooks/FetchContext";
import { Data } from "./table";

export default function DashboardTableIndex() {
    const [url, setUrl] = useState(`/fetch-complaints`);
    return (
        <FetchProvider urls={[url]}>
            <Data url={url} setUrl={setUrl} />
        </FetchProvider>
    );
}
