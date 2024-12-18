import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher({
    teams,
    current_url,
}: {
    teams: {
        id: string;
        unique_id: string;
        name: string;
        branch_manager: string;
        complaints_count: number;
    }[];
    current_url: string;
}) {
    const { isMobile } = useSidebar();
    const currentBranchId = current_url.split("/").pop();
    const [activeTeam, setActiveTeam] = React.useState(
        teams.find((team) => team.unique_id === currentBranchId) || teams[0]
    );
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                {activeTeam.complaints_count}
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeTeam.name}
                                </span>
                                <span className="truncate text-xs">
                                    {activeTeam.branch_manager}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Branches
                        </DropdownMenuLabel>
                        {teams.map((team, index) => (
                            <div key={team.unique_id}>
                                {currentBranchId === team.unique_id ||
                                team.unique_id === null ? (
                                    <DropdownMenuItem className="gap-2 p-2 cursor-not-allowed">
                                        <div className="flex size-6 items-center justify-center rounded-sm border">
                                            {index + 1}
                                        </div>
                                        {team.name}
                                        <DropdownMenuShortcut>
                                            ⌘{team.complaints_count}
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                ) : (
                                    <a
                                        href={`/branches/${team.unique_id}`}
                                        target="_blank"
                                    >
                                        <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                                            <div className="flex size-6 items-center justify-center rounded-sm border">
                                                {index + 1}
                                            </div>
                                            {team.name}
                                            <DropdownMenuShortcut>
                                                ⌘{team.complaints_count}
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </a>
                                )}
                            </div>
                        ))}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">
                                Add team
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
