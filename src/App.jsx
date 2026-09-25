import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";

import PublicLayout from "@beforelogin/components/layout/PublicLayout";

import HomePage from "@beforelogin/pages/home/HomePage";
import PlatformPage from "@beforelogin/pages/platform/PlatformPage";
import CustomersPage from "@beforelogin/pages/customers/CustomersPage";
import PricingPage from "@beforelogin/pages/pricing/PricingPage";

import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
    return (
        <Routes>
            {/* Public website */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/platform" element={<PlatformPage />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/pricing" element={<PricingPage />} />
            </Route>

            {/* Authentication */}
            <Route
                path="/sign-in/*"
                element={
                    <SignIn
                        routing="path"
                        path="/sign-in"
                        forceRedirectUrl="/app/dashboard"
                    />
                }
            />

            <Route
                path="/sign-up/*"
                element={
                    <SignUp
                        routing="path"
                        path="/sign-up"
                        forceRedirectUrl="/app/dashboard"
                    />
                }
            />

            {/* Existing application */}
            <Route path="/app/*" element={<AppRoutes />} />
        </Routes>
    );
}

export default App;