import { useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

import {
    ArrowLeft,
    CheckCircle2,
    ExternalLink,
    Globe,
    Loader2,
    MapPin,
    MessageSquare,
    Search,
    Star,
    XCircle,
} from "lucide-react";

import {
    getBusinessDetails,
    analyzeWebsite,
    enrichBusiness,
    analyzeDigitalMarketing,
} from "../../services/business.service";

import WebsiteAnalysis from "../../components/analysis/WebsiteAnalysis";
import DigitalMarketingAnalysis from "../../components/analysis/DigitalMarketingAnalysis";

function BusinessDetails() {
    const { id } = useParams();
    const { user } = useUser();
    const { theme } = useOutletContext();

    const userId = user?.id;

    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState("overview");

    const [websiteAnalysis, setWebsiteAnalysis] = useState(null);
    const [websiteLoading, setWebsiteLoading] = useState(false);

    const [digitalMarketing, setDigitalMarketing] = useState(null);
    const [marketingLoading, setMarketingLoading] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }

        let cancelled = false;

        const loadBusiness = async () => {
            try {
                setLoading(true);

                setBusiness(null);
                setWebsiteAnalysis(null);
                setWebsiteLoading(false);

                setDigitalMarketing(null);
                setMarketingLoading(false);

                setActiveTab("overview");

                const response = await getBusinessDetails(id);

                const existingBusiness = response?.business;

                if (!existingBusiness) {
                    throw new Error("Business not found.");
                }

                if (existingBusiness.website) {
                    if (!cancelled) {
                        setBusiness(existingBusiness);
                    }

                    return;
                }

                try {
                    const enriched = await enrichBusiness(id);

                    if (!cancelled) {
                        setBusiness(
                            enriched?.business || existingBusiness
                        );
                    }
                } catch (enrichmentError) {
                    console.error(
                        "Business enrichment failed:",
                        enrichmentError
                    );

                    if (!cancelled) {
                        setBusiness(existingBusiness);
                    }

                    toast.error(
                        "Business loaded, but enrichment failed."
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to load business:",
                    error
                );

                if (!cancelled) {
                    setBusiness(null);

                    toast.error(
                        error?.message ||
                            "Failed to load business."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadBusiness();

        return () => {
            cancelled = true;
        };
    }, [id, userId]);

    const handleWebsiteAnalysis = async () => {
        if (websiteLoading) {
            return;
        }

        if (!business) {
            toast.error(
                "Business information is not available."
            );

            return;
        }

        if (!business.google_maps_link) {
            toast.error(
                "Google Maps information is not available for this business."
            );

            return;
        }

        try {
            setWebsiteLoading(true);

            const response = await analyzeWebsite(
                business.google_maps_link
            );

            if (!response) {
                throw new Error(
                    "The server returned an empty response."
                );
            }

            if (response.success === false) {
                setWebsiteAnalysis(response);

                toast.error(
                    response.message ||
                        "Website analysis failed."
                );

                return;
            }

            setWebsiteAnalysis(response);

            if (response.partial === true) {
                toast(
                    "Website analysis completed partially."
                );
            } else {
                toast.success(
                    "Website analysis completed."
                );
            }
        } catch (error) {
            console.error(
                "Website analysis failed:",
                error
            );

            const {
                message,
                code,
            } = getRequestError(
                error,
                "Website analysis failed. Please try again.",
                "REQUEST_FAILED"
            );

            setWebsiteAnalysis({
                success: false,
                partial: false,
                message,
                code,
                errors: [
                    {
                        stage: "Website analysis request",
                        message,
                    },
                ],
            });

            toast.error(message);
        } finally {
            setWebsiteLoading(false);
        }
    };

    const handleDigitalMarketing = async () => {
        if (
            digitalMarketing ||
            marketingLoading
        ) {
            return;
        }

        if (!business?.website) {
            toast.error(
                "This business does not have a website to analyze."
            );

            return;
        }

        try {
            setMarketingLoading(true);

            const response =
                await analyzeDigitalMarketing(
                    business.website
                );

            const analysis =
                response?.analysis || null;

            if (!analysis) {
                throw new Error(
                    "The server returned no digital marketing analysis."
                );
            }

            setDigitalMarketing(analysis);
        } catch (error) {
            console.error(
                "Digital marketing analysis failed:",
                error
            );

            const { message } =
                getRequestError(
                    error,
                    "Digital marketing analysis failed. Please try again.",
                    "MARKETING_ANALYSIS_FAILED"
                );

            toast.error(message);
        } finally {
            setMarketingLoading(false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (loading) {
        return <BusinessDetailsSkeleton theme={theme} />;
    }

    if (!business) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <div className="w-full max-w-md px-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[12px] border border-zinc-200 bg-white dark:border-[#292929] dark:bg-[#151515]">
                        <Search
                            size={20}
                            strokeWidth={1.7}
                            className="text-zinc-500 dark:text-[#777]"
                        />
                    </div>

                    <h1 className="mt-5 text-[22px] font-semibold tracking-[-0.03em] text-zinc-900 dark:text-white">
                        Business not found
                    </h1>

                    <p className="mt-2 text-[14px] leading-6 text-zinc-500 dark:text-[#777]">
                        This business may have been removed
                        or is no longer available.
                    </p>

                    <Link
                        to="/app/search"
                        className="
                            mt-6
                            inline-flex
                            h-10
                            items-center
                            gap-2
                            rounded-[9px]
                            border
                            border-zinc-200 dark:border-[#303030]
                            bg-white dark:bg-[#181818]
                            px-4
                            text-[13px]
                            font-medium
                            text-zinc-700 dark:text-[#ddd]
                            transition-all
                            duration-150
                            hover:border-zinc-300 dark:hover:border-[#444]
                            hover:bg-zinc-50 dark:hover:bg-[#222]
                            hover:text-zinc-900 dark:hover:text-white
                            active:scale-[0.98]
                        "
                    >
                        <ArrowLeft
                            size={15}
                            strokeWidth={1.8}
                        />

                        Back to Search
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-[1400px] space-y-6">
            {/* Back */}
            <Link
                to="/app/search"
                className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    text-[13px]
                    font-medium
                    tracking-[-0.01em]
                    text-zinc-500 dark:text-[#777]
                    transition-colors
                    duration-150
                    hover:text-zinc-900 dark:hover:text-white
                "
            >
                <ArrowLeft
                    size={15}
                    strokeWidth={1.8}
                    className="transition-transform duration-150 group-hover:-translate-x-0.5"
                />

                Back to Search
            </Link>

            {/* Hero */}
            <BusinessHero business={business} theme={theme} />

            {/* Tabs */}
            <div
                role="tablist"
                aria-label="Business analysis sections"
                className="
                    sticky
                    top-0
                    z-20
                    flex
                    gap-1
                    overflow-x-auto
                    rounded-[11px]
                    border
                    border-zinc-200 dark:border-[#242424]
                    bg-white/95 dark:bg-[#0b0b0b]/95
                    p-1.5
                    backdrop-blur-md
                "
            >
                <TabButton
                    active={activeTab === "overview"}
                    onClick={() =>
                        handleTabChange("overview")
                    }
                    label="Overview"
                    theme={theme}
                />

                <TabButton
                    active={activeTab === "website"}
                    onClick={() =>
                        handleTabChange("website")
                    }
                    label="Website Analysis"
                    theme={theme}
                />

                <TabButton
                    active={activeTab === "marketing"}
                    onClick={() => {
                        setActiveTab("marketing");
                        handleDigitalMarketing();
                    }}
                    label="Digital Marketing"
                    theme={theme}
                />
            </div>

            {/* Overview */}
            {activeTab === "overview" && (
                <OverviewTab business={business} theme={theme} />
            )}

            {/* Website Analysis */}
            {activeTab === "website" && (
                <WebsiteAnalysisTab
                    business={business}
                    websiteAnalysis={websiteAnalysis}
                    websiteLoading={websiteLoading}
                    onAnalyze={handleWebsiteAnalysis}
                    theme={theme}
                />
            )}

            {/* Digital Marketing */}
            {activeTab === "marketing" && (
                <DigitalMarketingTab
                    business={business}
                    digitalMarketing={digitalMarketing}
                    marketingLoading={marketingLoading}
                    onAnalyze={handleDigitalMarketing}
                    theme={theme}
                />
            )}
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Business Hero
|--------------------------------------------------------------------------
*/

function BusinessHero({ business, theme }) {
    const hasWebsite = Boolean(business.website);

    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-[14px]
                border
                border-zinc-200 dark:border-[#282828]
                bg-white dark:bg-[#0d0d0d]
                p-6
                shadow-[0_12px_40px_rgba(0,0,0,0.18)]
                sm:p-8
            "
        >
            <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className="
                                inline-flex
                                items-center
                                rounded-full
                                border
                                border-[#303030]
                                bg-zinc-50 dark:bg-[#171717]
                                px-2.5
                                py-1
                                text-[11px]
                                font-medium
                                tracking-[0.01em]
                                text-zinc-700 dark:text-[#aaa]
                            "
                        >
                            {business.category || "Business"}
                        </span>

                        {hasWebsite ? (
                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-emerald-200 dark:border-emerald-500/20
                                    bg-emerald-50 dark:bg-emerald-500/[0.07]
                                    px-2.5
                                    py-1
                                    text-[11px]
                                    font-medium
                                    text-emerald-600 dark:text-emerald-400
                                "
                            >
                                <CheckCircle2
                                    size={12}
                                    strokeWidth={1.9}
                                />

                                Website available
                            </span>
                        ) : (
                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    border
                                    border-red-200 dark:border-red-500/20
                                    bg-red-50 dark:bg-red-500/[0.07]
                                    px-2.5
                                    py-1
                                    text-[11px]
                                    font-medium
                                    text-red-600 dark:text-red-400
                                "
                            >
                                <XCircle
                                    size={12}
                                    strokeWidth={1.9}
                                />

                                No website
                            </span>
                        )}
                    </div>

                    <h1
                        className="
                            mt-4
                            max-w-4xl
                            break-words
                            text-[30px]
                            font-semibold
                            leading-tight
                            tracking-[-0.04em]
                            text-zinc-900 dark:text-white
                            sm:text-[36px]
                        "
                    >
                        {business.business_name ||
                            "Unnamed Business"}
                    </h1>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-[8px]
                                border
                                border-amber-500/15
                                bg-amber-50 dark:bg-amber-500/[0.04]
                                px-3
                                py-2
                            "
                        >
                            <Star
                                size={15}
                                strokeWidth={1.8}
                                className="fill-amber-400 text-amber-600 dark:text-amber-400"
                            />

                            <span className="text-[13px] font-medium text-amber-700 dark:text-amber-100">
                                {business.google_rating ??
                                    "N/A"}
                            </span>

                            <span className="text-[12px] text-amber-600 dark:text-amber-400/50">
                                rating
                            </span>
                        </div>

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-[8px]
                                border
                                border-blue-500/15
                                bg-blue-50 dark:bg-blue-500/[0.04]
                                px-3
                                py-2
                            "
                        >
                            <MessageSquare
                                size={15}
                                strokeWidth={1.8}
                                className="text-blue-600 dark:text-blue-400"
                            />

                            <span className="text-[13px] font-medium text-blue-700 dark:text-blue-100">
                                {business.review_count ??
                                    0}
                            </span>

                            <span className="text-[12px] text-blue-600 dark:text-blue-400/50">
                                reviews
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2 lg:items-end">
                    {business.google_maps_link && (
                        <a
                            href={business.google_maps_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex
                                h-10
                                items-center
                                justify-center
                                gap-2
                                rounded-[9px]
                                border
                                border-red-500/15
                                bg-red-50 dark:bg-red-500/[0.04]
                                px-4
                                text-[13px]
                                font-medium
                                text-red-600 dark:text-red-300
                                transition-all
                                duration-150
                                hover:border-red-500/25
                                hover:bg-red-50 dark:bg-red-500/[0.08]
                                hover:text-red-500 dark:text-red-200
                                active:scale-[0.98]
                            "
                        >
                            <MapPin
                                size={15}
                                strokeWidth={1.8}
                            />

                            Open Maps

                            <ExternalLink
                                size={13}
                                strokeWidth={1.8}
                                className="text-red-600 dark:text-red-400/60"
                            />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}

/*
|--------------------------------------------------------------------------
| Overview
|--------------------------------------------------------------------------
*/

function OverviewTab({ business, theme }) {
    return (
        <section className="space-y-5">
            <div>
                <h2
                    className="
                        text-[20px]
                        font-semibold
                        tracking-[-0.025em]
                        text-zinc-900 dark:text-white
                    "
                >
                    Business Information
                </h2>

                <p className="mt-1.5 text-[13px] leading-6 text-zinc-500 dark:text-[#777]">
                    General information collected from Google
                    Maps and business enrichment.
                </p>
            </div>

            {/* Main information */}
            <div
                className="
                    overflow-hidden
                    rounded-[12px]
                    border
                    border-zinc-200 dark:border-[#262626]
                    bg-white dark:bg-[#101010]
                "
            >
                <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
                    <div className="border-b border-zinc-200 dark:border-[#242424] p-6 lg:border-b-0 lg:border-r">
                        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500 dark:text-[#666]">
                            Address
                        </p>

                        <div className="mt-4 flex items-start gap-3">
                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-[8px]
                                    border
                                    border-red-200 dark:border-red-500/20
                                    bg-red-50 dark:bg-red-500/[0.07]
                                "
                            >
                                <MapPin
                                    size={17}
                                    strokeWidth={1.7}
                                    className="text-red-600 dark:text-red-400"
                                />
                            </div>

                            <p className="break-words text-[14px] leading-7 text-zinc-700 dark:text-[#d5d5d5]">
                                {business.address ||
                                    "Not Available"}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2">
                        <StatBlock
                            label="Rating"
                            value={
                                business.google_rating ??
                                "N/A"
                            }
                            icon={
                                <Star
                                    size={17}
                                    strokeWidth={1.8}
                                    className="fill-amber-400 text-amber-600 dark:text-amber-400"
                                />
                            }
                            color="amber"
                            theme={theme}
                        />

                        <StatBlock
                            label="Reviews"
                            value={
                                business.review_count ?? 0
                            }
                            icon={
                                <MessageSquare
                                    size={17}
                                    strokeWidth={1.8}
                                    className="text-blue-600 dark:text-blue-400"
                                />
                            }
                            color="blue"
                            theme={theme}
                        />
                    </div>
                </div>
            </div>

            {/* Contact + Social */}
            <div className="grid gap-5 lg:grid-cols-2">
                <InfoCard
                    title="Contact Information"
                    description="Available ways to contact this business."
                    theme={theme}
                >
                    <InfoRow
                        label="Website"
                        value={business.website}
                        link={business.website}
                        color="blue"
                        theme={theme}
                        icon={
                            <Globe
                                size={15}
                                strokeWidth={1.8}
                            />
                        }
                    />

                    <InfoRow
                        label="Phone"
                        value={business.phone}
                        color="green"
                        theme={theme}
                        icon={<PhoneIcon />}
                    />

                    <InfoRow
                        label="Email"
                        value={business.email}
                        color="amber"
                        theme={theme}
                        icon={<MailIcon />}
                    />
                </InfoCard>

                <InfoCard
                    title="Social Presence"
                    description="Social profiles discovered for this business."
                    theme={theme}
                >
                    <InfoRow
                        label="Instagram"
                        value={business.instagram}
                        link={business.instagram}
                        color="pink"
                        theme={theme}
                        icon={<InstagramIcon />}
                    />

                    <InfoRow
                        label="Facebook"
                        value={business.facebook}
                        link={business.facebook}
                        color="blue"
                        theme={theme}
                        icon={<FacebookIcon />}
                    />

                    <InfoRow
                        label="LinkedIn"
                        value={business.linkedin}
                        link={business.linkedin}
                        color="indigo"
                        theme={theme}
                        icon={<LinkedInIcon />}
                    />
                </InfoCard>
            </div>

            {/* Google Maps */}
            <div
                className="
                    rounded-[12px]
                    border
                    border-zinc-200 dark:border-[#262626]
                    bg-white dark:bg-[#101010]
                    p-6
                    transition-all
                    duration-200
                    hover:border-red-300 dark:hover:border-red-500/20
                "
            >
                <div className="flex items-start justify-between gap-5">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-[8px]
                                    border
                                    border-red-200 dark:border-red-500/20
                                    bg-red-50 dark:bg-red-500/[0.07]
                                "
                            >
                                <MapPin
                                    size={15}
                                    strokeWidth={1.8}
                                    className="text-red-600 dark:text-red-400"
                                />
                            </div>

                            <h3 className="text-[15px] font-semibold tracking-[-0.015em] text-zinc-900 dark:text-white">
                                Google Maps
                            </h3>
                        </div>

                        <p className="mt-3 text-[13px] leading-6 text-zinc-500 dark:text-[#777]">
                            Open this business directly in
                            Google Maps.
                        </p>
                    </div>

                    <ExternalLink
                        size={16}
                        strokeWidth={1.7}
                        className="shrink-0 text-red-600 dark:text-red-400/50"
                    />
                </div>

                {business.google_maps_link ? (
                    <a
                        href={business.google_maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            mt-5
                            inline-flex
                            h-10
                            items-center
                            gap-2
                            rounded-[9px]
                            border
                            border-red-200 dark:border-red-500/20
                            bg-red-50 dark:bg-red-500/[0.08]
                            px-4
                            text-[13px]
                            font-medium
                            text-red-600 dark:text-red-300
                            transition-all
                            duration-150
                            hover:border-red-500/30
                            hover:bg-red-50 dark:hover:bg-red-500/[0.13]
                            hover:text-red-500 dark:text-red-200
                            active:scale-[0.98]
                        "
                    >
                        <MapPin
                            size={15}
                            strokeWidth={1.8}
                        />

                        Open in Google Maps

                        <ExternalLink
                            size={13}
                            strokeWidth={1.8}
                        />
                    </a>
                ) : (
                    <p className="mt-5 text-[13px] text-zinc-400 dark:text-[#555]">
                        Google Maps link not available.
                    </p>
                )}
            </div>
        </section>
    );
}

/*
|--------------------------------------------------------------------------
| Website Analysis
|--------------------------------------------------------------------------
*/

function WebsiteAnalysisTab({
    business,
    websiteAnalysis,
    websiteLoading,
    onAnalyze,
    theme,
}) {
    const hasGoogleMapsLink =
        Boolean(business.google_maps_link);

    const hasResult = Boolean(websiteAnalysis);

    const hasFailed =
        websiteAnalysis?.success === false;

    const showAnalysisPrompt =
        !hasResult && !websiteLoading;

    return (
        <section className="space-y-5">
            {showAnalysisPrompt && (
                <AnalysisStartCard
                    title="Website Analysis"
                    description="Analyze this business website to detect technologies, performance, responsiveness, broken links, hosting and more."
                    buttonLabel={
                        hasGoogleMapsLink
                            ? "Analyze Website"
                            : "Website Analysis Unavailable"
                    }
                    disabled={!hasGoogleMapsLink}
                    onClick={onAnalyze}
                    type="website"
                    theme={theme}
                />
            )}

            {hasFailed && !websiteLoading && (
                <AnalysisStartCard
                    title="Website Analysis"
                    description="The previous website analysis could not be completed. You can retry the analysis."
                    buttonLabel={
                        hasGoogleMapsLink
                            ? "Retry Website Analysis"
                            : "Website Analysis Unavailable"
                    }
                    disabled={!hasGoogleMapsLink}
                    onClick={onAnalyze}
                    type="website"
                    theme={theme}
                />
            )}

            <WebsiteAnalysis
                loading={websiteLoading}
                data={websiteAnalysis}
                theme={theme}
            />
        </section>
    );
}

/*
|--------------------------------------------------------------------------
| Digital Marketing
|--------------------------------------------------------------------------
*/

function DigitalMarketingTab({
    business,
    digitalMarketing,
    marketingLoading,
    onAnalyze,
    theme,
}) {
    const hasWebsite = Boolean(business.website);

    const showPrompt =
        !digitalMarketing &&
        !marketingLoading;

    return (
        <section className="space-y-5">
            {showPrompt && (
                <AnalysisStartCard
                    title="Digital Marketing Analysis"
                    description="Analyze this website's digital marketing presence including tracking, social media, trust signals, marketing tools, contact options, and AI opportunities."
                    buttonLabel={
                        hasWebsite
                            ? "Analyze Digital Marketing"
                            : "No Website Available"
                    }
                    disabled={!hasWebsite}
                    onClick={onAnalyze}
                    type="marketing"
                    theme={theme}
                />
            )}

            <DigitalMarketingAnalysis
                loading={marketingLoading}
                data={digitalMarketing}
                theme={theme}
            />
        </section>
    );
}

/*
|--------------------------------------------------------------------------
| Analysis Start Card
|--------------------------------------------------------------------------
*/

function AnalysisStartCard({
    title,
    description,
    buttonLabel,
    disabled,
    onClick,
    type,
    theme,
}) {
    const isMarketing = type === "marketing";

    return (
        <div
            className="
                group
                relative
                overflow-hidden
                rounded-[12px]
                border
                border-[#292929]
                bg-white dark:bg-[#101010]
                p-6
                transition-all
                duration-200
                hover:border-zinc-300 dark:hover:border-[#353535]
                sm:p-8
            "
        >
            <div className="flex flex-col items-center text-center">
                <div
                    className={`
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-[10px]
                        border
                        ${
                            isMarketing
                                ? "border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/[0.07]"
                                : "border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/[0.07]"
                        }
                    `}
                >
                    {isMarketing ? (
                        <MarketingIcon />
                    ) : (
                        <Globe
                            size={19}
                            strokeWidth={1.7}
                            className="text-blue-600 dark:text-blue-400"
                        />
                    )}
                </div>

                <h2 className="mt-4 text-[19px] font-semibold tracking-[-0.025em] text-zinc-900 dark:text-white">
                    {title}
                </h2>

                <p className="mx-auto mt-2.5 max-w-2xl text-[13px] leading-6 text-zinc-500 dark:text-[#777]">
                    {description}
                </p>

                <button
                    type="button"
                    onClick={onClick}
                    disabled={disabled}
                    className="
                        mt-6
                        inline-flex
                        h-10
                        items-center
                        gap-2
                        rounded-[9px]
                        bg-white
                        px-5
                        text-[13px]
                        font-medium
                        text-black
                        shadow-[0_1px_2px_rgba(0,0,0,0.2)]
                        transition-all
                        duration-150
                        hover:bg-[#e8e8e8]
                        hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]
                        active:scale-[0.98]
                        disabled:cursor-not-allowed
                        disabled:bg-zinc-100 dark:disabled:bg-[#242424]
                        disabled:text-zinc-500 dark:text-[#666]
                        disabled:shadow-none
                    "
                >
                    {buttonLabel}

                    {!disabled && <ArrowRightIcon />}
                </button>
            </div>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Arrow Right
|--------------------------------------------------------------------------
*/

function ArrowRightIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.5 7H11.5M11.5 7L7.75 3.25M11.5 7L7.75 10.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/*
|--------------------------------------------------------------------------
| Stat Block
|--------------------------------------------------------------------------
*/

function StatBlock({
    label,
    value,
    icon,
    color = "gray",
    theme,
}) {
    const styles = {
        amber: {
            icon: "text-amber-600 dark:text-amber-400",
            label: "text-amber-600 dark:text-amber-400/60",
            value: "text-amber-700 dark:text-amber-100",
        },

        blue: {
            icon: "text-blue-600 dark:text-blue-400",
            label: "text-blue-600 dark:text-blue-400/60",
            value: "text-blue-700 dark:text-blue-100",
        },

        green: {
            icon: "text-emerald-600 dark:text-emerald-400",
            label: "text-emerald-600 dark:text-emerald-400/60",
            value: "text-emerald-100",
        },

        gray: {
            icon: "text-[#888]",
            label: "text-zinc-500 dark:text-[#666]",
            value: "text-zinc-900 dark:text-white",
        },
    };

    const selected =
        styles[color] || styles.gray;

    return (
        <div
            className="
                flex
                min-h-[112px]
                flex-col
                justify-center
                border-b
                border-zinc-200 dark:border-[#242424]
                p-5
                transition-colors
                duration-150
                last:border-b-0
                hover:bg-zinc-50 dark:hover:bg-[#131313]
            "
        >
            <div className="flex items-center gap-2">
                <span className={selected.icon}>
                    {icon}
                </span>

                <span
                    className={`
                        text-[11px]
                        font-medium
                        uppercase
                        tracking-[0.07em]
                        ${selected.label}
                    `}
                >
                    {label}
                </span>
            </div>

            <p
                className={`
                    mt-3
                    text-[24px]
                    font-semibold
                    tracking-[-0.035em]
                    ${selected.value}
                `}
            >
                {value}
            </p>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Info Card
|--------------------------------------------------------------------------
*/

function InfoCard({
    title,
    description,
    children,
    theme,
}) {
    return (
        <div
            className="
                overflow-hidden
                rounded-[12px]
                border
                border-zinc-200 dark:border-[#262626]
                bg-white dark:bg-[#101010]
                transition-all
                duration-200
                hover:border-zinc-300 dark:hover:border-[#303030]
            "
        >
            <div className="border-b border-zinc-200 dark:border-[#242424] px-6 py-5">
                <h3 className="text-[15px] font-semibold tracking-[-0.015em] text-zinc-900 dark:text-white">
                    {title}
                </h3>

                <p className="mt-1.5 text-[12px] leading-5 text-zinc-500 dark:text-[#666]">
                    {description}
                </p>
            </div>

            <div className="px-6">
                {children}
            </div>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Loading Skeleton
|--------------------------------------------------------------------------
*/

function BusinessDetailsSkeleton({ theme }) {
    return (
        <div
            className="mx-auto w-full max-w-[1400px] space-y-6"
            aria-busy="true"
            aria-label="Loading business details"
        >
            {/* Back */}
            <div className="h-5 w-28 animate-pulse rounded bg-zinc-200 dark:bg-[#202020]" />

            {/* Hero */}
            <div className="rounded-[14px] border border-zinc-200 dark:border-[#242424] bg-white dark:bg-[#101010] p-6 sm:p-8">
                <div className="h-5 w-24 animate-pulse rounded-full bg-zinc-200 dark:bg-[#202020]" />

                <div className="mt-5 h-10 w-full max-w-xl animate-pulse rounded-[8px] bg-zinc-200 dark:bg-[#202020]" />

                <div className="mt-6 flex gap-3">
                    <div className="h-9 w-24 animate-pulse rounded-[8px] bg-zinc-200 dark:bg-[#202020]" />

                    <div className="h-9 w-28 animate-pulse rounded-[8px] bg-zinc-200 dark:bg-[#202020]" />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex h-[50px] gap-2 rounded-[11px] border border-zinc-200 dark:border-[#242424] bg-white dark:bg-[#101010] p-1.5">
                <div className="h-full w-24 animate-pulse rounded-[8px] bg-zinc-200 dark:bg-[#202020]" />

                <div className="h-full w-32 animate-pulse rounded-[8px] bg-zinc-200 dark:bg-[#202020]" />

                <div className="h-full w-36 animate-pulse rounded-[8px] bg-zinc-200 dark:bg-[#202020]" />
            </div>

            {/* Content */}
            <div className="space-y-5">
                <div>
                    <div className="h-7 w-56 animate-pulse rounded bg-zinc-200 dark:bg-[#202020]" />

                    <div className="mt-2 h-4 w-80 animate-pulse rounded bg-zinc-100 dark:bg-[#191919]" />
                </div>

                <div className="overflow-hidden rounded-[12px] border border-zinc-200 dark:border-[#242424] bg-white dark:bg-[#101010]">
                    <div className="grid lg:grid-cols-2">
                        <div className="h-40 animate-pulse border-b border-zinc-200 dark:border-[#242424] bg-zinc-100 dark:bg-[#111] lg:border-b-0 lg:border-r" />

                        <div className="grid grid-cols-2">
                            <div className="h-40 animate-pulse border-b border-zinc-200 dark:border-[#242424] bg-zinc-100 dark:bg-[#111]" />

                            <div className="h-40 animate-pulse border-b border-zinc-200 dark:border-[#242424] bg-zinc-100 dark:bg-[#111]" />
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                    <div className="h-64 animate-pulse rounded-[12px] border border-zinc-200 dark:border-[#242424] bg-white dark:bg-[#101010]" />

                    <div className="h-64 animate-pulse rounded-[12px] border border-zinc-200 dark:border-[#242424] bg-white dark:bg-[#101010]" />
                </div>

                <div className="h-40 animate-pulse rounded-[12px] border border-zinc-200 dark:border-[#242424] bg-white dark:bg-[#101010]" />
            </div>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Tab Button
|--------------------------------------------------------------------------
*/

function TabButton({
    active,
    onClick,
    label,
    theme,
}) {
    return (
        <button
            type="button"
            role="tab"
            aria-selected={active}
            onClick={onClick}
            className={`
                relative
                shrink-0
                rounded-[8px]
                px-4
                py-2.5
                text-[13px]
                font-medium
                tracking-[-0.01em]
                transition-all
                duration-150
                ${
                    active
                        ? theme === "dark"
                            ? "bg-[#242424] text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
                            : "bg-zinc-100 text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                        : theme === "dark"
                            ? "text-[#777] hover:bg-[#191919] hover:text-white"
                            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                }
            `}
        >
            {label}
        </button>
    );
}

/*
|--------------------------------------------------------------------------
| Information Row
|--------------------------------------------------------------------------
*/

function InfoRow({
    label,
    value,
    link,
    icon,
    color = "gray",
    theme,
}) {
    const colorStyles = {
        blue: {
            icon: "border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/[0.08] text-blue-600 dark:text-blue-400",
            label: "text-blue-700 dark:text-blue-300",
            value: "text-blue-700 dark:text-blue-100",
            hover: "group-hover:text-blue-700 dark:group-hover:text-blue-300",
        },

        green: {
            icon: "border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/[0.08] text-emerald-600 dark:text-emerald-400",
            label: "text-emerald-700 dark:text-emerald-300",
            value: "text-emerald-100",
            hover: "group-hover:text-emerald-700 dark:group-hover:text-emerald-300",
        },

        amber: {
            icon: "border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/[0.08] text-amber-600 dark:text-amber-400",
            label: "text-amber-700 dark:text-amber-300",
            value: "text-amber-700 dark:text-amber-100",
            hover: "group-hover:text-amber-700 dark:group-hover:text-amber-300",
        },

        pink: {
            icon: "border-pink-200 dark:border-pink-500/20 bg-pink-50 dark:bg-pink-500/[0.08] text-pink-400",
            label: "text-pink-300",
            value: "text-pink-100",
            hover: "group-hover:text-pink-600 dark:group-hover:text-pink-300",
        },

        red: {
            icon: "border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/[0.08] text-red-600 dark:text-red-400",
            label: "text-red-600 dark:text-red-300",
            value: "text-red-100",
            hover: "group-hover:text-red-600 dark:group-hover:text-red-300",
        },

        indigo: {
            icon: "border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/[0.08] text-indigo-400",
            label: "text-indigo-300",
            value: "text-indigo-100",
            hover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-300",
        },

        gray: {
            icon: "border-[#2c2c2c] bg-zinc-50 dark:bg-[#171717] text-[#999]",
            label: "text-zinc-500 dark:text-[#666]",
            value: "text-zinc-700 dark:text-[#ccc]",
            hover: "group-hover:text-zinc-900 dark:hover:text-white",
        },
    };

    const styles =
        colorStyles[color] || colorStyles.gray;

    return (
        <div
            className="
                group
                flex
                min-h-[64px]
                items-center
                gap-4
                border-b
                border-zinc-200 dark:border-[#242424]
                py-3
                last:border-0
                transition-colors
                duration-150
                hover:bg-white/[0.015]
            "
        >
            {/* Icon */}
            <div
                className={`
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-[8px]
                    border
                    transition-all
                    duration-150
                    ${styles.icon}
                `}
            >
                {icon}
            </div>

            {/* Label */}
            <span
                className={`
                    w-[70px]
                    shrink-0
                    text-[12px]
                    font-medium
                    transition-colors
                    duration-150
                    ${styles.label}
                `}
            >
                {label}
            </span>

            {/* Value */}
            <div className="min-w-0 flex-1 text-right">
                {!value ? (
                    <span className="text-[12px] text-zinc-400 dark:text-[#4f4f4f]">
                        Not Available
                    </span>
                ) : link ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group/link
                            inline-flex
                            max-w-full
                            items-center
                            gap-1.5
                            text-right
                            text-[12px]
                            font-medium
                            text-zinc-700 dark:text-[#aaa]
                            transition-colors
                            duration-150
                            hover:text-zinc-900 dark:hover:text-white
                        "
                        title={value}
                    >
                        <span className="truncate">
                            Visit
                        </span>

                        <ExternalLink
                            size={12}
                            strokeWidth={1.7}
                            className="
                                shrink-0
                                text-zinc-400 dark:text-[#555]
                                transition-colors
                                duration-150
                                group-hover/link:text-zinc-700 dark:group-hover/link:text-[#aaa]
                            "
                        />
                    </a>
                ) : (
                    <span
                        className={`
                            block
                            truncate
                            text-[12px]
                            font-medium
                            ${styles.value}
                        `}
                        title={value}
                    >
                        {value}
                    </span>
                )}
            </div>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Phone Icon
|--------------------------------------------------------------------------
*/

function PhoneIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22 16.92V19.92C22 20.48 21.55 20.95 20.99 20.99C20.47 21.03 19.95 21.05 19.43 21.05C10.34 21.05 2.95 13.66 2.95 4.57C2.95 4.05 2.97 3.53 3.01 3.01C3.05 2.45 3.52 2 4.08 2H7.08C7.6 2 8.04 2.4 8.1 2.91C8.19 3.69 8.34 4.45 8.55 5.18C8.65 5.53 8.53 5.91 8.27 6.17L6.54 7.9C7.76 10.31 9.69 12.24 12.1 13.46L13.83 11.73C14.09 11.47 14.47 11.35 14.82 11.45C15.55 11.66 16.31 11.81 17.09 11.9C17.6 11.96 18 12.4 18 12.92V15.92C18 16.48 17.55 16.93 16.99 16.97C16.51 17 16.03 17.02 15.55 17.02"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/*
|--------------------------------------------------------------------------
| Mail Icon
|--------------------------------------------------------------------------
*/

function MailIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
            />

            <path
                d="M4 7L10.94 12.21C11.57 12.68 12.43 12.68 13.06 12.21L20 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/*
|--------------------------------------------------------------------------
| Instagram Icon
|--------------------------------------------------------------------------
*/

function InstagramIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.7"
            />

            <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                strokeWidth="1.7"
            />

            <circle
                cx="17.3"
                cy="6.7"
                r="1"
                fill="currentColor"
            />
        </svg>
    );
}

/*
|--------------------------------------------------------------------------
| Facebook Icon
|--------------------------------------------------------------------------
*/

function FacebookIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14 8H16V4H13.5C10.74 4 9 5.67 9 8.56V11H6V15H9V20H13V15H16L16.5 11H13V8.86C13 8.29 13.29 8 14 8Z"
                fill="currentColor"
            />
        </svg>
    );
}

/*
|--------------------------------------------------------------------------
| LinkedIn Icon
|--------------------------------------------------------------------------
*/

function LinkedInIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
            />

            <path
                d="M8 10V16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />

            <circle
                cx="8"
                cy="7.5"
                r="1"
                fill="currentColor"
            />

            <path
                d="M12 16V12.8C12 11.25 13 10 14.5 10C16 10 17 11.25 17 12.8V16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />

            <path
                d="M12 13V16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
        </svg>
    );
}

/*
|--------------------------------------------------------------------------
| Marketing Icon
|--------------------------------------------------------------------------
*/

function MarketingIcon() {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-amber-600 dark:text-amber-400"
        >
            <path
                d="M4 19V5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />

            <path
                d="M4 6C7 4 9 8 12 6C15 4 17 6 20 5V14C17 15 15 13 12 15C9 17 7 13 4 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M4 19H20"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

/*
|--------------------------------------------------------------------------
| Request Error Helper
|--------------------------------------------------------------------------
*/

function getRequestError(
    error,
    fallbackMessage,
    fallbackCode
) {
    if (error?.response?.data) {
        return {
            message:
                error.response.data.message ||
                fallbackMessage,

            code:
                error.response.data.code ||
                fallbackCode,
        };
    }

    if (
        error?.code === "ECONNABORTED" ||
        error?.code === "ETIMEDOUT"
    ) {
        return {
            message:
                "The request is taking too long. Please try again.",

            code: "REQUEST_TIMEOUT",
        };
    }

    if (error?.message) {
        return {
            message: error.message,
            code: fallbackCode,
        };
    }

    return {
        message: fallbackMessage,
        code: fallbackCode,
    };
}

export default BusinessDetails;