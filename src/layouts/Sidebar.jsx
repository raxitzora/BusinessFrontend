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

function SidebarItem({
    item,
    collapsed,
    theme,
}) {
    const Icon = item.icon;

    const isDark = theme === "dark";

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
                        ? isDark
                            ? "bg-[#242424] text-white"
                            : "bg-[#eeeeef] text-[#111111]"
                        : isDark
    ? "text-white hover:bg-[#1c1c1c] hover:text-white"
                            : "text-[#666] hover:bg-[#eeeeef] hover:text-[#111111]"
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
                                    ? isDark
                                        ? "text-white"
                                        : "text-[#111111]"
                                    : isDark
    ? "text-white group-hover:text-white"
                                        : "text-white group-hover:text-[#222]"
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
    theme,
}) {
    const isDark = theme === "dark";

    return (
        <div className="mb-7">
            {!collapsed && (
                <div className="mb-2 px-3">
                    <span
                        className={`text-[12px] font-medium tracking-[-0.01em] ${
                            isDark
    ? "text-white"
                                : "text-[#999]"
                        }`}
                    >
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
                        theme={theme}
                    />
                ))}
            </div>
        </div>
    );
}

function Sidebar({
    collapsed,
    setCollapsed,
    theme,
}) {
    const isDark = theme === "dark";

    return (
        <aside
            className={`
                relative
                flex
                h-screen
                shrink-0
                flex-col
                border-r
                transition-[width,background-color,border-color]
                duration-200
                ease-out
                ${
                    isDark
                        ? "border-[#202020] bg-[#000000]"
                        : "border-[#e5e5e5] bg-[#ffffff]"
                }
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
                {/* Expanded Logo */}

                {!collapsed && (
                    <NavLink
                        to="/app/dashboard"
                        className={`
                            flex
                            items-center
                            gap-2.5
                            rounded-lg
                            px-2
                            py-1.5
                            transition-colors
                            duration-150
                            ${
                                isDark
                                    ? "hover:bg-[#161616]"
                                    : "hover:bg-[#f2f2f2]"
                            }
                        `}
                    >
                        {/* LeadFlow mark */}

                        <div className="relative flex h-7 w-7 items-center justify-center">
                            <div
                                className={`
                                    absolute
                                    left-[3px]
                                    top-[2px]
                                    h-[19px]
                                    w-[9px]
                                    -skew-x-[28deg]
                                    rounded-[2px]
                                    ${
                                        isDark
                                            ? "bg-white"
                                            : "bg-[#111111]"
                                    }
                                `}
                            />

                            <div
                                className={`
                                    absolute
                                    bottom-[2px]
                                    right-[3px]
                                    h-[13px]
                                    w-[9px]
                                    -skew-x-[28deg]
                                    rounded-[2px]
                                    ${
                                        isDark
                                            ? "bg-white"
                                            : "bg-[#111111]"
                                    }
                                `}
                            />

                            <div
                                className={`
                                    absolute
                                    left-[11px]
                                    top-[10px]
                                    h-[7px]
                                    w-[5px]
                                    -skew-x-[28deg]
                                    rounded-[1px]
                                    ${
                                        isDark
                                            ? "bg-black"
                                            : "bg-white"
                                    }
                                `}
                            />
                        </div>

                        <span
                            className={`
                                text-[17px]
                                font-semibold
                                tracking-[-0.04em]
                                ${
                                    isDark
                                        ? "text-white"
                                        : "text-[#111111]"
                                }
                            `}
                        >
                            LeadFlow
                        </span>
                    </NavLink>
                )}

                {/* Collapsed Logo */}

                {collapsed && (
                    <div className="relative flex h-8 w-8 items-center justify-center">
                        <div
                            className={`
                                absolute
                                left-[3px]
                                top-[2px]
                                h-[21px]
                                w-[10px]
                                -skew-x-[28deg]
                                rounded-[2px]
                                ${
                                    isDark
                                        ? "bg-white"
                                        : "bg-[#111111]"
                                }
                            `}
                        />

                        <div
                            className={`
                                absolute
                                bottom-[2px]
                                right-[3px]
                                h-[14px]
                                w-[10px]
                                -skew-x-[28deg]
                                rounded-[2px]
                                ${
                                    isDark
                                        ? "bg-white"
                                        : "bg-[#111111]"
                                }
                            `}
                        />

                        <div
                            className={`
                                absolute
                                left-[12px]
                                top-[11px]
                                h-[8px]
                                w-[5px]
                                -skew-x-[28deg]
                                rounded-[1px]
                                ${
                                    isDark
                                        ? "bg-black"
                                        : "bg-white"
                                }
                            `}
                        />
                    </div>
                )}

                {/* Collapse */}

                {!collapsed && (
                    <button
                        type="button"
                        onClick={() => setCollapsed(true)}
                        title="Collapse sidebar"
                        className={`
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            transition-all
                            duration-150
                            active:scale-95
                            ${
                                isDark
                                    ? "text-white hover:bg-[#1b1b1b] hover:text-white"
                                    : "text-white hover:bg-[#eeeeee] hover:text-[#111]"
                            }
                        `}
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
                    className={`
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
                        shadow-xl
                        transition-all
                        duration-150
                        active:scale-95
                        ${
                            isDark
                                ? "border-[#303030] bg-[#111111] text-white hover:border-[#444] hover:bg-[#1d1d1d] hover:text-white"
                                : "border-[#d9d9d9] bg-white text-white hover:border-[#c8c8c8] hover:bg-[#f5f5f5] hover:text-[#111]"
                        }
                    `}
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
                className={`
                    flex-1
                    overflow-y-auto
                    px-3
                    pb-4
                    scrollbar-thin
                    scrollbar-track-transparent
                    ${
                        isDark
                            ? "scrollbar-thumb-[#292929]"
                            : "scrollbar-thumb-[#d5d5d5]"
                    }
                `}
            >
                <SidebarSection
                    title="Workspace"
                    items={workspaceNavigation}
                    collapsed={collapsed}
                    theme={theme}
                />

                <SidebarSection
                    title="Manage"
                    items={manageNavigation}
                    collapsed={collapsed}
                    theme={theme}
                />

                <SidebarSection
                    title="Account"
                    items={accountNavigation}
                    collapsed={collapsed}
                    theme={theme}
                />
            </nav>

            {/* ------------------------------------------------ */}
            {/* Account */}
            {/* ------------------------------------------------ */}

            <div
                className={`
                    shrink-0
                    border-t
                    p-3
                    ${
                        isDark
                            ? "border-[#202020]"
                            : "border-[#e5e5e5]"
                    }
                `}
            >
                <div
                    className={`
                        flex
                        items-center
                        rounded-[9px]
                        transition-colors
                        duration-150
                        ${
                            collapsed
                                ? "justify-center p-1"
                                : "gap-3 px-2 py-2"
                        }
                        ${
                            isDark
                                ? "hover:bg-[#151515]"
                                : "hover:bg-[#f3f3f3]"
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
                                className={`
                                    truncate
                                    text-[13px]
                                    font-medium
                                    tracking-[-0.01em]
                                    ${
                                        isDark
    ? "text-white"
                                            : "text-[#222]"
                                    }
                                `}
                            >
                                Account
                            </p>

                            <p
                                className={`
                                    truncate
                                    text-[11px]
                                    ${
                                        isDark
    ? "text-white"                                     
           : "text-[#999]"
                                    }
                                `}
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