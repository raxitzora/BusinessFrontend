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

{/* =====================================================
    PREMIUM ORANGE MACBOOK REVEAL
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
    {/* =================================================
        FULL BACKGROUND ORANGE ATMOSPHERE
        Starts concentrated behind MacBook and expands
        across the complete section.
    ================================================= */}

    <motion.div
        initial={{
            opacity: 0,
            scale: 0.35,
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
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            left-1/2
            top-1/2
            h-[1100px]
            w-[1800px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[100px]
        "
        style={{
            background:
                "radial-gradient(ellipse at center, rgba(255,145,0,0.30) 0%, rgba(255,102,0,0.22) 22%, rgba(234,88,12,0.15) 42%, rgba(194,65,12,0.09) 58%, rgba(120,40,10,0.04) 72%, transparent 90%)",
        }}
    />

    {/* =================================================
        STRONG CENTRAL LIGHT
        Creates the premium glow directly behind MacBook
    ================================================= */}

    <motion.div
        initial={{
            opacity: 0,
            scale: 0.25,
        }}
        animate={
            isInView
                ? {
                      opacity: [0, 0.9, 0.65],
                      scale: [0.25, 1.1, 1],
                  }
                : {}
        }
        transition={{
            duration: 2.2,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            left-1/2
            top-[48%]
            h-[500px]
            w-[1000px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[85px]
        "
        style={{
            background:
                "radial-gradient(ellipse at center, rgba(255,190,60,0.34) 0%, rgba(255,130,0,0.25) 28%, rgba(255,80,0,0.12) 50%, transparent 75%)",
        }}
    />

    {/* =================================================
        LEFT ORANGE AMBIENT LIGHT
    ================================================= */}

    <motion.div
        initial={{
            opacity: 0,
            x: -250,
            scale: 0.5,
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
            duration: 2.2,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            left-[-250px]
            top-[25%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-orange-500/[0.13]
            blur-[130px]
        "
    />

    {/* =================================================
        RIGHT ORANGE / RED AMBIENT LIGHT
    ================================================= */}

    <motion.div
        initial={{
            opacity: 0,
            x: 250,
            scale: 0.5,
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
            duration: 2.4,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            right-[-250px]
            top-[20%]
            h-[700px]
            w-[700px]
            rounded-full
            bg-red-500/[0.10]
            blur-[140px]
        "
    />

    {/* =================================================
        TOP AMBIENT GLOW
    ================================================= */}

    <motion.div
        initial={{
            opacity: 0,
            scaleY: 0.3,
        }}
        animate={
            isInView
                ? {
                      opacity: 1,
                      scaleY: 1,
                  }
                : {}
        }
        transition={{
            duration: 2,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            left-1/2
            top-[-300px]
            h-[650px]
            w-[1200px]
            -translate-x-1/2
            rounded-full
            bg-orange-400/[0.08]
            blur-[130px]
        "
    />

    {/* =================================================
        BOTTOM REFLECTION / HEAT
    ================================================= */}

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
            duration: 2,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            bottom-[-220px]
            left-1/2
            h-[550px]
            w-[1200px]
            -translate-x-1/2
            rounded-full
            bg-orange-600/[0.09]
            blur-[130px]
        "
    />

    {/* =================================================
        PREMIUM HORIZONTAL LIGHT
        Gives the scene a cinematic center line.
    ================================================= */}

    <motion.div
        initial={{
            opacity: 0,
            scaleX: 0,
        }}
        animate={
            isInView
                ? {
                      opacity: [0, 0.7, 0.35],
                      scaleX: [0, 1, 0.95],
                  }
                : {}
        }
        transition={{
            duration: 2.2,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1],
        }}
        className="
            absolute
            left-1/2
            top-[55%]
            h-[2px]
            w-[75%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-orange-300/50
            to-transparent
            blur-[3px]
        "
    />

    {/* =================================================
        SOFT FILM GRAIN / ATMOSPHERIC LAYER
    ================================================= */}

    <motion.div
        initial={{
            opacity: 0,
        }}
        animate={
            isInView
                ? {
                      opacity: 1,
                  }
                : {}
        }
        transition={{
            duration: 2,
            delay: 0.7,
        }}
        className="
            absolute
            inset-0
            bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.10)_100%)]
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