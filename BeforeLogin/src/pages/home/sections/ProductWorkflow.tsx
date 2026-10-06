import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ============================================================
   WORKFLOW DATA
============================================================ */

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

const headlineTracks = [
    {
        text: [
            "FIND BUSINESSES",
            "ANALYZE SIGNALS",
            "EXPOSE GAPS",
            "FIND OPPORTUNITIES",
        ],
        duration: 32,
    },
    {
        text: [
            "WEAK SEO",
            "OUTDATED WEBSITE",
            "LOW VISIBILITY",
            "MISSED LEADS",
            "AUTOMATION GAP",
            "COMPETITOR GAP",
        ],
        duration: 38,
    },
    {
        text: [
            "SEARCH",
            "ANALYZE",
            "UNDERSTAND",
            "OPPORTUNITY",
            "ENRICH",
        ],
        duration: 28,
    },
];


/* ============================================================
   SHARED ANIMATION CONFIG
============================================================ */

const fadeUp = {
    initial: {
        opacity: 0,
        y: 8,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
};

const scanTransition = {
    duration: 2.4,
    repeat: Infinity,
    ease: "linear",
};

const springEase = [0.22, 1, 0.36, 1];


/* ============================================================
   REUSABLE SHIMMER
============================================================ */

function Shimmer({
    duration = 1.4,
    delay = 0.4,
    repeatDelay = 2.2,
}) {
    return (
        <motion.div
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatDelay,
                ease: "linear",
            }}
            className="
                pointer-events-none
                absolute inset-y-0
                w-1/3
                bg-gradient-to-r
                from-transparent
                via-blue-50
                to-transparent
            "
        />
    );
}


/* ============================================================
   REUSABLE SCANNING BEAM
============================================================ */

function ScanningBeam({
    duration = 2.4,
    delay = 0.5,
    shadow = "shadow-[0_0_14px_rgba(59,130,246,0.6)]",
}) {
    return (
        <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "500%" }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 0.5,
            }}
            className={`
                pointer-events-none
                absolute left-0 right-0 top-0
                h-px bg-blue-400 ${shadow}
            `}
        />
    );
}


/* ============================================================
   PRODUCT WORKFLOW
============================================================ */

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
                : desktopCardRef.current;

        const capsule = capsuleRef.current;

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

                const capsuleHeight = isMobile
                    ? capsule?.getBoundingClientRect().height || 0
                    : 0;

                const stickyOffset = isMobile
                    ? capsuleHeight
                    : window.innerHeight * 0.15;

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
                        Math.floor(
                            progress * steps.length
                        )
                    )
                );

                setActiveStep(index);
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
        <section
            className="
                border-t border-zinc-200
                bg-white
                transition-colors duration-300
                dark:border-zinc-800
                dark:bg-[#08090d]
            "
        >
            <WorkflowHeader />

            {/* Scroll-driven workflow */}
            <div
                ref={workflowRef}
                className="
                    relative mx-auto max-w-[1440px]
                    px-4 pb-16
                    sm:px-10 sm:pb-24
                    lg:px-16 lg:pb-28
                "
            >
                <div className="relative min-h-[1900px] lg:min-h-[1800px]">

                    {/* Mobile navigation */}
                    <MobileWorkflowNav
                        capsuleRef={capsuleRef}
                        activeStep={activeStep}
                    />

                    {/* Desktop workflow */}
                    <div
                        ref={desktopCardRef}
                        className="
                            hidden
                            lg:sticky lg:top-[15vh]
                            lg:block
                        "
                    >
                        <div
                            className="
                                overflow-hidden rounded-2xl
                                border border-zinc-200
                                bg-white shadow-sm
                                transition-colors duration-300
                                dark:border-zinc-800
                                dark:bg-[#111318]
                            "
                        >
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

                    {/* Mobile workflow */}
                    <div
                        className="
                            sticky top-[66px]
                            z-30 lg:hidden
                        "
                    >
                        <div
                            ref={mobileCardRef}
                            className="
                                overflow-hidden rounded-2xl
                                border border-zinc-200
                                bg-white shadow-sm
                                dark:border-zinc-700
                                dark:bg-zinc-900
                            "
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


/* ============================================================
   EDITORIAL HEADER
============================================================ */

function WorkflowHeader() {
    return (
        <div
            className="
                relative overflow-hidden
                border-b border-zinc-200
                bg-white pt-20
                dark:border-zinc-800
                dark:bg-[#08090d]
                sm:pt-24 lg:pt-28
            "
        >
            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                    once: true,
                    amount: 0.5,
                }}
                transition={{ duration: 0.5 }}
                className="
                    relative z-20
                    mx-auto max-w-[1440px]
                    px-6 pb-8
                    sm:px-10 lg:px-16
                "
            >
                <div
                    className="
                        flex items-center gap-2
                        text-[10px] font-bold
                        uppercase tracking-[0.2em]
                        text-blue-500
                    "
                >
                    <span
                        className="
                            h-1.5 w-1.5
                            animate-pulse
                            rounded-full
                            bg-blue-500
                            shadow-[0_0_10px_rgba(59,130,246,0.7)]
                        "
                    />

                    FYNDREX / OPPORTUNITY ENGINE
                </div>
            </motion.div>

            {/* Main statement */}
            <div
                className="
                    relative z-20
                    mx-auto max-w-[1440px]
                    px-6 pb-16
                    sm:px-10 sm:pb-20
                    lg:px-16
                "
            >
                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{
                        once: true,
                        amount: 0.4,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: springEase,
                    }}
                    className="
                        max-w-4xl
                        text-[42px] font-semibold
                        uppercase leading-[0.94]
                        tracking-[-0.06em]
                        text-zinc-950
                        dark:text-white
                        sm:text-6xl
                        lg:text-[76px]
                    "
                >
                    Don't search for leads.
                    <br />

                    <span className="text-zinc-900 dark:text-zinc-400">
                        Find the reason to contact them.
                    </span>
                </motion.h2>
            </div>

            <HeadlineStream />
        </div>
    );
}


/* ============================================================
   MOVING HEADLINE STREAM
============================================================ */

function HeadlineStream() {
    return (
        <div className="relative pb-8">
            {headlineTracks.map((track, trackIndex) => (
                <div
                    key={trackIndex}
                    className="
                        relative overflow-hidden
                        border-t border-zinc-200
                        dark:border-zinc-800
                    "
                >
                    {/* Edge fades */}
                    <div
                        className="
                            pointer-events-none
                            absolute inset-y-0 left-0
                            z-20 w-20
                            bg-gradient-to-r
                            from-white to-transparent
                            dark:from-[#08090d]
                            sm:w-36
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute inset-y-0 right-0
                            z-20 w-20
                            bg-gradient-to-l
                            from-white to-transparent
                            dark:from-[#08090d]
                            sm:w-36
                        "
                    />

                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: track.duration,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="
                            flex w-max
                            items-center py-5
                            sm:py-6
                        "
                    >
                        {[
                            ...track.text,
                            ...track.text,
                            ...track.text,
                        ].map((text, index) => (
                            <div
                                key={`${text}-${index}`}
                                className="flex items-center"
                            >
                                <span
                                    className={`
                                        whitespace-nowrap
                                        px-5
                                        text-[34px]
                                        font-semibold
                                        uppercase
                                        leading-none
                                        tracking-[-0.055em]
                                        sm:px-7 sm:text-5xl
                                        lg:px-10 lg:text-[64px]
                                        ${
                                            trackIndex === 0
                                                ? "text-zinc-900 dark:text-zinc-100"
                                                : trackIndex === 1
                                                  ? "text-transparent [-webkit-text-stroke:1px_#a1a1aa] dark:[-webkit-text-stroke:1px_#52525b]"
                                                  : "text-blue-500 dark:text-blue-400"
                                        }
                                    `}
                                >
                                    {text}
                                </span>

                                <span
                                    className="
                                        h-2 w-2 shrink-0
                                        rounded-full
                                        bg-zinc-300
                                        dark:bg-zinc-700
                                        sm:h-2.5 sm:w-2.5
                                    "
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            ))}

            {/* Caption */}
            <div
                className="
                    mx-auto flex max-w-[1440px]
                    items-center justify-between
                    px-6 pt-6
                    sm:px-10 lg:px-16
                "
            >
                <span
                    className="
                        text-[9px] font-semibold
                        uppercase tracking-[0.18em]
                        text-zinc-400
                    "
                >
                    From discovery to opportunity
                </span>

                <span
                    className="
                        text-[9px] font-semibold
                        uppercase tracking-[0.18em]
                        text-zinc-400
                    "
                >
                    01 — 05
                </span>
            </div>
        </div>
    );
}


/* ============================================================
   MOBILE WORKFLOW NAVIGATION
============================================================ */

function MobileWorkflowNav({
    capsuleRef,
    activeStep,
}) {
    return (
        <div
            ref={capsuleRef}
            className="
                sticky top-0 z-50
                -mx-4
                bg-white/95
                px-4 pb-3 pt-3
                backdrop-blur-md
                dark:bg-[#08090d]/95
                lg:hidden
            "
        >
            <div
                className="
                    rounded-full border
                    border-zinc-200
                    bg-zinc-50 p-1
                    shadow-sm
                    dark:border-zinc-700
                    dark:bg-zinc-900
                "
            >
                <div
                    className="
                        flex min-h-[42px]
                        items-center gap-1
                        overflow-x-auto
                        overscroll-x-contain
                        scrollbar-hide
                    "
                    style={{
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    {steps.map((step, index) => {
                        const active =
                            activeStep === index;

                        return (
                            <div
                                key={step.id}
                                className={`
                                    flex min-w-max
                                    shrink-0 items-center gap-1.5
                                    rounded-full px-3 py-1.5
                                    transition-colors duration-150
                                    ${
                                        active
                                            ? "bg-zinc-950 text-white shadow-sm"
                                            : "text-zinc-400"
                                    }
                                `}
                            >
                                <span
                                    className={`
                                        flex h-6 w-6 shrink-0
                                        items-center justify-center
                                        rounded-full text-[9px] font-bold
                                        ${
                                            active
                                                ? "bg-white/15 text-white"
                                                : "bg-zinc-200 text-zinc-500"
                                        }
                                    `}
                                >
                                    {step.number}
                                </span>

                                <span className="whitespace-nowrap text-[10px] font-semibold">
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}


/* ============================================================
   WORKFLOW CONTENT
============================================================ */

function WorkflowContent({
    step,
    activeStep,
    mobile = false,
}) {
    return (
        <div
            className={`
                relative overflow-hidden
                bg-zinc-50
                transition-colors duration-300
                dark:bg-[#111318]
                ${
                    mobile
                        ? "min-h-[440px]"
                        : "min-h-[430px]"
                }
            `}
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
                        duration: 0.45,
                        ease: springEase,
                    }}
                    className={`
                        flex h-full
                        flex-col justify-center
                        ${
                            mobile
                                ? "px-4 pb-4 pt-5"
                                : "p-6 sm:p-8 lg:p-12"
                        }
                    `}
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

                            <span
                                className="
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.12em]
                                    text-zinc-400
                                "
                            >
                                {step.id}
                            </span>
                        </div>

                        <h3
                            className={`
                                font-bold
                                tracking-[-0.03em]
                                text-zinc-950
                                dark:text-white
                                ${
                                    mobile
                                        ? "text-xl"
                                        : "text-2xl sm:text-3xl"
                                }
                            `}
                        >
                            {step.title}
                        </h3>

                        <p
                            className={`
                                font-medium
                                text-zinc-500
                                ${
                                    mobile
                                        ? "mt-3 text-sm leading-6"
                                        : "mt-4 text-base leading-7"
                                }
                            `}
                        >
                            {step.description}
                        </p>
                    </div>

                    {/* Workflow visual */}
                    <div
                        className={`
                            overflow-hidden
                            rounded-xl
                            border border-zinc-200
                            bg-white shadow-sm
                            dark:border-zinc-700
                            dark:bg-zinc-900
                            ${
                                mobile
                                    ? "mt-5"
                                    : "mt-8"
                            }
                        `}
                    >
                        <WorkflowVisual step={step} />
                    </div>

                    {/* Progress */}
                    <div
                        className={`
                            flex gap-1.5
                            ${
                                mobile
                                    ? "mt-4"
                                    : "mt-6"
                            }
                        `}
                    >
                        {steps.map(
                            (workflowStep, index) => (
                                <div
                                    key={workflowStep.id}
                                    className="
                                        h-1 flex-1
                                        overflow-hidden
                                        rounded-full
                                        bg-zinc-200
                                    "
                                >
                                    <div
                                        className={`
                                            h-full rounded-full
                                            bg-blue-500
                                            transition-[width]
                                            duration-150
                                            ${
                                                activeStep >=
                                                index
                                                    ? "w-full"
                                                    : "w-0"
                                            }
                                        `}
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


/* ============================================================
   DESKTOP WORKFLOW NAVIGATION
============================================================ */

function WorkflowNavigation({ activeStep }) {
    return (
        <div className="border-b border-zinc-200 lg:border-b-0 lg:border-r">
            <div className="p-5 sm:p-6">
                <div
                    className="
                        mb-5 text-xs font-semibold
                        uppercase tracking-[0.12em]
                        text-zinc-400
                    "
                >
                    Workflow
                </div>

                <div className="space-y-1">
                    {steps.map((step, index) => {
                        const active =
                            activeStep === index;

                        return (
                            <div
                                key={step.id}
                                className={`
                                    relative flex items-center
                                    gap-4 rounded-xl
                                    px-4 py-3.5
                                    transition-colors duration-150
                                    ${
                                        active
                                            ? "bg-zinc-50 dark:bg-zinc-900"
                                            : ""
                                    }
                                `}
                            >
                                <div
                                    className={`
                                        flex h-8 w-8
                                        shrink-0 items-center
                                        justify-center
                                        rounded-lg
                                        text-[10px] font-bold
                                        ${
                                            active
                                                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                                                : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                                        }
                                    `}
                                >
                                    {step.number}
                                </div>

                                <span
                                    className={`
                                        text-sm font-semibold
                                        tracking-[-0.02em]
                                        ${
                                            active
                                                ? "translate-x-1 text-zinc-950 dark:text-white"
                                                : "text-zinc-400 dark:text-zinc-500"
                                        }
                                    `}
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
                                        className="
                                            absolute bottom-2
                                            left-0 top-2
                                            w-0.5 rounded-full
                                            bg-blue-500
                                        "
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


/* ============================================================
   WORKFLOW VISUAL ROUTER
============================================================ */

function WorkflowVisual({ step }) {
    const visuals = {
        search: <SearchBusinessesAnimation />,
        analyze: <AnalyzeBusinessesAnimation />,
        core: <CoreAnalysisAnimation />,
        opportunity: <FindOpportunityAnimation />,
        enrich: <ClientSuccessAnimation />,
    };

    return visuals[step.id] || null;
}


/* ============================================================
   STEP 01 — SEARCH BUSINESSES
============================================================ */

function SearchBusinessesAnimation() {
    const businesses = [
        ["Growth Studio", "Ahmedabad"],
        ["Creative Works", "Bodakdev"],
        ["Digital House", "Satellite"],
    ];

    return (
        <div
            className="
                relative min-h-[230px]
                overflow-hidden
                bg-zinc-50
                px-4 py-5
                sm:px-6
            "
        >
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

                <div
                    className="
                        flex h-9 items-center
                        justify-center rounded-lg
                        bg-zinc-950 px-4
                        text-[10px] font-semibold
                        text-white
                    "
                >
                    Search
                </div>
            </div>

            <motion.div
                initial={{ scaleX: 0 }}
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
                className="
                    mt-1 h-px
                    origin-left bg-blue-500
                "
            />

            <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                    <span
                        className="
                            text-[9px] font-semibold
                            uppercase tracking-[0.1em]
                            text-zinc-400
                        "
                    >
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
                                {...fadeUp}
                                transition={{
                                    duration: 0.2,
                                    delay:
                                        0.8 +
                                        index * 0.1,
                                }}
                                className="
                                    rounded-lg
                                    border border-zinc-100
                                    bg-white p-3
                                    shadow-sm
                                "
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className="
                                            flex h-7 w-7
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-md
                                            bg-zinc-100
                                            text-[9px]
                                            font-bold
                                            text-zinc-400
                                        "
                                    >
                                        {name.charAt(0)}
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

            <div
                className="
                    absolute bottom-4 right-5
                    rounded-full
                    border border-blue-100
                    bg-white px-3 py-1.5
                    text-[9px] font-semibold
                    text-blue-600 shadow-sm
                "
            >
                86 potential prospects
            </div>
        </div>
    );
}


/* ============================================================
   SEARCH FIELD
============================================================ */

function SearchField({ icon, text, prefix }) {
    return (
        <motion.div
            {...fadeUp}
            className="
                flex h-9 items-center gap-2
                rounded-lg
                border border-zinc-200
                bg-white px-3
                shadow-sm
            "
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


/* ============================================================
   STEP 02 — ANALYZE BUSINESSES
============================================================ */

function AnalyzeBusinessesAnimation() {
    const items = [
        ["Website", "Detected", "◉"],
        ["Technology", "Scanning", "</>"],
        ["Performance", "Checking", "↗"],
        ["Mobile", "Checking", "▣"],
        ["Visibility", "Analyzing", "◎"],
    ];

    return (
        <div
            className="
                relative min-h-[250px]
                overflow-hidden
                bg-zinc-50 px-5 py-5
                sm:px-7
            "
        >
            <PulseGlow size="h-48 w-48" />

            <AnalysisHeader
                icon={<ScanIcon />}
                title="Digital Presence Analysis"
                subtitle="FYNDREX analysis engine"
                status="ANALYZING"
            />

            <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-zinc-200">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="
                        h-full rounded-full
                        bg-blue-500
                    "
                />
            </div>

            <div className="relative mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {items.map(
                    ([label, value, icon], index) => (
                        <motion.div
                            key={label}
                            {...fadeUp}
                            transition={{
                                duration: 0.2,
                                delay: index * 0.1,
                            }}
                            className="
                                relative overflow-hidden
                                rounded-xl
                                border border-zinc-200
                                bg-white p-3
                                shadow-sm
                            "
                        >
                            <Shimmer
                                delay={
                                    0.4 +
                                    index * 0.15
                                }
                                repeatDelay={2.2}
                            />

                            <div className="relative flex items-center gap-2.5">
                                <div
                                    className="
                                        flex h-7 w-7
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-zinc-50
                                        text-[10px]
                                        font-bold
                                        text-blue-500
                                    "
                                >
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

            <div
                className="
                    relative mt-4 flex
                    items-center justify-between
                    rounded-xl
                    border border-zinc-200
                    bg-white px-3 py-2.5
                    shadow-sm
                "
            >
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

            <ScanningBeam duration={2.2} />
        </div>
    );
}


/* ============================================================
   STEP 03 — CORE ANALYSIS
============================================================ */

function CoreAnalysisAnimation() {
    const modules = [
        [
            "Website Analysis",
            "Structure, performance & technology",
            "⌁",
            "Analyzed",
        ],
        [
            "Digital Marketing",
            "Presence, channels & positioning",
            "◈",
            "Analyzed",
        ],
        [
            "AI Automation",
            "Automation & AI opportunities",
            "✦",
            "Detected",
        ],
        [
            "Security Analysis",
            "Security signals & vulnerabilities",
            "◇",
            "Checked",
        ],
        [
            "SEO Analysis",
            "Search visibility & optimization",
            "◎",
            "Analyzed",
        ],
        [
            "Performance",
            "Speed, responsiveness & UX",
            "↗",
            "Measured",
        ],
    ];

    return (
        <div
            className="
                relative min-h-[270px]
                overflow-hidden
                bg-zinc-50 px-5 py-5
                sm:px-7
            "
        >
            <PulseGlow size="h-64 w-64" />

            <AnalysisHeader
                icon={<CoreIcon />}
                title="Core Analysis Engine"
                subtitle="Converting signals into insights"
                status="PROCESSING"
            />

            <div className="relative mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {modules.map(
                    (
                        [
                            title,
                            description,
                            icon,
                            status,
                        ],
                        index
                    ) => (
                        <motion.div
                            key={title}
                            {...fadeUp}
                            transition={{
                                duration: 0.2,
                                delay: index * 0.08,
                            }}
                            className="
                                relative overflow-hidden
                                rounded-xl
                                border border-zinc-200
                                bg-white p-3
                                shadow-sm
                            "
                        >
                            <Shimmer
                                duration={1.2}
                                delay={
                                    0.5 +
                                    index * 0.12
                                }
                                repeatDelay={2.8}
                            />

                            <div className="relative">
                                <div className="flex items-start justify-between">
                                    <div
                                        className="
                                            flex h-7 w-7
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-zinc-50
                                            text-[11px]
                                            font-bold
                                            text-blue-500
                                        "
                                    >
                                        {icon}
                                    </div>

                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                </div>

                                <div className="mt-2">
                                    <div className="truncate text-[9px] font-bold text-zinc-800">
                                        {title}
                                    </div>

                                    <div className="mt-0.5 truncate text-[7px] leading-3 text-zinc-400">
                                        {description}
                                    </div>
                                </div>

                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-[7px] font-semibold uppercase tracking-[0.06em] text-zinc-400">
                                        {status}
                                    </span>

                                    <span className="text-[8px] font-bold text-emerald-500">
                                        ✓
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )
                )}
            </div>

            <div
                className="
                    relative mt-4 flex
                    items-center justify-between
                    rounded-xl
                    border border-blue-100
                    bg-white px-3 py-2.5
                    shadow-sm
                "
            >
                <div className="flex items-center gap-2">
                    <div
                        className="
                            flex h-6 w-6
                            items-center justify-center
                            rounded-lg bg-blue-50
                        "
                    >
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

                <div
                    className="
                        flex items-center gap-1.5
                        rounded-full
                        bg-emerald-50 px-2 py-1
                    "
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    <span className="text-[7px] font-bold text-emerald-600">
                        6 MODULES
                    </span>
                </div>
            </div>

            <ScanningBeam duration={2.5} />
        </div>
    );
}


/* ============================================================
   STEP 04 — FIND OPPORTUNITY
============================================================ */

function FindOpportunityAnimation() {
    const signals = [
        ["SEO", "Weak visibility"],
        ["Website", "Optimization needed"],
        ["Automation", "Opportunity detected"],
    ];

    return (
        <div
            className="
                relative min-h-[270px]
                overflow-hidden
                bg-zinc-50 px-5 py-5
                sm:px-7
            "
        >
            <PulseGlow size="h-64 w-64" />

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
                        className="
                            flex h-9 w-9
                            items-center justify-center
                            rounded-xl
                            border border-blue-100
                            bg-white
                            text-blue-500
                            shadow-sm
                        "
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
                        className="
                            h-1.5 w-1.5
                            rounded-full
                            bg-blue-500
                        "
                    />

                    <span
                        className="
                            text-[8px] font-bold
                            tracking-[0.08em]
                            text-blue-500
                        "
                    >
                        DETECTING
                    </span>
                </div>
            </div>

            {/* Signal cards */}
            <div className="relative mt-5 grid grid-cols-3 gap-2">
                {signals.map(
                    ([title, value], index) => (
                        <motion.div
                            key={title}
                            {...fadeUp}
                            transition={{
                                duration: 0.2,
                                delay: index * 0.1,
                            }}
                            className="
                                relative overflow-hidden
                                rounded-xl
                                border border-zinc-200
                                bg-white p-3
                                shadow-sm
                            "
                        >
                            <Shimmer
                                duration={1.2}
                                delay={
                                    0.4 +
                                    index * 0.2
                                }
                                repeatDelay={2.5}
                            />

                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-zinc-700">
                                        {title}
                                    </span>

                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                </div>

                                <div className="mt-1.5 text-[7px] leading-3 text-zinc-400">
                                    {value}
                                </div>
                            </div>
                        </motion.div>
                    )
                )}
            </div>

            {/* Connecting analysis */}
            <div className="relative mt-4 flex items-center justify-center">
                <div
                    className="
                        absolute left-[16%] right-[16%]
                        top-1/2 h-px bg-zinc-200
                    "
                />

                <motion.div
                    animate={{
                        x: ["-180%", "180%"],
                    }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="
                        absolute h-1.5 w-1.5
                        rounded-full bg-blue-500
                        shadow-[0_0_8px_rgba(59,130,246,0.6)]
                    "
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
                    className="
                        relative z-10
                        flex items-center gap-2
                        rounded-full
                        border border-blue-100
                        bg-white px-3 py-1.5
                        shadow-sm
                    "
                >
                    <span
                        className="
                            flex h-5 w-5
                            items-center justify-center
                            rounded-full bg-blue-50
                            text-[9px] font-bold
                            text-blue-500
                        "
                    >
                        FX
                    </span>

                    <span className="text-[8px] font-bold text-zinc-600">
                        Opportunity Detection
                    </span>
                </motion.div>
            </div>

            {/* Detected problems */}
            <div className="relative mt-4 grid grid-cols-2 gap-2">
                <OpportunityStatus
                    type="warning"
                    title="Problems detected"
                    description="3 service opportunities"
                    delay={0.65}
                />

                <OpportunityStatus
                    type="success"
                    title="Opportunity found"
                    description="High potential"
                    delay={0.8}
                />
            </div>

            {/* Recommended service */}
            <motion.div
                {...fadeUp}
                transition={{
                    duration: 0.25,
                    delay: 1,
                }}
                className="
                    relative mt-3 flex
                    items-center justify-between
                    rounded-xl
                    border border-blue-100
                    bg-white px-3 py-2.5
                    shadow-sm
                "
            >
                <div>
                    <div
                        className="
                            text-[7px] font-semibold
                            uppercase tracking-[0.08em]
                            text-zinc-400
                        "
                    >
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

            <ScanningBeam />
        </div>
    );
}


/* ============================================================
   OPPORTUNITY STATUS
============================================================ */

function OpportunityStatus({
    type,
    title,
    description,
    delay,
}) {
    const warning = type === "warning";

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: warning ? -8 : 8,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            transition={{
                duration: 0.2,
                delay,
            }}
            className={
                warning
                    ? "rounded-xl border border-amber-100 bg-amber-50/60 px-3 py-2.5"
                    : "rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2.5"
            }
        >
            <div className="flex items-center gap-2">
                <span
                    className={
                        warning
                            ? "flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[9px] text-amber-600"
                            : "flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-600"
                    }
                >
                    {warning ? "!" : "✓"}
                </span>

                <div>
                    <div
                        className={
                            warning
                                ? "text-[8px] font-bold text-amber-700"
                                : "text-[8px] font-bold text-emerald-700"
                        }
                    >
                        {title}
                    </div>

                    <div
                        className={
                            warning
                                ? "mt-0.5 text-[7px] text-amber-600"
                                : "mt-0.5 text-[7px] text-emerald-600"
                        }
                    >
                        {description}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


/* ============================================================
   STEP 05 — ENRICH LEAD
============================================================ */

function ClientSuccessAnimation() {
    return (
        <div
            className="
                relative flex min-h-[210px]
                items-center justify-center
                overflow-hidden
                bg-zinc-50 px-5
                sm:min-h-[230px]
            "
        >
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                }}
                className="
                    absolute h-40 w-40
                    rounded-full
                    bg-blue-400 blur-3xl
                "
            />

            <div
                className="
                    relative flex w-full
                    max-w-md items-center
                    justify-between
                "
            >
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
                        className="
                            flex h-14 w-14
                            items-center justify-center
                            rounded-2xl
                            bg-zinc-950
                            text-xs font-bold
                            text-white shadow-lg
                        "
                    >
                        FX
                    </motion.div>

                    <span className="mt-2 text-[10px] font-semibold text-zinc-500">
                        FYNDREX
                    </span>
                </div>

                <Connection color="emerald" />

                <div className="flex flex-col items-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.04, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="
                            flex h-14 w-14
                            items-center justify-center
                            rounded-2xl
                            border border-emerald-100
                            bg-white
                            text-lg shadow-sm
                        "
                    >
                        😊
                    </motion.div>

                    <span className="mt-2 text-[10px] font-semibold text-zinc-500">
                        Happy Client
                    </span>
                </div>
            </div>

            <div
                className="
                    absolute bottom-4 left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-full
                    border border-emerald-100
                    bg-white px-3 py-1.5
                    text-[9px] font-semibold
                    text-emerald-600 shadow-sm
                "
            >
                Opportunity → Client
            </div>
        </div>
    );
}


/* ============================================================
   LEAD NODE
============================================================ */

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
                className="
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    border border-zinc-200
                    bg-white
                    text-lg shadow-sm
                "
            >
                👤
            </motion.div>

            <span className="mt-2 text-[10px] font-semibold text-zinc-500">
                Lead
            </span>
        </div>
    );
}


/* ============================================================
   CONNECTION
============================================================ */

function Connection({ color }) {
    const dotClass =
        color === "emerald"
            ? "bg-emerald-500"
            : "bg-blue-500";

    return (
        <div
            className="
                relative mx-4 h-px
                flex-1 bg-zinc-200
            "
        >
            <motion.div
                animate={{
                    left: ["0%", "100%"],
                }}
                transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className={`
                    absolute top-1/2
                    h-1.5 w-1.5
                    -translate-y-1/2
                    rounded-full
                    ${dotClass}
                `}
            />
        </div>
    );
}


/* ============================================================
   SHARED ANALYSIS HEADER
============================================================ */

function AnalysisHeader({
    icon,
    title,
    subtitle,
    status,
}) {
    return (
        <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div
                    className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-xl
                        border border-blue-100
                        bg-white
                        text-blue-500
                        shadow-sm
                    "
                >
                    {icon}
                </div>

                <div>
                    <div className="text-[11px] font-bold text-zinc-800">
                        {title}
                    </div>

                    <div className="mt-0.5 text-[8px] text-zinc-400">
                        {subtitle}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />

                <span className="text-[8px] font-bold tracking-[0.08em] text-blue-500">
                    {status}
                </span>
            </div>
        </div>
    );
}


/* ============================================================
   SHARED BLUE PULSE GLOW
============================================================ */

function PulseGlow({ size = "h-48 w-48" }) {
    return (
        <motion.div
            animate={{
                opacity: [0.05, 0.12, 0.05],
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
            }}
            className={`
                pointer-events-none
                absolute left-1/2 top-1/2
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-blue-500
                blur-3xl
                ${size}
            `}
        />
    );
}


/* ============================================================
   ICONS
============================================================ */

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
            <circle cx="11" cy="11" r="7" />
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
            <circle cx="12" cy="10" r="2.5" />
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
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 4v5" />
            <path d="M20 12h-5" />
            <path d="M12 20v-5" />
            <path d="M4 12h5" />
        </svg>
    );
}

function OpportunityIcon() {
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
            <circle cx="12" cy="12" r="8" />
            <path d="m8.5 15.5 3.5-7 3.5 7" />
        </svg>
    );
}

export default ProductWorkflow;