import { SearchX } from "lucide-react";

import SearchProgress from "./SearchProgress";
import BusinessCard from "./BusinessCard";

function SearchResults({
    businesses,
    theme,
    loading,
    searchPerformed,
    keyword,
    location,
    searchStage,
    onBusinessClick,
    onSaveLead,
    savedLeads,
    savingLeadId,
}) {
    const isDark = theme === "dark";

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

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                    {Array.from({ length: 6 }).map(
                        (_, index) => (
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
                        )
                    )}

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
                            transition-colors
                            duration-200
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
                            text-[13px]
                            leading-6
                            transition-colors
                            duration-200
                            ${
                                isDark
                                    ? "text-[#777]"
                                    : "text-[#777]"
                            }
                        `}
                    >
                        We couldn't find any businesses matching
                        your search. Try a different keyword, a
                        nearby city, or a broader business category.
                    </p>

                </div>

            </section>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Results
    |--------------------------------------------------------------------------
    */

    return (
        <section className="space-y-5">

            {/* Results Header */}

            <div
                className={`
                    flex
                    flex-col
                    gap-3
                    border-b
                    pb-4
                    transition-colors
                    duration-200
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                    ${
                        isDark
                            ? "border-[#242424]"
                            : "border-[#dedede]"
                    }
                `}
            >

                <div>

                    <h2
                        className={`
                            text-[19px]
                            font-semibold
                            tracking-[-0.025em]
                            transition-colors
                            duration-200
                            ${
                                isDark
                                    ? "text-white"
                                    : "text-[#171717]"
                            }
                        `}
                    >
                        Search Results
                    </h2>

                    <p
                        className={`
                            mt-1
                            text-[13px]
                            transition-colors
                            duration-200
                            ${
                                isDark
                                    ? "text-[#777]"
                                    : "text-[#707070]"
                            }
                        `}
                    >
                        Browse businesses and choose one to analyze.
                    </p>

                </div>

                {/* Result Count */}

                <div
                    className={`
                        inline-flex
                        h-8
                        w-fit
                        items-center
                        rounded-lg
                        border
                        px-3
                        transition-colors
                        duration-200
                        ${
                            isDark
                                ? "border-[#292929] bg-[#111111]"
                                : "border-[#dedede] bg-white"
                        }
                    `}
                >

                    <span
                        className={`
                            text-[12px]
                            transition-colors
                            duration-200
                            ${
                                isDark
                                    ? "text-[#777]"
                                    : "text-[#777]"
                            }
                        `}
                    >
                        <span
                            className={`
                                font-medium
                                transition-colors
                                duration-200
                                ${
                                    isDark
                                        ? "text-[#e5e5e5]"
                                        : "text-[#222]"
                                }
                            `}
                        >
                            {businesses.length}
                        </span>

                        <span className="ml-1.5">
                            businesses
                        </span>
                    </span>

                </div>

            </div>

            {/* Business Grid */}

            <div
                className="
                    grid
                    gap-4
                    md:grid-cols-2
                    xl:grid-cols-3
                "
            >

                {businesses.map((business) => (
                    <BusinessCard
                        key={business.id}
                        business={business}
                        theme={theme}
                        onClick={onBusinessClick}
                        onSave={onSaveLead}
                        saved={savedLeads.includes(
                            Number(business.id)
                        )}
                        saving={
                            savingLeadId === business.id
                        }
                    />
                ))}

            </div>

        </section>
    );
}

export default SearchResults;