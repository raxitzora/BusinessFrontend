import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-zinc-950 pt-32">

            {/* Background Grid */}

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.18]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage:
                        "linear-gradient(to bottom, black 0%, transparent 85%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, black 0%, transparent 85%)",
                }}
            />

            {/* Background Glow */}

            <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

                {/* Announcement */}

                <div className="flex justify-center">

                    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-400 backdrop-blur-sm">

                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />

                        <span>
                            AI-powered lead discovery
                        </span>

                        <ArrowRight
                            size={12}
                            className="text-zinc-500"
                        />

                    </div>

                </div>

                {/* Heading */}

                <div className="mx-auto mt-8 max-w-4xl text-center">

                    <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">

                        Find Businesses That{" "}

                        <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">

                            Need Your Services

                        </span>

                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">

                        Discover businesses, enrich contact information,
                        organize leads, and turn local businesses into
                        your next clients.

                    </p>

                </div>

                {/* CTA */}

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                    <Link
                        to="/sign-up"
                        className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-zinc-950 transition-all duration-200 hover:bg-zinc-200"
                    >

                        Start Free

                        <ArrowRight
                            size={16}
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />

                    </Link>

                    <button
                        type="button"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                    >

                        <Play
                            size={15}
                            fill="currentColor"
                        />

                        Watch Demo

                    </button>

                </div>

                {/* Product Preview */}

                <div className="relative mx-auto mt-16 max-w-6xl">

                    {/* Glow */}

                    <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-violet-500/5 blur-2xl" />

                    {/* Browser Window */}

                    <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/50">

                        {/* Browser Header */}

                        <div className="flex h-10 items-center border-b border-zinc-800 bg-zinc-900 px-4">

                            <div className="flex gap-1.5">

                                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />

                            </div>

                            <div className="mx-auto hidden h-5 w-64 rounded-md border border-zinc-800 bg-zinc-950 sm:block" />

                        </div>

                        {/* Dashboard Preview */}

                        <div className="grid min-h-[320px] grid-cols-[150px_1fr] bg-zinc-950 sm:grid-cols-[190px_1fr]">

                            {/* Sidebar */}

                            <div className="border-r border-zinc-800 p-4">

                                <div className="mb-6 h-5 w-24 rounded bg-zinc-800" />

                                <div className="space-y-2">

                                    <div className="h-8 rounded-md bg-violet-600/20" />
                                    <div className="h-8 rounded-md bg-zinc-900" />
                                    <div className="h-8 rounded-md bg-zinc-900" />
                                    <div className="h-8 rounded-md bg-zinc-900" />
                                    <div className="h-8 rounded-md bg-zinc-900" />

                                </div>

                            </div>

                            {/* Content */}

                            <div className="p-5 sm:p-7">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <div className="h-5 w-36 rounded bg-zinc-700" />

                                        <div className="mt-2 h-3 w-48 rounded bg-zinc-800" />

                                    </div>

                                    <div className="h-8 w-24 rounded-md bg-violet-600/80" />

                                </div>

                                {/* Stats */}

                                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

                                    {[
                                        "Businesses Found",
                                        "Enriched",
                                        "Saved Leads",
                                        "Searches",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"
                                        >

                                            <div className="text-[10px] text-zinc-500">
                                                {item}
                                            </div>

                                            <div className="mt-2 h-5 w-16 rounded bg-zinc-700" />

                                        </div>
                                    ))}

                                </div>

                                {/* Search */}

                                <div className="mt-5 flex h-9 items-center rounded-md border border-zinc-800 bg-zinc-900 px-3">

                                    <div className="h-2.5 w-32 rounded bg-zinc-700" />

                                </div>

                                {/* Table */}

                                <div className="mt-3 overflow-hidden rounded-lg border border-zinc-800">

                                    {[1, 2, 3, 4].map((row) => (
                                        <div
                                            key={row}
                                            className="grid grid-cols-4 items-center gap-3 border-b border-zinc-800 px-3 py-3 last:border-0"
                                        >

                                            <div className="h-3 w-20 rounded bg-zinc-700" />
                                            <div className="hidden h-3 w-16 rounded bg-zinc-800 sm:block" />
                                            <div className="h-3 w-12 rounded bg-zinc-800" />
                                            <div className="ml-auto h-5 w-12 rounded bg-violet-600/20" />

                                        </div>
                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default HeroSection;