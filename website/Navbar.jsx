import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50">

            {/* Navbar */}

            <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">

                <nav className="flex h-16 items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950/85 px-4 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-6">

                    {/* Logo */}

                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="flex items-center gap-2"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-zinc-950">
                            L
                        </div>

                        <span className="text-lg font-semibold tracking-tight text-white">
                            LeadFlow
                            <span className="text-zinc-500"> AI</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}

                    <div className="hidden items-center gap-8 md:flex">

                        <a
                            href="#features"
                            className="text-sm text-zinc-400 transition-colors hover:text-white"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            className="text-sm text-zinc-400 transition-colors hover:text-white"
                        >
                            How It Works
                        </a>

                        <a
                            href="#product"
                            className="text-sm text-zinc-400 transition-colors hover:text-white"
                        >
                            Product
                        </a>

                        <a
                            href="#pricing"
                            className="text-sm text-zinc-400 transition-colors hover:text-white"
                        >
                            Pricing
                        </a>

                    </div>

                    {/* Desktop Actions */}

                    <div className="hidden items-center gap-3 md:flex">

                        <Link
                            to="/sign-in"
                            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                        >
                            Sign In
                        </Link>

                        <Link
                            to="/sign-up"
                            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200"
                        >
                            Start Free
                        </Link>

                    </div>

                    {/* Mobile Menu Button */}

                    <button
                        type="button"
                        onClick={() => setIsOpen((previous) => !previous)}
                        className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white md:hidden"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? (
                            <X size={21} />
                        ) : (
                            <Menu size={21} />
                        )}
                    </button>

                </nav>

                {/* Mobile Navigation */}

                {isOpen && (
                    <div className="mt-2 rounded-2xl border border-zinc-800/80 bg-zinc-950/95 p-3 shadow-xl shadow-black/20 backdrop-blur-xl md:hidden">

                        <div className="flex flex-col">

                            <a
                                href="#features"
                                onClick={closeMenu}
                                className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
                            >
                                Features
                            </a>

                            <a
                                href="#how-it-works"
                                onClick={closeMenu}
                                className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
                            >
                                How It Works
                            </a>

                            <a
                                href="#product"
                                onClick={closeMenu}
                                className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
                            >
                                Product
                            </a>

                            <a
                                href="#pricing"
                                onClick={closeMenu}
                                className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
                            >
                                Pricing
                            </a>

                            <div className="my-2 h-px bg-zinc-800" />

                            <Link
                                to="/sign-in"
                                onClick={closeMenu}
                                className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white"
                            >
                                Sign In
                            </Link>

                            <Link
                                to="/sign-up"
                                onClick={closeMenu}
                                className="mt-1 rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                            >
                                Start Free
                            </Link>

                        </div>

                    </div>
                )}

            </div>

        </header>
    );
}

export default Navbar;