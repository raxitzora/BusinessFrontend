import { Bell, Search } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

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
function Topbar() {
    const { pathname } = useLocation();

    const title = pageTitles[pathname] || "LeadFlow";

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
                    className="text-zinc-500"
                />

                <input
                    type="text"
                    placeholder="Search..."
                    className="h-10 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-500"
                />

            </div>

            {/* Right */}

            <div className="flex items-center gap-5">

                {/* Credits */}

                <div className="hidden rounded-lg border border-violet-600 bg-violet-600/10 px-3 py-2 md:block">

                    <p className="text-xs text-zinc-400">
                        Credits
                    </p>

                    <p className="text-sm font-semibold text-white">
                        50
                    </p>

                </div>

                {/* Notifications */}

                <button
                    className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                >
                    <Bell size={20} />
                </button>

                {/* User */}

                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "h-10 w-10",
                        },
                    }}
                />

            </div>

        </header>
    );
}

export default Topbar;