import { useFetchContext } from "@/hooks/useFetchContext";
import { TeamSwitcher } from "../team-switcher";
import { Skeleton } from "./skeleton";

export default function NavBranches({
    url,
    currentUrl,
}: {
    url: string;
    currentUrl: string;
}) {
    const { data, error, isLoading } = useFetchContext(url);

    if (error) {
        return <div>Error: {error.message || "Failed to fetch branches"}</div>; // Handle errors gracefully
    }

    // Ensure data is in the expected format
    const teams = Array.isArray(data)
        ? data.map((team) => ({
              id: team.unique_id,
              unique_id: team.unique_id,
              name: team.name,
              branch_manager: team.branch?.username || "Unknown Manager",
              complaints_count: team.complaints_count || 0,
          }))
        : [];

    return teams.length > 0 ? (
        <TeamSwitcher teams={teams || []} current_url={currentUrl} />
    ) : (
        <Skeleton className="w-full h-14" />
    );
}
