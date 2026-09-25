import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getServices,
} from "../../services/service.service";

import {
    getProfile,
    getUserServices,
    saveUserServices,
} from "../../services/user.service";

function Services() {
    const navigate = useNavigate();
    const { user } = useUser();
    const queryClient = useQueryClient();

    const [selectedServices, setSelectedServices] = useState([]);

    /*
    |--------------------------------------------------------------------------
    | All available services
    |--------------------------------------------------------------------------
    */

    const servicesQuery = useQuery({
        queryKey: ["services"],
        queryFn: getServices,
    });

    /*
    |--------------------------------------------------------------------------
    | User profile
    |--------------------------------------------------------------------------
    */

    const profileQuery = useQuery({
        queryKey: ["user", "profile", user?.id],
        queryFn: getProfile,
        enabled: !!user,
    });

    /*
    |--------------------------------------------------------------------------
    | User selected services
    |--------------------------------------------------------------------------
    */

    const userServicesQuery = useQuery({
        queryKey: ["user", "services", user?.id],
        queryFn: getUserServices,
        enabled: !!user,
    });

    /*
    |--------------------------------------------------------------------------
    | Initialize selected services from server data
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!userServicesQuery.data?.services) {
            return;
        }

        setSelectedServices(
            userServicesQuery.data.services.map(
                (service) => service.id
            )
        );
    }, [userServicesQuery.data]);

    /*
    |--------------------------------------------------------------------------
    | Save services mutation
    |--------------------------------------------------------------------------
    */

    const saveServicesMutation = useMutation({
        mutationFn: (services) =>
            saveUserServices({
                userId: profileQuery.data?.user?.id,
                services,
            }),

        onSuccess: async () => {
            /*
             * The user's selected services have changed.
             *
             * Mark the cached services data as stale so
             * the next consumer gets fresh data.
             */

            await queryClient.invalidateQueries({
                queryKey: ["user", "services", user?.id],
            });

            /*
             * Dashboard uses the same user-services query.
             * Invalidating it keeps Dashboard synchronized.
             */

            toast.success("Services updated.");

            navigate("/app/dashboard");
        },

        onError: (error) => {
            console.error(error);

            toast.error("Unable to save services.");
        },
    });

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    const loading =
        servicesQuery.isPending ||
        profileQuery.isPending ||
        userServicesQuery.isPending;

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    const hasError =
        servicesQuery.isError ||
        profileQuery.isError ||
        userServicesQuery.isError;

    useEffect(() => {
        if (!hasError) {
            return;
        }

        toast.error("Failed to load services.");
    }, [hasError]);

    /*
    |--------------------------------------------------------------------------
    | Toggle service
    |--------------------------------------------------------------------------
    */

    const toggleService = (serviceId) => {
        setSelectedServices((previous) => {
            if (previous.includes(serviceId)) {
                return previous.filter(
                    (id) => id !== serviceId
                );
            }

            return [...previous, serviceId];
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = () => {
        const profile = profileQuery.data?.user;

        if (!profile) {
            toast.error("User profile not found.");
            return;
        }

        if (selectedServices.length === 0) {
            toast.error("Select at least one service.");
            return;
        }

        saveServicesMutation.mutate(selectedServices);
    };

    /*
    |--------------------------------------------------------------------------
    | Loading UI
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div className="text-white">
                Loading...
            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Data
    |--------------------------------------------------------------------------
    */

    const services =
        servicesQuery.data?.services || [];

    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

    return (
        <div className="mx-auto max-w-5xl">

            <div>
                <h1 className="text-3xl font-bold text-white">
                    Your Services
                </h1>

                <p className="mt-2 text-zinc-400">
                    Select the services you provide.
                </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                {services.map((service) => {
                    const selected =
                        selectedServices.includes(service.id);

                    return (
                        <button
                            key={service.id}
                            onClick={() =>
                                toggleService(service.id)
                            }
                            className={`
                                rounded-xl
                                border
                                p-6
                                text-left
                                transition

                                ${
                                    selected
                                        ? "border-violet-600 bg-violet-600/10"
                                        : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                                }
                            `}
                        >
                            <h2 className="text-lg font-semibold text-white">
                                {service.name}
                            </h2>

                            <p className="mt-3 text-sm text-zinc-400">
                                {service.credit_cost} Credits
                            </p>
                        </button>
                    );
                })}

            </div>

            <div className="mt-10 flex justify-end">

                <button
                    onClick={handleSubmit}
                    disabled={saveServicesMutation.isPending}
                    className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saveServicesMutation.isPending
                        ? "Saving..."
                        : "Save Services"}
                </button>

            </div>

        </div>
    );
}

export default Services;