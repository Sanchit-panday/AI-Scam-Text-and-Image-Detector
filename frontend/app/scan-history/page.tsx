"use client"
import { useState } from 'react'
import { History, Trash2, RefreshCw, ChevronDown, ChevronUp, AlertTriangle, FileText, Image } from 'lucide-react'
import { ScanHistoryItem, useScanStore } from "../../context/ScanContext";

import Link from 'next/link';

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

function HistoryRow({ item, onDelete, expanded, onToggle }: HistoryRowProps) {
    const prediction =
        item.prediction?.toLowerCase() as keyof typeof PREDICTION_COLORS
    const colorClass =
        PREDICTION_COLORS[prediction] ??
        'bg-slate-700 text-slate-300 border-slate-600'

    const dot = RISK_DOT[item.riskLevel] || 'bg-slate-500'

    return (
        <div className="border border-slate-700/50 rounded-xl overflow-hidden mb-2 hover:border-slate-600 transition-colors">
            <div className="flex items-center gap-3 px-4 py-3">
                {/* Type icon */}
                <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center shrink-0">
                    {item.type === 'image'
                        ? <Image size={15} className="text-violet-400" aria-hidden />
                        : <FileText size={15} className="text-brand-400" aria-hidden />
                    }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className={`risk-badge border', ${colorClass}`}>{item.prediction}</span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                            <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden />
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
            {expanded && (
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
                    {item.extractedText && (
                        <div>
                            <p className="text-xs font-semibold text-slate-400 mb-1">OCR Text</p>
                            <p className="text-xs text-slate-300 line-clamp-3 font-mono">{item.extractedText}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default function ScanHistory() {
    const { history, deleteScan, clearHistory } = useScanStore()
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [confirmClear, setConfirmClear] = useState(false)
    const [filter, setFilter] = useState('all')

    const filtered = filter === 'all'
        ? history
        : history.filter(h => {
            if (filter === 'threats') return ['spam', 'scam', 'phishing', 'suspicious'].includes(h.prediction?.toLowerCase())
            if (filter === 'safe') return h.prediction?.toLowerCase() === 'safe'
            if (filter === 'text') return h.type === 'text'
            if (filter === 'image') return h.type === 'image'
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
