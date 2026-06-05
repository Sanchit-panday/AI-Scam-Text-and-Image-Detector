import { AlertTriangle, ChevronDown, ChevronUp, FileText, Image, Trash2 } from 'lucide-react';
import { TextScan, ImageScan } from "@/context/ScanContext";

type props = {
    type: "text" | "image";
    item: TextScan | ImageScan;
    expanded: boolean;
    onToggle: () => void;
    onDelete: (id: string) => void;
}
function AnalysisHistoryCard({
    item,
    expanded,
    onToggle,
    onDelete }: props) {
    const SCANTYPE = {
        text: { icon: FileText, text: "text-violet-400" },
        image: { icon: Image, text: "text-brand-400" },
    }
    function Icon(type: keyof typeof SCANTYPE) {
        const cfg = SCANTYPE[item.type as keyof typeof SCANTYPE] ?? SCANTYPE.text;
        const IconComponent = cfg.icon;
        return (
            <IconComponent size={15} className={cfg.text} aria-hidden />
        )
    }
    return (
        <div><div className="border border-slate-700/50 rounded-xl overflow-hidden mb-2 hover:border-slate-600 transition-colors">
            <div className="flex items-center gap-3 px-4 py-3">
                {/* Type icon */}
                <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center shrink-0">
                    {Icon(item.type)}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        {/* <span className={`risk-badge border', ${colorClass}`}>{item.prediction}</span> */}
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                            {/* <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden /> */}
                            {item.riskLevel} Risk
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{new Date(item.timestamp).toLocaleString()}</p>
                    {/* {item.preview && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">{item.preview}</p>
                    )} */}
                </div>

                {/* Confidence */}
                <div className="text-right shrink-0">

                    <p className="text-sm font-bold text-white tabular-nums">{item.confidence || 0}%</p>
                    <p className="text-xs text-slate-500">confidence</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                    <button
                        onClick={onToggle}
                        className="btn-ghost p-1.5"
                        aria-label={expanded ? 'Collapse details' : 'Expand details'}
                    >
                        {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="btn-ghost p-1.5 hover:text-red-400"
                        aria-label="Delete this scan"
                    >
                        <Trash2 size={15} />
                    </button>
                </div>
            </div>

            {/* Expanded detail */}
            {(item.type === "image" || item.type === "text") && expanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-700/50 bg-slate-900/30 space-y-2">
                    {item.indicators && item.indicators.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-slate-400 mb-1">Indicators</p>
                            <ul className="space-y-0.5">
                                {item.indicators.map((r, i) => (
                                    <li key={i} className="text-xs text-slate-300 flex items-center gap-1.5">
                                        <AlertTriangle size={11} className="text-amber-400 shrink-0" aria-hidden />
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {item.type === "image" && item.extractedText && (
                        <div>
                            <p className="text-xs font-semibold text-slate-400 mb-1">OCR Text</p>
                            <p className="text-xs text-slate-300 line-clamp-3 font-mono">{item.extractedText}</p>
                        </div>
                    )}
                </div>
            )}
        </div></div>
    )
}

export default AnalysisHistoryCard