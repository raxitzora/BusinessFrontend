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
import {
    useNavigate,
    useOutletContext,
} from "react-router-dom";
import toast from "react-hot-toast";

import {
    getSavedLeads,
    removeSavedLead,
} from "../../services/business.service";


function SavedLeads() {

    const navigate = useNavigate();

    const { theme } = useOutletContext();

    const isDark = theme === "dark";

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

                    <div
                        className={`h-8 w-48 animate-pulse rounded ${
                            isDark
                                ? "bg-zinc-800"
                                : "bg-zinc-200"
                        }`}
                    />

                    <div
                        className={`mt-3 h-4 w-72 animate-pulse rounded ${
                            isDark
                                ? "bg-zinc-800"
                                : "bg-zinc-200"
                        }`}
                    />

                </div>


                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {Array.from({
                        length: 6
                    }).map((_, index) => (

                        <div
                            key={index}
                            className={`h-72 animate-pulse rounded-2xl border ${
                                isDark
                                    ? "border-zinc-800 bg-zinc-900"
                                    : "border-[#e2e2e2] bg-white"
                            }`}
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

            <section
                className={`rounded-2xl border border-dashed p-12 transition-colors duration-200 ${
                    isDark
                        ? "border-zinc-800 bg-zinc-900/60"
                        : "border-[#dcdcdc] bg-white"
                }`}
            >

                <div className="mx-auto flex max-w-md flex-col items-center text-center">

                    <div
                        className={`flex h-16 w-16 items-center justify-center rounded-full ${
                            isDark
                                ? "bg-blue-500/10"
                                : "bg-blue-50"
                        }`}
                    >

                        <Bookmark
                            size={28}
                            className={
                                isDark
                                    ? "text-blue-400"
                                    : "text-blue-600"
                            }
                        />

                    </div>


                    <h2
                        className={`mt-6 text-2xl font-semibold ${
                            isDark
                                ? "text-white"
                                : "text-zinc-900"
                        }`}
                    >
                        No Saved Leads
                    </h2>


                    <p
                        className={`mt-3 text-sm leading-6 ${
                            isDark
                                ? "text-zinc-400"
                                : "text-zinc-500"
                        }`}
                    >
                        Save businesses from your search
                        results and they will appear here.
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            navigate("/app/search")
                        }
                        className={`mt-6 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-150 ${
                            isDark
                                ? "bg-white text-black hover:bg-zinc-200"
                                : "bg-zinc-900 text-white hover:bg-zinc-800"
                        }`}
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
                            className={
                                isDark
                                    ? "text-blue-400"
                                    : "text-blue-600"
                            }
                        />

                        <h1
                            className={`text-2xl font-semibold ${
                                isDark
                                    ? "text-white"
                                    : "text-zinc-900"
                            }`}
                        >
                            Saved Leads
                        </h1>

                    </div>


                    <p
                        className={`mt-2 text-sm ${
                            isDark
                                ? "text-zinc-400"
                                : "text-zinc-500"
                        }`}
                    >
                        Businesses you've saved for later.
                    </p>

                </div>


                <div
                    className={`rounded-xl border px-4 py-2 ${
                        isDark
                            ? "border-zinc-800 bg-zinc-900"
                            : "border-[#dedede] bg-white"
                    }`}
                >

                    <span
                        className={`text-sm ${
                            isDark
                                ? "text-zinc-400"
                                : "text-zinc-500"
                        }`}
                    >

                        <span
                            className={`font-semibold ${
                                isDark
                                    ? "text-white"
                                    : "text-zinc-900"
                            }`}
                        >
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
                        className={`
                            group
                            rounded-2xl
                            border
                            p-6
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            ${
                                isDark
                                    ? `
                                        border-zinc-800
                                        bg-zinc-900
                                        hover:border-zinc-700
                                        hover:bg-zinc-[930]
                                    `
                                    : `
                                        border-[#dedede]
                                        bg-white
                                        shadow-[0_2px_10px_rgba(0,0,0,0.03)]
                                        hover:border-[#cfcfcf]
                                        hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                                    `
                            }
                        `}
                    >

                        {/* Header */}

                        <div className="flex items-start justify-between gap-4">

                            <div className="min-w-0 flex-1">

                                <div className="flex items-center gap-2">

                                    <div
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                            isDark
                                                ? "bg-blue-500/10"
                                                : "bg-blue-50"
                                        }`}
                                    >

                                        <Building2
                                            size={17}
                                            className={
                                                isDark
                                                    ? "text-blue-400"
                                                    : "text-blue-600"
                                            }
                                        />

                                    </div>


                                    <h2
                                        className={`truncate text-lg font-semibold ${
                                            isDark
                                                ? "text-white"
                                                : "text-zinc-900"
                                        }`}
                                    >
                                        {business.business_name}
                                    </h2>

                                </div>


                                <p
                                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                        isDark
                                            ? "bg-blue-500/10 text-blue-300"
                                            : "bg-blue-50 text-blue-700"
                                    }`}
                                >
                                    {business.category ||
                                        "Unknown Category"}
                                </p>

                            </div>

                        </div>


                        {/* Business Information */}

                        <div className="mt-5 space-y-3">

                            {/* Rating + Reviews */}

                            <div className="flex items-center justify-between">

                                <div
                                    className={`flex items-center gap-2 text-sm ${
                                        isDark
                                            ? "text-zinc-300"
                                            : "text-zinc-700"
                                    }`}
                                >

                                    <Star
                                        size={16}
                                        className="fill-amber-400 text-amber-400"
                                    />

                                    {business.google_rating ??
                                        "N/A"}

                                </div>


                                <div
                                    className={`flex items-center gap-2 text-sm ${
                                        isDark
                                            ? "text-zinc-300"
                                            : "text-zinc-600"
                                    }`}
                                >

                                    <MessageSquare
                                        size={16}
                                        className={
                                            isDark
                                                ? "text-blue-400"
                                                : "text-blue-600"
                                        }
                                    />

                                    {business.review_count ??
                                        0}{" "}
                                    Reviews

                                </div>

                            </div>


                            {/* Address */}

                            <div
                                className={`flex items-start gap-2 text-sm ${
                                    isDark
                                        ? "text-zinc-400"
                                        : "text-zinc-500"
                                }`}
                            >

                                <MapPin
                                    size={16}
                                    className="mt-0.5 shrink-0 text-red-500"
                                />

                                <span className="line-clamp-2">
                                    {business.address ||
                                        "Address not available"}
                                </span>

                            </div>


                            {/* Phone */}

                            <div
                                className={`flex items-center gap-2 text-sm ${
                                    isDark
                                        ? "text-zinc-400"
                                        : "text-zinc-500"
                                }`}
                            >

                                <Phone
                                    size={16}
                                    className="text-emerald-500"
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
                                        `/app/business/${business.id}`
                                    )
                                }
                                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-150 ${
                                    isDark
                                        ? `
                                            border-zinc-700
                                            bg-zinc-800
                                            text-zinc-200
                                            hover:border-zinc-600
                                            hover:bg-zinc-700
                                            hover:text-white
                                        `
                                        : `
                                            border-[#dcdcdc]
                                            bg-white
                                            text-zinc-700
                                            hover:border-zinc-300
                                            hover:bg-zinc-50
                                            hover:text-zinc-900
                                        `
                                }`}
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
                                    text-red-500
                                    transition-all
                                    duration-150
                                    hover:border-red-500/30
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