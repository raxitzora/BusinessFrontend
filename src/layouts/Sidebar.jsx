import {
    LayoutDashboard,
    Search,
    Bookmark,
    History,
    BriefcaseBusiness,
    CreditCard,
    User,
    Settings,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const workspaceNavigation = [
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
];

const manageNavigation = [
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
];

const accountNavigation = [
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

function SidebarItem({ item, collapsed }) {
    const Icon = item.icon;

    return (
        <NavLink
            to={item.path}
            title={collapsed ? item.title : undefined}
            className={({ isActive }) =>
                `
                group flex h-10 items-center
                rounded-[9px]
                text-[14px]
                font-medium
                tracking-[-0.01em]
                transition-all
                duration-150
                ease-out
                ${
                    collapsed
                        ? "justify-center px-0"
                        : "gap-3 px-3"
                }
                ${
                    isActive
                        ? "bg-[#242424] text-white"
                        : "text-[#a1a1a1] hover:bg-[#1c1c1c] hover:text-[#f5f5f5]"
                }
                `
            }
        >
            {({ isActive }) => (
                <>
                    <Icon
                        size={19}
                        strokeWidth={1.8}
                        className={`
                            shrink-0
                            transition-colors
                            duration-150
                            ${
                                isActive
                                    ? "text-white"
                                    : "text-[#9a9a9a] group-hover:text-[#e5e5e5]"
                            }
                        `}
                    />

                    {!collapsed && (
                        <span className="truncate">
                            {item.title}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    );
}

function SidebarSection({
    title,
    items,
    collapsed,
}) {
    return (
        <div className="mb-7">

            {!collapsed && (
                <div className="mb-2 px-3">
                    <span className="text-[12px] font-medium tracking-[-0.01em] text-[#777]">
                        {title}
                    </span>
                </div>
            )}

            <div className="space-y-0.5">
                {items.map((item) => (
                    <SidebarItem
                        key={item.path}
                        item={item}
                        collapsed={collapsed}
                    />
                ))}
            </div>

        </div>
    );
}

function Sidebar({
    collapsed,
    setCollapsed,
}) {
    return (
        <aside
            className={`
                relative
                flex
                h-screen
                shrink-0
                flex-col
                border-r
                border-[#202020]
                bg-[#000000]
                transition-[width]
                duration-200
                ease-out
                ${
                    collapsed
                        ? "w-[72px]"
                        : "w-[260px]"
                }
            `}
        >

            {/* ------------------------------------------------ */}
            {/* Header */}
            {/* ------------------------------------------------ */}

            <div
                className={`
                    flex
                    h-[68px]
                    shrink-0
                    items-center
                    ${
                        collapsed
                            ? "justify-center"
                            : "justify-between px-4"
                    }
                `}
            >

                {!collapsed && (
                    <NavLink
                        to="/app/dashboard"
                        className="
                            flex
                            items-center
                            gap-2.5
                            rounded-lg
                            px-2
                            py-1.5
                            transition-colors
                            duration-150
                            hover:bg-[#161616]
                        "
                    >

                        {/* LeadFlow mark */}

                        <div className="relative flex h-7 w-7 items-center justify-center">

                            <div
                                className="
                                    absolute
                                    left-[3px]
                                    top-[2px]
                                    h-[19px]
                                    w-[9px]
                                    -skew-x-[28deg]
                                    rounded-[2px]
                                    bg-white
                                "
                            />

                            <div
                                className="
                                    absolute
                                    bottom-[2px]
                                    right-[3px]
                                    h-[13px]
                                    w-[9px]
                                    -skew-x-[28deg]
                                    rounded-[2px]
                                    bg-white
                                "
                            />

                            <div
                                className="
                                    absolute
                                    left-[11px]
                                    top-[10px]
                                    h-[7px]
                                    w-[5px]
                                    -skew-x-[28deg]
                                    rounded-[1px]
                                    bg-black
                                "
                            />

                        </div>

                        <span
                            className="
                                text-[17px]
                                font-semibold
                                tracking-[-0.04em]
                                text-white
                            "
                        >
                            LeadFlow
                        </span>

                    </NavLink>
                )}

                {collapsed && (
                    <div
                        className="
                            relative
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                        "
                    >

                        <div
                            className="
                                absolute
                                left-[3px]
                                top-[2px]
                                h-[21px]
                                w-[10px]
                                -skew-x-[28deg]
                                rounded-[2px]
                                bg-white
                            "
                        />

                        <div
                            className="
                                absolute
                                bottom-[2px]
                                right-[3px]
                                h-[14px]
                                w-[10px]
                                -skew-x-[28deg]
                                rounded-[2px]
                                bg-white
                            "
                        />

                        <div
                            className="
                                absolute
                                left-[12px]
                                top-[11px]
                                h-[8px]
                                w-[5px]
                                -skew-x-[28deg]
                                rounded-[1px]
                                bg-black
                            "
                        />

                    </div>
                )}

                {!collapsed && (
                    <button
                        type="button"
                        onClick={() => setCollapsed(true)}
                        title="Collapse sidebar"
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-[#777]
                            transition-all
                            duration-150
                            hover:bg-[#1b1b1b]
                            hover:text-white
                            active:scale-95
                        "
                    >
                        <PanelLeftClose
                            size={18}
                            strokeWidth={1.8}
                        />
                    </button>
                )}

            </div>

            {/* ------------------------------------------------ */}
            {/* Expand button */}
            {/* ------------------------------------------------ */}

            {collapsed && (
                <button
                    type="button"
                    onClick={() => setCollapsed(false)}
                    title="Expand sidebar"
                    className="
                        absolute
                        -right-3
                        top-[19px]
                        z-30
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#303030]
                        bg-[#111111]
                        text-[#888]
                        shadow-xl
                        transition-all
                        duration-150
                        hover:border-[#444]
                        hover:bg-[#1d1d1d]
                        hover:text-white
                        active:scale-95
                    "
                >
                    <PanelLeftOpen
                        size={14}
                        strokeWidth={1.8}
                    />
                </button>
            )}

            {/* ------------------------------------------------ */}
            {/* Navigation */}
            {/* ------------------------------------------------ */}

            <nav
                className="
                    flex-1
                    overflow-y-auto
                    px-3
                    pb-4
                    scrollbar-thin
                    scrollbar-track-transparent
                    scrollbar-thumb-[#292929]
                "
            >

                <SidebarSection
                    title="Workspace"
                    items={workspaceNavigation}
                    collapsed={collapsed}
                />

                <SidebarSection
                    title="Manage"
                    items={manageNavigation}
                    collapsed={collapsed}
                />

                <SidebarSection
                    title="Account"
                    items={accountNavigation}
                    collapsed={collapsed}
                />

            </nav>

            {/* ------------------------------------------------ */}
            {/* Account */}
            {/* ------------------------------------------------ */}

            <div
                className="
                    shrink-0
                    border-t
                    border-[#202020]
                    p-3
                "
            >

                <div
                    className={`
                        flex
                        items-center
                        rounded-[9px]
                        transition-colors
                        duration-150
                        hover:bg-[#151515]
                        ${
                            collapsed
                                ? "justify-center p-1"
                                : "gap-3 px-2 py-2"
                        }
                    `}
                >

                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "h-8 w-8",
                            },
                        }}
                    />

                    {!collapsed && (
                        <div className="min-w-0">

                            <p
                                className="
                                    truncate
                                    text-[13px]
                                    font-medium
                                    tracking-[-0.01em]
                                    text-[#e5e5e5]
                                "
                            >
                                Account
                            </p>

                            <p
                                className="
                                    truncate
                                    text-[11px]
                                    text-[#666]
                                "
                            >
                                Manage account
                            </p>

                        </div>
                    )}

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;