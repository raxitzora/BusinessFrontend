import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
    {
        name: "Free",
        description: "Explore LeadFlow and start discovering businesses.",
        price: "₹0",
        period: "forever",
        features: [
            "Business discovery",
            "Limited searches",
            "Save leads",
            "Basic business information",
        ],
        button: "Start Free",
        highlighted: false,
    },
    {
        name: "Pro",
        description: "For freelancers and professionals generating leads regularly.",
        price: "₹499",
        period: "per month",
        features: [
            "Everything in Free",
            "More searches",
            "More saved leads",
            "Contact enrichment",
            "Email discovery",
            "Social profile discovery",
        ],
        button: "Get Pro",
        highlighted: true,
    },
    {
        name: "Agency",
        description: "For agencies running lead generation at a larger scale.",
        price: "₹1,499",
        period: "per month",
        features: [
            "Everything in Pro",
            "Higher search limits",
            "Higher enrichment limits",
            "More lead capacity",
            "Lead export",
            "Priority access to new features",
        ],
        button: "Get Agency",
        highlighted: false,
    },
];

function PricingSection() {
    return (
        <section
            id="pricing"
            className="relative overflow-hidden border-t border-zinc-900 bg-zinc-950 py-24 sm:py-32"
        >
            {/* Background Glow */}

            <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/[0.05] blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}

                <div className="mx-auto max-w-2xl text-center">

                    <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-400">

                        <Sparkles
                            size={13}
                            className="text-violet-400"
                        />

                        Simple pricing

                    </div>

                    <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                        Start free. Scale when you need to.
                    </h2>

                    <p className="mt-4 text-base leading-7 text-zinc-400">
                        Choose the plan that fits your lead generation workflow.
                        Upgrade as your prospecting needs grow.
                    </p>

                </div>

                {/* Pricing Cards */}

                <div className="mx-auto mt-14 grid max-w-6xl gap-5 lg:grid-cols-3">

                    {plans.map((plan) => (
                        <article
                            key={plan.name}
                            className={`relative flex flex-col rounded-2xl border p-6 ${
                                plan.highlighted
                                    ? "border-violet-500/50 bg-violet-500/[0.06] shadow-xl shadow-violet-950/20"
                                    : "border-zinc-800 bg-zinc-900/30"
                            }`}
                        >

                            {/* Recommended */}

                            {plan.highlighted && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-violet-500/30 bg-zinc-950 px-3 py-1 text-[10px] font-medium text-violet-300">
                                    Most Popular
                                </div>
                            )}

                            {/* Plan */}

                            <div>

                                <h3 className="text-lg font-semibold text-white">
                                    {plan.name}
                                </h3>

                                <p className="mt-2 min-h-10 text-sm leading-5 text-zinc-500">
                                    {plan.description}
                                </p>

                            </div>

                            {/* Price */}

                            <div className="mt-7">

                                <div className="flex items-end gap-2">

                                    <span className="text-4xl font-semibold tracking-tight text-white">
                                        {plan.price}
                                    </span>

                                    <span className="pb-1 text-xs text-zinc-500">
                                        {plan.period}
                                    </span>

                                </div>

                            </div>

                            {/* CTA */}

                            <Link
                                to="/sign-up"
                                className={`mt-7 flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all ${
                                    plan.highlighted
                                        ? "bg-white text-zinc-950 hover:bg-zinc-200"
                                        : "border border-zinc-700 bg-zinc-900 text-white hover:border-zinc-600 hover:bg-zinc-800"
                                }`}
                            >

                                {plan.button}

                                <ArrowRight size={15} />

                            </Link>

                            {/* Divider */}

                            <div className="my-7 h-px bg-zinc-800" />

                            {/* Features */}

                            <div className="flex-1">

                                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-zinc-600">
                                    Includes
                                </p>

                                <ul className="space-y-3">

                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3 text-sm text-zinc-400"
                                        >

                                            <Check
                                                size={16}
                                                className="mt-0.5 shrink-0 text-violet-400"
                                            />

                                            <span>
                                                {feature}
                                            </span>

                                        </li>
                                    ))}

                                </ul>

                            </div>

                        </article>
                    ))}

                </div>

                {/* Bottom Note */}

                <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-5 text-zinc-600">
                    All plans are designed to evolve as LeadFlow adds new
                    lead intelligence and AI-powered capabilities.
                </p>

            </div>
        </section>
    );
}

export default PricingSection;