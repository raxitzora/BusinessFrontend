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
if (loading) {

    return (
        <section className="space-y-6">

            <SearchProgress
                keyword={keyword}
                location={location}
                stage={searchStage}
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {Array.from({ length: 6 }).map(
                    (_, index) => (
                        <div
                            key={index}
                            className="h-56 rounded-2xl border border-zinc-800/70 bg-zinc-900/50"
                        />
                    )
                )}

            </div>

        </section>
    );

}

    if (searchPerformed && businesses.length === 0) {
        return (
            <section className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/60 p-12">

                <div className="mx-auto flex max-w-md flex-col items-center text-center">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">

                        <SearchX
                            size={28}
                            className="text-zinc-500"
                        />

                    </div>

                    <h2 className="mt-6 text-2xl font-semibold text-white">
                        No Businesses Found
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                        We couldn't find any businesses matching your search.
                        Try using a different keyword, nearby city, or a broader
                        business category.
                    </p>

                </div>

            </section>
        );
    }

    return (
        <section className="space-y-6">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                <div>

                    <h2 className="text-2xl font-semibold text-white">
                        Search Results
                    </h2>

                    <p className="text-sm text-zinc-400">
                        Browse businesses and choose one to analyze.
                    </p>

                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2">

                    <span className="text-sm text-zinc-400">

                        <span className="font-semibold text-white">
                            {businesses.length}
                        </span>{" "}
                        Businesses

                    </span>

                </div>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

{businesses.map((business) => (
    <BusinessCard
        key={business.id}
        business={business}
        onClick={onBusinessClick}
        onSave={onSaveLead}
        saved={savedLeads.includes(Number(business.id))}
        saving={savingLeadId === business.id}
    />
))}

            </div>

        </section>
    );
}

export default SearchResults;