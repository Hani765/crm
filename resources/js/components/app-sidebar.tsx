import * as React from "react";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import NavBrands from "./ui/nav-brands";
import { FetchProvider } from "@/hooks/FetchContext";
import NavBranches from "./ui/nav-branches";
import { NavSecondary } from "./nav-secondary";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const page = usePage();
    const user = page.props.auth.user;
    const role = user.role;
    const curretUrl = page.url;

    return (
        <Sidebar collapsible="icon" {...props}>
            <FetchProvider urls={["/fetch-brands-ids", "/fetch-branches-ids"]}>
                <SidebarHeader>
                    <NavBranches
                        url={"/fetch-branches-ids"}
                        currentUrl={curretUrl}
                    />
                </SidebarHeader>
                <SidebarContent>
                    <NavSecondary role={role} url={curretUrl} />
                    <NavBrands
                        url={"/fetch-brands-ids"}
                        currentUrl={curretUrl}
                    />
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={user} />
                </SidebarFooter>
            </FetchProvider>
            <SidebarRail />
        </Sidebar>
    );
}
