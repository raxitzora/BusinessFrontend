import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-t border-zinc-950 bg-white">
            <nav className="mx-auto flex h-[72px] w-full items-center justify-between px-4 sm:px-6 lg:h-[78px] lg:px-8 xl:px-10">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex shrink-0 items-center gap-2"
                >
                    <div className="relative flex h-7 w-7 items-center justify-center sm:h-8 sm:w-8">
                        <div className="absolute left-[3px] top-[3px] h-[20px] w-[10px] -skew-x-[28deg] rounded-[2px] bg-zinc-950 sm:h-[22px] sm:w-[11px]" />

                        <div className="absolute bottom-[3px] right-[3px] h-[14px] w-[10px] -skew-x-[28deg] rounded-[2px] bg-zinc-950 sm:h-[15px] sm:w-[10px]" />

                        <div className="absolute left-[11px] top-[11px] h-[8px] w-[6px] -skew-x-[28deg] rounded-[1px] bg-white sm:left-[12px] sm:top-[12px]" />
                    </div>

                    <span className="text-[21px] font-semibold leading-none tracking-[-1px] text-zinc-950 sm:text-[23px]">
                        LeadFlow
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-6 md:flex lg:gap-8 xl:gap-9">

                    <Link
                        to="/platform"
                        className="group flex items-center gap-1.5 text-[15px] font-medium tracking-[-0.2px] text-zinc-800 transition-colors hover:text-zinc-500 lg:text-[16px]"
                    >
                        Platform

                        <ChevronDown
                            size={15}
                            strokeWidth={2}
                            className="transition-transform duration-200 group-hover:translate-y-0.5"
                        />
                    </Link>

                    <Link
                        to="/customers"
                        className="text-[15px] font-medium tracking-[-0.2px] text-zinc-800 transition-colors hover:text-zinc-500 lg:text-[16px]"
                    >
                        Customers
                    </Link>

                    <Link
                        to="/pricing"
                        className="text-[15px] font-medium tracking-[-0.2px] text-zinc-800 transition-colors hover:text-zinc-500 lg:text-[16px]"
                    >
                        Pricing
                    </Link>
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-2.5 md:flex">

                    <Link
                        to="/sign-in"
                        className="flex h-10 items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 text-[15px] font-medium tracking-[-0.2px] text-zinc-800 transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-50 lg:h-11 lg:px-4.5 lg:text-[16px]"
                    >
                        Sign in
                    </Link>

                    <Link
                        to="/sign-in"
                        className="flex h-10 items-center justify-center rounded-xl bg-[#202126] px-4.5 text-[15px] font-semibold tracking-[-0.3px] text-white transition-all duration-200 hover:bg-zinc-800 lg:h-11 lg:px-5 lg:text-[16px]"
                    >
                        Start for free
                    </Link>
                </div>

                {/* Mobile */}
                <div className="flex md:hidden">
                    <Link
                        to="/sign-in"
                        className="flex h-9 items-center justify-center rounded-lg bg-[#202126] px-3.5 text-[13px] font-semibold tracking-[-0.1px] text-white transition-colors hover:bg-zinc-800 sm:h-10 sm:px-4 sm:text-[14px]"
                    >
                        Start for free
                    </Link>
                </div>

            </nav>
        </header>
    );
}

export default Navbar;