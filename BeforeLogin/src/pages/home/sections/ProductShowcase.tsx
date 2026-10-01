import { MacbookScroll } from "@beforelogin/components/ui/macbook-scroll";

function ProductShowcase() {
    return (
        <section
            className="
                relative
                w-full
                overflow-visible
                bg-white
                transition-colors
                duration-300
                dark:bg-[#08090d]
            "
        >
            <MacbookScroll
                src="/macbookimage.png"
                showGradient={false}
            />
        </section>
    );
}

export default ProductShowcase;