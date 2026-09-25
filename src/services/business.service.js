import api from "./axios";

/*
|--------------------------------------------------------------------------
| Business Search
|--------------------------------------------------------------------------
*/


export const searchBusinesses = async (
    keyword,
    location,
    areas = []
) => {

    const { data } = await api.post(
        "/business/search",
        {
            keyword,
            location,
            areas,
        }
    );

    return data;

};

/*
|--------------------------------------------------------------------------
| Get Businesses
|--------------------------------------------------------------------------
*/

export const getBusinesses = async (
    page = 1,
    limit = 20
) => {

    const { data } = await api.get(
        "/business",
        {
            params: {
                page,
                limit,
            },
        }
    );

    return data;

};

/*
|--------------------------------------------------------------------------
| Get Business Details
|--------------------------------------------------------------------------
*/

export const getBusinessDetails = async (
    businessId
) => {

    const { data } = await api.get(
        `/business/details/${businessId}`
    );

    return data;

};
/*
|--------------------------------------------------------------------------
| Website Analysis
|--------------------------------------------------------------------------
*/

export const analyzeWebsite = async (
    googleMapsLink
) => {

    const { data } = await api.post(
        "/website-analysis",
        {
            googleMapsLink,
        }
    );

    return data;

};

/*
|--------------------------------------------------------------------------
| Digital Marketing Analysis
|--------------------------------------------------------------------------
*/

export const analyzeDigitalMarketing = async (
    website
) => {

    const { data } = await api.post(
        "/digital-marketing-analysis",
        {
            websiteUrl: website,
        }
    );

    return data;

};

/*
|--------------------------------------------------------------------------
| Enrich Business
|--------------------------------------------------------------------------
*/

export const enrichBusiness = async (
    businessId
) => {

    const { data } = await api.post(
        `/business/enrich/${businessId}`
    );

    return data;

};

/*
|--------------------------------------------------------------------------
| Save Lead
|--------------------------------------------------------------------------
*/

export const saveLead = async (
    businessId
) => {

    const { data } = await api.post(
        `/business/save/${businessId}`
    );

    return data;

};


/*
|--------------------------------------------------------------------------
| Get Saved Leads
|--------------------------------------------------------------------------
*/

export const getSavedLeads = async () => {

    const { data } = await api.get(
        "/business/saved"
    );

    return data;

};


/*
|--------------------------------------------------------------------------
| Remove Saved Lead
|--------------------------------------------------------------------------
*/

export const removeSavedLead = async (
    businessId
) => {

    const { data } = await api.delete(
        `/business/saved/${businessId}`
    );

    return data;

};

export const getSearchHistory = async () => {

    const { data } = await api.get(
        "/business/history"
    );

    return data;

};