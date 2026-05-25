import { AlertCircle, X } from 'lucide-react'

type ErrorAlertProps = {
    message: string;
    onDismiss?: () => void;
};

export default function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
    return (
        <div
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-3 bg-red-900/30 border border-red-700/50 rounded-xl px-4 py-3 text-sm text-red-300"
        >
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" aria-hidden />
            <span className="flex-1">{message}</span>
            {!onDismiss && (
                <button onClick={onDismiss} className="text-red-400 hover:text-red-200 transition-colors" aria-label="Dismiss error">
                    <X size={15} />
                </button>
            )}
        </div>
    )
}
