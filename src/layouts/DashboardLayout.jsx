import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("leadflow-theme") || "dark";
    });

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
                            LeadFlow
                        </span>
                    </div>
                </div>

                {/* Desktop Topbar */}

                <div className="hidden lg:block">
                    <Topbar
                        theme={theme}
                        setTheme={setTheme}
                    />
                </div>

                {/* Main Content */}

                <main
                    className={`
                        min-h-0
                        min-w-0
                        flex-1
                        overflow-y-auto
                        overflow-x-hidden
                        p-3
                        sm:p-4
                        md:p-5
                        lg:p-6
                        transition-colors
                        duration-200
                        ${
                            theme === "dark"
                                ? "bg-zinc-900"
                                : "bg-[#f6f6f7]"
                        }
                    `}
                >
                    <Outlet
                        context={{
                            theme,
                            setTheme,
                        }}
                    />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;