import {
    ShieldCheck, ShieldAlert, ShieldX, ShieldQuestionMark, AlertTriangle,
    Info, Copy, Check, ExternalLink, AlertCircle
} from 'lucide-react'
import { useState } from 'react';
import ReportButton from '../ReportButton';
import type { DomainAgeResult, ScanMeta } from "@/types/types"

const PREDICTION_CONFIG = {
    safe: { label: 'Safe', icon: ShieldCheck, bg: 'bg-emerald-900/40', border: 'border-emerald-700/40', text: 'text-emerald-300', badge: 'bg-emerald-900/60 text-emerald-300' },
    suspicious: { label: 'Suspicious', icon: AlertTriangle, bg: 'bg-amber-900/40', border: 'border-amber-700/40', text: 'text-amber-300', badge: 'bg-amber-900/60 text-amber-300' },
    spam: { label: 'Spam', icon: ShieldX, bg: 'bg-red-900/40', border: 'border-red-700/40', text: 'text-red-300', badge: 'bg-red-900/60 text-red-300' },
    scam: { label: 'Scam', icon: ShieldX, bg: 'bg-red-900/40', border: 'border-red-700/40', text: 'text-red-300', badge: 'bg-red-900/60 text-red-300' },
    phishing: { label: 'Phishing', icon: ShieldAlert, bg: 'bg-rose-900/40', border: 'border-rose-700/40', text: 'text-rose-300', badge: 'bg-rose-900/60 text-rose-300' },
    unknown: { label: 'Unknown', icon: ShieldQuestionMark, bg: 'bg-gray-900/40', border: 'border-gray-700/40', text: 'text-gray-300', badge: 'bg-gray-900/60 text-gray-300' },
}

const RISK_CONFIG = {
    Low: { color: 'bg-emerald-500', text: 'text-emerald-300', badge: 'bg-emerald-900/60 text-emerald-300' },
    Medium: { color: 'bg-amber-500', text: 'text-amber-300', badge: 'bg-amber-900/60 text-amber-300' },
    High: { color: 'bg-red-500', text: 'text-red-300', badge: 'bg-red-900/60 text-red-300' },
}

export default function DomainResultCard({ domainAgeResult, scanMeta }: { domainAgeResult: DomainAgeResult, scanMeta: ScanMeta }) {


    const domain_age = domainAgeResult.age_days || 0;
    const domainRiskLevel = domainAgeResult.riskLevel || "Unavailable";
    if (!domainAgeResult) return null

    var riskCfg = RISK_CONFIG.Medium;
    var cfg = PREDICTION_CONFIG.unknown;
    var pct = 50

    if (domainAgeResult.error == null) {
        if (domain_age < 180) {
            cfg = PREDICTION_CONFIG.suspicious;
            riskCfg = RISK_CONFIG.High;
        } else if (domain_age < 365) {
            cfg = PREDICTION_CONFIG.spam;
            riskCfg = RISK_CONFIG.Medium;
        }
        cfg = PREDICTION_CONFIG.safe;
        riskCfg = RISK_CONFIG.Low;
    }
    const Icon = cfg.icon;

    if (domain_age < 14) {
        // critical risk
        pct = 95
    }
    else if (domain_age < 90) {
        // very high risk
        pct = 75
    }
    else if (domain_age < 180) {
        // high risk
        pct = 65
    }
    else if (domain_age < 365) {
        // medium risk
        pct = 50
    }
    else if (domain_age < 1095) {
        // low risk
        pct = 25;
    }
    else {
        // very low risk
        pct = 10;
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
                        <span className={`risk-badge ${riskCfg.badge}`}>{domainRiskLevel} Risk</span>
                        {/* {scanMeta && (
                            <ReportButton result={domainAgeResult} scanMeta={scanMeta} />
                        )} */}
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
                {/* {result.indicators.length > 0 && (
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
                )} */}
            </section>
        </>
    )
}
