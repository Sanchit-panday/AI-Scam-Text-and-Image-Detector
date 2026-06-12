import { CreateTile } from "@/components/cutsom-ui/createTile";
import { Braces, Brain, MessageSquareDot, MessageSquareText, SearchCheck, Signature } from "lucide-react";

export default function page() {
    return (
        <>
            {/* header */}
            <header className="flex min-h-70 md:min-h-90 justify-center items-center">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-primary text-6xl font-semibold">MildyAI Resources</h2>
                    <div>Find the docs, guides, and learning materials to design, ship, and scale on Cloudflare.</div>
                </div>
                <div className="flex" aria-label="Product category filter"></div>
            </header>
            {/* main content */}
            <section className="mx-auto w-full max-w-300 pt-8 md:pt-12 pb-24">
                <div className="flex flex-col gap-12">
                    <figure className="m-0 w-full">
                        <div className="border-border relative w-full border">
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                <CreateTile icon={Brain} title="How MildyAI works?" description="Learn about MildyAI." to="/resources/how-mildy-works"/>
                                <CreateTile icon={Braces} title="Github Documentation" description="Link to github docs." to="https://github.com/Sanchit-panday/AI-Scam-Text-and-Image-Detector" />
                                <CreateTile icon={Signature} title="Developer Docs" description="Unavailable!" disabled={true} />
                                <CreateTile icon={MessageSquareDot} title="Blog" description="Product updates, launch posts and technical deep dives." to="/blog" />
                                <CreateTile icon={MessageSquareText} title="Community" description="Join our discord community." to="https://discord.gg/nxpMtBrdb7" />
                                <CreateTile icon={SearchCheck} title="About us" description="Know about out mission and goals." to="/about" />
                                <CreateTile icon={MessageSquareText} title="Contact us" description="Explore support and contact resources." to="/contact" />
                                <CreateTile icon={MessageSquareDot} title="Status Page" description="Explore status page." to="https://stats.uptimerobot.com/fEl208ASz8/803150214" />
                                <CreateTile disabled={true} />
                            </div>
                        </div>
                    </figure>
                </div>
            </section>
        </>
    )
}
