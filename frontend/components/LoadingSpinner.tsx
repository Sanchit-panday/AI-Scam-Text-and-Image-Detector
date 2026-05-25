import { Shield } from 'lucide-react'

export default function LoadingSpinner({ message = 'Analyzing…' }) {
    return (
        <div role="status" aria-live="polite" aria-label={message} className="flex flex-col items-center gap-5 py-10">
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-brand-600/20 border-t-brand-500 animate-spin" />
                <Shield size={22} className="text-brand-400 absolute inset-0 m-auto" aria-hidden />
            </div>
            <p className="text-slate-400 text-sm font-medium animate-pulse">{message}</p>
        </div>
    )
}
