import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

import {
    History,
    Search,
    RotateCcw,
    MapPin,
    Building2,
    CalendarDays,
} from "lucide-react";

import { getSearchHistory } from "../../services/business.service";


function SearchHistory() {

    const navigate = useNavigate();

    const { user } = useUser();

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if (!user) {
            return;
        }

        const loadHistory = async () => {

            try {

                setLoading(true);

                const response =
                    await getSearchHistory();

                setHistory(
                    response.history || []
                );

            } catch (error) {

                console.error(
                    "Failed to load search history:",
                    error?.response?.data || error
                );

                toast.error(
                    "Failed to load search history."
                );

            } finally {

                setLoading(false);

            }

        };

        loadHistory();

    }, [user]);


    const handleSearchAgain = (item) => {

        navigate(
            `/search?keyword=${encodeURIComponent(
                item.keyword
            )}&location=${encodeURIComponent(
                item.location
            )}&page=1`
        );

    };


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


    if (loading) {

        return (

            <div className="space-y-6">

                <div>

                    <div className="h-8 w-64 animate-pulse rounded-lg bg-zinc-800" />

                    <div className="mt-3 h-4 w-96 animate-pulse rounded bg-zinc-800" />

                </div>


                <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">

                    {Array.from({ length: 5 }).map(
                        (_, index) => (

                            <div
                                key={index}
                                className="flex h-24 animate-pulse items-center gap-6 border-b border-zinc-800 px-6 last:border-b-0"
                            >

                                <div className="h-10 w-10 rounded-lg bg-zinc-800" />

                                <div className="h-4 w-40 rounded bg-zinc-800" />

                                <div className="h-4 w-32 rounded bg-zinc-800" />

                                <div className="h-4 w-20 rounded bg-zinc-800" />

                                <div className="ml-auto h-9 w-28 rounded-lg bg-zinc-800" />

                            </div>

                        )
                    )}

                </div>

            </div>

        );

    }


    return (

        <div className="space-y-6">


            {/* Header */}

            <div className="flex items-end justify-between">

                <div>

                    <div className="flex items-center gap-3">

                        <History
                            size={25}
                            className="text-violet-400"
                        />

                        <h1 className="text-3xl font-semibold text-white">

                            Search History

                        </h1>

                    </div>


                    <p className="mt-2 text-sm text-zinc-400">

                        Review and re-run your previous
                        lead discovery searches.

                        <span className="ml-1 font-medium text-violet-400">

                            {history.length} searches

                        </span>

                    </p>

                </div>

            </div>


            {/* Empty State */}

            {history.length === 0 ? (

                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900">

                        <Search
                            size={28}
                            className="text-zinc-500"
                        />

                    </div>


                    <h2 className="mt-5 text-xl font-semibold text-white">

                        No Search History

                    </h2>


                    <p className="mt-2 max-w-md text-center text-sm text-zinc-500">

                        Your previous lead discovery
                        searches will appear here.

                    </p>

                </div>

            ) : (

                <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">


                    {/* Table Header */}

                    <div className="hidden grid-cols-[1.5fr_1.2fr_1fr_1.2fr_auto] gap-6 border-b border-zinc-800 bg-zinc-900/40 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 md:grid">

                        <div>
                            Keyword
                        </div>

                        <div>
                            Location
                        </div>

                        <div>
                            Businesses Found
                        </div>

                        <div>
                            Date
                        </div>

                        <div>
                            Action
                        </div>

                    </div>


                    {/* Rows */}

                    {history.map((item) => (

                        <div
                            key={item.id}
                            className="grid gap-5 border-b border-zinc-800 px-6 py-5 transition-colors last:border-b-0 hover:bg-zinc-900/50 md:grid-cols-[1.5fr_1.2fr_1fr_1.2fr_auto] md:items-center md:gap-6"
                        >


                            {/* Keyword */}

                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">

                                    <Search
                                        size={17}
                                        className="text-violet-400"
                                    />

                                </div>


                                <div className="min-w-0">

                                    <p className="truncate font-medium text-white">

                                        {item.keyword}

                                    </p>

                                    <p className="mt-1 text-xs text-zinc-500 md:hidden">

                                        Keyword

                                    </p>

                                </div>

                            </div>


                            {/* Location */}

                            <div className="flex items-center gap-2 text-sm text-zinc-300">

                                <MapPin
                                    size={16}
                                    className="shrink-0 text-zinc-500"
                                />

                                <span>

                                    {item.location}

                                </span>

                            </div>


                            {/* Businesses Found */}

                            <div className="flex items-center gap-2">

                                <Building2
                                    size={16}
                                    className="text-zinc-500"
                                />

                                <span className="font-semibold text-white">

                                    {item.businesses_found}

                                </span>

                            </div>


                            {/* Date */}

                            <div className="flex items-center gap-2 text-sm text-zinc-400">

                                <CalendarDays
                                    size={16}
                                    className="shrink-0 text-zinc-500"
                                />

                                <span>

                                    {formatDate(
                                        item.created_at
                                    )}

                                </span>

                            </div>


                            {/* Action */}

                            <button
                                type="button"
                                onClick={() =>
                                    handleSearchAgain(
                                        item
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-300"
                            >

                                <RotateCcw
                                    size={16}
                                />

                                <span>
                                    Search Again
                                </span>

                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default SearchHistory;