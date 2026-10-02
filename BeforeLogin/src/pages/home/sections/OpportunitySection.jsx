import { useRef } from "react";
import { motion, useInView } from "motion/react";

import {
    ArrowUpRight,
    Database,
    Globe2,
    Search,
    Sparkles,
    Target,
} from "lucide-react";

/* ============================================================
   STATIC SIGNAL CARDS
============================================================ */

const signals = [
    {
        label: "Website",
        value: "Needs improvement",
        icon: Globe2,
        position:
            "left-[2%] top-[15%] sm:left-[5%] sm:top-[20%]",
        delay: 0.2,
    },
    {
        label: "Visibility",
        value: "Low presence",
        icon: Search,
        position:
            "right-[2%] top-[18%] sm:right-[5%] sm:top-[23%]",
        delay: 0.35,
    },
    {
        label: "Marketing",
        value: "Opportunity detected",
        icon: Target,
        position:
            "left-[5%] bottom-[18%] sm:left-[8%] sm:bottom-[20%]",
        delay: 0.5,
    },
    {
        label: "Competition",
        value: "Gap identified",
        icon: Sparkles,
        position:
            "right-[4%] bottom-[20%] sm:right-[8%] sm:bottom-[22%]",
        delay: 0.65,
    },
];

/* ============================================================
   MAIN SECTION
============================================================ */

function OpportunitySection() {
    const sectionRef = useRef(null);

    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.18,
    });

    return (
        <section
            ref={sectionRef}
            className="
                relative
                min-h-screen
                w-full
                overflow-hidden
                border-t
                border-zinc-200
                bg-white
                text-zinc-950
                transition-colors
                duration-300
                dark:border-zinc-800
                dark:bg-[#08090d]
                dark:text-white
            "
        >
            {/* =====================================================
                CREATIVE ARRIVAL LIGHT
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    scaleX: 0,
                }}
                animate={
                    isInView
                        ? {
                              opacity: [0, 1, 0.45],
                              scaleX: [0, 1, 1],
                          }
                        : {}
                }
                transition={{
                    duration: 1.5,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="
                    pointer-events-none
                    absolute
                    left-0
                    right-0
                    top-0
                    z-30
                    h-px
                    origin-left
                    bg-gradient-to-r
                    from-transparent
                    via-cyan-400/70
                    to-transparent
                    blur-[1px]
                "
            />

            {/* =====================================================
                BACKGROUND GRID
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={
                    isInView
                        ? {
                              opacity: 0.5,
                          }
                        : {}
                }
                transition={{
                    duration: 1.2,
                    delay: 0.2,
                }}
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    dark:opacity-30
                "
                style={{
                    backgroundImage: `
                        linear-gradient(
                            to right,
                            rgba(161,161,170,0.08) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            to bottom,
                            rgba(161,161,170,0.08) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* =====================================================
                CENTRAL ATMOSPHERE
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.4,
                }}
                animate={
                    isInView
                        ? {
                              opacity: 1,
                              scale: 1,
                          }
                        : {}
                }
                transition={{
                    duration: 1.8,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[52%]
                    h-[700px]
                    w-[700px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-cyan-400/[0.045]
                    blur-[120px]
                    dark:bg-cyan-400/[0.04]
                "
            />

            {/* =====================================================
                SECONDARY ORBIT GLOW
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.3,
                }}
                animate={
                    isInView
                        ? {
                              opacity: [0, 0.7, 0.35],
                              scale: [0.3, 1.15, 1],
                          }
                        : {}
                }
                transition={{
                    duration: 2.2,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-[52%]
                    h-[380px]
                    w-[380px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-cyan-400/[0.07]
                    blur-[1px]
                "
            />

            {/* =====================================================
                HEADER
            ====================================================== */}

            <div
                className="
                    relative
                    z-20
                    mx-auto
                    flex
                    w-full
                    max-w-6xl
                    flex-col
                    items-center
                    px-6
                    pb-10
                    pt-24
                    text-center
                    sm:px-8
                    sm:pt-28
                "
            >
             

                {/* Main heading */}

                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 60,
                        scale: 0.94,
                        filter: "blur(12px)",
                    }}
                    animate={
                        isInView
                            ? {
                                  opacity: 1,
                                  y: 0,
                                  scale: 1,
                                  filter: "blur(0px)",
                              }
                            : {}
                    }
                    transition={{
                        duration: 1,
                        delay: 0.28,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                        mt-6
                        uppercase
                        max-w-4xl
                        text-balance
                        text-[44px]
                        font-semibold
                        leading-[0.98]
                        tracking-[-0.055em]
                        sm:text-6xl
                        lg:text-[76px]
                    "
                >
                    Don't search for leads.
                    <br />

                    <motion.span
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      y: 0,
                                  }
                                : {}
                        }
                        transition={{
                            duration: 0.7,
                            delay: 0.65,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="
                            inline-block
                            text-zinc-900
                            dark:text-zinc-400
                        "
                    >
                        Find the opportunity.
                    </motion.span>
                </motion.h2>

                {/* Description */}

                <motion.p
                    initial={{
                        opacity: 0,
                        y: 25,
                        filter: "blur(5px)",
                    }}
                    animate={
                        isInView
                            ? {
                                  opacity: 1,
                                  y: 0,
                                  filter: "blur(0px)",
                              }
                            : {}
                    }
                    transition={{
                        duration: 0.8,
                        delay: 0.72,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                        mt-6
                        max-w-2xl
                        text-sm
                        leading-6
                        text-zinc-500
                        dark:text-zinc-400
                        sm:text-base
                        sm:leading-7
                    "
                >
                    FYNDREX looks beyond business
                    listings. It connects business
                    data, digital signals, and
                    competitive gaps to reveal
                    where your next opportunity
                    is hiding.
                </motion.p>
            </div>

            {/* =====================================================
                INTELLIGENCE VISUAL
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 140,
                    scale: 0.84,
                    rotateX: 12,
                    filter: "blur(14px)",
                }}
                animate={
                    isInView
                        ? {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              rotateX: 0,
                              filter: "blur(0px)",
                          }
                        : {}
                }
                transition={{
                    duration: 1.35,
                    delay: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                    transformPerspective: 1200,
                }}
                className="
                    relative
                    mx-auto
                    h-[560px]
                    w-full
                    max-w-6xl
                    px-4
                    sm:h-[620px]
                    sm:px-8
                "
            >
                {/* =================================================
                    CENTRAL ARRIVAL PULSE
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0,
                    }}
                    animate={
                        isInView
                            ? {
                                  opacity: [0, 0.9, 0.2],
                                  scale: [0, 1.3, 1],
                              }
                            : {}
                    }
                    transition={{
                        duration: 1.8,
                        delay: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        z-[1]
                        h-[300px]
                        w-[300px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        border
                        border-cyan-400/20
                    "
                />

                {/* =================================================
                    CONNECTION LINES
                ================================================== */}

                <svg
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-[2]
                        h-full
                        w-full
                    "
                    viewBox="0 0 1200 620"
                    preserveAspectRatio="none"
                    fill="none"
                >
                    {/* Top left */}

                    <motion.path
                        d="
                            M 150 140
                            C 300 170
                            370 250
                            600 310
                        "
                        stroke="currentColor"
                        className="
                            text-zinc-300
                            dark:text-zinc-700
                        "
                        strokeWidth="1"
                        strokeDasharray="5 8"
                        initial={{
                            pathLength: 0,
                            opacity: 0,
                        }}
                        animate={
                            isInView
                                ? {
                                      pathLength: 1,
                                      opacity: 1,
                                  }
                                : {}
                        }
                        transition={{
                            duration: 1.4,
                            delay: 1.05,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    />

                    {/* Top right */}

                    <motion.path
                        d="
                            M 1050 150
                            C 900 170
                            830 250
                            600 310
                        "
                        stroke="currentColor"
                        className="
                            text-zinc-300
                            dark:text-zinc-700
                        "
                        strokeWidth="1"
                        strokeDasharray="5 8"
                        initial={{
                            pathLength: 0,
                            opacity: 0,
                        }}
                        animate={
                            isInView
                                ? {
                                      pathLength: 1,
                                      opacity: 1,
                                  }
                                : {}
                        }
                        transition={{
                            duration: 1.4,
                            delay: 1.18,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    />

                    {/* Bottom left */}

                    <motion.path
                        d="
                            M 190 490
                            C 340 450
                            420 390
                            600 310
                        "
                        stroke="currentColor"
                        className="
                            text-zinc-300
                            dark:text-zinc-700
                        "
                        strokeWidth="1"
                        strokeDasharray="5 8"
                        initial={{
                            pathLength: 0,
                            opacity: 0,
                        }}
                        animate={
                            isInView
                                ? {
                                      pathLength: 1,
                                      opacity: 1,
                                  }
                                : {}
                        }
                        transition={{
                            duration: 1.4,
                            delay: 1.31,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    />

                    {/* Bottom right */}

                    <motion.path
                        d="
                            M 1010 480
                            C 870 450
                            790 390
                            600 310
                        "
                        stroke="currentColor"
                        className="
                            text-zinc-300
                            dark:text-zinc-700
                        "
                        strokeWidth="1"
                        strokeDasharray="5 8"
                        initial={{
                            pathLength: 0,
                            opacity: 0,
                        }}
                        animate={
                            isInView
                                ? {
                                      pathLength: 1,
                                      opacity: 1,
                                  }
                                : {}
                        }
                        transition={{
                            duration: 1.4,
                            delay: 1.44,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    />
                </svg>

                {/* =================================================
                    SIGNAL CARDS
                ================================================== */}

                {signals.map((signal) => {
                    const Icon = signal.icon;

                    const comesFromLeft =
                        signal.position.includes("left");

                    const comesFromTop =
                        signal.position.includes("top");

                    return (
                        <motion.div
                            key={signal.label}
                            initial={{
                                opacity: 0,
                                x: comesFromLeft
                                    ? -55
                                    : 55,
                                y: comesFromTop
                                    ? -55
                                    : 55,
                                scale: 0.78,
                                rotate: comesFromLeft
                                    ? -5
                                    : 5,
                                filter: "blur(8px)",
                            }}
                            animate={
                                isInView
                                    ? {
                                          opacity: 1,
                                          x: 0,
                                          y: 0,
                                          scale: 1,
                                          rotate: 0,
                                          filter: "blur(0px)",
                                      }
                                    : {}
                            }
                            transition={{
                                duration: 0.95,
                                delay:
                                    1.05 +
                                    signal.delay,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`
                                absolute
                                ${signal.position}
                                z-10
                                w-[155px]
                                sm:w-[190px]
                            `}
                        >
                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-zinc-200
                                    bg-white/80
                                    p-3
                                    text-left
                                    shadow-[0_15px_40px_rgba(0,0,0,0.06)]
                                    backdrop-blur-xl
                                    dark:border-zinc-800
                                    dark:bg-[#101218]/80
                                    dark:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-7
                                            w-7
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-zinc-100
                                            text-zinc-500
                                            dark:bg-zinc-800
                                            dark:text-zinc-400
                                        "
                                    >
                                        <Icon size={14} />
                                    </div>

                                    <ArrowUpRight
                                        size={13}
                                        className="
                                            text-zinc-400
                                            dark:text-zinc-600
                                        "
                                    />
                                </div>

                                <div
                                    className="
                                        mt-3
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.15em]
                                        text-zinc-400
                                    "
                                >
                                    {signal.label}
                                </div>

                                <div
                                    className="
                                        mt-1
                                        text-xs
                                        font-medium
                                        text-zinc-800
                                        dark:text-zinc-200
                                    "
                                >
                                    {signal.value}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* =================================================
                    CENTRAL SCANNER
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.35,
                        rotate: -18,
                        filter: "blur(12px)",
                    }}
                    animate={
                        isInView
                            ? {
                                  opacity: 1,
                                  scale: 1,
                                  rotate: 0,
                                  filter: "blur(0px)",
                              }
                            : {}
                    }
                    transition={{
                        duration: 1.15,
                        delay: 1.35,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        z-20
                        flex
                        -translate-x-1/2
                        -translate-y-1/2
                        items-center
                        justify-center
                    "
                >
                    {/* Outer ring */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.6,
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      scale: 1,
                                      rotate: 360,
                                  }
                                : {}
                        }
                        transition={{
                            opacity: {
                                duration: 0.7,
                                delay: 1.55,
                            },
                            scale: {
                                duration: 1,
                                delay: 1.45,
                                ease: [0.16, 1, 0.3, 1],
                            },
                            rotate: {
                                duration: 18,
                                delay: 1.8,
                                repeat: Infinity,
                                ease: "linear",
                            },
                        }}
                        className="
                            absolute
                            h-[250px]
                            w-[250px]
                            rounded-full
                            border
                            border-dashed
                            border-cyan-400/20
                        "
                    />

                    {/* Middle ring */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      scale: 1,
                                      rotate: -360,
                                  }
                                : {}
                        }
                        transition={{
                            opacity: {
                                duration: 0.6,
                                delay: 1.65,
                            },
                            scale: {
                                duration: 0.9,
                                delay: 1.55,
                                ease: [0.16, 1, 0.3, 1],
                            },
                            rotate: {
                                duration: 12,
                                delay: 1.8,
                                repeat: Infinity,
                                ease: "linear",
                            },
                        }}
                        className="
                            absolute
                            h-[190px]
                            w-[190px]
                            rounded-full
                            border
                            border-cyan-400/15
                        "
                    />

                    {/* Glow */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.3,
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: [
                                          0,
                                          0.45,
                                          0.25,
                                      ],
                                      scale: [
                                          0.3,
                                          1.08,
                                          0.95,
                                      ],
                                  }
                                : {}
                        }
                        transition={{
                            duration: 1.5,
                            delay: 1.45,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="
                            absolute
                            h-40
                            w-40
                            rounded-full
                            bg-cyan-400/10
                            blur-3xl
                        "
                    />

                    {/* Scanner */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      scale: 1,
                                  }
                                : {}
                        }
                        transition={{
                            duration: 0.8,
                            delay: 1.55,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="
                            relative
                            flex
                            h-[130px]
                            w-[130px]
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-cyan-400/30
                            bg-white/80
                            shadow-[0_0_70px_rgba(34,211,238,0.12)]
                            backdrop-blur-xl
                            dark:bg-[#0c1118]/90
                        "
                    >
                        <div
                            className="
                                absolute
                                inset-3
                                rounded-full
                                border
                                border-zinc-200
                                dark:border-zinc-800
                            "
                        />

                        <div className="relative text-center">
                            <div
                                className="
                                    text-[10px]
                                    font-semibold
                                    tracking-[0.28em]
                                    text-cyan-500
                                    dark:text-cyan-300
                                "
                            >
                                FYNDREX
                            </div>

                            <div
                                className="
                                    mt-2
                                    flex
                                    items-center
                                    justify-center
                                    gap-1.5
                                    text-[9px]
                                    uppercase
                                    tracking-[0.18em]
                                    text-zinc-400
                                "
                            >
                                <span
                                    className="
                                        h-1.5
                                        w-1.5
                                        animate-pulse
                                        rounded-full
                                        bg-cyan-400
                                    "
                                />

                                Scanning
                            </div>
                        </div>
                    </motion.div>

                    {/* Scanner beam */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            rotate: -90,
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: 1,
                                      rotate: 360,
                                  }
                                : {}
                        }
                        transition={{
                            opacity: {
                                duration: 0.5,
                                delay: 1.8,
                            },
                            rotate: {
                                duration: 4,
                                delay: 1.8,
                                repeat: Infinity,
                                ease: "linear",
                            },
                        }}
                        className="
                            pointer-events-none
                            absolute
                            h-[220px]
                            w-[2px]
                            origin-bottom
                            bg-gradient-to-t
                            from-cyan-400/60
                            via-cyan-400/10
                            to-transparent
                        "
                        style={{
                            transformOrigin:
                                "50% 100%",
                        }}
                    />

                    {/* Center pulse */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0,
                        }}
                        animate={
                            isInView
                                ? {
                                      opacity: [
                                          0,
                                          0.8,
                                          0,
                                      ],
                                      scale: [
                                          0,
                                          1.8,
                                          2.4,
                                      ],
                                  }
                                : {}
                        }
                        transition={{
                            duration: 1.6,
                            delay: 1.8,
                            ease: "easeOut",
                        }}
                        className="
                            pointer-events-none
                            absolute
                            h-8
                            w-8
                            rounded-full
                            border
                            border-cyan-400/40
                        "
                    />
                </motion.div>

                {/* =================================================
                    OPPORTUNITY RESULT
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 70,
                        scale: 0.82,
                        rotateX: 18,
                        filter: "blur(10px)",
                    }}
                    animate={
                        isInView
                            ? {
                                  opacity: 1,
                                  y: 0,
                                  scale: 1,
                                  rotateX: 0,
                                  filter: "blur(0px)",
                              }
                            : {}
                    }
                    transition={{
                        duration: 1,
                        delay: 2.15,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                        transformPerspective: 1000,
                    }}
                    className="
                        absolute
                        bottom-[4%]
                        left-1/2
                        z-30
                        w-[240px]
                        -translate-x-1/2
                        sm:bottom-[7%]
                        sm:w-[280px]
                    "
                >
                    <div
                        className="
                            rounded-2xl
                            border
                            border-cyan-400/20
                            bg-white/90
                            p-4
                            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                            backdrop-blur-xl
                            dark:border-cyan-400/15
                            dark:bg-[#101218]/90
                            dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-7
                                        w-7
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-cyan-400/10
                                        text-cyan-500
                                        dark:text-cyan-300
                                    "
                                >
                                    <Target size={14} />
                                </span>

                                <span
                                    className="
                                        text-xs
                                        font-semibold
                                        text-zinc-800
                                        dark:text-zinc-200
                                    "
                                >
                                    Opportunity
                                    detected
                                </span>
                            </div>

                            <span
                                className="
                                    rounded-full
                                    border
                                    border-cyan-400/20
                                    bg-cyan-400/10
                                    px-2
                                    py-1
                                    text-[8px]
                                    font-semibold
                                    tracking-[0.14em]
                                    text-cyan-600
                                    dark:text-cyan-300
                                "
                            >
                                HIGH SIGNAL
                            </span>
                        </div>

                        <div
                            className="
                                mt-4
                                text-lg
                                font-semibold
                                tracking-tight
                                text-zinc-900
                                dark:text-white
                            "
                        >
                            Website optimization
                        </div>

                        <div
                            className="
                                mt-1
                                text-xs
                                leading-5
                                text-zinc-500
                                dark:text-zinc-500
                            "
                        >
                            A measurable gap was
                            detected between this
                            business and its
                            competitors.
                        </div>

                        <div
                            className="
                                mt-4
                                h-px
                                w-full
                                bg-gradient-to-r
                                from-transparent
                                via-cyan-400/30
                                to-transparent
                            "
                        />

                        <div
                            className="
                                mt-3
                                flex
                                items-center
                                justify-between
                                text-[9px]
                                uppercase
                                tracking-[0.14em]
                                text-zinc-400
                            "
                        >
                            <span>
                                Signal strength
                            </span>

                            <motion.span
                                initial={{
                                    opacity: 0,
                                    x: 10,
                                }}
                                animate={
                                    isInView
                                        ? {
                                              opacity: 1,
                                              x: 0,
                                          }
                                        : {}
                                }
                                transition={{
                                    duration: 0.5,
                                    delay: 2.8,
                                }}
                                className="
                                    font-semibold
                                    text-cyan-500
                                "
                            >
                                92%
                            </motion.span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* =====================================================
                BOTTOM MESSAGE
            ====================================================== */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                animate={
                    isInView
                        ? {
                              opacity: 1,
                              y: 0,
                          }
                        : {}
                }
                transition={{
                    duration: 0.7,
                    delay: 2.55,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="
                    relative
                    z-20
                    mx-auto
                    max-w-6xl
                    px-6
                    pb-20
                    pt-2
                    sm:px-8
                "
            >
                <div
                    className="
                        flex
                        flex-col
                        items-center
                        justify-between
                        gap-4
                        border-t
                        border-zinc-200
                        pt-5
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        text-zinc-400
                        sm:flex-row
                        dark:border-zinc-800
                    "
                >
                    <span>
                        Data → Signal → Opportunity
                    </span>

                    <span>
                        FYNDREX Intelligence Engine
                    </span>
                </div>
            </motion.div>
        </section>
    );
}

export default OpportunitySection;