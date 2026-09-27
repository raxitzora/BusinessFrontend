import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useAuth,
} from "@clerk/clerk-react";

import {
    syncUser,
} from "../services/auth.service";

import {
    setTokenGetter,
} from "../services/axios";


const AuthSync = ({
    children,
}) => {

    const {
        isLoaded,
        isSignedIn,
        userId,
        getToken,
    } = useAuth();


    /*
    |--------------------------------------------------------------------------
    | Track which Clerk user has been synchronized.
    |--------------------------------------------------------------------------
    */

    const syncedUserId =
        useRef(null);


    const [
        loading,
        setLoading,
    ] = useState(true);


    useEffect(() => {

        let cancelled = false;


        const synchronize = async () => {

            if (!isLoaded) {
                return;
            }


            /*
            |--------------------------------------------------------------------------
            | No authenticated user
            |--------------------------------------------------------------------------
            */

            if (
                !isSignedIn ||
                !userId
            ) {

                syncedUserId.current =
                    null;

                if (!cancelled) {

                    setLoading(
                        false
                    );

                }

                return;

            }


            /*
            |--------------------------------------------------------------------------
            | Make Clerk token available to Axios
            |--------------------------------------------------------------------------
            */

            setTokenGetter(
                getToken
            );


            /*
            |--------------------------------------------------------------------------
            | Already synchronized for this exact user
            |--------------------------------------------------------------------------
            */

            if (
                syncedUserId.current ===
                userId
            ) {

                if (!cancelled) {

                    setLoading(
                        false
                    );

                }

                return;

            }


            /*
            |--------------------------------------------------------------------------
            | New Clerk user
            |--------------------------------------------------------------------------
            */

            if (!cancelled) {

                setLoading(
                    true
                );

            }


            try {

                const token =
                    await getToken();


                if (!token) {

                    throw new Error(
                        "Unable to obtain Clerk authentication token."
                    );

                }


                await syncUser(
                    token
                );


                /*
                |--------------------------------------------------------------------------
                | Mark only this user as synchronized.
                |--------------------------------------------------------------------------
                */

                syncedUserId.current =
                    userId;


                if (!cancelled) {

                    setLoading(
                        false
                    );

                }

            } catch (error) {

                console.error(
                    "User sync failed:",
                    error
                );


                if (!cancelled) {

                    setLoading(
                        false
                    );

                }

            }

        };


        synchronize();


        /*
        |--------------------------------------------------------------------------
        | Cleanup
        |--------------------------------------------------------------------------
        */

        return () => {

            cancelled = true;

        };

    }, [
        isLoaded,
        isSignedIn,
        userId,
        getToken,
    ]);


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <div>
                Loading...
            </div>
        );

    }


    return children;

};


export default AuthSync;