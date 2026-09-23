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
}) {

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
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-8">

            <div className="mx-auto flex max-w-xl flex-col items-center text-center">

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
                        className="absolute inset-0 rounded-2xl border border-violet-500/20 bg-violet-500/5"
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
                            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10"
                        >

                            <Icon
                                size={20}
                                strokeWidth={1.7}
                                className="text-violet-400"
                            />

                        </motion.div>

                    </AnimatePresence>

                </div>


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

                            <h3 className="text-lg font-medium text-white">
                                {currentStep.title}
                            </h3>

                            <p className="mt-2 text-sm text-zinc-500">
                                {currentStep.description}
                            </p>

                        </motion.div>

                    </AnimatePresence>

                </div>


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
                            className="h-1 rounded-full bg-violet-400"
                        />

                    ))}

                </div>


                <p className="mt-5 text-xs text-zinc-600">
                    This may take a few moments.
                </p>

            </div>

        </section>
    );
}

export default SearchProgress;