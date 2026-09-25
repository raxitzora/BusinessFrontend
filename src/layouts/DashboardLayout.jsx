import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-zinc-950 text-white">

            <Sidebar
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

                <Topbar />

                <main className="flex-1 overflow-y-auto bg-zinc-900 p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;