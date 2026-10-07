import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useNavigate,
    useOutletContext,
} from "react-router-dom";

import {
    useUser,
} from "@clerk/clerk-react";

import toast from "react-hot-toast";

import {
    searchBusinesses,
    enrichBusiness,
    saveLead,
    getSavedLeads,
    removeSavedLead,
} from "../../services/business.service";

import SearchForm from "../../components/search/SearchForm";
import SearchResults from "../../components/search/SearchResults";
import SearchPagination from "../../components/search/SearchPagination";

import {
    useQueryClient,
} from "@tanstack/react-query";

const SEARCH_STORAGE_KEY = "leadgen_search_state";

function SearchBusinesses() {
    const searchCancelledRef = useRef(false);

    const navigate = useNavigate();

    const {
        user,
    } = useUser();

    const {
        theme,
    } = useOutletContext();

    const queryClient = useQueryClient();

    const savedLeadsQueryKey = [
        "saved-leads",
        user?.id,
    ];

    const searchStorageKey = user?.id
        ? `${SEARCH_STORAGE_KEY}-${user.id}`
        : null;

    const [
        keyword,
        setKeyword,
    ] = useState("");

    const [
        location,
        setLocation,
    ] = useState("");

    const [
        areas,
        setAreas,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        searchStage,
        setSearchStage,
    ] = useState(0);

    const [
        businesses,
        setBusinesses,
    ] = useState([]);

    const [
        savedLeads,
        setSavedLeads,
    ] = useState([]);

    const [
        savingLeadId,
        setSavingLeadId,
    ] = useState(null);

    const [
        searchPerformed,
        setSearchPerformed,
    ] = useState(false);

    const [
        currentPage,
        setCurrentPage,
    ] = useState(1);

    const [
        totalPages,
        setTotalPages,
    ] = useState(1);

    /*
    |--------------------------------------------------------------------------
    | Enrich Businesses With Contact And Website Data
    |--------------------------------------------------------------------------
    */

/*
|--------------------------------------------------------------------------
| Enrich Businesses With Contact And Website Data
|--------------------------------------------------------------------------
*/

const enrichBusinesses = async (businessList) => {
    if (!user || !businessList?.length) {
        return;
    }

    const CONCURRENCY = 5;

    const updateBusiness = (businessId, updates) => {
        setBusinesses((previous) =>
            previous.map((item) =>
                Number(item.id) === Number(businessId)
                    ? {
                        ...item,
                        ...updates,
                    }
                    : item
            )
        );
    };

const enrichOne = async (business) => {
    if (!business?.id) {
        return;
    }

    const businessId = business.id;

    updateBusiness(businessId, {
        contactStatus: business.phone
            ? "done"
            : "checking",

        websiteStatus: business.website
            ? "done"
            : "checking",
    });

    try {
        const response = await enrichBusiness(businessId);
        const enrichedBusiness = response?.business;

        if (!enrichedBusiness) {
            console.warn(
                `[Enrichment] No business data returned for ${businessId}`
            );

            updateBusiness(businessId, {
                contactStatus: business.phone
                    ? "done"
                    : "no-phone",

                websiteStatus: business.website
                    ? "done"
                    : "no-website",
            });

            return;
        }

        const hasPhone = Boolean(
            enrichedBusiness.phone
        );

        const hasWebsite = Boolean(
            enrichedBusiness.website
        );

        updateBusiness(businessId, {
            ...enrichedBusiness,

            contactStatus: hasPhone
                ? "done"
                : "no-phone",

            websiteStatus: hasWebsite
                ? "done"
                : "no-website",
        });

    } catch (error) {
        console.error(
            `[Enrichment] Request failed for ${business.business_name}:`,
            error?.response?.data || error?.message || error
        );

        // Preserve already-known data.
        // A missing contact/website is NOT a failed enrichment.
        updateBusiness(businessId, {
            contactStatus: business.phone
                ? "done"
                : "no-phone",

            websiteStatus: business.website
                ? "done"
                : "no-website",
        });
    }
};

    const queue = [...businessList];

    const worker = async () => {
        while (queue.length > 0) {
            const business = queue.shift();

            if (!business) {
                return;
            }

            await enrichOne(business);
        }
    };

    const workers = Array.from(
        {
            length: Math.min(
                CONCURRENCY,
                businessList.length
            ),
        },
        () => worker()
    );

    await Promise.all(workers);
};

    /*
    |--------------------------------------------------------------------------
    | Save Search State
    |--------------------------------------------------------------------------
    */

    const saveSearchState = ({
        keyword,
        location,
        areas,
        businesses,
        searchPerformed,
        currentPage,
        totalPages,
    }) => {
        if (!searchStorageKey) {
            return;
        }

        try {
            sessionStorage.setItem(
                searchStorageKey,
                JSON.stringify({
                    keyword,
                    location,
                    areas,
                    businesses,
                    searchPerformed,
                    currentPage,
                    totalPages,
                })
            );
        } catch (error) {
            console.error(
                "Failed to save search state:",
                error
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Restore Search State
    |--------------------------------------------------------------------------
    */

    const restoreSearchState = () => {
        if (!searchStorageKey) {
            return false;
        }

        try {
            const stored =
                sessionStorage.getItem(
                    searchStorageKey
                );

            if (!stored) {
                return false;
            }

            const parsed =
                JSON.parse(stored);

            if (
                !parsed ||
                !Array.isArray(parsed.businesses)
            ) {
                return false;
            }

            setKeyword(
                parsed.keyword || ""
            );

            setLocation(
                parsed.location || ""
            );

            setAreas(
                Array.isArray(parsed.areas)
                    ? parsed.areas
                    : []
            );

     const restoredBusinesses =
    parsed.businesses.map((business) => ({
        ...business,

        websiteStatus:
            business.website
                ? "done"
                : business.websiteStatus === "no-website"
                    ? "no-website"
                    : "checking",

        contactStatus:
            business.phone
                ? "done"
                : business.contactStatus === "no-phone"
                    ? "no-phone"
                    : "checking",
    }));

setBusinesses(
    restoredBusinesses
);

setSearchPerformed(
    Boolean(parsed.searchPerformed)
);

setCurrentPage(
    parsed.currentPage || 1
);

setTotalPages(
    parsed.totalPages || 1
);

return restoredBusinesses;
        } catch (error) {
            console.error(
                "Failed to restore search state:",
                error
            );

            return false;
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Load Saved Leads
    |--------------------------------------------------------------------------
    */

    const loadSavedLeads = async () => {
        if (!user?.id) {
            return;
        }

        try {
            const response =
                await getSavedLeads();

            const savedIds =
                (
                    response.businesses ||
                    []
                ).map(
                    (business) =>
                        Number(
                            business.id
                        )
                );

            setSavedLeads(
                savedIds
            );

            queryClient.setQueryData(
                savedLeadsQueryKey,
                response
            );
        } catch (error) {
            console.error(
                "Failed to load saved leads:",
                error?.response?.data ||
                    error
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Save Or Remove Lead
    |--------------------------------------------------------------------------
    */

    const handleSaveLead = async (
        businessId
    ) => {
        const alreadySaved =
            savedLeads.includes(
                businessId
            );

        try {
            setSavingLeadId(
                businessId
            );

            if (alreadySaved) {
                await removeSavedLead(
                    businessId
                );

                setSavedLeads(
                    (previous) =>
                        previous.filter(
                            (id) =>
                                id !==
                                businessId
                        )
                );

                queryClient.setQueryData(
                    savedLeadsQueryKey,
                    (currentData) => {
                        if (!currentData) {
                            return currentData;
                        }

                        return {
                            ...currentData,
                            businesses:
                                (
                                    currentData.businesses ||
                                    []
                                ).filter(
                                    (business) =>
                                        Number(
                                            business.id
                                        ) !==
                                        Number(
                                            businessId
                                        )
                                ),
                        };
                    }
                );

                toast.success(
                    "Lead removed from saved leads."
                );

                return;
            }

            const response =
                await saveLead(
                    businessId
                );

            setSavedLeads(
                (previous) => {
                    if (
                        previous.includes(
                            businessId
                        )
                    ) {
                        return previous;
                    }

                    return [
                        ...previous,
                        businessId,
                    ];
                }
            );

            const savedBusiness =
                response?.business;

            if (savedBusiness) {
                queryClient.setQueryData(
                    savedLeadsQueryKey,
                    (currentData) => {
                        if (!currentData) {
                            return {
                                ...response,
                                businesses: [
                                    savedBusiness,
                                ],
                            };
                        }

                        const currentBusinesses =
                            currentData.businesses ||
                            [];

                        const alreadyExists =
                            currentBusinesses.some(
                                (business) =>
                                    Number(
                                        business.id
                                    ) ===
                                    Number(
                                        businessId
                                    )
                            );

                        if (alreadyExists) {
                            return currentData;
                        }

                        return {
                            ...currentData,
                            businesses: [
                                ...currentBusinesses,
                                savedBusiness,
                            ],
                        };
                    }
                );
            } else {
                queryClient.invalidateQueries({
                    queryKey:
                        savedLeadsQueryKey,
                });
            }

            toast.success(
                "Lead saved successfully."
            );
        } catch (error) {
            console.error(
                "Save/Unsave Lead Error:",
                error?.response?.data ||
                    error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to update saved lead."
            );
        } finally {
            setSavingLeadId(
                null
            );
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Keep Session Storage Updated
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!searchPerformed) {
            return;
        }

        saveSearchState({
            keyword,
            location,
            areas,
            businesses,
            searchPerformed,
            currentPage,
            totalPages,
        });
    }, [
        keyword,
        location,
        areas,
        businesses,
        searchPerformed,
        currentPage,
        totalPages,
        searchStorageKey,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Initial Page Load
    |--------------------------------------------------------------------------
    */
useEffect(() => {
    if (!user?.id) {
        return;
    }

    loadSavedLeads();

    const restoredBusinesses =
        restoreSearchState();

    if (Array.isArray(restoredBusinesses)) {
        const businessesToEnrich =
            restoredBusinesses.filter(
                (business) =>
                    !business.phone ||
                    !business.website
            );

        if (businessesToEnrich.length) {
            enrichBusinesses(
                businessesToEnrich
            );
        }
    }
}, [
    user?.id,
]);

    /*
    |--------------------------------------------------------------------------
    | Search Progress
    |--------------------------------------------------------------------------
    */

    const startSearchProgress = () => {
        setSearchStage(0);

        const timers = [
            setTimeout(() => {
                setSearchStage(1);
            }, 2200),

            setTimeout(() => {
                setSearchStage(2);
            }, 6000),

            setTimeout(() => {
                setSearchStage(3);
            }, 11000),
        ];

        return timers;
    };

    /*
    |--------------------------------------------------------------------------
    | Cancel Search
    |--------------------------------------------------------------------------
    */

    const handleCancelSearch = () => {
        searchCancelledRef.current = true;

        setLoading(false);
        setSearchStage(0);

        toast(
            "Search cancelled.",
            {
                duration: 2500,
            }
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Search Businesses
    |--------------------------------------------------------------------------
    */

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error(
                "User not found."
            );

            return;
        }

        const trimmedKeyword =
            keyword.trim();

        const trimmedLocation =
            location.trim();

        const cleanAreas =
            areas
                .map(
                    (area) =>
                        area.trim()
                )
                .filter(Boolean);

        if (!trimmedKeyword) {
            toast.error(
                "Please enter a keyword."
            );

            return;
        }

        if (!trimmedLocation) {
            toast.error(
                "Please enter a location."
            );

            return;
        }

        try {
            searchCancelledRef.current =
                false;

            setLoading(true);

            const progressTimers =
                startSearchProgress();

            setCurrentPage(1);

            const response =
                await searchBusinesses(
                    trimmedKeyword,
                    trimmedLocation,
                    cleanAreas
                );

            progressTimers.forEach(
                (timer) =>
                    clearTimeout(timer)
            );

            if (
                searchCancelledRef.current
            ) {
                return;
            }

         const foundBusinesses =
    (
        response.businesses ||
        []
    ).map(
        (business) => ({
            ...business,

            websiteStatus:
                business.website
                    ? "done"
                    : "checking",

            contactStatus:
                business.phone
                    ? "done"
                    : "checking",
        })
    );

            setKeyword(
                trimmedKeyword
            );

            setLocation(
                trimmedLocation
            );

            setAreas(
                cleanAreas
            );

            setBusinesses(
                foundBusinesses
            );

            setTotalPages(
                response.totalPages ||
                1
            );

            setSearchPerformed(
                true
            );

            saveSearchState({
                keyword:
                    trimmedKeyword,
                location:
                    trimmedLocation,
                areas:
                    cleanAreas,
                businesses:
                    foundBusinesses,
                searchPerformed:
                    true,
                currentPage:
                    1,
                totalPages:
                    response.totalPages ||
                    1,
            });

            const count =
                response.count ??
                foundBusinesses.length;

            if (count > 0) {
                toast.success(
                    `${count} businesses found in ${
                        cleanAreas.length
                            ? cleanAreas.join(", ")
                            : trimmedLocation
                    }`,
                    {
                        duration: 4000,
                    }
                );
            } else {
                toast(
                    `No businesses found in ${
                        cleanAreas.length
                            ? cleanAreas.join(", ")
                            : trimmedLocation
                    }`,
                    {
                        duration: 4000,
                    }
                );
            }

            setLoading(false);

            /*
            |--------------------------------------------------------------------------
            | Start Contact And Website Enrichment
            |--------------------------------------------------------------------------
            |
            | Only one enrichment system is used here.
            | Three businesses are processed simultaneously.
            |
            */

     const businessesToEnrich =
    foundBusinesses.filter(
        (business) =>
            !business.phone ||
            !business.website
    );

            if (
                businessesToEnrich.length
            ) {
                enrichBusinesses(
                    businessesToEnrich
                );
            }
        } catch (error) {
            console.error(
                "Search failed:",
                error?.response?.data ||
                    error
            );

            toast.error(
                "Search failed."
            );

            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const handlePageChange = async (
        page
    ) => {
        setCurrentPage(
            page
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="space-y-8">
            <SearchForm
                keyword={keyword}
                theme={theme}
                location={location}
                areas={areas}
                loading={loading}
                onKeywordChange={
                    setKeyword
                }
                onLocationChange={
                    setLocation
                }
                onAreasChange={
                    setAreas
                }
                onSubmit={
                    handleSearch
                }
                onCancel={
                    handleCancelSearch
                }
            />

            <SearchResults
                businesses={businesses}
                theme={theme}
                loading={loading}
                searchPerformed={
                    searchPerformed
                }
                keyword={keyword}
                location={location}
                areas={areas}
                searchStage={
                    searchStage
                }
                onBusinessClick={
                    (id) =>
                        navigate(
                            `/app/business/${id}`
                        )
                }
                onSaveLead={
                    handleSaveLead
                }
                savedLeads={
                    savedLeads
                }
                savingLeadId={
                    savingLeadId
                }
            />

            <SearchPagination
                currentPage={
                    currentPage
                }
                totalPages={
                    totalPages
                }
                onPageChange={
                    handlePageChange
                }
                theme={theme}
            />
        </div>
    );
}

export default SearchBusinesses;