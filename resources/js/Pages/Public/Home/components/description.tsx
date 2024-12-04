import {
    BookOpenIcon,
    ChevronRightIcon,
    MessagesSquareIcon,
    ThumbsUpIcon,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DescriptionOfCompany() {
    return (
        <div className="bg-white p-2">
            {/* Icon Blocks */}
            <div className="container py-24 lg:py-32 mx-auto">
                {/* Grid */}
                <div className="grid md:grid-cols-2 ">
                    <div className="lg:w-3/4 gap-12">
                        <motion.h2
                            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is visible
                            transition={{ duration: 0.5 }}
                        >
                            Collaborative tools to design better user experience
                        </motion.h2>
                        <motion.p
                            className="mt-3 text-muted-foreground"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is visible
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            We help businesses bring ideas to life in the
                            digital world, by designing and implementing the
                            technology tools that they need to win.
                        </motion.p>
                        <motion.p
                            className="mt-5"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is visible
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <a
                                className="inline-flex items-center gap-x-1 group font-medium hover:underline underline-offset-4 "
                                href="#"
                            >
                                Contact sales to learn more
                                <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" />
                            </a>
                        </motion.p>
                    </div>
                    {/* End Col */}
                    <div className="space-y-6 lg:space-y-10">
                        {/* Icon Block */}
                        <motion.div
                            className="flex"
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is visible
                            transition={{ duration: 0.5 }}
                        >
                            {/* Icon */}
                            <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                                <BookOpenIcon className="flex-shrink-0 w-5 h-5" />
                            </span>
                            <div className="ms-5 sm:ms-8">
                                <h3 className="text-base sm:text-lg font-semibold text-gradient">
                                    Industry-leading documentation
                                </h3>
                                <p className="mt-1 text-muted-foreground">
                                    Our documentation and extensive Client
                                    libraries contain everything a business
                                    needs to build a custom integration in a
                                    fraction of the time.
                                </p>
                            </div>
                        </motion.div>
                        {/* End Icon Block */}
                        {/* Icon Block */}
                        <motion.div
                            className="flex"
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is visible
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {/* Icon */}
                            <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border  bg-primary text-primary-foreground">
                                <MessagesSquareIcon className="flex-shrink-0 w-5 h-5" />
                            </span>
                            <div className="ms-5 sm:ms-8">
                                <h3 className="text-base sm:text-lg font-semibold text-gradient">
                                    Developer community support
                                </h3>
                                <p className="mt-1 text-muted-foreground">
                                    We actively contribute to open-source
                                    projects—giving back to the community
                                    through development, patches, and
                                    sponsorships.
                                </p>
                            </div>
                        </motion.div>
                        {/* End Icon Block */}
                        {/* Icon Block */}
                        <motion.div
                            className="flex"
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.1 }} // Trigger when 10% of the element is visible
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            {/* Icon */}
                            <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                                <ThumbsUpIcon className="flex-shrink-0 w-5 h-5" />
                            </span>
                            <div className="ms-5 sm:ms-8">
                                <h3 className="text-base sm:text-lg font-semibold text-gradient">
                                    Simple and affordable
                                </h3>
                                <p className="mt-1 text-muted-foreground">
                                    From boarding passes to movie tickets,
                                    there&apos;s pretty much nothing you
                                    can&apos;t do.
                                </p>
                            </div>
                        </motion.div>
                        {/* End Icon Block */}
                    </div>
                    {/* End Col */}
                </div>
                {/* End Grid */}
            </div>
            {/* End Icon Blocks */}
        </div>
    );
}
