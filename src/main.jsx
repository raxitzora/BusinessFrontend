import {
    StrictMode,
    useMemo,
} from "react";
import LoadingScreen from "./components/common/LoadingScreen";

import {
    createRoot,
} from "react-dom/client";

import {
    ClerkProvider,
    useAuth,
} from "@clerk/clerk-react";

import {
    BrowserRouter,
} from "react-router-dom";

import {
    Toaster,
} from "react-hot-toast";

import {
    QueryClient,
} from "@tanstack/react-query";

import {
    PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";

import {
    createSyncStoragePersister,
} from "@tanstack/query-sync-storage-persister";

import "./index.css";
import App from "./App";


/*
|--------------------------------------------------------------------------
| Clerk
|--------------------------------------------------------------------------
*/

const clerkPubKey =
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


if (!clerkPubKey) {

    throw new Error(
        "Missing Clerk Publishable Key"
    );

}


/*
|--------------------------------------------------------------------------
| Query Application
|--------------------------------------------------------------------------
*/

const QueryApplication = () => {

    const {
        isLoaded,
        isSignedIn,
        userId,
    } = useAuth();



    if (!isLoaded) {

        return <LoadingScreen />;

    }


    /*
    |--------------------------------------------------------------------------
    | Resolve User
    |--------------------------------------------------------------------------
    */

    const resolvedUserId =
        isSignedIn && userId
            ? userId
            : null;


    return (

        <UserQueryApplication
            key={
                resolvedUserId ||
                "guest"
            }
            userId={
                resolvedUserId
            }
        />

    );

};


/*
|--------------------------------------------------------------------------
| User Query Application
|--------------------------------------------------------------------------
*/

const UserQueryApplication = ({
    userId,
}) => {


    /*
    |--------------------------------------------------------------------------
    | User-Specific Cache Key
    |--------------------------------------------------------------------------
    */

    const cacheKey =
        userId
            ? `leadflow-react-query-cache-${userId}`
            : "leadflow-react-query-cache-guest";


    /*
    |--------------------------------------------------------------------------
    | Query Client
    |--------------------------------------------------------------------------
    */

    const queryClient = useMemo(
        () => {

            return new QueryClient({

                defaultOptions: {

                    queries: {

                        staleTime:
                            5 *
                            60 *
                            1000,

                        gcTime:
                            7 *
                            24 *
                            60 *
                            60 *
                            1000,

                        refetchOnWindowFocus:
                            false,

                        retry: 1,

                    },

                },

            });

        },
        []
    );


    /*
    |--------------------------------------------------------------------------
    | Persister
    |--------------------------------------------------------------------------
    */

    const persister = useMemo(
        () => {

            return createSyncStoragePersister({

                storage:
                    window.localStorage,

                key:
                    cacheKey,

                throttleTime:
                    1000,

            });

        },
        [cacheKey]
    );


    /*
    |--------------------------------------------------------------------------
    | Application
    |--------------------------------------------------------------------------
    */

    return (

        <PersistQueryClientProvider
            client={
                queryClient
            }
            persistOptions={{
                persister,

                maxAge:
                    7 *
                    24 *
                    60 *
                    60 *
                    1000,
            }}
        >

            <BrowserRouter>

                <App />

                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3500,
                    }}
                />

            </BrowserRouter>

        </PersistQueryClientProvider>

    );

};


/*
|--------------------------------------------------------------------------
| Application Entry
|--------------------------------------------------------------------------
*/

createRoot(
    document.getElementById("root")
).render(

    <StrictMode>

        <ClerkProvider
            publishableKey={
                clerkPubKey
            }
        >

            <QueryApplication />

        </ClerkProvider>

    </StrictMode>

);