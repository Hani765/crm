import * as React from "react";
import { type LucideIcon } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";
import { getMenuList } from "@/lib/menu-list";

export function NavSecondary({
    role, // Now passing the role as a prop
    url,
    ...props
}: {
    role: string | undefined;
    url: string;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const menuItems = getMenuList(role); // Get the menu items based on the role

    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {menuItems.map((group) => (
                        <React.Fragment key={group.groupLabel}>
                            <p className="text-xs text-gray-500 ">
                                {group.groupLabel}
                            </p>
                            {group.menus.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                        asChild
                                        size="sm"
                                        isActive={
                                            url.includes(item.href) ||
                                            url === item.href
                                        }
                                    >
                                        <Link href={item.href}>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </React.Fragment>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
