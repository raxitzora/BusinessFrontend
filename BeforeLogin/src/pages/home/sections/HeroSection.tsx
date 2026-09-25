import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section className="relative flex min-h-[calc(100vh-78px)] items-center justify-center overflow-hidden bg-white px-6 pt-24">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">

                {/* Headline */}
                <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.02] tracking-[-0.06em] text-zinc-950 sm:text-5xl md:text-6xl lg:text-[72px]">
                    Turn local businesses into your next clients.
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-xl text-sm font-semibold leading-6 tracking-[-0.01em] text-zinc-600 sm:text-base sm:leading-7">
                    Discover businesses, analyze their websites and digital
                    presence, and find opportunities worth reaching out to.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">

                    <Link
                        to="/sign-in"
                        className="flex h-10 items-center justify-center rounded-lg bg-[#202126] px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 sm:h-11"
                    >
                        Start for free
                    </Link>

                    <Link
                        to="/customers"
                        className="flex h-10 items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 sm:h-11"
                    >
                        Talk to sales
                    </Link>

                </div>

            </div>
        </section>
    );
}

export default HeroSection;