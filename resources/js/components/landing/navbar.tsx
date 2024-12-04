import React from "react";
import { Routes } from "@/types";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";
import {
    FaBars,
    FaFacebook,
    FaInstagram,
    FaTiktok,
    FaTimes,
    FaTwitter,
    FaWhatsapp,
} from "react-icons/fa";
import { useState } from "react";

const sharePages = [
    { link: "", Icon: FaFacebook },
    { link: "", Icon: FaInstagram },
    { link: "", Icon: FaTwitter },
    { link: "", Icon: FaTiktok },
    { link: "", Icon: FaWhatsapp },
];

export default function LandingNavbar({
    routes,
    active,
    scrolled,
}: {
    routes: Routes[];
    active: string;
    scrolled: boolean;
}) {
    const [open, setOpen] = useState(false);

    return (
        <nav
            className={`top-0 w-full z-50 transition-colors duration-300 ${
                scrolled
                    ? "bg-white shadow-md text-gray-800 fixed border-b-4 border-purple-800"
                    : "bg-transparent text-white"
            }`}
        >
            {!scrolled && (
                <div className="flex justify-between items-center w-[98%] md:max-w-[90%] mx-auto py-2">
                    <p className="text-lg font-bold">Tasker Company</p>
                    <div className="text-sm hidden md:block">
                        <a href="tel:+923025117000">
                            Make a Call: +92-3025117000
                        </a>
                    </div>
                    <div className="gap-3 text-lg hidden md:flex">
                        {sharePages.map((item, idx) => (
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={idx}
                                className="hover:text-purple-500 transition-all duration-300"
                            >
                                <item.Icon />
                            </a>
                        ))}
                    </div>
                    <div className="block md:hidden">
                        <Button
                            variant="ghost"
                            className="hover:bg-transparent"
                            onClick={() => setOpen(!open)}
                        >
                            {!open ? <FaBars /> : <FaTimes />}
                        </Button>
                    </div>
                </div>
            )}

            {/* Divider */}
            <hr
                className={`${
                    scrolled ? "bg-gray-300" : "bg-white/40"
                } transition-colors`}
            />

            {/* Bottom Section */}
            <div className="justify-between items-center px-8 py-4 max-w-[90%] mx-auto hidden md:flex">
                <ul className="flex gap-6 items-center">
                    {routes.map((route) => (
                        <li key={route.name}>
                            <Link
                                href={`route.url`}
                                className={`transition-all duration-300 ${
                                    active === route.url
                                        ? "bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent"
                                        : "text-inherit"
                                } hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-600 hover:bg-clip-text hover:text-transparent`}
                            >
                                {route.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link
                    href="/login"
                    className="bg-gradient-to-l from-purple-600 to-purple-800 text-white rounded py-1 px-4 
                        transition-all duration-300 ease-in-out hover:from-purple-700 hover:to-purple-900 hover:shadow-lg hover:scale-105"
                >
                    Login
                </Link>
            </div>
        </nav>
    );
}
