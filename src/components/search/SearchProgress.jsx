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
            description: "Getting everything ready.",
            icon: Search,
        },
        {
            title: `Finding ${keyword || "businesses"}`,
            description: `Searching ${location || "your area"}.`,
            icon: MapPin,
        },
        {
            title: "Collecting business information",
            description: "Organizing businesses we found.",
            icon: Layers,
        },
        {
            title: "Preparing your results",
            description: "Your results are almost ready.",
            icon: Sparkles,
        },
    ];

    const currentStep =
        steps[Math.min(stage, steps.length - 1)];

    const Icon = currentStep.icon;

    return (
        <div
            className={`
                relative
                overflow-hidden
                rounded-[10px]
                border
                px-5
                py-4
                ${
                    isDark
                        ? "border-[#242424] bg-[#0d0d0d]"
                        : "border-[#e2e2e2] bg-white"
                }
            `}
        >

            {/* Ambient glow */}

            <div
                className={`
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-24
                    w-40
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    blur-3xl
                    ${
                        stage % 3 === 0
                            ? "bg-cyan-400/10"
                            : stage % 3 === 1
                                ? "bg-violet-400/10"
                                : "bg-pink-400/10"
                    }
                `}
            />

            <div className="relative flex items-center gap-4">

                {/* Animated icon */}

                <div className="relative shrink-0">

                    <motion.div
                        animate={{
                            scale: [1, 1.06, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className={`
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-[9px]
                            border
                            ${
                                stage % 3 === 0
                                    ? isDark
                                        ? "border-cyan-400/25 bg-cyan-400/10"
                                        : "border-cyan-500/20 bg-cyan-50"
                                    : stage % 3 === 1
                                        ? isDark
                                            ? "border-violet-400/25 bg-violet-400/10"
                                            : "border-violet-500/20 bg-violet-50"
                                        : isDark
                                            ? "border-pink-400/25 bg-pink-400/10"
                                            : "border-pink-500/20 bg-pink-50"
                            }
                        `}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep.title}
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                    rotate: -10,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    rotate: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    rotate: 10,
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                            >
                                <Icon
                                    size={19}
                                    strokeWidth={1.8}
                                    className={
                                        stage % 3 === 0
                                            ? isDark
                                                ? "text-cyan-300"
                                                : "text-cyan-600"
                                            : stage % 3 === 1
                                                ? isDark
                                                    ? "text-violet-300"
                                                    : "text-violet-600"
                                                : isDark
                                                    ? "text-pink-300"
                                                    : "text-pink-600"
                                    }
                                />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                </div>


                {/* Text */}

                <div className="min-w-0 flex-1">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep.title}
                            initial={{
                                opacity: 0,
                                y: 5,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -5,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                        >

                            <h3
                                className={`
                                    truncate
                                    text-[13px]
                                    font-medium
                                    ${
                                        isDark
                                            ? "text-zinc-200"
                                            : "text-[#222]"
                                    }
                                `}
                            >
                                {currentStep.title}
                            </h3>

                            <p
                                className={`
                                    mt-1
                                    truncate
                                    text-[11px]
                                    ${
                                        isDark
                                            ? "text-zinc-600"
                                            : "text-[#999]"
                                    }
                                `}
                            >
                                {currentStep.description}
                            </p>

                        </motion.div>
                    </AnimatePresence>

                </div>


                {/* Progress dots */}

                <div className="hidden shrink-0 items-center gap-1.5 sm:flex">

                    {steps.map((_, index) => (
                        <motion.div
                            key={index}
                            animate={{
                                width:
                                    index === stage
                                        ? 18
                                        : 5,
                                opacity:
                                    index === stage
                                        ? 1
                                        : 0.25,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className={`
                                h-1
                                rounded-full
                                ${
                                    index === stage
                                        ? stage % 3 === 0
                                            ? "bg-cyan-400"
                                            : stage % 3 === 1
                                                ? "bg-violet-400"
                                                : "bg-pink-400"
                                        : isDark
                                            ? "bg-[#444]"
                                            : "bg-[#d5d5d5]"
                                }
                            `}
                        />
                    ))}

                </div>

            </div>


            {/* Bottom progress line */}

            <div
                className={`
                    absolute
                    bottom-0
                    left-0
                    h-[1px]
                    transition-all
                    duration-500
                    ${
                        stage % 3 === 0
                            ? "bg-cyan-400/60"
                            : stage % 3 === 1
                                ? "bg-violet-400/60"
                                : "bg-pink-400/60"
                    }
                `}
                style={{
                    width: `${((stage + 1) / steps.length) * 100}%`,
                }}
            />

        </div>
    );
}

export default SearchProgress;