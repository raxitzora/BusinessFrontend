import {
    Bookmark,
    Building2,
    Eye,
    Globe2,
    MapPin,
    Phone,
    Star,
    MessageSquare,
    Trash2,
    LoaderCircle,
    ArrowUpRight,
    Search,
} from "lucide-react";

import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getSavedLeads,
    removeSavedLead,
} from "../../services/business.service";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";


function SavedLeads() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { theme } = useOutletContext();

    const isDark = theme === "dark";

    const [removingId, setRemovingId] =
        useState(null);


    /* =========================================================
       SAVED LEADS QUERY
    ========================================================= */

    const savedLeadsQuery = useQuery({
        queryKey: ["saved-leads"],
        queryFn: getSavedLeads,
    });

    const leads =
        savedLeadsQuery.data?.businesses || [];

    const loading =
        savedLeadsQuery.isPending;


    /* =========================================================
       REMOVE LEAD MUTATION
    ========================================================= */

    const removeLeadMutation = useMutation({

        mutationFn: (businessId) =>
            removeSavedLead(businessId),

        onMutate: async (businessId) => {

            setRemovingId(businessId);

            await queryClient.cancelQueries({
                queryKey: ["saved-leads"],
            });

            const previousData =
                queryClient.getQueryData([
                    "saved-leads",
                ]);

            queryClient.setQueryData(
                ["saved-leads"],
                (currentData) => {

                    if (!currentData) {
                        return currentData;
                    }

                    return {
                        ...currentData,
                        businesses:
                            currentData.businesses?.filter(
                                (lead) =>
                                    lead.id !==
                                    businessId
                            ) || [],
                    };

                }
            );

            return {
                previousData,
            };

        },

        onSuccess: () => {

            toast.success(
                "Lead removed from saved leads."
            );

        },

        onError: (error, businessId, context) => {

            console.error(
                "Failed to remove lead:",
                error
            );

            if (context?.previousData) {

                queryClient.setQueryData(
                    ["saved-leads"],
                    context.previousData
                );

            }

            toast.error(
                "Failed to remove lead."
            );

        },

        onSettled: () => {

            setRemovingId(null);

            queryClient.invalidateQueries({
                queryKey: ["saved-leads"],
            });

        },

    });


    /* =========================================================
       REMOVE HANDLER
    ========================================================= */

    const handleRemove = (businessId) => {

        if (removeLeadMutation.isPending) {
            return;
        }

        removeLeadMutation.mutate(
            businessId
        );

    };


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (

            <section
                className={`
                    min-h-full
                    transition-colors
                    duration-200
                    ${
                        isDark
                            ? "text-white"
                            : "text-[#111111]"
                    }
                `}
            >

                <div className="space-y-7">

                    {/* Header skeleton */}

                    <div>

                        <div
                            className={`
                                h-8
                                w-44
                                animate-pulse
                                rounded-lg
                                ${
                                    isDark
                                        ? "bg-zinc-800"
                                        : "bg-zinc-200"
                                }
                            `}
                        />

                        <div
                            className={`
                                mt-3
                                h-4
                                w-72
                                animate-pulse
                                rounded
                                ${
                                    isDark
                                        ? "bg-zinc-800"
                                        : "bg-zinc-200"
                                }
                            `}
                        />

                    </div>


                    {/* Card skeletons */}

                    <div
                        className="
                            grid
                            gap-4
                            sm:grid-cols-2
                            xl:grid-cols-3
                        "
                    >

                        {Array.from({
                            length: 6,
                        }).map((_, index) => (

                            <div
                                key={index}
                                className={`
                                    h-[290px]
                                    animate-pulse
                                    rounded-2xl
                                    border
                                    ${
                                        isDark
                                            ? "border-zinc-800 bg-zinc-900"
                                            : "border-zinc-200 bg-white"
                                    }
                                `}
                            />

                        ))}

                    </div>

                </div>

            </section>

        );

    }


    /* =========================================================
       ERROR STATE
    ========================================================= */

    if (savedLeadsQuery.isError) {

        return (

            <section className="space-y-6">

                <div
                    className={`
                        rounded-2xl
                        border
                        p-8
                        ${
                            isDark
                                ? "border-red-500/20 bg-red-500/5"
                                : "border-red-200 bg-red-50"
                        }
                    `}
                >

                    <div className="flex items-start gap-4">

                        <div
                            className={`
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                ${
                                    isDark
                                        ? "bg-red-500/10"
                                        : "bg-red-100"
                                }
                            `}
                        >

                            <Bookmark
                                size={18}
                                className="text-red-500"
                            />

                        </div>


                        <div>

                            <h2
                                className={`
                                    text-sm
                                    font-semibold
                                    ${
                                        isDark
                                            ? "text-white"
                                            : "text-zinc-900"
                                    }
                                `}
                            >
                                Unable to load saved leads
                            </h2>

                            <p
                                className={`
                                    mt-1
                                    text-sm
                                    ${
                                        isDark
                                            ? "text-zinc-400"
                                            : "text-zinc-500"
                                    }
                                `}
                            >
                                Something went wrong while
                                loading your saved businesses.
                            </p>


                            <button
                                type="button"
                                onClick={() =>
                                    savedLeadsQuery.refetch()
                                }
                                className="
                                    mt-5
                                    rounded-lg
                                    bg-blue-600
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-white
                                    transition-colors
                                    hover:bg-blue-700
                                "
                            >
                                Try Again
                            </button>

                        </div>

                    </div>

                </div>

            </section>

        );

    }


    /* =========================================================
       EMPTY STATE
    ========================================================= */

    if (!leads.length) {

        return (

            <section
                className={`
                    flex
                    min-h-[calc(100vh-150px)]
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    ${
                        isDark
                            ? "border-zinc-800 bg-zinc-900/40"
                            : "border-zinc-200 bg-white"
                    }
                `}
            >

                <div
                    className="
                        w-full
                        max-w-md
                        px-6
                        py-12
                        text-center
                    "
                >

                    <div
                        className={`
                            mx-auto
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-2xl
                            ${
                                isDark
                                    ? "bg-blue-500/10"
                                    : "bg-blue-50"
                            }
                        `}
                    >

                        <Bookmark
                            size={27}
                            strokeWidth={1.8}
                            className="text-blue-600"
                        />

                    </div>


                    <h2
                        className={`
                            mt-6
                            text-xl
                            font-semibold
                            tracking-tight
                            ${
                                isDark
                                    ? "text-white"
                                    : "text-zinc-900"
                            }
                        `}
                    >
                        No saved leads yet
                    </h2>


                    <p
                        className={`
                            mx-auto
                            mt-2
                            max-w-sm
                            text-sm
                            leading-6
                            ${
                                isDark
                                    ? "text-zinc-400"
                                    : "text-zinc-500"
                            }
                        `}
                    >
                        Save businesses from your search
                        results and they'll be collected here
                        for quick access.
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            navigate("/app/search")
                        }
                        className="
                            mt-7
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-blue-600
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            transition-colors
                            hover:bg-blue-700
                            active:bg-blue-800
                        "
                    >

                        <Search size={16} />

                        Find Businesses

                    </button>

                </div>

            </section>

        );

    }


    /* =========================================================
       SAVED LEADS
    ========================================================= */

    return (

        <section
            className={`
                min-h-full
                transition-colors
                duration-200
                ${
                    isDark
                        ? "text-white"
                        : "text-zinc-900"
                }
            `}
        >

            <div className="space-y-7">


                {/* =================================================
                   HEADER
                ================================================= */}

                <div
                    className="
                        flex
                        flex-col
                        gap-5
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
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
                                    rounded-xl
                                    ${
                                        isDark
                                            ? "bg-blue-500/10"
                                            : "bg-blue-50"
                                    }
                                `}
                            >

                                <Bookmark
                                    size={18}
                                    strokeWidth={2}
                                    className="text-blue-600"
                                />

                            </div>


                            <h1
                                className={`
                                    text-2xl
                                    font-semibold
                                    tracking-tight
                                    ${
                                        isDark
                                            ? "text-white"
                                            : "text-zinc-900"
                                    }
                                `}
                            >
                                Saved Leads
                            </h1>

                        </div>


                        <p
                            className={`
                                mt-2
                                text-sm
                                ${
                                    isDark
                                        ? "text-zinc-400"
                                        : "text-zinc-500"
                                }
                            `}
                        >
                            Businesses you've saved for
                            follow-up and outreach.
                        </p>

                    </div>


                    {/* Lead count */}

                    <div
                        className={`
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-lg
                            border
                            px-3.5
                            py-2
                            ${
                                isDark
                                    ? "border-zinc-800 bg-zinc-900"
                                    : "border-zinc-200 bg-white"
                            }
                        `}
                    >

                        <span
                            className={`
                                text-sm
                                font-semibold
                                ${
                                    isDark
                                        ? "text-white"
                                        : "text-zinc-900"
                                }
                            `}
                        >
                            {leads.length}
                        </span>

                        <span
                            className={`
                                text-sm
                                ${
                                    isDark
                                        ? "text-zinc-500"
                                        : "text-zinc-500"
                                }
                            `}
                        >
                            {leads.length === 1
                                ? "saved lead"
                                : "saved leads"}
                        </span>

                    </div>

                </div>


                {/* =================================================
                   LEAD GRID
                ================================================= */}

                <div
                    className="
                        grid
                        gap-4
                        sm:grid-cols-2
                        xl:grid-cols-3
                    "
                >

                    {leads.map((business) => {

                        const hasWebsite =
                            Boolean(
                                business.website
                            );

                        const rating =
                            business.google_rating;

                        return (

                            <article
                                key={business.id}
                                className={`
                                    group
                                    flex
                                    min-w-0
                                    flex-col
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    transition-colors
                                    duration-200
                                    ${
                                        isDark
                                            ? "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                                            : "border-zinc-200 bg-white hover:border-zinc-300"
                                    }
                                `}
                            >

                                {/* =================================
                                   CARD TOP
                                ================================= */}

                                <div className="p-5">

                                    <div
                                        className="
                                            flex
                                            items-start
                                            gap-3
                                        "
                                    >

                                        {/* Business icon */}

                                        <div
                                            className={`
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                border
                                                ${
                                                    isDark
                                                        ? "border-zinc-800 bg-zinc-950 text-zinc-300"
                                                        : "border-zinc-200 bg-zinc-50 text-zinc-600"
                                                }
                                            `}
                                        >

                                            <Building2
                                                size={18}
                                                strokeWidth={1.8}
                                            />

                                        </div>


                                        {/* Name */}

                                        <div
                                            className="
                                                min-w-0
                                                flex-1
                                            "
                                        >

                                            <h2
                                                className={`
                                                    truncate
                                                    text-[15px]
                                                    font-semibold
                                                    leading-5
                                                    ${
                                                        isDark
                                                            ? "text-white"
                                                            : "text-zinc-900"
                                                    }
                                                `}
                                                title={
                                                    business.business_name
                                                }
                                            >
                                                {
                                                    business.business_name
                                                }
                                            </h2>


                                            <div
                                                className="
                                                    mt-1.5
                                                    flex
                                                    items-center
                                                    gap-2
                                                "
                                            >

                                                <span
                                                    className={`
                                                        truncate
                                                        text-xs
                                                        ${
                                                            isDark
                                                                ? "text-zinc-500"
                                                                : "text-zinc-500"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        business.category ||
                                                        "Business"
                                                    }
                                                </span>


                                                {hasWebsite && (

                                                    <>
                                                        <span
                                                            className={`
                                                                h-1
                                                                w-1
                                                                shrink-0
                                                                rounded-full
                                                                ${
                                                                    isDark
                                                                        ? "bg-zinc-700"
                                                                        : "bg-zinc-300"
                                                                }
                                                            `}
                                                        />

                                                        <span
                                                            className="
                                                                inline-flex
                                                                shrink-0
                                                                items-center
                                                                gap-1
                                                                text-xs
                                                                font-medium
                                                                text-emerald-600
                                                            "
                                                        >

                                                            <Globe2
                                                                size={12}
                                                            />

                                                            Website

                                                        </span>

                                                    </>

                                                )}

                                            </div>

                                        </div>


                                        {/* Open */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/business/${business.id}`
                                                )
                                            }
                                            aria-label={`Open ${business.business_name}`}
                                            className={`
                                                flex
                                                h-8
                                                w-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                border
                                                transition-colors
                                                ${
                                                    isDark
                                                        ? "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                                                        : "border-zinc-200 text-zinc-400 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
                                                }
                                            `}
                                        >

                                            <ArrowUpRight
                                                size={15}
                                            />

                                        </button>

                                    </div>


                                    {/* =================================
                                       METRICS
                                    ================================= */}

                                    <div
                                        className="
                                            mt-5
                                            grid
                                            grid-cols-2
                                            gap-2
                                        "
                                    >

                                        <div
                                            className={`
                                                rounded-xl
                                                border
                                                px-3
                                                py-2.5
                                                ${
                                                    isDark
                                                        ? "border-zinc-800 bg-zinc-950/60"
                                                        : "border-zinc-200 bg-zinc-50"
                                                }
                                            `}
                                        >

                                            <p
                                                className={`
                                                    text-[11px]
                                                    font-medium
                                                    uppercase
                                                    tracking-wide
                                                    ${
                                                        isDark
                                                            ? "text-zinc-600"
                                                            : "text-zinc-400"
                                                    }
                                                `}
                                            >
                                                Rating
                                            </p>


                                            <div
                                                className="
                                                    mt-1
                                                    flex
                                                    items-center
                                                    gap-1.5
                                                "
                                            >

                                                <Star
                                                    size={14}
                                                    className="
                                                        fill-amber-400
                                                        text-amber-400
                                                    "
                                                />

                                                <span
                                                    className={`
                                                        text-sm
                                                        font-semibold
                                                        ${
                                                            isDark
                                                                ? "text-zinc-200"
                                                                : "text-zinc-800"
                                                        }
                                                    `}
                                                >
                                                    {rating ??
                                                        "N/A"}
                                                </span>

                                            </div>

                                        </div>


                                        <div
                                            className={`
                                                rounded-xl
                                                border
                                                px-3
                                                py-2.5
                                                ${
                                                    isDark
                                                        ? "border-zinc-800 bg-zinc-950/60"
                                                        : "border-zinc-200 bg-zinc-50"
                                                }
                                            `}
                                        >

                                            <p
                                                className={`
                                                    text-[11px]
                                                    font-medium
                                                    uppercase
                                                    tracking-wide
                                                    ${
                                                        isDark
                                                            ? "text-zinc-600"
                                                            : "text-zinc-400"
                                                    }
                                                `}
                                            >
                                                Reviews
                                            </p>


                                            <div
                                                className="
                                                    mt-1
                                                    flex
                                                    items-center
                                                    gap-1.5
                                                "
                                            >

                                                <MessageSquare
                                                    size={14}
                                                    className={
                                                        isDark
                                                            ? "text-zinc-500"
                                                            : "text-zinc-400"
                                                    }
                                                />

                                                <span
                                                    className={`
                                                        text-sm
                                                        font-semibold
                                                        ${
                                                            isDark
                                                                ? "text-zinc-200"
                                                                : "text-zinc-800"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        business.review_count ??
                                                        0
                                                    }
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* =================================
                                       CONTACT DETAILS
                                    ================================= */}

                                    <div
                                        className={`
                                            mt-4
                                            space-y-3
                                            border-t
                                            pt-4
                                            ${
                                                isDark
                                                    ? "border-zinc-800"
                                                    : "border-zinc-200"
                                            }
                                        `}
                                    >

                                        {/* Address */}

                                        <div
                                            className="
                                                flex
                                                items-start
                                                gap-2.5
                                            "
                                        >

                                            <MapPin
                                                size={15}
                                                className={`
                                                    mt-0.5
                                                    shrink-0
                                                    ${
                                                        isDark
                                                            ? "text-zinc-500"
                                                            : "text-zinc-400"
                                                    }
                                                `}
                                            />

                                            <p
                                                className={`
                                                    line-clamp-2
                                                    min-w-0
                                                    text-xs
                                                    leading-5
                                                    ${
                                                        isDark
                                                            ? "text-zinc-400"
                                                            : "text-zinc-500"
                                                    }
                                                `}
                                                title={
                                                    business.address
                                                }
                                            >
                                                {
                                                    business.address ||
                                                    "Address not available"
                                                }
                                            </p>

                                        </div>


                                        {/* Phone */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2.5
                                            "
                                        >

                                            <Phone
                                                size={15}
                                                className={`
                                                    shrink-0
                                                    ${
                                                        isDark
                                                            ? "text-zinc-500"
                                                            : "text-zinc-400"
                                                    }
                                                `}
                                            />

                                            <p
                                                className={`
                                                    truncate
                                                    text-xs
                                                    ${
                                                        isDark
                                                            ? "text-zinc-400"
                                                            : "text-zinc-500"
                                                    }
                                                `}
                                            >
                                                {
                                                    business.phone ||
                                                    "Phone not available"
                                                }
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* =================================
                                   ACTIONS
                                ================================= */}

                                <div
                                    className={`
                                        mt-auto
                                        grid
                                        grid-cols-2
                                        gap-2
                                        border-t
                                        p-4
                                        ${
                                            isDark
                                                ? "border-zinc-800 bg-zinc-950/30"
                                                : "border-zinc-200 bg-zinc-50/70"
                                        }
                                    `}
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/business/${business.id}`
                                            )
                                        }
                                        className="
                                            flex
                                            min-h-10
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-lg
                                            border
                                            border-blue-600
                                            bg-blue-600
                                            px-3
                                            py-2
                                            text-xs
                                            font-medium
                                            text-white
                                            transition-colors
                                            hover:bg-blue-700
                                            active:bg-blue-800
                                        "
                                    >

                                        <Eye size={15} />

                                        View Details

                                    </button>


                                    <button
                                        type="button"
                                        disabled={
                                            removingId ===
                                            business.id
                                        }
                                        onClick={() =>
                                            handleRemove(
                                                business.id
                                            )
                                        }
                                        className={`
                                            flex
                                            min-h-10
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-lg
                                            border
                                            px-3
                                            py-2
                                            text-xs
                                            font-medium
                                            transition-colors
                                            disabled:cursor-wait
                                            disabled:opacity-50
                                            ${
                                                isDark
                                                    ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
                                                    : "border-zinc-200 bg-white text-zinc-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                            }
                                        `}
                                    >

                                        {removingId ===
                                        business.id ? (

                                            <>

                                                <LoaderCircle
                                                    size={15}
                                                    className="
                                                        animate-spin
                                                    "
                                                />

                                                Removing

                                            </>

                                        ) : (

                                            <>

                                                <Trash2
                                                    size={15}
                                                />

                                                Remove

                                            </>

                                        )}

                                    </button>

                                </div>

                            </article>

                        );

                    })}

                </div>

            </div>

        </section>

    );

}


export default SavedLeads;