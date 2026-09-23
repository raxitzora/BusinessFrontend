import { ArrowUpRight } from "lucide-react";
import {
    FaGithub,
    FaLinkedinIn,
    FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";


function Footer() {
    return (
        <footer className="border-t border-zinc-900 bg-zinc-950">

            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

                {/* Top */}

                <div className="flex flex-col justify-between gap-10 md:flex-row">

                    {/* Brand */}

                    <div className="max-w-sm">

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-zinc-950">
                                L
                            </div>

                            <span className="text-lg font-semibold tracking-tight text-white">
                                LeadFlow
                                <span className="text-zinc-500"> AI</span>
                            </span>
                        </Link>

                        <p className="mt-4 text-sm leading-6 text-zinc-500">
                            Discover businesses that need your services,
                            enrich your leads, and build a better prospecting
                            workflow.
                        </p>

                    </div>

                    {/* Links */}

                    <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">

                        {/* Product */}

                        <div>

                            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Product
                            </h3>

                            <ul className="mt-4 space-y-3">

                                <li>
                                    <a
                                        href="#features"
                                        className="text-sm text-zinc-500 transition-colors hover:text-white"
                                    >
                                        Features
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#product"
                                        className="text-sm text-zinc-500 transition-colors hover:text-white"
                                    >
                                        Product
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#pricing"
                                        className="text-sm text-zinc-500 transition-colors hover:text-white"
                                    >
                                        Pricing
                                    </a>
                                </li>

                            </ul>

                        </div>

                        {/* Company */}

                        <div>

                            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Company
                            </h3>

                            <ul className="mt-4 space-y-3">

                                <li>
                                    <a
                                        href="#features"
                                        className="text-sm text-zinc-500 transition-colors hover:text-white"
                                    >
                                        About
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#product"
                                        className="text-sm text-zinc-500 transition-colors hover:text-white"
                                    >
                                        How It Works
                                    </a>
                                </li>

                            </ul>

                        </div>

                        {/* Account */}

                        <div>

                            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Account
                            </h3>

                            <ul className="mt-4 space-y-3">

                                <li>
                                    <Link
                                        to="/sign-in"
                                        className="text-sm text-zinc-500 transition-colors hover:text-white"
                                    >
                                        Sign In
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/sign-up"
                                        className="inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-white"
                                    >
                                        Start Free
                                        <ArrowUpRight size={13} />
                                    </Link>
                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

                {/* Divider */}

                <div className="my-10 h-px bg-zinc-900" />

                {/* Bottom */}

                <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

                    <p className="text-xs text-zinc-600">
                        © 2026 LeadFlow AI. All rights reserved.
                    </p>

                    {/* Social */}

                  {/* Social */}

<div className="flex items-center gap-2">

    <a
        href="https://x.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LeadFlow AI on X"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-all duration-200 hover:bg-zinc-900 hover:text-white"
    >
        <FaXTwitter size={15} />
    </a>

    <a
        href="https://github.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LeadFlow AI on GitHub"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-all duration-200 hover:bg-zinc-900 hover:text-white"
    >
        <FaGithub size={16} />
    </a>

    <a
        href="https://linkedin.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LeadFlow AI on LinkedIn"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-all duration-200 hover:bg-zinc-900 hover:text-white"
    >
        <FaLinkedinIn size={15} />
    </a>

</div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;