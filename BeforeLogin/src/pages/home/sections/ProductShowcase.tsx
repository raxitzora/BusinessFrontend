import { MacbookScroll } from "@beforelogin/components/ui/macbook-scroll";

function ProductShowcase() {
    return (
        <section className="relative -mt-20 w-full overflow-hidden bg-white sm:-mt-24">
            <MacbookScroll
                title={
                    <span>
                        Everything you need to find
                        <br />
                        your next business opportunity.
                    </span>
                }
                src="/leadflow-product.webp"
                showGradient={false}
            />
        </section>
    );
}

export default ProductShowcase;