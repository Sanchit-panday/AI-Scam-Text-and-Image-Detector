import {
    ShieldCheck, ShieldAlert, ShieldX, AlertTriangle,
    Info, Copy, Check, ExternalLink, AlertCircle
} from 'lucide-react'
import { useState } from 'react';
import ReportButton from './ReportButton';
import type { Result, ScanMeta } from "@/types/types"

const PREDICTION_CONFIG = {
    safe: { label: 'Safe', icon: ShieldCheck, bg: 'bg-emerald-900/40', border: 'border-emerald-700/40', text: 'text-emerald-300', badge: 'bg-emerald-900/60 text-emerald-300' },
    suspicious: { label: 'Suspicious', icon: AlertTriangle, bg: 'bg-amber-900/40', border: 'border-amber-700/40', text: 'text-amber-300', badge: 'bg-amber-900/60 text-amber-300' },
    spam: { label: 'Spam', icon: ShieldX, bg: 'bg-red-900/40', border: 'border-red-700/40', text: 'text-red-300', badge: 'bg-red-900/60 text-red-300' },
    scam: { label: 'Scam', icon: ShieldX, bg: 'bg-red-900/40', border: 'border-red-700/40', text: 'text-red-300', badge: 'bg-red-900/60 text-red-300' },
    phishing: { label: 'Phishing', icon: ShieldAlert, bg: 'bg-rose-900/40', border: 'border-rose-700/40', text: 'text-rose-300', badge: 'bg-rose-900/60 text-rose-300' },
}

const RISK_CONFIG = {
    Low: { color: 'bg-emerald-500', text: 'text-emerald-300', badge: 'bg-emerald-900/60 text-emerald-300' },
    Medium: { color: 'bg-amber-500', text: 'text-amber-300', badge: 'bg-amber-900/60 text-amber-300' },
    High: { color: 'bg-red-500', text: 'text-red-300', badge: 'bg-red-900/60 text-red-300' },
}

export default function ResultCard({ result, scanMeta }: { result: Result, scanMeta: ScanMeta }) {
    const [copied, setCopied] = useState(false)

    if (!result) return null

    const cfg = (result.prediction === 'safe') ? PREDICTION_CONFIG.safe : PREDICTION_CONFIG.suspicious
    const riskCfg = RISK_CONFIG[result.riskLevel] || RISK_CONFIG.Medium
    const Icon = cfg.icon
    const pct = result.confidence || 0

    async function copyOcr() {
        await navigator.clipboard.writeText(result.extractedText || "")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <>
            <section
                aria-label="Analysis result"
                className={`glass-card border-2 p-6 space-y-5 transition-all ${cfg.bg} ${cfg.border}`}
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${cfg.bg} border ${cfg.border}`}>
                            <Icon size={28} className={cfg.text} aria-hidden />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-0.5">Classification</p>
                            <h2 className={"text-2xl font-bold"}>{cfg.label}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className={`risk-badge ${riskCfg.badge}`}>{result.riskLevel} Risk</span>
                        {/* {scanMeta && (
                            <ReportButton result={{ type: "image" }} scanMeta={scanMeta} />
                        )} */}
                        {scanMeta && (
                            <ReportButton result={{
                                type: scanMeta.type as "text" | "image",
                                prediction: result.prediction,
                                confidence: result.confidence,
                                riskLevel: result.riskLevel,
                                reasons: result.indicators,
                                extractedText: result.extractedText,
                                urls: result.urls,

                            }} scanMeta={scanMeta} />
                        )}

                    </div>
                </div>

                {/* Confidence */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-slate-300">Confidence Score</span>
                        <span className={'text-xl font-bold tabular-nums'}>{pct}%</span>
                    </div>
                    <div className="h-3 bg-slate-700/60 rounded-full overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`Confidence: ${pct}%`}>
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${riskCfg.color}`}
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                </div>

                {/* indicators */}
                {result.indicators.length > 0 && (
                    <div>
                        <p className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                            <Info size={15} aria-hidden />Detected Indicators
                        </p>
                        <ul className="space-y-1.5">
                            {result.indicators.map((r, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                    <AlertCircle size={14} className={`mt-0.5 shrink-0 ${cfg.text}`} aria-hidden />
                                    {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* URLs */}
                {result.urls.length > 0 && (
                    <div>
                        <p className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                            <ExternalLink size={15} aria-hidden /> Detected URLs
                        </p>
                        <ul className="space-y-1.5">
                            {result.urls.map((url, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs bg-red-900/20 border border-red-800/30 rounded-lg px-3 py-1.5 font-mono text-red-300 break-all">
                                    <AlertCircle size={12} className="shrink-0 text-red-400" aria-hidden />
                                    {url}
                                    <span className="ml-auto text-red-400 text-xs whitespace-nowrap">Suspicious</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* OCR Text */}
                {result.extractedText && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-slate-300">Extracted Text (OCR)</p>
                            <button
                                onClick={copyOcr}
                                className="button-ghost text-xs py-1 px-2 gap-1.5"
                                aria-label="Copy extracted text"
                            >
                                {copied ? <Check size={13} /> : <Copy size={13} />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <pre className="text-xs text-slate-300 bg-slate-900/50 border border-slate-700/50 rounded-xl p-3 whitespace-pre-wrap break-all max-h-40 overflow-y-auto">
                            {result.extractedText}
                        </pre>
                    </div>
                )}
            </section>
        </>
    )
}
