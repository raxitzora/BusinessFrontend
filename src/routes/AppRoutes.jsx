import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import AuthSync from "../auth/AuthSync";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import SearchBusinesses from "../pages/Search/SearchBusinesses";
import BusinessDetails from "../pages/Search/BusinessDetails";
import SavedLeads from "../pages/Leads/SavedLeads";
import SearchHistory from "../pages/Leads/SearchHistory";
import Services from "../pages/Services/Services";
import Billing from "../pages/Billing/Billing";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";

function AppRoutes() {
    return (
        <>
            {/* Not authenticated */}
            <SignedOut>
                <Navigate
                    to="/sign-in"
                    replace
                />
            </SignedOut>

            {/* Authenticated */}
            <SignedIn>
                <AuthSync>

                    <Routes>

                        <Route
                            element={<DashboardLayout />}
                        >

                            {/* /app */}
                            <Route
                                index
                                element={
                                    <Navigate
                                        to="/app/dashboard"
                                        replace
                                    />
                                }
                            />

                            {/* Dashboard */}
                            <Route
                                path="dashboard"
                                element={<Dashboard />}
                            />

                            {/* Search */}
                            <Route
                                path="search"
                                element={<SearchBusinesses />}
                            />

                            {/* Business Details */}
                            <Route
                                path="business/:id"
                                element={<BusinessDetails />}
                            />

                            {/* Leads */}
                            <Route
                                path="saved-leads"
                                element={<SavedLeads />}
                            />

                            <Route
                                path="search-history"
                                element={<SearchHistory />}
                            />

                            {/* Services */}
                            <Route
                                path="services"
                                element={<Services />}
                            />

                            {/* Billing */}
                            <Route
                                path="billing"
                                element={<Billing />}
                            />

                            {/* Profile */}
                            <Route
                                path="profile"
                                element={<Profile />}
                            />

                            {/* Settings */}
                            <Route
                                path="settings"
                                element={<Settings />}
                            />

                        </Route>

                    </Routes>

                </AuthSync>
            </SignedIn>
        </>
    );
}

export default AppRoutes;