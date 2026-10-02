import { ChevronDown, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("fyndrex-theme");

        if (savedTheme) {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove("light", "dark");
        root.classList.add(theme);

        localStorage.setItem("fyndrex-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark"
        );
    };

    const isDark = theme === "dark";

    return (
        <header
            className="
                fixed
                inset-x-0
                top-0
                z-50
                border-t
                border-zinc-200
                bg-white/95
                backdrop-blur-md
                transition-colors
                duration-300
                dark:border-zinc-800
                dark:bg-[#08090d]/95
            "
        >
            <nav
                className="
                    mx-auto
                    flex
                    h-[72px]
                    w-full
                    items-center
                    justify-between
                    px-4
                    transition-colors
                    duration-300
                    sm:px-6
                    lg:h-[78px]
                    lg:px-8
                    xl:px-10
                "
            >
                {/* Logo */}
                <Link
                    to="/"
                    className="flex shrink-0 items-center gap-2"
                >
                    <div className="relative flex h-7 w-7 items-center justify-center sm:h-8 sm:w-8">
                        <div
                            className="
                                absolute
                                left-[3px]
                                top-[3px]
                                h-[20px]
                                w-[10px]
                                -skew-x-[28deg]
                                rounded-[2px]
                                bg-zinc-950
                                transition-colors
                                duration-300
                                dark:bg-white
                                sm:h-[22px]
                                sm:w-[11px]
                            "
                        />

                        <div
                            className="
                                absolute
                                bottom-[3px]
                                right-[3px]
                                h-[14px]
                                w-[10px]
                                -skew-x-[28deg]
                                rounded-[2px]
                                bg-zinc-950
                                transition-colors
                                duration-300
                                dark:bg-white
                                sm:h-[15px]
                                sm:w-[10px]
                            "
                        />

                        <div
                            className="
                                absolute
                                left-[11px]
                                top-[11px]
                                h-[8px]
                                w-[6px]
                                -skew-x-[28deg]
                                rounded-[1px]
                                bg-white
                                transition-colors
                                duration-300
                                dark:bg-[#08090d]
                                sm:left-[12px]
                                sm:top-[12px]
                            "
                        />
                    </div>

                    <span
                        className="
                            text-[21px]
                            font-semibold
                            leading-none
                            tracking-[-1px]
                            text-zinc-950
                            transition-colors
                            duration-300
                            dark:text-white
                            sm:text-[23px]
                        "
                    >
                        
                        FYNDYRIX
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-6 md:flex lg:gap-8 xl:gap-9">
                    <Link
                        to="/platform"
                        className="
                            group
                            flex
                            items-center
                            gap-1.5
                            text-[15px]
                            font-medium
                            tracking-[-0.2px]
                            text-zinc-800
                            transition-colors
                            duration-200
                            hover:text-zinc-500
                            dark:text-zinc-200
                            dark:hover:text-zinc-400
                            lg:text-[16px]
                        "
                    >
                        Platform

                        <ChevronDown
                            size={15}
                            strokeWidth={2}
                            className="transition-transform duration-200 group-hover:translate-y-0.5"
                        />
                    </Link>

                    <Link
                        to="/customers"
                        className="
                            text-[15px]
                            font-medium
                            tracking-[-0.2px]
                            text-zinc-800
                            transition-colors
                            duration-200
                            hover:text-zinc-500
                            dark:text-zinc-200
                            dark:hover:text-zinc-400
                            lg:text-[16px]
                        "
                    >
                        Customers
                    </Link>

                    <Link
                        to="/pricing"
                        className="
                            text-[15px]
                            font-medium
                            tracking-[-0.2px]
                            text-zinc-800
                            transition-colors
                            duration-200
                            hover:text-zinc-500
                            dark:text-zinc-200
                            dark:hover:text-zinc-400
                            lg:text-[16px]
                        "
                    >
                        Pricing
                    </Link>
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-2.5 md:flex">

                    {/* Theme Toggle */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={
                            isDark
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-zinc-200
                            bg-white
                            text-zinc-700
                            transition-all
                            duration-200
                            hover:border-zinc-300
                            hover:bg-zinc-50
                            hover:text-zinc-950
                            dark:border-zinc-700
                            dark:bg-zinc-900
                            dark:text-zinc-300
                            dark:hover:border-zinc-600
                            dark:hover:bg-zinc-800
                            dark:hover:text-white
                            lg:h-11
                            lg:w-11
                        "
                    >
                        {isDark ? (
                            <Sun
                                size={17}
                                strokeWidth={2}
                            />
                        ) : (
                            <Moon
                                size={17}
                                strokeWidth={2}
                            />
                        )}
                    </button>

                    <Link
                        to="/sign-in"
                        className="
                            flex
                            h-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-zinc-300
                            bg-white
                            px-4
                            text-[15px]
                            font-medium
                            tracking-[-0.2px]
                            text-zinc-800
                            transition-all
                            duration-200
                            hover:border-zinc-400
                            hover:bg-zinc-50
                            dark:border-zinc-700
                            dark:bg-transparent
                            dark:text-zinc-200
                            dark:hover:border-zinc-600
                            dark:hover:bg-zinc-900
                            lg:h-11
                            lg:px-4.5
                            lg:text-[16px]
                        "
                    >
                        Sign in
                    </Link>

                    <Link
                        to="/sign-in"
                        className="
                            flex
                            h-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#202126]
                            px-4.5
                            text-[15px]
                            font-semibold
                            tracking-[-0.3px]
                            text-white
                            transition-all
                            duration-200
                            hover:bg-zinc-800
                            dark:bg-white
                            dark:text-zinc-950
                            dark:hover:bg-zinc-200
                            lg:h-11
                            lg:px-5
                            lg:text-[16px]
                        "
                    >
                        Start for free
                    </Link>
                </div>

                {/* Mobile */}
                <div className="flex items-center gap-2 md:hidden">

                    {/* Mobile Theme Toggle */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={
                            isDark
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-zinc-200
                            bg-white
                            text-zinc-700
                            transition-all
                            duration-200
                            hover:bg-zinc-50
                            dark:border-zinc-700
                            dark:bg-zinc-900
                            dark:text-zinc-300
                            dark:hover:bg-zinc-800
                            sm:h-10
                            sm:w-10
                        "
                    >
                        {isDark ? (
                            <Sun
                                size={16}
                                strokeWidth={2}
                            />
                        ) : (
                            <Moon
                                size={16}
                                strokeWidth={2}
                            />
                        )}
                    </button>

                    <Link
                        to="/sign-in"
                        className="
                            flex
                            h-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#202126]
                            px-3.5
                            text-[13px]
                            font-semibold
                            tracking-[-0.1px]
                            text-white
                            transition-colors
                            duration-200
                            hover:bg-zinc-800
                            dark:bg-white
                            dark:text-zinc-950
                            dark:hover:bg-zinc-200
                            sm:h-10
                            sm:px-4
                            sm:text-[14px]
                        "
                    >
                        Start for free
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;