import {
    Bell,
    Moon,
    Sun,
} from "lucide-react";

import { UserButton } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const pageTitles = {
    "/app/dashboard": "Dashboard",
    "/app/search": "Search Businesses",
    "/app/saved-leads": "Saved Leads",
    "/app/search-history": "Search History",
    "/app/services": "Services",
    "/app/billing": "Billing",
    "/app/profile": "Profile",
    "/app/settings": "Settings",
};

function Topbar({ theme, setTheme }) {

    const { pathname } = useLocation();

    console.log("TOPBAR RENDER");

    useEffect(() => {
        console.log("TOPBAR MOUNT");

        return () => {
            console.log("TOPBAR UNMOUNT");
        };
    }, []);

    const title =
        pageTitles[pathname] || "LeadFlow";

    const isDark =
        theme === "dark";

    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === "dark"
                ? "light"
                : "dark"
        );
    };

    return (
        <header
            className={`
                flex
                h-16
                shrink-0
                items-center
                justify-between
                border-b
                px-6
                transition-colors
                duration-200
                ${
                    isDark
                        ? "border-[#242424] bg-[#0d0d0d]"
                        : "border-zinc-200 bg-white"
                }
            `}
        >

            {/* ---------------------------------------------------------- */}
            {/* Left */}
            {/* ---------------------------------------------------------- */}

            <div>

                <h1
                    className={`
                        text-xl
                        font-semibold
                        tracking-[-0.025em]
                        transition-colors
                        duration-200
                        ${
                            isDark
                                ? "text-white"
                                : "text-zinc-900"
                        }
                    `}
                >
                    {title}
                </h1>

            </div>


            {/* ---------------------------------------------------------- */}
            {/* Right */}
            {/* ---------------------------------------------------------- */}

            <div className="flex items-center gap-3">

                {/* ------------------------------------------------------ */}
                {/* Credits */}
                {/* ------------------------------------------------------ */}

                <div
                    className={`
                        hidden
                        rounded-lg
                        border
                        px-3
                        py-1.5
                        transition-colors
                        duration-200
                        md:block
                        ${
                            isDark
                                ? "border-amber-500/20 bg-amber-500/[0.06]"
                                : "border-amber-200 bg-amber-50"
                        }
                    `}
                >

                    <p
                        className={`
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            ${
                                isDark
                                    ? "text-amber-400/70"
                                    : "text-amber-700"
                            }
                        `}
                    >
                        Credits
                    </p>

                    <p
                        className={`
                            text-sm
                            font-semibold
                            ${
                                isDark
                                    ? "text-amber-300"
                                    : "text-amber-700"
                            }
                        `}
                    >
                        50
                    </p>

                </div>


                {/* ------------------------------------------------------ */}
                {/* Theme Toggle */}
                {/* ------------------------------------------------------ */}

                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={
                        isDark
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                    title={
                        isDark
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                    className={`
                        group
                        relative
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-[9px]
                        border
                        transition-all
                        duration-200
                        active:scale-[0.96]
                        ${
                            isDark
                                ? "border-[#292929] bg-[#171717] text-[#999] hover:border-[#3a3a3a] hover:bg-[#202020] hover:text-white"
                                : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
                        }
                    `}
                >

                    {/* Moon */}

                    <span
                        className={`
                            absolute
                            transition-all
                            duration-300
                            ${
                                isDark
                                    ? "rotate-0 scale-100 opacity-100"
                                    : "rotate-90 scale-50 opacity-0"
                            }
                        `}
                    >
                        <Moon
                            size={17}
                            strokeWidth={1.8}
                        />
                    </span>


                    {/* Sun */}

                    <span
                        className={`
                            absolute
                            transition-all
                            duration-300
                            ${
                                isDark
                                    ? "-rotate-90 scale-50 opacity-0"
                                    : "rotate-0 scale-100 opacity-100"
                            }
                        `}
                    >
                        <Sun
                            size={17}
                            strokeWidth={1.8}
                        />
                    </span>

                </button>


                {/* ------------------------------------------------------ */}
                {/* Notifications */}
                {/* ------------------------------------------------------ */}

                <button
                    type="button"
                    aria-label="Notifications"
                    title="Notifications"
                    className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-[9px]
                        border
                        transition-all
                        duration-150
                        active:scale-[0.96]
                        ${
                            isDark
                                ? "border-[#292929] bg-[#171717] text-[#999] hover:border-[#3a3a3a] hover:bg-[#202020] hover:text-white"
                                : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
                        }
                    `}
                >
                    <Bell
                        size={17}
                        strokeWidth={1.8}
                    />
                </button>


                {/* ------------------------------------------------------ */}
                {/* User */}
                {/* ------------------------------------------------------ */}

                <UserButton
                    appearance={{
                        elements: {
                            avatarBox:
                                "h-9 w-9",
                        },
                    }}
                />

            </div>

        </header>
    );
}

export default Topbar;