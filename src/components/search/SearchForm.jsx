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
    onKeywordChange,
    onLocationChange,
    onSubmit,
    onCancel,
}) {
    const hasKeyword = keyword.trim().length > 0;
    const hasLocation = location.trim().length > 0;

    return (
        <section className="border-b border-[#242424] pb-8">
            {/* Header */}
            <div className="max-w-3xl">
                <h1
                    className="
                        text-[28px]
                        font-semibold
                        leading-tight
                        tracking-[-0.035em]
                        text-white
                        sm:text-[30px]
                    "
                >
                    Search Businesses
                </h1>

                <p
                    className="
                        mt-2
                        max-w-2xl
                        text-[14px]
                        leading-6
                        tracking-[-0.01em]
                        text-[#888]
                    "
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
                            className="
                                absolute
                                left-1
                                top-0
                                flex
                                items-center
                                gap-2
                                text-[12px]
                                font-medium
                                tracking-[-0.01em]
                                text-[#60a5fa]
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#2f3f55]
                                    bg-[#101a28]
                                    text-[10px]
                                    text-[#60a5fa]
                                "
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
                            className="
                                absolute
                                left-[32%]
                                top-0
                                flex
                                items-center
                                gap-2
                                text-[12px]
                                font-medium
                                tracking-[-0.01em]
                                text-[#fbbf24]
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#3a3422]
                                    bg-[#1c180d]
                                    text-[10px]
                                    text-[#fbbf24]
                                "
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
                            className="
                                absolute
                                right-[145px]
                                top-0
                                flex
                                items-center
                                gap-2
                                text-[12px]
                                font-medium
                                tracking-[-0.01em]
                                text-[#4ade80]
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#263b30]
                                    bg-[#101a18]
                                    text-[10px]
                                    text-[#4ade80]
                                "
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
                            className="
                                absolute
                                right-[145px]
                                top-0
                                flex
                                items-center
                                gap-2
                                text-[12px]
                                font-medium
                                tracking-[-0.01em]
                                text-[#60a5fa]
                            "
                        >
                            <span
                                className="
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#2f3f55]
                                    bg-[#101a28]
                                "
                            >
                                <Loader2
                                    size={11}
                                    strokeWidth={2}
                                    className="
                                        animate-spin
                                        text-[#60a5fa]
                                    "
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
                className="
                    flex
                    flex-col
                    gap-2.5
                    lg:flex-row
                "
            >
                {/* Keyword */}
                <div
                    className="
                        group
                        flex
                        h-12
                        min-w-0
                        flex-1
                        items-center
                        rounded-[9px]
                        border
                        border-[#2a2a2a]
                        bg-[#111111]
                        shadow-[0_0_0_0_rgba(255,255,255,0)]
                        transition-all
                        duration-200
                        ease-out
                        hover:border-[#414141]
                        hover:bg-[#131313]
                        focus-within:scale-[1.015]
                        focus-within:border-[#5a5a5a]
                        focus-within:bg-[#161616]
                        focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(255,255,255,0.035)]
                    "
                >
                    <Search
                        size={18}
                        strokeWidth={1.8}
                        className="
                            ml-4
                            shrink-0
                            text-[#777]
                            transition-all
                            duration-200
                            ease-out
                            group-hover:text-[#aaa]
                            group-focus-within:scale-110
                            group-focus-within:text-white
                        "
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
                        className="
                            h-full
                            min-w-0
                            w-full
                            bg-transparent
                            px-3
                            text-[14px]
                            font-medium
                            tracking-[-0.01em]
                            text-white
                            outline-none
                            caret-white
                            placeholder:text-[#666]
                            placeholder:transition-colors
                            placeholder:duration-200
                            focus:placeholder:text-[#555]
                            selection:bg-white/20
                        "
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
                                className="
                                    mr-3
                                    flex
                                    h-5
                                    w-5
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#263b30]
                                    bg-[#101a18]
                                    text-[#4ade80]
                                "
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
                    className="
                        group
                        flex
                        h-12
                        min-w-0
                        flex-1
                        items-center
                        rounded-[9px]
                        border
                        border-[#2a2a2a]
                        bg-[#111111]
                        shadow-[0_0_0_0_rgba(255,255,255,0)]
                        transition-all
                        duration-200
                        ease-out
                        hover:border-[#414141]
                        hover:bg-[#131313]
                        focus-within:scale-[1.015]
                        focus-within:border-[#5a5a5a]
                        focus-within:bg-[#161616]
                        focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(255,255,255,0.035)]
                    "
                >
                    <MapPin
                        size={18}
                        strokeWidth={1.8}
                        className="
                            ml-4
                            shrink-0
                            text-[#777]
                            transition-all
                            duration-200
                            ease-out
                            group-hover:text-[#aaa]
                            group-focus-within:scale-110
                            group-focus-within:text-white
                        "
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
                        className="
                            h-full
                            min-w-0
                            w-full
                            bg-transparent
                            px-3
                            text-[14px]
                            font-medium
                            tracking-[-0.01em]
                            text-white
                            outline-none
                            caret-white
                            placeholder:text-[#666]
                            placeholder:transition-colors
                            placeholder:duration-200
                            focus:placeholder:text-[#555]
                            selection:bg-white/20
                        "
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
                                className="
                                    mr-3
                                    flex
                                    h-5
                                    w-5
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#263b30]
                                    bg-[#101a18]
                                    text-[#4ade80]
                                "
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
                        className="
                            flex
                            h-12
                            items-center
                            justify-center
                            gap-2
                            rounded-[9px]
                            bg-white
                            px-6
                            text-[14px]
                            font-medium
                            tracking-[-0.01em]
                            text-black
                            shadow-[0_1px_2px_rgba(0,0,0,0.2)]
                            transition-all
                            duration-200
                            ease-out
                            hover:bg-[#e8e8e8]
                            hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:bg-[#242424]
                            disabled:text-[#666]
                            disabled:shadow-none
                            disabled:active:scale-100
                            lg:min-w-[128px]
                        "
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
                            className="
                                flex
                                h-12
                                items-center
                                justify-center
                                gap-2
                                rounded-[9px]
                                border
                                border-[#303030]
                                bg-[#181818]
                                px-5
                                text-[14px]
                                font-medium
                                text-[#b5b5b5]
                                shadow-[0_1px_2px_rgba(0,0,0,0.2)]
                                transition-all
                                duration-150
                                ease-out
                                hover:border-red-500/30
                                hover:bg-red-500/[0.08]
                                hover:text-red-400
                                hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]
                                active:scale-[0.98]
                            "
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