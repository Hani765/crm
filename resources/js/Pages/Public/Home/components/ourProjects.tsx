import React from "react";
import { motion } from "framer-motion";

export default function OurProjects() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section with Animated Text */}
            <motion.div
                className="bg-white p-8 flex items-center"
                initial={{
                    opacity: 1,
                    x: 0,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Default clipPath
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    clipPath: "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)", // clipPath for larger screens
                }}
                viewport={{ once: true, amount: 0.5 }} // triggers once when 50% of the element is in view
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 mx-8">
                    {/* Animated Text */}
                    <motion.h2
                        className="mb-4 text-4xl tracking-tight font-extrabold  dark:text-white"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        We didn't reinvent the wheel
                    </motion.h2>
                    <motion.p
                        className="mb-4 text-lg text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        We are strategists, designers, and developers.
                        Innovators and problem solvers. Small enough to be
                        simple and quick, but big enough to deliver the scope
                        you want at the pace you need.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg text-gray-700 dark:text-gray-300"
                    >
                        We are strategists, designers, and developers.
                        Innovators and problem solvers. Small enough to be
                        simple and quick.
                    </motion.p>
                </div>
            </motion.div>

            {/* Right Section with Dark Background and Progress Bars */}
            <motion.div
                className=" p-8 flex items-center flex-col justify-center space-y-8"
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }} // ensures animation triggers only once when visible
            >
                <div className="space-y-4 w-full">
                    {/* Installation Progress */}
                    <div>
                        <p className="text-xl font-semibold text-white">
                            Installation
                        </p>
                        <motion.div
                            className="w-full bg-gray-600 rounded-full h-4"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "93%" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            viewport={{ once: true }} // animation triggers only once
                        >
                            <div className="h-full bg-green-500 rounded-full"></div>
                        </motion.div>
                    </div>

                    {/* Repair Progress */}
                    <div>
                        <p className="text-xl font-semibold text-white">
                            Repair
                        </p>
                        <motion.div
                            className="w-full bg-gray-600 rounded-full h-4"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "85%" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            viewport={{ once: true }} // animation triggers only once
                        >
                            <div className="h-full bg-blue-500 rounded-full"></div>
                        </motion.div>
                    </div>

                    {/* Maintenance Progress */}
                    <div>
                        <p className="text-xl font-semibold text-white">
                            Maintenance
                        </p>
                        <motion.div
                            className="w-full bg-gray-600 rounded-full h-4"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "90%" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            viewport={{ once: true }} // animation triggers only once
                        >
                            <div className="h-full bg-yellow-500 rounded-full"></div>
                        </motion.div>
                    </div>

                    {/* Client Feedback Progress */}
                    <div>
                        <p className="text-xl font-semibold text-white">
                            Client Feedback
                        </p>
                        <motion.div
                            className="w-full bg-gray-600 rounded-full h-4"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "88%" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        >
                            <div className="h-full bg-red-500 rounded-full"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
