function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#08090d]">
            <div className="relative flex h-40 w-40 items-center justify-center">

                {/* Outer radar ring */}
                <div className="absolute h-32 w-32 animate-[spin_5s_linear_infinite] rounded-full border border-cyan-400/20 border-t-cyan-400/80" />

                {/* Second ring */}
                <div className="absolute h-24 w-24 rounded-full border border-violet-400/20" />

                {/* Radar sweep */}
                <div
                    className="absolute h-32 w-32 animate-[spin_2s_linear_infinite] rounded-full"
                    style={{
                        background:
                            "conic-gradient(from 0deg, transparent 0deg, rgba(34,211,238,0.35) 35deg, transparent 70deg)",
                    }}
                />

                {/* Connection lines */}
                <div className="absolute h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

                <div className="absolute h-32 w-px bg-gradient-to-b from-transparent via-violet-400/30 to-transparent" />

                {/* Lead nodes */}
                <div className="absolute left-3 top-10 h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />

                <div className="absolute right-4 top-20 h-2 w-2 animate-pulse rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.9)] [animation-delay:500ms]" />

                <div className="absolute bottom-7 left-12 h-1.5 w-1.5 animate-pulse rounded-full bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.9)] [animation-delay:800ms]" />

                <div className="absolute right-9 bottom-10 h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)] [animation-delay:1200ms]" />

                {/* Center */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/40 bg-[#0c1118] shadow-[0_0_35px_rgba(34,211,238,0.18)]">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 shadow-[0_0_20px_rgba(139,92,246,0.9)]" />
                </div>
            </div>

            {/* Brand */}
            <div className="absolute bottom-12 text-center">
                <div className="text-sm font-semibold tracking-[0.25em] text-zinc-200">
                    LEADFLOW
                </div>

                <div className="mt-2 text-[10px] tracking-[0.18em] text-zinc-600">
                    DISCOVERING OPPORTUNITIES
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen;