import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";

import {
    getBusinesses,
    searchBusinesses,
    enrichBusiness,
    saveLead,
    getSavedLeads,
    removeSavedLead,
} from "../../services/business.service";

import SearchForm from "../../components/search/SearchForm";
import SearchResults from "../../components/search/SearchResults";
import SearchPagination from "../../components/search/SearchPagination";

const SEARCH_STORAGE_KEY = "leadgen_search_state";

function SearchBusinesses() {

    const searchCancelledRef = useRef(false);
    const navigate = useNavigate();
    

    const { user } = useUser();
    const { theme } = useOutletContext();

    const [keyword, setKeyword] = useState("");

    const [location, setLocation] = useState("");

    const [loading, setLoading] = useState(false);
    const [searchStage, setSearchStage] = useState(0);

    const [businesses, setBusinesses] = useState([]);

    const [savedLeads, setSavedLeads] = useState([]);

const [savingLeadId, setSavingLeadId] = useState(null);

    const [searchPerformed, setSearchPerformed] =
        useState(false);

    const [currentPage, setCurrentPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);


    /*
    |--------------------------------------------------------------------------
    | Save Search State
    |--------------------------------------------------------------------------
    */

    const saveSearchState = ({
        keyword,
        location,
        businesses,
        searchPerformed,
        currentPage,
        totalPages,
    }) => {

        try {

            sessionStorage.setItem(
                SEARCH_STORAGE_KEY,
                JSON.stringify({
                    keyword,
                    location,
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

        try {

            const stored =
                sessionStorage.getItem(
                    SEARCH_STORAGE_KEY
                );

            if (!stored) {
                return false;
            }

            const parsed =
                JSON.parse(stored);

            if (
                !parsed ||
                !Array.isArray(
                    parsed.businesses
                )
            ) {

                return false;

            }

            setKeyword(
                parsed.keyword || ""
            );

            setLocation(
                parsed.location || ""
            );

            setBusinesses(
                parsed.businesses
            );

            setSearchPerformed(
                Boolean(
                    parsed.searchPerformed
                )
            );

            setCurrentPage(
                parsed.currentPage || 1
            );

            setTotalPages(
                parsed.totalPages || 1
            );

            return true;

        } catch (error) {

            console.error(
                "Failed to restore search state:",
                error
            );

            return false;

        }

    };

const loadSavedLeads = async () => {

    try {

        const response = await getSavedLeads();

        const savedIds =
            (response.businesses || []).map(
                (business) => Number(business.id)
            );

        console.log("Loaded saved lead IDs:", savedIds);

        setSavedLeads(savedIds);

    } catch (error) {

        console.error(
            "Failed to load saved leads:",
            error?.response?.data || error
        );

    }

};

 const handleSaveLead = async (businessId) => {

    const alreadySaved =
        savedLeads.includes(businessId);

    try {

        setSavingLeadId(businessId);

        if (alreadySaved) {

            await removeSavedLead(
                businessId
            );

            setSavedLeads((previous) =>
                previous.filter(
                    (id) => id !== businessId
                )
            );

            toast.success(
                "Lead removed from saved leads."
            );

        } else {

            await saveLead(
                businessId
            );

            setSavedLeads((previous) => {

                if (previous.includes(businessId)) {
                    return previous;
                }

                return [
                    ...previous,
                    businessId,
                ];

            });

            toast.success(
                "Lead saved successfully."
            );

        }

    } catch (error) {

        console.error(
            "Save/Unsave Lead Error:",
            error?.response?.data || error
        );

        toast.error(
            error?.response?.data?.message ||
            "Failed to update saved lead."
        );

    } finally {

        setSavingLeadId(null);

    }

};

    /*
    |--------------------------------------------------------------------------
    | Enrich Visible Businesses
    |--------------------------------------------------------------------------
    */

    const enrichVisibleBusinesses =
        async (businessList) => {

        if (
            !user ||
            !businessList.length
        ) {
            return;
        }

        const CONCURRENCY = 3;

        for (
            let start = 0;
            start < businessList.length;
            start += CONCURRENCY
        ) {

            const batch =
                businessList.slice(
                    start,
                    start + CONCURRENCY
                );

          await Promise.all(
    batch.map(async (business) => {

        /*
        |--------------------------------------------------------------------------
        | Website already known
        |--------------------------------------------------------------------------
        */

        if (business.website) {

            setBusinesses((previous) =>
                previous.map((item) =>
                    item.id === business.id
                        ? {
                              ...item,
                              contactStatus: "done",
                          }
                        : item
                )
            );

            return;
        }


        /*
        |--------------------------------------------------------------------------
        | Start Checking
        |--------------------------------------------------------------------------
        */

        setBusinesses((previous) =>
            previous.map((item) =>
                item.id === business.id
                    ? {
                          ...item,
                          contactStatus: "checking",
                      }
                    : item
            )
        );


        try {

            const response =
                await enrichBusiness(
                    business.id
                );

            const enrichedBusiness =
                response?.business;


            setBusinesses((previous) =>
                previous.map((item) =>
                    item.id === business.id
                        ? {
                              ...item,
                              ...(enrichedBusiness || {}),
                              contactStatus: "done",
                          }
                        : item
                )
            );

        } catch (error) {

            console.error(
                `Failed to enrich ${business.business_name}:`,
                error?.response?.data || error
            );

            setBusinesses((previous) =>
                previous.map((item) =>
                    item.id === business.id
                        ? {
                              ...item,
                              contactStatus: "failed",
                          }
                        : item
                )
            );

        }

    })
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
            businesses,
            searchPerformed,
            currentPage,
            totalPages,
        });

    }, [
        keyword,
        location,
        businesses,
        searchPerformed,
        currentPage,
        totalPages,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Initial Page Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!user) {
            return;
        }
        loadSavedLeads();

        const restored =
            restoreSearchState();

        if (restored) {

            return;

        }


    }, [user,currentPage]);


    /*
    |--------------------------------------------------------------------------
    | Load User's Existing Businesses
    |--------------------------------------------------------------------------
    */

    const loadBusinesses = async () => {

        if (!user) {
            return;
        }

        try {

            setLoading(true);

            const response =
                await getBusinesses(
                    currentPage
                );


            const loadedBusinesses =
                (response.businesses || [])
                    .map(
                        (business) => ({
                            ...business,
                            contactStatus:
                                "pending",
                        })
                    );


            setBusinesses(
                loadedBusinesses
            );

            setTotalPages(
                response.totalPages || 1
            );

            setSearchPerformed(false);


            enrichVisibleBusinesses(
                loadedBusinesses
            );

        } catch (error) {

            console.error(
                error
            );

            toast.error(
                "Failed to load businesses."
            );

        } finally {

            setLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Search
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

const handleCancelSearch = () => {
    searchCancelledRef.current = true;

    setLoading(false);
    setSearchStage(0);

    toast("Search cancelled.", {
        duration: 2500,
    });
};
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

        searchCancelledRef.current = false;

    setLoading(true);

    const progressTimers =
        startSearchProgress();

    setCurrentPage(1);


            const response =
                await searchBusinesses(
                    trimmedKeyword,
                    trimmedLocation
                );

                if (searchCancelledRef.current) {
    progressTimers.forEach((timer) =>
        clearTimeout(timer)
    );

    return;
}

                progressTimers.forEach(
    (timer) => clearTimeout(timer)
);

setSearchStage(4);


            const foundBusinesses =
                (response.businesses || [])
                    .map(
                        (business) => ({
                            ...business,
                            contactStatus:
                                "pending",
                        })
                    );


            setKeyword(
                trimmedKeyword
            );

            setLocation(
                trimmedLocation
            );

            setBusinesses(
                foundBusinesses
            );

            setTotalPages(
                response.totalPages || 1
            );

            setSearchPerformed(
                true
            );


            /*
            |--------------------------------------------------------------------------
            | Save Immediately
            |--------------------------------------------------------------------------
            */

            saveSearchState({
                keyword:
                    trimmedKeyword,

                location:
                    trimmedLocation,

                businesses:
                    foundBusinesses,

                searchPerformed:
                    true,

                currentPage:
                    1,

                totalPages:
                    response.totalPages || 1,
            });


            /*
            |--------------------------------------------------------------------------
            | Enrich In Background
            |--------------------------------------------------------------------------
            */

            enrichVisibleBusinesses(
                foundBusinesses
            );


           const count = response.count ?? 0;

if (count > 0) {

    toast.success(
        `${count} businesses found in ${trimmedLocation}`,
        {
            duration: 4000,
        }
    );

} else {

    toast(
        `No businesses found in ${trimmedLocation}`,
        {
            duration: 4000,
        }
    );

}

        } catch (error) {

            console.error(
                error
            );

            toast.error(
                "Search failed."
            );

        } finally {

            setLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const handlePageChange =
        async (page) => {

        setCurrentPage(page);

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
    loading={loading}
    onKeywordChange={setKeyword}
    onLocationChange={setLocation}
    onSubmit={handleSearch}
    onCancel={handleCancelSearch}
/>


<SearchResults
    businesses={businesses}
    theme={theme}
    loading={loading}
    searchPerformed={searchPerformed}
    keyword={keyword}
    location={location}
    searchStage={searchStage}
    onBusinessClick={(id) =>
        navigate(`/app/business/${id}`)
    }
    onSaveLead={handleSaveLead}
    savedLeads={savedLeads}
    savingLeadId={savingLeadId}
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