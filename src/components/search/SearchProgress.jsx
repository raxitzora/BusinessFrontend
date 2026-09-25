import { AnimatePresence, motion } from "framer-motion";

import {
    Search,
    MapPin,
    Layers,
    Sparkles,
} from "lucide-react";

function SearchProgress({
    keyword,
    location,
    stage = 0,
    theme,
}) {
    const isDark = theme === "dark";

    const steps = [
        {
            title: "Preparing your search",
            description:
                "Getting everything ready for your search.",
            icon: Search,
        },
        {
            title: `Finding ${keyword || "businesses"} in ${
                location || "your area"
            }`,
            description:
                "Looking for relevant businesses near your location.",
            icon: MapPin,
        },
        {
            title: "Collecting business information",
            description:
                "Organizing the businesses we found.",
            icon: Layers,
        },
        {
            title: "Preparing your results",
            description:
                "Finishing things up. Your results are almost ready.",
            icon: Sparkles,
        },
    ];

    const currentStep =
        steps[Math.min(stage, steps.length - 1)];

    const Icon = currentStep.icon;

    return (
        <section
            className={`
                rounded-[12px]
                border
                px-6
                py-8
                transition-all
                duration-200
                ${
                    isDark
                        ? "border-[#242424] bg-[#101010]"
                        : "border-[#dedede] bg-white"
                }
            `}
        >
            <div className="mx-auto flex max-w-xl flex-col items-center text-center">

                {/* Animated Icon */}

                <div className="relative flex h-14 w-14 items-center justify-center">

                    <motion.div
                        initial={{
                            scale: 0.8,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`
                            absolute
                            inset-0
                            rounded-2xl
                            border
                            transition-colors
                            duration-200
                            ${
                                isDark
                                    ? "border-blue-500/20 bg-blue-500/[0.05]"
                                    : "border-blue-200 bg-blue-50"
                            }
                        `}
                    />

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={currentStep.title}
                            initial={{
                                opacity: 0,
                                y: 5,
                                scale: 0.92,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: -5,
                                scale: 0.96,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut",
                            }}
                            className={`
                                relative
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                transition-colors
                                duration-200
                                ${
                                    isDark
                                        ? "bg-blue-500/10"
                                        : "bg-blue-50"
                                }
                            `}
                        >
                            <Icon
                                size={20}
                                strokeWidth={1.7}
                                className={
                                    isDark
                                        ? "text-blue-400"
                                        : "text-blue-500"
                                }
                            />
                        </motion.div>

                    </AnimatePresence>

                </div>

                {/* Text */}

                <div className="mt-5 min-h-[74px]">

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={currentStep.title}
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -8,
                            }}
                            transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <h3
                                className={`
                                    text-lg
                                    font-medium
                                    transition-colors
                                    duration-200
                                    ${
                                        isDark
                                            ? "text-white"
                                            : "text-[#171717]"
                                    }
                                `}
                            >
                                {currentStep.title}
                            </h3>

                            <p
                                className={`
                                    mt-2
                                    text-sm
                                    transition-colors
                                    duration-200
                                    ${
                                        isDark
                                            ? "text-zinc-500"
                                            : "text-[#777]"
                                    }
                                `}
                            >
                                {currentStep.description}
                            </p>
                        </motion.div>

                    </AnimatePresence>

                </div>

                {/* Progress */}

                <div className="mt-6 flex items-center gap-2">

                    {steps.map((_, index) => (
                        <motion.div
                            key={index}
                            animate={{
                                width:
                                    index === stage
                                        ? 20
                                        : 5,
                                opacity:
                                    index === stage
                                        ? 1
                                        : 0.3,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className={`
                                h-1
                                rounded-full
                                transition-colors
                                duration-200
                                ${
                                    isDark
                                        ? "bg-blue-400"
                                        : "bg-blue-500"
                                }
                            `}
                        />
                    ))}

                </div>

                {/* Footer */}

                <p
                    className={`
                        mt-5
                        text-xs
                        transition-colors
                        duration-200
                        ${
                            isDark
                                ? "text-zinc-600"
                                : "text-[#999]"
                        }
                    `}
                >
                    This may take a few moments.
                </p>

            </div>
        </section>
    );
}

export default SearchProgress;