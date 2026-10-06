import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";

import PublicLayout from "@beforelogin/components/layout/PublicLayout";

import HomePage from "@beforelogin/pages/home/HomePage";
import PlatformPage from "@beforelogin/pages/platform/PlatformPage";
import CustomersPage from "@beforelogin/pages/customers/CustomersPage";
import PricingPage from "@beforelogin/pages/pricing/PricingPage";

import AppRoutes from "./routes/AppRoutes";
import "./App.css";

const clerkAppearance = {
    variables: {
        colorPrimary: "#06b6d4",
        colorBackground: "#0b0b0b",
        colorText: "#ffffff",
        colorTextSecondary: "#a1a1aa",
        colorInputBackground: "#111111",
        colorInputText: "#ffffff",
        colorNeutral: "#ffffff",
        borderRadius: "12px",
        fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    },

    elements: {
        rootBox: {
            width: "100%",
            maxWidth: "420px",
        },

        card: {
            width: "100%",
            backgroundColor: "#0b0b0b",
            border: "1px solid #27272a",
            borderRadius: "18px",
            boxShadow:
                "0 30px 80px rgba(0, 0, 0, 0.45)",
        },

        headerTitle: {
            color: "#ffffff",
            fontSize: "24px",
            fontWeight: "600",
            letterSpacing: "-0.025em",
        },

        headerSubtitle: {
            color: "#71717a",
            fontSize: "13px",
        },

        formFieldLabel: {
            color: "#d4d4d8",
            fontSize: "13px",
            fontWeight: "500",
        },

        formFieldInput: {
            height: "44px",
            backgroundColor: "#111111",
            border: "1px solid #27272a",
            borderRadius: "10px",
            color: "#ffffff",
            boxShadow: "none",
            transition:
                "border-color 180ms ease, background-color 180ms ease",
        },

        formFieldInputFocus: {
            borderColor: "#0891b2",
            boxShadow:
                "0 0 0 3px rgba(6, 182, 212, 0.08)",
        },

        formButtonPrimary: {
            height: "44px",
            backgroundColor: "#06b6d4",
            borderRadius: "10px",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "none",
            transition:
                "background-color 180ms ease, transform 180ms ease",
        },

        formButtonPrimaryHover: {
            backgroundColor: "#0891b2",
        },

        socialButtonsBlockButton: {
            height: "44px",
            backgroundColor: "#111111",
            border: "1px solid #27272a",
            borderRadius: "10px",
            color: "#e4e4e7",
            fontSize: "14px",
            fontWeight: "500",
            transition:
                "background-color 180ms ease, border-color 180ms ease",
        },

        socialButtonsBlockButtonHover: {
            backgroundColor: "#18181b",
            borderColor: "#3f3f46",
        },

        dividerLine: {
            backgroundColor: "#27272a",
        },

        dividerText: {
            color: "#52525b",
            fontSize: "12px",
        },

        footerActionText: {
            color: "#71717a",
            fontSize: "13px",
        },

        footerActionLink: {
            color: "#22d3ee",
            fontWeight: "500",
        },

        footerActionLinkHover: {
            color: "#67e8f9",
        },

        identityPreviewText: {
            color: "#e4e4e7",
        },

        formFieldErrorText: {
            color: "#f87171",
        },

        alertText: {
            color: "#fca5a5",
        },

        otpCodeFieldInput: {
            backgroundColor: "#111111",
            border: "1px solid #27272a",
            color: "#ffffff",
            borderRadius: "10px",
        },

        footer: {
            borderTop: "1px solid #18181b",
        },
    },
};

function AuthLayout({ children }) {
    return (
        <div className="min-h-screen w-full bg-[#08090d] text-white">
            <div className="flex min-h-screen w-full items-center justify-center px-4 py-10">
                <div className="flex w-full max-w-[420px] flex-col items-center">
                    {/* Brand */}

                    <div className="mb-7 text-center">
                        <div className="text-[22px] font-semibold tracking-[-0.04em] text-white">
                            FYNDREX
                        </div>

                        <div className="mt-1 text-[11px] font-medium tracking-[0.16em] text-zinc-600">
                            DISCOVER OPPORTUNITIES
                        </div>
                    </div>

                    {/* Clerk */}

                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

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
                    <AuthLayout>
                        <SignIn
                            routing="path"
                            path="/sign-in"
                            forceRedirectUrl="/app/dashboard"
                            appearance={clerkAppearance}
                        />
                    </AuthLayout>
                }
            />

            <Route
                path="/sign-up/*"
                element={
                    <AuthLayout>
                        <SignUp
                            routing="path"
                            path="/sign-up"
                            forceRedirectUrl="/app/dashboard"
                            appearance={clerkAppearance}
                        />
                    </AuthLayout>
                }
            />

            {/* Existing application */}

            <Route
                path="/app/*"
                element={<AppRoutes />}
            />
        </Routes>

        
    );
}

export default App;