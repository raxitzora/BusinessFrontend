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
    theme,
    onClick,
    onSave,
    saved = false,
    saving = false,
}) {
    const isDark = theme === "dark";

    return (
        <article
            className={`
                group
                relative
                flex
                min-h-[350px]
                w-full
                flex-col
                overflow-hidden
                rounded-[12px]
                border
                p-5
                text-left
                transition-all
                duration-300
                ease-out
                hover:-translate-y-[3px]
                ${
                    isDark
                        ? `
                            border-[#292929]
                            bg-[#101010]
                            hover:border-[#414141]
                            hover:bg-[#131313]
                            hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                        `
                        : `
                            border-[#dedede]
                            bg-white
                            hover:border-[#c9c9c9]
                            hover:bg-white
                            hover:shadow-[0_20px_45px_rgba(0,0,0,0.09)]
                        `
                }
            `}
        >
            {/* Top hover highlight */}

            <div
                className={`
                    pointer-events-none
                    absolute
                    left-5
                    right-5
                    top-0
                    h-px
                    transition-opacity
                    duration-300
                    ${
                        isDark
                            ? "bg-white/30"
                            : "bg-black/10"
                    }
                    opacity-0
                    group-hover:opacity-100
                `}
            />

            {/* =====================================================
                BUSINESS IDENTITY
            ===================================================== */}

            <div className="flex items-start justify-between gap-4">

                <div className="flex min-w-0 items-center gap-3">

                    {/* Business Icon */}

                    <div
                        className={`
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-[10px]
                            border
                            shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
                            transition-all
                            duration-300
                            ${
                                isDark
                                    ? `
                                        border-[#303030]
                                        bg-[#191919]
                                        group-hover:border-[#3d3d3d]
                                        group-hover:bg-[#1d1d1d]
                                    `
                                    : `
                                        border-[#e0e0e0]
                                        bg-[#f5f5f5]
                                        group-hover:border-[#d2d2d2]
                                        group-hover:bg-[#f0f0f0]
                                    `
                            }
                        `}
                    >
                        <Building2
                            size={18}
                            strokeWidth={1.7}
                            className={`
                                transition-colors
                                duration-300
                                ${
                                    isDark
                                        ? "text-[#999] group-hover:text-white"
                                        : "text-[#777] group-hover:text-[#222]"
                                }
                            `}
                        />
                    </div>

                    <div className="min-w-0">

                        <h2
                            className={`
                                truncate
                                text-[15px]
                                font-semibold
                                leading-5
                                tracking-[-0.025em]
                                transition-colors
                                duration-200
                                ${
                                    isDark
                                        ? "text-[#f5f5f5]"
                                        : "text-[#171717]"
                                }
                            `}
                        >
                            {business.business_name}
                        </h2>

                        <p
                            className={`
                                mt-1
                                truncate
                                text-[11px]
                                font-medium
                                transition-colors
                                duration-300
                                ${
                                    isDark
                                        ? "text-[#686868] group-hover:text-[#858585]"
                                        : "text-[#8a8a8a] group-hover:text-[#666]"
                                }
                            `}
                        >
                            {business.category || "Unknown Category"}
                        </p>

                    </div>

                </div>

                {/* Open */}

                <button
                    type="button"
                    onClick={() => onClick(business.id)}
                    className={`
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        border
                        transition-all
                        duration-200
                        active:scale-95
                        ${
                            isDark
                                ? `
                                    border-transparent
                                    text-[#666]
                                    hover:border-[#303030]
                                    hover:bg-[#1d1d1d]
                                    hover:text-white
                                `
                                : `
                                    border-transparent
                                    text-[#999]
                                    hover:border-[#e0e0e0]
                                    hover:bg-[#f2f2f2]
                                    hover:text-[#222]
                                `
                        }
                    `}
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
                className={`
                    mt-6
                    grid
                    grid-cols-2
                    overflow-hidden
                    rounded-[10px]
                    border
                    transition-colors
                    duration-200
                    ${
                        isDark
                            ? "border-[#292929] bg-[#0c0c0c]"
                            : "border-[#e0e0e0] bg-[#fafafa]"
                    }
                `}
            >

                {/* Rating */}

                <div
                    className={`
                        rounded-[10px]
                        border
                        px-4
                        py-3.5
                        transition-all
                        duration-200
                        ${
                            isDark
                                ? `
                                    border-amber-500/15
                                    bg-amber-500/[0.045]
                                    group-hover:border-amber-400/25
                                    group-hover:bg-amber-500/[0.07]
                                `
                                : `
                                    border-amber-200
                                    bg-amber-50/70
                                    group-hover:border-amber-300
                                    group-hover:bg-amber-50
                                `
                        }
                    `}
                >
                    <p
                        className={`
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            ${
                                isDark
                                    ? "text-amber-400/70"
                                    : "text-amber-600"
                            }
                        `}
                    >
                        Rating
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                        <Star
                            size={15}
                            strokeWidth={1.8}
                            className="fill-amber-400 text-amber-400"
                        />

                        <span
                            className={`
                                text-[18px]
                                font-semibold
                                tracking-[-0.03em]
                                ${
                                    isDark
                                        ? "text-amber-100"
                                        : "text-amber-700"
                                }
                            `}
                        >
                            {business.google_rating ?? "—"}
                        </span>
                    </div>
                </div>

                {/* Reviews */}

                <div
                    className={`
                        rounded-[10px]
                        border
                        px-4
                        py-3.5
                        transition-all
                        duration-200
                        ${
                            isDark
                                ? `
                                    border-blue-500/15
                                    bg-blue-500/[0.045]
                                    group-hover:border-blue-400/25
                                    group-hover:bg-blue-500/[0.07]
                                `
                                : `
                                    border-blue-200
                                    bg-blue-50/70
                                    group-hover:border-blue-300
                                    group-hover:bg-blue-50
                                `
                        }
                    `}
                >
                    <p
                        className={`
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            ${
                                isDark
                                    ? "text-blue-400/70"
                                    : "text-blue-600"
                            }
                        `}
                    >
                        Reviews
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                        <MessageSquare
                            size={14}
                            strokeWidth={1.8}
                            className={
                                isDark
                                    ? "text-blue-400"
                                    : "text-blue-500"
                            }
                        />

                        <span
                            className={`
                                text-[18px]
                                font-semibold
                                tracking-[-0.03em]
                                ${
                                    isDark
                                        ? "text-blue-100"
                                        : "text-blue-700"
                                }
                            `}
                        >
                            {business.review_count ?? 0}
                        </span>
                    </div>
                </div>

            </div>

            {/* =====================================================
                CONTACT
            ===================================================== */}

            <div
                className={`
                    flex
                    items-center
                    gap-2.5
                    rounded-[9px]
                    border
                    px-3.5
                    py-3
                    transition-all
                    duration-200
                    ${
                        isDark
                            ? `
                                border-cyan-500/15
                                bg-cyan-500/[0.035]
                                group-hover:border-cyan-400/25
                                group-hover:bg-cyan-500/[0.055]
                            `
                            : `
                                border-cyan-200
                                bg-cyan-50/60
                                group-hover:border-cyan-300
                                group-hover:bg-cyan-50
                            `
                    }
                `}
            >
                <div
                    className={`
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        border
                        ${
                            isDark
                                ? "border-cyan-500/15 bg-cyan-500/[0.08]"
                                : "border-cyan-200 bg-cyan-50"
                        }
                    `}
                >
                    <Phone
                        size={14}
                        strokeWidth={1.8}
                        className={
                            isDark
                                ? "text-cyan-400"
                                : "text-cyan-600"
                        }
                    />
                </div>

                <div className="min-w-0">
                    <p
                        className={`
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.08em]
                            ${
                                isDark
                                    ? "text-cyan-400/60"
                                    : "text-cyan-600/80"
                            }
                        `}
                    >
                        Contact
                    </p>

                    <p
                        className={`
                            mt-0.5
                            truncate
                            text-[12px]
                            font-medium
                            ${
                                isDark
                                    ? "text-cyan-50/85"
                                    : "text-cyan-900"
                            }
                        `}
                    >
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
                className={`
                    mt-3
                    rounded-[9px]
                    border
                    px-3.5
                    py-3
                    transition-all
                    duration-300
                    ${
                        isDark
                            ? `
                                border-indigo-500/15
                                bg-indigo-500/[0.035]
                                group-hover:border-indigo-400/25
                                group-hover:bg-indigo-500/[0.055]
                            `
                            : `
                                border-indigo-200
                                bg-indigo-50/60
                                group-hover:border-indigo-300
                                group-hover:bg-indigo-50
                            `
                    }
                `}
            >
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2.5">

                        <div
                            className={`
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-md
                                border
                                ${
                                    isDark
                                        ? "border-indigo-500/15 bg-indigo-500/[0.08]"
                                        : "border-indigo-200 bg-indigo-50"
                                }
                            `}
                        >
                            <Globe
                                size={14}
                                strokeWidth={1.7}
                                className={
                                    isDark
                                        ? "text-indigo-400"
                                        : "text-indigo-600"
                                }
                            />
                        </div>

                        <div>
                            <p
                                className={`
                                    text-[11px]
                                    font-medium
                                    ${
                                        isDark
                                            ? "text-indigo-100/90"
                                            : "text-indigo-900"
                                    }
                                `}
                            >
                                Website
                            </p>

                            <p
                                className={`
                                    mt-0.5
                                    text-[9px]
                                    ${
                                        isDark
                                            ? "text-indigo-300/45"
                                            : "text-indigo-600/60"
                                    }
                                `}
                            >
                                Digital presence
                            </p>
                        </div>

                    </div>

                    <WebsiteStatus
                        business={business}
                        theme={theme}
                    />

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
                    className={`
                        flex
                        h-10
                        items-center
                        justify-center
                        gap-2
                        rounded-[8px]
                        border
                        text-[12px]
                        font-medium
                        transition-all
                        duration-200
                        active:scale-[0.98]
                        ${
                            isDark
                                ? `
                                    border-[#303030]
                                    bg-[#181818]
                                    text-[#c5c5c5]
                                    hover:border-[#454545]
                                    hover:bg-[#202020]
                                    hover:text-white
                                `
                                : `
                                    border-[#d8d8d8]
                                    bg-white
                                    text-[#555]
                                    hover:border-[#bdbdbd]
                                    hover:bg-[#f4f4f4]
                                    hover:text-[#111]
                                `
                        }
                    `}
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
                                ? isDark
                                    ? `
                                        border
                                        border-emerald-500/25
                                        bg-emerald-500/[0.08]
                                        text-emerald-300
                                        hover:bg-emerald-500/[0.12]
                                    `
                                    : `
                                        border
                                        border-emerald-200
                                        bg-emerald-50
                                        text-emerald-700
                                        hover:bg-emerald-100
                                    `
                                : isDark
                                    ? `
                                        border
                                        border-white/90
                                        bg-white
                                        text-black
                                        hover:bg-[#e7e7e7]
                                    `
                                    : `
                                        border
                                        border-[#151515]
                                        bg-[#171717]
                                        text-white
                                        hover:bg-[#252525]
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
                            <Bookmark
                                size={14}
                                className={
                                    isDark
                                        ? "text-blue-400"
                                        : "text-blue-500"
                                }
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

function WebsiteStatus({
    business,
    theme,
}) {
    const isDark = theme === "dark";

    if (
        business.contactStatus === "pending" ||
        business.contactStatus === "checking"
    ) {
        return (
            <div
                className={`
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    px-2.5
                    py-1
                    text-[10px]
                    font-medium
                    ${
                        isDark
                            ? `
                                border-amber-500/20
                                bg-amber-500/[0.08]
                                text-amber-400
                            `
                            : `
                                border-amber-200
                                bg-amber-50
                                text-amber-600
                            `
                    }
                `}
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
                className={`
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    px-2.5
                    py-1
                    text-[10px]
                    font-medium
                    ${
                        isDark
                            ? `
                                border-red-500/20
                                bg-red-500/[0.08]
                                text-red-400
                            `
                            : `
                                border-red-200
                                bg-red-50
                                text-red-600
                            `
                    }
                `}
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
                className={`
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    px-2.5
                    py-1
                    text-[10px]
                    font-medium
                    ${
                        isDark
                            ? `
                                border-emerald-500/20
                                bg-emerald-500/[0.08]
                                text-emerald-400
                            `
                            : `
                                border-emerald-200
                                bg-emerald-50
                                text-emerald-600
                            `
                    }
                `}
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
            className={`
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                px-2.5
                py-1
                text-[10px]
                font-medium
                ${
                    isDark
                        ? `
                            border-red-500/20
                            bg-red-500/[0.08]
                            text-red-400
                        `
                        : `
                            border-red-200
                            bg-red-50
                            text-red-600
                        `
                }
            `}
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