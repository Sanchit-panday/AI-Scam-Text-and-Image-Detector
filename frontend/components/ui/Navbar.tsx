"use client";

import { useState } from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrickWallFire, FileText, History, Image, LayoutDashboard, Menu, X } from "lucide-react"

const navItems = [
    { to: '/', key: "dashboard", label: 'Dashboard', icon: LayoutDashboard },
    { to: '/text-analysis', key: "predict-text", label: 'Text Analysis', icon: FileText },
    { to: '/image-analysis', key: "predict-image", label: 'Image Analysis', icon: Image },
    { to: '/scan-history', key: "history", label: 'Scan History', icon: History },
]
function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <>
            <header className="sticky top-0 z-40 glass-card rounded-none border-x-0 border-t-0 px-4 md:px-6 h-16 flex items-center justify-between">
                <a href="/">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-900/50">
                            <BrickWallFire size={20} className="text-red-300" aria-hidden />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white flex items-center">
                            Mildy
                            <span className="ml-1.5 text-[10px] font-medium text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                                AI
                            </span>
                        </span>
                    </div>
                </a>    

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                    {navItems.map(({ to, key, label, icon: Icon }) => (
                        <Link
                            key={key}
                            href={to}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors 
                        ${pathname === to
                                    ? "bg-brand-600/20 text-brand-300 border border-brand-600/30"
                                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-700/50"
                                }`}
                        >
                            <Icon size={16} aria-hidden />
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden btn-ghost p-2"
                    onClick={() => setMobileOpen(v => !v)}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </header>

            {/* Mobile nav drawer */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-30 pt-16">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                    <nav className="relative bg-slate-900 border-r border-slate-700 w-72 min-h-full p-4 flex flex-col gap-1" aria-label="Mobile navigation">
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <Link
                                key={to}
                                href={to}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                                ${pathname === to ? "bg-brand-600/20 text-brand-300 border border-brand-600/30" :
                                        "text-slate-400 hover:text-slate-100 hover:bg-slate-700/50"}}`}
                            >
                                <Icon size={18} aria-hidden />
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </>
    )
}

export default Navbar