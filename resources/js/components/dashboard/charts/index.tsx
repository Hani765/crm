import React, { useState } from "react";
import { ComplaintsChart } from "./Complaints-chart";
import { DonutChart } from "./DonutChart";
import { FetchProvider } from "@/hooks/FetchContext";
import { ComplaintsPercentagePie } from "./dashboard-complaints-percentage";

export default function ChartsIndex() {
    const [firstUrl, setFirstUrl] = useState("/dashboard-complaints-by-brand");
    const [complaintPercentageUrl, setComplaintPercentageUrl] = useState(
        "/dashboard-complaints-percentage"
    );
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <div className="col-span-2">
                    <FetchProvider urls={[firstUrl]}>
                        <ComplaintsChart url={firstUrl} />
                    </FetchProvider>
                </div>
                <FetchProvider urls={[complaintPercentageUrl]}>
                    <ComplaintsPercentagePie url={complaintPercentageUrl} />
                </FetchProvider>
            </div>
        </div>
    );
}
