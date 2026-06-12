import { CreateTile } from "@/components/cutsom-ui/createTile";
import { Globe, Image, Link2, MessageCircle } from "lucide-react";
export default function page() {
    return (
        <>
            {/* header */}
            <header className="flex min-h-70 md:min-h-90 justify-center items-center">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-primary text-4xl font-semibold">MildyAI Services</h2>
                    <div>Services offered by MildyAI</div>
                </div>
                <div className="flex" aria-label="Product category filter"></div>
            </header>
            {/* main content */}
            <section className="mx-auto w-full max-w-300 pt-8 md:pt-12 pb-24">
                <div className="flex flex-col gap-12">
                    <figure className="m-0 w-full">
                        <figcaption className="ml-8 mb-4 text-secondary text-sm uppercase tracking-wide">AI SERVICES</figcaption>
                        <div className="border-border relative w-full border">
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                <CreateTile icon={Image} title="Image Scan" description="Scan Images." to="/image-analysis" />
                                <CreateTile icon={MessageCircle} title="Message Scan" description="Scan Messages." to="/text-analysis" />
                                <CreateTile title="" description="" />
                            </div>
                        </div>
                    </figure>
                    <figure className="m-0 w-full">
                        <figcaption className="ml-8 mb-4 text-secondary text-sm uppercase tracking-wide">STANDALONE SERVICES</figcaption>
                        <div className="border-border relative w-full border ">
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                <CreateTile icon={Globe} title="Webpage Age" description="Webpage Age." to="/domain-analysis/domain-age" />
                                <CreateTile icon={Link2} title="DNS Lookup" description="DNS Lookup." to="/domain-analysis/dns-lookup" />
                                <CreateTile title="" description="" />
                            </div>
                        </div>
                    </figure>
                </div>
            </section>
        </>
    )
}
