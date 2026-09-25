import {
    Bell,
    Search,
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

    const title = pageTitles[pathname] || "LeadFlow";

    const isDark = theme === "dark";

    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark"
        );
    };
  

    return (
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">

            {/* Left */}

            <div>
                <h1 className="text-xl font-semibold text-white">
                    {title}
                </h1>
            </div>

            {/* Center */}

            <div className="hidden w-full max-w-md items-center rounded-lg border border-zinc-700 bg-zinc-900 px-3 lg:flex">

                <Search
                    size={18}
                    strokeWidth={1.8}
                    className="text-zinc-500"
                />

                <input
                    type="text"
                    placeholder="Search..."
                    className="h-10 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-500"
                />

            </div>

            {/* Right */}

            <div className="flex items-center gap-3">

                {/* Credits */}

                <div className="hidden rounded-lg border border-amber-500/20 bg-amber-500/[0.06] px-3 py-1.5 md:block">

                    <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-amber-400/70">
                        Credits
                    </p>

                    <p className="text-sm font-semibold text-amber-300">
                        50
                    </p>

                </div>

                {/* Theme Toggle */}

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
                    className="group relative flex h-9 w-9 items-center justify-center rounded-[9px] border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-[0.96]"
                >
                    {/* Moon */}

                    <span
                        className={`absolute transition-all duration-300 ${
                            isDark
                                ? "rotate-0 scale-100 opacity-100"
                                : "rotate-90 scale-50 opacity-0"
                        }`}
                    >
                        <Moon
                            size={17}
                            strokeWidth={1.8}
                        />
                    </span>

                    {/* Sun */}

                    <span
                        className={`absolute transition-all duration-300 ${
                            isDark
                                ? "-rotate-90 scale-50 opacity-0"
                                : "rotate-0 scale-100 opacity-100"
                        }`}
                    >
                        <Sun
                            size={17}
                            strokeWidth={1.8}
                        />
                    </span>
                </button>

                {/* Notifications */}

                <button
                    type="button"
                    aria-label="Notifications"
                    className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-150 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-[0.96]"
                >
                    <Bell
                        size={17}
                        strokeWidth={1.8}
                    />
                </button>

                {/* User */}

                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "h-9 w-9",
                        },
                    }}
                />

            </div>

        </header>
    );
}

export default Topbar;