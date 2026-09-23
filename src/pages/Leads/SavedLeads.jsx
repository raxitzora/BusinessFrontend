import {
    Bookmark,
    Building2,
    Eye,
    MapPin,
    Phone,
    Star,
    MessageSquare,
    Trash2,
    LoaderCircle,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getSavedLeads,
    removeSavedLead,
} from "../../services/business.service";


function SavedLeads() {

    const navigate = useNavigate();

    const [leads, setLeads] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [removingId, setRemovingId] =
        useState(null);


    /* =========================================================
       LOAD SAVED LEADS
    ========================================================= */

    const loadSavedLeads = async () => {

        try {

            setLoading(true);

            const response =
                await getSavedLeads();

            setLeads(
                response.businesses || []
            );

        } catch (error) {

            console.error(
                "Failed to load saved leads:",
                error
            );

            toast.error(
                "Failed to load saved leads."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadSavedLeads();

    }, []);


    /* =========================================================
       REMOVE LEAD
    ========================================================= */

    const handleRemove = async (
        businessId
    ) => {

        try {

            setRemovingId(businessId);

            await removeSavedLead(
                businessId
            );

            setLeads((previous) =>
                previous.filter(
                    (lead) =>
                        lead.id !== businessId
                )
            );

            toast.success(
                "Lead removed from saved leads."
            );

        } catch (error) {

            console.error(
                "Failed to remove lead:",
                error
            );

            toast.error(
                "Failed to remove lead."
            );

        } finally {

            setRemovingId(null);

        }

    };


    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (

            <section className="space-y-6">

                <div>

                    <div className="h-8 w-48 animate-pulse rounded bg-zinc-800" />

                    <div className="mt-3 h-4 w-72 animate-pulse rounded bg-zinc-800" />

                </div>


                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {Array.from({
                        length: 6
                    }).map((_, index) => (

                        <div
                            key={index}
                            className="h-72 animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900"
                        />

                    ))}

                </div>

            </section>

        );

    }


    /* =========================================================
       EMPTY STATE
    ========================================================= */

    if (!leads.length) {

        return (

            <section className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/60 p-12">

                <div className="mx-auto flex max-w-md flex-col items-center text-center">

                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10">

                        <Bookmark
                            size={28}
                            className="text-violet-400"
                        />

                    </div>


                    <h2 className="mt-6 text-2xl font-semibold text-white">
                        No Saved Leads
                    </h2>


                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                        Save businesses from your search
                        results and they will appear here.
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            navigate("/app/search")
                        }
                        className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-500"
                    >
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

        <section className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                <div>

                    <div className="flex items-center gap-3">

                        <Bookmark
                            size={24}
                            className="text-violet-400"
                        />

                        <h1 className="text-2xl font-semibold text-white">
                            Saved Leads
                        </h1>

                    </div>


                    <p className="mt-2 text-sm text-zinc-400">
                        Businesses you've saved for later.
                    </p>

                </div>


                <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2">

                    <span className="text-sm text-zinc-400">

                        <span className="font-semibold text-white">
                            {leads.length}
                        </span>{" "}

                        {leads.length === 1
                            ? "Lead"
                            : "Leads"}

                    </span>

                </div>

            </div>


            {/* Cards */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {leads.map((business) => (

                    <div
                        key={business.id}
                        className="
                            group
                            rounded-2xl
                            border
                            border-zinc-800
                            bg-zinc-900
                            p-6
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-violet-500
                        "
                    >

                        {/* Header */}

                        <div className="flex items-start justify-between gap-4">

                            <div className="min-w-0 flex-1">

                                <div className="flex items-center gap-2">

                                    <Building2
                                        size={18}
                                        className="shrink-0 text-violet-400"
                                    />

                                    <h2 className="truncate text-lg font-semibold text-white">
                                        {business.business_name}
                                    </h2>

                                </div>


                                <p className="mt-2 inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                                    {business.category ||
                                        "Unknown Category"}
                                </p>

                            </div>

                        </div>


                        {/* Business Information */}

                        <div className="mt-5 space-y-3">

                            {/* Rating + Reviews */}

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2 text-sm text-zinc-300">

                                    <Star
                                        size={16}
                                        className="fill-yellow-400 text-yellow-400"
                                    />

                                    {business.google_rating ??
                                        "N/A"}

                                </div>


                                <div className="flex items-center gap-2 text-sm text-zinc-300">

                                    <MessageSquare
                                        size={16}
                                    />

                                    {business.review_count ??
                                        0}{" "}
                                    Reviews

                                </div>

                            </div>


                            {/* Address */}

                            <div className="flex items-start gap-2 text-sm text-zinc-400">

                                <MapPin
                                    size={16}
                                    className="mt-0.5 shrink-0 text-violet-400"
                                />

                                <span className="line-clamp-2">
                                    {business.address ||
                                        "Address not available"}
                                </span>

                            </div>


                            {/* Phone */}

                            <div className="flex items-center gap-2 text-sm text-zinc-400">

                                <Phone
                                    size={16}
                                    className="text-violet-400"
                                />

                                <span className="truncate">
                                    {business.phone ||
                                        "Phone not available"}
                                </span>

                            </div>

                        </div>


                        {/* Actions */}

                        <div className="mt-5 grid grid-cols-2 gap-3">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/business/${business.id}`
                                    )
                                }
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-zinc-700
                                    bg-zinc-800
                                    px-4
                                    py-3
                                    text-sm
                                    font-medium
                                    text-zinc-200
                                    transition-all
                                    hover:border-violet-500
                                    hover:bg-violet-500/10
                                    hover:text-white
                                "
                            >

                                <Eye size={16} />

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
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-red-500/20
                                    bg-red-500/5
                                    px-4
                                    py-3
                                    text-sm
                                    font-medium
                                    text-red-400
                                    transition-all
                                    hover:bg-red-500/10
                                    disabled:cursor-wait
                                    disabled:opacity-50
                                "
                            >

                                {removingId ===
                                business.id ? (

                                    <>
                                        <LoaderCircle
                                            size={16}
                                            className="animate-spin"
                                        />

                                        Removing...
                                    </>

                                ) : (

                                    <>
                                        <Trash2
                                            size={16}
                                        />

                                        Remove
                                    </>

                                )}

                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );

}


export default SavedLeads;