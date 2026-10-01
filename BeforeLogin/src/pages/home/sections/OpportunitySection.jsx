import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import {
    ArrowUpRight,
    Database,
    Globe2,
    Mail,
    MessageCircle,
    Search,
    Sparkles,
    Target,
    UserRound,
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
   FLOATING INTELLIGENCE MESSAGES
============================================================ */

const floatingMessages = [
    {
        type: "CLIENT",
        message: "Hey 👋",
        icon: UserRound,
    },
    {
        type: "CLIENT",
        message: "I need more customers",
        icon: MessageCircle,
    },
    {
        type: "BUSINESS",
        message: "Something feels off",
        icon: Globe2,
    },
    {
        type: "VISIBILITY",
        message: "People aren't finding me",
        icon: Search,
    },
    {
        type: "ENRICHMENT",
        message: "Contact found",
        icon: Mail,
    },
    {
        type: "DATA",
        message: "Business signal detected",
        icon: Database,
    },
    {
        type: "OPPORTUNITY",
        message: "There's something here",
        icon: Target,
    },
];

/* ============================================================
   MOUSE PAINT CANVAS
============================================================ */

function MouseSignalCanvas({ onSignal }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const mouseRef = useRef({
        x: 0,
        y: 0,
        previousX: 0,
        previousY: 0,
        active: false,
        velocity: 0,
    });

    const particlesRef = useRef([]);
    const animationRef = useRef(null);
    const lastSpawnRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;

        if (!canvas || !container) return;

        const context = canvas.getContext("2d");

        if (!context) return;

        let width = 0;
        let height = 0;

        /* --------------------------------------------------------
           RESIZE
        -------------------------------------------------------- */

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();

            const pixelRatio = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            width = rect.width;
            height = rect.height;

            canvas.width = width * pixelRatio;
            canvas.height = height * pixelRatio;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            context.setTransform(
                pixelRatio,
                0,
                0,
                pixelRatio,
                0,
                0
            );
        };

        resizeCanvas();

        const resizeObserver = new ResizeObserver(
            resizeCanvas
        );

        resizeObserver.observe(container);

        /* --------------------------------------------------------
           MOUSE MOVE
        -------------------------------------------------------- */

        const handlePointerMove = (event) => {
            const rect = container.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const mouse = mouseRef.current;

            const dx = x - mouse.x;
            const dy = y - mouse.y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            mouse.previousX = mouse.x;
            mouse.previousY = mouse.y;

            mouse.x = x;
            mouse.y = y;
            mouse.active = true;

            mouse.velocity = Math.min(
                distance / 8,
                3
            );

            /* ----------------------------------------------------
               CREATE PAINT PARTICLES
            ---------------------------------------------------- */

            if (distance > 1) {
                const particleCount = Math.min(
                    Math.ceil(distance / 4),
                    10
                );

                for (
                    let i = 0;
                    i < particleCount;
                    i++
                ) {
                    particlesRef.current.push({
                        x:
                            x +
                            (Math.random() - 0.5) *
                                18,
                        y:
                            y +
                            (Math.random() - 0.5) *
                                18,

                        vx:
                            dx * 0.018 +
                            (Math.random() - 0.5) *
                                0.5,

                        vy:
                            dy * 0.018 +
                            (Math.random() - 0.5) *
                                0.5,

                        size:
                            Math.random() * 2.5 +
                            0.8,

                        life: 1,

                        decay:
                            Math.random() * 0.012 +
                            0.008,
                    });
                }
            }

            /* ----------------------------------------------------
               SPAWN INTELLIGENCE MESSAGE
            ---------------------------------------------------- */

            const now = performance.now();

            if (
                distance > 8 &&
                now - lastSpawnRef.current > 650
            ) {
                lastSpawnRef.current = now;

                onSignal({
                    ...floatingMessages[
                        Math.floor(
                            Math.random() *
                                floatingMessages.length
                        )
                    ],

                    id:
                        `${now}-${Math.random()}`,

                    x,

                    y,

                    vx:
                        dx * 0.04 +
                        (Math.random() - 0.5) *
                            0.4,

                    vy:
                        dy * 0.04 -
                        Math.random() * 0.4,
                });
            }
        };

        const handlePointerLeave = () => {
            mouseRef.current.active = false;
        };

        container.addEventListener(
            "pointermove",
            handlePointerMove
        );

        container.addEventListener(
            "pointerleave",
            handlePointerLeave
        );

        /* --------------------------------------------------------
           DRAW PAINT
        -------------------------------------------------------- */

        const draw = () => {
            context.clearRect(
                0,
                0,
                width,
                height
            );

            const mouse = mouseRef.current;

            /* ----------------------------------------------------
               MOUSE GLOW
            ---------------------------------------------------- */

            if (mouse.active) {
                const gradient =
                    context.createRadialGradient(
                        mouse.x,
                        mouse.y,
                        0,
                        mouse.x,
                        mouse.y,
                        180
                    );

                gradient.addColorStop(
                    0,
                    "rgba(34,211,238,0.09)"
                );

                gradient.addColorStop(
                    0.4,
                    "rgba(34,211,238,0.035)"
                );

                gradient.addColorStop(
                    1,
                    "rgba(34,211,238,0)"
                );

                context.fillStyle = gradient;

                context.beginPath();

                context.arc(
                    mouse.x,
                    mouse.y,
                    180,
                    0,
                    Math.PI * 2
                );

                context.fill();
            }

            /* ----------------------------------------------------
               PAINT PARTICLES
            ---------------------------------------------------- */

            const particles =
                particlesRef.current;

            for (
                let i = particles.length - 1;
                i >= 0;
                i--
            ) {
                const particle = particles[i];

                particle.x += particle.vx;
                particle.y += particle.vy;

                particle.vx *= 0.985;
                particle.vy *= 0.985;

                particle.life -= particle.decay;

                particle.size *= 0.995;

                if (
                    particle.life <= 0 ||
                    particle.size < 0.2
                ) {
                    particles.splice(i, 1);
                    continue;
                }

                context.beginPath();

                context.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                context.fillStyle = `rgba(
                    34,
                    211,
                    238,
                    ${particle.life * 0.3}
                )`;

                context.fill();
            }

            /* ----------------------------------------------------
               SOFT TRAIL
            ---------------------------------------------------- */

            if (mouse.active) {
                const dx =
                    mouse.x - mouse.previousX;

                const dy =
                    mouse.y - mouse.previousY;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (distance > 2) {
                    context.save();

                    context.beginPath();

                    context.moveTo(
                        mouse.previousX,
                        mouse.previousY
                    );

                    context.lineTo(
                        mouse.x,
                        mouse.y
                    );

                    context.strokeStyle =
                        "rgba(34,211,238,0.16)";

                    context.lineWidth =
                        Math.min(
                            2.5,
                            1 +
                                mouse.velocity
                        );

                    context.lineCap = "round";

                    context.shadowBlur = 14;

                    context.shadowColor =
                        "rgba(34,211,238,0.3)";

                    context.stroke();

                    context.restore();
                }
            }

            animationRef.current =
                requestAnimationFrame(draw);
        };

        animationRef.current =
            requestAnimationFrame(draw);

        return () => {
            resizeObserver.disconnect();

            container.removeEventListener(
                "pointermove",
                handlePointerMove
            );

            container.removeEventListener(
                "pointerleave",
                handlePointerLeave
            );

            if (animationRef.current) {
                cancelAnimationFrame(
                    animationRef.current
                );
            }
        };
    }, [onSignal]);

    return (
        <div
            ref={containerRef}
            className="
                pointer-events-auto
                absolute
                inset-0
                z-[4]
            "
        >
            <canvas
                ref={canvasRef}
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                "
            />
        </div>
    );
}

/* ============================================================
   FLOATING HTML SIGNAL
============================================================ */

function FloatingSignal({ signal, onComplete }) {
    const Icon = signal.icon;

    const [visible, setVisible] =
        useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);

            setTimeout(() => {
                onComplete(signal.id);
            }, 250);
        }, 2600);

        return () => clearTimeout(timer);
    }, [signal.id, onComplete]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.82,
                        x: signal.x - 10,
                        y: signal.y + 12,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x:
                            signal.x +
                            signal.vx * 20 -
                            80,
                        y:
                            signal.y +
                            signal.vy * 20 -
                            18,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.92,
                        y:
                            signal.y -
                            48,
                    }}
                    transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                        pointer-events-none
                        absolute
                        z-[8]
                        w-max
                        max-w-[220px]
                    "
                    style={{
                        left: 0,
                        top: 0,
                    }}
                >
                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-xl
                            border
                            border-cyan-400/25
                            bg-white/90
                            px-3
                            py-2.5
                            shadow-[0_15px_45px_rgba(0,0,0,0.10)]
                            backdrop-blur-xl
                            dark:border-cyan-400/20
                            dark:bg-[#0d1118]/90
                            dark:shadow-[0_15px_45px_rgba(0,0,0,0.4)]
                        "
                    >
                        {/* cyan light */}
                        <div
                            className="
                                pointer-events-none
                                absolute
                                -right-5
                                -top-5
                                h-14
                                w-14
                                rounded-full
                                bg-cyan-400/10
                                blur-xl
                            "
                        />

                        <div
                            className="
                                relative
                                flex
                                items-start
                                gap-2.5
                            "
                        >
                            <div
                                className="
                                    mt-0.5
                                    flex
                                    h-7
                                    w-7
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-cyan-400/20
                                    bg-cyan-400/10
                                    text-cyan-500
                                    dark:text-cyan-300
                                "
                            >
                                <Icon size={13} />
                            </div>

                            <div>
                                <div
                                    className="
                                        text-[8px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.18em]
                                        text-cyan-600
                                        dark:text-cyan-300
                                    "
                                >
                                    {signal.type}
                                </div>

                                <div
                                    className="
                                        mt-0.5
                                        whitespace-nowrap
                                        text-[12px]
                                        font-medium
                                        leading-5
                                        text-zinc-800
                                        dark:text-zinc-200
                                    "
                                >
                                    {signal.message}
                                </div>
                            </div>
                        </div>

                        {/* tiny signal line */}
                        <motion.div
                            initial={{
                                scaleX: 0,
                            }}
                            animate={{
                                scaleX: 1,
                            }}
                            transition={{
                                duration: 1.8,
                                ease: "linear",
                            }}
                            className="
                                absolute
                                bottom-0
                                left-0
                                h-px
                                w-full
                                origin-left
                                bg-gradient-to-r
                                from-transparent
                                via-cyan-400/60
                                to-transparent
                            "
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ============================================================
   MAIN SECTION
============================================================ */

function OpportunitySection() {
    const [floatingSignals, setFloatingSignals] =
        useState([]);

    const handleNewSignal = (signal) => {
        setFloatingSignals((current) => {
            const next = [
                ...current,
                signal,
            ];

            /* keep maximum 5 visible */
            return next.slice(-5);
        });
    };

    const removeSignal = (id) => {
        setFloatingSignals((current) =>
            current.filter(
                (signal) =>
                    signal.id !== id
            )
        );
    };

    return (
        <section
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
                BACKGROUND GRID
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-50
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
                    backgroundSize:
                        "48px 48px",
                }}
            />

            {/* =====================================================
                STATIC RADIAL LIGHT
            ====================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-[700px]
                    w-[700px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-cyan-400/[0.05]
                    blur-[100px]
                    dark:bg-cyan-400/[0.045]
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
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 12,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.4,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-zinc-200
                        bg-white/80
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-zinc-600
                        shadow-sm
                        backdrop-blur
                        dark:border-zinc-700
                        dark:bg-zinc-900/60
                        dark:text-zinc-400
                    "
                >
                    <span
                        className="
                            h-1.5
                            w-1.5
                            animate-pulse
                            rounded-full
                            bg-cyan-400
                            shadow-[0_0_10px_rgba(34,211,238,0.8)]
                        "
                    />

                    Opportunity intelligence
                </motion.div>

                <motion.h2
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.4,
                    }}
                    transition={{
                        duration: 0.65,
                        delay: 0.08,
                    }}
                    className="
                        mt-6
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

                    <span
                        className="
                            text-zinc-400
                            dark:text-zinc-500
                        "
                    >
                        Find the opportunity.
                    </span>
                </motion.h2>

                <motion.p
                    initial={{
                        opacity: 0,
                        y: 14,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.4,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.16,
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

            <div
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
                    MOUSE PAINT EFFECT
                ================================================== */}

                <MouseSignalCanvas
                    onSignal={
                        handleNewSignal
                    }
                />

                {/* =================================================
                    FLOATING HTML SIGNALS

                    IMPORTANT:
                    These are HTML, not canvas text.
                    Therefore they remain visible.
                ================================================== */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-[7]
                        overflow-hidden
                    "
                >
                    {floatingSignals.map(
                        (signal) => (
                            <FloatingSignal
                                key={signal.id}
                                signal={signal}
                                onComplete={
                                    removeSignal
                                }
                            />
                        )
                    )}
                </div>

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
                        whileInView={{
                            pathLength: 1,
                            opacity: 1,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.3,
                        }}
                    />

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
                        whileInView={{
                            pathLength: 1,
                            opacity: 1,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.45,
                        }}
                    />

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
                        whileInView={{
                            pathLength: 1,
                            opacity: 1,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.6,
                        }}
                    />

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
                        whileInView={{
                            pathLength: 1,
                            opacity: 1,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.75,
                        }}
                    />
                </svg>

                {/* =================================================
                    SIGNAL CARDS
                ================================================== */}

                {signals.map((signal) => {
                    const Icon = signal.icon;

                    return (
                        <motion.div
                            key={
                                signal.label
                            }
                            initial={{
                                opacity: 0,
                                y: 18,
                                scale: 0.96,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            transition={{
                                duration: 0.55,
                                delay:
                                    signal.delay,
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
                                        <Icon
                                            size={
                                                14
                                            }
                                        />
                                    </div>

                                    <ArrowUpRight
                                        size={
                                            13
                                        }
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
                                    {
                                        signal.label
                                    }
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
                                    {
                                        signal.value
                                    }
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
                        scale: 0.9,
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.35,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.3,
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
                    {/* outer ring */}

                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "linear",
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

                    {/* middle ring */}

                    <motion.div
                        animate={{
                            rotate: -360,
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "linear",
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

                    {/* glow */}

                    <motion.div
                        animate={{
                            scale: [
                                0.95,
                                1.08,
                                0.95,
                            ],
                            opacity: [
                                0.25,
                                0.45,
                                0.25,
                            ],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
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

                    {/* scanner */}

                    <div
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
                    </div>

                    {/* rotating scanner beam */}

                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
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
                </motion.div>

                {/* =================================================
                    OPPORTUNITY RESULT
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.96,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.35,
                    }}
                    transition={{
                        duration: 0.65,
                        delay: 1,
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
                                    <Target
                                        size={
                                            14
                                        }
                                    />
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

                            <span
                                className="
                                    font-semibold
                                    text-cyan-500
                                "
                            >
                                92%
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* =====================================================
                BOTTOM MESSAGE
            ====================================================== */}

            <div
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
            </div>
        </section>
    );
}

export default OpportunitySection;