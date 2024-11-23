import { TbBrandBinance } from "react-icons/tb";
import { NavMain } from "../nav-main";
import { useFetchContext } from "@/hooks/useFetchContext";

export default function NavBrands({
    url,
    currentUrl,
}: {
    url: string;
    currentUrl: string;
}) {
    const { data, error, isLoading } = useFetchContext(url);
    const fetchData = [
        {
            title: "Brands",
            url: "#",
            icon: TbBrandBinance,
            items:
                data?.map((item: any) => ({
                    url: `/brands/${item.unique_id}`,
                    title: item.name,
                })) || [],
        },
    ];

    return <NavMain items={fetchData} currentUrl={currentUrl} />;
}
