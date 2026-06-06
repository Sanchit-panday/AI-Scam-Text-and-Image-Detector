"use client"
import ErrorAlert from "@/components/Error"
import LoadingSpinner from "@/components/LoadingSpinner"
import DomainAgeCard from "@/components/ResultCards/DomainAgeCard"
import { AlertCircle, FileText, Send, X } from "lucide-react"
import { useRef, useState } from "react";

import { getDomainAge } from "./getDomainAge"
import { DomainAgeResult, ScanMeta } from "@/types/types"
import { useScanStore } from "@/context/ScanContext"

function page() {
    const MAX_URL_LENGTH = 1000;
    const PLACEHOLDER_EXAMPLES = [
        'paste an url',
    ]

    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [result, setResult] = useState<DomainAgeResult | null>(null);
    const [error, setError] = useState<any>(null);
    const [scanMeta, setScanMeta] = useState<ScanMeta | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const remaining = MAX_URL_LENGTH - url.length
    const isOverLimit = url.length > MAX_URL_LENGTH

    const { addScan } = useScanStore();


    const analyzeDomainAge = async (url: string) => {

        if (!url.trim()) {
            setError("Please enter a domain or URL.");
            return;
        }

        try {
            setLoading(true);
            setResult(null);
            setError(null);

            const data = await getDomainAge(url);

            setResult(data);

            const meta: ScanMeta = { type: 'domain-age', input: url, timestamp: new Date().toISOString() }
            setScanMeta(meta);
            // ! important to use data , not result ! do not change
            addScan({
                type: "domain-age",
                url: data.domain ?? "undefined",
                createdAt: data.created_date ?? "undefined",
                age: data.age_days ?? "undefined",
                riskLevel: data.riskLevel
            });
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unknown error occurred"
            );

        } finally {
            setLoading(false);
        }
    }

    const clearForm = () => {
        setUrl("");
        setResult(null);
        setError(null);
        setScanMeta(null)
        textareaRef.current?.focus()
    };

    function handleKeyDown(
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            analyzeDomainAge(url);
        }
    }
    return (
        <>
            {/* data form */}
            <div className="space-y-6 max-w-3xl">
                <div className="flex items-center gap-3 mb-1">
                    <FileText size={22} className="text-brand-400" aria-hidden />
                    <h1 className="text-2xl font-bold text-white">Wesbite Age Checker</h1>
                </div>
                <p className="text-slate-400 text-sm">Paste any suspicious URL and we will check it for you.</p>

                {/* Input area */}
                <div className="glass-card p-5 space-y-4">
                    <div className="relative">
                        <label htmlFor="text-input" className="block text-sm font-medium text-slate-300 mb-2">
                            Paste URL to analyze
                        </label>
                        <textarea
                            id="message"
                            ref={textareaRef}
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={PLACEHOLDER_EXAMPLES[0]}
                            rows={1}
                            disabled={loading}
                            aria-describedby="char-count-hint"
                            aria-invalid={isOverLimit}
                            maxLength={MAX_URL_LENGTH + 500}
                            className={`input-base resize-y min-h-10 font-mono text-sm leading-relaxed disabled:opacity-50 w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3
                            text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors ${isOverLimit ? 'ring-2 ring-red-500 border-red-600' : ''}`}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        {/* Char count */}
                        <p
                            id="char-count-hint"
                            className={`text-xs tabular-nums ${(isOverLimit) ? 'text-red-400' : (url.length / MAX_URL_LENGTH) > 0.7 ? 'text-amber-400' : 'text-slate-500'}`}
                        >
                            {url.length.toLocaleString()} / {MAX_URL_LENGTH.toLocaleString()} characters
                            {isOverLimit && ` (${Math.abs(remaining)} over limit)`}
                        </p>

                        <div className="flex items-center gap-2">
                            {(url.length > 0 || result || error) && (
                                <button
                                    onClick={clearForm}
                                    className="button-ghost text-sm py-2 px-3 bg-gray-500/20"
                                    disabled={loading}
                                    aria-label="Clear url"
                                >
                                    <X size={15} aria-hidden /> Clear
                                </button>
                            )}

                            {/* submit button */}
                            <button
                                onClick={() => analyzeDomainAge(url)}
                                disabled={loading || !!error}
                                className="button-primary"
                                aria-label="Analyze url"
                            >
                                <Send size={16} aria-hidden />
                                {loading ? 'Analyzing…' : 'Analyze'}
                            </button>
                        </div>
                    </div>

                    {(url.length > MAX_URL_LENGTH) && (
                        <ErrorAlert message={`URL exceeds the ${MAX_URL_LENGTH.toLocaleString()} character limit. Please shorten it.`} />
                    )}
                    {url.trim().length === 0 && !loading && (
                        <p className="text-xs text-slate-600 flex items-center gap-1.5">
                            <AlertCircle size={12} /> Content is required to run the analysis.
                        </p>
                    )}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="glass-card p-6">
                        <LoadingSpinner message="Scanning for threats using AI…" />
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <ErrorAlert message={error} onDismiss={() => setError(null)} />
                )}

                {/* Result */}
                {result && scanMeta && !loading && (
                    <DomainAgeCard domainAgeResult={result}
                        scanMeta={scanMeta}
                    />
                )}
            </div>
        </>
    )
}

export default page