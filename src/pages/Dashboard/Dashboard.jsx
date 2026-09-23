import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getProfile,
    getUserServices,
} from "../../services/user.service";

function Dashboard() {

    const { user } = useUser();

    const [profile, setProfile] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!user) return;

        const loadDashboard = async () => {

            try {

                const [
                    profileResponse,
                    servicesResponse,
                ] = await Promise.all([
                    getProfile(user.id),
                    getUserServices(user.id),
                ]);

                setProfile(profileResponse.user);
                setServices(servicesResponse.services);

            } catch (error) {

                console.error(error);

                toast.error("Failed to load dashboard.");

            } finally {

                setLoading(false);

            }

        };

        loadDashboard();

    }, [user]);

    if (loading) {

        return (
            <div className="text-white">
                Loading dashboard...
            </div>
        );

    }

    return (

        <div className="space-y-8">

            {/* Welcome */}

            <div>

                <h1 className="text-3xl font-bold text-white">

                    Welcome,
                    {" "}
                    {profile?.full_name}

                    👋

                </h1>

                <p className="mt-2 text-zinc-400">

                    Manage your services and start generating new business leads.

                </p>

            </div>

            {/* Credits */}

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">

                <h2 className="text-lg font-semibold text-white">

                    Available Credits

                </h2>

                <p className="mt-3 text-4xl font-bold text-violet-500">

                    {profile?.credits}

                </p>

            </div>

            {/* Selected Services */}

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">

                <h2 className="text-lg font-semibold text-white">

                    Selected Services

                </h2>

                {
                    services.length === 0 ? (

                        <p className="mt-4 text-zinc-400">

                            No services selected.

                        </p>

                    ) : (

                        <div className="mt-4 flex flex-wrap gap-3">

                            {
                                services.map((service) => (

                                    <span
                                        key={service.id}
                                        className="rounded-md bg-violet-600 px-4 py-2 text-sm text-white"
                                    >

                                        {service.name}

                                    </span>

                                ))
                            }

                        </div>

                    )
                }

            </div>

            {/* Quick Actions */}

            <div className="flex gap-4">

                <Link
                    to="/app/search"
                    className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-700"
                >

                    Search Businesses

                </Link>

                <Link
                    to="/app/services"
                    className="rounded-lg border border-zinc-700 px-6 py-3 font-medium text-white hover:bg-zinc-800"
                >

                    Manage Services

                </Link>

            </div>

        </div>

    );

}

export default Dashboard;