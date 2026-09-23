import { Loader2, MapPin, Search } from "lucide-react";

function SearchForm({
    keyword,
    location,
    loading,
    onKeywordChange,
    onLocationChange,
    onSubmit,
}) {
    return (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-8 backdrop-blur">
            <div className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Search Businesses
                </h1>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Discover local businesses by keyword and location. Analyze
                    potential clients and identify new business opportunities.
                </p>
            </div>

            <form
                onSubmit={onSubmit}
                className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_auto]"
            >
                {/* Keyword */}

                <div className="group flex h-14 items-center rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-200 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20">
                    <Search
                        size={20}
                        className="ml-4 shrink-0 text-zinc-500 transition-colors group-focus-within:text-violet-400"
                    />

                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) =>
                            onKeywordChange(e.target.value)
                        }
                        placeholder="Dentist, Restaurant, Gym..."
                        autoComplete="off"
                        spellCheck={false}
                        className="h-full w-full bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                    />
                </div>

                {/* Location */}

                <div className="group flex h-14 items-center rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-200 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20">
                    <MapPin
                        size={20}
                        className="ml-4 shrink-0 text-zinc-500 transition-colors group-focus-within:text-violet-400"
                    />

                    <input
                        type="text"
                        value={location}
                        onChange={(e) =>
                            onLocationChange(e.target.value)
                        }
                        placeholder="Ahmedabad, Rajkot..."
                        autoComplete="off"
                        spellCheck={false}
                        className="h-full w-full bg-transparent px-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                    />
                </div>

                {/* Search Button */}

                <button
                    type="submit"
                    disabled={
                        loading ||
                        !keyword.trim() ||
                        !location.trim()
                    }
                    className="flex h-14 min-w-45 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 font-medium text-white transition-all duration-200 hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
                >
                    {loading ? (
                        <>
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                            Searching...
                        </>
                    ) : (
                        <>
                            <Search size={18} />
                            Search
                        </>
                    )}
                </button>
            </form>
        </section>
    );
}

export default SearchForm;