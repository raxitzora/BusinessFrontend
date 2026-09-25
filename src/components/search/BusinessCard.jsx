import {
    ArrowUpRight,
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
        <article
            className="
                group
                relative
                flex
                min-h-[350px]
                w-full
                flex-col
                overflow-hidden
                rounded-[12px]
                border
                border-[#292929]
                bg-[#101010]
                p-5
                text-left
                transition-all
                duration-300
                ease-out
                hover:-translate-y-[3px]
                hover:border-[#414141]
                hover:bg-[#131313]
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            "
        >

            {/* Top hover highlight */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-5
                    right-5
                    top-0
                    h-px
                    bg-white/30
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                "
            />


            {/* =====================================================
                BUSINESS IDENTITY
            ===================================================== */}

            <div className="flex items-start justify-between gap-4">

                <div className="flex min-w-0 items-center gap-3">

                    {/* Business Icon */}

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-[10px]
                            border
                            border-[#303030]
                            bg-[#191919]
                            shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
                            transition-all
                            duration-300
                            group-hover:border-[#3d3d3d]
                            group-hover:bg-[#1d1d1d]
                        "
                    >
                        <Building2
                            size={18}
                            strokeWidth={1.7}
                            className="
                                text-[#999]
                                transition-colors
                                duration-300
                                group-hover:text-white
                            "
                        />
                    </div>

                    <div className="min-w-0">

                        <h2
                            className="
                                truncate
                                text-[15px]
                                font-semibold
                                leading-5
                                tracking-[-0.025em]
                                text-[#f5f5f5]
                            "
                        >
                            {business.business_name}
                        </h2>

                        <p
                            className="
                                mt-1
                                truncate
                                text-[11px]
                                font-medium
                                text-[#686868]
                                transition-colors
                                duration-300
                                group-hover:text-[#858585]
                            "
                        >
                            {business.category || "Unknown Category"}
                        </p>

                    </div>

                </div>


                {/* Open */}

                <button
                    type="button"
                    onClick={() => onClick(business.id)}
                    className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-transparent
                        text-[#666]
                        transition-all
                        duration-200
                        hover:border-[#303030]
                        hover:bg-[#1d1d1d]
                        hover:text-white
                        active:scale-95
                    "
                    title="View business"
                >
                    <ArrowUpRight
                        size={17}
                        strokeWidth={1.8}
                    />
                </button>

            </div>


            {/* =====================================================
                KEY METRICS
            ===================================================== */}

            <div
                className="
                    mt-6
                    grid
                    grid-cols-2
                    overflow-hidden
                    rounded-[10px]
                    border
                    border-[#292929]
                    bg-[#0c0c0c]
                "
            >

                {/* Rating */}

             <div
    className="
        rounded-[10px]
        border border-amber-500/15
        bg-amber-500/[0.045]
        px-4 py-3.5
        transition-all duration-200
        group-hover:border-amber-400/25
        group-hover:bg-amber-500/[0.07]
    "
>
    <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-amber-400/70">
        Rating
    </p>

    <div className="mt-2 flex items-center gap-2">
        <Star
            size={15}
            strokeWidth={1.8}
            className="fill-amber-400 text-amber-400"
        />

        <span className="text-[18px] font-semibold tracking-[-0.03em] text-amber-100">
            {business.google_rating ?? "—"}
        </span>
    </div>
</div>


                {/* Reviews */}

                <div
    className="
        rounded-[10px]
        border border-blue-500/15
        bg-blue-500/[0.045]
        px-4 py-3.5
        transition-all duration-200
        group-hover:border-blue-400/25
        group-hover:bg-blue-500/[0.07]
    "
>
    <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-blue-400/70">
        Reviews
    </p>

    <div className="mt-2 flex items-center gap-2">
        <MessageSquare
            size={14}
            strokeWidth={1.8}
            className="text-blue-400"
        />

        <span className="text-[18px] font-semibold tracking-[-0.03em] text-blue-100">
            {business.review_count ?? 0}
        </span>
    </div>
</div>

            </div>


            {/* =====================================================
                CONTACT
            ===================================================== */}

            <div
    className="
        flex items-center gap-2.5
        rounded-[9px]
        border border-cyan-500/15
        bg-cyan-500/[0.035]
        px-3.5 py-3
        transition-all duration-200
        group-hover:border-cyan-400/25
        group-hover:bg-cyan-500/[0.055]
    "
>
    <div className="
        flex h-7 w-7 shrink-0 items-center justify-center
        rounded-md
        border border-cyan-500/15
        bg-cyan-500/[0.08]
    ">
        <Phone
            size={14}
            strokeWidth={1.8}
            className="text-cyan-400"
        />
    </div>

    <div className="min-w-0">
        <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-cyan-400/60">
            Contact
        </p>

        <p className="mt-0.5 truncate text-[12px] font-medium text-cyan-50/85">
            {business.phone
                ? business.phone
                : business.contactStatus === "checking" ||
                  business.contactStatus === "pending"
                    ? "Checking contact details..."
                    : "No contact available"}
        </p>
    </div>
</div>


            {/* =====================================================
                WEBSITE INTELLIGENCE
            ===================================================== */}

           <div
    className="
        mt-3
        rounded-[9px]
        border border-indigo-500/15
        bg-indigo-500/[0.035]
        px-3.5 py-3
        transition-all duration-300
        group-hover:border-indigo-400/25
        group-hover:bg-indigo-500/[0.055]
    "
>
    <div className="flex items-center justify-between">

        <div className="flex items-center gap-2.5">

            <div
                className="
                    flex h-7 w-7 items-center justify-center
                    rounded-md
                    border border-indigo-500/15
                    bg-indigo-500/[0.08]
                "
            >
                <Globe
                    size={14}
                    strokeWidth={1.7}
                    className="text-indigo-400"
                />
            </div>

            <div>
                <p className="text-[11px] font-medium text-indigo-100/90">
                    Website
                </p>

                <p className="mt-0.5 text-[9px] text-indigo-300/45">
                    Digital presence
                </p>
            </div>

        </div>

        <WebsiteStatus business={business} />

    </div>
</div>


            {/* =====================================================
                ACTIONS
            ===================================================== */}

            <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">

                {/* View */}

                <button
                    type="button"
                    onClick={() => onClick(business.id)}
                    className="
                        flex
                        h-10
                        items-center
                        justify-center
                        gap-2
                        rounded-[8px]
                        border
                        border-[#303030]
                        bg-[#181818]
                        text-[12px]
                        font-medium
                        text-[#c5c5c5]
                        transition-all
                        duration-200
                        hover:border-[#454545]
                        hover:bg-[#202020]
                        hover:text-white
                        active:scale-[0.98]
                    "
                >

                    <Eye
                        size={14}
                        strokeWidth={1.8}
                    />

                    View Details

                </button>


                {/* Save */}

                <button
                    type="button"
                    disabled={saving}
                    onClick={() => onSave(business.id)}
                    className={`
                        flex
                        h-10
                        items-center
                        justify-center
                        gap-2
                        rounded-[8px]
                        text-[12px]
                        font-medium
                        transition-all
                        duration-200
                        active:scale-[0.98]

                        ${
                            saved
                                ? `
                                   border border-emerald-500/25
bg-emerald-500/[0.08]
text-emerald-300
hover:bg-emerald-500/[0.12]
                                `
                                : `
                                    border border-white/90
bg-white
text-black
hover:bg-[#e7e7e7]
                                `
                        }

                        ${
                            saving
                                ? "cursor-wait opacity-60"
                                : ""
                        }
                    `}
                >

                    {saving ? (
                        <>
                            <LoaderCircle
                                size={14}
                                className="animate-spin"
                            />
                            Saving...
                        </>
                    ) : saved ? (
                        <>
                            <Check size={14} />
                            Saved
                        </>
                    ) : (
                        <>
                            <Bookmark size={14} 
                                className="text-blue-400"
/>
                            Save Lead
                        </>
                    )}

                </button>

            </div>

        </article>
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
            <div
                className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border border-amber-500/20
                    bg-amber-500/[0.08]
                    px-2.5
                    py-1
                    text-[10px]
                    font-medium
                    text-amber-400
                "
            >
                <LoaderCircle
                    size={12}
                    strokeWidth={1.9}
                    className="animate-spin"
                />

                Checking
            </div>
        );
    }

    if (business.contactStatus === "failed") {
        return (
            <div
                className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border border-red-500/20
                    bg-red-500/[0.08]
                    px-2.5
                    py-1
                    text-[10px]
                    font-medium
                    text-red-400
                "
            >
                <XCircle
                    size={12}
                    strokeWidth={1.9}
                />

                Failed
            </div>
        );
    }

    if (business.website) {
        return (
            <div
                className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border border-emerald-500/20
                    bg-emerald-500/[0.08]
                    px-2.5
                    py-1
                    text-[10px]
                    font-medium
                    text-emerald-400
                "
            >
                <CheckCircle2
                    size={12}
                    strokeWidth={1.9}
                />

                Available
            </div>
        );
    }

    return (
        <div
            className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border border-red-500/20
                bg-red-500/[0.08]
                px-2.5
                py-1
                text-[10px]
                font-medium
                text-red-400
            "
        >
            <XCircle
                size={12}
                strokeWidth={1.9}
            />

            No website
        </div>
    );
}

export default BusinessCard;