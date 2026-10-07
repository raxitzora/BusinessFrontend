import {
    AlertCircle,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    CircleAlert,
    Globe,
    Lightbulb,
    Search,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";
import { useState } from "react";


function SEOAnalysis({
    loading = false,
    data = null,
    theme = "dark",
}) {

    if (loading) {
        return <SEOAnalysisSkeleton theme={theme} />;
    }

    if (!data) {
        return null;
    }

    if (data.success === false) {
        return (
            <AnalysisError
                message={
                    data.message ||
                    "SEO analysis failed."
                }
                theme={theme}
            />
        );
    }

    const score =
        data.score?.overall ?? 0;

    const summary =
        data.summary || {};

    const issues =
        data.issues || [];

    const opportunities =
        data.opportunities || [];

    return (
        <section className="space-y-5">

            <SEOOverview
                score={score}
                summary={summary}
                theme={theme}
            />

            <SEOCategoryScores
                score={data.score}
                theme={theme}
            />

            <SEOIssues
                issues={issues}
                theme={theme}
            />

            <SEOServices
                services={
                    summary.recommendedServices ||
                    []
                }
                theme={theme}
            />

            <SEOpportunities
                opportunities={opportunities}
                theme={theme}
            />

            <SEOChecks
                data={data}
                theme={theme}
            />

        </section>
    );
}


function SEOOverview({
    score,
    summary,
    theme,
}) {

    const rating =
        summary.rating ||
        getRating(score);

    const opportunity =
        summary.seoOpportunity ||
        "UNKNOWN";

    return (
        <div
            className="
                overflow-hidden
                rounded-[14px]
                border
                border-zinc-200 dark:border-[#282828]
                bg-white dark:bg-[#101010]
            "
        >

            <div
                className="
                    grid
                    gap-6
                    p-6
                    lg:grid-cols-[240px_1fr]
                    lg:p-8
                "
            >

                <ScoreCircle
                    score={score}
                    theme={theme}
                />

                <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2">

                        <StatusBadge
                            label={rating}
                            type={getRatingType(score)}
                        />

                        <StatusBadge
                            label={
                                `${opportunity} SEO OPPORTUNITY`
                            }
                            type={
                                opportunity === "HIGH"
                                    ? "danger"
                                    : opportunity === "MEDIUM"
                                        ? "warning"
                                        : "success"
                            }
                        />

                    </div>

                    <h2
                        className="
                            mt-4
                            text-[22px]
                            font-semibold
                            tracking-[-0.03em]
                            text-zinc-900
                            dark:text-white
                        "
                    >
                        SEO Analysis
                    </h2>

                    <p
                        className="
                            mt-2
                            max-w-2xl
                            text-[13px]
                            leading-6
                            text-zinc-500
                            dark:text-[#777]
                        "
                    >
                        SEO health, technical problems,
                        optimization opportunities and
                        potential SEO services for this business.
                    </p>

                    <div
                        className="
                            mt-6
                            grid
                            grid-cols-2
                            gap-px
                            overflow-hidden
                            rounded-[10px]
                            border
                            border-zinc-200
                            dark:border-[#262626]
                            bg-zinc-200
                            dark:bg-[#262626]
                            sm:grid-cols-4
                        "
                    >

                        <SummaryStat
                            label="Issues"
                            value={
                                summary.issues ??
                                0
                            }
                            theme={theme}
                        />

                        <SummaryStat
                            label="Critical"
                            value={
                                summary.criticalIssues ??
                                0
                            }
                            danger={
                                summary.criticalIssues >
                                0
                            }
                            theme={theme}
                        />

                        <SummaryStat
                            label="High"
                            value={
                                summary.highIssues ??
                                0
                            }
                            danger={
                                summary.highIssues >
                                0
                            }
                            theme={theme}
                        />

                        <SummaryStat
                            label="Opportunities"
                            value={
                                summary.opportunities ??
                                0
                            }
                            theme={theme}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}


function ScoreCircle({
    score,
}) {

    const radius = 48;
    const circumference =
        2 * Math.PI * radius;

    const progress =
        circumference -
        (score / 100) *
        circumference;

    return (
        <div
            className="
                flex
                items-center
                justify-center
            "
        >
            <div className="relative h-[140px] w-[140px]">

                <svg
                    viewBox="0 0 120 120"
                    className="
                        h-full
                        w-full
                        -rotate-90
                    "
                >

                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-zinc-200 dark:text-[#242424]"
                    />

                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={progress}
                        className={
                            getScoreColor(score)
                        }
                    />

                </svg>

                <div
                    className="
                        absolute
                        inset-0
                        flex
                        flex-col
                        items-center
                        justify-center
                    "
                >

                    <span
                        className="
                            text-[32px]
                            font-semibold
                            tracking-[-0.05em]
                            text-zinc-900
                            dark:text-white
                        "
                    >
                        {score}
                    </span>

                    <span
                        className="
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.1em]
                            text-zinc-500
                            dark:text-[#666]
                        "
                    >
                        SEO Score
                    </span>

                </div>

            </div>
        </div>
    );
}


function SEOCategoryScores({
    score = {},
    theme,
}) {

    const categories = [
        ["Technical", score.technical],
        ["On Page", score.onPage],
        ["Content", score.content],
        ["Images", score.images],
        ["Links", score.links],
        ["Schema", score.schema],
        ["Local SEO", score.localSEO],
        ["Social", score.social],
        ["Performance", score.performance],
        ["Mobile", score.mobile],
        ["Indexability", score.indexability],
        ["Security", score.security],
        ["URL Structure", score.urlStructure],
    ];

    return (
        <div
            className="
                rounded-[12px]
                border
                border-zinc-200
                dark:border-[#262626]
                bg-white
                dark:bg-[#101010]
            "
        >

            <div className="border-b border-zinc-200 dark:border-[#242424] px-6 py-5">

                <h3
                    className="
                        text-[15px]
                        font-semibold
                        tracking-[-0.015em]
                        text-zinc-900
                        dark:text-white
                    "
                >
                    SEO Health
                </h3>

                <p
                    className="
                        mt-1.5
                        text-[12px]
                        leading-5
                        text-zinc-500
                        dark:text-[#666]
                    "
                >
                    Score breakdown across the major SEO areas.
                </p>

            </div>

            <div
                className="
                    grid
                    gap-px
                    bg-zinc-200
                    dark:bg-[#242424]
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                "
            >

                {categories.map(
                    ([label, value]) => (
                        <ScoreItem
                            key={label}
                            label={label}
                            value={
                                Number.isFinite(value)
                                    ? value
                                    : 0
                            }
                            theme={theme}
                        />
                    )
                )}

            </div>

        </div>
    );
}


function ScoreItem({
    label,
    value,
}) {

    return (
        <div
            className="
                bg-white
                p-5
                dark:bg-[#101010]
            "
        >

            <div className="flex items-center justify-between gap-3">

                <span
                    className="
                        text-[12px]
                        font-medium
                        text-zinc-600
                        dark:text-[#888]
                    "
                >
                    {label}
                </span>

                <span
                    className={`
                        text-[13px]
                        font-semibold
                        ${getScoreTextColor(value)}
                    `}
                >
                    {value}
                </span>

            </div>

            <div
                className="
                    mt-3
                    h-1.5
                    overflow-hidden
                    rounded-full
                    bg-zinc-100
                    dark:bg-[#222]
                "
            >

                <div
                    className={`
                        h-full
                        rounded-full
                        transition-all
                        duration-500
                        ${getScoreBarColor(value)}
                    `}
                    style={{
                        width: `${Math.max(
                            0,
                            Math.min(
                                100,
                                value
                            )
                        )}%`,
                    }}
                />

            </div>

        </div>
    );
}


function SEOIssues({
    issues,
}) {

    const [expanded, setExpanded] =
        useState(false);

    const visibleIssues =
        expanded
            ? issues
            : issues.slice(0, 6);

    if (!issues.length) {
        return (
            <EmptyState
                icon={CheckCircle2}
                title="No SEO issues detected"
                description="The analyzer did not identify any actionable SEO problems."
            />
        );
    }

    return (
        <AnalysisSection
            icon={AlertCircle}
            title="SEO Issues"
            description="Problems that may be limiting search visibility."
            count={issues.length}
        >

            <div className="divide-y divide-zinc-200 dark:divide-[#242424]">

                {visibleIssues.map(
                    (issue, index) => (
                        <IssueRow
                            key={`${issue.title}-${index}`}
                            issue={issue}
                        />
                    )
                )}

            </div>

            {issues.length > 6 && (
                <ExpandButton
                    expanded={expanded}
                    onClick={() =>
                        setExpanded(
                            (value) => !value
                        )
                    }
                />
            )}

        </AnalysisSection>
    );
}


function IssueRow({
    issue,
}) {

    return (
        <div className="p-5">

            <div className="flex items-start gap-3">

                <div
                    className={`
                        mt-0.5
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-[8px]
                        ${getSeverityBackground(
                            issue.severity
                        )}
                    `}
                >
                    <CircleAlert
                        size={15}
                        strokeWidth={1.8}
                        className={
                            getSeverityColor(
                                issue.severity
                            )
                        }
                    />
                </div>

                <div className="min-w-0 flex-1">

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                        "
                    >

                        <h4
                            className="
                                text-[13px]
                                font-semibold
                                text-zinc-900
                                dark:text-white
                            "
                        >
                            {issue.title}
                        </h4>

                        <SeverityBadge
                            severity={
                                issue.severity
                            }
                        />

                    </div>

                    <p
                        className="
                            mt-1.5
                            text-[12px]
                            leading-5
                            text-zinc-500
                            dark:text-[#777]
                        "
                    >
                        {issue.description}
                    </p>

                    {issue.service && (
                        <span
                            className="
                                mt-3
                                inline-flex
                                items-center
                                rounded-full
                                border
                                border-zinc-200
                                dark:border-[#303030]
                                px-2.5
                                py-1
                                text-[10px]
                                font-medium
                                text-zinc-500
                                dark:text-[#777]
                            "
                        >
                            {issue.service}
                        </span>
                    )}

                </div>

            </div>

        </div>
    );
}


function SEOServices({
    services,
}) {

    if (!services.length) {
        return null;
    }

    return (
        <AnalysisSection
            icon={TrendingUp}
            title="Recommended SEO Services"
            description="Services that may have commercial value for this business."
        >

            <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">

                {services.map(
                    (item) => (
                        <div
                            key={item.service}
                            className="
                                rounded-[10px]
                                border
                                border-zinc-200
                                dark:border-[#292929]
                                bg-zinc-50
                                dark:bg-[#151515]
                                p-4
                            "
                        >

                            <div className="flex items-center gap-2">

                                <TrendingUp
                                    size={15}
                                    strokeWidth={1.8}
                                    className="text-blue-500"
                                />

                                <span
                                    className="
                                        text-[12px]
                                        font-semibold
                                        text-zinc-800
                                        dark:text-[#ddd]
                                    "
                                >
                                    {item.service}
                                </span>

                            </div>

                            <p
                                className="
                                    mt-2
                                    text-[11px]
                                    text-zinc-500
                                    dark:text-[#666]
                                "
                            >
                                {item.opportunities} opportunity
                                {item.opportunities === 1
                                    ? ""
                                    : "ies"}
                            </p>

                        </div>
                    )
                )}

            </div>

        </AnalysisSection>
    );
}


function SEOpportunities({
    opportunities,
}) {

    const [expanded, setExpanded] =
        useState(false);

    if (!opportunities.length) {
        return null;
    }

    const visible =
        expanded
            ? opportunities
            : opportunities.slice(0, 6);

    return (
        <AnalysisSection
            icon={Lightbulb}
            title="SEO Opportunities"
            description="Actionable improvements that can potentially increase organic visibility."
            count={opportunities.length}
        >

            <div className="divide-y divide-zinc-200 dark:divide-[#242424]">

                {visible.map(
                    (opportunity, index) => (
                        <OpportunityRow
                            key={
                                `${opportunity.title}-${index}`
                            }
                            opportunity={
                                opportunity
                            }
                        />
                    )
                )}

            </div>

            {opportunities.length > 6 && (
                <ExpandButton
                    expanded={expanded}
                    onClick={() =>
                        setExpanded(
                            (value) => !value
                        )
                    }
                />
            )}

        </AnalysisSection>
    );
}


function OpportunityRow({
    opportunity,
}) {

    return (
        <div className="p-5">

            <div className="flex items-start gap-3">

                <div
                    className="
                        mt-0.5
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-[8px]
                        border
                        border-amber-200
                        bg-amber-50
                        dark:border-amber-500/20
                        dark:bg-amber-500/[0.07]
                    "
                >

                    <Lightbulb
                        size={15}
                        strokeWidth={1.8}
                        className="
                            text-amber-600
                            dark:text-amber-400
                        "
                    />

                </div>

                <div className="min-w-0 flex-1">

                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                        "
                    >

                        <h4
                            className="
                                text-[13px]
                                font-semibold
                                text-zinc-900
                                dark:text-white
                            "
                        >
                            {opportunity.title}
                        </h4>

                        <SeverityBadge
                            severity={
                                opportunity.priority
                            }
                        />

                    </div>

                    <p
                        className="
                            mt-1.5
                            text-[12px]
                            leading-5
                            text-zinc-500
                            dark:text-[#777]
                        "
                    >
                        {opportunity.reason}
                    </p>

                    {opportunity.recommendedAction && (
                        <div
                            className="
                                mt-3
                                rounded-[8px]
                                border
                                border-zinc-200
                                dark:border-[#292929]
                                bg-zinc-50
                                dark:bg-[#151515]
                                px-3
                                py-2.5
                            "
                        >

                            <p
                                className="
                                    text-[11px]
                                    leading-5
                                    text-zinc-600
                                    dark:text-[#999]
                                "
                            >
                                <span
                                    className="
                                        font-semibold
                                        text-zinc-700
                                        dark:text-[#ccc]
                                    "
                                >
                                    Recommended:
                                </span>{" "}
                                {opportunity.recommendedAction}
                            </p>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}


function SEOChecks({
    data,
}) {

    const checks = [
        [
            "HTTPS",
            data.security?.https,
        ],
        [
            "Canonical",
            data.technical?.canonical?.exists,
        ],
        [
            "Meta Description",
            data.technical?.metaDescription?.exists,
        ],
        [
            "H1",
            data.onPage?.h1?.count > 0,
        ],
        [
            "Structured Data",
            data.schema?.exists,
        ],
        [
            "robots.txt",
            data.indexability?.robotsTxt?.exists,
        ],
        [
            "Sitemap",
            data.indexability?.sitemap?.exists,
        ],
        [
            "Mobile Viewport",
            data.mobile?.viewportExists,
        ],
    ];

    return (
        <AnalysisSection
            icon={ShieldCheck}
            title="SEO Foundation"
            description="Core technical signals detected during the analysis."
        >

            <div
                className="
                    grid
                    gap-px
                    bg-zinc-200
                    dark:bg-[#242424]
                    sm:grid-cols-2
                    lg:grid-cols-4
                "
            >

                {checks.map(
                    ([label, passed]) => (
                        <div
                            key={label}
                            className="
                                flex
                                items-center
                                gap-3
                                bg-white
                                p-4
                                dark:bg-[#101010]
                            "
                        >

                            {passed ? (
                                <CheckCircle2
                                    size={16}
                                    strokeWidth={1.8}
                                    className="
                                        text-emerald-500
                                    "
                                />
                            ) : (
                                <AlertCircle
                                    size={16}
                                    strokeWidth={1.8}
                                    className="
                                        text-amber-500
                                    "
                                />
                            )}

                            <span
                                className="
                                    text-[12px]
                                    font-medium
                                    text-zinc-700
                                    dark:text-[#aaa]
                                "
                            >
                                {label}
                            </span>

                        </div>
                    )
                )}

            </div>

        </AnalysisSection>
    );
}


function AnalysisSection({
    icon: Icon,
    title,
    description,
    count,
    children,
}) {

    return (
        <div
            className="
                overflow-hidden
                rounded-[12px]
                border
                border-zinc-200
                dark:border-[#262626]
                bg-white
                dark:bg-[#101010]
            "
        >

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-4
                    border-b
                    border-zinc-200
                    dark:border-[#242424]
                    px-6
                    py-5
                "
            >

                <div className="flex items-start gap-3">

                    <div
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-[8px]
                            border
                            border-zinc-200
                            bg-zinc-50
                            text-zinc-500
                            dark:border-[#292929]
                            dark:bg-[#171717]
                            dark:text-[#888]
                        "
                    >
                        <Icon
                            size={15}
                            strokeWidth={1.8}
                        />
                    </div>

                    <div>

                        <div className="flex items-center gap-2">

                            <h3
                                className="
                                    text-[15px]
                                    font-semibold
                                    tracking-[-0.015em]
                                    text-zinc-900
                                    dark:text-white
                                "
                            >
                                {title}
                            </h3>

                            {count !== undefined && (
                                <span
                                    className="
                                        rounded-full
                                        bg-zinc-100
                                        px-2
                                        py-0.5
                                        text-[10px]
                                        font-medium
                                        text-zinc-500
                                        dark:bg-[#202020]
                                        dark:text-[#777]
                                    "
                                >
                                    {count}
                                </span>
                            )}

                        </div>

                        <p
                            className="
                                mt-1.5
                                text-[12px]
                                leading-5
                                text-zinc-500
                                dark:text-[#666]
                            "
                        >
                            {description}
                        </p>

                    </div>

                </div>

            </div>

            {children}

        </div>
    );
}


function SummaryStat({
    label,
    value,
    danger = false,
}) {

    return (
        <div
            className="
                bg-white
                p-4
                dark:bg-[#101010]
            "
        >

            <p
                className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.08em]
                    text-zinc-500
                    dark:text-[#666]
                "
            >
                {label}
            </p>

            <p
                className={`
                    mt-2
                    text-[20px]
                    font-semibold
                    tracking-[-0.03em]
                    ${
                        danger
                            ? "text-red-500"
                            : "text-zinc-900 dark:text-white"
                    }
                `}
            >
                {value}
            </p>

        </div>
    );
}


function StatusBadge({
    label,
    type,
}) {

    const styles = {

        success:
            "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/[0.07] dark:text-emerald-400",

        warning:
            "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/[0.07] dark:text-amber-400",

        danger:
            "border-red-200 bg-red-50 text-red-600 dark:border-red-500/20 dark:bg-red-500/[0.07] dark:text-red-400",

        neutral:
            "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-[#303030] dark:bg-[#181818] dark:text-[#888]",
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                border
                px-2.5
                py-1
                text-[10px]
                font-medium
                ${styles[type] || styles.neutral}
            `}
        >
            {label}
        </span>
    );
}


function SeverityBadge({
    severity,
}) {

    const type =
        severity === "critical" ||
        severity === "high"
            ? "danger"
            : severity === "medium"
                ? "warning"
                : "neutral";

    return (
        <StatusBadge
            label={
                String(
                    severity || "unknown"
                ).toUpperCase()
            }
            type={type}
        />
    );
}


function ExpandButton({
    expanded,
    onClick,
}) {

    return (
        <button
            type="button"
            onClick={onClick}
            className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                border-t
                border-zinc-200
                px-5
                py-3
                text-[12px]
                font-medium
                text-zinc-500
                transition-colors
                hover:bg-zinc-50
                hover:text-zinc-900
                dark:border-[#242424]
                dark:text-[#777]
                dark:hover:bg-[#151515]
                dark:hover:text-white
            "
        >
            {expanded
                ? "Show Less"
                : "Show More"}

            {expanded ? (
                <ChevronUp
                    size={14}
                    strokeWidth={1.8}
                />
            ) : (
                <ChevronDown
                    size={14}
                    strokeWidth={1.8}
                />
            )}
        </button>
    );
}


function EmptyState({
    icon: Icon,
    title,
    description,
}) {

    return (
        <div
            className="
                rounded-[12px]
                border
                border-zinc-200
                bg-white
                p-8
                text-center
                dark:border-[#262626]
                dark:bg-[#101010]
            "
        >

            <Icon
                size={24}
                strokeWidth={1.7}
                className="
                    mx-auto
                    text-emerald-500
                "
            />

            <h3
                className="
                    mt-3
                    text-[15px]
                    font-semibold
                    text-zinc-900
                    dark:text-white
                "
            >
                {title}
            </h3>

            <p
                className="
                    mx-auto
                    mt-1.5
                    max-w-md
                    text-[12px]
                    leading-5
                    text-zinc-500
                    dark:text-[#666]
                "
            >
                {description}
            </p>

        </div>
    );
}


function AnalysisError({
    message,
}) {

    return (
        <div
            className="
                rounded-[12px]
                border
                border-red-200
                bg-red-50
                p-6
                dark:border-red-500/20
                dark:bg-red-500/[0.05]
            "
        >

            <div className="flex items-start gap-3">

                <AlertCircle
                    size={18}
                    strokeWidth={1.8}
                    className="
                        mt-0.5
                        shrink-0
                        text-red-500
                    "
                />

                <div>

                    <h3
                        className="
                            text-[14px]
                            font-semibold
                            text-red-700
                            dark:text-red-400
                        "
                    >
                        SEO Analysis Failed
                    </h3>

                    <p
                        className="
                            mt-1
                            text-[12px]
                            leading-5
                            text-red-600/80
                            dark:text-red-400/70
                        "
                    >
                        {message}
                    </p>

                </div>

            </div>

        </div>
    );
}


function SEOAnalysisSkeleton() {

    return (
        <section className="space-y-5">

            <SkeletonBlock height="260px" />

            <div className="grid gap-5 lg:grid-cols-2">

                <SkeletonBlock height="360px" />

                <SkeletonBlock height="360px" />

            </div>

            <SkeletonBlock height="320px" />

            <SkeletonBlock height="280px" />

        </section>
    );
}


function SkeletonBlock({
    height,
}) {

    return (
        <div
            style={{
                height,
            }}
            className="
                animate-pulse
                rounded-[12px]
                border
                border-zinc-200
                bg-zinc-100
                dark:border-[#262626]
                dark:bg-[#151515]
            "
        />
    );
}


function getRating(
    score
) {

    if (score >= 90) {
        return "Excellent";
    }

    if (score >= 75) {
        return "Good";
    }

    if (score >= 60) {
        return "Needs Improvement";
    }

    if (score >= 40) {
        return "Poor";
    }

    return "Critical";
}


function getRatingType(
    score
) {

    if (score >= 75) {
        return "success";
    }

    if (score >= 40) {
        return "warning";
    }

    return "danger";
}


function getScoreColor(
    score
) {

    if (score >= 75) {
        return "text-emerald-500";
    }

    if (score >= 40) {
        return "text-amber-500";
    }

    return "text-red-500";
}


function getScoreTextColor(
    score
) {

    if (score >= 75) {
        return "text-emerald-500";
    }

    if (score >= 40) {
        return "text-amber-500";
    }

    return "text-red-500";
}


function getScoreBarColor(
    score
) {

    if (score >= 75) {
        return "bg-emerald-500";
    }

    if (score >= 40) {
        return "bg-amber-500";
    }

    return "bg-red-500";
}


function getSeverityColor(
    severity
) {

    if (
        severity === "critical" ||
        severity === "high"
    ) {
        return "text-red-500";
    }

    if (
        severity === "medium"
    ) {
        return "text-amber-500";
    }

    return "text-zinc-400";
}


function getSeverityBackground(
    severity
) {

    if (
        severity === "critical" ||
        severity === "high"
    ) {
        return "border border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/[0.07]";
    }

    if (
        severity === "medium"
    ) {
        return "border border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.07]";
    }

    return "border border-zinc-200 bg-zinc-50 dark:border-[#292929] dark:bg-[#171717]";
}


export default SEOAnalysis;