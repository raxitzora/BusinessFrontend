import {
    Search,
    MapPin,
    Star,
    Globe,
    Phone,
    Bookmark,
    ArrowUpRight,
    CheckCircle2,
} from "lucide-react";

const businesses = [
    {
        name: "The Urban Kitchen",
        category: "Restaurant",
        location: "Rajkot, Gujarat",
        rating: "4.7",
        reviews: "328",
        website: true,
        phone: true,
    },
    {
        name: "PixelCraft Studio",
        category: "Design Studio",
        location: "Ahmedabad, Gujarat",
        rating: "4.6",
        reviews: "184",
        website: true,
        phone: true,
    },
    {
        name: "Bright Dental Care",
        category: "Dental Clinic",
        location: "Mumbai, Maharashtra",
        rating: "4.8",
        reviews: "412",
        website: true,
        phone: false,
    },
];

function ProductShowcaseSection() {
    return (
        <section
            id="product"
            className="relative overflow-hidden border-t border-zinc-900 bg-zinc-950 py-24 sm:py-32"
        >
            {/* Background Glow */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.04] blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Heading */}

                <div className="mx-auto max-w-2xl text-center">

                    <p className="text-sm font-medium text-violet-400">
                        See it in action
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                        From search to lead in seconds
                    </h2>

                    <p className="mt-4 text-base leading-7 text-zinc-400">
                        Search for businesses by service and location,
                        discover relevant prospects, and organize the ones
                        worth pursuing.
                    </p>

                </div>

                {/* Product Window */}

                <div className="relative mx-auto mt-14 max-w-6xl">

                    {/* Outer Glow */}

                    <div className="pointer-events-none absolute -inset-5 rounded-[28px] bg-violet-500/[0.05] blur-2xl" />

                    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50">

                        {/* Browser Header */}

                        <div className="flex h-12 items-center border-b border-zinc-800 bg-zinc-900/80 px-4">

                            <div className="flex gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                            </div>

                            <div className="mx-auto hidden items-center rounded-md border border-zinc-800 bg-zinc-950 px-4 py-1 text-[10px] text-zinc-600 sm:flex">
                                app.leadflow.ai/search
                            </div>

                            <div className="w-10" />

                        </div>

                        {/* Application */}

                        <div className="grid min-h-[560px] md:grid-cols-[190px_1fr]">

                            {/* Sidebar */}

                            <aside className="hidden border-r border-zinc-800 bg-zinc-950 p-4 md:block">

                                <div className="mb-8 flex items-center gap-2 px-2">

                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold text-zinc-950">
                                        L
                                    </div>

                                    <span className="text-sm font-semibold text-white">
                                        LeadFlow
                                    </span>

                                </div>

                                <div className="space-y-1">

                                    <div className="rounded-lg bg-violet-600/15 px-3 py-2.5 text-xs font-medium text-violet-300">
                                        Search Businesses
                                    </div>

                                    <div className="rounded-lg px-3 py-2.5 text-xs text-zinc-500">
                                        Dashboard
                                    </div>

                                    <div className="rounded-lg px-3 py-2.5 text-xs text-zinc-500">
                                        Saved Leads
                                    </div>

                                    <div className="rounded-lg px-3 py-2.5 text-xs text-zinc-500">
                                        Search History
                                    </div>

                                    <div className="rounded-lg px-3 py-2.5 text-xs text-zinc-500">
                                        Services
                                    </div>

                                </div>

                            </aside>

                            {/* Main Content */}

                            <main className="min-w-0 bg-zinc-950 p-5 sm:p-7">

                                {/* Header */}

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                    <div>

                                        <h3 className="text-lg font-semibold text-white">
                                            Search Businesses
                                        </h3>

                                        <p className="mt-1 text-xs text-zinc-500">
                                            Discover businesses that may need your services.
                                        </p>

                                    </div>

                                    <div className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-xs text-violet-300">
                                        50 credits remaining
                                    </div>

                                </div>

                                {/* Search Form */}

                                <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">

                                    <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">

                                        <div className="flex h-10 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3">

                                            <Search
                                                size={15}
                                                className="text-zinc-600"
                                            />

                                            <span className="text-xs text-zinc-400">
                                                Restaurant
                                            </span>

                                        </div>

                                        <div className="flex h-10 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3">

                                            <MapPin
                                                size={15}
                                                className="text-zinc-600"
                                            />

                                            <span className="text-xs text-zinc-400">
                                                Rajkot, Gujarat
                                            </span>

                                        </div>

                                        <button
                                            type="button"
                                            className="h-10 rounded-lg bg-white px-5 text-xs font-semibold text-zinc-950"
                                        >
                                            Search
                                        </button>

                                    </div>

                                </div>

                                {/* Results Header */}

                                <div className="mt-6 flex items-center justify-between">

                                    <div>

                                        <p className="text-sm font-medium text-white">
                                            Search Results
                                        </p>

                                        <p className="mt-1 text-[11px] text-zinc-600">
                                            24 businesses found
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        className="hidden rounded-md border border-zinc-800 px-3 py-1.5 text-[11px] text-zinc-500 sm:block"
                                    >
                                        Sort by Rating
                                    </button>

                                </div>

                                {/* Business Cards */}

                                <div className="mt-3 space-y-2">

                                    {businesses.map((business) => (
                                        <div
                                            key={business.name}
                                            className="group rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700"
                                        >

                                            <div className="flex items-start justify-between gap-4">

                                                <div className="min-w-0">

                                                    <div className="flex items-center gap-2">

                                                        <h4 className="truncate text-sm font-medium text-white">
                                                            {business.name}
                                                        </h4>

                                                        <ArrowUpRight
                                                            size={13}
                                                            className="shrink-0 text-zinc-700"
                                                        />

                                                    </div>

                                                    <p className="mt-1 text-[11px] text-zinc-500">
                                                        {business.category}
                                                    </p>

                                                    <div className="mt-2 flex items-center gap-3 text-[10px] text-zinc-600">

                                                        <span className="flex items-center gap-1">
                                                            <MapPin size={11} />
                                                            {business.location}
                                                        </span>

                                                        <span className="flex items-center gap-1 text-amber-400">
                                                            <Star
                                                                size={11}
                                                                fill="currentColor"
                                                            />
                                                            {business.rating}
                                                        </span>

                                                        <span>
                                                            {business.reviews} reviews
                                                        </span>

                                                    </div>

                                                </div>

                                                <button
                                                    type="button"
                                                    className="shrink-0 rounded-lg border border-zinc-800 p-2 text-zinc-600 transition-colors hover:border-zinc-700 hover:text-white"
                                                    aria-label={`Save ${business.name}`}
                                                >
                                                    <Bookmark size={14} />
                                                </button>

                                            </div>

                                            <div className="mt-3 flex flex-wrap items-center gap-2">

                                                {business.website && (
                                                    <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/10 bg-emerald-500/5 px-2 py-1 text-[9px] text-emerald-400">
                                                        <Globe size={10} />
                                                        Website
                                                    </span>
                                                )}

                                                {business.phone && (
                                                    <span className="inline-flex items-center gap-1 rounded-md border border-blue-500/10 bg-blue-500/5 px-2 py-1 text-[9px] text-blue-400">
                                                        <Phone size={10} />
                                                        Phone
                                                    </span>
                                                )}

                                                <span className="ml-auto inline-flex items-center gap-1 text-[9px] text-zinc-600">
                                                    <CheckCircle2 size={10} />
                                                    Verified
                                                </span>

                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </main>

                        </div>

                    </div>

                </div>

                {/* Bottom Value Points */}

                <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">

                    <div className="text-center">

                        <p className="text-sm font-medium text-white">
                            Search by intent
                        </p>

                        <p className="mt-1 text-xs leading-5 text-zinc-600">
                            Find businesses based on the services you offer.
                        </p>

                    </div>

                    <div className="text-center">

                        <p className="text-sm font-medium text-white">
                            Enrich your leads
                        </p>

                        <p className="mt-1 text-xs leading-5 text-zinc-600">
                            Turn basic business data into useful prospects.
                        </p>

                    </div>

                    <div className="text-center">

                        <p className="text-sm font-medium text-white">
                            Keep everything organized
                        </p>

                        <p className="mt-1 text-xs leading-5 text-zinc-600">
                            Save promising businesses for your outreach workflow.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default ProductShowcaseSection;