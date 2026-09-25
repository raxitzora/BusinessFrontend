import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("leadflow-theme") || "dark";
    });

    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove("dark", "light");
        root.classList.add(theme);

        localStorage.setItem("leadflow-theme", theme);
    }, [theme]);

    return (
        <div
            className={`flex h-screen overflow-hidden transition-colors duration-200 ${
                theme === "dark"
                    ? "bg-zinc-950 text-white"
                    : "bg-[#f6f6f7] text-[#111111]"
            }`}
        >
          <Sidebar
    collapsed={sidebarCollapsed}
    setCollapsed={setSidebarCollapsed}
    theme={theme}
/>

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <Topbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main
                    className={`flex-1 overflow-y-auto p-6 transition-colors duration-200 ${
                        theme === "dark"
                            ? "bg-zinc-900"
                            : "bg-[#f6f6f7]"
                    }`}
                >
                    <Outlet context={{ theme, setTheme }} />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;