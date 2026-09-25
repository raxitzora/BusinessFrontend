import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

function SearchPagination({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    theme = "dark",
}) {
    const isDark = theme === "dark";

    /*
    |--------------------------------------------------------------------------
    | Nothing to paginate
    |--------------------------------------------------------------------------
    */

    if (!totalPages || totalPages <= 1) {
        return null;
    }

    /*
    |--------------------------------------------------------------------------
    | Page Change
    |--------------------------------------------------------------------------
    */

    const handlePageChange = (page) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        onPageChange(page);
    };

    /*
    |--------------------------------------------------------------------------
    | Generate Visible Pages
    |--------------------------------------------------------------------------
    */

    const getVisiblePages = () => {
        const pages = [];

        /*
        |----------------------------------------------------------------------
        | Small number of pages
        |----------------------------------------------------------------------
        */

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;
        }

        /*
        |----------------------------------------------------------------------
        | Near beginning
        |----------------------------------------------------------------------
        */

        if (currentPage <= 4) {
            return [
                1,
                2,
                3,
                4,
                5,
                "...",
                totalPages,
            ];
        }

        /*
        |----------------------------------------------------------------------
        | Near end
        |----------------------------------------------------------------------
        */

        if (currentPage >= totalPages - 3) {
            return [
                1,
                "...",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        /*
        |----------------------------------------------------------------------
        | Middle
        |----------------------------------------------------------------------
        */

        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    };

    const visiblePages = getVisiblePages();

    /*
    |--------------------------------------------------------------------------
    | Styles
    |--------------------------------------------------------------------------
    */

    const containerClass = isDark
        ? "border-zinc-800 bg-zinc-950"
        : "border-[#dedede] bg-white";

    const textClass = isDark
        ? "text-zinc-400"
        : "text-zinc-500";

    const mutedButtonClass = isDark
        ? "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
        : "border-[#dedede] bg-white text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900";

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div
            className={`flex flex-col gap-4 rounded-xl border px-4 py-3 transition-colors duration-200 sm:flex-row sm:items-center sm:justify-between ${containerClass}`}
        >
            {/* ------------------------------------------------------------- */}
            {/* Page Information */}
            {/* ------------------------------------------------------------- */}

            <div className="text-sm">
                <span className={textClass}>
                    Page
                </span>

                <span
                    className={`mx-1.5 font-medium ${
                        isDark
                            ? "text-zinc-200"
                            : "text-zinc-900"
                    }`}
                >
                    {currentPage}
                </span>

                <span className={textClass}>
                    of
                </span>

                <span
                    className={`ml-1.5 font-medium ${
                        isDark
                            ? "text-zinc-200"
                            : "text-zinc-900"
                    }`}
                >
                    {totalPages}
                </span>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* Pagination Controls */}
            {/* ------------------------------------------------------------- */}

            <div className="flex items-center gap-1.5">
                {/* Previous */}

                <button
                    type="button"
                    onClick={() =>
                        handlePageChange(
                            currentPage - 1
                        )
                    }
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-150 ${
                        currentPage === 1
                            ? isDark
                                ? "cursor-not-allowed border-zinc-900 bg-zinc-950 text-zinc-700"
                                : "cursor-not-allowed border-[#eeeeee] bg-[#fafafa] text-zinc-300"
                            : mutedButtonClass
                    }`}
                >
                    <ChevronLeft
                        size={17}
                        strokeWidth={1.8}
                    />
                </button>

                {/* Page Numbers */}

                <div className="flex items-center gap-1">
                    {visiblePages.map(
                        (page, index) => {
                            if (page === "...") {
                                return (
                                    <span
                                        key={`ellipsis-${index}`}
                                        className={`flex h-9 w-9 items-center justify-center text-sm ${textClass}`}
                                    >
                                        …
                                    </span>
                                );
                            }

                            const isActive =
                                page === currentPage;

                            return (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(
                                            page
                                        )
                                    }
                                    aria-current={
                                        isActive
                                            ? "page"
                                            : undefined
                                    }
                                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition-all duration-150 ${
                                        isActive
                                            ? isDark
                                                ? "border-white bg-white text-black"
                                                : "border-zinc-900 bg-zinc-900 text-white"
                                            : mutedButtonClass
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        }
                    )}
                </div>

                {/* Next */}

                <button
                    type="button"
                    onClick={() =>
                        handlePageChange(
                            currentPage + 1
                        )
                    }
                    disabled={
                        currentPage === totalPages
                    }
                    aria-label="Next page"
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-150 ${
                        currentPage === totalPages
                            ? isDark
                                ? "cursor-not-allowed border-zinc-900 bg-zinc-950 text-zinc-700"
                                : "cursor-not-allowed border-[#eeeeee] bg-[#fafafa] text-zinc-300"
                            : mutedButtonClass
                    }`}
                >
                    <ChevronRight
                        size={17}
                        strokeWidth={1.8}
                    />
                </button>
            </div>
        </div>
    );
}

export default SearchPagination;