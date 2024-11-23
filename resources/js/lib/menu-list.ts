import { MdHome, MdMessage } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { TbBrand4Chan, TbGitBranch, TbUsersGroup } from "react-icons/tb";
import { GrCompliance } from "react-icons/gr";
import { GearIcon } from "@radix-ui/react-icons";
import { PiGear } from "react-icons/pi";

export function getMenuList(role: string | undefined) {
    let menuItems = [
        {
            groupLabel: "Pages",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboards",
                    icon: MdHome,
                    submenus: [],
                },
            ],
        },
    ];

    // Add 'Users' menu only if the role is not 'user'
    if (role !== "user") {
        menuItems[0].menus.push({
            href: "/users",
            label: "Users",
            icon: TbUsersGroup,
            submenus: [],
        });
    }

    // Add additional menus for 'admin' role
    if (role === "admin") {
        menuItems[0].menus.push(
            {
                href: "/brands",
                label: "Brands",
                icon: TbBrand4Chan,
                submenus: [],
            },
            {
                href: "/branches",
                label: "Branches",
                icon: TbGitBranch,
                submenus: [],
            },
            {
                href: "/complaint",
                label: "Complaints",
                icon: GrCompliance,
                submenus: [],
            }
        );
    }

    menuItems.push({
        groupLabel: "Settings",
        menus: [
            {
                href: "/settings",
                label: "Settings",
                icon: PiGear,
                submenus: [],
            },
            {
                href: "/messages",
                label: "Messages",
                icon: MdMessage,
                submenus: [],
            },
            {
                href: "/notifications",
                label: "Notifications",
                icon: IoNotifications,
                submenus: [],
            },
        ],
    });

    return menuItems;
}
