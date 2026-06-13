"use client";
import ErrorAlert from "@/components/Error";
import LoadingSpinner from "@/components/LoadingSpinner";
import ResultCard from "@/components/ResultCard";
import { useScanStore } from "@/context/ScanContext";
import { AlertCircle, FileText, Loader, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ScanMeta } from "@/types/types"
import { getTextAnalysis } from "./getTextAnalysis";

export default function TextAnalysisPage() {
    const MAX_MESSAGE_LENGTH = 5000;
    const PLACEHOLDER_EXAMPLES = [
        'Paste an email, SMS, chat message, social media post, or website content here…\n\nExample: "URGENT: Your bank account has been suspended. Click here to verify your identity immediately: http://suspicious-link.com"',
    ]

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { pendingQuery, setPendingQuery } = useScanStore();
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [scanMeta, setScanMeta] = useState<ScanMeta | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const remaining = MAX_MESSAGE_LENGTH - message.length
    const isOverLimit = message.length > MAX_MESSAGE_LENGTH

    const { addScan } = useScanStore();

    const analyzeMessage = async () => {

        if (!message.trim()) {
            setError("Please enter a message.");
            return;
        }

        try {
            setLoading(true);
            setResult(null);
            setError(null);

            const data = await getTextAnalysis(message);
            setResult(data);

            const meta: ScanMeta = { type: 'text', input: message, timestamp: new Date().toISOString() }
            setScanMeta(meta)

            // save to localStorage
            addScan({
                type: "text",
                prediction: data.prediction,
                confidence: data.confidence,
                riskLevel: data.riskLevel,
                message,
                urls: data.urls ?? [],
                indicators: data.indicators ?? [],
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    const clearForm = () => {
        setMessage("");
        setResult(null);
        setError(null);
        setScanMeta(null)
        setPendingQuery("");
        textareaRef.current?.focus()
    };

    function handleKeyDown(
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            analyzeMessage();
        }
    }
    useEffect(() => {
        if (pendingQuery) {
            setMessage(pendingQuery);
            setPendingQuery("");
        }
    }, [pendingQuery]);
    return (
        <>
            {/* data form */}
            <div className="space-y-6 mt-6 max-w-3xl">
                <div className="flex items-center gap-3 mb-1">
                    <FileText size={22} className="text-brand-400" aria-hidden />
                    <h1 className="text-2xl font-bold text-white">Text Analysis</h1>
                </div>
                <p className="text-slate-400 text-sm">Paste any suspicious message, email, SMS, or web content to scan it with AI.</p>

                {/* Input area */}
                <div className="glass-card p-5 space-y-4">
                    <div className="relative">
                        <label htmlFor="text-input" className="block text-sm font-medium text-slate-300 mb-2">
                            Paste content to analyze
                        </label>
                        <textarea
                            id="message"
                            ref={textareaRef}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={PLACEHOLDER_EXAMPLES[0]}
                            rows={10}
                            disabled={loading}
                            aria-describedby="char-count-hint"
                            aria-invalid={isOverLimit}
                            maxLength={MAX_MESSAGE_LENGTH + 500}
                            className={`input-base resize-y min-h-40 font-mono text-sm leading-relaxed disabled:opacity-50 w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3
                            text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors ${isOverLimit ? 'ring-2 ring-red-500 border-red-600' : ''}`}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        {/* Char count */}
                        <p
                            id="char-count-hint"
                            className={`text-xs tabular-nums ${(isOverLimit) ? 'text-red-400' : (message.length / MAX_MESSAGE_LENGTH) > 0.7 ? 'text-amber-400' : 'text-slate-500'}`}
                        >
                            {message.length.toLocaleString()} / {MAX_MESSAGE_LENGTH.toLocaleString()} characters
                            {isOverLimit && ` (${Math.abs(remaining)} over limit)`}
                        </p>

                        <div className="flex items-center gap-2">
                            {(message.length > 0 || result || error) && (
                                <button
                                    onClick={clearForm}
                                    className="button-ghost text-sm py-2 px-3"
                                    disabled={loading}
                                    aria-label="Clear text"
                                >
                                    <X size={15} aria-hidden /> Clear
                                </button>
                            )}

                            {/* submit button */}
                            <button
                                onClick={analyzeMessage}
                                disabled={loading || !!error}
                                className="button-primary"
                                aria-label="Analyze text"
                            >
                                <Send size={16} aria-hidden />
                                {loading ? 'Analyzing…' : 'Analyze'}
                            </button>
                        </div>
                    </div>

                    {(message.length > MAX_MESSAGE_LENGTH) && (
                        <ErrorAlert message={`Text exceeds the ${MAX_MESSAGE_LENGTH.toLocaleString()} character limit. Please shorten it.`} />
                    )}
                    {message.trim().length === 0 && !loading && (
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
                    <ResultCard result={result}
                        scanMeta={scanMeta}
                    />
                )}
            </div>
        </>
    );
}