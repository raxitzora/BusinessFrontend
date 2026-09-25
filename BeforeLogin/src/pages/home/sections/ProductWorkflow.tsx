import { useEffect, useState } from "react";

const steps = [
    {
        id: "discover",
        title: "Discover businesses",
        description:
            "Search any market by keyword and location. LeadFlow finds businesses that could become your next clients.",
    },
    {
        id: "analyze",
        title: "Analyze websites",
        description:
            "Automatically inspect websites for performance, responsiveness, technology, broken links, and other opportunities.",
    },
    {
        id: "opportunities",
        title: "Find opportunities",
        description:
            "Turn raw business data into actionable opportunities by identifying businesses that need better websites or digital marketing.",
    },
    {
        id: "enrich",
        title: "Enrich leads",
        description:
            "Collect additional business information so you can understand who the business is and how to approach them.",
    },
    {
        id: "pipeline",
        title: "Build your pipeline",
        description:
            "Save the businesses worth pursuing and turn your research into an organized prospecting workflow.",
    },
];

function ProductWorkflow() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const sections = document.querySelectorAll(
            "[data-workflow-section]"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visible.length > 0) {
                    const index = Number(
                        visible[0].target.getAttribute(
                            "data-workflow-index"
                        )
                    );

                    setActiveStep(index);
                }
            },
            {
                rootMargin: "-35% 0px -35% 0px",
                threshold: [0.1, 0.25, 0.5, 0.75],
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="border-t border-zinc-200 bg-white">
            {/* Intro */}
     <div className="mx-auto flex max-w-[1440px] flex-col items-center px-6 py-20 text-center sm:px-10 sm:py-24 lg:px-16">
    <div className="mb-4 text-sm font-bold tracking-[-0.01em] text-blue-600">
        Platform
    </div>

    <h2 className="max-w-2xl text-2xl font-bold leading-[1.1] tracking-[-0.04em] text-zinc-950 sm:text-3xl lg:text-4xl">
        The intelligent system for finding your next business opportunity.
    </h2>

    <p className="mt-4 max-w-xl text-base font-bold leading-6 tracking-[-0.02em] text-zinc-400 sm:text-lg">
        Discover businesses. Analyze their digital presence. Find the opportunities worth pursuing.
    </p>
</div>

            {/* Workflow */}
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 border-t border-zinc-200 lg:grid-cols-[365px_minmax(0,1fr)]">

                {/* Sticky navigation */}
                <div className="border-b border-zinc-200 lg:border-b-0 lg:border-r">
                    <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
                        <div className="w-full px-6 py-12 sm:px-10 lg:px-14">

                            <div className="space-y-1">
                                {steps.map((step, index) => {
                                    const active =
                                        activeStep === index;

                                    return (
                                        <div
                                            key={step.id}
                                            className={`relative border-l-2 py-2.5 pl-5 transition-all duration-300 ${
                                                active
                                                    ? "border-blue-500"
                                                    : "border-transparent"
                                            }`}
                                        >
                                            <span
                                                className={`text-base font-semibold tracking-[-0.02em] transition-colors duration-300 ${
                                                    active
                                                        ? "text-zinc-950"
                                                        : "text-zinc-300"
                                                }`}
                                            >
                                                {step.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right scrolling content */}
                <div>
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            data-workflow-section
                            data-workflow-index={index}
                            className="flex min-h-[80vh] items-center border-b border-zinc-200 px-6 py-20 sm:px-10 lg:min-h-screen lg:px-16"
                        >
                            <div className="w-full">

                                <div className="mb-8 max-w-2xl">
                                    <h3 className="text-2xl font-bold tracking-[-0.03em] text-zinc-950 sm:text-3xl">
                                        {step.title}
                                    </h3>

                                    <p className="mt-4 text-base font-medium leading-7 text-zinc-500 sm:text-lg">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Product visual */}
                                <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm">

                                    <div className="absolute inset-x-0 top-0 flex h-12 items-center border-b border-zinc-200 bg-white px-5">
                                        <div className="flex gap-1.5">
                                            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                                            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                                            <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
                                        </div>

                                        <span className="ml-4 text-sm font-semibold text-zinc-500">
                                            LeadFlow
                                        </span>
                                    </div>

                                    <div className="absolute inset-x-8 bottom-8 top-20 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                                        <div className="flex h-full flex-col">

                                            <div className="flex items-center justify-between border-b border-zinc-100 pb-5">
                                                <div>
                                                    <div className="text-sm font-semibold text-zinc-950">
                                                        {step.title}
                                                    </div>

                                                    <div className="mt-1 text-xs text-zinc-400">
                                                        LeadFlow workspace
                                                    </div>
                                                </div>

                                                <div className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500">
                                                    {index + 1} /{" "}
                                                    {steps.length}
                                                </div>
                                            </div>

                                            <div className="grid flex-1 grid-cols-3 gap-4 pt-5">
                                                <div className="rounded-xl bg-zinc-50 p-4">
                                                    <div className="h-3 w-20 rounded bg-zinc-200" />
                                                    <div className="mt-6 h-8 w-24 rounded bg-zinc-100" />
                                                    <div className="mt-3 h-2 w-16 rounded bg-zinc-100" />
                                                </div>

                                                <div className="rounded-xl bg-zinc-50 p-4">
                                                    <div className="h-3 w-16 rounded bg-zinc-200" />
                                                    <div className="mt-6 h-8 w-28 rounded bg-zinc-100" />
                                                    <div className="mt-3 h-2 w-20 rounded bg-zinc-100" />
                                                </div>

                                                <div className="rounded-xl bg-zinc-50 p-4">
                                                    <div className="h-3 w-24 rounded bg-zinc-200" />
                                                    <div className="mt-6 h-8 w-20 rounded bg-zinc-100" />
                                                    <div className="mt-3 h-2 w-16 rounded bg-zinc-100" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default ProductWorkflow;