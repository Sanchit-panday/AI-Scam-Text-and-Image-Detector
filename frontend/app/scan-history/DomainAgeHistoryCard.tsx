import {
    Globe,
    ChevronDown,
    ChevronUp,
    Trash2,
    Calendar,
} from "lucide-react";

import { DomainAgeScan } from "@/context/ScanContext";

type Props = {
    item: DomainAgeScan;
    expanded: boolean;
    onToggle: () => void;
    onDelete: (id: string) => void;
};

export default function DomainAgeHistoryCard({
    item,
    expanded,
    onToggle,
    onDelete,
}: Props) {
    return (
        <div className="border border-slate-700/50 rounded-xl overflow-hidden mb-2">

            <div className="flex items-center gap-3 px-4 py-3">

                <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">
                    <Globe
                        size={15}
                        className="text-cyan-400"
                    />
                </div>

                <div className="flex-1">
                    <p className="font-medium text-white">
                        {item.url}
                    </p>

                    <p className="text-xs text-slate-500">
                        {new Date(
                            item.timestamp
                        ).toLocaleString()}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-sm font-bold text-white">
                        {item.riskLevel}
                    </p>

                    <p className="text-xs text-slate-500">
                        Risk
                    </p>
                </div>

                <button
                    onClick={onToggle}
                    className="btn-ghost p-1.5"
                >
                    {expanded ? (
                        <ChevronUp size={15} />
                    ) : (
                        <ChevronDown size={15} />
                    )}
                </button>

                <button
                    onClick={() =>
                        onDelete(item.id)
                    }
                    className="btn-ghost p-1.5 hover:text-red-400"
                >
                    <Trash2 size={15} />
                </button>
            </div>

            {expanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-700/50">

                    <p className="text-sm text-slate-300">
                        Domain:
                        <span className="ml-2 text-white">
                            {item.url}
                        </span>
                    </p>

                    <p className="text-sm text-slate-300">
                        Created:
                        <span className="ml-2 text-white">
                            {item.createdAt ??
                                "Unknown"}
                        </span>
                    </p>

                    <p className="text-sm text-slate-300">
                        Age:
                        <span className="ml-2 text-white">
                            {item.age ??
                                "Unknown"}{" "}
                            days
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}