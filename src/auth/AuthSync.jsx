import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import { syncUser } from "../services/auth.service";
import { setTokenGetter } from "../services/axios";

const AuthSync = ({ children }) => {

    const {
        isLoaded,
        isSignedIn,
        getToken,
    } = useAuth();

    const synced = useRef(false);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const synchronize = async () => {

            if (!isLoaded) {
                return;
            }

            if (!isSignedIn) {

                setLoading(false);

                return;

            }

            /*
            |--------------------------------------------------------------------------
            | Make Clerk token available to Axios
            |--------------------------------------------------------------------------
            */

            setTokenGetter(getToken);

            if (synced.current) {

                setLoading(false);

                return;

            }

            try {

                const token =
                    await getToken();

                if (!token) {

                    throw new Error(
                        "Unable to obtain Clerk authentication token."
                    );

                }

                await syncUser(token);

                synced.current = true;

                setLoading(false);

            } catch (error) {

                console.error(
                    "User sync failed:",
                    error
                );

                setLoading(false);

            }

        };

        synchronize();

    }, [
        isLoaded,
        isSignedIn,
        getToken,
    ]);

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