import { useEffect, useState } from "react";
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

    const [services, setServices] = useState([]);

    const [selectedServices, setSelectedServices] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {

        const loadServices = async () => {

            try {

         const [
    allServices,
    profileResponse,
    userServices,
] = await Promise.all([
    getServices(),
    getProfile(user.id),
    getUserServices(user.id),
]);
setProfile(profileResponse.user);

                setServices(allServices.services);

                setSelectedServices(
                    userServices.services.map(
                        (service) => service.id
                    )
                );

            } catch (error) {

                console.error(error);

                toast.error("Failed to load services.");

            } finally {

                setLoading(false);

            }

        };

        if (user) {
            loadServices();
        }

    }, [user]);

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

    const handleSubmit = async () => {
          if (!profile) {

        toast.error("User profile not found.");

        return;

    }

        if (selectedServices.length === 0) {

            toast.error("Select at least one service.");

            return;

        }

        try {

            setSaving(true);

            await saveUserServices({
                userId: profile.id,
                services: selectedServices,
            });

            toast.success("Services updated.");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            toast.error("Unable to save services.");

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (
            <div className="text-white">
                Loading...
            </div>
        );

    }

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
                    disabled={saving}
                    className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                    {saving
                        ? "Saving..."
                        : "Save Services"}

                </button>

            </div>

        </div>

    );

}

export default Services;