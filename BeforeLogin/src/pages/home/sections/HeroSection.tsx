import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Coins,
    MessageCircle,
    Sparkles,
} from "lucide-react";


/* ============================================================
   MONEY FLOW START BUTTON
============================================================ */

function MoneyFlowButton() {
    const coins = [
        {
            id: 1,
            delay: 0,
            x: -72,
            y: -18,
        },
        {
            id: 2,
            delay: 0.18,
            x: -105,
            y: 12,
        },
        {
            id: 3,
            delay: 0.36,
            x: -82,
            y: 42,
        },
        {
            id: 4,
            delay: 0.54,
            x: -125,
            y: 30,
        },
    ];

    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative"
        >
            {/* ====================================================
                CLIENT SIGNAL
            ===================================================== */}

            <motion.div
                variants={{
                    rest: {
                        opacity: 0,
                        x: 12,
                        scale: 0.8,
                    },
                    hover: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                    },
                }}
                transition={{
                    duration: 0.3,
                }}
                className="
                    pointer-events-none
                    absolute
                    -left-[116px]
                    top-1/2
                    z-30
                    hidden
                    -translate-y-1/2
                    sm:block
                "
            >
                <div
                    className="
                        relative
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-zinc-200
                        bg-white/90
                        px-2.5
                        py-2
                        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                        backdrop-blur-xl
                        dark:border-zinc-700
                        dark:bg-[#111318]/90
                    "
                >
                  

                 

                    {/* connector */}

               
                </div>
            </motion.div>


            {/* ====================================================
                MONEY PARTICLES
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-20
                "
            >
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
                                opacity: [
                                    0,
                                    1,
                                    1,
                                    0,
                                ],
                                x: [
                                    coin.x,
                                    coin.x + 35,
                                    coin.x + 70,
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
                                    0.25,
                                ],
                            },
                        }}
                        transition={{
                            duration: 1.1,
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
                            border-emerald-400/40
                            bg-emerald-400/10
                            text-[9px]
                            font-bold
                            text-emerald-500
                            shadow-[0_0_15px_rgba(16,185,129,0.25)]
                            dark:text-emerald-300
                        "
                    >
                        ₹
                    </motion.div>
                ))}
            </div>


            {/* ====================================================
                SPARK PARTICLES
            ===================================================== */}

            <motion.div
                variants={{
                    rest: {
                        opacity: 0,
                    },
                    hover: {
                        opacity: 1,
                    },
                }}
                className="
                    pointer-events-none
                    absolute
                    -inset-4
                    z-0
                    rounded-2xl
                    bg-emerald-400/10
                    blur-xl
                "
            />

            <motion.div
                variants={{
                    rest: {
                        scale: 0,
                        opacity: 0,
                    },
                    hover: {
                        scale: 1,
                        opacity: 1,
                    },
                }}
                transition={{
                    duration: 0.3,
                }}
                className="
                    pointer-events-none
                    absolute
                    -right-2
                    -top-2
                    z-30
                "
            >
                <Sparkles
                    size={13}
                    className="
                        text-emerald-400
                        drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]
                    "
                />
            </motion.div>


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
                    hover:shadow-[0_12px_35px_rgba(16,185,129,0.18)]

                    dark:bg-white
                    dark:text-zinc-950
                    dark:hover:bg-zinc-100

                    sm:h-12
                "
            >
                {/* ==================================================
                    BUTTON MONEY GLOW
                =================================================== */}

                <motion.div
                    variants={{
                        rest: {
                            x: "-120%",
                            opacity: 0,
                        },
                        hover: {
                            x: "120%",
                            opacity: 1,
                        },
                    }}
                    transition={{
                        duration: 0.75,
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
                        via-emerald-400/30
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
                        duration: 0.2,
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
                        duration: 0.25,
                        delay: 0.05,
                    }}
                    className="
                        absolute
                        flex
                        items-center
                        gap-2
                        text-emerald-400
                        dark:text-emerald-600
                    "
                >
                    Opportunity incoming

                    <Coins
                        size={15}
                    />
                </motion.span>
            </Link>
        </motion.div>
    );
}


/* ============================================================
   HERO
============================================================ */

function HeroSection() {
    return (
        <section
            className="
                relative
                z-0
                flex
                h-screen
                min-h-screen
                items-center
                justify-center
                overflow-hidden
                bg-white
                px-5
                transition-colors
                duration-300
                dark:bg-[#08090d]
                sm:px-6
                lg:px-8
            "
        >
            {/* ====================================================
                SQUARE GRID
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.45]
                    dark:opacity-[0.22]
                "
                style={{
                    backgroundImage: `
                        linear-gradient(
                            to right,
                            rgba(24,24,27,0.08) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            to bottom,
                            rgba(24,24,27,0.08) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: "64px 64px",
                    maskImage:
                        "radial-gradient(ellipse 75% 65% at 50% 45%, black 35%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 75% 65% at 50% 45%, black 35%, transparent 100%)",
                }}
            />

            {/* ====================================================
                DARK GRID
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    hidden
                    dark:block
                "
                style={{
                    backgroundImage: `
                        linear-gradient(
                            to right,
                            rgba(255,255,255,0.055) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            to bottom,
                            rgba(255,255,255,0.055) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: "64px 64px",
                    maskImage:
                        "radial-gradient(ellipse 75% 65% at 50% 45%, black 35%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 75% 65% at 50% 45%, black 35%, transparent 100%)",
                }}
            />

            {/* ====================================================
                CENTER GLOW
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-[520px]
                    w-[520px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-zinc-200/30
                    blur-3xl
                    dark:bg-cyan-400/[0.035]
                "
            />

            {/* ====================================================
                CONTENT
            ===================================================== */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    w-full
                    max-w-6xl
                    flex-col
                    items-center
                    text-center
                "
            >
                {/* HEADLINE */}

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 18,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                        ],
                    }}
                    className="
                        max-w-6xl
                        text-balance
                        text-[56px]
                        font-semibold
                        leading-[0.9]
                        tracking-[-0.065em]
                        text-zinc-950
                        transition-colors
                        duration-300
                        dark:text-white
                        sm:text-[68px]
                        md:text-[82px]
                        lg:text-[104px]
                        xl:text-[118px]
                    "
                >
                    Find businesses
                    <br />

                    <span
                        className="
                            text-zinc-900
                            transition-colors
                            duration-300
                            dark:text-zinc-200
                        "
                    >
                        that need what you sell.
                    </span>
                </motion.h1>


                {/* DESCRIPTION */}

                <motion.p
                    initial={{
                        opacity: 0,
                        y: 12,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.65,
                        delay: 0.12,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                        ],
                    }}
                    className="
                        mt-5
                        max-w-xl
                        text-[14px]
                        font-medium
                        leading-6
                        tracking-[-0.015em]
                        text-zinc-500
                        transition-colors
                        duration-300
                        dark:text-zinc-400
                        sm:mt-6
                        sm:text-base
                        sm:leading-7
                    "
                >
                    Discover businesses, uncover
                    digital gaps, and find
                    opportunities worth pursuing.
                </motion.p>


                {/* ==================================================
                    ACTIONS
                =================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 12,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.65,
                        delay: 0.22,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                        ],
                    }}
                    className="
                        mt-6
                        flex
                        w-full
                        flex-col
                        items-stretch
                        gap-2.5
                        sm:w-auto
                        sm:flex-row
                        sm:items-center
                    "
                >
                    {/* NEW ANIMATED BUTTON */}

                    <MoneyFlowButton />


                    {/* TALK TO SALES */}

                    <Link
                        to="/customers"
                        className="
                            flex
                            h-11
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-zinc-200
                            bg-white/80
                            px-6
                            text-sm
                            font-semibold
                            tracking-[-0.01em]
                            text-zinc-800
                            backdrop-blur-sm
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:bg-zinc-50
                            hover:shadow-md
                            dark:border-zinc-700
                            dark:bg-[#111318]/80
                            dark:text-zinc-200
                            dark:hover:border-zinc-600
                            dark:hover:bg-zinc-900
                            sm:h-12
                        "
                    >
                        Talk to sales
                    </Link>
                </motion.div>


                {/* SUPPORTING LINE */}

                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.38,
                    }}
                    className="
                        mt-3
                        text-[10px]
                        font-medium
                        tracking-[0.02em]
                        text-zinc-400
                        transition-colors
                        duration-300
                        dark:text-zinc-500
                        sm:text-[11px]
                    "
                >
                    Find the opportunity before you
                    make the pitch.
                </motion.p>
            </div>
        </section>
    );
}

export default HeroSection;