import {
    Loader2,
    MapPin,
    Search,
    X,
    Check,
    Plus,
    ArrowDown,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
} from "motion/react";

import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

function SearchForm({
    keyword,
    location,
    areas = [],
    loading,
    theme,
    onKeywordChange,
    onLocationChange,
    onAreasChange,
    onSubmit,
    onCancel,
}) {
    const hasKeyword =
        keyword.trim().length > 0;

    const hasLocation =
        location.trim().length > 0;

    const hasArea =
        areas.length > 0;

    const isDark =
        theme === "dark";

    /*
    |--------------------------------------------------------------------------
    | Refs
    |--------------------------------------------------------------------------
    */

    const journeyRef =
        useRef(null);

    const businessRef =
        useRef(null);

    const locationRef =
        useRef(null);

    const areaRef =
        useRef(null);

    const searchRef =
        useRef(null);

    /*
    |--------------------------------------------------------------------------
    | Guide Geometry
    |--------------------------------------------------------------------------
    */

    const [
        guideGeometry,
        setGuideGeometry,
    ] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Area Logic
    |--------------------------------------------------------------------------
    */

    const addArea = (event) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        const value =
            event.target.value.trim();

        if (!value) {
            return;
        }

        if (areas.length >= 3) {
            return;
        }

        const alreadyExists =
            areas.some(
                (area) =>
                    area.toLowerCase() ===
                    value.toLowerCase()
            );

        if (alreadyExists) {
            event.target.value = "";
            return;
        }

        onAreasChange([
            ...areas,
            value,
        ]);

        event.target.value = "";
    };

    const removeArea = (
        areaToRemove
    ) => {
        onAreasChange(
            areas.filter(
                (area) =>
                    area !== areaToRemove
            )
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            loading ||
            !keyword.trim() ||
            !location.trim()
        ) {
            return;
        }

        onSubmit(event);
    };

    /*
    |--------------------------------------------------------------------------
    | Guide Stage
    |--------------------------------------------------------------------------
    |
    | 0 = Search businesses
    | 1 = Type location
    | 2 = Type area (optional) / Search businesses
    | 3 = Hunt businesses
    |
    */

    const guideStage =
        loading
            ? 3
            : !hasKeyword
                ? 0
                : !hasLocation
                    ? 1
                    : !hasArea
                        ? 2
                        : 3;

    const guideText =
        loading
            ? "Hunting businesses..."
            : guideStage === 0
                ? "Search businesses"
                : guideStage === 1
                    ? "Type location"
                    : guideStage === 2
                        ? "Type area (optional)"
                        : "Hunt businesses";

    /*
    |--------------------------------------------------------------------------
    | Stable Guide Stage
    |--------------------------------------------------------------------------
    |
    | Important:
    | guideStage changes only when the user moves to another step.
    |
    | Typing inside the current input does NOT create a new animation key.
    |
    */

    const [
        activeGuideStage,
        setActiveGuideStage,
    ] = useState(guideStage);

    useEffect(() => {
        setActiveGuideStage(
            guideStage
        );
    }, [guideStage]);

    /*
    |--------------------------------------------------------------------------
    | Measure Input Positions
    |--------------------------------------------------------------------------
    */

    useLayoutEffect(() => {
        const measure = () => {
            const container =
                journeyRef.current;

            if (!container) {
                return;
            }

            let targetElement = null;
            let sourceElement = null;

            /*
            --------------------------------------------------------------
            Stage 0
            Search businesses
            --------------------------------------------------------------
            */

            if (
                guideStage === 0
            ) {
                targetElement =
                    businessRef.current;

                sourceElement =
                    null;
            }

            /*
            --------------------------------------------------------------
            Stage 1
            Type location
            Business → Location
            --------------------------------------------------------------
            */

            if (
                guideStage === 1
            ) {
                sourceElement =
                    businessRef.current;

                targetElement =
                    locationRef.current;
            }

            /*
            --------------------------------------------------------------
            Stage 2
            Type area
            Location → Area
            --------------------------------------------------------------
            */

            if (
                guideStage === 2
            ) {
                sourceElement =
                    locationRef.current;

                targetElement =
                    areaRef.current;
            }

            /*
            --------------------------------------------------------------
            Stage 3
            Hunt businesses
            Area/Location → Search
            --------------------------------------------------------------
            */

            if (
                guideStage === 3
            ) {
                sourceElement =
                    hasArea
                        ? areaRef.current
                        : locationRef.current;

                targetElement =
                    searchRef.current;
            }

            if (!targetElement) {
                return;
            }

            const containerRect =
                container.getBoundingClientRect();

            const targetRect =
                targetElement.getBoundingClientRect();

            const targetCenter =
                targetRect.left -
                containerRect.left +
                targetRect.width / 2;

            let sourceCenter = 0;

            if (sourceElement) {
                const sourceRect =
                    sourceElement.getBoundingClientRect();

                sourceCenter =
                    sourceRect.left -
                    containerRect.left +
                    sourceRect.width / 2;
            }

            const start =
                guideStage === 0
                    ? 0
                    : Math.min(
                        sourceCenter,
                        targetCenter
                    );

            const end =
                targetCenter;

            const left =
                Math.min(
                    start,
                    end
                );

            const width =
                Math.abs(
                    end - start
                );

            const midpoint =
                left +
                width / 2;

            const searchRect =
                searchRef.current?.getBoundingClientRect();

            const searchCenter =
                searchRect
                    ? searchRect.left -
                      containerRect.left +
                      searchRect.width / 2
                    : null;

            setGuideGeometry({
                left,
                width,
                targetX:
                    targetCenter,
                midpoint,
                searchX:
                    searchCenter,
            });
        };

        const frame =
            requestAnimationFrame(
                measure
            );

        const resizeObserver =
            new ResizeObserver(
                measure
            );

        if (
            journeyRef.current
        ) {
            resizeObserver.observe(
                journeyRef.current
            );
        }

        if (
            businessRef.current
        ) {
            resizeObserver.observe(
                businessRef.current
            );
        }

        if (
            locationRef.current
        ) {
            resizeObserver.observe(
                locationRef.current
            );
        }

        if (
            areaRef.current
        ) {
            resizeObserver.observe(
                areaRef.current
            );
        }

        if (
            searchRef.current
        ) {
            resizeObserver.observe(
                searchRef.current
            );
        }

        window.addEventListener(
            "resize",
            measure
        );

        return () => {
            cancelAnimationFrame(
                frame
            );

            resizeObserver.disconnect();

            window.removeEventListener(
                "resize",
                measure
            );
        };
    }, [
        guideStage,
        hasArea,
        areas.length,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Active Input Glow
    |--------------------------------------------------------------------------
    */

    const glowAnimation = {
        borderColor:
            isDark
                ? [
                    "#2a2a2a",
                    "#ffffff",
                    "#2a2a2a",
                ]
                : [
                    "#d9d9d9",
                    "#151515",
                    "#d9d9d9",
                ],

        boxShadow:
            isDark
                ? [
                    "0 0 0 rgba(255,255,255,0)",
                    "0 0 18px rgba(255,255,255,0.22)",
                    "0 0 0 rgba(255,255,255,0)",
                ]
                : [
                    "0 0 0 rgba(0,0,0,0)",
                    "0 0 18px rgba(0,0,0,0.12)",
                    "0 0 0 rgba(0,0,0,0)",
                ],
    };

    const glowTransition = {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
    };

    /*
    |--------------------------------------------------------------------------
    | Horizontal Animated Guide
    |--------------------------------------------------------------------------
    */

    const FlowGuide = () => {
        if (!guideGeometry) {
            return null;
        }

        return (
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    z-30
                    hidden
                    h-1
                    lg:block
                "
            >
                <AnimatePresence
                    mode="wait"
                >
                    <motion.div
                        key={activeGuideStage}
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
                            duration: 0.3,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        className="
                            absolute
                            left-0
                            top-[-58px]
                            h-[50px]
                            w-full
                        "
                    >

                        {/* ================================================= */}
                        {/* HORIZONTAL GUIDE LINE */}
                        {/* ================================================= */}

                        {guideStage === 2 ? (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scaleX: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    scaleX: 1,
                                }}
                                transition={{
                                    duration: 0.45,
                                    delay: 0.05,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                    ],
                                }}
                                className={`
                                    absolute
                                    top-[15px]
                                    h-px
                                    origin-left
                                    ${
                                        isDark
                                            ? "bg-[#414141]"
                                            : "bg-[#c7c7c7]"
                                    }
                                `}
                                style={{
                                    left:
                                        guideGeometry.targetX,
                                    width:
                                        Math.max(
                                            guideGeometry.searchX -
                                                guideGeometry.targetX,
                                            35
                                        ),
                                }}
                            />
                        ) : (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scaleX: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    scaleX: 1,
                                }}
                                transition={{
                                    duration: 0.45,
                                    delay: 0.05,
                                    ease: [
                                        0.22,
                                        1,
                                        0.36,
                                        1,
                                    ],
                                }}
                                className={`
                                    absolute
                                    top-[15px]
                                    h-px
                                    origin-left
                                    ${
                                        isDark
                                            ? "bg-[#414141]"
                                            : "bg-[#c7c7c7]"
                                    }
                                `}
                                style={{
                                    left:
                                        guideGeometry.left,
                                    width:
                                        Math.max(
                                            guideGeometry.width,
                                            35
                                        ),
                                }}
                            />
                        )}

                        {/* ================================================= */}
                        {/* AREA STAGE */}
                        {/* ================================================= */}

                        {guideStage === 2 ? (
                            <>
                                {/* ----------------------------------------- */}
                                {/* TYPE AREA BOX */}
                                {/* ----------------------------------------- */}

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.94,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.08,
                                    }}
                                    className={`
                                        absolute
                                        top-0
                                        flex
                                        min-h-[30px]
                                        -translate-x-1/2
                                        items-center
                                        gap-2
                                        rounded-[7px]
                                        border
                                        px-3
                                        py-1.5
                                        text-[11px]
                                        font-medium
                                        tracking-[-0.01em]
                                        whitespace-nowrap
                                        shadow-[0_4px_14px_rgba(0,0,0,0.08)]
                                        ${
                                            isDark
                                                ? `
                                                    border-[#303030]
                                                    bg-[#151515]
                                                    text-[#d0d0d0]
                                                `
                                                : `
                                                    border-[#d8d8d8]
                                                    bg-white
                                                    text-[#555]
                                                `
                                        }
                                    `}
                                    style={{
                                        left:
                                            guideGeometry.targetX,
                                    }}
                                >
                                    <span
                                        className={`
                                            flex
                                            h-4
                                            w-4
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            ${
                                                isDark
                                                    ? "bg-[#272727] text-[#aaa]"
                                                    : "bg-[#f1f1f1] text-[#666]"
                                            }
                                        `}
                                    >
                                        <ArrowDown
                                            size={10}
                                            strokeWidth={2.2}
                                        />
                                    </span>

                                    <span>
                                        Type area (optional)
                                    </span>
                                </motion.div>


                                {/* ----------------------------------------- */}
                                {/* OR */}
                                {/* ----------------------------------------- */}

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.14,
                                    }}
                                    className={`
                                        absolute
                                        top-[5px]
                                        -translate-x-1/2
                                        text-[16px]
                                        font-bold
                                        tracking-[0.08em]
                                        ${
                                            isDark
                                                ? "text-[#777]"
                                                : "text-[#888]"
                                        }
                                    `}
                                    style={{
                                        left:
                                            (
                                                guideGeometry.targetX +
                                                guideGeometry.searchX
                                            ) / 2,
                                    }}
                                >
                                    OR
                                </motion.div>


                                {/* ----------------------------------------- */}
                                {/* SEARCH BUSINESSES BOX */}
                                {/* ----------------------------------------- */}

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.94,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.2,
                                    }}
                                    className={`
                                        absolute
                                        top-0
                                        flex
                                        min-h-[30px]
                                        -translate-x-1/2
                                        items-center
                                        gap-2
                                        rounded-[7px]
                                        border
                                        px-3
                                        py-1.5
                                        text-[11px]
                                        font-medium
                                        tracking-[-0.01em]
                                        whitespace-nowrap
                                        shadow-[0_4px_14px_rgba(0,0,0,0.08)]
                                        ${
                                            isDark
                                                ? `
                                                    border-[#303030]
                                                    bg-[#151515]
                                                    text-[#d0d0d0]
                                                `
                                                : `
                                                    border-[#d8d8d8]
                                                    bg-white
                                                    text-[#555]
                                                `
                                        }
                                    `}
                                    style={{
                                        left:
                                            guideGeometry.searchX,
                                    }}
                                >
                                    <span
                                        className={`
                                            flex
                                            h-4
                                            w-4
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            ${
                                                isDark
                                                    ? "bg-[#272727] text-[#aaa]"
                                                    : "bg-[#f1f1f1] text-[#666]"
                                            }
                                        `}
                                    >
                                        <ArrowDown
                                            size={10}
                                            strokeWidth={2.2}
                                        />
                                    </span>

                                    <span>
                                        Search businesses
                                    </span>
                                </motion.div>


                                {/* ----------------------------------------- */}
                                {/* SEARCH VERTICAL LINE */}
                                {/* ----------------------------------------- */}

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scaleY: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scaleY: 1,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.25,
                                    }}
                                    className={`
                                        absolute
                                        top-[29px]
                                        h-[21px]
                                        w-px
                                        origin-top
                                        ${
                                            isDark
                                                ? "bg-[#414141]"
                                                : "bg-[#c7c7c7]"
                                        }
                                    `}
                                    style={{
                                        left:
                                            guideGeometry.searchX,
                                    }}
                                />


                                {/* ----------------------------------------- */}
                                {/* SEARCH MOVING ARROW */}
                                {/* ----------------------------------------- */}

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: -3,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: [0, 5, 0],
                                    }}
                                    transition={{
                                        opacity: {
                                            duration: 0.25,
                                            delay: 0.32,
                                        },
                                        y: {
                                            duration: 1.1,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        },
                                    }}
                                    className={`
                                        absolute
                                        top-[42px]
                                        -translate-x-1/2
                                        ${
                                            isDark
                                                ? "text-[#777]"
                                                : "text-[#888]"
                                        }
                                    `}
                                    style={{
                                        left:
                                            guideGeometry.searchX,
                                    }}
                                >
                                    <ArrowDown
                                        size={18}
                                        strokeWidth={2.2}
                                    />
                                </motion.div>
                            </>
                        ) : (
                            /* ================================================= */
                            /* NORMAL GUIDE */
                            /* ================================================= */

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.94,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.08,
                                }}
                                className={`
                                    absolute
                                    top-0
                                    flex
                                    min-h-[30px]
                                    -translate-x-1/2
                                    items-center
                                    gap-2
                                    rounded-[7px]
                                    border
                                    px-3
                                    py-1.5
                                    text-[11px]
                                    font-medium
                                    tracking-[-0.01em]
                                    whitespace-nowrap
                                    shadow-[0_4px_14px_rgba(0,0,0,0.08)]
                                    ${
                                        isDark
                                            ? `
                                                border-[#303030]
                                                bg-[#151515]
                                                text-[#d0d0d0]
                                            `
                                            : `
                                                border-[#d8d8d8]
                                                bg-white
                                                text-[#555]
                                            `
                                    }
                                `}
                                style={{
                                    left:
                                        guideGeometry.midpoint,
                                }}
                            >
                                <span
                                    className={`
                                        flex
                                        h-4
                                        w-4
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        ${
                                            isDark
                                                ? "bg-[#272727] text-[#aaa]"
                                                : "bg-[#f1f1f1] text-[#666]"
                                        }
                                    `}
                                >
                                    <ArrowDown
                                        size={10}
                                        strokeWidth={2.2}
                                    />
                                </span>

                                <span>
                                    {guideText}
                                </span>
                            </motion.div>
                        )}


                        {/* ================================================= */}
                        {/* NORMAL TARGET VERTICAL LINE */}
                        {/* ================================================= */}

                        {guideStage !== 2 && (
                            <>
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scaleY: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scaleY: 1,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.2,
                                    }}
                                    className={`
                                        absolute
                                        top-[29px]
                                        h-[21px]
                                        w-px
                                        origin-top
                                        ${
                                            isDark
                                                ? "bg-[#414141]"
                                                : "bg-[#c7c7c7]"
                                        }
                                    `}
                                    style={{
                                        left:
                                            guideGeometry.targetX,
                                    }}
                                />

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: -3,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: [0, 5, 0],
                                    }}
                                    transition={{
                                        opacity: {
                                            duration: 0.25,
                                            delay: 0.3,
                                        },
                                        y: {
                                            duration: 1.1,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        },
                                    }}
                                    className={`
                                        absolute
                                        top-[42px]
                                        -translate-x-1/2
                                        ${
                                            isDark
                                                ? "text-[#666]"
                                                : "text-[#888]"
                                        }
                                    `}
                                    style={{
                                        left:
                                            guideGeometry.targetX,
                                    }}
                                >
                                    <ArrowDown
                                        size={18}
                                        strokeWidth={2.2}
                                    />
                                </motion.div>
                            </>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Mobile Guide
    |--------------------------------------------------------------------------
    */

    const MobileGuide = ({
        text,
        visible,
    }) => {
        if (!visible) {
            return null;
        }

        return (
            <motion.div
                initial={{
                    opacity: 0,
                    y: 7,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                exit={{
                    opacity: 0,
                    y: -7,
                }}
                transition={{
                    duration: 0.25,
                }}
                className="
                    absolute
                    -top-[43px]
                    left-0
                    z-20
                    flex
                    flex-col
                    items-start
                "
            >
                <div
                    className={`
                        flex
                        min-h-[30px]
                        items-center
                        gap-2
                        rounded-[7px]
                        border
                        px-3
                        py-1.5
                        text-[11px]
                        font-medium
                        whitespace-nowrap
                        ${
                            isDark
                                ? `
                                    border-[#303030]
                                    bg-[#151515]
                                    text-[#d0d0d0]
                                `
                                : `
                                    border-[#d8d8d8]
                                    bg-white
                                    text-[#555]
                                `
                        }
                    `}
                >
                    <span
                        className={`
                            flex
                            h-4
                            w-4
                            items-center
                            justify-center
                            rounded-full
                            ${
                                isDark
                                    ? "bg-[#272727] text-[#aaa]"
                                    : "bg-[#f1f1f1] text-[#666]"
                            }
                        `}
                    >
                        <ArrowDown
                            size={10}
                            strokeWidth={2.2}
                        />
                    </span>

                    {text}
                </div>

                <div
                    className={`
                        ml-[15px]
                        h-[10px]
                        w-px
                        ${
                            isDark
                                ? "bg-[#454545]"
                                : "bg-[#c9c9c9]"
                        }
                    `}
                />

                <ArrowDown
                    size={10}
                    strokeWidth={2}
                    className={`
                        ml-[10px]
                        -mt-1
                        ${
                            isDark
                                ? "text-[#555]"
                                : "text-[#aaa]"
                        }
                    `}
                />
            </motion.div>
        );
    };

    return (
        <section
            className={`
                border-b
                pb-8
                transition-colors
                duration-200
                ${
                    isDark
                        ? "border-[#242424]"
                        : "border-[#dedede]"
                }
            `}
        >

            {/* ============================================================ */}
            {/* HEADER */}
            {/* ============================================================ */}

            <div className="max-w-3xl">
                <h1
                    className={`
                        text-[28px]
                        font-semibold
                        leading-tight
                        tracking-[-0.035em]
                        sm:text-[30px]
                        ${
                            isDark
                                ? "text-white"
                                : "text-[#151515]"
                        }
                    `}
                >
                    Find Business Opportunities
                </h1>

                <p
                    className={`
                        mt-2
                        max-w-2xl
                        text-[14px]
                        leading-6
                        tracking-[-0.01em]
                        ${
                            isDark
                                ? "text-[#888]"
                                : "text-[#6d6d6d]"
                        }
                    `}
                >
                    Discover local businesses and identify
                    potential clients that need your services.
                </p>
            </div>


            {/* ============================================================ */}
            {/* SEARCH JOURNEY */}
            {/* ============================================================ */}

            <form
                onSubmit={handleSubmit}
                className="mt-16"
            >
                <div
                    ref={journeyRef}
                    className="
                        relative
                        grid
                        grid-cols-1
                        gap-10
                        lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.15fr)_auto]
                        lg:items-center
                        lg:gap-4
                    "
                >

                    <FlowGuide />


                    {/* ==================================================== */}
                    {/* BUSINESS */}
                    {/* ==================================================== */}

                    <div
                        ref={businessRef}
                        className="relative"
                    >
                        <AnimatePresence
                            mode="wait"
                        >
                            {!hasKeyword &&
                                !loading && (
                                    <div className="lg:hidden">
                                        <MobileGuide
                                            text="Search businesses"
                                            visible
                                        />
                                    </div>
                                )}
                        </AnimatePresence>

                        <motion.div
                            animate={
                                guideStage === 0
                                    ? glowAnimation
                                    : {}
                            }
                            transition={
                                guideStage === 0
                                    ? glowTransition
                                    : {}
                            }
                            className={`
                                flex
                                h-12
                                w-full
                                items-center
                                rounded-[9px]
                                border
                                transition-all
                                duration-200
                                hover:scale-[1.005]
                                focus-within:scale-[1.01]
                                ${
                                    isDark
                                        ? `
                                            border-[#2a2a2a]
                                            bg-[#111111]
                                            hover:border-[#414141]
                                            focus-within:border-[#555]
                                        `
                                        : `
                                            border-[#d9d9d9]
                                            bg-white
                                            hover:border-[#c8c8c8]
                                            focus-within:border-[#aaa]
                                        `
                                }
                            `}
                        >
                            <Search
                                size={18}
                                strokeWidth={1.8}
                                className={`
                                    ml-4
                                    shrink-0
                                    ${
                                        isDark
                                            ? "text-[#777]"
                                            : "text-[#888]"
                                    }
                                `}
                            />

                            <input
                                type="text"
                                value={keyword}
                                onChange={(event) =>
                                    onKeywordChange(
                                        event.target.value
                                    )
                                }
                                placeholder="Search businesses..."
                                autoComplete="off"
                                spellCheck={false}
                                className={`
                                    h-full
                                    min-w-0
                                    w-full
                                    bg-transparent
                                    px-3
                                    text-[14px]
                                    font-medium
                                    outline-none
                                    ${
                                        isDark
                                            ? "text-white caret-white placeholder:text-[#666]"
                                            : "text-[#171717] caret-[#171717] placeholder:text-[#999]"
                                    }
                                `}
                            />

                            <AnimatePresence>
                                {hasKeyword && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                        className={`
                                            mr-3
                                            flex
                                            h-5
                                            w-5
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            ${
                                                isDark
                                                    ? "border-[#263b30] bg-[#101a18] text-[#4ade80]"
                                                    : "border-emerald-200 bg-emerald-50 text-emerald-600"
                                            }
                                        `}
                                    >
                                        <Check
                                            size={12}
                                            strokeWidth={2}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>


                    {/* ==================================================== */}
                    {/* LOCATION */}
                    {/* ==================================================== */}

                    <div
                        ref={locationRef}
                        className="relative"
                    >
                        <AnimatePresence
                            mode="wait"
                        >
                            {hasKeyword &&
                                !hasLocation &&
                                !loading && (
                                    <div className="lg:hidden">
                                        <MobileGuide
                                            text="Type location"
                                            visible
                                        />
                                    </div>
                                )}
                        </AnimatePresence>

                        <motion.div
                            animate={
                                guideStage === 1
                                    ? glowAnimation
                                    : {}
                            }
                            transition={
                                guideStage === 1
                                    ? glowTransition
                                    : {}
                            }
                            className={`
                                flex
                                h-12
                                w-full
                                items-center
                                rounded-[9px]
                                border
                                transition-all
                                duration-200
                                hover:scale-[1.005]
                                focus-within:scale-[1.01]
                                ${
                                    isDark
                                        ? `
                                            border-[#2a2a2a]
                                            bg-[#111111]
                                            hover:border-[#414141]
                                            focus-within:border-[#555]
                                        `
                                        : `
                                            border-[#d9d9d9]
                                            bg-white
                                            hover:border-[#c8c8c8]
                                            focus-within:border-[#aaa]
                                        `
                                }
                            `}
                        >
                            <MapPin
                                size={18}
                                strokeWidth={1.8}
                                className={`
                                    ml-4
                                    shrink-0
                                    ${
                                        isDark
                                            ? "text-[#777]"
                                            : "text-[#888]"
                                    }
                                `}
                            />

                            <input
                                type="text"
                                value={location}
                                onChange={(event) =>
                                    onLocationChange(
                                        event.target.value
                                    )
                                }
                                placeholder="City or location..."
                                autoComplete="off"
                                spellCheck={false}
                                className={`
                                    h-full
                                    min-w-0
                                    w-full
                                    bg-transparent
                                    px-3
                                    text-[14px]
                                    font-medium
                                    outline-none
                                    ${
                                        isDark
                                            ? "text-white caret-white placeholder:text-[#666]"
                                            : "text-[#171717] caret-[#171717] placeholder:text-[#999]"
                                    }
                                `}
                            />

                            <AnimatePresence>
                                {hasLocation && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            scale: 0.7,
                                        }}
                                        className={`
                                            mr-3
                                            flex
                                            h-5
                                            w-5
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            ${
                                                isDark
                                                    ? "border-[#263b30] bg-[#101a18] text-[#4ade80]"
                                                    : "border-emerald-200 bg-emerald-50 text-emerald-600"
                                            }
                                        `}
                                    >
                                        <Check
                                            size={12}
                                            strokeWidth={2}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>


                    {/* ==================================================== */}
                    {/* AREA */}
                    {/* ==================================================== */}

                    <div
                        ref={areaRef}
                        className="relative"
                    >
                        <AnimatePresence
                            mode="wait"
                        >
                            {hasLocation &&
                                !hasArea &&
                                !loading && (
                                    <div className="lg:hidden">
                                        <MobileGuide
                                            text="Type area (optional)"
                                            visible
                                        />
                                    </div>
                                )}
                        </AnimatePresence>

                        <motion.div
                            animate={
                                guideStage === 2
                                    ? glowAnimation
                                    : {}
                            }
                            transition={
                                guideStage === 2
                                    ? glowTransition
                                    : {}
                            }
                            className={`
                                min-h-12
                                w-full
                                overflow-hidden
                                rounded-[9px]
                                border
                                transition-all
                                duration-200
                                ${
                                    isDark
                                        ? `
                                            border-[#2a2a2a]
                                            bg-[#111111]
                                        `
                                        : `
                                            border-[#d9d9d9]
                                            bg-white
                                        `
                                }
                            `}
                        >
                            <div
                                className="
                                    flex
                                    min-h-12
                                    items-center
                                "
                            >
                                <Plus
                                    size={16}
                                    strokeWidth={1.8}
                                    className={`
                                        ml-3
                                        shrink-0
                                        ${
                                            isDark
                                                ? "text-[#666]"
                                                : "text-[#888]"
                                        }
                                    `}
                                />

                                <input
                                    type="text"
                                    disabled={
                                        !hasLocation ||
                                        areas.length >= 3
                                    }
                                    onKeyDown={addArea}
                                    placeholder={
                                        areas.length >= 3
                                            ? "Maximum reached"
                                            : "Type area + Enter"
                                    }
                                    autoComplete="off"
                                    spellCheck={false}
                                    className={`
                                        h-12
                                        min-w-0
                                        flex-1
                                        bg-transparent
                                        px-2.5
                                        text-[12px]
                                        font-medium
                                        outline-none
                                        ${
                                            isDark
                                                ? "text-white placeholder:text-[#555]"
                                                : "text-[#222] placeholder:text-[#999]"
                                        }
                                    `}
                                />

                                <span
                                    className={`
                                        mr-3
                                        shrink-0
                                        text-[10px]
                                        font-medium
                                        ${
                                            isDark
                                                ? "text-[#666]"
                                                : "text-[#999]"
                                        }
                                    `}
                                >
                                    {areas.length}/3
                                </span>
                            </div>


                            {/* ================================================= */}
                            {/* AREA CHIPS */}
                            {/* ================================================= */}

                            <AnimatePresence>
                                {areas.length > 0 && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            height: 0,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            height: "auto",
                                        }}
                                        exit={{
                                            opacity: 0,
                                            height: 0,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                        className={`
                                            flex
                                            flex-wrap
                                            gap-1.5
                                            border-t
                                            px-2.5
                                            py-2
                                            ${
                                                isDark
                                                    ? "border-[#242424]"
                                                    : "border-[#ededed]"
                                            }
                                        `}
                                    >
                                        {areas.map(
                                            (area) => (
                                                <motion.div
                                                    key={area}
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.85,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0.85,
                                                    }}
                                                    className={`
                                                        inline-flex
                                                        items-center
                                                        gap-1
                                                        rounded-full
                                                        border
                                                        px-2
                                                        py-1
                                                        text-[10px]
                                                        font-medium
                                                        ${
                                                            isDark
                                                                ? "border-[#303030] bg-[#191919] text-[#ccc]"
                                                                : "border-[#d7d7d7] bg-[#f7f7f7] text-[#444]"
                                                        }
                                                    `}
                                                >
                                                    <MapPin
                                                        size={9}
                                                        strokeWidth={1.8}
                                                    />

                                                    <span>
                                                        {area}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeArea(
                                                                area
                                                            )
                                                        }
                                                        className={`
                                                            ml-0.5
                                                            rounded-full
                                                            p-0.5
                                                            transition-colors
                                                            ${
                                                                isDark
                                                                    ? "text-[#777] hover:bg-[#292929] hover:text-white"
                                                                    : "text-[#999] hover:bg-[#e8e8e8] hover:text-[#222]"
                                                            }
                                                        `}
                                                        aria-label={`Remove ${area}`}
                                                    >
                                                        <X
                                                            size={9}
                                                            strokeWidth={2}
                                                        />
                                                    </button>
                                                </motion.div>
                                            )
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>


                    {/* ==================================================== */}
                    {/* SEARCH */}
                    {/* ==================================================== */}

                    <div
                        ref={searchRef}
                        className="relative"
                    >
                        <motion.button
                            type="submit"
                            disabled={
                                loading ||
                                !keyword.trim() ||
                                !location.trim()
                            }
                            animate={
                                guideStage === 3
                                    ? {
                                        boxShadow:
                                            isDark
                                                ? [
                                                    "0 1px 2px rgba(0,0,0,0.12)",
                                                    "0 0 20px rgba(255,255,255,0.24)",
                                                    "0 1px 2px rgba(0,0,0,0.12)",
                                                ]
                                                : [
                                                    "0 1px 2px rgba(0,0,0,0.12)",
                                                    "0 0 20px rgba(0,0,0,0.14)",
                                                    "0 1px 2px rgba(0,0,0,0.12)",
                                                ],
                                    }
                                    : {}
                            }
                            transition={
                                guideStage === 3
                                    ? {
                                        duration: 1.8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }
                                    : {}
                            }
                            className={`
                                flex
                                h-12
                                w-full
                                min-w-[145px]
                                items-center
                                justify-center
                                gap-2
                                rounded-[9px]
                                px-5
                                text-[14px]
                                font-medium
                                tracking-[-0.01em]
                                shadow-[0_1px_2px_rgba(0,0,0,0.12)]
                                transition-all
                                duration-200
                                hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:shadow-none
                                disabled:active:scale-100
                                ${
                                    isDark
                                        ? `
                                            bg-white
                                            text-black
                                            hover:bg-[#e8e8e8]
                                            disabled:bg-[#242424]
                                            disabled:text-[#666]
                                        `
                                        : `
                                            border
                                            border-[#151515]
                                            bg-[#171717]
                                            text-white
                                            hover:bg-[#252525]
                                            disabled:border-[#d9d9d9]
                                            disabled:bg-[#e7e7e7]
                                            disabled:text-[#999]
                                        `
                                }
                            `}
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={17}
                                        strokeWidth={2}
                                        className="animate-spin"
                                    />

                                    <span>
                                        Hunting
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Search
                                        size={17}
                                        strokeWidth={1.9}
                                    />

                                    <span>
                                        Search
                                    </span>
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>


                {/* ============================================================ */}
                {/* MOBILE OPTIONAL AREA MESSAGE */}
                {/* ============================================================ */}

                <div
                    className={`
                        mt-4
                        lg:hidden
                        ${
                            hasLocation
                                ? "block"
                                : "hidden"
                        }
                    `}
                >
                    <p
                        className={`
                            text-[11px]
                            ${
                                isDark
                                    ? "text-[#666]"
                                    : "text-[#888]"
                            }
                        `}
                    >
                        Optional · Add up to 3 areas
                    </p>
                </div>


                {/* ============================================================ */}
                {/* CANCEL */}
                {/* ============================================================ */}

                {loading && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -5,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="mt-4"
                    >
                        <button
                            type="button"
                            onClick={onCancel}
                            className={`
                                flex
                                h-10
                                items-center
                                justify-center
                                gap-2
                                rounded-[8px]
                                border
                                px-4
                                text-[13px]
                                font-medium
                                transition-all
                                duration-150
                                active:scale-[0.98]
                                ${
                                    isDark
                                        ? `
                                            border-[#303030]
                                            bg-[#181818]
                                            text-[#b5b5b5]
                                            hover:border-red-500/30
                                            hover:bg-red-500/[0.08]
                                            hover:text-red-400
                                        `
                                        : `
                                            border-[#d5d5d5]
                                            bg-white
                                            text-[#666]
                                            hover:border-red-200
                                            hover:bg-red-50
                                            hover:text-red-500
                                        `
                                }
                            `}
                        >
                            <X
                                size={15}
                                strokeWidth={1.8}
                            />

                            <span>
                                Cancel
                            </span>
                        </button>
                    </motion.div>
                )}
            </form>
        </section>
    );
}

export default SearchForm;