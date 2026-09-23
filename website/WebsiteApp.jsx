import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import ProductShowcaseSection from "./ProductShowcaseSection";
import PricingSection from "./PricingSection";
import Footer from "./Footer";

function WebsiteApp() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <Navbar />

            <main>
                <HeroSection />
                <FeatureSection />
                <ProductShowcaseSection />
                <PricingSection />
            </main>

            <Footer />
        </div>
    );
}

export default WebsiteApp;