"use client";
import {
    MoreHorizontal,
    Link as IconLink,
    Trash2,
    ArrowUpRight,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { BrandType } from "@/types/global";
import { Link } from "@inertiajs/react";

export function NavFavorites({
    data,
    currentUrl,
}: {
    data: BrandType[];
    currentUrl: string;
}) {
    const { isMobile } = useSidebar();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => alert("URL copied to clipboard!"),
            () => alert("Failed to copy URL.")
        );
    };

    const deleteBrand = async () => {};
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Brands</SidebarGroupLabel>
            <SidebarMenu>
                {data.map((item) => (
                    <SidebarMenuItem key={item.unique_id}>
                        <SidebarMenuButton
                            asChild
                            isActive={currentUrl.includes(item.unique_id)}
                        >
                            <Link
                                href={`/brands/${item.unique_id}`}
                                title={item.name}
                            >
                                <img
                                    src={`/storage/${item.logo}`}
                                    alt={item.name}
                                    className="w-6 h-6 rounded-full border border-primary"
                                />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem
                                    onClick={() =>
                                        copyToClipboard(
                                            `/projects/${item.unique_id}`
                                        )
                                    }
                                >
                                    <IconLink className="text-muted-foreground" />
                                    <span>Copy URL</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ArrowUpRight className="text-muted-foreground" />
                                    <a
                                        href={`/projects/${item.unique_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open in New Tab
                                    </a>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Trash2 className="text-muted-foreground" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
