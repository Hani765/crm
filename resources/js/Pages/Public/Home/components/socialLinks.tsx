import React from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaTiktok, FaPhoneAlt } from "react-icons/fa";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip";

const socialLinks = [
    {
        name: "Call Us",
        color: "bg-blue-500",
        icon: <FaPhoneAlt size={20} />,
        contact: "tel:020001023123", // Use tel: for phone numbers
    },
    {
        name: "Facebook",
        color: "bg-blue-700",
        icon: <FaFacebookF size={20} />,
        contact: "https://facebook.com/yourpage",
    },
    {
        name: "Instagram",
        color: "bg-pink-500",
        icon: <FaInstagram size={20} />,
        contact: "https://instagram.com/yourprofile",
    },
    {
        name: "WhatsApp",
        color: "bg-green-400",
        icon: <IoLogoWhatsapp size={20} />,
        contact: "https://wa.me/2000123123", // Use wa.me link for WhatsApp
    },
    {
        name: "TikTok",
        color: "bg-black",
        icon: <FaTiktok size={20} />,
        contact: "https://tiktok.com/@yourprofile",
    },
];

export default function SocialLinks() {
    return (
        <div className="fixed top-1/2 right-3    transform -translate-y-1/2 space-y-4">
            {socialLinks.map((link, index) => (
                <TooltipProvider>
                    <Tooltip>
                        <a
                            key={index}
                            href={link.contact}
                            target={
                                link.contact.startsWith("http")
                                    ? "_blank"
                                    : "_self"
                            }
                            rel="noopener noreferrer"
                            className={`group flex items-center justify-center ${link.color} text-white rounded-full p-3 shadow-lg border-2 border-white transition-transform transform hover:scale-110`}
                        >
                            <TooltipTrigger>{link.icon}</TooltipTrigger>
                            <TooltipContent>{link.name}</TooltipContent>
                        </a>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );
}
