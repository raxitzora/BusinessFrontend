import React from "react";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
    const productLinks = [
        {
            label: "Business Discovery",
            href: "#discovery",
        },
        {
            label: "Website Analysis",
            href: "#analysis",
        },
        {
            label: "Opportunity Intelligence",
            href: "#opportunities",
        },
        {
            label: "Lead Enrichment",
            href: "#enrichment",
        },
    ];


    const companyLinks = [
        {
            label: "About",
            href: "#",
        },
        {
            label: "Contact",
            href: "#",
        },
     
    ];

    return (
        <footer
            className="
                relative
                overflow-hidden
                border-t
                border-zinc-200
                bg-white
                text-zinc-950
                transition-colors
                duration-300
                dark:border-white/[0.07]
                dark:bg-[#08090d]
                dark:text-white
            "
        >
            {/* Ambient background glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    bottom-0
                    h-80
                    w-80
                    rounded-full
                    bg-cyan-400/[0.07]
                    blur-[120px]
                    dark:bg-cyan-400/[0.05]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-40
                    top-0
                    h-80
                    w-80
                    rounded-full
                    bg-violet-400/[0.06]
                    blur-[120px]
                    dark:bg-violet-400/[0.05]
                "
            />

            {/* Subtle grid */}
            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.025]
                    dark:opacity-[0.035]
                "
                style={{
                    backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            <div
                className="
                    relative
                    mx-auto
                    max-w-[1440px]
                    px-5
                    py-16
                    sm:px-8
                    sm:py-20
                    lg:px-12
                    lg:py-24
                "
            >
                {/* Main footer */}
                <div
                    className="
                        grid
                        gap-14
                        lg:grid-cols-[1.4fr_1fr_1fr_1fr]
                        lg:gap-10
                    "
                >
                    {/* Brand */}
                    <div className="max-w-md">
                        <a
                            href="/"
                            className="
                                group
                                inline-flex
                                items-center
                                gap-2
                            "
                        >
                            <span
                                className="
                                    text-xl
                                    font-black
                                    tracking-[-0.06em]
                                    text-zinc-950
                                    dark:text-white
                                "
                            >
                                FYNDYRIX
                            </span>

                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-cyan-400
                                    shadow-[0_0_12px_rgba(34,211,238,0.7)]
                                    transition-transform
                                    duration-300
                                    group-hover:scale-150
                                "
                            />
                        </a>

                        <p
                            className="
                                mt-6
                                max-w-sm
                                text-[15px]
                                leading-7
                                text-zinc-500
                                dark:text-zinc-400
                            "
                        >
                            Don't search for leads.
                            <br />
                            Find businesses that need what you sell.
                        </p>

                        {/* System status */}
                        <div
                            className="
                                mt-8
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-zinc-200
                                bg-zinc-50
                                px-3
                                py-1.5
                                text-xs
                                text-zinc-500
                                dark:border-white/[0.08]
                                dark:bg-white/[0.03]
                                dark:text-zinc-400
                            "
                        >
                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    animate-pulse
                                    rounded-full
                                    bg-emerald-400
                                    shadow-[0_0_8px_rgba(52,211,153,0.8)]
                                "
                            />

                            Systems operational
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-zinc-400
                                dark:text-zinc-500
                            "
                        >
                            Product
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {productLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="
                                            group
                                            inline-flex
                                            items-center
                                            gap-1.5
                                            text-sm
                                            text-zinc-600
                                            transition-colors
                                            duration-200
                                            hover:text-zinc-950
                                            dark:text-zinc-400
                                            dark:hover:text-white
                                        "
                                    >
                                        {link.label}

                                        <ArrowUpRight
                                            size={13}
                                            className="
                                                -translate-x-0.5
                                                translate-y-0.5
                                                opacity-0
                                                transition-all
                                                duration-200
                                                group-hover:translate-x-0
                                                group-hover:translate-y-0
                                                group-hover:opacity-100
                                            "
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

              

                    {/* Company */}
                    <div>
                        <h3
                            className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-zinc-400
                                dark:text-zinc-500
                            "
                        >
                            Company
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="
                                            group
                                            inline-flex
                                            items-center
                                            gap-1.5
                                            text-sm
                                            text-zinc-600
                                            transition-colors
                                            duration-200
                                            hover:text-zinc-950
                                            dark:text-zinc-400
                                            dark:hover:text-white
                                        "
                                    >
                                        {link.label}

                                        <ArrowUpRight
                                            size={13}
                                            className="
                                                -translate-x-0.5
                                                translate-y-0.5
                                                opacity-0
                                                transition-all
                                                duration-200
                                                group-hover:translate-x-0
                                                group-hover:translate-y-0
                                                group-hover:opacity-100
                                            "
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Social links */}
                        <div className="mt-7 flex items-center gap-2">
                            {/* GitHub */}
                            <a
                                href="#"
                                aria-label="GitHub"
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-zinc-200
                                    text-[10px]
                                    font-bold
                                    tracking-tight
                                    text-zinc-500
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:border-zinc-300
                                    hover:text-zinc-950
                                    dark:border-white/[0.08]
                                    dark:text-zinc-500
                                    dark:hover:border-white/[0.16]
                                    dark:hover:text-white
                                "
                            >
                                GH
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-zinc-200
                                    text-[11px]
                                    font-bold
                                    text-zinc-500
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:border-zinc-300
                                    hover:text-zinc-950
                                    dark:border-white/[0.08]
                                    dark:text-zinc-500
                                    dark:hover:border-white/[0.16]
                                    dark:hover:text-white
                                "
                            >
                                in
                            </a>

                            {/* X */}
                            <a
                                href="#"
                                aria-label="X"
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-zinc-200
                                    text-[11px]
                                    font-bold
                                    text-zinc-500
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:border-zinc-300
                                    hover:text-zinc-950
                                    dark:border-white/[0.08]
                                    dark:text-zinc-500
                                    dark:hover:border-white/[0.16]
                                    dark:hover:text-white
                                "
                            >
                                X
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div
                    className="
                        my-12
                        h-px
                        bg-zinc-200
                        dark:bg-white/[0.07]
                    "
                />

                {/* Bottom bar */}
                <div
                    className="
                        flex
                        flex-col
                        gap-5
                        text-xs
                        text-zinc-400
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        dark:text-zinc-500
                    "
                >
                    <p>
                        © {new Date().getFullYear()} FYNDYRIX. All rights
                        reserved.
                    </p>

                    <div
                        className="
                            flex
                            items-center
                            gap-5
                        "
                    >
                        <a
                            href="#"
                            className="
                                transition-colors
                                hover:text-zinc-950
                                dark:hover:text-white
                            "
                        >
                            Privacy
                        </a>

                        <a
                            href="#"
                            className="
                                transition-colors
                                hover:text-zinc-950
                                dark:hover:text-white
                            "
                        >
                            Terms
                        </a>

                        <a
                            href="#"
                            className="
                                transition-colors
                                hover:text-zinc-950
                                dark:hover:text-white
                            "
                        >
                            Security
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;