import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";

import WebsiteApp from "../website/WebsiteApp";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
    return (
        <Routes>

            {/* Public Website */}
            <Route
                path="/"
                element={<WebsiteApp />}
            />

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

            {/* Authenticated Application */}
            <Route
                path="/app/*"
                element={<AppRoutes />}
            />

        </Routes>
    );
}

export default App;