import {
    ArrowRight,
    Globe,
    Star,
    MessageSquare,
    Building2,
    Phone,
    LoaderCircle,
    CheckCircle2,
    XCircle,
    Eye,
    Bookmark,
    Check,
} from "lucide-react";

function BusinessCard({
    business,
    onClick,
    onSave,
    saved = false,
    saving = false,
}) {

    return (
        <div
            className="
                group
                w-full
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                p-6
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-violet-500
                hover:bg-zinc-900/90
            "
        >

            {/* =========================================================
                HEADER
            ========================================================= */}

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
                        {business.category || "Unknown Category"}
                    </p>

                </div>


                <ArrowRight
                    className="
                        shrink-0
                        text-zinc-600
                        transition-all
                        group-hover:translate-x-1
                        group-hover:text-violet-400
                    "
                    size={20}
                />

            </div>


            {/* =========================================================
                BUSINESS INFORMATION
            ========================================================= */}

            <div className="mt-5 space-y-3">

                {/* Rating + Reviews */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-sm text-zinc-300">

                        <Star
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                        />

                        <span>
                            {business.google_rating ?? "N/A"}
                        </span>

                    </div>


                    <div className="flex items-center gap-2 text-sm text-zinc-300">

                        <MessageSquare size={16} />

                        <span>
                            {business.review_count ?? 0} Reviews
                        </span>

                    </div>

                </div>


                {/* Phone */}

                <div className="flex items-center gap-2 text-sm text-zinc-400">

                    <Phone
                        size={16}
                        className="shrink-0 text-violet-400"
                    />

                    <span className="truncate">

                        {business.phone
                            ? business.phone
                            : business.contactStatus === "checking" ||
                              business.contactStatus === "pending"
                                ? "Checking..."
                                : "Not available"
                        }

                    </span>

                </div>


                {/* =====================================================
                    WEBSITE STATUS
                ===================================================== */}

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">

                            <Globe
                                size={18}
                                className="text-violet-400"
                            />

                            <div>

                                <p className="text-sm font-medium text-white">
                                    Website
                                </p>

                                <p className="text-xs text-zinc-500">
                                    Background Verification
                                </p>

                            </div>

                        </div>


                        <WebsiteStatus
                            business={business}
                        />

                    </div>

                </div>

            </div>


            {/* =========================================================
                ACTION BUTTONS
            ========================================================= */}

            <div className="mt-5 grid grid-cols-2 gap-3">

                {/* View Details */}

                <button
                    type="button"
                    onClick={() => onClick(business.id)}
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
                        duration-200
                        hover:border-violet-500
                        hover:bg-violet-500/10
                        hover:text-white
                    "
                >

                    <Eye size={16} />

                    <span>
                        View Details
                    </span>

                </button>


                {/* Save Lead */}

                <button
                    type="button"
                    disabled={saving}
                    onClick={() => onSave(business.id)}
                    className={`
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        font-medium
                        transition-all
                        duration-200

                        ${
                            saved
                                ? `
                                    cursor-default
                                    border
                                    border-green-500/20
                                    bg-green-500/10
                                    text-green-400
                                `
                                : `
                                    bg-violet-600
                                    text-white
                                    hover:bg-violet-500
                                `
                        }

                        ${
                            saving
                                ? "cursor-wait opacity-70"
                                : ""
                        }
                    `}
                >

                    {saving ? (

                        <>
                            <LoaderCircle
                                size={16}
                                className="animate-spin"
                            />

                            <span>
                                Saving...
                            </span>
                        </>

                    ) : saved ? (

                        <>
                            <Check size={16} />

                            <span>
                                Saved
                            </span>
                        </>

                    ) : (

                        <>
                            <Bookmark size={16} />

                            <span>
                                Save Lead
                            </span>
                        </>

                    )}

                </button>

            </div>

        </div>
    );
}


/* ============================================================
   WEBSITE STATUS
============================================================ */

function WebsiteStatus({ business }) {

    if (
        business.contactStatus === "pending" ||
        business.contactStatus === "checking"
    ) {

        return (

            <div className="flex items-center gap-2 text-yellow-400">

                <LoaderCircle
                    size={16}
                    className="animate-spin"
                />

                <span className="text-sm">
                    Checking...
                </span>

            </div>

        );

    }


    if (business.contactStatus === "failed") {

        return (

            <div className="flex items-center gap-2 text-red-400">

                <XCircle size={16} />

                <span className="text-sm">
                    Failed
                </span>

            </div>

        );

    }


    if (business.website) {

        return (

            <div className="flex items-center gap-2 text-green-400">

                <CheckCircle2 size={16} />

                <span className="text-sm">
                    Available
                </span>

            </div>

        );

    }


    return (

        <div className="flex items-center gap-2 text-zinc-500">

            <XCircle size={16} />

            <span className="text-sm">
                No Website
            </span>

        </div>

    );

}


export default BusinessCard;