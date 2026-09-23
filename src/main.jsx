import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
    throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ClerkProvider publishableKey={clerkPubKey}>
            <BrowserRouter>

                <App />

                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3500,
                    }}
                />

            </BrowserRouter>
        </ClerkProvider>
    </StrictMode>
);