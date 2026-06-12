import { saira } from "@/components/Fonts";
import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
export default function AiInsight() {
    return (
        <>
            <div className="p-4 pb-0 flex flex-col border border-border rounded-xl bg-card group">
                <div className="mb-4 flex items-center gap-x-2">
                    <div className={`mb-4 text-primary `}>
                        <Sparkles size={18} className="group-hover:text-accent transition-colors" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className={`text-lg text font-semibold ${saira.className}`}>
                            AI Insights
                        </h2>
                        <p className="text-xs text-secondary">What Mildy AI has learned from recent searches</p>
                    </div>
                </div>
                <div className="grid grid-rows-5 sm:flex w-full flex-col gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full hidden sm:flex" />
                    <Skeleton className="h-4 w-full hidden sm:flex" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="mt-auto w-full p-0.5 text-xs text-center text-secondary">Mildy AI can make mistakes. Double-check before you execute</div>
            </div>
        </>
    )
}
