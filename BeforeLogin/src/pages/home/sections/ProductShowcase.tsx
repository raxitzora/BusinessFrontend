import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MacbookScroll } from "@beforelogin/components/ui/macbook-scroll";

function ProductShowcase() {
    const sectionRef = useRef(null);

    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.2,
    });

    return (
        <section
            ref={sectionRef}
            className="
                relative
                w-full
                overflow-visible
                bg-white
                transition-colors
                duration-300
                dark:bg-[#08090d]
            "
        >
       {/* =====================================================
    ANIMATED FIRE / HEAT ATMOSPHERE
    Behind MacBook only
====================================================== */}

<div
    className="
        pointer-events-none
        absolute
        inset-0
        z-0
        overflow-hidden
    "
>
    {/* Main warm fire glow */}

    <motion.div
        initial={{
            opacity: 0,
            scale: 0.55,
            y: 80,
        }}
        animate={
            isInView
                ? {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                  }
                : {}
        }
        transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            left-1/2
            top-[48%]
            h-[520px]
            w-[1000px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[100px]
        "
        style={{
            background:
                "radial-gradient(ellipse at center, rgba(255,140,0,0.24) 0%, rgba(255,94,0,0.18) 24%, rgba(239,68,68,0.12) 42%, rgba(180,50,20,0.06) 58%, transparent 75%)",
        }}
    />

    {/* Deep orange fire on left */}

    <motion.div
        initial={{
            opacity: 0,
            x: -120,
            scale: 0.7,
        }}
        animate={
            isInView
                ? {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                  }
                : {}
        }
        transition={{
            duration: 1.8,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            left-[-180px]
            top-[38%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-orange-500/[0.12]
            blur-[110px]
        "
    />

    {/* Red-orange fire on right */}

    <motion.div
        initial={{
            opacity: 0,
            x: 120,
            scale: 0.7,
        }}
        animate={
            isInView
                ? {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                  }
                : {}
        }
        transition={{
            duration: 2,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            right-[-180px]
            top-[32%]
            h-[460px]
            w-[460px]
            rounded-full
            bg-red-500/[0.10]
            blur-[120px]
        "
    />

    {/* Hot inner core */}

    <motion.div
        initial={{
            opacity: 0,
            scale: 0.4,
        }}
        animate={
            isInView
                ? {
                      opacity: [0, 0.9, 0.55],
                      scale: [0.4, 1.05, 1],
                  }
                : {}
        }
        transition={{
            duration: 2.2,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            left-1/2
            top-[46%]
            h-[280px]
            w-[650px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[80px]
        "
        style={{
            background:
                "radial-gradient(ellipse at center, rgba(255,191,36,0.20) 0%, rgba(255,115,0,0.14) 35%, transparent 72%)",
        }}
    />

    {/* Rising fire / heat streak */}

    <motion.div
        initial={{
            opacity: 0,
            scaleY: 0.3,
            y: 80,
        }}
        animate={
            isInView
                ? {
                      opacity: [0, 0.55, 0.2],
                      scaleY: [0.3, 1.1, 1],
                      y: [80, -10, 0],
                  }
                : {}
        }
        transition={{
            duration: 2.8,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            left-1/2
            top-[30%]
            h-[360px]
            w-[260px]
            -translate-x-1/2
            rounded-full
            bg-orange-400/[0.08]
            blur-[90px]
        "
    />

    {/* Horizontal heat line */}

    <motion.div
        initial={{
            opacity: 0,
            scaleX: 0.25,
        }}
        animate={
            isInView
                ? {
                      opacity: [0, 0.45, 0.18],
                      scaleX: [0.25, 1, 0.9],
                  }
                : {}
        }
        transition={{
            duration: 2.2,
            delay: 0.65,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            left-1/2
            top-[55%]
            h-px
            w-[65%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-orange-400/40
            to-transparent
            blur-[2px]
        "
    />

    {/* Floating ember */}

    <motion.div
        initial={{
            opacity: 0,
            y: 30,
            scale: 0,
        }}
        animate={
            isInView
                ? {
                      opacity: [0, 1, 0.2, 0],
                      y: [30, -40, -90, -130],
                      scale: [0, 1, 0.7, 0],
                  }
                : {}
        }
        transition={{
            duration: 3.2,
            delay: 0.8,
            ease: "easeOut",
        }}
        className="
            absolute
            left-[24%]
            top-[58%]
            h-1.5
            w-1.5
            rounded-full
            bg-orange-300
            shadow-[0_0_18px_rgba(255,140,0,0.9)]
        "
    />

    {/* Floating ember */}

    <motion.div
        initial={{
            opacity: 0,
            y: 20,
            scale: 0,
        }}
        animate={
            isInView
                ? {
                      opacity: [0, 0.9, 0.15, 0],
                      y: [20, -50, -100, -150],
                      scale: [0, 1, 0.6, 0],
                  }
                : {}
        }
        transition={{
            duration: 3.6,
            delay: 1.1,
            ease: "easeOut",
        }}
        className="
            absolute
            right-[27%]
            top-[60%]
            h-1
            w-1
            rounded-full
            bg-amber-300
            shadow-[0_0_15px_rgba(251,191,36,0.9)]
        "
    />

    {/* Small hot ember */}

    <motion.div
        initial={{
            opacity: 0,
            scale: 0,
        }}
        animate={
            isInView
                ? {
                      opacity: [0, 1, 0.25],
                      scale: [0, 1.4, 0.7],
                  }
                : {}
        }
        transition={{
            duration: 2.4,
            delay: 1.3,
            ease: "easeOut",
        }}
        className="
            absolute
            left-[18%]
            top-[35%]
            h-1
            w-1
            rounded-full
            bg-orange-300
            shadow-[0_0_14px_rgba(255,115,0,0.9)]
        "
    />

    {/* Subtle bottom heat */}

    <motion.div
        initial={{
            opacity: 0,
            scaleX: 0.5,
        }}
        animate={
            isInView
                ? {
                      opacity: 1,
                      scaleX: 1,
                  }
                : {}
        }
        transition={{
            duration: 1.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            bottom-[12%]
            left-1/2
            h-[180px]
            w-[70%]
            -translate-x-1/2
            rounded-full
            bg-orange-500/[0.055]
            blur-[100px]
        "
    />
</div>

            {/* =====================================================
                EXISTING MACBOOK
                DO NOT MODIFY
            ====================================================== */}

            <div className="relative z-10">
                <MacbookScroll
                    src="/macbookimage.png"
                    showGradient={false}
                />
            </div>
        </section>
    );
}

export default ProductShowcase;