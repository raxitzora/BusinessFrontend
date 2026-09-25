import {
    Loader2,
    MapPin,
    Search,
    X,
    Check,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

function SearchForm({
    keyword,
    location,
    loading,
    theme,
    onKeywordChange,
    onLocationChange,
    onSubmit,
    onCancel,
}) {
    const hasKeyword = keyword.trim().length > 0;
    const hasLocation = location.trim().length > 0;

    const isDark = theme === "dark";

    return (
        <section
            className={`
                border-b
                pb-8
                transition-colors
                duration-200
                ${
                    isDark
                        ? "border-[#242424]"
                        : "border-[#dedede]"
                }
            `}
        >
            {/* Header */}

            <div className="max-w-3xl">
                <h1
                    className={`
                        text-[28px]
                        font-semibold
                        leading-tight
                        tracking-[-0.035em]
                        transition-colors
                        duration-200
                        sm:text-[30px]
                        ${
                            isDark
                                ? "text-white"
                                : "text-[#151515]"
                        }
                    `}
                >
                    Search Businesses
                </h1>

                <p
                    className={`
                        mt-2
                        max-w-2xl
                        text-[14px]
                        leading-6
                        tracking-[-0.01em]
                        transition-colors
                        duration-200
                        ${
                            isDark
                                ? "text-[#888]"
                                : "text-[#6d6d6d]"
                        }
                    `}
                >
                    Discover local businesses by keyword and location.
                    Analyze potential clients and identify new business
                    opportunities.
                </p>
            </div>

            {/* Search guidance */}

            <div className="relative mt-7 mb-3 h-7">
                <AnimatePresence mode="wait">

                    {/* STEP 1 */}

                    {!hasKeyword && (
                        <motion.div
                            key="keyword-guide"
                            initial={{
                                opacity: 0,
                                x: -10,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: 30,
                            }}
                            transition={{
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute left-1 top-0 flex items-center gap-2 text-[12px] font-medium tracking-[-0.01em] text-blue-500"
                        >
                            <span
                                className={`
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    text-[10px]
                                    transition-colors
                                    duration-200
                                    ${
                                        isDark
                                            ? "border-[#2f3f55] bg-[#101a28] text-[#60a5fa]"
                                            : "border-blue-200 bg-blue-50 text-blue-600"
                                    }
                                `}
                            >
                                1
                            </span>

                            <span>
                                Search for a business
                            </span>
                        </motion.div>
                    )}

                    {/* STEP 2 */}

                    {hasKeyword && !hasLocation && (
                        <motion.div
                            key="location-guide"
                            initial={{
                                opacity: 0,
                                x: -35,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: 50,
                            }}
                            transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute left-[32%] top-0 flex items-center gap-2 text-[12px] font-medium tracking-[-0.01em] text-amber-500"
                        >
                            <span
                                className={`
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    text-[10px]
                                    transition-colors
                                    duration-200
                                    ${
                                        isDark
                                            ? "border-[#3a3422] bg-[#1c180d] text-[#fbbf24]"
                                            : "border-amber-200 bg-amber-50 text-amber-600"
                                    }
                                `}
                            >
                                2
                            </span>

                            <span>
                                Now add a location
                            </span>
                        </motion.div>
                    )}

                    {/* STEP 3 */}

                    {hasKeyword && hasLocation && !loading && (
                        <motion.div
                            key="search-guide"
                            initial={{
                                opacity: 0,
                                x: -35,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: 30,
                            }}
                            transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute right-[145px] top-0 flex items-center gap-2 text-[12px] font-medium tracking-[-0.01em] text-emerald-500"
                        >
                            <span
                                className={`
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    text-[10px]
                                    transition-colors
                                    duration-200
                                    ${
                                        isDark
                                            ? "border-[#263b30] bg-[#101a18] text-[#4ade80]"
                                            : "border-emerald-200 bg-emerald-50 text-emerald-600"
                                    }
                                `}
                            >
                                3
                            </span>

                            <span>
                                Click Search to discover leads
                            </span>
                        </motion.div>
                    )}

                    {/* SEARCHING */}

                    {loading && (
                        <motion.div
                            key="searching-guide"
                            initial={{
                                opacity: 0,
                                x: 20,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            className="absolute right-[145px] top-0 flex items-center gap-2 text-[12px] font-medium tracking-[-0.01em] text-blue-500"
                        >
                            <span
                                className={`
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    transition-colors
                                    duration-200
                                    ${
                                        isDark
                                            ? "border-[#2f3f55] bg-[#101a28]"
                                            : "border-blue-200 bg-blue-50"
                                    }
                                `}
                            >
                                <Loader2
                                    size={11}
                                    strokeWidth={2}
                                    className={
                                        isDark
                                            ? "animate-spin text-[#60a5fa]"
                                            : "animate-spin text-blue-500"
                                    }
                                />
                            </span>

                            <span>
                                Finding businesses...
                            </span>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Search form */}

            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-2.5 lg:flex-row"
            >

                {/* Keyword */}

                <div
                    className={`
                        group
                        flex
                        h-12
                        min-w-0
                        flex-1
                        items-center
                        rounded-[9px]
                        border
                        shadow-[0_0_0_0_rgba(0,0,0,0)]
                        transition-all
                        duration-200
                        ease-out
                        hover:scale-[1.005]
                        focus-within:scale-[1.015]
                        ${
                            isDark
                                ? `
                                    border-[#2a2a2a]
                                    bg-[#111111]
                                    hover:border-[#414141]
                                    hover:bg-[#131313]
                                    focus-within:border-[#5a5a5a]
                                    focus-within:bg-[#161616]
                                    focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(255,255,255,0.035)]
                                `
                                : `
                                    border-[#d9d9d9]
                                    bg-white
                                    hover:border-[#c8c8c8]
                                    hover:bg-[#ffffff]
                                    focus-within:border-[#a8a8a8]
                                    focus-within:bg-white
                                    focus-within:shadow-[0_0_0_1px_rgba(0,0,0,0.035),0_8px_25px_rgba(0,0,0,0.08)]
                                `
                        }
                    `}
                >
                    <Search
                        size={18}
                        strokeWidth={1.8}
                        className={`
                            ml-4
                            shrink-0
                            transition-all
                            duration-200
                            ease-out
                            group-hover:scale-105
                            group-focus-within:scale-110
                            ${
                                isDark
                                    ? "text-[#777] group-hover:text-[#aaa] group-focus-within:text-white"
                                    : "text-[#888] group-hover:text-[#555] group-focus-within:text-[#222]"
                            }
                        `}
                    />

                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) =>
                            onKeywordChange(e.target.value)
                        }
                        placeholder="Search businesses..."
                        autoComplete="off"
                        spellCheck={false}
                        className={`
                            h-full
                            min-w-0
                            w-full
                            bg-transparent
                            px-3
                            text-[14px]
                            font-medium
                            tracking-[-0.01em]
                            outline-none
                            transition-colors
                            duration-200
                            ${
                                isDark
                                    ? "text-white caret-white placeholder:text-[#666] focus:placeholder:text-[#555] selection:bg-white/20"
                                    : "text-[#171717] caret-[#171717] placeholder:text-[#999] focus:placeholder:text-[#777] selection:bg-black/10"
                            }
                        `}
                    />

                    {/* Keyword complete */}

                    <AnimatePresence>
                        {hasKeyword && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`
                                    mr-3
                                    flex
                                    h-5
                                    w-5
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    ${
                                        isDark
                                            ? "border-[#263b30] bg-[#101a18] text-[#4ade80]"
                                            : "border-emerald-200 bg-emerald-50 text-emerald-600"
                                    }
                                `}
                            >
                                <Check
                                    size={12}
                                    strokeWidth={2}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Location */}

                <div
                    className={`
                        group
                        flex
                        h-12
                        min-w-0
                        flex-1
                        items-center
                        rounded-[9px]
                        border
                        shadow-[0_0_0_0_rgba(0,0,0,0)]
                        transition-all
                        duration-200
                        ease-out
                        hover:scale-[1.005]
                        focus-within:scale-[1.015]
                        ${
                            isDark
                                ? `
                                    border-[#2a2a2a]
                                    bg-[#111111]
                                    hover:border-[#414141]
                                    hover:bg-[#131313]
                                    focus-within:border-[#5a5a5a]
                                    focus-within:bg-[#161616]
                                    focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(255,255,255,0.035)]
                                `
                                : `
                                    border-[#d9d9d9]
                                    bg-white
                                    hover:border-[#c8c8c8]
                                    hover:bg-[#ffffff]
                                    focus-within:border-[#a8a8a8]
                                    focus-within:bg-white
                                    focus-within:shadow-[0_0_0_1px_rgba(0,0,0,0.035),0_8px_25px_rgba(0,0,0,0.08)]
                                `
                        }
                    `}
                >
                    <MapPin
                        size={18}
                        strokeWidth={1.8}
                        className={`
                            ml-4
                            shrink-0
                            transition-all
                            duration-200
                            ease-out
                            group-hover:scale-105
                            group-focus-within:scale-110
                            ${
                                isDark
                                    ? "text-[#777] group-hover:text-[#aaa] group-focus-within:text-white"
                                    : "text-[#888] group-hover:text-[#555] group-focus-within:text-[#222]"
                            }
                        `}
                    />

                    <input
                        type="text"
                        value={location}
                        onChange={(e) =>
                            onLocationChange(e.target.value)
                        }
                        placeholder="City or location..."
                        autoComplete="off"
                        spellCheck={false}
                        className={`
                            h-full
                            min-w-0
                            w-full
                            bg-transparent
                            px-3
                            text-[14px]
                            font-medium
                            tracking-[-0.01em]
                            outline-none
                            transition-colors
                            duration-200
                            ${
                                isDark
                                    ? "text-white caret-white placeholder:text-[#666] focus:placeholder:text-[#555] selection:bg-white/20"
                                    : "text-[#171717] caret-[#171717] placeholder:text-[#999] focus:placeholder:text-[#777] selection:bg-black/10"
                            }
                        `}
                    />

                    {/* Location complete */}

                    <AnimatePresence>
                        {hasLocation && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className={`
                                    mr-3
                                    flex
                                    h-5
                                    w-5
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    ${
                                        isDark
                                            ? "border-[#263b30] bg-[#101a18] text-[#4ade80]"
                                            : "border-emerald-200 bg-emerald-50 text-emerald-600"
                                    }
                                `}
                            >
                                <Check
                                    size={12}
                                    strokeWidth={2}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Actions */}

                <div className="flex shrink-0 gap-2">

                    {/* Search */}

                    <button
                        type="submit"
                        disabled={
                            loading ||
                            !keyword.trim() ||
                            !location.trim()
                        }
                        className={`
                            flex
                            h-12
                            items-center
                            justify-center
                            gap-2
                            rounded-[9px]
                            px-6
                            text-[14px]
                            font-medium
                            tracking-[-0.01em]
                            shadow-[0_1px_2px_rgba(0,0,0,0.12)]
                            transition-all
                            duration-200
                            ease-out
                            hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:shadow-none
                            disabled:active:scale-100
                            lg:min-w-[128px]
                            ${
                                isDark
                                    ? `
                                        bg-white
                                        text-black
                                        hover:bg-[#e8e8e8]
                                        disabled:bg-[#242424]
                                        disabled:text-[#666]
                                    `
                                    : `
                                        border
                                        border-[#151515]
                                        bg-[#171717]
                                        text-white
                                        hover:bg-[#252525]
                                        disabled:border-[#d9d9d9]
                                        disabled:bg-[#e7e7e7]
                                        disabled:text-[#999]
                                    `
                            }
                        `}
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    size={17}
                                    strokeWidth={2}
                                    className="animate-spin"
                                />

                                <span>
                                    Searching
                                </span>
                            </>
                        ) : (
                            <>
                                <Search
                                    size={17}
                                    strokeWidth={1.9}
                                />

                                <span>
                                    Search
                                </span>
                            </>
                        )}
                    </button>

                    {/* Cancel */}

                    {loading && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className={`
                                flex
                                h-12
                                items-center
                                justify-center
                                gap-2
                                rounded-[9px]
                                border
                                px-5
                                text-[14px]
                                font-medium
                                shadow-[0_1px_2px_rgba(0,0,0,0.08)]
                                transition-all
                                duration-150
                                ease-out
                                active:scale-[0.98]
                                ${
                                    isDark
                                        ? `
                                            border-[#303030]
                                            bg-[#181818]
                                            text-[#b5b5b5]
                                            hover:border-red-500/30
                                            hover:bg-red-500/[0.08]
                                            hover:text-red-400
                                            hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]
                                        `
                                        : `
                                            border-[#d5d5d5]
                                            bg-white
                                            text-[#666]
                                            hover:border-red-200
                                            hover:bg-red-50
                                            hover:text-red-500
                                            hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                                        `
                                }
                            `}
                        >
                            <X
                                size={16}
                                strokeWidth={1.8}
                            />

                            <span>
                                Cancel
                            </span>
                        </button>
                    )}

                </div>
            </form>
        </section>
    );
}

export default SearchForm;