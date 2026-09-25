import { useEffect, useMemo } from "react";
import {
    useNavigate,
    useOutletContext,
} from "react-router-dom";

import {
    useUser,
    useClerk,
} from "@clerk/clerk-react";

import {
    useQuery,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
    UserRound,
    Mail,
    CreditCard,
    CalendarDays,
    BriefcaseBusiness,
    Settings2,
    ArrowRight,
    ShieldCheck,
    RefreshCw,
    CheckCircle2,
} from "lucide-react";

import {
    getProfile,
    getUserServices,
} from "../../services/user.service";


function Profile() {

    const navigate = useNavigate();

    const {
        theme,
    } = useOutletContext();

    const {
        user,
        isLoaded,
    } = useUser();

    const {
        signOut,
    } = useClerk();


    const isDark = theme === "dark";


    /*
    |--------------------------------------------------------------------------
    | Profile Query
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
    | User Services Query
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
    | Query Data
    |--------------------------------------------------------------------------
    */

    const profile =
        profileQuery.data?.user || null;

    const services =
        Array.isArray(
            servicesQuery.data?.services
        )
            ? servicesQuery.data.services
            : [];


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

    const hasError =
        profileQuery.isError ||
        servicesQuery.isError;


    useEffect(() => {

        if (!hasError) {
            return;
        }

        toast.error(
            "Failed to load profile."
        );

    }, [hasError]);


    /*
    |--------------------------------------------------------------------------
    | Display Name
    |--------------------------------------------------------------------------
    */

    const displayName = useMemo(() => {

        return (
            profile?.full_name ||
            user?.fullName ||
            user?.firstName ||
            "User"
        );

    }, [
        profile,
        user,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Email
    |--------------------------------------------------------------------------
    */

    const email = useMemo(() => {

        return (
            profile?.email ||
            user?.primaryEmailAddress?.emailAddress ||
            "Not available"
        );

    }, [
        profile,
        user,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Avatar
    |--------------------------------------------------------------------------
    */

    const avatarUrl =
        user?.imageUrl || null;


    /*
    |--------------------------------------------------------------------------
    | Initials
    |--------------------------------------------------------------------------
    */

    const initials = useMemo(() => {

        const name =
            displayName
                ?.trim()
                .split(/\s+/)
                .filter(Boolean);


        if (!name?.length) {
            return "U";
        }


        if (name.length === 1) {

            return name[0]
                .slice(0, 2)
                .toUpperCase();

        }


        return (
            name[0][0] +
            name[name.length - 1][0]
        ).toUpperCase();

    }, [
        displayName,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Created At
    |--------------------------------------------------------------------------
    */

    const createdAt =
        profile?.created_at ||
        user?.createdAt;


    const formattedCreatedAt =
        createdAt
            ? new Date(
                createdAt
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }
            )
            : "Not available";


    /*
    |--------------------------------------------------------------------------
    | Credits
    |--------------------------------------------------------------------------
    */

    const credits =
        typeof profile?.credits === "number"
            ? profile.credits
            : 0;


    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refreshing =
        profileQuery.isFetching ||
        servicesQuery.isFetching;


    const handleRefresh = async () => {

        try {

            await Promise.all([
                profileQuery.refetch(),
                servicesQuery.refetch(),
            ]);

        } catch (error) {

            console.error(
                "Failed to refresh profile:",
                error
            );

            toast.error(
                "Failed to refresh profile."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Sign Out
    |--------------------------------------------------------------------------
    */

    const handleSignOut = async () => {

        try {

            await signOut();

        } catch (error) {

            console.error(
                "Sign out failed:",
                error
            );

            toast.error(
                "Failed to sign out."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <ProfileSkeleton
                theme={theme}
            />
        );

    }


    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

    return (

        <div className="mx-auto w-full max-w-[1200px] space-y-7">

            {/* ------------------------------------------------
                Header
            ------------------------------------------------ */}

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

                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                        <p
                            className={`
                                text-[11px]
                                font-medium
                                uppercase
                                tracking-[0.12em]
                                ${
                                    isDark
                                        ? "text-[#666]"
                                        : "text-zinc-500"
                                }
                            `}
                        >
                            Account
                        </p>


                        <h1
                            className={`
                                mt-2
                                text-[28px]
                                font-semibold
                                leading-tight
                                tracking-[-0.035em]
                                ${
                                    isDark
                                        ? "text-white"
                                        : "text-zinc-900"
                                }
                            `}
                        >
                            Profile
                        </h1>


                        <p
                            className={`
                                mt-2
                                max-w-xl
                                text-[14px]
                                leading-6
                                ${
                                    isDark
                                        ? "text-[#777]"
                                        : "text-zinc-500"
                                }
                            `}
                        >
                            Manage your LeadFlow account
                            information and services.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className={`
                            inline-flex
                            h-9
                            w-fit
                            items-center
                            justify-center
                            gap-2
                            rounded-[8px]
                            border
                            px-3.5
                            text-[12px]
                            font-medium
                            transition-all
                            duration-150
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            ${
                                isDark
                                    ? "border-[#303030] bg-[#171717] text-[#c0c0c0] hover:border-[#444] hover:bg-[#202020] hover:text-white"
                                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
                            }
                        `}
                    >

                        <RefreshCw
                            size={14}
                            strokeWidth={1.8}
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh

                    </button>

                </div>

            </section>


            {/* ------------------------------------------------
                Profile Overview
            ------------------------------------------------ */}

            <section
                className={`
                    overflow-hidden
                    rounded-[14px]
                    border
                    ${
                        isDark
                            ? "border-[#262626] bg-[#101010]"
                            : "border-zinc-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.035)]"
                    }
                `}
            >

                <div className="p-6 sm:p-7">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                        {/* Avatar */}

                        <div
                            className={`
                                flex
                                h-20
                                w-20
                                shrink-0
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-[16px]
                                border
                                ${
                                    isDark
                                        ? "border-[#303030] bg-[#181818]"
                                        : "border-zinc-200 bg-zinc-50"
                                }
                            `}
                        >

                            {avatarUrl ? (

                                <img
                                    src={avatarUrl}
                                    alt={displayName}
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />

                            ) : (

                                <span
                                    className={`
                                        text-[22px]
                                        font-semibold
                                        tracking-[-0.03em]
                                        ${
                                            isDark
                                                ? "text-zinc-200"
                                                : "text-zinc-700"
                                        }
                                    `}
                                >
                                    {initials}
                                </span>

                            )}

                        </div>


                        {/* Identity */}

                        <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2.5">

                                <h2
                                    className={`
                                        break-words
                                        text-[22px]
                                        font-semibold
                                        tracking-[-0.03em]
                                        ${
                                            isDark
                                                ? "text-white"
                                                : "text-zinc-900"
                                        }
                                    `}
                                >
                                    {displayName}
                                </h2>


                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded-full
                                        border
                                        border-emerald-200
                                        bg-emerald-50
                                        px-2.5
                                        py-1
                                        text-[10px]
                                        font-medium
                                        text-emerald-700
                                        dark:border-emerald-500/20
                                        dark:bg-emerald-500/[0.07]
                                        dark:text-emerald-400
                                    "
                                >

                                    <CheckCircle2
                                        size={11}
                                        strokeWidth={1.9}
                                    />

                                    Active account

                                </span>

                            </div>


                            <div
                                className="
                                    mt-2
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-x-4
                                    gap-y-2
                                    text-[13px]
                                "
                            >

                                <span
                                    className={`
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        ${
                                            isDark
                                                ? "text-[#888]"
                                                : "text-zinc-500"
                                        }
                                    `}
                                >

                                    <Mail
                                        size={14}
                                        strokeWidth={1.7}
                                    />

                                    {email}

                                </span>


                                <span
                                    className={`
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        ${
                                            isDark
                                                ? "text-[#888]"
                                                : "text-zinc-500"
                                        }
                                    `}
                                >

                                    <CalendarDays
                                        size={14}
                                        strokeWidth={1.7}
                                    />

                                    Joined {formattedCreatedAt}

                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Account stats */}

                <div
                    className={`
                        grid
                        border-t
                        sm:grid-cols-3
                        ${
                            isDark
                                ? "border-[#242424]"
                                : "border-zinc-200"
                        }
                    `}
                >

                    <ProfileStat
                        icon={CreditCard}
                        label="Credits"
                        value={credits}
                        color="amber"
                        theme={theme}
                    />


                    <ProfileStat
                        icon={BriefcaseBusiness}
                        label="Services"
                        value={services.length}
                        color="blue"
                        theme={theme}
                    />


                    <ProfileStat
                        icon={ShieldCheck}
                        label="Account"
                        value="Active"
                        color="green"
                        theme={theme}
                    />

                </div>

            </section>


            {/* ------------------------------------------------
                Account Information + Services
            ------------------------------------------------ */}

            <div className="grid gap-5 lg:grid-cols-2">

                {/* Account Information */}

                <ProfileCard
                    icon={UserRound}
                    title="Account Information"
                    description="Information associated with your LeadFlow account."
                    theme={theme}
                >

                    <ProfileInfoRow
                        label="Full name"
                        value={displayName}
                        icon={UserRound}
                        theme={theme}
                    />


                    <ProfileInfoRow
                        label="Email"
                        value={email}
                        icon={Mail}
                        theme={theme}
                    />


                    <ProfileInfoRow
                        label="Member since"
                        value={formattedCreatedAt}
                        icon={CalendarDays}
                        theme={theme}
                    />

                </ProfileCard>


                {/* Services */}

                <ProfileCard
                    icon={BriefcaseBusiness}
                    title="Your Services"
                    description="Services currently associated with your LeadFlow account."
                    theme={theme}
                >

                    {services.length > 0 ? (

                        <div className="space-y-2.5">

                            {services.map(
                                (
                                    service,
                                    index
                                ) => {

                                    const serviceName =
                                        service?.name ||
                                        service?.service_name ||
                                        service?.title ||
                                        `Service ${index + 1}`;


                                    const serviceId =
                                        service?.id ||
                                        service?.service_id ||
                                        index;


                                    return (

                                        <div
                                            key={serviceId}
                                            className={`
                                                flex
                                                items-center
                                                justify-between
                                                gap-4
                                                rounded-[9px]
                                                border
                                                px-3.5
                                                py-3
                                                ${
                                                    isDark
                                                        ? "border-[#292929] bg-[#151515]"
                                                        : "border-zinc-200 bg-zinc-50"
                                                }
                                            `}
                                        >

                                            <div className="flex min-w-0 items-center gap-3">

                                                <div
                                                    className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-[8px]
                                                        border
                                                        border-blue-200
                                                        bg-blue-50
                                                        text-blue-600
                                                        dark:border-blue-500/20
                                                        dark:bg-blue-500/[0.08]
                                                        dark:text-blue-400
                                                    "
                                                >

                                                    <BriefcaseBusiness
                                                        size={14}
                                                        strokeWidth={1.8}
                                                    />

                                                </div>


                                                <span
                                                    className={`
                                                        truncate
                                                        text-[13px]
                                                        font-medium
                                                        ${
                                                            isDark
                                                                ? "text-zinc-200"
                                                                : "text-zinc-800"
                                                        }
                                                    `}
                                                >
                                                    {serviceName}
                                                </span>

                                            </div>


                                            <CheckCircle2
                                                size={15}
                                                strokeWidth={1.8}
                                                className="
                                                    shrink-0
                                                    text-emerald-600
                                                    dark:text-emerald-400
                                                "
                                            />

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    ) : (

                        <div
                            className={`
                                rounded-[10px]
                                border
                                border-dashed
                                p-5
                                text-center
                                ${
                                    isDark
                                        ? "border-[#303030] bg-[#141414]"
                                        : "border-zinc-300 bg-zinc-50"
                                }
                            `}
                        >

                            <BriefcaseBusiness
                                size={20}
                                strokeWidth={1.7}
                                className={
                                    isDark
                                        ? "mx-auto text-[#666]"
                                        : "mx-auto text-zinc-400"
                                }
                            />

                            <p
                                className={`
                                    mt-3
                                    text-[13px]
                                    font-medium
                                    ${
                                        isDark
                                            ? "text-zinc-300"
                                            : "text-zinc-700"
                                    }
                                `}
                            >
                                No services selected
                            </p>

                            <p
                                className={`
                                    mt-1
                                    text-[12px]
                                    leading-5
                                    ${
                                        isDark
                                            ? "text-[#666]"
                                            : "text-zinc-500"
                                    }
                                `}
                            >
                                Choose the services you want
                                LeadFlow to focus on.
                            </p>

                        </div>

                    )}


                    <button
                        type="button"
                        onClick={() =>
                            navigate("/app/services")
                        }
                        className={`
                            mt-5
                            inline-flex
                            h-9
                            w-fit
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
                                    ? "border-[#303030] bg-[#171717] text-[#c0c0c0] hover:border-[#444] hover:bg-[#202020] hover:text-white"
                                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
                            }
                        `}
                    >

                        <Settings2
                            size={14}
                            strokeWidth={1.8}
                        />

                        Manage Services

                        <ArrowRight
                            size={13}
                            strokeWidth={1.8}
                        />

                    </button>

                </ProfileCard>

            </div>


            {/* ------------------------------------------------
                Credits
            ------------------------------------------------ */}

            <section
                className={`
                    rounded-[12px]
                    border
                    p-6
                    ${
                        isDark
                            ? "border-amber-500/15 bg-amber-500/[0.025]"
                            : "border-amber-200 bg-amber-50/60"
                    }
                `}
            >

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-start gap-3.5">

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-[9px]
                                border
                                border-amber-200
                                bg-amber-50
                                dark:border-amber-500/20
                                dark:bg-amber-500/[0.07]
                            "
                        >

                            <CreditCard
                                size={18}
                                strokeWidth={1.8}
                                className="
                                    text-amber-600
                                    dark:text-amber-400
                                "
                            />

                        </div>


                        <div>

                            <h3
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
                                Available Credits
                            </h3>

                            <p
                                className={`
                                    mt-1
                                    text-[12px]
                                    leading-5
                                    ${
                                        isDark
                                            ? "text-[#777]"
                                            : "text-zinc-500"
                                    }
                                `}
                            >
                                Credits available for your
                                LeadFlow analysis operations.
                            </p>

                        </div>

                    </div>


                    <div
                        className="
                            text-left
                            sm:text-right
                        "
                    >

                        <p
                            className="
                                text-[28px]
                                font-semibold
                                tracking-[-0.04em]
                                text-amber-700
                                dark:text-amber-300
                            "
                        >
                            {credits}
                        </p>

                        <p
                            className="
                                text-[11px]
                                font-medium
                                uppercase
                                tracking-[0.08em]
                                text-amber-600
                                dark:text-amber-400/60
                            "
                        >
                            Credits
                        </p>

                    </div>

                </div>

            </section>


            {/* ------------------------------------------------
                Account Actions
            ------------------------------------------------ */}

            <section
                className={`
                    overflow-hidden
                    rounded-[12px]
                    border
                    ${
                        isDark
                            ? "border-[#262626] bg-[#101010]"
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

                    <h3
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
                        Account Actions
                    </h3>

                    <p
                        className={`
                            mt-1.5
                            text-[12px]
                            leading-5
                            ${
                                isDark
                                    ? "text-[#666]"
                                    : "text-zinc-500"
                            }
                        `}
                    >
                        Manage your LeadFlow session.
                    </p>

                </div>


                <div className="p-6">

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="
                            inline-flex
                            h-10
                            items-center
                            gap-2
                            rounded-[8px]
                            border
                            border-red-200
                            bg-red-50
                            px-4
                            text-[12px]
                            font-medium
                            text-red-600
                            transition-all
                            duration-150
                            hover:border-red-300
                            hover:bg-red-100
                            hover:text-red-700
                            active:scale-[0.98]
                            dark:border-red-500/20
                            dark:bg-red-500/[0.06]
                            dark:text-red-400
                            dark:hover:border-red-500/30
                            dark:hover:bg-red-500/[0.1]
                            dark:hover:text-red-300
                        "
                    >

                        <ShieldCheck
                            size={14}
                            strokeWidth={1.8}
                        />

                        Sign Out

                    </button>

                </div>

            </section>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Profile Stat
|--------------------------------------------------------------------------
*/

function ProfileStat({
    icon: Icon,
    label,
    value,
    color,
    theme,
}) {

    const styles = {

        amber: {
            icon:
                "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/[0.07] dark:text-amber-400",

            label:
                "text-amber-600 dark:text-amber-400/60",

            value:
                "text-amber-700 dark:text-amber-200",
        },


        blue: {
            icon:
                "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/[0.07] dark:text-blue-400",

            label:
                "text-blue-600 dark:text-blue-400/60",

            value:
                "text-blue-700 dark:text-blue-200",
        },


        green: {
            icon:
                "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/[0.07] dark:text-emerald-400",

            label:
                "text-emerald-600 dark:text-emerald-400/60",

            value:
                "text-emerald-700 dark:text-emerald-200",
        },

    };


    const selected =
        styles[color] || styles.blue;


    return (

        <div
            className={`
                flex
                min-h-[100px]
                items-center
                gap-3.5
                border-b
                p-5
                sm:border-b-0
                sm:border-r
                sm:last:border-r-0
                ${
                    theme === "dark"
                        ? "border-[#242424]"
                        : "border-zinc-200"
                }
            `}
        >

            <div
                className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-[8px]
                    border
                    ${selected.icon}
                `}
            >

                <Icon
                    size={16}
                    strokeWidth={1.8}
                />

            </div>


            <div>

                <p
                    className={`
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.08em]
                        ${selected.label}
                    `}
                >
                    {label}
                </p>

                <p
                    className={`
                        mt-1
                        text-[21px]
                        font-semibold
                        tracking-[-0.03em]
                        ${selected.value}
                    `}
                >
                    {value}
                </p>

            </div>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Profile Card
|--------------------------------------------------------------------------
*/

function ProfileCard({
    icon: Icon,
    title,
    description,
    children,
    theme,
}) {

    return (

        <section
            className={`
                overflow-hidden
                rounded-[12px]
                border
                ${
                    theme === "dark"
                        ? "border-[#262626] bg-[#101010]"
                        : "border-zinc-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.035)]"
                }
            `}
        >

            <div
                className={`
                    border-b
                    px-6
                    py-5
                    ${
                        theme === "dark"
                            ? "border-[#242424]"
                            : "border-zinc-200"
                    }
                `}
            >

                <div className="flex items-center gap-2.5">

                    <div
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-[8px]
                            border
                            border-blue-200
                            bg-blue-50
                            text-blue-600
                            dark:border-blue-500/20
                            dark:bg-blue-500/[0.07]
                            dark:text-blue-400
                        "
                    >

                        <Icon
                            size={15}
                            strokeWidth={1.8}
                        />

                    </div>


                    <h3
                        className={`
                            text-[15px]
                            font-semibold
                            tracking-[-0.015em]
                            ${
                                theme === "dark"
                                    ? "text-white"
                                    : "text-zinc-900"
                            }
                        `}
                    >
                        {title}
                    </h3>

                </div>


                <p
                    className={`
                        mt-2
                        text-[12px]
                        leading-5
                        ${
                            theme === "dark"
                                ? "text-[#666]"
                                : "text-zinc-500"
                        }
                    `}
                >
                    {description}
                </p>

            </div>


            <div className="px-6 py-1">

                {children}

            </div>

        </section>
    );
}


/*
|--------------------------------------------------------------------------
| Profile Info Row
|--------------------------------------------------------------------------
*/

function ProfileInfoRow({
    label,
    value,
    icon: Icon,
    theme,
}) {

    return (

        <div
            className={`
                flex
                min-h-[70px]
                items-center
                gap-4
                border-b
                last:border-0
                ${
                    theme === "dark"
                        ? "border-[#242424]"
                        : "border-zinc-200"
                }
            `}
        >

            <div
                className={`
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-[8px]
                    border
                    ${
                        theme === "dark"
                            ? "border-[#303030] bg-[#171717] text-[#888]"
                            : "border-zinc-200 bg-zinc-50 text-zinc-500"
                    }
                `}
            >

                <Icon
                    size={15}
                    strokeWidth={1.7}
                />

            </div>


            <div className="min-w-0">

                <p
                    className={`
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.08em]
                        ${
                            theme === "dark"
                                ? "text-[#666]"
                                : "text-zinc-400"
                        }
                    `}
                >
                    {label}
                </p>

                <p
                    className={`
                        mt-1
                        truncate
                        text-[13px]
                        font-medium
                        ${
                            theme === "dark"
                                ? "text-[#ccc]"
                                : "text-zinc-800"
                        }
                    `}
                    title={value}
                >
                    {value}
                </p>

            </div>

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| Loading Skeleton
|--------------------------------------------------------------------------
*/

function ProfileSkeleton({
    theme,
}) {

    const isDark =
        theme === "dark";


    return (

        <div className="mx-auto w-full max-w-[1200px] space-y-7">

            <div
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
                    className={`
                        h-3
                        w-20
                        animate-pulse
                        rounded
                        ${
                            isDark
                                ? "bg-[#222]"
                                : "bg-zinc-200"
                        }
                    `}
                />

                <div
                    className={`
                        mt-3
                        h-8
                        w-36
                        animate-pulse
                        rounded
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
                        w-80
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


            <div
                className={`
                    overflow-hidden
                    rounded-[14px]
                    border
                    ${
                        isDark
                            ? "border-[#262626] bg-[#101010]"
                            : "border-zinc-200 bg-white"
                    }
                `}
            >

                <div className="p-7">

                    <div className="flex items-center gap-5">

                        <div
                            className={`
                                h-20
                                w-20
                                animate-pulse
                                rounded-[16px]
                                ${
                                    isDark
                                        ? "bg-[#1b1b1b]"
                                        : "bg-zinc-100"
                                }
                            `}
                        />

                        <div className="space-y-3">

                            <div
                                className={`
                                    h-6
                                    w-48
                                    animate-pulse
                                    rounded
                                    ${
                                        isDark
                                            ? "bg-[#1b1b1b]"
                                            : "bg-zinc-100"
                                    }
                                `}
                            />

                            <div
                                className={`
                                    h-4
                                    w-64
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

                    </div>

                </div>


                <div
                    className={`
                        grid
                        border-t
                        sm:grid-cols-3
                        ${
                            isDark
                                ? "border-[#242424]"
                                : "border-zinc-200"
                        }
                    `}
                >

                    {[1, 2, 3].map(
                        (item) => (

                            <div
                                key={item}
                                className={`
                                    h-24
                                    animate-pulse
                                    border-b
                                    p-5
                                    sm:border-b-0
                                    sm:border-r
                                    ${
                                        isDark
                                            ? "border-[#242424]"
                                            : "border-zinc-200"
                                    }
                                `}
                            >

                                <div
                                    className={`
                                        h-3
                                        w-20
                                        rounded
                                        ${
                                            isDark
                                                ? "bg-[#222]"
                                                : "bg-zinc-100"
                                        }
                                    `}
                                />

                                <div
                                    className={`
                                        mt-3
                                        h-6
                                        w-14
                                        rounded
                                        ${
                                            isDark
                                                ? "bg-[#1b1b1b]"
                                                : "bg-zinc-100"
                                        }
                                    `}
                                />

                            </div>

                        )
                    )}

                </div>

            </div>


            <div className="grid gap-5 lg:grid-cols-2">

                {[1, 2].map(
                    (item) => (

                        <div
                            key={item}
                            className={`
                                h-72
                                animate-pulse
                                rounded-[12px]
                                border
                                ${
                                    isDark
                                        ? "border-[#262626] bg-[#101010]"
                                        : "border-zinc-200 bg-white"
                                }
                            `}
                        />

                    )
                )}

            </div>

        </div>
    );
}


export default Profile;