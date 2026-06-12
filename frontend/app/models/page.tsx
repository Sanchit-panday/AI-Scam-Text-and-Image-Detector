import { CreateTile } from "@/components/cutsom-ui/createTile";
import { Box, Sparkles } from "lucide-react";

export default function page() {
    return (
        <>
            {/* header */}
            <header className="flex min-h-70 md:min-h-90 justify-center items-center">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-primary text-4xl font-semibold">MildyAI Models</h2>
                    <div>Models offered by MildyAI</div>
                </div>
                <div className="flex" aria-label="Product category filter"></div>
            </header>
            {/* main content */}
            <section className="mx-auto w-full max-w-300 pt-8 md:pt-12 pb-24">
                <div className="flex flex-col gap-12">
                    <figure className="m-0 w-full">
                        <figcaption className="ml-8 mb-4 text-secondary text-sm uppercase tracking-wide">AI Models</figcaption>
                        <div className="border-border relative w-full border">
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                <CreateTile icon={Sparkles} title="Mildy v1.3" description="Documentation unavailable." disabled={true} />
                                <CreateTile icon={Box} title="Mildy v2.0" description="coming soon!" disabled={true}/>
                                <CreateTile />
                            </div>
                        </div>
                    </figure>
                </div>
            </section>
        </>
    )
}
