import { LucideIcon, MousePointer2Off } from "lucide-react";
type TileProps = {
    icon?: LucideIcon,
    title?: string,
    description?: string,
    to?: string,
    disabled?: boolean,
}
export function CreateTile({ icon: Icon, title, description, disabled, to }: TileProps) {
    return (
        <div className={`border-border border relative group flex flex-col h-full lg:border-t-0 ${disabled ? "hidden lg:block" : ""}`}>
            <div className="hidden md:block absolute pointer-events-none inset-0 z-10 select-none" aria-hidden="true">
                <div className="absolute bg-background -left-1.75 -top-1.75 w-3.5 h-3.5 rounded-[3px] border"></div>
                <div className="absolute bg-background -left-1.75 -bottom-1.75 w-3.5 h-3.5 rounded-[3px] border"></div>
                <div className="absolute bg-background -right-1.75 -top-1.75 w-3.5 h-3.5 rounded-[3px] border"></div>
                <div className="absolute bg-background -right-1.75 -bottom-1.75 w-3.5 h-3.5 rounded-[3px] border"></div>
            </div>
            {title &&
                <a href={to ?? "#"} className={`flex flex-col p-6 lg:p-8 ${"pointer-events-" + (disabled ? "none" : "auto")}`} aria-disabled={disabled}>
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