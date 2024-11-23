import { TbBrandBinance } from "react-icons/tb";
import { NavMain } from "../nav-main";
import { useFetchContext } from "@/hooks/useFetchContext";
import { NavFavorites } from "../nav-favorites";
import { Skeleton } from "./skeleton";

export default function NavBrands({
    url,
    currentUrl,
}: {
    url: string;
    currentUrl: string;
}) {
    const { data, error, isLoading } = useFetchContext(url);

    return (
        <>
            {!isLoading ? (
                <NavFavorites data={data ?? []} currentUrl={currentUrl} />
            ) : (
                <div className="space-y-4 px-2">
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                    <Skeleton className="w-full h-4 rounded-lg" />
                </div>
            )}
        </>
    );
}
