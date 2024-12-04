import {
    BrainCogIcon,
    PackageIcon,
    ThumbsUpIcon,
    TrophyIcon,
    UsersIcon,
    ZapIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const items = [
    {
        icon: (
            <BrainCogIcon className="flex-shrink-0 mt-2 h-8 w-8 text-white" />
        ),
        title: "Creative minds",
        description:
            "We choose our teams carefully. Our people are the secret to great work.",
        delay: 0.3,
        bgClass: "bg-gradient-to-r from-blue-800 via-indigo-600 to-purple-600",
    },
    {
        icon: <PackageIcon className="flex-shrink-0 mt-2 h-8 w-8 text-white" />,
        title: "Effortless updates",
        description:
            "Benefit from automatic updates to all boards any time you need to make a change to your website.",
        delay: 0.6,
        bgClass: "bg-gradient-to-r from-blue-800 via-indigo-600 to-purple-600",
    },
    {
        icon: <ZapIcon className="flex-shrink-0 mt-2 h-8 w-8 text-white" />,
        title: "Strong empathy",
        description:
            "We’ve user tested our own process by shipping over 1k products for clients.",
        delay: 0.9,
        bgClass: "bg-gradient-to-r from-blue-800 via-indigo-600 to-purple-600",
    },
    {
        icon: <TrophyIcon className="flex-shrink-0 mt-2 h-8 w-8" />,
        title: "Conquer the best",
        description: "We stay lean and help your product do one thing well.",
        delay: 0.3,
        bgClass: "bg-white",
    },
    {
        icon: <UsersIcon className="flex-shrink-0 mt-2 h-8 w-8" />,
        title: "Designing for people",
        description:
            "We actively pursue the right balance between functionality and aesthetics, creating delightful experiences.",
        delay: 0.6,
        bgClass: "bg-white",
    },
    {
        icon: <ThumbsUpIcon className="flex-shrink-0 mt-2 h-8 w-8" />,
        title: "Simple and affordable",
        description:
            "From boarding passes to movie tickets, there's pretty much nothing you can’t do.",
        delay: 0.9,
        bgClass: "bg-white",
    },
];

export default function SecondHero() {
    // Split items into two halves
    const leftItems = items.slice(0, Math.ceil(items.length / 2));
    const rightItems = items.slice(Math.ceil(items.length / 2));

    return (
        <div className="relative px-2">
            <div className="absolute left-0 bottom-0 right-0 bg-white top-40 -z-10 px-4"></div>
            <motion.div
                className="bg-white shadow-lg rounded-2xl overflow-hidden border-t-4 border-white container mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
            >
                <div className="grid md:grid-cols-2">
                    {/* Left Column */}
                    <motion.div
                        className="space-y-6 lg:space-y-10 py-16 px-8 bg-gradient-to-r from-blue-800 via-indigo-600 to-indigo-500"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        {leftItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1, delay: item.delay }}
                                viewport={{ once: true }}
                            >
                                {item.icon}
                                <div className="ms-5 sm:ms-8">
                                    <h3 className="text-gray-200 sm:text-lg font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-gray-400">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="space-y-6 lg:space-y-10 py-16 px-8 "
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        {rightItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1, delay: item.delay }}
                                viewport={{ once: true }}
                            >
                                {item.icon}
                                <div className="ms-5 sm:ms-8">
                                    <h3 className="text-base sm:text-lg font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    {/* End Right Column */}
                </div>
                {/* End Grid */}
            </motion.div>
        </div>
    );
}
