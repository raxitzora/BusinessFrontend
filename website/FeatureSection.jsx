import {
    MapPinned,
    Sparkles,
    Mail,
    Share2,
    Bookmark,
    Download,
    ArrowUpRight,
} from "lucide-react";

const features = [
    {
        icon: MapPinned,
        title: "Google Maps Discovery",
        description:
            "Find relevant businesses by searching keywords and locations.",
    },
    {
        icon: Sparkles,
        title: "Business Enrichment",
        description:
            "Enrich discovered businesses with useful contact information.",
    },
    {
        icon: Mail,
        title: "Email Discovery",
        description:
            "Find available business emails so you can reach the right prospects.",
    },
    {
        icon: Share2,
        title: "Social Profiles",
        description:
            "Discover available Instagram, Facebook, and LinkedIn profiles.",
    },
    {
        icon: Bookmark,
        title: "Lead Management",
        description:
            "Save promising businesses and keep your prospects organized.",
    },
    {
        icon: Download,
        title: "Export Leads",
        description:
            "Export your discovered leads and use them in your existing workflow.",
    },
];

function FeatureSection() {
    return (
        <section
            id="features"
            className="relative overflow-hidden border-t border-zinc-900 bg-zinc-950 py-24 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}

                <div className="mx-auto max-w-2xl text-center">

                    <p className="text-sm font-medium text-violet-400">
                        Built for lead generation
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                        Everything you need to find better leads
                    </h2>

                    <p className="mt-4 text-base leading-7 text-zinc-400">
                        Discover businesses, enrich their information, and
                        organize your prospects without jumping between
                        countless tools.
                    </p>

                </div>

                {/* Feature Grid */}

                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (
                            <article
                                key={feature.title}
                                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/70"
                            >

                                {/* Subtle Hover Glow */}

                                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-violet-500/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Icon */}

                                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-violet-400 transition-colors duration-300 group-hover:border-violet-500/30 group-hover:bg-violet-500/10">

                                    <Icon size={19} />

                                </div>

                                {/* Content */}

                                <div className="relative mt-6">

                                    <div className="flex items-start justify-between gap-4">

                                        <h3 className="text-base font-semibold text-white">
                                            {feature.title}
                                        </h3>

                                        <ArrowUpRight
                                            size={16}
                                            className="shrink-0 text-zinc-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-400"
                                        />

                                    </div>

                                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                                        {feature.description}
                                    </p>

                                </div>

                            </article>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}

export default FeatureSection;