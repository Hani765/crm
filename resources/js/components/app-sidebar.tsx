import * as React from "react";
import { LucideLayoutDashboard, Settings2 } from "lucide-react";

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
import { TbBrand4Chan, TbGitBranch, TbUsersGroup } from "react-icons/tb";
import { NavSecondary } from "./nav-secondary";
import { GrCompliance } from "react-icons/gr";
// Define the type for brandsData items
type Brand = {
    unique_id: number;
    name: string;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const page = usePage();
    const user = page.props.auth.user;
    const role = user.role;
    const curretUrl = page.url;
    const data = {
        user: {
            name: user.username,
            email: user.email,
            avatar: "/avatars/shadcn.jpg",
        },
        pages: [
            {
                title: "Dashboards",
                url: "/dashboard",
                icon: LucideLayoutDashboard,
            },
            { title: "Brands", url: "/brands", icon: TbBrand4Chan },
            { title: "Branches", url: "/branches", icon: TbGitBranch },
            { title: "Complaints", url: "/complaint", icon: GrCompliance },
            { title: "Users", url: "/users", icon: TbUsersGroup },
            { title: "Settings", url: "/settings", icon: Settings2 },
        ],
    };

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
                    <NavSecondary items={data.pages} url={curretUrl} />
                    <NavBrands
                        url={"/fetch-brands-ids"}
                        currentUrl={curretUrl}
                    />
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={data.user} />
                </SidebarFooter>
            </FetchProvider>
            <SidebarRail />
        </Sidebar>
    );
}
