import { SearchX } from "lucide-react";

import SearchProgress from "./SearchProgress";
import BusinessCard from "./BusinessCard";

function SearchResults({
    businesses,
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
                />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                    {Array.from({ length: 6 }).map(
                        (_, index) => (
                            <div
                                key={index}
                                className="
                                    h-56
                                    animate-pulse
                                    rounded-[10px]
                                    border
                                    border-[#242424]
                                    bg-[#111111]
                                "
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
                className="
                    flex
                    min-h-[360px]
                    items-center
                    justify-center
                    border
                    border-dashed
                    border-[#2a2a2a]
                    bg-[#080808]
                    px-6
                    py-12
                "
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
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-[#292929]
                            bg-[#111111]
                        "
                    >
                        <SearchX
                            size={21}
                            strokeWidth={1.7}
                            className="text-[#777]"
                        />
                    </div>

                    <h2
                        className="
                            mt-5
                            text-[18px]
                            font-semibold
                            tracking-[-0.025em]
                            text-white
                        "
                    >
                        No businesses found
                    </h2>

                    <p
                        className="
                            mt-2
                            text-[13px]
                            leading-6
                            text-[#777]
                        "
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
                className="
                    flex
                    flex-col
                    gap-3
                    border-b
                    border-[#242424]
                    pb-4
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                "
            >

                <div>

                    <h2
                        className="
                            text-[19px]
                            font-semibold
                            tracking-[-0.025em]
                            text-white
                        "
                    >
                        Search Results
                    </h2>

                    <p
                        className="
                            mt-1
                            text-[13px]
                            text-[#777]
                        "
                    >
                        Browse businesses and choose one to analyze.
                    </p>

                </div>

                {/* Result Count */}

                <div
                    className="
                        inline-flex
                        h-8
                        w-fit
                        items-center
                        rounded-lg
                        border
                        border-[#292929]
                        bg-[#111111]
                        px-3
                    "
                >

                    <span
                        className="
                            text-[12px]
                            text-[#777]
                        "
                    >
                        <span
                            className="
                                font-medium
                                text-[#e5e5e5]
                            "
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