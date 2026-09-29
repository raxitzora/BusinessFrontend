import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const steps = [
    {
        id: "search",
        number: "01",
        title: "Search Businesses",
        description:
            "Search any market by keyword and location. FYNDREX discovers businesses that match your target market.",
    },
    {
        id: "analyze",
        number: "02",
        title: "Analyze Businesses",
        description:
            "Automatically analyze each business's digital presence to uncover websites, technology, performance, and visibility signals.",
    },
    {
        id: "core",
        number: "03",
        title: "Core Analysis",
        description:
            "FYNDREX turns raw business data into structured insights so you can understand where the real opportunities are.",
    },
   {
    id: "opportunity",
    number: "04",
    title: "Find Opportunity",
    description:
        "Identify the problems worth solving and discover which services you can offer to each business.",
},
    {
        id: "enrich",
        number: "05",
        title: "Enrich Lead",
        description:
            "Build a complete prospect profile and turn the opportunity into a lead you can confidently approach.",
    },
];

function ProductWorkflow() {
    const [activeStep, setActiveStep] = useState(0);
    

    const workflowRef = useRef(null);
const desktopCardRef = useRef(null);
const mobileCardRef = useRef(null);
const capsuleRef = useRef(null);

    useEffect(() => {
        const workflow = workflowRef.current;
const card =
    window.innerWidth < 1024
        ? mobileCardRef.current
        : desktopCardRef.current;        const capsule = capsuleRef.current;

        if (!workflow || !card) return;

        let ticking = false;

        const updateActiveStep = () => {
            if (ticking) return;

            ticking = true;

            requestAnimationFrame(() => {
                const workflowRect =
                    workflow.getBoundingClientRect();

                const cardHeight =
                    card.getBoundingClientRect().height;

                const isMobile =
                    window.innerWidth < 1024;

                if (isMobile) {
                    const capsuleHeight =
                        capsule?.getBoundingClientRect().height || 0;

                    const stickyOffset = capsuleHeight;

                    const scrollDistance =
                        workflowRect.height -
                        cardHeight -
                        capsuleHeight;

                    const currentScroll =
                        stickyOffset - workflowRect.top;

                    const progress =
                        scrollDistance > 0
                            ? Math.max(
                                  0,
                                  Math.min(
                                      1,
                                      currentScroll /
                                          scrollDistance
                                  )
                              )
                            : 0;

                    const index = Math.min(
                        steps.length - 1,
                        Math.max(
                            0,
                            Math.round(
                                progress *
                                    (steps.length - 1)
                            )
                        )
                    );

                    setActiveStep(index);
                } else {
                    const stickyTop =
                        window.innerHeight * 0.15;

                    const scrollDistance =
                        workflowRect.height -
                        cardHeight;

                    const currentScroll =
                        stickyTop - workflowRect.top;

                    const progress =
                        scrollDistance > 0
                            ? Math.max(
                                  0,
                                  Math.min(
                                      1,
                                      currentScroll /
                                          scrollDistance
                                  )
                              )
                            : 0;

                    const index = Math.min(
                        steps.length - 1,
                        Math.max(
                            0,
                            Math.round(
                                progress *
                                    (steps.length - 1)
                            )
                        )
                    );

                    setActiveStep(index);
                }

                ticking = false;
            });
        };

        updateActiveStep();

        window.addEventListener(
            "scroll",
            updateActiveStep,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateActiveStep
        );

        return () => {
            window.removeEventListener(
                "scroll",
                updateActiveStep
            );

            window.removeEventListener(
                "resize",
                updateActiveStep
            );
        };
    }, []);

    const step = steps[activeStep];

    return (
        <section className="border-t border-zinc-200 bg-white">

            {/* Section heading */}

            <div className="mx-auto flex max-w-[1440px] flex-col items-center px-6 py-20 text-center sm:px-10 sm:py-24 lg:px-16">
                <div className="mb-4 text-sm font-bold text-blue-600">
                    How FYNDREX works
                </div>

                <h2 className="max-w-2xl text-2xl font-bold leading-[1.1] tracking-[-0.04em] text-zinc-950 sm:text-3xl lg:text-4xl">
                    Find businesses.
                    <br />
                    Discover opportunities.
                </h2>

                <p className="mt-4 max-w-xl text-base font-bold leading-6 tracking-[-0.02em] text-zinc-400 sm:text-lg">
                    From discovering businesses to finding the
                    right opportunity — everything happens in one
                    workflow.
                </p>
            </div>

            {/* Workflow scroll track */}

            <div
                ref={workflowRef}
                className="relative mx-auto max-w-[1440px] px-4 pb-16 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28"
            >
                <div className="relative min-h-[1250px] lg:min-h-[1100px]">

                    {/* ========================= */}
                    {/* MOBILE CAPSULE             */}
                    {/* ========================= */}

                    <div
                        ref={capsuleRef}
                        className="
                            sticky
                            top-0
                            z-50
                            -mx-4
                            bg-white/95
                            px-4
                            pb-3
                            pt-3
                            backdrop-blur-md
                            lg:hidden
                        "
                    >
                        <div className="rounded-full border border-zinc-200 bg-zinc-50 p-1 shadow-sm">
                            <div
                                className="flex min-h-[42px] items-center gap-1 overflow-x-auto overscroll-x-contain scrollbar-hide"
                                style={{
                                    WebkitOverflowScrolling:
                                        "touch",
                                }}
                            >
                                {steps.map(
                                    (
                                        workflowStep,
                                        index
                                    ) => {
                                        const active =
                                            activeStep ===
                                            index;

                                        return (
                                            <div
                                                key={
                                                    workflowStep.id
                                                }
                                                className={`
                                                    flex
                                                    min-w-max
                                                    shrink-0
                                                    items-center
                                                    gap-1.5
                                                    rounded-full
                                                    px-3
                                                    py-1.5
                                                    transition-colors
                                                    duration-150
                                                    ${
                                                        active
                                                            ? "bg-zinc-950 text-white shadow-sm"
                                                            : "text-zinc-400"
                                                    }
                                                `}
                                            >
                                                <span
                                                    className={`
                                                        flex
                                                        h-6
                                                        w-6
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        text-[9px]
                                                        font-bold
                                                        ${
                                                            active
                                                                ? "bg-white/15 text-white"
                                                                : "bg-zinc-200 text-zinc-500"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        workflowStep.number
                                                    }
                                                </span>

                                                <span className="whitespace-nowrap text-[10px] font-semibold">
                                                    {
                                                        workflowStep.title
                                                    }
                                                </span>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ========================= */}
                    {/* DESKTOP WORKFLOW            */}
                    {/* ========================= */}

                    <div
ref={desktopCardRef}                   
    className="
                            hidden
                            lg:sticky
                            lg:top-[15vh]
                            lg:block
                        "
                    >
                        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">

                            <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">

                                <WorkflowNavigation
                                    activeStep={activeStep}
                                />

                                <WorkflowContent
                                    step={step}
                                    activeStep={activeStep}
                                />

                            </div>

                        </div>
                    </div>

                    {/* ========================= */}
                    {/* MOBILE WORKFLOW CONTENT    */}
                    {/* ========================= */}

                    <div
                        className="
                            sticky
                            top-[66px]
                            z-30
                            lg:hidden
                        "
                    >
                        <div
ref={mobileCardRef}
                            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
                        >
                            <WorkflowContent
                                step={step}
                                activeStep={activeStep}
                                mobile
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
function WorkflowContent({
    step,
    activeStep,
    mobile = false,
}) {
    return (
        <div
            className={`relative overflow-hidden bg-zinc-50 ${
                mobile
                    ? "min-h-[440px]"
                    : "min-h-[430px]"
            }`}
        >
            <AnimatePresence
                mode="wait"
                initial={false}
            >
                <motion.div
                    key={activeStep}
                    initial={{
                        opacity: 0,
                        y: 6,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: -6,
                    }}
                    transition={{
                        duration: 0.14,
                        ease: "linear",
                    }}
                    className={`flex h-full flex-col justify-center ${
                        mobile
        ? "px-4 pb-4 pt-5"
                            : "p-6 sm:p-8 lg:p-12"
                    }`}
                >
                    <div
                        className={
                            mobile
                                ? "w-full"
                                : "max-w-xl"
                        }
                    >
                        <div className="mb-3 flex items-center gap-3">
                            <span className="text-xs font-bold text-blue-600">
                                {step.number}
                            </span>

                            <div className="h-px w-6 bg-zinc-200" />

                            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                                {step.id}
                            </span>
                        </div>

                        <h3
                            className={`font-bold tracking-[-0.03em] text-zinc-950 ${
                                mobile
                                    ? "text-xl"
                                    : "text-2xl sm:text-3xl"
                            }`}
                        >
                            {step.title}
                        </h3>

                        <p
                            className={`font-medium leading-6 text-zinc-500 ${
                                mobile
                                    ? "mt-3 text-sm"
                                    : "mt-4 text-base leading-7"
                            }`}
                        >
                            {step.description}
                        </p>
                    </div>

                    <div
                        className={`overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm ${
                            mobile
                                ? "mt-5"
                                : "mt-8"
                        }`}
                    >
                        <WorkflowVisual step={step} />
                    </div>

                    {/* Progress */}

                    <div
                        className={`flex gap-1.5 ${
                            mobile
                                ? "mt-4"
                                : "mt-6"
                        }`}
                    >
                        {steps.map(
                            (
                                workflowStep,
                                index
                            ) => (
                                <div
                                    key={
                                        workflowStep.id
                                    }
                                    className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-200"
                                >
                                    <div
                                        className={`h-full rounded-full bg-blue-500 transition-[width] duration-150 ${
                                            activeStep >=
                                            index
                                                ? "w-full"
                                                : "w-0"
                                        }`}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function WorkflowNavigation({ activeStep }) {
    return (
        <div className="border-b border-zinc-200 lg:border-b-0 lg:border-r">
            <div className="p-5 sm:p-6">
                <div className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">
                    Workflow
                </div>

                <div className="space-y-1">
                    {steps.map((step, index) => {
                        const active =
                            activeStep === index;

                        return (
                            <div
                                key={step.id}
                                className={`relative flex items-center gap-4 rounded-xl px-4 py-3.5 transition-colors duration-150 ${
                                    active
                                        ? "bg-zinc-50"
                                        : ""
                                }`}
                            >
                                <div
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
                                        active
                                            ? "bg-zinc-950 text-white"
                                            : "bg-zinc-100 text-zinc-400"
                                    }`}
                                >
                                    {step.number}
                                </div>

                                <span
                                    className={`text-sm font-semibold tracking-[-0.02em] ${
                                        active
                                            ? "translate-x-1 text-zinc-950"
                                            : "text-zinc-400"
                                    }`}
                                >
                                    {step.title}
                                </span>

                                {active && (
                                    <motion.div
                                        layoutId="workflow-active"
                                        transition={{
                                            duration: 0.15,
                                            ease: "linear",
                                        }}
                                        className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-blue-500"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function WorkflowVisual({ step }) {
    switch (step.id) {
        case "search":
            return <SearchBusinessesAnimation />;

        case "analyze":
            return <AnalyzeBusinessesAnimation />;

        case "core":
            return <CoreAnalysisAnimation />;

      case "opportunity":
    return <FindOpportunityAnimation />;

        case "enrich":
            return <ClientSuccessAnimation />;

        default:
            return null;
    }
}

function SearchBusinessesAnimation() {
    const businesses = [
        ["Growth Studio", "Ahmedabad"],
        ["Creative Works", "Bodakdev"],
        ["Digital House", "Satellite"],
    ];

    return (
        <div className="relative min-h-[230px] overflow-hidden bg-zinc-50 px-4 py-5 sm:px-6">
            <div className="grid gap-2 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
                <SearchField
                    icon={<SearchIcon />}
                    text="Digital marketing agency"
                />

                <SearchField
                    icon={<LocationIcon />}
                    text="Ahmedabad"
                />

                <SearchField
                    text="Add areas"
                    prefix="+"
                />

                <div className="flex h-9 items-center justify-center rounded-lg bg-zinc-950 px-4 text-[10px] font-semibold text-white">
                    Search
                </div>
            </div>

            <motion.div
                initial={{
                    scaleX: 0,
                }}
                animate={{
                    scaleX: [0, 1, 1],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 1.1,
                    delay: 0.3,
                    times: [0, 0.7, 1],
                    ease: "linear",
                }}
                className="mt-1 h-px origin-left bg-blue-500"
            />

            <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
                        Businesses found
                    </span>

                    <span className="text-[9px] font-semibold text-blue-500">
                        248 results
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {businesses.map(
                        ([name, location], index) => (
                            <motion.div
                                key={name}
                                initial={{
                                    opacity: 0,
                                    y: 8,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.2,
                                    delay:
                                        0.8 +
                                        index * 0.1,
                                }}
                                className="rounded-lg border border-zinc-100 bg-white p-3 shadow-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-[9px] font-bold text-zinc-400">
                                        {name.charAt(
                                            0
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <div className="truncate text-[10px] font-semibold text-zinc-800">
                                            {name}
                                        </div>

                                        <div className="mt-0.5 truncate text-[8px] text-zinc-400">
                                            {location}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    )}
                </div>
            </div>

            <div className="absolute bottom-4 right-5 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[9px] font-semibold text-blue-600 shadow-sm">
                86 potential prospects
            </div>
        </div>
    );
}

function SearchField({ icon, text, prefix }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 6,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 shadow-sm"
        >
            {prefix ? (
                <span className="text-sm text-zinc-300">
                    {prefix}
                </span>
            ) : (
                icon
            )}

            <span className="truncate text-[10px] text-zinc-500">
                {text}
            </span>
        </motion.div>
    );
}

function AnalyzeBusinessesAnimation() {
    const items = [
        ["Website", "Detected", "◉"],
        ["Technology", "Scanning", "</>"],
        ["Performance", "Checking", "↗"],
        ["Mobile", "Checking", "▣"],
        ["Visibility", "Analyzing", "◎"],
    ];

    return (
        <div className="relative min-h-[250px] overflow-hidden bg-zinc-50 px-5 py-5 sm:px-7">
            <motion.div
                animate={{
                    opacity: [0.06, 0.14, 0.06],
                    scale: [1, 1.08, 1],
                }}
                transition={{
                    duration: 2.4,
                    repeat: Infinity,
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 blur-3xl"
            />

            <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-500 shadow-sm">
                        <ScanIcon />
                    </div>

                    <div>
                        <div className="text-[11px] font-bold text-zinc-800">
                            Digital Presence Analysis
                        </div>

                        <div className="mt-0.5 text-[8px] text-zinc-400">
                            FYNDREX analysis engine
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />

                    <span className="text-[8px] font-bold text-blue-500">
                        ANALYZING
                    </span>
                </div>
            </div>

            <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-zinc-200">
                <motion.div
                    initial={{
                        width: "0%",
                    }}
                    animate={{
                        width: "100%",
                    }}
                    transition={{
                        duration: 2.8,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    className="h-full rounded-full bg-blue-500"
                />
            </div>

            <div className="relative mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {items.map(
                    ([label, value, icon], index) => (
                        <motion.div
                            key={label}
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.2,
                                delay:
                                    index * 0.1,
                            }}
                            className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-3 shadow-sm"
                        >
                            <motion.div
                                initial={{
                                    x: "-120%",
                                }}
                                animate={{
                                    x: "120%",
                                }}
                                transition={{
                                    duration: 1.4,
                                    delay:
                                        0.4 +
                                        index *
                                            0.15,
                                    repeat: Infinity,
                                    repeatDelay: 2.2,
                                    ease: "linear",
                                }}
                                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-50 to-transparent"
                            />

                            <div className="relative flex items-center gap-2.5">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-50 text-[10px] font-bold text-blue-500">
                                    {icon}
                                </div>

                                <div className="min-w-0">
                                    <div className="text-[9px] font-semibold text-zinc-700">
                                        {label}
                                    </div>

                                    <div className="mt-0.5 text-[8px] font-medium text-blue-500">
                                        {value}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                )}
            </div>

            <div className="relative mt-4 flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />

                    <span className="text-[9px] font-semibold text-zinc-500">
                        Collecting structured signals
                    </span>
                </div>

                <span className="text-[9px] font-bold text-zinc-400">
                    AI-ready data
                </span>
            </div>

            <motion.div
                initial={{
                    y: "-100%",
                }}
                animate={{
                    y: "500%",
                }}
                transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.5,
                }}
                className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
            />
        </div>
    );
}

function CoreAnalysisAnimation() {
    const modules = [
        {
            title: "Website Analysis",
            description:
                "Structure, performance & technology",
            icon: "⌁",
            status: "Analyzed",
        },
        {
            title: "Digital Marketing",
            description:
                "Presence, channels & positioning",
            icon: "◈",
            status: "Analyzed",
        },
        {
            title: "AI Automation",
            description:
                "Automation & AI opportunities",
            icon: "✦",
            status: "Detected",
        },
        {
            title: "Security Analysis",
            description:
                "Security signals & vulnerabilities",
            icon: "◇",
            status: "Checked",
        },
        {
            title: "SEO Analysis",
            description:
                "Search visibility & optimization",
            icon: "◎",
            status: "Analyzed",
        },
        {
            title: "Performance",
            description:
                "Speed, responsiveness & UX",
            icon: "↗",
            status: "Measured",
        },
    ];

    return (
        <div className="relative min-h-[270px] overflow-hidden bg-zinc-50 px-5 py-5 sm:px-7">
            <motion.div
                animate={{
                    opacity: [0.05, 0.12, 0.05],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 blur-3xl"
            />

            <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-500 shadow-sm">
                        <CoreIcon />
                    </div>

                    <div>
                        <div className="text-[11px] font-bold text-zinc-800">
                            Core Analysis Engine
                        </div>

                        <div className="mt-0.5 text-[8px] text-zinc-400">
                            Converting signals into insights
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />

                    <span className="text-[8px] font-bold tracking-[0.08em] text-blue-500">
                        PROCESSING
                    </span>
                </div>
            </div>

            <div className="relative mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {modules.map((module, index) => (
                    <motion.div
                        key={module.title}
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            delay: index * 0.08,
                        }}
                        className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-3 shadow-sm"
                    >
                        <motion.div
                            initial={{
                                x: "-150%",
                            }}
                            animate={{
                                x: "250%",
                            }}
                            transition={{
                                duration: 1.2,
                                delay:
                                    0.5 +
                                    index * 0.12,
                                repeat: Infinity,
                                repeatDelay: 2.8,
                                ease: "linear",
                            }}
                            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-50 to-transparent"
                        />

                        <div className="relative">
                            <div className="flex items-start justify-between">
                                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-50 text-[11px] font-bold text-blue-500">
                                    {module.icon}
                                </div>

                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                            </div>

                            <div className="mt-2">
                                <div className="truncate text-[9px] font-bold text-zinc-800">
                                    {module.title}
                                </div>

                                <div className="mt-0.5 truncate text-[7px] leading-3 text-zinc-400">
                                    {module.description}
                                </div>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-[7px] font-semibold uppercase tracking-[0.06em] text-zinc-400">
                                    {module.status}
                                </span>

                                <span className="text-[8px] font-bold text-emerald-500">
                                    ✓
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="relative mt-4 flex items-center justify-between rounded-xl border border-blue-100 bg-white px-3 py-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50">
                        <span className="text-[10px] font-bold text-blue-500">
                            FX
                        </span>
                    </div>

                    <div>
                        <div className="text-[8px] font-bold text-zinc-700">
                            Multi-dimensional analysis
                        </div>

                        <div className="text-[7px] text-zinc-400">
                            Signals combined into structured
                            insights
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    <span className="text-[7px] font-bold text-emerald-600">
                        6 MODULES
                    </span>
                </div>
            </div>

            <motion.div
                initial={{
                    y: "-100%",
                }}
                animate={{
                    y: "500%",
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.6,
                }}
                className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.65)]"
            />
        </div>
    );
}

function FindOpportunityAnimation() {
    const signals = [
        {
            title: "SEO",
            value: "Weak visibility",
        },
        {
            title: "Website",
            value: "Optimization needed",
        },
        {
            title: "Automation",
            value: "Opportunity detected",
        },
    ];

    return (
        <div className="relative min-h-[270px] overflow-hidden bg-zinc-50 px-5 py-5 sm:px-7">
            {/* Background glow */}

            <motion.div
                animate={{
                    opacity: [0.04, 0.12, 0.04],
                    scale: [1, 1.08, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 blur-3xl"
            />

            {/* Header */}

            <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-500 shadow-sm"
                    >
                        <OpportunityIcon />
                    </motion.div>

                    <div>
                        <div className="text-[11px] font-bold text-zinc-800">
                            Opportunity Engine
                        </div>

                        <div className="mt-0.5 text-[8px] text-zinc-400">
                            Turning analysis into opportunities
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1.5">
                    <motion.span
                        animate={{
                            opacity: [0.35, 1, 0.35],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-blue-500"
                    />

                    <span className="text-[8px] font-bold tracking-[0.08em] text-blue-500">
                        DETECTING
                    </span>
                </div>
            </div>

            {/* Signal cards */}

            <div className="relative mt-5 grid grid-cols-3 gap-2">
                {signals.map((signal, index) => (
                    <motion.div
                        key={signal.title}
                        initial={{
                            opacity: 0,
                            y: 8,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            delay: index * 0.1,
                        }}
                        className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-3 shadow-sm"
                    >
                        <motion.div
                            initial={{
                                x: "-120%",
                            }}
                            animate={{
                                x: "120%",
                            }}
                            transition={{
                                duration: 1.2,
                                delay:
                                    0.4 +
                                    index * 0.2,
                                repeat: Infinity,
                                repeatDelay: 2.5,
                                ease: "linear",
                            }}
                            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-50 to-transparent"
                        />

                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold text-zinc-700">
                                    {signal.title}
                                </span>

                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            </div>

                            <div className="mt-1.5 text-[7px] leading-3 text-zinc-400">
                                {signal.value}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Connecting analysis */}

            <div className="relative mt-4 flex items-center justify-center">
                <div className="absolute left-[16%] right-[16%] top-1/2 h-px bg-zinc-200" />

                <motion.div
                    animate={{
                        x: [
                            "-180%",
                            "180%",
                        ],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                />

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 0.25,
                        delay: 0.45,
                    }}
                    className="relative z-10 flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 shadow-sm"
                >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[9px] font-bold text-blue-500">
                        FX
                    </span>

                    <span className="text-[8px] font-bold text-zinc-600">
                        Opportunity Detection
                    </span>
                </motion.div>
            </div>

            {/* Detected problems */}

            <div className="relative mt-4 grid grid-cols-2 gap-2">
                <motion.div
                    initial={{
                        opacity: 0,
                        x: -8,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.2,
                        delay: 0.65,
                    }}
                    className="rounded-xl border border-amber-100 bg-amber-50/60 px-3 py-2.5"
                >
                    <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[9px] text-amber-600">
                            !
                        </span>

                        <div>
                            <div className="text-[8px] font-bold text-amber-700">
                                Problems detected
                            </div>

                            <div className="mt-0.5 text-[7px] text-amber-600">
                                3 service opportunities
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{
                        opacity: 0,
                        x: 8,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.2,
                        delay: 0.8,
                    }}
                    className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2.5"
                >
                    <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-600">
                            ✓
                        </span>

                        <div>
                            <div className="text-[8px] font-bold text-emerald-700">
                                Opportunity found
                            </div>

                            <div className="mt-0.5 text-[7px] text-emerald-600">
                                High potential
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Recommended service */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 8,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.25,
                    delay: 1,
                }}
                className="relative mt-3 flex items-center justify-between rounded-xl border border-blue-100 bg-white px-3 py-2.5 shadow-sm"
            >
                <div>
                    <div className="text-[7px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
                        Recommended opportunity
                    </div>

                    <div className="mt-0.5 text-[10px] font-bold text-zinc-800">
                        SEO + Website Optimization
                    </div>
                </div>

                <div className="rounded-full bg-blue-50 px-2.5 py-1">
                    <span className="text-[7px] font-bold text-blue-600">
                        HIGH POTENTIAL
                    </span>
                </div>
            </motion.div>

            {/* Scanning beam */}

            <motion.div
                initial={{
                    y: "-100%",
                }}
                animate={{
                    y: "500%",
                }}
                transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.5,
                }}
                className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.6)]"
            />
        </div>
    );
}

function ProductImage({ src, alt }) {
    return (
        <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden bg-zinc-50 sm:min-h-[210px]">
            <motion.img
                src={src}
                alt={alt}
                initial={{
                    opacity: 0,
                    scale: 0.97,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    duration: 0.25,
                    ease: "linear",
                }}
                className="h-auto max-h-[280px] w-full object-contain"
            />
        </div>
    );
}

function ClientSuccessAnimation() {
    return (
        <div className="relative flex min-h-[210px] items-center justify-center overflow-hidden bg-zinc-50 px-5 sm:min-h-[230px]">
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                }}
                className="absolute h-40 w-40 rounded-full bg-blue-400 blur-3xl"
            />

            <div className="relative flex w-full max-w-md items-center justify-between">
                <LeadNode />

                <Connection color="blue" />

                <div className="flex flex-col items-center">
                    <motion.div
                        animate={{
                            y: [0, -3, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 text-xs font-bold text-white shadow-lg"
                    >
                        FX
                    </motion.div>

                    <span className="mt-2 text-[10px] font-semibold text-zinc-500">
                        FYNDREX
                    </span>
                </div>

                <Connection
                    color="emerald"
                />

                <div className="flex flex-col items-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.04, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-lg shadow-sm"
                    >
                        😊
                    </motion.div>

                    <span className="mt-2 text-[10px] font-semibold text-zinc-500">
                        Happy Client
                    </span>
                </div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-[9px] font-semibold text-emerald-600 shadow-sm">
                Opportunity → Client
            </div>
        </div>
    );
}

function LeadNode() {
    return (
        <div className="flex flex-col items-center">
            <motion.div
                animate={{
                    x: [0, 5, 0],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-lg shadow-sm"
            >
                👤
            </motion.div>

            <span className="mt-2 text-[10px] font-semibold text-zinc-500">
                Lead
            </span>
        </div>
    );
}

function Connection({ color }) {
    const dotClass =
        color === "emerald"
            ? "bg-emerald-500"
            : "bg-blue-500";

    return (
        <div className="relative mx-4 h-px flex-1 bg-zinc-200">
            <motion.div
                animate={{
                    left: ["0%", "100%"],
                }}
                transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full ${dotClass}`}
            />
        </div>
    );
}

function SearchIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0 text-zinc-400"
        >
            <circle
                cx="11"
                cy="11"
                r="7"
            />
            <path d="m20 20-4-4" />
        </svg>
    );
}

function LocationIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0 text-zinc-400"
        >
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle
                cx="12"
                cy="10"
                r="2.5"
            />
        </svg>
    );
}

function ScanIcon() {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
            <path d="M7 12h10" />
            <path d="M9 9v6" />
            <path d="M12 7v10" />
            <path d="M15 9v6" />
        </svg>
    );
}

function CoreIcon() {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
        >
            <circle
                cx="12"
                cy="12"
                r="8"
            />

            <circle
                cx="12"
                cy="12"
                r="3"
            />

            <path d="M12 4v5" />
            <path d="M20 12h-5" />
            <path d="M12 20v-5" />
            <path d="M4 12h5" />
        </svg>
    );
}function OpportunityIcon() {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
        >
            <path d="M12 3v18" />
            <path d="M3 12h18" />

            <circle
                cx="12"
                cy="12"
                r="8"
            />

            <path d="m8.5 15.5 3.5-7 3.5 7" />
        </svg>
    );
}

export default ProductWorkflow; 