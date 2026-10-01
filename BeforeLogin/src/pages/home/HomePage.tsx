import { useEffect } from "react";
import Lenis from "lenis";

import HeroSection from "./sections/HeroSection";
import ProductShowcase from "./sections/ProductShowcase";
import ProductWorkflow from "./sections/ProductWorkflow";
import OpportunitySection from "./sections/OpportunitySection";

function HomePage() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 0.55,
            touchMultiplier: 1,
            lerp: 0.075,
        });

        let rafId;

        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return (
        <div className="min-h-screen bg-white text-zinc-950">
            <main>
                <HeroSection />
                <ProductShowcase />
                <OpportunitySection />
                <ProductWorkflow />
            </main>
        </div>
    );
}

export default HomePage;