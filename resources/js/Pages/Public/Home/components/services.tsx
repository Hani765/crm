import { HoverEffect } from "@/components/ui/card-hover-effect";
import fetchHook from "@/hooks/fetchHook";
import { motion } from "framer-motion";

export default function Services() {
    const { data, isLoading, errors } = fetchHook("/fetch-services");

    // Motion variants
    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    const gridVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, staggerChildren: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
    return (
        <div className="px-2 lg:px-8 py-12 bg-white " id="services">
            <div className="relative overflow-x-hidden max-w-4xl mx-auto">
                {/* Animated Heading */}
                <motion.h1
                    className="text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-500 to-purple-600 mb-6 text-center"
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    viewport={{ once: true }}
                >
                    Explore Our Featured Services
                </motion.h1>

                {/* Animated Subtext */}
                <motion.em
                    className="text-lg leading-relaxed font-light text-gray-600 italic text-center block max-w-4xl mx-auto"
                    initial="hidden"
                    animate="visible"
                    viewport={{ once: true }}
                    variants={textVariants}
                >
                    In modern buildings, the design, installation, and control
                    systems of these functions are integrated into one or more
                    HVAC systems. For very small buildings, we normally estimate
                    the capacity and type of system needed and then design the
                    system, selecting the appropriate refrigerant and various
                    components needed. For larger buildings, building service
                    designers, mechanical engineers, or building services
                    engineers analyze, design, and specify the HVAC systems.
                </motion.em>

                {/* Loading State */}
                {isLoading ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4"
                        initial="hidden"
                        animate="visible"
                        variants={gridVariants}
                        viewport={{ once: true }}
                    >
                        {Array(6)
                            .fill(null)
                            .map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    className="rounded-lg bg-gray-200 h-40 animate-pulse"
                                    variants={cardVariants}
                                />
                            ))}
                    </motion.div>
                ) : (
                    // Loaded State
                    data !== null && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={gridVariants}
                            viewport={{ once: true }}
                        >
                            <HoverEffect items={data} />
                        </motion.div>
                    )
                )}
            </div>
        </div>
    );
}
