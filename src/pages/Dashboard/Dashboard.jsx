import {
    useEffect,
} from "react";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    useUser,
} from "@clerk/clerk-react";

import {
    Link,
    useOutletContext,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
    getProfile,
    getUserServices,
} from "../../services/user.service";

import {
    ArrowRight,
    BriefcaseBusiness,
    Check,
    Coins,
    Search,
    Settings2,
    Sparkles,
} from "lucide-react";


function Dashboard() {

    const {
        user,
        isLoaded,
    } = useUser();

    const {
        theme,
    } = useOutletContext();

    const isDark =
        theme === "dark";


    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    const profileQuery = useQuery({
        queryKey: [
            "user",
            "profile",
            user?.id,
        ],

        queryFn: getProfile,

        enabled:
            isLoaded &&
            !!user,
    });


    /*
    |--------------------------------------------------------------------------
    | Services
    |--------------------------------------------------------------------------
    */

    const servicesQuery = useQuery({
        queryKey: [
            "user",
            "services",
            user?.id,
        ],

        queryFn: getUserServices,

        enabled:
            isLoaded &&
            !!user,
    });


    /*
    |--------------------------------------------------------------------------
    | Data
    |--------------------------------------------------------------------------
    */

    const profile =
        profileQuery.data?.user ?? null;

    const services =
        servicesQuery.data?.services ?? [];


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    const loading =
        !isLoaded ||
        profileQuery.isPending ||
        servicesQuery.isPending;


    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    const error =
        profileQuery.isError ||
        servicesQuery.isError;


    /*
    |--------------------------------------------------------------------------
    | Error Toast
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!error) {
            return;
        }

        toast.error(
            "Failed to load dashboard."
        );

    }, [error]);


    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <div className="space-y-8">

                {/* Header Skeleton */}

                <div>

                    <div
                        className={`
                            h-8
                            w-72
                            animate-pulse
                            rounded-lg
                            ${
                                isDark
                                    ? "bg-[#1b1b1b]"
                                    : "bg-zinc-200"
                            }
                        `}
                    />

                    <div
                        className={`
                            mt-3
                            h-4
                            w-[420px]
                            max-w-full
                            animate-pulse
                            rounded
                            ${
                                isDark
                                    ? "bg-[#171717]"
                                    : "bg-zinc-100"
                            }
                        `}
                    />

                </div>


                {/* Stats Skeleton */}

                <div
                    className="
                        grid
                        gap-4
                        md:grid-cols-2
                    "
                >

                    <div
                        className={`
                            h-[150px]
                            animate-pulse
                            rounded-[12px]
                            border
                            ${
                                isDark
                                    ? "border-[#242424] bg-[#0d0d0d]"
                                    : "border-zinc-200 bg-white"
                            }
                        `}
                    />

                    <div
                        className={`
                            h-[150px]
                            animate-pulse
                            rounded-[12px]
                            border
                            ${
                                isDark
                                    ? "border-[#242424] bg-[#0d0d0d]"
                                    : "border-zinc-200 bg-white"
                            }
                        `}
                    />

                </div>


                {/* Actions Skeleton */}

                <div
                    className={`
                        h-[150px]
                        animate-pulse
                        rounded-[12px]
                        border
                        ${
                            isDark
                                ? "border-[#242424] bg-[#0d0d0d]"
                                : "border-zinc-200 bg-white"
                        }
                    `}
                />

            </div>
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className={`
                space-y-8
                transition-colors
                duration-200
                ${
                    isDark
                        ? "text-white"
                        : "text-zinc-900"
                }
            `}
        >

            {/* ------------------------------------------------ */}
            {/* Header */}
            {/* ------------------------------------------------ */}

            <section
                className={`
                    border-b
                    pb-7
                    ${
                        isDark
                            ? "border-[#242424]"
                            : "border-zinc-200"
                    }
                `}
            >

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-6
                    "
                >

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <div
                                className={`
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-[9px]
                                    border
                                    ${
                                        isDark
                                            ? "border-[#2b3542] bg-[#111a25]"
                                            : "border-blue-100 bg-blue-50"
                                    }
                                `}
                            >

                                <Sparkles
                                    size={18}
                                    strokeWidth={1.8}
                                    className={
                                        isDark
                                            ? "text-blue-400"
                                            : "text-blue-600"
                                    }
                                />

                            </div>


                            <h1
                                className={`
                                    text-[28px]
                                    font-semibold
                                    leading-tight
                                    tracking-[-0.035em]
                                    sm:text-[30px]
                                    ${
                                        isDark
                                            ? "text-white"
                                            : "text-zinc-900"
                                    }
                                `}
                            >
                                Welcome,{" "}
                                {profile?.full_name} 👋
                            </h1>

                        </div>


                        <p
                            className={`
                                mt-3
                                max-w-2xl
                                text-[14px]
                                leading-6
                                tracking-[-0.01em]
                                ${
                                    isDark
                                        ? "text-[#858585]"
                                        : "text-zinc-500"
                                }
                            `}
                        >
                            Manage your services and start
                            generating new business leads.
                        </p>

                    </div>

                </div>

            </section>


            {/* ------------------------------------------------ */}
            {/* Overview */}
            {/* ------------------------------------------------ */}

            <section
                className="
                    grid
                    gap-4
                    md:grid-cols-2
                "
            >

                {/* Credits */}

                <div
                    className={`
                        group
                        relative
                        overflow-hidden
                        rounded-[12px]
                        border
                        p-6
                        transition-colors
                        duration-200
                        ${
                            isDark
                                ? "border-[#242424] bg-[#0d0d0d] hover:border-[#303030] hover:bg-[#101010]"
                                : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50"
                        }
                    `}
                >

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                        "
                    >

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2.5
                                "
                            >

                                <div
                                    className={`
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-[8px]
                                        border
                                        ${
                                            isDark
                                                ? "border-amber-500/15 bg-amber-500/[0.06]"
                                                : "border-amber-200 bg-amber-50"
                                        }
                                    `}
                                >

                                    <Coins
                                        size={16}
                                        strokeWidth={1.8}
                                        className={
                                            isDark
                                                ? "text-amber-400"
                                                : "text-amber-600"
                                        }
                                    />

                                </div>


                                <h2
                                    className={`
                                        text-[13px]
                                        font-medium
                                        ${
                                            isDark
                                                ? "text-[#999]"
                                                : "text-zinc-500"
                                        }
                                    `}
                                >
                                    Available Credits
                                </h2>

                            </div>


                            <p
                                className={`
                                    mt-5
                                    text-[36px]
                                    font-semibold
                                    leading-none
                                    tracking-[-0.04em]
                                    ${
                                        isDark
                                            ? "text-white"
                                            : "text-zinc-900"
                                    }
                                `}
                            >
                                {profile?.credits ?? 0}
                            </p>


                            <p
                                className={`
                                    mt-2
                                    text-[12px]
                                    ${
                                        isDark
                                            ? "text-[#555]"
                                            : "text-zinc-400"
                                    }
                                `}
                            >
                                Credits available for lead generation
                            </p>

                        </div>


                        <div
                            className={`
                                rounded-full
                                border
                                px-2.5
                                py-1
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.08em]
                                ${
                                    isDark
                                        ? "border-amber-500/15 bg-amber-500/[0.05] text-amber-400"
                                        : "border-amber-200 bg-amber-50 text-amber-600"
                                }
                            `}
                        >
                            Balance
                        </div>

                    </div>

                </div>


                {/* Services Count */}

                <div
                    className={`
                        group
                        rounded-[12px]
                        border
                        p-6
                        transition-colors
                        duration-200
                        ${
                            isDark
                                ? "border-[#242424] bg-[#0d0d0d] hover:border-[#303030] hover:bg-[#101010]"
                                : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50"
                        }
                    `}
                >

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                        "
                    >

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2.5
                                "
                            >

                                <div
                                    className={`
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-[8px]
                                        border
                                        ${
                                            isDark
                                                ? "border-blue-500/15 bg-blue-500/[0.06]"
                                                : "border-blue-100 bg-blue-50"
                                        }
                                    `}
                                >

                                    <BriefcaseBusiness
                                        size={16}
                                        strokeWidth={1.8}
                                        className={
                                            isDark
                                                ? "text-blue-400"
                                                : "text-blue-600"
                                        }
                                    />

                                </div>


                                <h2
                                    className={`
                                        text-[13px]
                                        font-medium
                                        ${
                                            isDark
                                                ? "text-[#999]"
                                                : "text-zinc-500"
                                        }
                                    `}
                                >
                                    Selected Services
                                </h2>

                            </div>


                            <p
                                className={`
                                    mt-5
                                    text-[36px]
                                    font-semibold
                                    leading-none
                                    tracking-[-0.04em]
                                    ${
                                        isDark
                                            ? "text-white"
                                            : "text-zinc-900"
                                    }
                                `}
                            >
                                {services.length}
                            </p>


                            <p
                                className={`
                                    mt-2
                                    text-[12px]
                                    ${
                                        isDark
                                            ? "text-[#555]"
                                            : "text-zinc-400"
                                    }
                                `}
                            >
                                Services currently configured
                            </p>

                        </div>


                        <div
                            className={`
                                rounded-full
                                border
                                px-2.5
                                py-1
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.08em]
                                ${
                                    isDark
                                        ? "border-blue-500/15 bg-blue-500/[0.05] text-blue-400"
                                        : "border-blue-100 bg-blue-50 text-blue-600"
                                }
                            `}
                        >
                            Active
                        </div>

                    </div>

                </div>

            </section>


            {/* ------------------------------------------------ */}
            {/* Selected Services */}
            {/* ------------------------------------------------ */}

            <section
                className={`
                    rounded-[12px]
                    border
                    ${
                        isDark
                            ? "border-[#242424] bg-[#0d0d0d]"
                            : "border-zinc-200 bg-white"
                    }
                `}
            >

                <div
                    className={`
                        border-b
                        px-6
                        py-5
                        ${
                            isDark
                                ? "border-[#242424]"
                                : "border-zinc-200"
                        }
                    `}
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
                    >

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2.5
                                "
                            >

                                <Settings2
                                    size={17}
                                    strokeWidth={1.8}
                                    className={
                                        isDark
                                            ? "text-[#888]"
                                            : "text-zinc-500"
                                    }
                                />

                                <h2
                                    className={`
                                        text-[15px]
                                        font-semibold
                                        tracking-[-0.015em]
                                        ${
                                            isDark
                                                ? "text-white"
                                                : "text-zinc-900"
                                        }
                                    `}
                                >
                                    Selected Services
                                </h2>

                            </div>


                            <p
                                className={`
                                    mt-1.5
                                    text-[12px]
                                    ${
                                        isDark
                                            ? "text-[#666]"
                                            : "text-zinc-500"
                                    }
                                `}
                            >
                                Services configured for your lead
                                generation workflow.
                            </p>

                        </div>


                        {services.length > 0 && (

                            <span
                                className={`
                                    rounded-full
                                    border
                                    px-2.5
                                    py-1
                                    text-[11px]
                                    font-medium
                                    ${
                                        isDark
                                            ? "border-[#2c2c2c] bg-[#151515] text-[#999]"
                                            : "border-zinc-200 bg-zinc-50 text-zinc-600"
                                    }
                                `}
                            >
                                {services.length}
                            </span>

                        )}

                    </div>

                </div>


                <div className="p-6">

                    {services.length === 0 ? (

                        <div
                            className={`
                                flex
                                flex-col
                                items-center
                                justify-center
                                rounded-[9px]
                                border
                                border-dashed
                                px-6
                                py-10
                                text-center
                                ${
                                    isDark
                                        ? "border-[#292929] bg-[#101010]"
                                        : "border-zinc-300 bg-zinc-50"
                                }
                            `}
                        >

                            <div
                                className={`
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-[9px]
                                    border
                                    ${
                                        isDark
                                            ? "border-[#2b2b2b] bg-[#171717]"
                                            : "border-zinc-200 bg-white"
                                    }
                                `}
                            >

                                <BriefcaseBusiness
                                    size={17}
                                    strokeWidth={1.7}
                                    className={
                                        isDark
                                            ? "text-[#777]"
                                            : "text-zinc-400"
                                    }
                                />

                            </div>


                            <p
                                className={`
                                    mt-4
                                    text-[13px]
                                    font-medium
                                    ${
                                        isDark
                                            ? "text-[#bbb]"
                                            : "text-zinc-700"
                                    }
                                `}
                            >
                                No services selected
                            </p>


                            <p
                                className={`
                                    mt-1
                                    max-w-sm
                                    text-[12px]
                                    leading-5
                                    ${
                                        isDark
                                            ? "text-[#555]"
                                            : "text-zinc-500"
                                    }
                                `}
                            >
                                Configure your services to help
                                tailor your lead generation workflow.
                            </p>


                            <Link
                                to="/app/services"
                                className={`
                                    mt-5
                                    inline-flex
                                    h-9
                                    items-center
                                    gap-2
                                    rounded-[8px]
                                    border
                                    px-3.5
                                    text-[12px]
                                    font-medium
                                    transition-all
                                    duration-150
                                    active:scale-[0.98]
                                    ${
                                        isDark
                                            ? "border-[#303030] bg-[#181818] text-[#c0c0c0] hover:border-[#444] hover:bg-[#202020] hover:text-white"
                                            : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
                                    }
                                `}
                            >

                                <Settings2
                                    size={14}
                                    strokeWidth={1.8}
                                />

                                Configure Services

                            </Link>

                        </div>

                    ) : (

                        <div className="flex flex-wrap gap-2.5">

                            {services.map((service) => (

                                <div
                                    key={service.id}
                                    className={`
                                        group
                                        flex
                                        items-center
                                        gap-2
                                        rounded-[8px]
                                        border
                                        px-3
                                        py-2
                                        transition-colors
                                        duration-150
                                        ${
                                            isDark
                                                ? "border-[#2a2a2a] bg-[#151515] hover:border-[#383838] hover:bg-[#191919]"
                                                : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-zinc-100"
                                        }
                                    `}
                                >

                                    <div
                                        className={`
                                            flex
                                            h-5
                                            w-5
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            ${
                                                isDark
                                                    ? "border-emerald-500/15 bg-emerald-500/[0.06]"
                                                    : "border-emerald-200 bg-emerald-50"
                                            }
                                        `}
                                    >

                                        <Check
                                            size={11}
                                            strokeWidth={2}
                                            className={
                                                isDark
                                                    ? "text-emerald-400"
                                                    : "text-emerald-600"
                                            }
                                        />

                                    </div>


                                    <span
                                        className={`
                                            text-[12px]
                                            font-medium
                                            ${
                                                isDark
                                                    ? "text-[#c5c5c5] group-hover:text-white"
                                                    : "text-zinc-700 group-hover:text-zinc-900"
                                            }
                                        `}
                                    >
                                        {service.name}
                                    </span>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </section>


            {/* ------------------------------------------------ */}
            {/* Quick Actions */}
            {/* ------------------------------------------------ */}

            <section>

                <div className="mb-4">

                    <h2
                        className={`
                            text-[15px]
                            font-semibold
                            tracking-[-0.015em]
                            ${
                                isDark
                                    ? "text-white"
                                    : "text-zinc-900"
                            }
                        `}
                    >
                        Quick Actions
                    </h2>


                    <p
                        className={`
                            mt-1.5
                            text-[12px]
                            ${
                                isDark
                                    ? "text-[#666]"
                                    : "text-zinc-500"
                            }
                        `}
                    >
                        Jump directly into your lead generation workflow.
                    </p>

                </div>


                <div
                    className="
                        grid
                        gap-3
                        sm:grid-cols-2
                    "
                >

                    {/* Search Businesses */}

                    <Link
                        to="/app/search"
                        className={`
                            group
                            flex
                            items-center
                            justify-between
                            rounded-[10px]
                            border
                            p-4
                            transition-all
                            duration-200
                            active:scale-[0.99]
                            ${
                                isDark
                                    ? "border-[#292929] bg-[#111111] hover:border-[#3b4655] hover:bg-[#15191e]"
                                    : "border-zinc-200 bg-white hover:border-blue-200 hover:bg-blue-50/30"
                            }
                        `}
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-3.5
                            "
                        >

                            <div
                                className={`
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-[9px]
                                    border
                                    transition-transform
                                    duration-200
                                    group-hover:scale-105
                                    ${
                                        isDark
                                            ? "border-blue-500/15 bg-blue-500/[0.06]"
                                            : "border-blue-100 bg-blue-50"
                                    }
                                `}
                            >

                                <Search
                                    size={17}
                                    strokeWidth={1.8}
                                    className={
                                        isDark
                                            ? "text-blue-400"
                                            : "text-blue-600"
                                    }
                                />

                            </div>


                            <div>

                                <p
                                    className={`
                                        text-[13px]
                                        font-medium
                                        ${
                                            isDark
                                                ? "text-white"
                                                : "text-zinc-900"
                                        }
                                    `}
                                >
                                    Search Businesses
                                </p>


                                <p
                                    className={`
                                        mt-1
                                        text-[11px]
                                        ${
                                            isDark
                                                ? "text-[#5f5f5f]"
                                                : "text-zinc-500"
                                        }
                                    `}
                                >
                                    Discover new potential clients
                                </p>

                            </div>

                        </div>


                        <ArrowRight
                            size={16}
                            strokeWidth={1.8}
                            className={`
                                transition-all
                                duration-200
                                ${
                                    isDark
                                        ? "text-[#555] group-hover:text-blue-400"
                                        : "text-zinc-400 group-hover:text-blue-600"
                                }
                                group-hover:translate-x-0.5
                            `}
                        />

                    </Link>


                    {/* Manage Services */}

                    <Link
                        to="/app/services"
                        className={`
                            group
                            flex
                            items-center
                            justify-between
                            rounded-[10px]
                            border
                            p-4
                            transition-all
                            duration-200
                            active:scale-[0.99]
                            ${
                                isDark
                                    ? "border-[#292929] bg-[#111111] hover:border-[#3b3b3b] hover:bg-[#151515]"
                                    : "border-zinc-200 bg-white hover:border-amber-200 hover:bg-amber-50/30"
                            }
                        `}
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-3.5
                            "
                        >

                            <div
                                className={`
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-[9px]
                                    border
                                    transition-transform
                                    duration-200
                                    group-hover:scale-105
                                    ${
                                        isDark
                                            ? "border-amber-500/15 bg-amber-500/[0.06]"
                                            : "border-amber-200 bg-amber-50"
                                    }
                                `}
                            >

                                <Settings2
                                    size={17}
                                    strokeWidth={1.8}
                                    className={
                                        isDark
                                            ? "text-amber-400"
                                            : "text-amber-600"
                                    }
                                />

                            </div>


                            <div>

                                <p
                                    className={`
                                        text-[13px]
                                        font-medium
                                        ${
                                            isDark
                                                ? "text-white"
                                                : "text-zinc-900"
                                        }
                                    `}
                                >
                                    Manage Services
                                </p>


                                <p
                                    className={`
                                        mt-1
                                        text-[11px]
                                        ${
                                            isDark
                                                ? "text-[#5f5f5f]"
                                                : "text-zinc-500"
                                        }
                                    `}
                                >
                                    Configure your business services
                                </p>

                            </div>

                        </div>


                        <ArrowRight
                            size={16}
                            strokeWidth={1.8}
                            className={`
                                transition-all
                                duration-200
                                ${
                                    isDark
                                        ? "text-[#555] group-hover:text-amber-400"
                                        : "text-zinc-400 group-hover:text-amber-600"
                                }
                                group-hover:translate-x-0.5
                            `}
                        />

                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;