import { Globe, Image, Link2, LucideIcon, MessageCircle, MousePointer2Off } from "lucide-react";
type figProps = {
    icon?: LucideIcon,
    title?: string,
    description?: string,
    to?: string
}
function FigGen({ icon: Icon, title, description, to }: figProps) {
    return (
        <div className="border-border border relative group flex flex-col h-full lg:border-t-0">
            <div className="absolute pointer-events-none inset-0 z-10 select-none" aria-hidden="true">
                <div className="absolute bg-background -left-1.75 -top-1.75 w-3.5 h-3.5 rounded-[3px] border"></div>
                <div className="absolute bg-background -left-1.75 -bottom-1.75 w-3.5 h-3.5 rounded-[3px] border"></div>
                <div className="absolute bg-background -right-1.75 -top-1.75 w-3.5 h-3.5 rounded-[3px] border"></div>
                <div className="absolute bg-background -right-1.75 -bottom-1.75 w-3.5 h-3.5 rounded-[3px] border"></div>
            </div>
            {title && to &&
                <a href={to} className="flex flex-col p-6 lg:p-8">
                    {Icon ?
                        <Icon size={22} className="group-hover:text-accent transition-colors" />
                        :
                        <MousePointer2Off size={22} className="group-hover:text-accent transition-colors" />
                    }
                    <p className="pt-2 pb-1">{title}</p>
                    <p className="text-secondary">{description}</p>
                </a>
            }
        </div>
    )
}
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

            <section className="max-w-300 p-8 md:pt-12 flex flex-col gap-12">
                <figure className="w-full">
                    <figcaption className="ml-8 mb-4 text-secondary text-sm">AI SERVICES</figcaption>
                    <div className="border-border border grid grid-cols-3">
                        <FigGen icon={Image} title="Image Scan" description="Scan Images" to="/image-analysis" />
                        <FigGen icon={MessageCircle} title="Message Scan" description="Scan Messages" to="/text-analysis" />
                        <FigGen title="" description="" />
                    </div>
                </figure>
                <figure className="w-full">
                    <figcaption className="ml-8 mb-4 text-secondary text-sm">STANDALONE SERVICES</figcaption>
                    <div className="border-border border grid grid-cols-3">
                        <FigGen icon={Globe} title="Webpage Age" description="Webpage Age" to="/domain-analysis/domain-age" />
                        <FigGen icon={Link2} title="DNS Lookup" description="DNS Lookup" to="/domain-analysis/dns-lookup" />
                        <FigGen title="" description="" />
                    </div>
                </figure>
            </section>
        </>
    )
}
