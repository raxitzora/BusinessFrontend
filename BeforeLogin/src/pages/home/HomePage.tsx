import HeroSection from "./sections/HeroSection";
import ProductShowcase from "./sections/ProductShowcase";
import ProductWorkflow from "./sections/ProductWorkflow";

function HomePage() {
    return (
        <div className="min-h-screen bg-white text-zinc-950">

            <main>
                <HeroSection />
                <ProductShowcase />
                            <ProductWorkflow />

            </main>
        </div>
    );
}

export default HomePage;