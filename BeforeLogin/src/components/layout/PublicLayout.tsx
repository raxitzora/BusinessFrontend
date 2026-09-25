import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function PublicLayout() {
    return (
        <div className="min-h-screen bg-white text-zinc-950">
            <Navbar />

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default PublicLayout;