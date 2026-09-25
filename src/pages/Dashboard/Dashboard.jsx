import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getProfile,
    getUserServices,
} from "../../services/user.service";

import {
    ArrowRight,
    BriefcaseBusiness,
    Check,
    Coins,
    Search,
    Settings2,
    Sparkles,
} from "lucide-react";

function Dashboard() {
    const { user } = useUser();

    const profileQuery = useQuery({
        queryKey: ["user", "profile", user?.id],
        queryFn: getProfile,
        enabled: !!user,
    });

    const servicesQuery = useQuery({
        queryKey: ["user", "services", user?.id],
        queryFn: getUserServices,
        enabled: !!user,
    });

    const profile = profileQuery.data?.user ?? null;
    const services = servicesQuery.data?.services ?? [];

    const loading =
        profileQuery.isPending ||
        servicesQuery.isPending;

    const error =
        profileQuery.isError ||
        servicesQuery.isError;

    if (error) {
        toast.error("Failed to load dashboard.");
    }

    if (loading) {
        return (
            <div className="space-y-8">
                {/* Header Skeleton */}
                <div>
                    <div className="h-8 w-72 animate-pulse rounded-lg bg-[#1b1b1b]" />
                    <div className="mt-3 h-4 w-[420px] max-w-full animate-pulse rounded bg-[#171717]" />
                </div>

                {/* Stats Skeleton */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="h-[150px] animate-pulse rounded-[12px] border border-[#242424] bg-[#0d0d0d]" />

                    <div className="h-[150px] animate-pulse rounded-[12px] border border-[#242424] bg-[#0d0d0d]" />
                </div>

                {/* Actions Skeleton */}
                <div className="h-[150px] animate-pulse rounded-[12px] border border-[#242424] bg-[#0d0d0d]" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <section className="border-b border-[#242424] pb-7">
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#2b3542] bg-[#111a25]">
                                <Sparkles
                                    size={18}
                                    strokeWidth={1.8}
                                    className="text-blue-400"
                                />
                            </div>

                            <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[30px]">
                                Welcome, {profile?.full_name} 👋
                            </h1>
                        </div>

                        <p className="mt-3 max-w-2xl text-[14px] leading-6 tracking-[-0.01em] text-[#858585]">
                            Manage your services and start generating new
                            business leads.
                        </p>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="grid gap-4 md:grid-cols-2">
                {/* Credits */}
                <div className="group relative overflow-hidden rounded-[12px] border border-[#242424] bg-[#0d0d0d] p-6 transition-colors duration-200 hover:border-[#303030] hover:bg-[#101010]">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-amber-500/15 bg-amber-500/[0.06]">
                                    <Coins
                                        size={16}
                                        strokeWidth={1.8}
                                        className="text-amber-400"
                                    />
                                </div>

                                <h2 className="text-[13px] font-medium text-[#999]">
                                    Available Credits
                                </h2>
                            </div>

                            <p className="mt-5 text-[36px] font-semibold leading-none tracking-[-0.04em] text-white">
                                {profile?.credits ?? 0}
                            </p>

                            <p className="mt-2 text-[12px] text-[#555]">
                                Credits available for lead generation
                            </p>
                        </div>

                        <div className="rounded-full border border-amber-500/15 bg-amber-500/[0.05] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-amber-400">
                            Balance
                        </div>
                    </div>
                </div>

                {/* Services Count */}
                <div className="group rounded-[12px] border border-[#242424] bg-[#0d0d0d] p-6 transition-colors duration-200 hover:border-[#303030] hover:bg-[#101010]">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-blue-500/15 bg-blue-500/[0.06]">
                                    <BriefcaseBusiness
                                        size={16}
                                        strokeWidth={1.8}
                                        className="text-blue-400"
                                    />
                                </div>

                                <h2 className="text-[13px] font-medium text-[#999]">
                                    Selected Services
                                </h2>
                            </div>

                            <p className="mt-5 text-[36px] font-semibold leading-none tracking-[-0.04em] text-white">
                                {services.length}
                            </p>

                            <p className="mt-2 text-[12px] text-[#555]">
                                Services currently configured
                            </p>
                        </div>

                        <div className="rounded-full border border-blue-500/15 bg-blue-500/[0.05] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-blue-400">
                            Active
                        </div>
                    </div>
                </div>
            </section>

            {/* Selected Services */}
            <section className="rounded-[12px] border border-[#242424] bg-[#0d0d0d]">
                <div className="border-b border-[#242424] px-6 py-5">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <Settings2
                                    size={17}
                                    strokeWidth={1.8}
                                    className="text-[#888]"
                                />

                                <h2 className="text-[15px] font-semibold tracking-[-0.015em] text-white">
                                    Selected Services
                                </h2>
                            </div>

                            <p className="mt-1.5 text-[12px] text-[#666]">
                                Services configured for your lead generation
                                workflow.
                            </p>
                        </div>

                        {services.length > 0 && (
                            <span className="rounded-full border border-[#2c2c2c] bg-[#151515] px-2.5 py-1 text-[11px] font-medium text-[#999]">
                                {services.length}
                            </span>
                        )}
                    </div>
                </div>

                <div className="p-6">
                    {services.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-[9px] border border-dashed border-[#292929] bg-[#101010] px-6 py-10 text-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-[9px] border border-[#2b2b2b] bg-[#171717]">
                                <BriefcaseBusiness
                                    size={17}
                                    strokeWidth={1.7}
                                    className="text-[#777]"
                                />
                            </div>

                            <p className="mt-4 text-[13px] font-medium text-[#bbb]">
                                No services selected
                            </p>

                            <p className="mt-1 max-w-sm text-[12px] leading-5 text-[#555]">
                                Configure your services to help tailor your
                                lead generation workflow.
                            </p>

                            <Link
                                to="/app/services"
                                className="mt-5 inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#303030] bg-[#181818] px-3.5 text-[12px] font-medium text-[#c0c0c0] transition-all duration-150 hover:border-[#444] hover:bg-[#202020] hover:text-white active:scale-[0.98]"
                            >
                                <Settings2
                                    size={14}
                                    strokeWidth={1.8}
                                />
                                Configure Services
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2.5">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="group flex items-center gap-2 rounded-[8px] border border-[#2a2a2a] bg-[#151515] px-3 py-2 transition-colors duration-150 hover:border-[#383838] hover:bg-[#191919]"
                                >
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500/15 bg-emerald-500/[0.06]">
                                        <Check
                                            size={11}
                                            strokeWidth={2}
                                            className="text-emerald-400"
                                        />
                                    </div>

                                    <span className="text-[12px] font-medium text-[#c5c5c5] group-hover:text-white">
                                        {service.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Quick Actions */}
            <section>
                <div className="mb-4">
                    <h2 className="text-[15px] font-semibold tracking-[-0.015em] text-white">
                        Quick Actions
                    </h2>

                    <p className="mt-1.5 text-[12px] text-[#666]">
                        Jump directly into your lead generation workflow.
                    </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    {/* Search Businesses */}
                    <Link
                        to="/app/search"
                        className="group flex items-center justify-between rounded-[10px] border border-[#292929] bg-[#111111] p-4 transition-all duration-200 hover:border-[#3b4655] hover:bg-[#15191e] active:scale-[0.99]"
                    >
                        <div className="flex items-center gap-3.5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-[9px] border border-blue-500/15 bg-blue-500/[0.06] transition-transform duration-200 group-hover:scale-105">
                                <Search
                                    size={17}
                                    strokeWidth={1.8}
                                    className="text-blue-400"
                                />
                            </div>

                            <div>
                                <p className="text-[13px] font-medium text-white">
                                    Search Businesses
                                </p>

                                <p className="mt-1 text-[11px] text-[#5f5f5f]">
                                    Discover new potential clients
                                </p>
                            </div>
                        </div>

                        <ArrowRight
                            size={16}
                            strokeWidth={1.8}
                            className="text-[#555] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-blue-400"
                        />
                    </Link>

                    {/* Manage Services */}
                    <Link
                        to="/app/services"
                        className="group flex items-center justify-between rounded-[10px] border border-[#292929] bg-[#111111] p-4 transition-all duration-200 hover:border-[#3b3b3b] hover:bg-[#151515] active:scale-[0.99]"
                    >
                        <div className="flex items-center gap-3.5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-[9px] border border-amber-500/15 bg-amber-500/[0.06] transition-transform duration-200 group-hover:scale-105">
                                <Settings2
                                    size={17}
                                    strokeWidth={1.8}
                                    className="text-amber-400"
                                />
                            </div>

                            <div>
                                <p className="text-[13px] font-medium text-white">
                                    Manage Services
                                </p>

                                <p className="mt-1 text-[11px] text-[#5f5f5f]">
                                    Configure your business services
                                </p>
                            </div>
                        </div>

                        <ArrowRight
                            size={16}
                            strokeWidth={1.8}
                            className="text-[#555] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-amber-400"
                        />
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;