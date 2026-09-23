import {
    LayoutDashboard,
    Search,
    Bookmark,
    History,
    BriefcaseBusiness,
    CreditCard,
    User,
    Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const navigation = [
    {
        title: "Dashboard",
        path: "/app/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Search Businesses",
        path: "/app/search",
        icon: Search,
    },
    {
        title: "Saved Leads",
        path: "/app/saved-leads",
        icon: Bookmark,
    },
    {
        title: "Search History",
        path: "/app/search-history",
        icon: History,
    },
    {
        title: "Services",
        path: "/app/services",
        icon: BriefcaseBusiness,
    },
    {
        title: "Billing",
        path: "/app/billing",
        icon: CreditCard,
    },
    {
        title: "Profile",
        path: "/app/profile",
        icon: User,
    },
    {
        title: "Settings",
        path: "/app/settings",
        icon: Settings,
    },
];

function Sidebar() {
    return (
        <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-950">

            {/* Logo */}

            <div className="flex h-16 items-center border-b border-zinc-800 px-6">

                <h1 className="text-xl font-bold tracking-wide text-white">
                    LeadFlow
                </h1>

            </div>

            {/* Navigation */}

            <nav className="flex-1 overflow-y-auto p-4">

                <ul className="space-y-2">

                    {navigation.map((item) => {

                        const Icon = item.icon;

                        return (
                            <li key={item.path}>

                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors
                                        
                                        ${
                                            isActive
                                                ? "bg-violet-600 text-white"
                                                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                        }`
                                    }
                                >

                                    <Icon size={18} />

                                    {item.title}

                                </NavLink>

                            </li>
                        );
                    })}

                </ul>

            </nav>

            {/* Footer */}

            <div className="flex items-center justify-between border-t border-zinc-800 p-4">

                <div>

                    <p className="text-sm font-medium text-white">
                        Account
                    </p>

                    <p className="text-xs text-zinc-500">
                        Managed by Clerk
                    </p>

                </div>

                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "h-10 w-10",
                        },
                    }}
                />

            </div>

        </aside>
    );
}

export default Sidebar;