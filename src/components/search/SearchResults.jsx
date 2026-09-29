import { useState, useMemo } from "react";

import {
    Search,
    SearchX,
    Globe,
    Building2,
    Star,
    MapPin,
    ChevronRight,
    ArrowLeft,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

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
    const [searchParams] = useSearchParams();

    const shouldOpenOpportunities =
    searchParams.get("view") === "opportunities";

const [activeView, setActiveView] = useState(
    shouldOpenOpportunities
        ? "opportunities"
        : "businesses"
);

    const [businessSearch, setBusinessSearch] =
        useState("");

  const [activeOpportunity, setActiveOpportunity] =
    useState(
        shouldOpenOpportunities
            ? "all"
            : null
    );

    /*
    |--------------------------------------------------------------------------
    | Business Name Search
    |--------------------------------------------------------------------------
    */

    const filteredBusinesses = useMemo(() => {
        const query = businessSearch
            .trim()
            .toLowerCase();

        if (!query) {
            return businesses;
        }

        return businesses.filter((business) =>
            String(business.business_name || "")
                .toLowerCase()
                .includes(query)
        );
    }, [businesses, businessSearch]);

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

  if (loading) {
    const generatingCards = [
        {
            title: "Discovering businesses",
            subtitle: "Finding local opportunities",
            delay: "0s",
        },
        {
            title: "Analyzing businesses",
            subtitle: "Checking business signals",
            delay: "1.2s",
        },
        {
            title: "Building your leads",
            subtitle: "Collecting business details",
            delay: "2.4s",
        },
        {
            title: "Finding opportunities",
            subtitle: "Looking for potential leads",
            delay: "3.6s",
        },
        {
            title: "Scanning the market",
            subtitle: "Discovering more businesses",
            delay: "4.8s",
        },
        {
            title: "Preparing results",
            subtitle: "Almost ready",
            delay: "6s",
        },
    ];

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

                {generatingCards.map((card, index) => (
                    <div
                        key={index}
                        className={`
                            relative
                            h-56
                            overflow-hidden
                            rounded-[10px]
                            border
                            ${
                                isDark
                                    ? "border-[#242424] bg-[#0d0d0d]"
                                    : "border-[#e2e2e2] bg-white"
                            }
                        `}
                    >

                        {/* ------------------------------------------------ */}
                        {/* Subtle grid inside card */}
                        {/* ------------------------------------------------ */}

                        <div
                            className={`
                                pointer-events-none
                                absolute
                                inset-0
                                opacity-40
                                ${
                                    isDark
                                        ? "bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]"
                                        : "bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)]"
                                }
                                bg-[size:24px_24px]
                            `}
                        />

                        {/* ------------------------------------------------ */}
                        {/* Drawing area */}
                        {/* ------------------------------------------------ */}

                        <div className="absolute inset-0">
                            <div
    className={`
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        h-24
        w-24
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        blur-3xl
        animate-pulse
        ${
            index % 3 === 0
                ? "bg-cyan-400/10"
                : index % 3 === 1
                    ? "bg-violet-400/10"
                    : "bg-pink-400/10"
        }
    `}
/>

                            {/* Cursor */}
                            <div
                                className="
                                    absolute
                                    z-20
                                    animate-[cardCursor_4.8s_ease-in-out_infinite]
                                "
                                style={{
                                    animationDelay: card.delay,
                                }}
                            >

                                <svg
                                    width="30"
                                    height="34"
                                    viewBox="0 0 30 34"
                                    fill="none"
                                >
                                    <path
                                        d="M3 2L26 23L16.5 23.5L22 32L17 34L11.5 25L5 31L3 2Z"
                                      className={
    isDark
        ? "fill-cyan-300 stroke-[#061014]"
        : "fill-cyan-600 stroke-white"
}
                                        strokeWidth="1.5"
                                    />
                                </svg>

                                {/* click pulse */}
                                <span
                                  className={`
    absolute
    -left-2
    -top-2
    h-4
    w-4
    rounded-full
    border
    animate-[cardClick_4.8s_ease-in-out_infinite]
    ${
        isDark
            ? "border-cyan-300/60"
            : "border-cyan-500/40"
    }
`}
                                />

                            </div>


                            {/* Cursor trail */}

                            <div
                                className={`
                                    absolute
                                    h-px
                                    w-20
                                    origin-left
                                    animate-[cardTrail_4.8s_ease-in-out_infinite]
                                  ${
    isDark
        ? "bg-gradient-to-r from-transparent via-cyan-300/70 to-violet-400/60"
        : "bg-gradient-to-r from-transparent via-cyan-500/50 to-violet-500/40"
}
                                `}
                                style={{
                                    animationDelay: card.delay,
                                }}
                            />


                            {/* ------------------------------------------------ */}
                            {/* Card being drawn */}
                            {/* ------------------------------------------------ */}

                            <div
                                className="
                                    absolute
                                    left-5
                                    right-5
                                    top-5
                                    bottom-5
                                    animate-[cardBuild_4.8s_ease-in-out_infinite]
                                "
                                style={{
                                    animationDelay: card.delay,
                                }}
                            >

                                {/* logo */}
                              <div
    className={`
        h-9
        w-9
        rounded-lg
        border
        shadow-[0_0_18px_rgba(34,211,238,0.12)]
        ${
            isDark
                ? "border-cyan-400/30 bg-cyan-400/10"
                : "border-cyan-500/20 bg-cyan-50"
        }
    `}
/>

                                {/* business name */}
                                <div
                                    className={`
                                        mt-4
                                        h-2
                                        w-3/4
                                        rounded-full
                                       ${
    isDark
        ? "bg-gradient-to-r from-cyan-400/70 via-violet-400/60 to-[#303030]"
        : "bg-gradient-to-r from-cyan-500/50 via-violet-500/40 to-[#dedede]"
}
                                    `}
                                />

                                {/* second line */}
                                <div
                                    className={`
                                        mt-2
                                        h-1.5
                                        w-1/2
                                        rounded-full
                                        ${
                                            isDark
                                                ? "bg-[#242424]"
                                                : "bg-[#e8e8e8]"
                                        }
                                    `}
                                />

                                {/* location */}
                                <div
                                    className={`
                                        mt-6
                                        h-1.5
                                        w-2/3
                                        rounded-full
                                        ${
                                            isDark
                                                ? "bg-[#202020]"
                                                : "bg-[#ededed]"
                                        }
                                    `}
                                />

                                {/* rating */}
                                <div className="mt-5 flex gap-1">
                                    {[1, 2, 3, 4, 5].map(
                                        (star) => (
                                            <span
                                                key={star}
                                               className={`
    h-1.5
    w-1.5
    rounded-full
    ${
        star <= 3
            ? isDark
                ? "bg-amber-300/70"
                : "bg-amber-500/60"
            : isDark
                ? "bg-[#303030]"
                : "bg-[#dedede]"
    }
`}
                                            />
                                        )
                                    )}
                                </div>

                                {/* bottom status */}
                                <div
                                    className={`
                                        absolute
                                        bottom-0
                                        left-0
                                        text-[9px]
                                        ${
                                            isDark
                                                ? "text-[#555]"
                                                : "text-[#aaa]"
                                        }
                                    `}
                                >
                                    {card.title}
                                </div>

                            </div>


                            {/* Drawing line */}

                            <div
                                className={`
                                    absolute
                                    left-5
                                    right-5
                                    top-5
                                    h-px
                                    animate-[drawLine_4.8s_ease-in-out_infinite]
                                 ${
    isDark
        ? "bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400"
        : "bg-gradient-to-r from-cyan-500/60 via-violet-500/50 to-pink-500/40"
}
                                `}
                                style={{
                                    animationDelay: card.delay,
                                }}
                            />

                        </div>


                        {/* ------------------------------------------------ */}
                        {/* Bottom message */}
                        {/* ------------------------------------------------ */}

                        <div
                            className={`
                                absolute
                                bottom-3
                                left-4
                                right-4
                                text-[9px]
                                ${
                                    isDark
                                        ? "text-[#555]"
                                        : "text-[#999]"
                                }
                            `}
                        >
                            {card.subtitle}
                        </div>


                        {/* ------------------------------------------------ */}
                        {/* Keyframes */}
                        {/* ------------------------------------------------ */}

                        <style>
                            {`
                                @keyframes cardCursor {
                                    0% {
                                        left: 75%;
                                        top: 75%;
                                        opacity: 0;
                                    }

                                    8% {
                                        opacity: 1;
                                    }

                                    25% {
                                        left: 18%;
                                        top: 18%;
                                    }

                                    45% {
                                        left: 72%;
                                        top: 35%;
                                    }

                                    65% {
                                        left: 28%;
                                        top: 65%;
                                    }

                                    82% {
                                        left: 70%;
                                        top: 72%;
                                    }

                                    92% {
                                        opacity: 1;
                                    }

                                    100% {
                                        left: 75%;
                                        top: 75%;
                                        opacity: 0;
                                    }
                                }

                                @keyframes cardTrail {
                                    0% {
                                        left: 70%;
                                        top: 75%;
                                        opacity: 0;
                                        transform: rotate(0deg) scaleX(0);
                                    }

                                    15% {
                                        opacity: 0.6;
                                        transform: rotate(-20deg) scaleX(1);
                                    }

                                    35% {
                                        left: 20%;
                                        top: 25%;
                                        opacity: 0;
                                        transform: rotate(15deg) scaleX(0.3);
                                    }

                                    100% {
                                        opacity: 0;
                                    }
                                }

                                @keyframes cardClick {
                                    0%,
                                    15% {
                                        transform: scale(0.4);
                                        opacity: 0;
                                    }

                                    22% {
                                        transform: scale(1);
                                        opacity: 0.7;
                                    }

                                    32% {
                                        transform: scale(2);
                                        opacity: 0;
                                    }

                                    100% {
                                        opacity: 0;
                                    }
                                }

                                @keyframes cardBuild {
                                    0%,
                                    8% {
                                        opacity: 0;
                                        clip-path: inset(0 100% 0 0);
                                        transform: translateX(-5px);
                                    }

                                    18% {
                                        opacity: 1;
                                        clip-path: inset(0 0 0 0);
                                        transform: translateX(0);
                                    }

                                    35% {
                                        opacity: 1;
                                    }

                                    55% {
                                        opacity: 0.9;
                                    }

                                    70%,
                                    100% {
                                        opacity: 0;
                                    }
                                }

                                @keyframes drawLine {
                                    0% {
                                        transform: scaleX(0);
                                        transform-origin: left;
                                        opacity: 0;
                                    }

                                    15% {
                                        transform: scaleX(1);
                                        opacity: 0.5;
                                    }

                                    35% {
                                        opacity: 0;
                                    }

                                    100% {
                                        opacity: 0;
                                    }
                                }
                            `}
                        </style>

                    </div>
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
                                    ? "text-white"
                                    : "text-[#555]"
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

                    <p
                        className={`
                            mt-2
                            text-[12px]
sm:text-[13px]
                            leading-6
                            ${
                                isDark
                                    ? "text-white"
                                    : "text-[#777]"
                            }
                        `}
                    >
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
        Object.entries(areaCounts).sort(
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
                                    ? "text-white"
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
                                        ? "border-[#292929] bg-[#151515] text-white"
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
{/* Main Navigation */}
{/* ------------------------------------------------------------ */}

<div
    className={`
        grid
        w-full
        grid-cols-2
        gap-1
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
    {/* Businesses */}

    <button
        type="button"
        onClick={() => {
            setActiveView("businesses");
            setActiveOpportunity(null);
        }}
        className={`
            flex
            min-w-0
            items-center
            justify-center
            gap-1.5
            rounded-lg
            px-2
            py-2.5
            text-[12px]
            font-medium
            transition-colors
            sm:gap-2
            sm:px-4
            sm:py-3
            sm:text-[13px]
            ${
                activeView === "businesses"
                    ? isDark
                        ? "bg-[#1a1a1a] text-white"
                        : "bg-white text-[#171717]"
                    : isDark
                        ? "text-white hover:text-white"
                        : "text-[#777] hover:text-[#333]"
            }
        `}
    >
        <Building2
            size={15}
            strokeWidth={1.7}
            className="shrink-0"
        />

        <span className="truncate">
            Businesses
        </span>

        <span
            className={`
                shrink-0
                rounded-md
                px-1.5
                py-0.5
                text-[10px]
                ${
                    isDark
                        ? "bg-[#242424] text-white"
                        : "bg-[#e9e9e9] text-[#666]"
                }
            `}
        >
            {totalBusinesses}
        </span>
    </button>


    {/* Business Opportunities */}

    <button
        type="button"
        onClick={() => {
            setActiveView("opportunities");
            setActiveOpportunity("all");
        }}
        className={`
            flex
            min-w-0
            items-center
            justify-center
            gap-1.5
            rounded-lg
            px-2
            py-2.5
            text-[12px]
            font-medium
            transition-colors
            sm:gap-2
            sm:px-4
            sm:py-3
            sm:text-[13px]
            ${
                activeView === "opportunities"
                    ? isDark
                        ? "bg-[#1a1a1a] text-white"
                        : "bg-white text-[#171717]"
                    : isDark
                        ? "text-white hover:text-white"
                        : "text-[#777] hover:text-[#333]"
            }
        `}
    >
        <Star
            size={15}
            strokeWidth={1.7}
            className="shrink-0"
        />

        <span className="truncate">
            Business Opportunities
        </span>
    </button>
</div>

            {/* ------------------------------------------------------------ */}
            {/* Businesses View */}
            {/* ------------------------------------------------------------ */}

            {activeView === "businesses" && (
                <div className="space-y-4">

                    {/* ---------------------------------------------------- */}
                    {/* Business Name Search */}
                    {/* ---------------------------------------------------- */}

                    <div
                        className={`
    flex
    min-w-0
    items-center
    gap-2.5
    rounded-[10px]
    border
    px-3
    py-2.5
    transition-colors
    duration-200
    sm:gap-3
    sm:px-4
    sm:py-3
    ${
        isDark
            ? "border-[#292929] bg-[#0f0f0f]"
            : "border-[#dedede] bg-white"
    }
`}
                    >
                        <Search
                            size={17}
                            strokeWidth={1.8}
                            className={
                                isDark
                                    ? "shrink-0 text-white"
                                    : "shrink-0 text-[#555]"
                            }
                        />

                        <input
                            type="text"
                            value={businessSearch}
                            onChange={(event) =>
                                setBusinessSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search businesses by name..."
                            className={`
                                min-w-0
                                flex-1
                                bg-transparent
                                text-[16px]
sm:text-[13px]
                                outline-none
                                placeholder:opacity-100
                                ${
                                    isDark
                                        ? "text-white placeholder:text-[#777]"
                                        : "text-[#171717] placeholder:text-[#999]"
                                }
                            `}
                        />

                        {businessSearch && (
                            <button
                                type="button"
                                onClick={() =>
                                    setBusinessSearch("")
                                }
                                className={`
                                    shrink-0
                                    text-[12px]
                                    transition-colors
                                    ${
                                        isDark
                                            ? "text-white hover:text-white"
                                            : "text-[#999] hover:text-[#171717]"
                                    }
                                `}
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* ---------------------------------------------------- */}
                    {/* Businesses Header */}
                    {/* ---------------------------------------------------- */}

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
                                            ? "text-white"
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
                                        ? "text-white"
                                        : "text-[#888]"
                                }
                            `}
                        >
                            {filteredBusinesses.length}{" "}
                            {filteredBusinesses.length === 1
                                ? "result"
                                : "results"}
                        </span>
                    </div>

                    {/* ---------------------------------------------------- */}
                    {/* Filtered Results */}
                    {/* ---------------------------------------------------- */}

                    {filteredBusinesses.length === 0 ? (
                        <div
                            className={`
                                rounded-[10px]
                                border
                                px-6
                                py-12
                                text-center
                                ${
                                    isDark
                                        ? "border-[#242424] bg-[#0f0f0f]"
                                        : "border-[#dedede] bg-white"
                                }
                            `}
                        >
                            <SearchX
                                size={22}
                                strokeWidth={1.7}
                                className={
                                    isDark
                                        ? "mx-auto text-white"
                                        : "mx-auto text-[#555]"
                                }
                            />

                            <p
                                className={`
                                    mt-4
                                    text-[14px]
                                    font-medium
                                    ${
                                        isDark
                                            ? "text-white"
                                            : "text-[#171717]"
                                    }
                                `}
                            >
                                No businesses found
                            </p>

                            <p
                                className={`
                                    mt-1
                                    text-[12px]
                                    ${
                                        isDark
                                            ? "text-white"
                                            : "text-[#777]"
                                    }
                                `}
                            >
                                Try a different business
                                name.
                            </p>
                        </div>
                    ) : (
                        <div
                            className="
                                grid
                                gap-4
                                md:grid-cols-2
                                xl:grid-cols-3
                            "
                        >
                            {filteredBusinesses.map(
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
                    )}

                </div>
            )}

       {/* ------------------------------------------------------------ */}
{/* Business Opportunities View */}
{/* ------------------------------------------------------------ */}

{activeView === "opportunities" && (
    <div className="space-y-6">

        {/* ---------------------------------------------------- */}
        {/* Opportunity Header */}
        {/* ---------------------------------------------------- */}

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
                            ? "text-white"
                            : "text-[#777]"
                    }
                `}
            >
                Compare businesses with and without websites
                across your selected areas.
            </p>
        </div>


        {/* ---------------------------------------------------- */}
        {/* Market Summary */}
        {/* ---------------------------------------------------- */}

        <div
            className="
                grid
                gap-3
                sm:grid-cols-2
                xl:grid-cols-4
            "
        >

            {[
                {
                    label: "Total Businesses",
                    value: totalBusinesses,
                },
                {
                    label: "With Website",
                    value: businessesWithWebsite,
                },
                {
                    label: "Without Website",
                    value: businessesWithoutWebsite,
                },
                {
                    label: "Website Opportunity",
                    value:
                        totalBusinesses > 0
                            ? `${(
                                  (businessesWithoutWebsite /
                                      totalBusinesses) *
                                  100
                              ).toFixed(1)}%`
                            : "0%",
                },
            ].map((item) => (
                <div
                    key={item.label}
                    className={`
                        rounded-[10px]
                        border
                        p-4
                        ${
                            isDark
                                ? "border-[#242424] bg-[#0f0f0f]"
                                : "border-[#dedede] bg-white"
                        }
                    `}
                >

                    <div
                        className={`
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-[0.06em]
                            ${
                                isDark
                                    ? "text-[#777]"
                                    : "text-[#888]"
                            }
                        `}
                    >
                        {item.label}
                    </div>

                    <div
                        className={`
                            mt-2
                            text-[24px]
                            font-semibold
                            tracking-[-0.04em]
                            ${
                                isDark
                                    ? "text-white"
                                    : "text-[#171717]"
                            }
                        `}
                    >
                        {item.value}
                    </div>

                </div>
            ))}

        </div>


  {/* ------------------------------------------------------------ */}
{/* Website Coverage */}
{/* ------------------------------------------------------------ */}

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

        <h4
            className={`
                text-[14px]
                font-semibold
                ${
                    isDark
                        ? "text-white"
                        : "text-[#171717]"
                }
            `}
        >
            Website Coverage
        </h4>

        <p
            className={`
                mt-1
                text-[12px]
                ${
                    isDark
                        ? "text-white"
                        : "text-[#777]"
                }
            `}
        >
            Quick view of website availability in the
            discovered market.
        </p>

    </div>


    <div
        className="
            mt-5
            grid
            gap-3
            sm:grid-cols-2
        "
    >

        {/* With Website */}

        <div
            className={`
                rounded-lg
                border
                p-4
                ${
                    isDark
                        ? "border-[#242424] bg-[#111111]"
                        : "border-[#e5e5e5] bg-[#fafafa]"
                }
            `}
        >

            <div className="flex items-center justify-between">

                <div
                    className={`
                        text-[11px]
                        font-medium
                        ${
                            isDark
                                ? "text-white"
                                : "text-[#666]"
                        }
                    `}
                >
                    With Website
                </div>

                <span
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-emerald-500
                    "
                />

            </div>


            <div
                className={`
                    mt-2
                    text-[24px]
                    font-semibold
                    tracking-[-0.04em]
                    ${
                        isDark
                            ? "text-white"
                            : "text-[#171717]"
                    }
                `}
            >
                {businessesWithWebsite}
            </div>


            <div
                className={`
                    mt-1
                    text-[11px]
                    ${
                        isDark
                            ? "text-white"
                            : "text-[#777]"
                    }
                `}
            >
                {totalBusinesses > 0
                    ? (
                          (businessesWithWebsite /
                              totalBusinesses) *
                          100
                      ).toFixed(1)
                    : "0.0"}
                % of businesses
            </div>

        </div>


        {/* Without Website */}

        <div
            className={`
                rounded-lg
                border
                p-4
                ${
                    isDark
                        ? "border-[#242424] bg-[#111111]"
                        : "border-[#e5e5e5] bg-[#fafafa]"
                }
            `}
        >

            <div className="flex items-center justify-between">

                <div
                    className={`
                        text-[11px]
                        font-medium
                        ${
                            isDark
                                ? "text-white"
                                : "text-[#666]"
                        }
                    `}
                >
                    Without Website
                </div>

                <span
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-orange-500
                    "
                />

            </div>


            <div
                className={`
                    mt-2
                    text-[24px]
                    font-semibold
                    tracking-[-0.04em]
                    ${
                        isDark
                            ? "text-white"
                            : "text-[#171717]"
                    }
                `}
            >
                {businessesWithoutWebsite}
            </div>


            <div
                className={`
                    mt-1
                    text-[11px]
                    ${
                        isDark
                            ? "text-white"
                            : "text-[#777]"
                    }
                `}
            >
                {totalBusinesses > 0
                    ? (
                          (businessesWithoutWebsite /
                              totalBusinesses) *
                          100
                      ).toFixed(1)
                    : "0.0"}
                % website opportunity
            </div>

        </div>

    </div>

</div>


        {/* ---------------------------------------------------- */}
        {/* Area Comparison */}
        {/* ---------------------------------------------------- */}

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

                <h4
                    className={`
                        text-[14px]
                        font-semibold
                        ${
                            isDark
                                ? "text-white"
                                : "text-[#171717]"
                        }
                    `}
                >
                    Area Comparison
                </h4>

                <p
                    className={`
                        mt-1
                        text-[12px]
                        ${
                            isDark
                                ? "text-white"
                                : "text-[#777]"
                        }
                    `}
                >
                    Compare website availability and website
                    opportunity across your selected areas.
                </p>

            </div>


            {discoveredAreas.length > 0 ? (

                <div className="mt-6 min-w-[700px]">

                    <table
                        className="
                            w-full
                            min-w-[700px]
                            border-collapse
                        "
                    >

                        <thead>

                            <tr
                                className={`
                                    border-b
                                    ${
                                        isDark
                                            ? "border-[#292929]"
                                            : "border-[#e5e5e5]"
                                    }
                                `}
                            >

                                <th
                                    className={`
                                        px-3
                                        pb-3
                                        text-left
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.06em]
                                        ${
                                            isDark
                                                ? "text-[#777]"
                                                : "text-[#888]"
                                        }
                                    `}
                                >
                                    Area
                                </th>

                                <th
                                    className={`
                                        px-3
                                        pb-3
                                        text-left
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.06em]
                                        ${
                                            isDark
                                                ? "text-[#777]"
                                                : "text-[#888]"
                                        }
                                    `}
                                >
                                    Total
                                </th>

                                <th
                                    className={`
                                        px-3
                                        pb-3
                                        text-left
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.06em]
                                        ${
                                            isDark
                                                ? "text-[#777]"
                                                : "text-[#888]"
                                        }
                                    `}
                                >
                                    With Website
                                </th>

                                <th
                                    className={`
                                        px-3
                                        pb-3
                                        text-left
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.06em]
                                        ${
                                            isDark
                                                ? "text-[#777]"
                                                : "text-[#888]"
                                        }
                                    `}
                                >
                                    Without Website
                                </th>

                                <th
                                    className={`
                                        px-3
                                        pb-3
                                        text-left
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.06em]
                                        ${
                                            isDark
                                                ? "text-[#777]"
                                                : "text-[#888]"
                                        }
                                    `}
                                >
                                    Website %
                                </th>

                                <th
                                    className={`
                                        px-3
                                        pb-3
                                        text-left
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.06em]
                                        ${
                                            isDark
                                                ? "text-[#777]"
                                                : "text-[#888]"
                                        }
                                    `}
                                >
                                    Opportunity %
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {discoveredAreas.map(
                                ([area, total]) => {

                                    const areaBusinesses =
                                        businesses.filter(
                                            (business) =>
                                                business.area ===
                                                area
                                        );

                                    const withWebsite =
                                        areaBusinesses.filter(
                                            (business) =>
                                                Boolean(
                                                    business.website
                                                )
                                        ).length;

                                    const withoutWebsite =
                                        areaBusinesses.length -
                                        withWebsite;

                                    const websitePercentage =
                                        total > 0
                                            ? (
                                                  (withWebsite /
                                                      total) *
                                                  100
                                              ).toFixed(1)
                                            : "0.0";

                                    const opportunityPercentage =
                                        total > 0
                                            ? (
                                                  (withoutWebsite /
                                                      total) *
                                                  100
                                              ).toFixed(1)
                                            : "0.0";

                                    return (
                                        <tr
                                            key={area}
                                            className={`
                                                border-b
                                                last:border-b-0
                                                ${
                                                    isDark
                                                        ? "border-[#1f1f1f]"
                                                        : "border-[#eeeeee]"
                                                }
                                            `}
                                        >

                                            <td
                                                className={`
                                                    px-3
                                                    py-4
                                                    text-[12px]
                                                    font-medium
                                                    ${
                                                        isDark
                                                            ? "text-white"
                                                            : "text-[#333]"
                                                    }
                                                `}
                                            >
                                          <div
    className={`
        flex
        min-w-0
        items-center
        gap-2.5
        rounded-[10px]
        border
        px-3
        py-2.5
        transition-colors
        duration-200
        sm:gap-3
        sm:px-4
        sm:py-3
        ${
            isDark
                ? "border-[#292929] bg-[#0f0f0f]"
                : "border-[#dedede] bg-white"
        }
    `}
>
                                                    <MapPin
                                                        size={13}
                                                        strokeWidth={1.7}
                                                        className={
                                                            isDark
                                                                ? "text-white"
                                                                : "text-[#888]"
                                                        }
                                                    />

                                                    {area}
                                                </div>
                                            </td>


                                            <td
                                                className={`
                                                    px-3
                                                    py-4
                                                    text-[12px]
                                                    ${
                                                        isDark
                                                            ? "text-white"
                                                            : "text-[#555]"
                                                    }
                                                `}
                                            >
                                                {total}
                                            </td>


                                            <td
                                                className={`
                                                    px-3
                                                    py-4
                                                    text-[12px]
                                                    ${
                                                        isDark
                                                            ? "text-white"
                                                            : "text-[#555]"
                                                    }
                                                `}
                                            >
                                                {withWebsite}
                                            </td>


                                            <td
                                                className={`
                                                    px-3
                                                    py-4
                                                    text-[12px]
                                                    font-medium
                                                    ${
                                                        isDark
                                                            ? "text-white"
                                                            : "text-[#333]"
                                                    }
                                                `}
                                            >
                                                {withoutWebsite}
                                            </td>


                                            <td
                                                className={`
                                                    px-3
                                                    py-4
                                                    text-[12px]
                                                    ${
                                                        isDark
                                                            ? "text-white"
                                                            : "text-[#555]"
                                                    }
                                                `}
                                            >
                                                {websitePercentage}%
                                            </td>


                                            <td
                                                className={`
                                                    px-3
                                                    py-4
                                                    text-[12px]
                                                    font-medium
                                                    ${
                                                        isDark
                                                            ? "text-white"
                                                            : "text-[#333]"
                                                    }
                                                `}
                                            >
                                                {opportunityPercentage}%
                                            </td>

                                        </tr>
                                    );

                                }
                            )}

                        </tbody>

                    </table>

                </div>

            ) : (

                <div
                    className={`
                        mt-6
                        rounded-lg
                        border
                        px-4
                        py-8
                        text-center
                        text-[12px]
                        ${
                            isDark
                                ? "border-[#242424] text-white"
                                : "border-[#e2e2e2] text-[#777]"
                        }
                    `}
                >
                    No area-specific data is available for this
                    search.
                </div>

            )}

        </div>


     {/* ------------------------------------------------------------ */}
{/* Website Opportunity by Area */}
{/* ------------------------------------------------------------ */}

{discoveredAreas.length > 0 && (

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

            <h4
                className={`
                    text-[14px]
                    font-semibold
                    ${
                        isDark
                            ? "text-white"
                            : "text-[#171717]"
                    }
                `}
            >
                Website Opportunity by Area
            </h4>

            <p
                className={`
                    mt-1
                    text-[12px]
                    ${
                        isDark
                            ? "text-white"
                            : "text-[#777]"
                    }
                `}
            >
                See the website gap in each area at a glance.
            </p>

        </div>


        <div
            className="
                mt-6
                grid
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
            "
        >

            {discoveredAreas.map(
                ([area, total]) => {

                    const areaBusinesses =
                        businesses.filter(
                            (business) =>
                                business.area === area
                        );

                    const withWebsite =
                        areaBusinesses.filter(
                            (business) =>
                                Boolean(
                                    business.website
                                )
                        ).length;

                    const withoutWebsite =
                        areaBusinesses.length -
                        withWebsite;

                    const opportunityPercentage =
                        total > 0
                            ? (withoutWebsite / total) *
                              100
                            : 0;

                    const websitePercentage =
                        total > 0
                            ? (withWebsite / total) *
                              100
                            : 0;

                    return (
                        <div
                            key={area}
                            className={`
                                rounded-lg
                                border
                                p-5
                                ${
                                    isDark
                                        ? "border-[#242424] bg-[#111111]"
                                        : "border-[#e5e5e5] bg-[#fafafa]"
                                }
                            `}
                        >

                            {/* Area Name */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
                            >

                                <div
                                    className={`
                                        flex
                                        min-w-0
                                        items-center
                                        gap-2
                                        text-[12px]
                                        font-medium
                                        ${
                                            isDark
                                                ? "text-white"
                                                : "text-[#333]"
                                        }
                                    `}
                                >

                                    <MapPin
                                        size={13}
                                        strokeWidth={1.7}
                                        className="shrink-0"
                                    />

                                    <span className="truncate">
                                        {area}
                                    </span>

                                </div>


                                <span
                                    className={`
                                        shrink-0
                                        text-[10px]
                                        ${
                                            isDark
                                                ? "text-white"
                                                : "text-[#777]"
                                        }
                                    `}
                                >
                                    {total} total
                                </span>

                            </div>


                            {/* Circle */}

                            <div
                                className="
                                    mt-5
                                    flex
                                    justify-center
                                "
                            >

                                <div
                                    className="
                                        relative
                                        h-36
                                        w-36
                                        rounded-full
                                    "
                                    style={{
                                        background: `conic-gradient(
                                            rgb(249 115 22) 0% ${opportunityPercentage}%,
                                            rgb(16 185 129) ${opportunityPercentage}% 100%
                                        )`,
                                    }}
                                >

                                    {/* Inner Circle */}

                                    <div
                                        className={`
                                            absolute
                                            inset-[10px]
                                            flex
                                            flex-col
                                            items-center
                                            justify-center
                                            rounded-full
                                            ${
                                                isDark
                                                    ? "bg-[#111111]"
                                                    : "bg-[#fafafa]"
                                            }
                                        `}
                                    >

                                        <span
                                            className={`
                                                text-[25px]
                                                font-semibold
                                                tracking-[-0.04em]
                                                ${
                                                    isDark
                                                        ? "text-white"
                                                        : "text-[#171717]"
                                                }
                                            `}
                                        >
                                            {opportunityPercentage.toFixed(
                                                0
                                            )}
                                            %
                                        </span>

                                        <span
                                            className={`
                                                mt-0.5
                                                text-[10px]
                                                ${
                                                    isDark
                                                        ? "text-white"
                                                        : "text-[#777]"
                                                }
                                            `}
                                        >
                                            no website
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* Stats */}

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
                                        rounded-md
                                        border
                                        px-3
                                        py-2.5
                                        ${
                                            isDark
                                                ? "border-[#242424]"
                                                : "border-[#e5e5e5]"
                                        }
                                    `}
                                >

                                    <div
                                        className={`
                                            text-[10px]
                                            ${
                                                isDark
                                                    ? "text-white"
                                                    : "text-[#777]"
                                            }
                                        `}
                                    >
                                        With Website
                                    </div>

                                    <div
                                        className={`
                                            mt-1
                                            text-[15px]
                                            font-semibold
                                            ${
                                                isDark
                                                    ? "text-white"
                                                    : "text-[#333]"
                                            }
                                        `}
                                    >
                                        {withWebsite}
                                    </div>

                                    <div
                                        className="
                                            mt-0.5
                                            text-[10px]
                                            text-emerald-500
                                        "
                                    >
                                        {websitePercentage.toFixed(
                                            1
                                        )}
                                        %
                                    </div>

                                </div>


                                <div
                                    className={`
                                        rounded-md
                                        border
                                        px-3
                                        py-2.5
                                        ${
                                            isDark
                                                ? "border-[#242424]"
                                                : "border-[#e5e5e5]"
                                        }
                                    `}
                                >

                                    <div
                                        className={`
                                            text-[10px]
                                            ${
                                                isDark
                                                    ? "text-white"
                                                    : "text-[#777]"
                                            }
                                        `}
                                    >
                                        No Website
                                    </div>

                                    <div
                                        className={`
                                            mt-1
                                            text-[15px]
                                            font-semibold
                                            ${
                                                isDark
                                                    ? "text-white"
                                                    : "text-[#333]"
                                            }
                                        `}
                                    >
                                        {withoutWebsite}
                                    </div>

                                    <div
                                        className="
                                            mt-0.5
                                            text-[10px]
                                            text-orange-500
                                        "
                                    >
                                        {opportunityPercentage.toFixed(
                                            1
                                        )}
                                        %
                                    </div>

                                </div>

                            </div>


                            {/* Legend */}

                            <div
                                className="
                                    mt-4
                                    flex
                                    items-center
                                    justify-center
                                    gap-4
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-1.5
                                    "
                                >

                                    <span
                                        className="
                                            h-2
                                            w-2
                                            rounded-full
                                            bg-emerald-500
                                        "
                                    />

                                    <span
                                        className={`
                                            text-[10px]
                                            ${
                                                isDark
                                                    ? "text-white"
                                                    : "text-[#777]"
                                            }
                                        `}
                                    >
                                        Website
                                    </span>

                                </div>


                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-1.5
                                    "
                                >

                                    <span
                                        className="
                                            h-2
                                            w-2
                                            rounded-full
                                            bg-orange-500
                                        "
                                    />

                                    <span
                                        className={`
                                            text-[10px]
                                            ${
                                                isDark
                                                    ? "text-white"
                                                    : "text-[#777]"
                                            }
                                        `}
                                    >
                                        Opportunity
                                    </span>

                                </div>

                            </div>

                        </div>
                    );

                }
            )}

        </div>

    </div>

)}


   {/* ------------------------------------------------------------ */}
{/* Business Classification */}
{/* ------------------------------------------------------------ */}

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

        <h4
            className={`
                text-[14px]
                font-semibold
                ${
                    isDark
                        ? "text-white"
                        : "text-[#171717]"
                }
            `}
        >
            Business Classification
        </h4>

        <p
            className={`
                mt-1
                text-[12px]
                ${
                    isDark
                        ? "text-white"
                        : "text-[#777]"
                }
            `}
        >
            Select an area to quickly view its website
            opportunity.
        </p>

    </div>


    {/* Area Selector */}

    <div className="mt-5 flex flex-wrap gap-2">

        <button
            type="button"
            onClick={() =>
                setActiveOpportunity("all")
            }
            className={`
                rounded-md
                border
                px-3
                py-2
                text-[11px]
                font-medium
                ${
                    activeOpportunity === "all"
                        ? isDark
                            ? "border-[#555] bg-[#202020] text-white"
                            : "border-[#cfcfcf] bg-[#f2f2f2] text-[#171717]"
                        : isDark
                            ? "border-[#292929] text-white"
                            : "border-[#dedede] text-[#666]"
                }
            `}
        >
            All Areas
        </button>


        {discoveredAreas.map(
            ([area]) => (
                <button
                    key={area}
                    type="button"
                    onClick={() =>
                        setActiveOpportunity(
                            area
                        )
                    }
                    className={`
                        rounded-md
                        border
                        px-3
                        py-2
                        text-[11px]
                        font-medium
                        ${
                            activeOpportunity ===
                            area
                                ? isDark
                                    ? "border-[#555] bg-[#202020] text-white"
                                    : "border-[#cfcfcf] bg-[#f2f2f2] text-[#171717]"
                                : isDark
                                    ? "border-[#292929] text-white"
                                    : "border-[#dedede] text-[#666]"
                        }
                    `}
                >
                    {area}
                </button>
            )
        )}

    </div>


    {/* Classification Cards */}

    {(() => {

        const selectedArea =
            activeOpportunity !== "all"
                ? activeOpportunity
                : null;

        const selectedBusinesses =
            selectedArea
                ? businesses.filter(
                      (business) =>
                          business.area ===
                          selectedArea
                  )
                : businesses;

        const withWebsite =
            selectedBusinesses.filter(
                (business) =>
                    Boolean(
                        business.website
                    )
            );

        const withoutWebsite =
            selectedBusinesses.filter(
                (business) =>
                    !business.website
            );

        return (
            <div
                className="
                    mt-5
                    grid
                    gap-3
                    sm:grid-cols-2
                "
            >

                {/* With Website */}

                <button
                    type="button"
                    onClick={() => {
                        if (
                            withWebsite.length ===
                            1
                        ) {
                            onBusinessClick(
                                withWebsite[0].id
                            );
                        }
                    }}
                    className={`
                        rounded-lg
                        border
                        p-4
                        text-left
                        transition-colors
                        ${
                            isDark
                                ? "border-[#242424] bg-[#111111] hover:bg-[#181818]"
                                : "border-[#e5e5e5] bg-[#fafafa] hover:bg-white"
                        }
                        ${
                            withWebsite.length ===
                            1
                                ? "cursor-pointer"
                                : "cursor-default"
                        }
                    `}
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div
                            className={`
                                text-[11px]
                                font-medium
                                ${
                                    isDark
                                        ? "text-white"
                                        : "text-[#666]"
                                }
                            `}
                        >
                            With Website
                        </div>

                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-emerald-500
                            "
                        />

                    </div>


                    <div
                        className={`
                            mt-2
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
                        {withWebsite.length}
                    </div>


                    <div
                        className={`
                            mt-1
                            text-[10px]
                            ${
                                isDark
                                    ? "text-white"
                                    : "text-[#777]"
                            }
                        `}
                    >
                        businesses
                    </div>

                </button>


                {/* Without Website */}

                <button
                    type="button"
                    onClick={() => {
                        if (
                            withoutWebsite.length ===
                            1
                        ) {
                            onBusinessClick(
                                withoutWebsite[0].id
                            );
                        }
                    }}
                    className={`
                        rounded-lg
                        border
                        p-4
                        text-left
                        transition-colors
                        ${
                            isDark
                                ? "border-[#242424] bg-[#111111] hover:bg-[#181818]"
                                : "border-[#e5e5e5] bg-[#fafafa] hover:bg-white"
                        }
                        ${
                            withoutWebsite.length ===
                            1
                                ? "cursor-pointer"
                                : "cursor-default"
                        }
                    `}
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div
                            className={`
                                text-[11px]
                                font-medium
                                ${
                                    isDark
                                        ? "text-white"
                                        : "text-[#666]"
                                }
                            `}
                        >
                            Without Website
                        </div>

                        <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-orange-500
                            "
                        />

                    </div>


                    <div
                        className={`
                            mt-2
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
                        {withoutWebsite.length}
                    </div>


                    <div
                        className={`
                            mt-1
                            text-[10px]
                            ${
                                isDark
                                    ? "text-white"
                                    : "text-[#777]"
                            }
                        `}
                    >
                        businesses
                    </div>

                </button>

            </div>
        );

    })()}

</div>


    {/* ------------------------------------------------------------ */}
{/* Area-wise Business Classification */}
{/* ------------------------------------------------------------ */}

{discoveredAreas.length > 0 && (

    <div className="space-y-4">

        {discoveredAreas
            .filter(([area]) => {
                // "all" means show every area
                if (activeOpportunity === "all") {
                    return true;
                }

                // Otherwise show only selected area
                return activeOpportunity === area;
            })
            .map(([area, total]) => {

                const areaBusinesses =
                    businesses.filter(
                        (business) =>
                            business.area === area
                    );

                const withWebsite =
                    areaBusinesses.filter(
                        (business) =>
                            Boolean(
                                business.website
                            )
                    );

                const withoutWebsite =
                    areaBusinesses.filter(
                        (business) =>
                            !business.website
                    );

                return (
                    <div
                        key={area}
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

                        {/* Area Header */}

                        <div
                            className="
                                flex
                                items-start
                                justify-between
                                gap-4
                            "
                        >

                            <div>

                                <h4
                                    className={`
                                        flex
                                        items-center
                                        gap-2
                                        text-[14px]
                                        font-semibold
                                        ${
                                            isDark
                                                ? "text-white"
                                                : "text-[#171717]"
                                        }
                                    `}
                                >

                                    <MapPin
                                        size={14}
                                        strokeWidth={1.7}
                                    />

                                    {area}

                                </h4>


                                <p
                                    className={`
                                        mt-1
                                        text-[11px]
                                        ${
                                            isDark
                                                ? "text-white"
                                                : "text-[#777]"
                                        }
                                    `}
                                >
                                    {total}{" "}
                                    {total === 1
                                        ? "business"
                                        : "businesses"}
                                </p>

                            </div>


                            <div
                                className={`
                                    text-right
                                    text-[11px]
                                    ${
                                        isDark
                                            ? "text-white"
                                            : "text-[#777]"
                                    }
                                `}
                            >

                                <div>
                                    {withoutWebsite.length}{" "}
                                    without website
                                </div>

                                <div className="mt-1">
                                    {withWebsite.length}{" "}
                                    with website
                                </div>

                            </div>

                        </div>


                        {/* Business Classification */}

                        <div
                            className="
                                mt-5
                                grid
                                gap-5
                                lg:grid-cols-2
                            "
                        >

                            {/* ------------------------------------------------ */}
                            {/* With Website */}
                            {/* ------------------------------------------------ */}

                            <div>

                                <div
                                    className="
                                        mb-3
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <div
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            text-[11px]
                                            font-medium
                                            ${
                                                isDark
                                                    ? "text-white"
                                                    : "text-[#555]"
                                            }
                                        `}
                                    >

                                        <span
                                            className="
                                                h-2
                                                w-2
                                                rounded-full
                                                bg-emerald-500
                                            "
                                        />

                                        With Website

                                    </div>


                                    <span
                                        className={`
                                            text-[11px]
                                            ${
                                                isDark
                                                    ? "text-white"
                                                    : "text-[#777]"
                                            }
                                        `}
                                    >
                                        {withWebsite.length}
                                    </span>

                                </div>


                                <div className="space-y-2">

                                    {withWebsite.length > 0 ? (

                                        withWebsite.map(
                                            (business) => (

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
                                                        gap-3
                                                        rounded-lg
                                                        border
                                                        px-3
                                                        py-3
                                                        text-left
                                                        transition-colors
                                                        ${
                                                            isDark
                                                                ? "border-[#242424] hover:bg-[#151515]"
                                                                : "border-[#e2e2e2] hover:bg-[#fafafa]"
                                                        }
                                                    `}
                                                >

                                                    <div
                                                        className="
                                                            min-w-0
                                                        "
                                                    >

                                                        <div
                                                            className={`
                                                                truncate
                                                                text-[12px]
                                                                font-medium
                                                                ${
                                                                    isDark
                                                                        ? "text-white"
                                                                        : "text-[#333]"
                                                                }
                                                            `}
                                                        >
                                                            {
                                                                business.business_name
                                                            }
                                                        </div>


                                                        <div
                                                            className={`
                                                                mt-1
                                                                text-[11px]
                                                                ${
                                                                    isDark
                                                                        ? "text-white"
                                                                        : "text-[#777]"
                                                                }
                                                            `}
                                                        >
                                                            {business.google_rating
                                                                ? `${business.google_rating} rating`
                                                                : "Rating unavailable"}
                                                        </div>

                                                    </div>


                                                    <ChevronRight
                                                        size={14}
                                                        className={
                                                            isDark
                                                                ? "shrink-0 text-white"
                                                                : "shrink-0 text-[#777]"
                                                        }
                                                    />

                                                </button>

                                            )
                                        )

                                    ) : (

                                        <div
                                            className={`
                                                rounded-lg
                                                border
                                                px-3
                                                py-4
                                                text-center
                                                text-[11px]
                                                ${
                                                    isDark
                                                        ? "border-[#242424] text-white"
                                                        : "border-[#e2e2e2] text-[#777]"
                                                }
                                            `}
                                        >
                                            No businesses with a
                                            website.
                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* ------------------------------------------------ */}
                            {/* Without Website */}
                            {/* ------------------------------------------------ */}

                            <div>

                                <div
                                    className="
                                        mb-3
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <div
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            text-[11px]
                                            font-medium
                                            ${
                                                isDark
                                                    ? "text-white"
                                                    : "text-[#555]"
                                            }
                                        `}
                                    >

                                        <span
                                            className="
                                                h-2
                                                w-2
                                                rounded-full
                                                bg-orange-500
                                            "
                                        />

                                        Without Website

                                    </div>


                                    <span
                                        className={`
                                            text-[11px]
                                            ${
                                                isDark
                                                    ? "text-white"
                                                    : "text-[#777]"
                                            }
                                        `}
                                    >
                                        {withoutWebsite.length}
                                    </span>

                                </div>


                                <div className="space-y-2">

                                    {withoutWebsite.length > 0 ? (

                                        withoutWebsite.map(
                                            (business) => (

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
                                                        gap-3
                                                        rounded-lg
                                                        border
                                                        px-3
                                                        py-3
                                                        text-left
                                                        transition-colors
                                                        ${
                                                            isDark
                                                                ? "border-[#242424] hover:bg-[#151515]"
                                                                : "border-[#e2e2e2] hover:bg-[#fafafa]"
                                                        }
                                                    `}
                                                >

                                                    <div
                                                        className="
                                                            min-w-0
                                                        "
                                                    >

                                                        <div
                                                            className={`
                                                                truncate
                                                                text-[12px]
                                                                font-medium
                                                                ${
                                                                    isDark
                                                                        ? "text-white"
                                                                        : "text-[#333]"
                                                                }
                                                            `}
                                                        >
                                                            {
                                                                business.business_name
                                                            }
                                                        </div>


                                                        <div
                                                            className={`
                                                                mt-1
                                                                flex
                                                                items-center
                                                                gap-2
                                                                text-[11px]
                                                                ${
                                                                    isDark
                                                                        ? "text-white"
                                                                        : "text-[#777]"
                                                                }
                                                            `}
                                                        >

                                                            <span>
                                                                {
                                                                    business.google_rating ||
                                                                    "—"
                                                                }
                                                            </span>

                                                            {business.review_count !=
                                                                null && (
                                                                <span>
                                                                    {
                                                                        business.review_count
                                                                    }{" "}
                                                                    reviews
                                                                </span>
                                                            )}

                                                        </div>

                                                    </div>


                                                    <ChevronRight
                                                        size={14}
                                                        className={
                                                            isDark
                                                                ? "shrink-0 text-white"
                                                                : "shrink-0 text-[#777]"
                                                        }
                                                    />

                                                </button>

                                            )
                                        )

                                    ) : (

                                        <div
                                            className={`
                                                rounded-lg
                                                border
                                                px-3
                                                py-4
                                                text-center
                                                text-[11px]
                                                ${
                                                    isDark
                                                        ? "border-[#242424] text-white"
                                                        : "border-[#e2e2e2] text-[#777]"
                                                }
                                            `}
                                        >
                                            No businesses without a
                                            website.
                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>
                );
            })}

    </div>

)}

    </div>
)}

        </section>
    );
}

export default SearchResults;