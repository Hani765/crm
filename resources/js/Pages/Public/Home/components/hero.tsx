import { motion } from "framer-motion";

export default function Hero() {
    return (
        <>
            <div className="p-8 sm:py-16" id="home">
                {/* Grid */}
                <motion.div
                    className="grid items-center md:grid-cols-2 gap-8 lg:gap-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is in view
                >
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is in view
                    >
                        <p className="inline-block text-sm font-medium text-white">
                            A vision for 2024
                        </p>
                        {/* Title */}
                        <div className="mt-4 md:mb-12 max-w-2xl">
                            <motion.h1
                                className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is in view
                            >
                                Cloud Unleashed: Your Future in the Sky
                            </motion.h1>
                            <motion.p
                                className="text-xl text-muted-foreground text-white"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is in view
                            >
                                Experience limitless possibilities with our
                                cutting-edge cloud solutions.
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="mt-6 md:mt-12 py-3 flex items-center text-muted-foreground text-sm gap-x-1.5 after:flex-[1_1_0%] after:border-t after:ms-6 after:border-t-muted-foreground/50"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is in view
                >
                    <span className="font-semibold bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
                        50,000
                    </span>
                    individuals and companies trust Cloud Unleashed
                </motion.div>
            </div>
        </>
    );
}
