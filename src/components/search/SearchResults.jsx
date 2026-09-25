import { useState } from "react";

import {
    SearchX,
    Globe,
    Building2,
    Star,
    MapPin,
    ChevronRight,
    ArrowLeft,
} from "lucide-react";

import SearchProgress from "./SearchProgress";
import BusinessCard from "./BusinessCard";

function SearchResults({
    businesses,
    theme,
    loading,
    searchPerformed,
    keyword,
    location,
    areas = [],
    searchStage,
    onBusinessClick,
    onSaveLead,
    savedLeads,
    savingLeadId,
}) {
    const isDark = theme === "dark";

    const [activeView, setActiveView] =
        useState("businesses");

    const [activeOpportunity, setActiveOpportunity] =
        useState(null);

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <section className="space-y-6">

                <SearchProgress
                    keyword={keyword}
                    location={location}
                    stage={searchStage}
                    theme={theme}
                />

                <div
                    className="
                        grid
                        gap-4
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {Array.from({
                        length: 6,
                    }).map((_, index) => (
                        <div
                            key={index}
                            className={`
                                h-56
                                animate-pulse
                                rounded-[10px]
                                border
                                transition-colors
                                duration-200
                                ${
                                    isDark
                                        ? "border-[#242424] bg-[#111111]"
                                        : "border-[#e2e2e2] bg-white"
                                }
                            `}
                        />
                    ))}
                </div>

            </section>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Empty Search
    |--------------------------------------------------------------------------
    */

    if (
        searchPerformed &&
        businesses.length === 0
    ) {
        return (
            <section
                className={`
                    flex
                    min-h-[360px]
                    items-center
                    justify-center
                    border
                    border-dashed
                    px-6
                    py-12
                    transition-colors
                    duration-200
                    ${
                        isDark
                            ? "border-[#2a2a2a] bg-[#080808]"
                            : "border-[#d9d9d9] bg-[#fafafa]"
                    }
                `}
            >
                <div
                    className="
                        flex
                        max-w-md
                        flex-col
                        items-center
                        text-center
                    "
                >
                    <div
                        className={`
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            border
                            transition-colors
                            duration-200
                            ${
                                isDark
                                    ? "border-[#292929] bg-[#111111]"
                                    : "border-[#dedede] bg-white"
                            }
                        `}
                    >
                        <SearchX
                            size={21}
                            strokeWidth={1.7}
                            className={
                                isDark
                                    ? "text-[#777]"
                                    : "text-[#999]"
                            }
                        />
                    </div>

                    <h2
                        className={`
                            mt-5
                            text-[18px]
                            font-semibold
                            tracking-[-0.025em]
                            ${
                                isDark
                                    ? "text-white"
                                    : "text-[#171717]"
                            }
                        `}
                    >
                        No businesses found
                    </h2>

                    <p className="mt-2 text-[13px] leading-6 text-[#777]">
                        We couldn't find any businesses
                        matching your search. Try a
                        different keyword, a nearby city,
                        or a broader business category.
                    </p>
                </div>
            </section>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Before Search
    |--------------------------------------------------------------------------
    */

    if (!searchPerformed) {
        return null;
    }

    /*
    |--------------------------------------------------------------------------
    | Backend Result Metrics
    |--------------------------------------------------------------------------
    */

    const totalBusinesses =
        businesses.length;

    const businessesWithoutWebsite =
        businesses.filter(
            (business) =>
                !business.website
        ).length;

    const businessesWithWebsite =
        businesses.filter(
            (business) =>
                Boolean(business.website)
        ).length;

    const ratings = businesses
        .map((business) =>
            Number(
                business.google_rating || 0
            )
        )
        .filter(
            (rating) =>
                rating > 0
        );

    const averageRating =
        ratings.length > 0
            ? (
                  ratings.reduce(
                      (sum, rating) =>
                          sum + rating,
                      0
                  ) / ratings.length
              ).toFixed(1)
            : "—";

    /*
    |--------------------------------------------------------------------------
    | Area Information
    |--------------------------------------------------------------------------
    */

    const areaCounts = {};

    businesses.forEach((business) => {
        if (!business.area) {
            return;
        }

        if (!areaCounts[business.area]) {
            areaCounts[business.area] = 0;
        }

        areaCounts[business.area] += 1;
    });

    const discoveredAreas =
        Object.entries(areaCounts)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            );

    /*
    |--------------------------------------------------------------------------
    | Opportunity Menu
    |--------------------------------------------------------------------------
    */

    const opportunityMenu = [
        {
            id: "website",
            title: "Website Opportunities",
            description:
                "Businesses without a website.",
            count:
                businessesWithoutWebsite,
            icon: Globe,
        },
        {
            id: "digital-presence",
            title: "Digital Presence",
            description:
                "Businesses with an existing website.",
            count:
                businessesWithWebsite,
            icon: Globe,
        },
        {
            id: "areas",
            title: "Area Opportunities",
            description:
                "Explore businesses discovered across selected areas.",
            count:
                discoveredAreas.length,
            icon: MapPin,
        },
    ];

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <section className="space-y-8">



            {/* ------------------------------------------------------------ */}
            {/* Search Scope */}
            {/* ------------------------------------------------------------ */}

            {areas.length > 0 && (
                <div
                    className={`
                        flex
                        flex-wrap
                        items-center
                        gap-2
                        rounded-[10px]
                        border
                        px-4
                        py-3
                        ${
                            isDark
                                ? "border-[#242424] bg-[#0f0f0f]"
                                : "border-[#dedede] bg-white"
                        }
                    `}
                >
                    <span
                        className={`
                            mr-1
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            ${
                                isDark
                                    ? "text-[#666]"
                                    : "text-[#888]"
                            }
                        `}
                    >
                        Areas
                    </span>

                    {areas.map((area) => (
                        <span
                            key={area}
                            className={`
                                rounded-md
                                border
                                px-2.5
                                py-1
                                text-[11px]
                                ${
                                    isDark
                                        ? "border-[#292929] bg-[#151515] text-[#bbb]"
                                        : "border-[#e1e1e1] bg-[#fafafa] text-[#555]"
                                }
                            `}
                        >
                            {area}
                        </span>
                    ))}
                </div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* Search Overview */}
            {/* ------------------------------------------------------------ */}


            {/* ------------------------------------------------------------ */}
            {/* Main Navigation */}
            {/* ------------------------------------------------------------ */}

            <div
                className={`
                    flex
                    w-full
                    rounded-[10px]
                    border
                    p-1
                    ${
                        isDark
                            ? "border-[#292929] bg-[#0b0b0b]"
                            : "border-[#dedede] bg-[#f7f7f7]"
                    }
                `}
            >

                <button
                    type="button"
                    onClick={() => {
                        setActiveView("businesses");
                        setActiveOpportunity(null);
                    }}
                    className={`
                        flex
                        flex-1
                        items-center
                        justify-center
                        rounded-lg
                        px-4
                        py-3
                        text-[13px]
                        font-medium
                        transition-colors
                        ${
                            activeView === "businesses"
                                ? isDark
                                    ? "bg-[#1a1a1a] text-white"
                                    : "bg-white text-[#171717]"
                                : isDark
                                    ? "text-[#777] hover:text-[#ddd]"
                                    : "text-[#777] hover:text-[#333]"
                        }
                    `}
                >
                    <Building2
                        size={15}
                        strokeWidth={1.7}
                        className="mr-2"
                    />

                    Businesses

                    <span
                        className={`
                            ml-2
                            rounded-md
                            px-1.5
                            py-0.5
                            text-[10px]
                            ${
                                isDark
                                    ? "bg-[#242424] text-[#aaa]"
                                    : "bg-[#e9e9e9] text-[#666]"
                            }
                        `}
                    >
                        {totalBusinesses}
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setActiveView("opportunities");
                        setActiveOpportunity(null);
                    }}
                    className={`
                        flex
                        flex-1
                        items-center
                        justify-center
                        rounded-lg
                        px-4
                        py-3
                        text-[13px]
                        font-medium
                        transition-colors
                        ${
                            activeView === "opportunities"
                                ? isDark
                                    ? "bg-[#1a1a1a] text-white"
                                    : "bg-white text-[#171717]"
                                : isDark
                                    ? "text-[#777] hover:text-[#ddd]"
                                    : "text-[#777] hover:text-[#333]"
                        }
                    `}
                >
                    <Star
                        size={15}
                        strokeWidth={1.7}
                        className="mr-2"
                    />

                    Business Opportunities
                </button>

            </div>

            {/* ------------------------------------------------------------ */}
            {/* Businesses View */}
            {/* ------------------------------------------------------------ */}

            {activeView === "businesses" && (
                <div className="space-y-4">

                    <div
                        className={`
                            flex
                            items-end
                            justify-between
                            border-b
                            pb-4
                            ${
                                isDark
                                    ? "border-[#242424]"
                                    : "border-[#dedede]"
                            }
                        `}
                    >
                        <div>

                            <h3
                                className={`
                                    text-[16px]
                                    font-semibold
                                    tracking-[-0.02em]
                                    ${
                                        isDark
                                            ? "text-white"
                                            : "text-[#171717]"
                                    }
                                `}
                            >
                                Businesses
                            </h3>

                            <p
                                className={`
                                    mt-1
                                    text-[12px]
                                    ${
                                        isDark
                                            ? "text-[#666]"
                                            : "text-[#777]"
                                    }
                                `}
                            >
                                Browse businesses and
                                choose one to analyze.
                            </p>

                        </div>

                        <span
                            className={`
                                text-[12px]
                                ${
                                    isDark
                                        ? "text-[#666]"
                                        : "text-[#888]"
                                }
                            `}
                        >
                            {totalBusinesses} results
                        </span>
                    </div>

                    <div
                        className="
                            grid
                            gap-4
                            md:grid-cols-2
                            xl:grid-cols-3
                        "
                    >
                        {businesses.map(
                            (business) => (
                                <BusinessCard
                                    key={
                                        business.id
                                    }
                                    business={
                                        business
                                    }
                                    theme={
                                        theme
                                    }
                                    onClick={
                                        onBusinessClick
                                    }
                                    onSave={
                                        onSaveLead
                                    }
                                    saved={savedLeads.includes(
                                        Number(
                                            business.id
                                        )
                                    )}
                                    saving={
                                        savingLeadId ===
                                        business.id
                                    }
                                />
                            )
                        )}
                    </div>

                </div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* Business Opportunities View */}
            {/* ------------------------------------------------------------ */}

            {activeView === "opportunities" && (
                <div className="space-y-4">

                    {!activeOpportunity && (
                        <>
                            <div
                                className={`
                                    border-b
                                    pb-4
                                    ${
                                        isDark
                                            ? "border-[#242424]"
                                            : "border-[#dedede]"
                                    }
                                `}
                            >
                                <h3
                                    className={`
                                        text-[16px]
                                        font-semibold
                                        tracking-[-0.02em]
                                        ${
                                            isDark
                                                ? "text-white"
                                                : "text-[#171717]"
                                        }
                                    `}
                                >
                                    Business Opportunities
                                </h3>

                                <p
                                    className={`
                                        mt-1
                                        text-[12px]
                                        ${
                                            isDark
                                                ? "text-[#666]"
                                                : "text-[#777]"
                                        }
                                    `}
                                >
                                    Explore business
                                    opportunities identified
                                    from your search results.
                                </p>
                            </div>

                            <div className="space-y-2">

                                {opportunityMenu.map(
                                    (item) => {
                                        const Icon =
                                            item.icon;

                                        return (
                                            <button
                                                key={
                                                    item.id
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setActiveOpportunity(
                                                        item.id
                                                    )
                                                }
                                                className={`
                                                    group
                                                    flex
                                                    w-full
                                                    items-center
                                                    justify-between
                                                    rounded-[10px]
                                                    border
                                                    px-4
                                                    py-4
                                                    text-left
                                                    transition-colors
                                                    ${
                                                        isDark
                                                            ? "border-[#242424] bg-[#0f0f0f] hover:border-[#383838] hover:bg-[#141414]"
                                                            : "border-[#dedede] bg-white hover:border-[#cfcfcf] hover:bg-[#fafafa]"
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className={`
                                                            flex
                                                            h-9
                                                            w-9
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            border
                                                            ${
                                                                isDark
                                                                    ? "border-[#292929] bg-[#151515]"
                                                                    : "border-[#e4e4e4] bg-[#fafafa]"
                                                            }
                                                        `}
                                                    >
                                                        <Icon
                                                            size={
                                                                16
                                                            }
                                                            strokeWidth={
                                                                1.7
                                                            }
                                                            className={
                                                                isDark
                                                                    ? "text-[#999]"
                                                                    : "text-[#777]"
                                                            }
                                                        />
                                                    </div>

                                                    <div>

                                                        <div
                                                            className={`
                                                                text-[13px]
                                                                font-medium
                                                                ${
                                                                    isDark
                                                                        ? "text-[#ddd]"
                                                                        : "text-[#333]"
                                                                }
                                                            `}
                                                        >
                                                            {
                                                                item.title
                                                            }
                                                        </div>

                                                        <div
                                                            className={`
                                                                mt-0.5
                                                                text-[11px]
                                                                ${
                                                                    isDark
                                                                        ? "text-[#666]"
                                                                        : "text-[#777]"
                                                                }
                                                            `}
                                                        >
                                                            {
                                                                item.description
                                                            }
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="flex items-center gap-3">

                                                    <span
                                                        className={`
                                                            text-[12px]
                                                            ${
                                                                isDark
                                                                    ? "text-[#999]"
                                                                    : "text-[#777]"
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            item.count
                                                        }
                                                    </span>

                                                    <ChevronRight
                                                        size={
                                                            16
                                                        }
                                                        strokeWidth={
                                                            1.7
                                                        }
                                                        className={`
                                                            transition-transform
                                                            group-hover:translate-x-0.5
                                                            ${
                                                                isDark
                                                                    ? "text-[#666]"
                                                                    : "text-[#999]"
                                                            }
                                                        `}
                                                    />

                                                </div>

                                            </button>
                                        );
                                    }
                                )}

                            </div>
                        </>
                    )}

                    {/* ---------------------------------------------------- */}
                    {/* Opportunity Detail */}
                    {/* ---------------------------------------------------- */}

                    {activeOpportunity && (
                        <div className="space-y-5">

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveOpportunity(
                                        null
                                    )
                                }
                                className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    text-[12px]
                                    transition-colors
                                    ${
                                        isDark
                                            ? "text-[#888] hover:text-white"
                                            : "text-[#777] hover:text-[#171717]"
                                    }
                                `}
                            >
                                <ArrowLeft
                                    size={14}
                                    strokeWidth={1.8}
                                />

                                Back to opportunities
                            </button>

                            {activeOpportunity ===
                                "website" && (
                                <div
                                    className={`
                                        rounded-[10px]
                                        border
                                        p-5
                                        ${
                                            isDark
                                                ? "border-[#242424] bg-[#0f0f0f]"
                                                : "border-[#dedede] bg-white"
                                        }
                                    `}
                                >
                                    <div className="flex items-start justify-between">

                                        <div>
                                            <h3
                                                className={`
                                                    text-[16px]
                                                    font-semibold
                                                    ${
                                                        isDark
                                                            ? "text-white"
                                                            : "text-[#171717]"
                                                    }
                                                `}
                                            >
                                                Website
                                                Opportunities
                                            </h3>

                                            <p className="mt-1 text-[12px] text-[#777]">
                                                Businesses
                                                from this
                                                search that
                                                do not have
                                                a website.
                                            </p>
                                        </div>

                                        <div
                                            className={`
                                                text-[26px]
                                                font-semibold
                                                tracking-[-0.04em]
                                                ${
                                                    isDark
                                                        ? "text-white"
                                                        : "text-[#171717]"
                                                }
                                            `}
                                        >
                                            {
                                                businessesWithoutWebsite
                                            }
                                        </div>

                                    </div>

                                    <div className="mt-6 space-y-2">

                                        {businesses
                                            .filter(
                                                (
                                                    business
                                                ) =>
                                                    !business.website
                                            )
                                            .map(
                                                (
                                                    business
                                                ) => (
                                                    <button
                                                        key={
                                                            business.id
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            onBusinessClick(
                                                                business.id
                                                            )
                                                        }
                                                        className={`
                                                            flex
                                                            w-full
                                                            items-center
                                                            justify-between
                                                            rounded-lg
                                                            border
                                                            px-3
                                                            py-3
                                                            text-left
                                                            ${
                                                                isDark
                                                                    ? "border-[#242424] hover:bg-[#151515]"
                                                                    : "border-[#e2e2e2] hover:bg-[#fafafa]"
                                                            }
                                                        `}
                                                    >
                                                        <div>
                                                            <div
                                                                className={`
                                                                    text-[12px]
                                                                    font-medium
                                                                    ${
                                                                        isDark
                                                                            ? "text-[#ddd]"
                                                                            : "text-[#333]"
                                                                    }
                                                                `}
                                                            >
                                                                {
                                                                    business.business_name
                                                                }
                                                            </div>

                                                            <div className="mt-0.5 text-[11px] text-[#777]">
                                                                {
                                                                    business.category
                                                                }
                                                            </div>
                                                        </div>

                                                        <ChevronRight
                                                            size={
                                                                15
                                                            }
                                                            strokeWidth={
                                                                1.7
                                                            }
                                                            className="text-[#777]"
                                                        />
                                                    </button>
                                                )
                                            )}

                                    </div>
                                </div>
                            )}

                            {activeOpportunity ===
                                "digital-presence" && (
                                <div
                                    className={`
                                        rounded-[10px]
                                        border
                                        p-5
                                        ${
                                            isDark
                                                ? "border-[#242424] bg-[#0f0f0f]"
                                                : "border-[#dedede] bg-white"
                                        }
                                    `}
                                >
                                    <div className="flex items-start justify-between">

                                        <div>
                                            <h3
                                                className={`
                                                    text-[16px]
                                                    font-semibold
                                                    ${
                                                        isDark
                                                            ? "text-white"
                                                            : "text-[#171717]"
                                                    }
                                                `}
                                            >
                                                Businesses
                                                With Website
                                            </h3>

                                            <p className="mt-1 text-[12px] text-[#777]">
                                                Businesses
                                                returned with
                                                an existing
                                                website.
                                            </p>
                                        </div>

                                        <div
                                            className={`
                                                text-[26px]
                                                font-semibold
                                                tracking-[-0.04em]
                                                ${
                                                    isDark
                                                        ? "text-white"
                                                        : "text-[#171717]"
                                                }
                                            `}
                                        >
                                            {
                                                businessesWithWebsite
                                            }
                                        </div>

                                    </div>

                                    <div className="mt-6 space-y-2">

                                        {businesses
                                            .filter(
                                                (
                                                    business
                                                ) =>
                                                    Boolean(
                                                        business.website
                                                    )
                                            )
                                            .map(
                                                (
                                                    business
                                                ) => (
                                                    <button
                                                        key={
                                                            business.id
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            onBusinessClick(
                                                                business.id
                                                            )
                                                        }
                                                        className={`
                                                            flex
                                                            w-full
                                                            items-center
                                                            justify-between
                                                            rounded-lg
                                                            border
                                                            px-3
                                                            py-3
                                                            text-left
                                                            ${
                                                                isDark
                                                                    ? "border-[#242424] hover:bg-[#151515]"
                                                                    : "border-[#e2e2e2] hover:bg-[#fafafa]"
                                                            }
                                                        `}
                                                    >
                                                        <div>
                                                            <div
                                                                className={`
                                                                    text-[12px]
                                                                    font-medium
                                                                    ${
                                                                        isDark
                                                                            ? "text-[#ddd]"
                                                                            : "text-[#333]"
                                                                    }
                                                                `}
                                                            >
                                                                {
                                                                    business.business_name
                                                                }
                                                            </div>

                                                            <div className="mt-0.5 text-[11px] text-[#777]">
                                                                {
                                                                    business.category
                                                                }
                                                            </div>
                                                        </div>

                                                        <ChevronRight
                                                            size={
                                                                15
                                                            }
                                                            strokeWidth={
                                                                1.7
                                                            }
                                                            className="text-[#777]"
                                                        />
                                                    </button>
                                                )
                                            )}

                                    </div>
                                </div>
                            )}

                            {activeOpportunity ===
                                "areas" && (
                                <div
                                    className={`
                                        rounded-[10px]
                                        border
                                        p-5
                                        ${
                                            isDark
                                                ? "border-[#242424] bg-[#0f0f0f]"
                                                : "border-[#dedede] bg-white"
                                        }
                                    `}
                                >
                                    <div>
                                        <h3
                                            className={`
                                                text-[16px]
                                                font-semibold
                                                ${
                                                    isDark
                                                        ? "text-white"
                                                        : "text-[#171717]"
                                                }
                                            `}
                                        >
                                            Area Opportunities
                                        </h3>

                                        <p className="mt-1 text-[12px] text-[#777]">
                                            Businesses
                                            discovered across
                                            your selected
                                            areas.
                                        </p>
                                    </div>

                                    {discoveredAreas.length >
                                    0 ? (
                                        <div className="mt-6 space-y-2">

                                            {discoveredAreas.map(
                                                ([
                                                    area,
                                                    count,
                                                ]) => (
                                                    <div
                                                        key={
                                                            area
                                                        }
                                                        className={`
                                                            flex
                                                            items-center
                                                            justify-between
                                                            rounded-lg
                                                            border
                                                            px-4
                                                            py-3
                                                            ${
                                                                isDark
                                                                    ? "border-[#242424]"
                                                                    : "border-[#e2e2e2]"
                                                            }
                                                        `}
                                                    >
                                                        <div className="flex items-center gap-2">

                                                            <MapPin
                                                                size={
                                                                    14
                                                                }
                                                                strokeWidth={
                                                                    1.7
                                                                }
                                                                className="text-[#777]"
                                                            />

                                                            <span
                                                                className={`
                                                                    text-[12px]
                                                                    font-medium
                                                                    ${
                                                                        isDark
                                                                            ? "text-[#ddd]"
                                                                            : "text-[#333]"
                                                                    }
                                                                `}
                                                            >
                                                                {
                                                                    area
                                                                }
                                                            </span>

                                                        </div>

                                                        <span className="text-[12px] text-[#777]">
                                                            {
                                                                count
                                                            }{" "}
                                                            {count ===
                                                            1
                                                                ? "business"
                                                                : "businesses"}
                                                        </span>

                                                    </div>
                                                )
                                            )}

                                        </div>
                                    ) : (
                                        <div className="mt-6 text-[12px] text-[#777]">
                                            No area-specific
                                            opportunity data
                                            is available for
                                            this search.
                                        </div>
                                    )}

                                </div>
                            )}

                        </div>
                    )}

                </div>
            )}

        </section>
    );
}

export default SearchResults;