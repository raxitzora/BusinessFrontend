import {
    AlertCircle,
    CheckCircle2,
    Clock3,
    Code2,
    Database,
    FileWarning,
    Globe,
    Image,
    Link2,
    Loader2,
    MonitorSmartphone,
    Network,
    Server,
    ShieldCheck,
    Smartphone,
    Zap,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| Website Analysis
|--------------------------------------------------------------------------
|
| Expected backend response:
|
| {
|     success: boolean,
|     partial: boolean,
|     message?: string,
|     code?: string,
|
|     reachability: {
|         reachable,
|         status,
|         responseTime,
|         https,
|         redirects,
|         finalUrl,
|         error
|     } | null,
|
|     techStack: {
|         frontend: [],
|         cms: [],
|         css: [],
|         analytics: [],
|         hosting: [],
|         backend: []
|     } | null,
|
|     performance: {
|         images: {},
|         javascript: {},
|         css: {},
|         fonts: {},
|         compression,
|         caching,
|         summary: {}
|     } | null,
|
|     responsive: {
|         viewport: {},
|         layout: {},
|         images: {},
|         touchTargets: {},
|         fonts: {}
|     } | null,
|
|     brokenLinks: {
|         total,
|         checked,
|         truncated,
|         broken,
|         links: []
|     } | null,
|
|     brokenImages: {
|         total,
|         broken,
|         images: []
|     } | null,
|
|     errors: []
| }
|
|--------------------------------------------------------------------------
*/

function WebsiteAnalysis({ loading, data }) {

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return <WebsiteAnalysisSkeleton />;

    }

    /*
    |--------------------------------------------------------------------------
    | Nothing to display
    |--------------------------------------------------------------------------
    */

    if (!data) {

        return null;

    }

    /*
    |--------------------------------------------------------------------------
    | Complete backend failure
    |--------------------------------------------------------------------------
    */

    if (data.success === false) {

        return (
            <section className="space-y-6">

                <SectionHeader
                    icon={Globe}
                    title="Website Analysis"
                    description="Technical, performance and mobile-friendliness analysis of the business website."
                />

                <AnalysisErrorState
                    title="Website analysis failed"
                    message={
                        data.message ||
                        "The website could not be analyzed."
                    }
                    code={data.code}
                />

            </section>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Safe Data
    |--------------------------------------------------------------------------
    */

    const reachability =
        data.reachability ?? null;

    const techStack =
        data.techStack ?? null;

    const performance =
        data.performance ?? null;

    const responsive =
        data.responsive ?? null;

    const brokenLinks =
        data.brokenLinks ?? null;

    const brokenImages =
        data.brokenImages ?? null;

    const errors =
        Array.isArray(data.errors)
            ? data.errors
            : [];

    /*
    |--------------------------------------------------------------------------
    | Website Unreachable
    |--------------------------------------------------------------------------
    */

    if (reachability?.reachable === false) {

        return (

            <section className="space-y-6">

                <SectionHeader
                    icon={Globe}
                    title="Website Analysis"
                    description="Technical, performance and mobile-friendliness analysis of the business website."
                />

                <AnalysisErrorState
                    title="Website could not be reached"
                    message={
                        reachability.error ||
                        "The website did not respond successfully."
                    }
                    code="WEBSITE_UNREACHABLE"
                />

                <ReachabilityCard
                    reachability={reachability}
                />

            </section>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Successful / Partial Analysis
    |--------------------------------------------------------------------------
    */

    return (

        <section className="space-y-8">

            {/* Partial Analysis */}

            {data.partial === true && (

                <AnalysisNotice
                    icon={AlertCircle}
                    title="Analysis completed partially"
                    description="Some analysis stages could not be completed. Available results are still shown below."
                />

            )}

            {/* Stage Errors */}

            {errors.length > 0 && (

                <AnalysisWarnings
                    errors={errors}
                />

            )}

            {/* Header */}

            <SectionHeader
                icon={Globe}
                title="Website Analysis"
                description="Technical, performance and mobile-friendliness analysis of the business website."
            />

            {/* Reachability */}

            <ReachabilityCard
                reachability={reachability}
            />

            {/* Technology Stack */}

            <TechStackSection
                techStack={techStack}
            />

            {/* Performance */}

            <PerformanceSection
                performance={performance}
            />

            {/* Responsive */}

            <ResponsiveSection
                responsive={responsive}
            />

            {/* Broken Links */}

            <BrokenLinksSection
                brokenLinks={brokenLinks}
            />

            {/* Broken Images */}

            <BrokenImagesSection
                brokenImages={brokenImages}
            />

        </section>

    );

}

/*
|--------------------------------------------------------------------------
| Loading Skeleton
|--------------------------------------------------------------------------
*/

function WebsiteAnalysisSkeleton() {

    return (

        <section
            className="space-y-8"
            aria-busy="true"
            aria-label="Website analysis loading"
        >

            {/* Header */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">

                        <Loader2
                            size={20}
                            className="animate-spin text-violet-400"
                        />

                    </div>

                    <div className="min-w-0 flex-1">

                        <div className="h-6 w-44 animate-pulse rounded bg-zinc-800" />

                        <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-zinc-800" />

                    </div>

                </div>

            </div>

            {/* Reachability */}

            <SkeletonCard
                rows={2}
            />

            {/* Technology */}

            <SkeletonCard
                rows={3}
            />

            {/* Performance */}

            <SkeletonCard
                rows={3}
            />

            {/* Responsive */}

            <SkeletonCard
                rows={3}
            />

            {/* Broken Links */}

            <SkeletonCard
                rows={2}
            />

            {/* Broken Images */}

            <SkeletonCard
                rows={2}
            />

        </section>

    );

}

function SkeletonCard({ rows = 2 }) {

    return (

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="flex items-start gap-4">

                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-zinc-800" />

                <div className="min-w-0 flex-1">

                    <div className="h-5 w-40 animate-pulse rounded bg-zinc-800" />

                    <div className="mt-2 h-4 w-full max-w-lg animate-pulse rounded bg-zinc-800" />

                </div>

            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {Array.from({ length: rows * 2 }).map((_, index) => (

                    <div
                        key={index}
                        className="h-24 animate-pulse rounded-xl border border-zinc-800 bg-zinc-950/50"
                    />

                ))}

            </div>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Section Header
|--------------------------------------------------------------------------
*/

function SectionHeader({
    icon: Icon,
    title,
    description,
}) {

    return (

        <div>

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">

                    <Icon
                        size={20}
                        className="text-violet-400"
                    />

                </div>

                <h2 className="text-2xl font-semibold tracking-tight text-white">
                    {title}
                </h2>

            </div>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
                {description}
            </p>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Analysis Notice
|--------------------------------------------------------------------------
*/

function AnalysisNotice({
    icon: Icon,
    title,
    description,
}) {

    return (

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

            <div className="flex items-start gap-3">

                <Icon
                    size={20}
                    className="mt-0.5 shrink-0 text-yellow-400"
                />

                <div className="min-w-0">

                    <h3 className="font-medium text-white">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-zinc-400">
                        {description}
                    </p>

                </div>

            </div>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Analysis Warnings
|--------------------------------------------------------------------------
*/

function AnalysisWarnings({ errors }) {

    return (

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10">

                    <AlertCircle
                        size={20}
                        className="text-yellow-400"
                    />

                </div>

                <div className="min-w-0">

                    <h3 className="font-semibold text-white">
                        Analysis Warnings
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-zinc-500">
                        Some analysis stages could not be completed.
                    </p>

                </div>

            </div>

            <div className="mt-5 space-y-3">

                {errors.map((error, index) => (

                    <div
                        key={`${error?.stage || "error"}-${index}`}
                        className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4"
                    >

                        <p className="font-medium text-zinc-200">
                            {error?.stage || "Analysis stage"}
                        </p>

                        <p className="mt-1 break-words text-sm leading-6 text-zinc-500">
                            {error?.message || "Unknown error."}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Reachability
|--------------------------------------------------------------------------
*/

function ReachabilityCard({ reachability }) {

    if (!reachability) {

        return (

            <AnalysisCard
                icon={Globe}
                title="Reachability"
                description="Checks whether the website is accessible and responding correctly."
            >

                <AnalysisUnavailableState
                    title="Reachability analysis unavailable"
                    description="The website availability check did not return usable results."
                />

            </AnalysisCard>

        );

    }

    const {
        reachable,
        status,
        responseTime,
        https,
        redirects,
        finalUrl,
    } = reachability;

    return (

        <AnalysisCard
            icon={Globe}
            title="Reachability"
            description="Checks whether the website is accessible and responding correctly."
        >

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <MetricCard
                    icon={
                        reachable === true
                            ? CheckCircle2
                            : reachable === false
                                ? AlertCircle
                                : Clock3
                    }
                    label="Reachable"
                    value={getBooleanLabel(
                        reachable,
                        "Yes",
                        "No"
                    )}
                    status={getBooleanStatus(reachable)}
                />

                <MetricCard
                    icon={ShieldCheck}
                    label="HTTPS"
                    value={getBooleanLabel(
                        https,
                        "Secure",
                        "Not Secure"
                    )}
                    status={getBooleanStatus(https)}
                />

                <MetricCard
                    icon={Server}
                    label="HTTP Status"
                    value={
                        typeof status === "number"
                            ? status
                            : "N/A"
                    }
                    status={
                        typeof status === "number"
                            ? status < 400
                                ? "success"
                                : "danger"
                            : "neutral"
                    }
                />

                <MetricCard
                    icon={Clock3}
                    label="Response Time"
                    value={
                        typeof responseTime === "number"
                            ? `${responseTime} ms`
                            : "N/A"
                    }
                />

            </div>

            {(redirects !== undefined || finalUrl) && (

                <div className="mt-6 grid gap-4 border-t border-zinc-800 pt-6 sm:grid-cols-2">

                    <InfoValue
                        label="Redirects"
                        value={
                            typeof redirects === "number"
                                ? redirects
                                : "N/A"
                        }
                    />

                    <InfoValue
                        label="Final URL"
                        value={finalUrl || "N/A"}
                        truncate
                    />

                </div>

            )}

        </AnalysisCard>

    );

}

/*
|--------------------------------------------------------------------------
| Technology Stack
|--------------------------------------------------------------------------
*/

function TechStackSection({ techStack }) {

    if (!techStack) {

        return (

            <AnalysisCard
                icon={Code2}
                title="Technology Stack"
                description="Technologies detected from the website HTML, scripts and response headers."
            >

                <AnalysisUnavailableState
                    title="Technology detection unavailable"
                    description="Technology detection could not be completed for this website."
                />

            </AnalysisCard>

        );

    }

    return (

        <AnalysisCard
            icon={Code2}
            title="Technology Stack"
            description="Technologies detected from the website HTML, scripts and response headers."
        >

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                <TechRow
                    title="Frontend"
                    items={techStack.frontend}
                />

                <TechRow
                    title="CMS"
                    items={techStack.cms}
                />

                <TechRow
                    title="CSS"
                    items={techStack.css}
                />

                <TechRow
                    title="Analytics"
                    items={techStack.analytics}
                />

                <TechRow
                    title="Hosting"
                    items={techStack.hosting}
                />

                <TechRow
                    title="Backend"
                    items={techStack.backend}
                />

            </div>

        </AnalysisCard>

    );

}

/*
|--------------------------------------------------------------------------
| Performance
|--------------------------------------------------------------------------
*/

function PerformanceSection({ performance }) {

    if (!performance) {

        return (

            <AnalysisCard
                icon={Zap}
                title="Performance"
                description="Network resource usage and delivery characteristics observed during the analysis."
            >

                <AnalysisUnavailableState
                    title="Performance analysis unavailable"
                    description="The performance analysis could not be completed. No performance measurements are being displayed."
                />

            </AnalysisCard>

        );

    }

    const summary =
        performance.summary ?? {};

    const images =
        performance.images ?? {};

    const javascript =
        performance.javascript ?? {};

    const css =
        performance.css ?? {};

    const fonts =
        performance.fonts ?? {};

    return (

        <AnalysisCard
            icon={Zap}
            title="Performance"
            description="Network resource usage and delivery characteristics observed during the analysis."
        >

            {/* Main Metrics */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <MetricCard
                    icon={Network}
                    label="Requests"
                    value={
                        typeof summary.requests === "number"
                            ? summary.requests
                            : "N/A"
                    }
                />

                <MetricCard
                    icon={Database}
                    label="Total Size"
                    value={
                        summary.totalSizeMB !== undefined &&
                        summary.totalSizeMB !== null
                            ? `${summary.totalSizeMB} MB`
                            : formatBytes(summary.totalSize)
                    }
                />

                <MetricCard
                    icon={Image}
                    label="Images"
                    value={
                        typeof images.total === "number"
                            ? images.total
                            : "N/A"
                    }
                    secondary={
                        typeof images.largeImages === "number"
                            ? `${images.largeImages} over 500 KB`
                            : undefined
                    }
                    status={
                        typeof images.largeImages !== "number"
                            ? "neutral"
                            : images.largeImages > 0
                                ? "warning"
                                : "success"
                    }
                />

                <MetricCard
                    icon={Code2}
                    label="JavaScript"
                    value={
                        typeof javascript.total === "number"
                            ? javascript.total
                            : "N/A"
                    }
                    secondary={
                        typeof javascript.largeBundles === "number"
                            ? `${javascript.largeBundles} over 250 KB`
                            : undefined
                    }
                    status={
                        typeof javascript.largeBundles !== "number"
                            ? "neutral"
                            : javascript.largeBundles > 0
                                ? "warning"
                                : "success"
                    }
                />

            </div>

            {/* Resource Details */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <ResourceCard
                    label="CSS"
                    count={css.total}
                    size={css.totalSize}
                />

                <ResourceCard
                    label="Fonts"
                    count={fonts.total}
                    size={fonts.totalSize}
                />

                <BooleanStatusCard
                    label="Compression"
                    value={performance.compression}
                />

                <BooleanStatusCard
                    label="Caching"
                    value={performance.caching}
                />

            </div>

        </AnalysisCard>

    );

}

/*
|--------------------------------------------------------------------------
| Responsive
|--------------------------------------------------------------------------
*/

function ResponsiveSection({ responsive }) {

    if (!responsive) {

        return (

            <AnalysisCard
                icon={MonitorSmartphone}
                title="Mobile Responsiveness"
                description="Checks whether the website behaves correctly on a mobile viewport."
            >

                <AnalysisUnavailableState
                    title="Responsive analysis unavailable"
                    description="Mobile responsiveness could not be analyzed for this website."
                />

            </AnalysisCard>

        );

    }

    const viewport =
        responsive.viewport ?? {};

    const layout =
        responsive.layout ?? {};

    const images =
        responsive.images ?? {};

    const touchTargets =
        responsive.touchTargets ?? {};

    const fonts =
        responsive.fonts ?? {};

    return (

        <AnalysisCard
            icon={MonitorSmartphone}
            title="Mobile Responsiveness"
            description="Checks whether the website behaves correctly on a mobile viewport."
        >

            {/* Primary Responsive Metrics */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <MetricCard
                    icon={
                        viewport.exists === true
                            ? CheckCircle2
                            : viewport.exists === false
                                ? AlertCircle
                                : Clock3
                    }
                    label="Viewport"
                    value={
                        viewport.exists === true
                            ? "Present"
                            : viewport.exists === false
                                ? "Missing"
                                : "Unknown"
                    }
                    status={
                        getBooleanStatus(
                            viewport.exists
                        )
                    }
                />

                <MetricCard
                    icon={
                        layout.horizontalScroll === true
                            ? AlertCircle
                            : layout.horizontalScroll === false
                                ? CheckCircle2
                                : Clock3
                    }
                    label="Horizontal Overflow"
                    value={
                        layout.horizontalScroll === true
                            ? "Detected"
                            : layout.horizontalScroll === false
                                ? "None"
                                : "Unknown"
                    }
                    status={
                        layout.horizontalScroll === true
                            ? "danger"
                            : layout.horizontalScroll === false
                                ? "success"
                                : "neutral"
                    }
                />

                <MetricCard
                    icon={Smartphone}
                    label="Touch Targets"
                    value={
                        typeof touchTargets.good === "number"
                            ? `${touchTargets.good} Good`
                            : "N/A"
                    }
                    secondary={
                        typeof touchTargets.small === "number"
                            ? `${touchTargets.small} Too Small`
                            : undefined
                    }
                    status={
                        typeof touchTargets.small !== "number"
                            ? "neutral"
                            : touchTargets.small > 0
                                ? "warning"
                                : "success"
                    }
                />

            </div>

            {/* Responsive Details */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <InfoValue
                    label="Responsive Images"
                    value={
                        typeof images.responsive === "number"
                            ? images.responsive
                            : "N/A"
                    }
                />

                <InfoValue
                    label="Fixed Images"
                    value={
                        typeof images.fixed === "number"
                            ? images.fixed
                            : "N/A"
                    }
                />

                <InfoValue
                    label="Lazy Images"
                    value={
                        typeof images.lazy === "number"
                            ? images.lazy
                            : "N/A"
                    }
                />

                <InfoValue
                    label="Readable Fonts"
                    value={
                        typeof fonts.readable === "number"
                            ? fonts.readable
                            : "N/A"
                    }
                />

                <InfoValue
                    label="Small Fonts"
                    value={
                        typeof fonts.smallFonts === "number"
                            ? fonts.smallFonts
                            : "N/A"
                    }
                />

                <InfoValue
                    label="Viewport Configuration"
                    value={
                        viewport.content || "N/A"
                    }
                    truncate
                />

            </div>

        </AnalysisCard>

    );

}

/*
|--------------------------------------------------------------------------
| Broken Links
|--------------------------------------------------------------------------
*/

function BrokenLinksSection({ brokenLinks }) {

    if (!brokenLinks) {

        return (

            <AnalysisCard
                icon={Link2}
                title="Broken Links"
                description="Links that returned an error or could not be requested during the analysis."
            >

                <AnalysisUnavailableState
                    title="Broken link analysis unavailable"
                    description="Link analysis could not be completed for this website."
                />

            </AnalysisCard>

        );

    }

    const total =
        typeof brokenLinks.total === "number"
            ? brokenLinks.total
            : 0;

    const checked =
        typeof brokenLinks.checked === "number"
            ? brokenLinks.checked
            : 0;

    const truncated =
        brokenLinks.truncated === true;

    const broken =
        typeof brokenLinks.broken === "number"
            ? brokenLinks.broken
            : 0;

    const links =
        Array.isArray(brokenLinks.links)
            ? brokenLinks.links
            : [];

    return (

        <AnalysisCard
            icon={Link2}
            title="Broken Links"
            description="Links that returned an error or could not be requested during the analysis."
        >

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <MetricCard
                    icon={Link2}
                    label="Total Links"
                    value={total}
                />

                <MetricCard
                    icon={Network}
                    label="Checked"
                    value={checked}
                    secondary={
                        truncated
                            ? `of ${total} detected`
                            : "All detected links"
                    }
                />

                <MetricCard
                    icon={
                        broken > 0
                            ? AlertCircle
                            : CheckCircle2
                    }
                    label="Broken Links"
                    value={broken}
                    status={
                        broken > 0
                            ? "danger"
                            : "success"
                    }
                />

            </div>

            {/* Truncated Warning */}

            {truncated && (

                <AnalysisNotice
                    icon={AlertCircle}
                    title="Link analysis was limited"
                    description={`Checked ${checked} of ${total} detected links. The remaining links were skipped to keep the analysis fast and protect server resources.`}
                />

            )}

            {/* Broken Links */}

            {links.length > 0 ? (

                <div className="mt-6 space-y-3">

                    {links.map((link, index) => (

                        <div
                            key={`${link?.url || "broken-link"}-${index}`}
                            className="rounded-xl border border-red-500/10 bg-red-500/5 p-4"
                        >

                            <div className="flex items-start gap-3">

                                <AlertCircle
                                    size={18}
                                    className="mt-0.5 shrink-0 text-red-400"
                                />

                                <div className="min-w-0 flex-1">

                                    <p className="font-medium text-white">
                                        {link?.text || "Unnamed link"}
                                    </p>

                                    <p className="mt-1 break-all text-sm leading-6 text-zinc-500">
                                        {link?.url || "URL unavailable"}
                                    </p>

                                    <p className="mt-2 text-xs font-medium text-red-400">
                                        Status: {link?.status ?? "Unknown"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <EmptyAnalysisState
                    icon={CheckCircle2}
                    title="No broken links detected"
                    description={
                        total === 0
                            ? "No links were detected during the analysis."
                            : truncated
                                ? `No broken links were detected among the ${checked} links that were checked.`
                                : `All ${total} detected links responded successfully.`
                    }
                    success
                />

            )}

        </AnalysisCard>

    );

}

/*
|--------------------------------------------------------------------------
| Broken Images
|--------------------------------------------------------------------------
*/

function BrokenImagesSection({ brokenImages }) {

    if (!brokenImages) {

        return (

            <AnalysisCard
                icon={FileWarning}
                title="Broken Images"
                description="Images that failed to load or have an invalid rendered resource."
            >

                <AnalysisUnavailableState
                    title="Broken image analysis unavailable"
                    description="Image analysis could not be completed for this website."
                />

            </AnalysisCard>

        );

    }

    const total =
        typeof brokenImages.total === "number"
            ? brokenImages.total
            : 0;

    const broken =
        typeof brokenImages.broken === "number"
            ? brokenImages.broken
            : 0;

    const images =
        Array.isArray(brokenImages.images)
            ? brokenImages.images
            : [];

    return (

        <AnalysisCard
            icon={FileWarning}
            title="Broken Images"
            description="Images that failed to load or have an invalid rendered resource."
        >

            {/* Image Metrics */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <MetricCard
                    icon={Image}
                    label="Total Images"
                    value={total}
                />

                <MetricCard
                    icon={
                        broken > 0
                            ? AlertCircle
                            : CheckCircle2
                    }
                    label="Broken Images"
                    value={broken}
                    status={
                        broken > 0
                            ? "danger"
                            : "success"
                    }
                />

                <MetricCard
                    icon={
                        broken > 0
                            ? AlertCircle
                            : CheckCircle2
                    }
                    label="Healthy Images"
                    value={
                        Math.max(
                            total - broken,
                            0
                        )
                    }
                    status={
                        broken > 0
                            ? "warning"
                            : "success"
                    }
                />

            </div>

            {/* Broken Images */}

            {images.length > 0 ? (

                <div className="mt-6 space-y-3">

                    {images.map((image, index) => (

                        <div
                            key={`${image?.src || "broken-image"}-${index}`}
                            className="rounded-xl border border-red-500/10 bg-red-500/5 p-4"
                        >

                            <div className="flex items-start gap-3">

                                <Image
                                    size={18}
                                    className="mt-0.5 shrink-0 text-red-400"
                                />

                                <div className="min-w-0 flex-1">

                                    <p className="font-medium text-white">
                                        Broken image
                                    </p>

                                    <p className="mt-1 break-all text-sm leading-6 text-zinc-500">
                                        {image?.src || "Source unavailable"}
                                    </p>

                                    <p className="mt-2 text-xs text-zinc-500">
                                        Alt: {image?.alt || "No alt text"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            ) : (

                <EmptyAnalysisState
                    icon={CheckCircle2}
                    title="No broken images detected"
                    description={
                        total === 0
                            ? "No images were detected during the analysis."
                            : `All ${total} detected images loaded successfully.`
                    }
                    success
                />

            )}

        </AnalysisCard>

    );

}

/*
|--------------------------------------------------------------------------
| Generic Analysis Card
|--------------------------------------------------------------------------
*/

function AnalysisCard({
    icon: Icon,
    title,
    description,
    children,
}) {

    return (

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">

                    <Icon
                        size={20}
                        className="text-violet-400"
                    />

                </div>

                <div className="min-w-0">

                    <h3 className="text-xl font-semibold text-white">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-zinc-500">
                        {description}
                    </p>

                </div>

            </div>

            <div className="mt-6">
                {children}
            </div>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Metric Card
|--------------------------------------------------------------------------
*/

function MetricCard({
    icon: Icon,
    label,
    value,
    secondary,
    status = "neutral",
}) {

    const statusClasses = {

        success: "text-emerald-400",

        danger: "text-red-400",

        warning: "text-yellow-400",

        neutral: "text-white",

    };

    const colorClass =
        statusClasses[status] ||
        statusClasses.neutral;

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">

            <div className="flex items-center gap-2">

                {Icon && (

                    <Icon
                        size={16}
                        className={colorClass}
                    />

                )}

                <span className="text-sm text-zinc-500">
                    {label}
                </span>

            </div>

            <p
                className={`mt-3 break-words text-xl font-semibold ${colorClass}`}
            >
                {value}
            </p>

            {secondary && (

                <p className="mt-1 break-words text-xs text-zinc-500">
                    {secondary}
                </p>

            )}

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Resource Card
|--------------------------------------------------------------------------
*/

function ResourceCard({
    label,
    count,
    size,
}) {

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">

            <p className="text-sm text-zinc-500">
                {label}
            </p>

            <p className="mt-2 text-xl font-semibold text-white">
                {typeof count === "number"
                    ? count
                    : "N/A"}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
                {formatBytes(size)}
            </p>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Boolean Status Card
|--------------------------------------------------------------------------
*/

function BooleanStatusCard({
    label,
    value,
}) {

    const isKnown =
        typeof value === "boolean";

    const isEnabled =
        value === true;

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">

            <p className="text-sm text-zinc-500">
                {label}
            </p>

            <div className="mt-3 flex items-center gap-2">

                {isEnabled ? (

                    <CheckCircle2
                        size={18}
                        className="text-emerald-400"
                    />

                ) : isKnown ? (

                    <AlertCircle
                        size={18}
                        className="text-yellow-400"
                    />

                ) : (

                    <Clock3
                        size={18}
                        className="text-zinc-500"
                    />

                )}

                <span
                    className={
                        isEnabled
                            ? "font-semibold text-emerald-400"
                            : isKnown
                                ? "font-semibold text-yellow-400"
                                : "font-semibold text-zinc-400"
                    }
                >
                    {isEnabled
                        ? "Detected"
                        : isKnown
                            ? "Not Detected"
                            : "Unknown"}
                </span>

            </div>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Tech Row
|--------------------------------------------------------------------------
*/

function TechRow({
    title,
    items,
}) {

    const safeItems =
        Array.isArray(items)
            ? items
            : [];

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">

            <p className="text-sm font-medium text-zinc-400">
                {title}
            </p>

            {safeItems.length > 0 ? (

                <div className="mt-3 flex flex-wrap gap-2">

                    {safeItems.map((item, index) => (

                        <span
                            key={`${item}-${index}`}
                            className="rounded-lg bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300"
                        >
                            {item}
                        </span>

                    ))}

                </div>

            ) : (

                <p className="mt-3 text-sm text-zinc-600">
                    None detected
                </p>

            )}

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Info Value
|--------------------------------------------------------------------------
*/

function InfoValue({
    label,
    value,
    truncate = false,
}) {

    const displayValue =
        value === null ||
        value === undefined ||
        value === ""
            ? "N/A"
            : value;

    return (

        <div className="min-w-0">

            <p className="text-sm text-zinc-500">
                {label}
            </p>

            <p
                title={String(displayValue)}
                className={`mt-2 text-sm font-medium text-zinc-200 ${
                    truncate
                        ? "truncate"
                        : "break-words"
                }`}
            >
                {displayValue}
            </p>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Analysis Unavailable
|--------------------------------------------------------------------------
*/

function AnalysisUnavailableState({
    title,
    description,
}) {

    return (

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6">

            <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800">

                    <Clock3
                        size={18}
                        className="text-zinc-500"
                    />

                </div>

                <div className="min-w-0">

                    <p className="font-medium text-white">
                        {title}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-zinc-500">
                        {description}
                    </p>

                </div>

            </div>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Analysis Error
|--------------------------------------------------------------------------
*/

function AnalysisErrorState({
    title,
    message,
    code,
}) {

    return (

        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">

            <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10">

                    <AlertCircle
                        size={20}
                        className="text-red-400"
                    />

                </div>

                <div className="min-w-0">

                    <h3 className="font-semibold text-white">
                        {title}
                    </h3>

                    <p className="mt-2 break-words text-sm leading-6 text-zinc-400">
                        {message}
                    </p>

                    {code && (

                        <p className="mt-3 break-all text-xs font-medium uppercase tracking-wide text-red-400">
                            {code}
                        </p>

                    )}

                </div>

            </div>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Empty Analysis State
|--------------------------------------------------------------------------
*/

function EmptyAnalysisState({
    icon: Icon,
    title,
    description,
    success = false,
}) {

    return (

        <div
            className={`mt-6 rounded-xl border p-6 ${
                success
                    ? "border-emerald-500/10 bg-emerald-500/5"
                    : "border-zinc-800 bg-zinc-950/50"
            }`}
        >

            <div className="flex items-start gap-3">

                <Icon
                    size={20}
                    className={
                        success
                            ? "mt-0.5 shrink-0 text-emerald-400"
                            : "mt-0.5 shrink-0 text-zinc-500"
                    }
                />

                <div className="min-w-0">

                    <p className="font-medium text-white">
                        {title}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-zinc-500">
                        {description}
                    </p>

                </div>

            </div>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Boolean Helpers
|--------------------------------------------------------------------------
*/

function getBooleanLabel(
    value,
    trueLabel,
    falseLabel
) {

    if (value === true) {
        return trueLabel;
    }

    if (value === false) {
        return falseLabel;
    }

    return "Unknown";

}

function getBooleanStatus(value) {

    if (value === true) {
        return "success";
    }

    if (value === false) {
        return "danger";
    }

    return "neutral";

}

/*
|--------------------------------------------------------------------------
| Format Bytes
|--------------------------------------------------------------------------
*/

function formatBytes(bytes) {

    if (
        typeof bytes !== "number" ||
        !Number.isFinite(bytes) ||
        bytes <= 0
    ) {
        return "N/A";
    }

    if (bytes < 1024) {

        return `${bytes} B`;

    }

    if (bytes < 1024 * 1024) {

        return `${(bytes / 1024).toFixed(1)} KB`;

    }

    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;

}

export default WebsiteAnalysis;