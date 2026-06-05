"use client"
import { useState } from 'react'
import { History, Trash2, RefreshCw, ChevronDown, ChevronUp, AlertTriangle, FileText, Image, Search } from 'lucide-react'
import { ScanHistoryItem, useScanStore } from "../../context/ScanContext";

import Link from 'next/link';
import DomainAgeHistoryCard from './DomainAgeHistoryCard';
import AnalysisHistoryCard from './AnalysisHistoryCard';

type HistoryRowProps = {
    item: ScanHistoryItem
    onDelete: (id: string) => void
    expanded: boolean
    onToggle: () => void
}


const PREDICTION_COLORS = {
    safe: 'bg-emerald-900/50 text-emerald-300 border-emerald-700/40',
    suspicious: 'bg-amber-900/50 text-amber-300 border-amber-700/40',
    spam: 'bg-red-900/50 text-red-300 border-red-700/40',
    scam: 'bg-red-900/50 text-red-300 border-red-700/40',
    phishing: 'bg-rose-900/50 text-rose-300 border-rose-700/40',
}

const RISK_DOT = {
    Low: 'bg-emerald-500',
    Medium: 'bg-amber-500',
    High: 'bg-red-500',
}
const SCANTYPE = {
    "domain-age": { icon: Search, text: "text-blue-400" },
    text: { icon: FileText, text: "text-violet-400" },
    image: { icon: Image, text: "text-brand-400" },
}


function HistoryRow({ item, onDelete, expanded, onToggle }: HistoryRowProps) {
    function Icon(type: keyof typeof SCANTYPE) {
        const cfg = SCANTYPE[item.type as keyof typeof SCANTYPE] ?? SCANTYPE.text;
        const IconComponent = cfg.icon;
        return (
            <IconComponent size={15} className={cfg.text} aria-hidden />
        )
    }
    if (item.type === "text" || item.type === "image") {
        const prediction =
            item.prediction?.toLowerCase() as keyof typeof PREDICTION_COLORS
        const colorClass =
            PREDICTION_COLORS[prediction] ??
            'bg-slate-700 text-slate-300 border-slate-600'

        // const dot = RISK_DOT[item.riskLevel] || 'bg-slate-500'
    }
    switch (item.type) {
        case "text":
        case "image":
            return (
                <AnalysisHistoryCard
                    key={item.id}
                    type={item.type}
                    item={item}
                    expanded={expanded}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            );

        case "domain-age":
            return (
                <DomainAgeHistoryCard
                    key={item.id}
                    item={item}
                    expanded={expanded}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            );

        default:
            return null;
    }
}

export default function ScanHistory() {
    const { history, deleteScan, clearHistory } = useScanStore()
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [confirmClear, setConfirmClear] = useState(false)
    const [filter, setFilter] = useState('all')

    const filtered = filter === 'all'
        ? history
        : history.filter(h => {
            if (filter === 'threats')
                return (h.type === 'text' || h.type === 'image') && ['spam', 'scam', 'phishing', 'suspicious'].includes(h.prediction?.toLowerCase() ?? '')
            if (filter === 'safe')
                return (h.type === 'text' || h.type === 'image') && h.prediction?.toLowerCase() === 'safe'
            if (filter === 'text') return h.type === 'text'
            if (filter === 'image') return h.type === 'image'
            if (filter === 'domain') return h.type === 'domain-age'
            return true
        })

    function handleDelete(id: string) {
        deleteScan(id)
        if (expandedId === id) setExpandedId(null)
    }

    function handleClear() {
        if (!confirmClear) { setConfirmClear(true); return }
        clearHistory()
        setConfirmClear(false)
        setExpandedId(null)
    }

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <History size={22} className="text-brand-400" aria-hidden />
                    <h1 className="text-2xl font-bold text-white">Scan History</h1>
                </div>
                <p className="text-slate-400 text-sm">Your last {history.length} scans are stored locally in your browser.</p>
            </div>

            {history.length === 0 ? (
                <div className="glass-card p-12 flex flex-col items-center gap-4 text-center">
                    <History size={40} className="text-slate-600" aria-hidden />
                    <div>
                        <p className="font-semibold text-slate-300">No scans yet</p>
                        <p className="text-sm text-slate-500 mt-1">Your analysis history will appear here after you run a scan.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/text-analysis" className="button-primary text-sm">Analyze Text</Link>
                        <Link href="/image-analysis" className="button-primary text-sm">Analyze Image</Link>
                    </div>
                </div>
            ) : (
                <>
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-3 justify-between">
                        Filters
                        <div className="flex gap-1.5 flex-wrap" role="group" aria-label="Filter scans">
                            {[
                                { key: 'all', label: 'All' },
                                { key: 'threats', label: 'Threats' },
                                { key: 'safe', label: 'Safe' },
                                { key: 'text', label: 'Text' },
                                { key: 'image', label: 'Image' },
                                { key: 'domain', label: 'Domain' },
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key)}
                                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors
                                        ${filter === key
                                            ? 'bg-brand-600 text-white'
                                            : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                                        }
                                    `}
                                    aria-pressed={filter === key}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Clear all */}
                        <button
                            onClick={handleClear}
                            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5
                                ${confirmClear
                                    ? 'bg-red-700 text-white hover:bg-red-600'
                                    : 'bg-slate-700 text-red-400 hover:bg-slate-600'
                                }
                            `}
                            aria-label={confirmClear ? 'Confirm clear all history' : 'Clear all history'}
                        >
                            <Trash2 size={12} aria-hidden />
                            {confirmClear ? 'Confirm clear all' : 'Clear all'}
                        </button>
                    </div>

                    {filtered.length === 0 ? (
                        <p className="text-center text-slate-500 py-8">No scans match this filter.</p>
                    ) : (
                        <div>
                            {filtered.map(item => (
                                <HistoryRow
                                    key={item.id}
                                    item={item}
                                    onDelete={handleDelete}
                                    expanded={expandedId === item.id}
                                    onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                />
                            ))}
                            <p className="text-xs text-slate-600 text-center mt-4">
                                Showing {filtered.length} of {history.length} scans · Stored locally
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
