import { useEffect, useState,useRef } from "react";
import { Menu } from "lucide-react";
import { Outlet,useLocation  } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isThemeTransitioning, setIsThemeTransitioning] =
    useState(false);
    const location = useLocation();
const scrollContainerRef = useRef(null);
const scrollPositionsRef = useRef({});

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("leadflow-theme") || "dark";
    });

    useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const scrollKey =
        location.pathname + location.search;

    const savedPosition =
        scrollPositionsRef.current[scrollKey] || 0;

    requestAnimationFrame(() => {
        container.scrollTop = savedPosition;
    });
}, [location.pathname, location.search]);

   useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("dark", "light");
    root.classList.add(theme);

    localStorage.setItem("leadflow-theme", theme);
}, [theme]);

    // Close mobile sidebar when switching to desktop.
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Prevent background scrolling while mobile drawer is open.
    useEffect(() => {
        if (mobileSidebarOpen && window.innerWidth < 1024) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileSidebarOpen]);

    return (
        <div
            className={`
                flex
                h-screen
                min-h-0
                w-full
                overflow-hidden
                transition-colors
                duration-200
                ${isThemeTransitioning ? "theme-transitioning" : ""}
                ${
                    theme === "dark"
                        ? "bg-zinc-950 text-white"
                        : "bg-[#f6f6f7] text-[#111111]"
                }
            `}
        >
            {/* ------------------------------------------------ */}
            {/* Desktop Sidebar */}
            {/* ------------------------------------------------ */}

            <div className="hidden lg:flex">
                <Sidebar
                    collapsed={sidebarCollapsed}
                    setCollapsed={setSidebarCollapsed}
                    theme={theme}
                    mobileOpen={false}
                    setMobileOpen={setMobileSidebarOpen}
                />
            </div>

            {/* ------------------------------------------------ */}
            {/* Mobile Sidebar */}
            {/* ------------------------------------------------ */}

            <div
                className={`
                    fixed
                    inset-0
                    z-50
                    lg:hidden
                    ${
                        mobileSidebarOpen
                            ? "pointer-events-auto"
                            : "pointer-events-none"
                    }
                `}
            >
                {/* Overlay */}

                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`
                        absolute
                        inset-0
                        bg-black/60
                        backdrop-blur-[1px]
                        transition-opacity
                        duration-200
                        ${
                            mobileSidebarOpen
                                ? "opacity-100"
                                : "opacity-0"
                        }
                    `}
                />

                {/* Drawer */}

                <div
                    className={`
                        relative
                        z-10
                        h-full
                        w-[280px]
                        max-w-[85vw]
                        transition-transform
                        duration-200
                        ease-out
                        ${
                            mobileSidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }
                    `}
                >
                    <Sidebar
                        collapsed={false}
                        setCollapsed={setSidebarCollapsed}
                        theme={theme}
                        mobileOpen={mobileSidebarOpen}
                        setMobileOpen={setMobileSidebarOpen}
                    />
                </div>
            </div>

            {/* ------------------------------------------------ */}
            {/* Main Application */}
            {/* ------------------------------------------------ */}

            <div className="flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden">
                {/* Mobile Header */}

                <div
                    className={`
                        flex
                        h-14
                        shrink-0
                        items-center
                        border-b
                        px-3
                        lg:hidden
                        ${
                            theme === "dark"
                                ? "border-[#202020] bg-[#090909]"
                                : "border-[#e5e5e5] bg-white"
                        }
                    `}
                >
                    <button
                        type="button"
                        onClick={() => setMobileSidebarOpen(true)}
                        aria-label="Open sidebar"
                        className={`
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            transition-colors
                            ${
                                theme === "dark"
                                    ? "text-white hover:bg-[#1c1c1c]"
                                    : "text-[#222] hover:bg-[#eeeeee]"
                            }
                        `}
                    >
                        <Menu
                            size={21}
                            strokeWidth={1.8}
                        />
                    </button>

                    <div className="ml-2 min-w-0">
                        <span
                            className={`
                                block
                                truncate
                                text-[15px]
                                font-semibold
                                tracking-[-0.02em]
                                ${
                                    theme === "dark"
                                        ? "text-white"
                                        : "text-[#111111]"
                                }
                            `}
                        >
                            Fyndyrix
                        </span>
                    </div>
                </div>

                {/* Desktop Topbar */}

                <div className="hidden lg:block">
                    <Topbar
    theme={theme}
    setTheme={(nextTheme) => {
        setIsThemeTransitioning(true);

        setTheme(nextTheme);

        window.setTimeout(() => {
            setIsThemeTransitioning(false);
        }, 280);
    }}
/>
                </div>

                {/* Main Content */}

        <main
    className={`
        min-h-0
        min-w-0
        flex-1
        overflow-hidden
        transition-colors
        duration-200
        ${
            theme === "dark"
                ? "bg-zinc-900"
                : "bg-[#f6f6f7]"
        }
    `}
>
   <div
    key={location.pathname + location.search}
    ref={scrollContainerRef}
   onScroll={(event) => {
    const container = event.currentTarget;

    const scrollKey =
        location.pathname + location.search;

    scrollPositionsRef.current[scrollKey] =
        container.scrollTop;

    setShowScrollTop(container.scrollTop > 250);
}}
    className="
        h-full
        min-h-0
        overflow-y-auto
        overflow-x-hidden
        p-3
        sm:p-4
        md:p-5
        lg:p-6
    "
>
        <Outlet
            context={{
                theme,
                setTheme,
            }}
        />

        <button
    type="button"
    aria-label="Back to top"
    onClick={() => {
        scrollContainerRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }}
    className={`
        fixed
        bottom-8
        right-5
        z-40
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        shadow-lg
        backdrop-blur-md
        transition-all
        duration-300
        ${
            showScrollTop
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none translate-y-3 scale-90 opacity-0"
        }
        ${
            theme === "dark"
                ? "border-zinc-700 bg-zinc-800/90 text-zinc-200 hover:bg-zinc-700"
                : "border-zinc-300 bg-white/90 text-zinc-700 hover:bg-zinc-100"
        }
    `}
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m18 15-6-6-6 6" />
    </svg>
</button>
        
    </div>
</main>
            </div>
        </div>
    );
}

export default DashboardLayout;