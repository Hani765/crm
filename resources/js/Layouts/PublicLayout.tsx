import React, { useEffect, useRef, useState } from "react";
import LandingNavbar from "@/components/landing/navbar";
import { Head, usePage } from "@inertiajs/react";
import { MetaType, Routes } from "@/types";
import SocialLinks from "@/Pages/Public/Home/components/socialLinks";
import FooterPublic from "@/Pages/Public/Home/components/footer";

export default function PublicLayout({
    children,
    meta,
    routes,
}: {
    children: React.ReactNode;
    meta: MetaType;
    routes: Routes[];
}) {
    const page = usePage();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        const handleScroll = () => {
            if (scrollContainer) {
                setScrolled(scrollContainer.scrollTop > 100);
            }
        };

        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);
    return (
        <div>
            <Head>
                <title>{`${meta.title} - taskercompany.com`}</title>
                <meta name="description" content={meta.description} />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="taskercompany.com" />
                <meta property="og:type" content="article" />
                <meta
                    property="og:title"
                    content={`${meta.title} - taskercompany.com`}
                />
                <meta property="og:description" content={meta.description} />
                <meta
                    property="og:url"
                    content={`https://taskercompany.com${page.url}`}
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content={`${meta.title} - taskercompany.com`}
                />
                <meta name="twitter:description" content={meta.description} />
            </Head>
            <img
                src="/storage/assets/images/hero-image-min.webp"
                alt="Hero Image"
                className="absolute top-0 left-0 w-full h-full object-cover -z-50"
            />
            <div className="opacity-80 absolute top-0 left-0 w-full h-full -z-10 bg-slate-900"></div>
            <div
                className="overflow-y-auto  h-screen scrollable-container"
                ref={scrollRef}
            >
                <LandingNavbar
                    routes={routes}
                    active={page.url}
                    scrolled={scrolled}
                />

                {children}
                <FooterPublic />
                <SocialLinks />
            </div>
        </div>
    );
}
