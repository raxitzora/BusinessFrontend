import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import {
    ArrowLeft,
    Globe,
    MapPin,
    MessageSquare,
    Star,
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

    const userId = user?.id;

    /*
    |--------------------------------------------------------------------------
    | Business State
    |--------------------------------------------------------------------------
    */

    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);

    /*
    |--------------------------------------------------------------------------
    | Tab State
    |--------------------------------------------------------------------------
    */

    const [activeTab, setActiveTab] = useState("overview");

    /*
    |--------------------------------------------------------------------------
    | Website Analysis State
    |--------------------------------------------------------------------------
    */

    const [websiteAnalysis, setWebsiteAnalysis] = useState(null);
    const [websiteLoading, setWebsiteLoading] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Digital Marketing State
    |--------------------------------------------------------------------------
    */

    const [digitalMarketing, setDigitalMarketing] = useState(null);
    const [marketingLoading, setMarketingLoading] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Load Business
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!id) {
            return;
        }

        let cancelled = false;

        const loadBusiness = async () => {

            try {

                setLoading(true);

                /*
                |--------------------------------------------------------------------------
                | Reset page-specific state
                |--------------------------------------------------------------------------
                */

                setBusiness(null);
                setWebsiteAnalysis(null);
                setWebsiteLoading(false);

                setDigitalMarketing(null);
                setMarketingLoading(false);

                setActiveTab("overview");

                /*
                |--------------------------------------------------------------------------
                | Fetch Business
                |--------------------------------------------------------------------------
                */

                const response =
                    await getBusinessDetails(
                        id,
                        
                    );

                const existingBusiness =
                    response?.business;

                if (!existingBusiness) {

                    throw new Error(
                        "Business not found."
                    );

                }

                /*
                |--------------------------------------------------------------------------
                | Business Already Has Website
                |--------------------------------------------------------------------------
                */

                if (existingBusiness.website) {

                    if (!cancelled) {

                        setBusiness(
                            existingBusiness
                        );

                    }

                    return;

                }

                /*
                |--------------------------------------------------------------------------
                | Enrich Business When Website Is Missing
                |--------------------------------------------------------------------------
                */

                try {

                    const enriched =
                        await enrichBusiness(
                            id,
                            
                        );

                    if (!cancelled) {

                        setBusiness(
                            enriched?.business ||
                            existingBusiness
                        );

                    }

                } catch (enrichmentError) {

                    /*
                    |--------------------------------------------------------------------------
                    | Enrichment failure should NOT make the whole
                    | business page fail.
                    |--------------------------------------------------------------------------
                    |
                    | We still have the original business returned by
                    | getBusinessDetails().
                    |
                    */

                    console.error(
                        "Business enrichment failed:",
                        enrichmentError
                    );

                    if (!cancelled) {

                        setBusiness(
                            existingBusiness
                        );

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

    /*
    |--------------------------------------------------------------------------
    | Website Analysis
    |--------------------------------------------------------------------------
    */

    const handleWebsiteAnalysis = async () => {

        /*
        |--------------------------------------------------------------------------
        | Prevent duplicate requests
        |--------------------------------------------------------------------------
        */

        if (websiteLoading) {
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Validate Business
        |--------------------------------------------------------------------------
        */

        if (!business) {

            toast.error(
                "Business information is not available."
            );

            return;

        }

        /*
        |--------------------------------------------------------------------------
        | Validate Google Maps URL
        |--------------------------------------------------------------------------
        */

        if (!business.google_maps_link) {

            toast.error(
                "Google Maps information is not available for this business."
            );

            return;

        }

        try {

            setWebsiteLoading(true);

            /*
            |--------------------------------------------------------------------------
            | Start New Analysis
            |--------------------------------------------------------------------------
            |
            | IMPORTANT:
            | Do not clear the previous result here.
            |
            | The analysis can take a significant amount of time.
            | Keeping the previous result prevents the UI from suddenly
            | becoming empty while the new analysis is running.
            |
            */

            const response =
                await analyzeWebsite(
                    business.google_maps_link
                );

            /*
            |--------------------------------------------------------------------------
            | Validate Response
            |--------------------------------------------------------------------------
            */

            if (!response) {

                throw new Error(
                    "The server returned an empty response."
                );

            }

            /*
            |--------------------------------------------------------------------------
            | Backend Explicit Failure
            |--------------------------------------------------------------------------
            */

            if (response.success === false) {

                setWebsiteAnalysis(
                    response
                );

                toast.error(
                    response.message ||
                    "Website analysis failed."
                );

                return;

            }

            /*
            |--------------------------------------------------------------------------
            | Successful / Partial Analysis
            |--------------------------------------------------------------------------
            */

            setWebsiteAnalysis(
                response
            );

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

            /*
            |--------------------------------------------------------------------------
            | Store Frontend Error In Same Shape Expected By
            | WebsiteAnalysis
            |--------------------------------------------------------------------------
            */

            setWebsiteAnalysis({

                success: false,

                partial: false,

                message,

                code,

                errors: [

                    {
                        stage:
                            "Website analysis request",

                        message,
                    },

                ],

            });

            toast.error(
                message
            );

        } finally {

            setWebsiteLoading(false);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Digital Marketing Analysis
    |--------------------------------------------------------------------------
    */

    const handleDigitalMarketing = async () => {

        /*
        |--------------------------------------------------------------------------
        | Prevent duplicate requests
        |--------------------------------------------------------------------------
        */

        if (
            digitalMarketing ||
            marketingLoading
        ) {

            return;

        }

        /*
        |--------------------------------------------------------------------------
        | Validate Website
        |--------------------------------------------------------------------------
        */

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

            /*
            |--------------------------------------------------------------------------
            | Backend Response
            |--------------------------------------------------------------------------
            |
            | Current service returns the full API response.
            | Existing frontend expects:
            |
            | response.analysis
            |
            */

            const analysis =
                response?.analysis || null;

            if (!analysis) {

                throw new Error(
                    "The server returned no digital marketing analysis."
                );

            }

            setDigitalMarketing(
                analysis
            );

        } catch (error) {

            console.error(
                "Digital marketing analysis failed:",
                error
            );

            const {
                message,
            } = getRequestError(
                error,
                "Digital marketing analysis failed. Please try again.",
                "MARKETING_ANALYSIS_FAILED"
            );

            toast.error(
                message
            );

        } finally {

            setMarketingLoading(false);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Tab Change
    |--------------------------------------------------------------------------
    */

    const handleTabChange = (tab) => {

        setActiveTab(tab);

    };

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return <BusinessDetailsSkeleton />;

    }

    /*
    |--------------------------------------------------------------------------
    | Not Found State
    |--------------------------------------------------------------------------
    */

    if (!business) {

        return (

            <div className="flex min-h-[400px] items-center justify-center">

                <div className="px-6 text-center">

                    <h1 className="text-2xl font-semibold text-white">
                        Business not found
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        This business may have been removed or is no longer available.
                    </p>

                    <Link
                        to="/app/search"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500"
                    >
                        <ArrowLeft size={17} />
                        Back to Search
                    </Link>

                </div>

            </div>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <div className="space-y-8">

            {/* Back */}

            <Link
                to="/app/search"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-violet-400"
            >
                <ArrowLeft size={16} />
                Back to Search
            </Link>

            {/* Business Hero */}

            <BusinessHero
                business={business}
            />

            {/* Tabs */}

            <div
                role="tablist"
                aria-label="Business analysis sections"
                className="flex gap-2 overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-2"
            >

                <TabButton
                    active={
                        activeTab === "overview"
                    }
                    onClick={() =>
                        handleTabChange(
                            "overview"
                        )
                    }
                    label="Overview"
                />

                <TabButton
                    active={
                        activeTab === "website"
                    }
                    onClick={() =>
                        handleTabChange(
                            "website"
                        )
                    }
                    label="Website Analysis"
                />

                <TabButton
                    active={
                        activeTab === "marketing"
                    }
                    onClick={() => {

                        setActiveTab(
                            "marketing"
                        );

                        handleDigitalMarketing();

                    }}
                    label="Digital Marketing"
                />

            </div>

            {/* Overview */}

            {activeTab === "overview" && (

                <OverviewTab
                    business={business}
                />

            )}

            {/* Website Analysis */}

            {activeTab === "website" && (

                <WebsiteAnalysisTab
                    business={business}
                    websiteAnalysis={
                        websiteAnalysis
                    }
                    websiteLoading={
                        websiteLoading
                    }
                    onAnalyze={
                        handleWebsiteAnalysis
                    }
                />

            )}

            {/* Digital Marketing */}

            {activeTab === "marketing" && (

                <DigitalMarketingTab
                    business={business}
                    digitalMarketing={
                        digitalMarketing
                    }
                    marketingLoading={
                        marketingLoading
                    }
                    onAnalyze={
                        handleDigitalMarketing
                    }
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

function BusinessHero({ business }) {

    return (

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                <div className="min-w-0">

                    <span className="inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                        {business.category || "Business"}
                    </span>

                    <h1 className="mt-4 break-words text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {business.business_name || "Unnamed Business"}
                    </h1>

                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">

                        <div className="flex items-center gap-2 text-sm text-zinc-300">

                            <Star
                                size={18}
                                className="fill-yellow-400 text-yellow-400"
                            />

                            <span>
                                {business.google_rating ??
                                    "N/A"}
                            </span>

                        </div>

                        <div className="flex items-center gap-2 text-sm text-zinc-300">

                            <MessageSquare
                                size={18}
                            />

                            <span>
                                {business.review_count ??
                                    0}{" "}
                                Reviews
                            </span>

                        </div>

                    </div>

                </div>

                <div className="shrink-0">

                    <div
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                            business.website
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-zinc-800 text-zinc-400"
                        }`}
                    >

                        <Globe size={16} />

                        {business.website
                            ? "Website Available"
                            : "No Website"}

                    </div>

                </div>

            </div>

        </section>

    );

}

/*
|--------------------------------------------------------------------------
| Overview Tab
|--------------------------------------------------------------------------
*/

function OverviewTab({ business }) {

    return (

        <section className="space-y-6">

            <div>

                <h2 className="text-2xl font-semibold text-white">
                    Business Information
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                    General information collected from Google Maps and business enrichment.
                </p>

            </div>

            {/* Business Overview */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

                <div className="grid gap-8 lg:grid-cols-2">

                    <div>

                        <p className="text-sm font-medium text-zinc-500">
                            Address
                        </p>

                        <div className="mt-3 flex items-start gap-3">

                            <MapPin
                                size={20}
                                className="mt-1 shrink-0 text-violet-400"
                            />

                            <p className="break-words leading-7 text-zinc-200">
                                {business.address ||
                                    "Not Available"}
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <p className="text-sm font-medium text-zinc-500">
                                Rating
                            </p>

                            <div className="mt-3 flex items-center gap-2">

                                <Star
                                    size={20}
                                    className="fill-yellow-400 text-yellow-400"
                                />

                                <p className="text-2xl font-bold text-white">
                                    {business.google_rating ??
                                        "N/A"}
                                </p>

                            </div>

                        </div>

                        <div>

                            <p className="text-sm font-medium text-zinc-500">
                                Reviews
                            </p>

                            <p className="mt-3 text-2xl font-bold text-white">
                                {business.review_count ??
                                    0}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Contact + Social */}

            <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                    <h3 className="mb-2 text-xl font-semibold text-white">
                        Contact Information
                    </h3>

                    <p className="mb-4 text-sm text-zinc-500">
                        Available ways to contact this business.
                    </p>

                    <InfoRow
                        label="Website"
                        value={business.website}
                        link={business.website}
                    />

                    <InfoRow
                        label="Phone"
                        value={business.phone}
                    />

                    <InfoRow
                        label="Email"
                        value={business.email}
                    />

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                    <h3 className="mb-2 text-xl font-semibold text-white">
                        Social Presence
                    </h3>

                    <p className="mb-4 text-sm text-zinc-500">
                        Social profiles discovered for this business.
                    </p>

                    <InfoRow
                        label="Instagram"
                        value={business.instagram}
                        link={business.instagram}
                    />

                    <InfoRow
                        label="Facebook"
                        value={business.facebook}
                        link={business.facebook}
                    />

                    <InfoRow
                        label="LinkedIn"
                        value={business.linkedin}
                        link={business.linkedin}
                    />

                </div>

            </div>

            {/* Google Maps */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                <div className="flex items-start justify-between gap-4">

                    <div>

                        <h3 className="text-xl font-semibold text-white">
                            Google Maps
                        </h3>

                        <p className="mt-2 text-sm text-zinc-400">
                            Open this business directly in Google Maps.
                        </p>

                    </div>

                    <MapPin
                        size={22}
                        className="shrink-0 text-violet-400"
                    />

                </div>

                {business.google_maps_link ? (

                    <a
                        href={
                            business.google_maps_link
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500"
                    >
                        Open in Google Maps
                    </a>

                ) : (

                    <p className="mt-6 text-sm text-zinc-500">
                        Google Maps link not available.
                    </p>

                )}

            </div>

        </section>

    );

}

/*
|--------------------------------------------------------------------------
| Website Analysis Tab
|--------------------------------------------------------------------------
*/

function WebsiteAnalysisTab({
    business,
    websiteAnalysis,
    websiteLoading,
    onAnalyze,
}) {

    const hasGoogleMapsLink =
        Boolean(
            business.google_maps_link
        );

    const hasResult =
        Boolean(websiteAnalysis);

    const hasFailed =
        websiteAnalysis?.success === false;

    /*
    |--------------------------------------------------------------------------
    | Initial / Retry CTA
    |--------------------------------------------------------------------------
    */

    const showAnalysisPrompt =
        !hasResult &&
        !websiteLoading;

    return (

        <section className="space-y-6">

            {showAnalysisPrompt && (

                <AnalysisStartCard
                    title="Website Analysis"
                    description="Analyze this business website to detect technologies, performance, responsiveness, broken links, hosting and more."
                    buttonLabel={
                        hasGoogleMapsLink
                            ? "Analyze Website"
                            : "Website Analysis Unavailable"
                    }
                    disabled={
                        !hasGoogleMapsLink
                    }
                    onClick={onAnalyze}
                />

            )}

            {hasFailed &&
                !websiteLoading && (

                    <AnalysisStartCard
                        title="Website Analysis"
                        description="The previous website analysis could not be completed. You can retry the analysis."
                        buttonLabel={
                            hasGoogleMapsLink
                                ? "Retry Website Analysis"
                                : "Website Analysis Unavailable"
                        }
                        disabled={
                            !hasGoogleMapsLink
                        }
                        onClick={onAnalyze}
                    />

                )}

            <WebsiteAnalysis
                loading={websiteLoading}
                data={websiteAnalysis}
            />

        </section>

    );

}

/*
|--------------------------------------------------------------------------
| Digital Marketing Tab
|--------------------------------------------------------------------------
*/

function DigitalMarketingTab({
    business,
    digitalMarketing,
    marketingLoading,
    onAnalyze,
}) {

    const hasWebsite =
        Boolean(
            business.website
        );

    const showPrompt =
        !digitalMarketing &&
        !marketingLoading;

    return (

        <section className="space-y-6">

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
                />

            )}

            <DigitalMarketingAnalysis
                loading={marketingLoading}
                data={digitalMarketing}
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
}) {

    return (

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center sm:p-8">

            <h2 className="text-2xl font-semibold text-white">
                {title}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                {description}
            </p>

            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
            >
                {buttonLabel}
            </button>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Business Loading Skeleton
|--------------------------------------------------------------------------
*/

function BusinessDetailsSkeleton() {

    return (

        <div
            className="space-y-8"
            aria-busy="true"
            aria-label="Loading business details"
        >

            {/* Back */}

            <div className="h-5 w-32 animate-pulse rounded bg-zinc-800" />

            {/* Hero */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

                <div className="h-5 w-24 animate-pulse rounded bg-zinc-800" />

                <div className="mt-5 h-10 w-full max-w-xl animate-pulse rounded bg-zinc-800" />

                <div className="mt-6 flex gap-6">

                    <div className="h-5 w-20 animate-pulse rounded bg-zinc-800" />

                    <div className="h-5 w-28 animate-pulse rounded bg-zinc-800" />

                </div>

            </div>

            {/* Tabs */}

            <div className="h-14 animate-pulse rounded-2xl bg-zinc-900" />

            {/* Content */}

            <div className="space-y-6">

                <div className="h-8 w-64 animate-pulse rounded bg-zinc-800" />

                <div className="rounded-2xl bg-zinc-900 p-8">

                    <div className="grid gap-6 lg:grid-cols-2">

                        {Array.from({
                            length: 4,
                        }).map((_, index) => (

                            <div
                                key={index}
                                className="h-24 animate-pulse rounded-xl bg-zinc-800"
                            />

                        ))}

                    </div>

                </div>

                <div className="grid gap-6 lg:grid-cols-2">

                    {Array.from({
                        length: 2,
                    }).map((_, index) => (

                        <div
                            key={index}
                            className="h-52 animate-pulse rounded-2xl bg-zinc-900"
                        />

                    ))}

                </div>

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
}) {

    return (

        <button
            type="button"
            role="tab"
            aria-selected={active}
            onClick={onClick}
            className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                active
                    ? "bg-violet-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            }`}
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
}) {

    return (

        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 py-4 last:border-0">

            <span className="shrink-0 text-sm text-zinc-400">
                {label}
            </span>

            {!value ? (

                <span className="text-right text-sm text-zinc-500">
                    Not Available
                </span>

            ) : link ? (

                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-w-[65%] truncate text-right text-sm font-medium text-violet-400 transition hover:text-violet-300 hover:underline"
                    title={value}
                >
                    Visit
                </a>

            ) : (

                <span
                    className="max-w-[65%] truncate text-right text-sm font-medium text-zinc-200"
                    title={value}
                >
                    {value}
                </span>

            )}

        </div>

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

            code:
                "REQUEST_TIMEOUT",

        };

    }

    if (error?.message) {

        return {

            message:
                error.message,

            code:
                fallbackCode,

        };

    }

    return {

        message:
            fallbackMessage,

        code:
            fallbackCode,

    };

}

export default BusinessDetails;