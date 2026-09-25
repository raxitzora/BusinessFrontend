import { useNavigate, useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";

import {
    History,
    Search,
    RotateCcw,
    MapPin,
    Building2,
    CalendarDays,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { getSearchHistory } from "../../services/business.service";


function SearchHistory() {

    const navigate = useNavigate();

    const { theme } = useOutletContext();

    const isDark = theme === "dark";


    /* =========================================================
       SEARCH HISTORY QUERY
    ========================================================= */

    const searchHistoryQuery = useQuery({

        queryKey: ["search-history"],

        queryFn: getSearchHistory,

    });


    const history =
        searchHistoryQuery.data?.history || [];

    const loading =
        searchHistoryQuery.isPending;


    /* =========================================================
       ERROR HANDLING
    ========================================================= */

    if (searchHistoryQuery.isError) {

        toast.error(
            "Failed to load search history."
        );

        return (

            <div className="space-y-8">

                <section
                    className={`
                        flex
                        min-h-[430px]
                        flex-col
                        items-center
                        justify-center
                        rounded-[12px]
                        border
                        px-6
                        ${
                            isDark
                                ? "border-red-500/20 bg-[#0d0d0d]"
                                : "border-red-200 bg-white"
                        }
                    `}
                >

                    <div
                        className={`
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-[12px]
                            border
                            ${
                                isDark
                                    ? "border-red-500/20 bg-red-500/5"
                                    : "border-red-200 bg-red-50"
                            }
                        `}
                    >

                        <History
                            size={24}
                            strokeWidth={1.7}
                            className="text-red-500"
                        />

                    </div>


                    <h2
                        className={`
                            mt-5
                            text-[18px]
                            font-semibold
                            tracking-[-0.02em]
                            ${
                                isDark
                                    ? "text-white"
                                    : "text-zinc-900"
                            }
                        `}
                    >
                        Failed to Load Search History
                    </h2>


                    <p
                        className={`
                            mt-2
                            max-w-md
                            text-center
                            text-[14px]
                            leading-6
                            ${
                                isDark
                                    ? "text-[#666]"
                                    : "text-zinc-500"
                            }
                        `}
                    >
                        Something went wrong while loading
                        your previous searches.
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            searchHistoryQuery.refetch()
                        }
                        className="
                            mt-6
                            inline-flex
                            h-10
                            items-center
                            gap-2
                            rounded-[8px]
                            bg-zinc-900
                            px-4
                            text-[13px]
                            font-medium
                            text-white
                            transition-all
                            duration-150
                            hover:bg-zinc-800
                            active:scale-[0.98]
                            dark:bg-white
                            dark:text-black
                            dark:hover:bg-[#e8e8e8]
                        "
                    >

                        <RotateCcw
                            size={14}
                            strokeWidth={1.8}
                        />

                        Try Again

                    </button>

                </section>

            </div>

        );

    }


    /* =========================================================
       SEARCH AGAIN
    ========================================================= */

    const handleSearchAgain = (item) => {

        navigate(
            `/search?keyword=${encodeURIComponent(
                item.keyword
            )}&location=${encodeURIComponent(
                item.location
            )}&page=1`
        );

    };


    /* =========================================================
       DATE FORMAT
    ========================================================= */

    const formatDate = (date) => {

        return new Date(date).toLocaleString(
            "en-IN",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }
        );

    };


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (

            <div className="space-y-8">

                {/* Header Skeleton */}

                <div>

                    <div
                        className={`
                            h-8
                            w-56
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


                {/* Table Skeleton */}

                <div
                    className={`
                        overflow-hidden
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
                            hidden
                            h-12
                            items-center
                            gap-6
                            border-b
                            px-6
                            md:grid
                            md:grid-cols-[1.5fr_1.2fr_1fr_1.2fr_auto]
                            ${
                                isDark
                                    ? "border-[#242424] bg-[#111111]"
                                    : "border-zinc-200 bg-zinc-50"
                            }
                        `}
                    >

                        <div
                            className={`
                                h-3
                                w-16
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
                                h-3
                                w-28
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
                                h-3
                                w-16
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
                                h-3
                                w-14
                                animate-pulse
                                rounded
                                ${
                                    isDark
                                        ? "bg-[#222]"
                                        : "bg-zinc-200"
                                }
                            `}
                        />

                    </div>


                    {Array.from({
                        length: 5,
                    }).map((_, index) => (

                        <div
                            key={index}
                            className={`
                                flex
                                min-h-[92px]
                                animate-pulse
                                items-center
                                gap-5
                                border-b
                                px-5
                                last:border-b-0
                                md:px-6
                                ${
                                    isDark
                                        ? "border-[#202020]"
                                        : "border-zinc-200"
                                }
                            `}
                        >

                            <div
                                className={`
                                    h-10
                                    w-10
                                    shrink-0
                                    rounded-[9px]
                                    ${
                                        isDark
                                            ? "bg-[#1b1b1b]"
                                            : "bg-zinc-100"
                                    }
                                `}
                            />


                            <div
                                className="
                                    flex-1
                                    space-y-2
                                "
                            >

                                <div
                                    className={`
                                        h-4
                                        w-36
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
                                        mt-1
                                        h-3
                                        w-24
                                        rounded
                                        md:hidden
                                        ${
                                            isDark
                                                ? "bg-[#161616]"
                                                : "bg-zinc-100"
                                        }
                                    `}
                                />

                            </div>


                            <div
                                className={`
                                    hidden
                                    h-4
                                    w-28
                                    rounded
                                    md:block
                                    ${
                                        isDark
                                            ? "bg-[#1b1b1b]"
                                            : "bg-zinc-100"
                                    }
                                `}
                            />


                            <div
                                className={`
                                    hidden
                                    h-4
                                    w-20
                                    rounded
                                    md:block
                                    ${
                                        isDark
                                            ? "bg-[#1b1b1b]"
                                            : "bg-zinc-100"
                                    }
                                `}
                            />


                            <div
                                className={`
                                    hidden
                                    h-4
                                    w-24
                                    rounded
                                    md:block
                                    ${
                                        isDark
                                            ? "bg-[#1b1b1b]"
                                            : "bg-zinc-100"
                                    }
                                `}
                            />


                            <div
                                className={`
                                    h-9
                                    w-28
                                    rounded-[8px]
                                    ${
                                        isDark
                                            ? "bg-[#1b1b1b]"
                                            : "bg-zinc-100"
                                    }
                                `}
                            />

                        </div>

                    ))}

                </div>

            </div>

        );

    }


    /* =========================================================
       MAIN
    ========================================================= */

    return (

        <div className="space-y-8">

            {/* Header */}

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
                                            : "border-blue-200 bg-blue-50"
                                    }
                                `}
                            >

                                <History
                                    size={18}
                                    strokeWidth={1.8}
                                    className="
                                        text-blue-600
                                        dark:text-blue-400
                                    "
                                />

                            </div>


                            <h1
                                className="
                                    text-[28px]
                                    font-semibold
                                    leading-tight
                                    tracking-[-0.035em]
                                    text-zinc-900
                                    dark:text-white
                                "
                            >
                                Search History
                            </h1>

                        </div>


                        <p
                            className="
                                mt-3
                                text-[14px]
                                leading-6
                                tracking-[-0.01em]
                                text-zinc-500
                                dark:text-[#858585]
                            "
                        >
                            Review and re-run your previous
                            lead discovery searches.
                        </p>

                    </div>


                    <div
                        className={`
                            hidden
                            shrink-0
                            items-center
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-[12px]
                            font-medium
                            sm:flex
                            ${
                                isDark
                                    ? "border-[#292929] bg-[#141414] text-[#a0a0a0]"
                                    : "border-zinc-200 bg-zinc-100 text-zinc-600"
                            }
                        `}
                    >

                        <span
                            className="
                                mr-1.5
                                text-zinc-900
                                dark:text-white
                            "
                        >
                            {history.length}
                        </span>

                        {history.length === 1
                            ? "search"
                            : "searches"}

                    </div>

                </div>

            </section>


            {/* Empty State */}

            {history.length === 0 ? (

                <div
                    className={`
                        flex
                        min-h-[430px]
                        flex-col
                        items-center
                        justify-center
                        rounded-[12px]
                        border
                        border-dashed
                        px-6
                        ${
                            isDark
                                ? "border-[#292929] bg-[#0d0d0d]"
                                : "border-zinc-300 bg-white"
                        }
                    `}
                >

                    <div
                        className={`
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-[12px]
                            border
                            ${
                                isDark
                                    ? "border-[#292929] bg-[#151515]"
                                    : "border-zinc-200 bg-zinc-50"
                            }
                        `}
                    >

                        <Search
                            size={24}
                            strokeWidth={1.7}
                            className="text-zinc-500"
                        />

                    </div>


                    <h2
                        className="
                            mt-5
                            text-[18px]
                            font-semibold
                            tracking-[-0.02em]
                            text-zinc-900
                            dark:text-white
                        "
                    >
                        No Search History
                    </h2>


                    <p
                        className="
                            mt-2
                            max-w-md
                            text-center
                            text-[14px]
                            leading-6
                            text-zinc-500
                            dark:text-[#666]
                        "
                    >
                        Your previous lead discovery searches
                        will appear here once you start
                        searching for businesses.
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            navigate("/app/search")
                        }
                        className="
                            mt-6
                            inline-flex
                            h-10
                            items-center
                            gap-2
                            rounded-[8px]
                            bg-zinc-900
                            px-4
                            text-[13px]
                            font-medium
                            text-white
                            transition-all
                            duration-150
                            hover:bg-zinc-800
                            active:scale-[0.98]
                            dark:bg-white
                            dark:text-black
                            dark:hover:bg-[#e8e8e8]
                        "
                    >

                        <Search
                            size={15}
                            strokeWidth={1.9}
                        />

                        Start a Search

                    </button>

                </div>

            ) : (

                <div
                    className={`
                        overflow-hidden
                        rounded-[12px]
                        border
                        ${
                            isDark
                                ? "border-[#242424] bg-[#0d0d0d]"
                                : "border-zinc-200 bg-white"
                        }
                    `}
                >

                    {/* Desktop Header */}

                    <div
                        className={`
                            hidden
                            grid-cols-[1.5fr_1.2fr_1fr_1.2fr_auto]
                            gap-6
                            border-b
                            px-6
                            py-3.5
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.08em]
                            md:grid
                            ${
                                isDark
                                    ? "border-[#242424] bg-[#111111] text-[#666]"
                                    : "border-zinc-200 bg-zinc-50 text-zinc-500"
                            }
                        `}
                    >

                        <div>Keyword</div>

                        <div>Location</div>

                        <div>Businesses</div>

                        <div>Date</div>

                        <div>Action</div>

                    </div>


                    {/* Rows */}

                    <div>

                        {history.map((item) => (

                            <div
                                key={item.id}
                                className={`
                                    group
                                    grid
                                    gap-4
                                    border-b
                                    px-5
                                    py-5
                                    transition-colors
                                    duration-150
                                    last:border-b-0
                                    md:grid-cols-[1.5fr_1.2fr_1fr_1.2fr_auto]
                                    md:items-center
                                    md:gap-6
                                    md:px-6
                                    ${
                                        isDark
                                            ? "border-[#202020] hover:bg-[#111111]"
                                            : "border-zinc-200 hover:bg-zinc-50"
                                    }
                                `}
                            >

                                {/* Keyword */}

                                <div
                                    className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-3
                                    "
                                >

                                    <div
                                        className={`
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-[9px]
                                            border
                                            transition-colors
                                            duration-150
                                            ${
                                                isDark
                                                    ? "border-[#2b3542] bg-[#101821] group-hover:border-[#35475d] group-hover:bg-[#111d2a]"
                                                    : "border-blue-200 bg-blue-50 group-hover:border-blue-300 group-hover:bg-blue-100"
                                            }
                                        `}
                                    >

                                        <Search
                                            size={16}
                                            strokeWidth={1.8}
                                            className="
                                                text-blue-600
                                                dark:text-blue-400
                                            "
                                        />

                                    </div>


                                    <div className="min-w-0">

                                        <p
                                            className="
                                                truncate
                                                text-[14px]
                                                font-medium
                                                tracking-[-0.01em]
                                                text-zinc-900
                                                dark:text-white
                                            "
                                        >
                                            {item.keyword}
                                        </p>


                                        <p
                                            className="
                                                mt-1
                                                text-[11px]
                                                text-zinc-400
                                                dark:text-[#555]
                                                md:hidden
                                            "
                                        >
                                            Search keyword
                                        </p>

                                    </div>

                                </div>


                                {/* Location */}

                                <div
                                    className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-2.5
                                    "
                                >

                                    <div
                                        className={`
                                            flex
                                            h-7
                                            w-7
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-[7px]
                                            border
                                            ${
                                                isDark
                                                    ? "border-red-500/15 bg-red-500/[0.06]"
                                                    : "border-red-200 bg-red-50"
                                            }
                                        `}
                                    >

                                        <MapPin
                                            size={14}
                                            strokeWidth={1.8}
                                            className="
                                                text-red-600
                                                dark:text-red-400
                                            "
                                        />

                                    </div>


                                    <div className="min-w-0">

                                        <p
                                            className="
                                                truncate
                                                text-[13px]
                                                text-zinc-600
                                                dark:text-[#c0c0c0]
                                            "
                                        >
                                            {item.location}
                                        </p>


                                        <p
                                            className="
                                                mt-1
                                                text-[11px]
                                                text-zinc-400
                                                dark:text-[#555]
                                                md:hidden
                                            "
                                        >
                                            Location
                                        </p>

                                    </div>

                                </div>


                                {/* Businesses Found */}

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
                                            h-7
                                            w-7
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-[7px]
                                            border
                                            ${
                                                isDark
                                                    ? "border-amber-500/15 bg-amber-500/[0.06]"
                                                    : "border-amber-200 bg-amber-50"
                                            }
                                        `}
                                    >

                                        <Building2
                                            size={14}
                                            strokeWidth={1.8}
                                            className="
                                                text-amber-600
                                                dark:text-amber-400
                                            "
                                        />

                                    </div>


                                    <div>

                                        <p
                                            className="
                                                text-[14px]
                                                font-semibold
                                                text-zinc-900
                                                dark:text-white
                                            "
                                        >
                                            {item.businesses_found}
                                        </p>


                                        <p
                                            className="
                                                mt-1
                                                text-[11px]
                                                text-zinc-400
                                                dark:text-[#555]
                                                md:hidden
                                            "
                                        >
                                            Businesses found
                                        </p>

                                    </div>

                                </div>


                                {/* Date */}

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
                                            h-7
                                            w-7
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-[7px]
                                            border
                                            ${
                                                isDark
                                                    ? "border-[#303030] bg-[#171717]"
                                                    : "border-zinc-200 bg-zinc-50"
                                            }
                                        `}
                                    >

                                        <CalendarDays
                                            size={14}
                                            strokeWidth={1.8}
                                            className="
                                                text-zinc-500
                                                dark:text-[#888]
                                            "
                                        />

                                    </div>


                                    <div>

                                        <p
                                            className="
                                                text-[13px]
                                                text-zinc-600
                                                dark:text-[#a0a0a0]
                                            "
                                        >
                                            {formatDate(
                                                item.created_at
                                            )}
                                        </p>


                                        <p
                                            className="
                                                mt-1
                                                text-[11px]
                                                text-zinc-400
                                                dark:text-[#555]
                                                md:hidden
                                            "
                                        >
                                            Search date
                                        </p>

                                    </div>

                                </div>


                                {/* Action */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSearchAgain(
                                            item
                                        )
                                    }
                                    className="
                                        inline-flex
                                        h-9
                                        w-fit
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-[8px]
                                        border
                                        border-zinc-200
                                        bg-zinc-50
                                        px-3.5
                                        text-[12px]
                                        font-medium
                                        text-zinc-700
                                        transition-all
                                        duration-150
                                        hover:border-zinc-300
                                        hover:bg-zinc-100
                                        hover:text-zinc-900
                                        active:scale-[0.98]
                                        dark:border-[#303030]
                                        dark:bg-[#171717]
                                        dark:text-[#c0c0c0]
                                        dark:hover:border-[#4a4a4a]
                                        dark:hover:bg-[#202020]
                                        dark:hover:text-white
                                    "
                                >

                                    <RotateCcw
                                        size={14}
                                        strokeWidth={1.8}
                                    />

                                    <span>
                                        Search Again
                                    </span>

                                </button>

                            </div>

                        ))}

                    </div>

                </div>

            )}

        </div>

    );

}


export default SearchHistory;