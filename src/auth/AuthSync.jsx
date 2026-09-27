import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";

import { syncUser } from "../services/auth.service";
import { setTokenGetter } from "../services/axios";

const AuthSync = ({ children }) => {
    const {
        isLoaded,
        isSignedIn,
        userId,
        getToken,
    } = useAuth();

    const syncedUserId = useRef(null);

    useEffect(() => {
        let cancelled = false;

        const synchronize = async () => {
            /*
            |--------------------------------------------------------------------------
            | Clerk is still initializing
            |--------------------------------------------------------------------------
            |
            | DO NOT block the application here.
            |
            */
            if (!isLoaded) {
                return;
            }

            /*
            |--------------------------------------------------------------------------
            | User is signed out
            |--------------------------------------------------------------------------
            */

            if (!isSignedIn || !userId) {
                syncedUserId.current = null;
                return;
            }

            /*
            |--------------------------------------------------------------------------
            | Configure Axios authentication
            |--------------------------------------------------------------------------
            */

            setTokenGetter(getToken);

            /*
            |--------------------------------------------------------------------------
            | Already synchronized
            |--------------------------------------------------------------------------
            */

            if (syncedUserId.current === userId) {
                return;
            }

            try {
                const token = await getToken();

                if (!token) {
                    throw new Error(
                        "Unable to obtain Clerk authentication token."
                    );
                }

                await syncUser(token);

                if (!cancelled) {
                    syncedUserId.current = userId;
                }
            } catch (error) {
                console.error(
                    "User sync failed:",
                    error
                );
            }
        };

        synchronize();

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
    | IMPORTANT
    |--------------------------------------------------------------------------
    |
    | Always render the application.
    | User synchronization happens in the background.
    |
    */

    return children;
};

export default AuthSync;