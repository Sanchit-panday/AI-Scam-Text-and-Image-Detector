"use client"
import { ShieldOff, Home, FileText, Image, History } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from "next/navigation"

const suggestions = [
  { to: '/',        label: 'Dashboard',      icon: Home,     description: 'Overview & metrics' },
  { to: '/text-analysis',    label: 'Text Analysis',  icon: FileText, description: 'Scan emails & messages' },
  { to: '/image-analysis',   label: 'Image Analysis', icon: Image,    description: 'Scan screenshots' },
  { to: '/scan-history', label: 'Scan History',   icon: History,  description: 'Recent scans' },
]

export default function NotFound() {
  const  pathname  = usePathname()

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-16">
      {/* Glowing background blob */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full bg-brand-600/5 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center text-center max-w-lg w-full gap-8">

        {/* Icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shadow-2xl animate-pulse-ring">
            <ShieldOff size={40} className="text-slate-500" aria-hidden />
          </div>
          <span className="absolute -top-2 -right-2 text-2xl font-black text-brand-500 bg-slate-950 px-1 rounded leading-none select-none">
            404
          </span>
        </div>

        {/* Copy */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Page not found</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The path{' '}
            <code className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-brand-300 text-xs font-mono">
              {pathname}
            </code>{' '}
            doesn't exist in PhishGuard AI.
          </p>
        </div>

        {/* Quick nav */}
        <div className="w-full glass-card p-4 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-left mb-3">
            Go somewhere safe
          </p>
          {suggestions.map(({ to, label, icon: Icon, description }) => (
            <Link
              key={to}
              href={to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-600/20 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-brand-400 group-hover:scale-110 transition-transform" aria-hidden />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{label}</p>
                <p className="text-xs text-slate-500">{description}</p>
              </div>
              <span className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors text-sm">→</span>
            </Link>
          ))}
        </div>

        <Link href="/" className="button-primary text-sm">
          <Home size={15} aria-hidden />
          Back to Dashboard
        </Link>

      </div>
    </div>
  )
}
