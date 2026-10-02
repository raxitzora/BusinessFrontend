import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Coins } from "lucide-react";
import { useRef } from "react";

/* ============================================================
   START BUTTON
============================================================ */

function MoneyFlowButton() {
    const coins = [
        { id: 1, delay: 0, x: -65, y: -18 },
        { id: 2, delay: 0.18, x: -95, y: 8 },
        { id: 3, delay: 0.36, x: -72, y: 35 },
        { id: 4, delay: 0.54, x: -110, y: 22 },
    ];

    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            className="relative"
        >
            {/* ====================================================
                MONEY PARTICLES
            ===================================================== */}

            <div className="pointer-events-none absolute inset-0 z-20">
                {coins.map((coin) => (
                    <motion.div
                        key={coin.id}
                        variants={{
                            rest: {
                                opacity: 0,
                                x: coin.x,
                                y: coin.y,
                                scale: 0.5,
                            },

                            hover: {
                                opacity: [0, 1, 1, 0],

                                x: [
                                    coin.x,
                                    coin.x + 30,
                                    coin.x + 65,
                                    0,
                                ],

                                y: [
                                    coin.y,
                                    coin.y - 8,
                                    coin.y + 5,
                                    0,
                                ],

                                scale: [
                                    0.5,
                                    0.9,
                                    0.8,
                                    0.2,
                                ],
                            },
                        }}
                        transition={{
                            duration: 1.05,
                            delay: coin.delay,
                            repeat: Infinity,
                            repeatDelay: 0.35,
                            ease: "easeInOut",
                        }}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            flex
                            h-5
                            w-5
                            -translate-x-1/2
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-orange-400/40
                            bg-orange-400/10
                            text-[9px]
                            font-bold
                            text-orange-500
                            shadow-[0_0_15px_rgba(249,115,22,0.25)]
                            dark:border-orange-400/40
                            dark:bg-orange-400/10
                            dark:text-orange-300
                        "
                    >
                        ₹
                    </motion.div>
                ))}
            </div>

            {/* ====================================================
                BUTTON
            ===================================================== */}

            <Link
                to="/sign-in"
                className="
                    group
                    relative
                    z-10
                    flex
                    h-11
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    bg-zinc-950
                    px-6
                    text-sm
                    font-semibold
                    tracking-[-0.01em]
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-zinc-900
                    hover:shadow-[0_14px_40px_rgba(249,115,22,0.18)]
                    dark:bg-white
                    dark:text-zinc-950
                    dark:hover:bg-zinc-100
                    sm:h-12
                "
            >
                {/* ==================================================
                    SHINE
                =================================================== */}

                <motion.div
                    variants={{
                        rest: {
                            x: "-130%",
                            opacity: 0,
                        },

                        hover: {
                            x: "130%",
                            opacity: 1,
                        },
                    }}
                    transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                    }}
                    className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        left-0
                        w-1/3
                        -skew-x-12
                        bg-gradient-to-r
                        from-transparent
                        via-orange-400/30
                        to-transparent
                    "
                />

                {/* ==================================================
                    DEFAULT TEXT
                =================================================== */}

                <motion.span
                    variants={{
                        rest: {
                            y: 0,
                            opacity: 1,
                        },

                        hover: {
                            y: -22,
                            opacity: 0,
                        },
                    }}
                    transition={{
                        duration: 0.18,
                    }}
                    className="
                        relative
                        flex
                        items-center
                        gap-2
                    "
                >
                    Start for free

                    <ArrowRight
                        size={15}
                        className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                        "
                    />
                </motion.span>

                {/* ==================================================
                    HOVER TEXT
                =================================================== */}

                <motion.span
                    variants={{
                        rest: {
                            y: 22,
                            opacity: 0,
                        },

                        hover: {
                            y: 0,
                            opacity: 1,
                        },
                    }}
                    transition={{
                        duration: 0.22,
                        delay: 0.03,
                    }}
                    className="
                        absolute
                        flex
                        items-center
                        gap-2
                        text-orange-400
                        dark:text-orange-600
                    "
                >
                    Opportunity incoming

                    <Coins size={15} />
                </motion.span>
            </Link>
        </motion.div>
    );
}

/* ============================================================
   HERO SECTION
============================================================ */

function HeroSection() {
    const heroRef = useRef<HTMLElement | null>(null);

    /*
        Hero scroll progress:

        0 = hero starts
        1 = hero is leaving the viewport
    */

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    /* ============================================================
       ORANGE FIRE ATMOSPHERE MOVEMENT
    ============================================================ */

    const orangeY = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "48%"]
    );

    const orangeScale = useTransform(
        scrollYProgress,
        [0, 1],
        [1, 1.08]
    );

    const orangeOpacity = useTransform(
        scrollYProgress,
        [0, 0.75, 1],
        [1, 0.9, 0.55]
    );

    /* ============================================================
       HERO CONTENT MOVEMENT
    ============================================================ */

    const contentY = useTransform(
        scrollYProgress,
        [0, 1],
        ["0px", "-90px"]
    );

    const contentOpacity = useTransform(
        scrollYProgress,
        [0, 0.7, 1],
        [1, 0.8, 0]
    );

    /* ============================================================
       GRID MOVEMENT
    ============================================================ */

    const gridY = useTransform(
        scrollYProgress,
        [0, 1],
        ["0px", "80px"]
    );

    return (
        <section
            ref={heroRef}
            className="
                relative
                z-0
                h-[115svh]
                min-h-[720px]
                w-full
                overflow-hidden
                bg-white
                text-zinc-950
                transition-colors
                duration-300
                dark:bg-[#08090d]
                dark:text-white
            "
        >
            {/* ====================================================
                STICKY HERO VIEWPORT
            ===================================================== */}

            <div
                className="
                    sticky
                    top-0
                    h-[100svh]
                    min-h-[680px]
                    overflow-hidden
                "
            >
                {/* =================================================
                    GRID BACKGROUND
                ================================================== */}

                <motion.div
                    style={{ y: gridY }}
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                    "
                >
                    {/* LIGHT MODE GRID */}

                    <div
                        className="
                            absolute
                            inset-0
                            opacity-[0.42]
                            dark:opacity-0
                        "
                        style={{
                            backgroundImage: `
                                linear-gradient(
                                    to right,
                                    rgba(24,24,27,0.075) 1px,
                                    transparent 1px
                                ),
                                linear-gradient(
                                    to bottom,
                                    rgba(24,24,27,0.075) 1px,
                                    transparent 1px
                                )
                            `,
                            backgroundSize: "64px 64px",
                            maskImage:
                                "radial-gradient(ellipse 75% 70% at 50% 42%, black 15%, transparent 72%)",
                            WebkitMaskImage:
                                "radial-gradient(ellipse 75% 70% at 50% 42%, black 15%, transparent 72%)",
                        }}
                    />

                    {/* DARK MODE GRID */}

                    <div
                        className="
                            absolute
                            inset-0
                            hidden
                            opacity-30
                            dark:block
                        "
                        style={{
                            backgroundImage: `
                                linear-gradient(
                                    to right,
                                    rgba(255,255,255,0.045) 1px,
                                    transparent 1px
                                ),
                                linear-gradient(
                                    to bottom,
                                    rgba(255,255,255,0.045) 1px,
                                    transparent 1px
                                )
                            `,
                            backgroundSize: "64px 64px",
                            maskImage:
                                "radial-gradient(ellipse 75% 70% at 50% 42%, black 15%, transparent 72%)",
                            WebkitMaskImage:
                                "radial-gradient(ellipse 75% 70% at 50% 42%, black 15%, transparent 72%)",
                        }}
                    />
                </motion.div>

                {/* =================================================
                    ORANGE FIRE ATMOSPHERIC SHAPE
                ================================================== */}

                {/* LIGHT MODE */}

                <motion.div
                    style={{
                        y: orangeY,
                        scale: orangeScale,
                        opacity: orangeOpacity,
                    }}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[53%]
                        z-[1]
                        h-[58vw]
                        w-[155vw]
                        min-h-[460px]
                        min-w-[1000px]
                        -translate-x-1/2
                        rounded-[50%]
                        blur-[18px]
                        dark:hidden
                        sm:blur-[22px]
                    "
                >
                    <div
                        className="
                            absolute
                            inset-0
                            rounded-[50%]
                        "
                        style={{
                            background:
                                "radial-gradient(ellipse at center, rgba(249,115,22,0.24) 0%, rgba(251,146,60,0.17) 20%, rgba(245,158,11,0.10) 40%, rgba(234,88,12,0.045) 57%, transparent 72%)",
                        }}
                    />
                </motion.div>

                {/* DARK MODE */}

                <motion.div
                    style={{
                        y: orangeY,
                        scale: orangeScale,
                        opacity: orangeOpacity,
                    }}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[52%]
                        z-[1]
                        hidden
                        h-[58vw]
                        w-[155vw]
                        min-h-[460px]
                        min-w-[1000px]
                        -translate-x-1/2
                        rounded-[50%]
                        blur-[16px]
                        dark:block
                        sm:blur-[20px]
                    "
                >
                    <div
                        className="
                            absolute
                            inset-0
                            rounded-[50%]
                        "
                        style={{
                            background:
                                "radial-gradient(ellipse at center, rgba(255,115,0,0.86) 0%, rgba(249,115,22,0.62) 21%, rgba(194,65,12,0.40) 41%, rgba(124,45,18,0.18) 57%, transparent 72%)",
                        }}
                    />
                </motion.div>

                {/* =================================================
                    ORANGE FIRE LIGHT RIM
                ================================================== */}

                {/* LIGHT MODE RIM */}

                <motion.div
                    style={{
                        y: orangeY,
                        scale: orangeScale,
                        opacity: orangeOpacity,
                    }}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[59%]
                        z-[2]
                        h-[25vw]
                        w-[150vw]
                        min-h-[210px]
                        min-w-[980px]
                        -translate-x-1/2
                        rounded-[50%]
                        border-t
                        border-orange-400/35
                        bg-transparent
                        shadow-[0_-8px_45px_rgba(249,115,22,0.18)]
                        blur-[1px]
                        dark:hidden
                    "
                />

                {/* DARK MODE RIM */}

                <motion.div
                    style={{
                        y: orangeY,
                        scale: orangeScale,
                        opacity: orangeOpacity,
                    }}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[59%]
                        z-[2]
                        hidden
                        h-[25vw]
                        w-[150vw]
                        min-h-[210px]
                        min-w-[980px]
                        -translate-x-1/2
                        rounded-[50%]
                        border-t
                        border-orange-300/50
                        bg-transparent
                        shadow-[0_-10px_55px_rgba(249,115,22,0.42)]
                        blur-[1px]
                        dark:block
                    "
                />

                {/* =================================================
                    CENTER FIRE GLOW
                ================================================== */}

                {/* LIGHT MODE */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.7,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 1.6,
                        delay: 0.1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[53%]
                        z-0
                        h-[420px]
                        w-[700px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-orange-400/[0.045]
                        blur-[120px]
                        dark:hidden
                    "
                />

                {/* DARK MODE */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.7,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        duration: 1.6,
                        delay: 0.1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[53%]
                        z-0
                        hidden
                        h-[420px]
                        w-[700px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-orange-500/[0.10]
                        blur-[120px]
                        dark:block
                    "
                />

                {/* =================================================
                    SMALL FIRE CORE
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.5,
                    }}
                    animate={{
                        opacity: [0, 0.7, 0.35],
                        scale: [0.5, 1.05, 1],
                    }}
                    transition={{
                        duration: 2.4,
                        delay: 0.4,
                        ease: "easeOut",
                    }}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[55%]
                        z-[2]
                        h-[150px]
                        w-[420px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-orange-400/[0.06]
                        blur-[80px]
                        dark:bg-orange-400/[0.10]
                    "
                />

                {/* =================================================
                    HERO CONTENT
                ================================================== */}

                <motion.div
                    style={{
                        y: contentY,
                        opacity: contentOpacity,
                    }}
                    className="
                        relative
                        z-10
                        mx-auto
                        flex
                        h-full
                        w-full
                        max-w-7xl
                        flex-col
                        items-center
                        justify-center
                        px-5
                        pb-[8vh]
                        text-center
                        sm:px-8
                    "
                >
                    {/* =================================================
                        EYEBROW
                    ================================================== */}


                    {/* =================================================
                        HEADLINE
                    ================================================== */}

                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 28,
                            filter: "blur(10px)",
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                        }}
                        transition={{
                            duration: 0.9,
                            delay: 0.05,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        className="
                            max-w-[1450px]
                            text-balance
                            text-[54px]
                            font-medium
                            leading-[0.88]
                            tracking-[-0.065em]
                            text-zinc-950
                            sm:text-[72px]
                            md:text-[92px]
                            lg:text-[112px]
                            xl:text-[132px]
                            2xl:text-[148px]
                            dark:text-white
                        "
                    >
                        FIND BUSINESSES
                        <br />

                        <span
                            className="
                                text-zinc-900
                                dark:text-zinc-200
                            "
                        >
                            WITH FYNDYRIX
                        </span>
                    </motion.h1>

                    {/* =================================================
                        DESCRIPTION
                    ================================================== */}

                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 16,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.2,
                        }}
                        className="
                            mt-7
                            max-w-2xl
                            text-sm
                            leading-6
                            text-zinc-900
                            sm:text-base
                            sm:leading-7
                            dark:text-zinc-400
                        "
                    >
                        Discover businesses, uncover
                        digital gaps, and find
                        opportunities worth pursuing.
                    </motion.p>

                    {/* =================================================
                        BUTTONS
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 16,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.3,
                        }}
                        className="
                            mt-7
                            flex
                            w-full
                            flex-col
                            items-center
                            justify-center
                            gap-2.5
                            sm:w-auto
                            sm:flex-row
                        "
                    >
                        <MoneyFlowButton />

                        <Link
                            to="/customers"
                            className="
                                flex
                                h-11
                                w-full
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-zinc-200
                                bg-white/70
                                px-6
                                text-sm
                                font-semibold
                                text-zinc-800
                                backdrop-blur-md
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:border-orange-200
                                hover:bg-white
                                hover:shadow-[0_12px_35px_rgba(249,115,22,0.08)]
                                sm:h-12
                                sm:w-auto
                                dark:border-white/10
                                dark:bg-white/[0.04]
                                dark:text-zinc-200
                                dark:hover:border-orange-400/20
                                dark:hover:bg-white/[0.07]
                            "
                        >
                            Talk to sales
                        </Link>
                    </motion.div>

                    {/* =================================================
                        SUPPORTING TEXT
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.7,
                            delay: 0.45,
                        }}
                        className="
                            mt-4
                            text-[40px]
                            font-medium
                            uppercase
                            tracking-[0.16em]
                            text-zinc-900
                            dark:text-zinc-200
                        "
                    >
                        Find the opportunity before
                        you make the pitch.
                    </motion.div>
                </motion.div>

              

            </div>
        </section>
    );
}

export default HeroSection;