import { cn } from "@/lib/utils";
import { ServiceType } from "@/types";
import { Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { GrNext, GrPrevious } from "react-icons/gr";

export const HoverEffect = ({
    items,
    className,
}: {
    items: ServiceType[];
    className?: string;
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [columns, setColumns] = useState(5); // Minimum columns

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

    // Handle Next/Back Pagination
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Dynamically calculate columns and items per page based on screen width
    const updateGrid = () => {
        const width = window.innerWidth;
        const minColumnWidth = 200; // Minimum column width
        const calculatedColumns = Math.max(
            Math.floor(width / minColumnWidth),
            3 // Minimum 5 columns
        );
        setColumns(calculatedColumns);

        // Calculate items per page based on rows (approx row height)
        const rows = Math.floor(window.innerHeight / 250);
        setItemsPerPage(calculatedColumns * rows);
    };

    useEffect(() => {
        updateGrid();
        window.addEventListener("resize", updateGrid);

        return () => {
            window.removeEventListener("resize", updateGrid);
        };
    }, []);

    return (
        <div className="flex flex-col items-center">
            {/* Items Grid */}
            <div
                className={cn("grid gap-6 py-10", className)}
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
            >
                {paginatedItems.map((item, idx) => (
                    <Link
                        href={item?.url}
                        key={item?.url}
                        className="relative group block p-2 h-full w-full"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className="absolute inset-0 h-28 w-28 bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-full"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: {
                                            duration: 0.15,
                                            delay: 0.2,
                                        },
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <Card className="relative overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                            />
                            <div className="relative z-10 p-4 rounded-2xl">
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>
                                    {item.description}
                                </CardDescription>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center w-full max-w-md mt-4">
                <Button disabled={currentPage === 1} onClick={handleBack}>
                    <GrPrevious />
                    Back
                </Button>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                </p>

                <Button
                    disabled={currentPage === totalPages}
                    onClick={handleNext}
                >
                    Next <GrNext />
                </Button>
            </div>
        </div>
    );
};

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "p-4 bg-gray-100 border border-transparent dark:border-white/[0.2] group-hover:border-gray-300 relative h-24 w-24 rounded-full",
                className
            )}
        >
            {children}
        </div>
    );
};

export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("font-bold tracking-wide", className)}>{children}</h4>
    );
};

export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                "mt-2 text-zinc-500 tracking-wide leading-relaxed text-sm",
                className
            )}
        >
            {children}
        </p>
    );
};
