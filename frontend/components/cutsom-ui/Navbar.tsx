"use client";

import { useRef, useState } from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrickWallFire, ChevronsDownUp, ChevronsUpDown, FileText, History, Image, LayoutDashboard, Menu, Settings, X } from "lucide-react"
import './customUi.css'
const navItems = [
    { to: '/', key: "dashboard", label: 'Dashboard', icon: LayoutDashboard },
    { to: '/text-analysis', key: "predict-text", label: 'Text Analysis', icon: FileText },
    { to: '/image-analysis', key: "predict-image", label: 'Image Analysis', icon: Image },
    { to: '/scan-history', key: "history", label: 'Scan History', icon: History },
]
function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isDropdownPanel, setIsDropdownPanel] = useState(false);
    const navHoveredRef = useRef(false);
    const panelHoveredRef = useRef(false);
    const [panelContent, setPanelContent] = useState<string | undefined>();

    const timeoutRef = useRef<number | null>(null);
    const scheduleClose = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            if (
                !navHoveredRef.current &&
                !panelHoveredRef.current
            ) {
                setIsDropdownPanel(false);
            }
        }, 100);
    };
    const centerMenuItems = [
        { id: 'services', label: 'Services', to: '/services' },
        { id: 'models', label: 'Models', to: '/models' },
        { id: 'resources', label: 'Resources', to: '/resources' },
    ];

    return (
        <>
            <header className="sticky top-0 z-40 border-x-0 border-t-0">
                <span className='grid md:grid-cols-3 grid-cols-2 z-40 glass-card rounded-none px-4 md:px-6 h-16 items-center'>
                    <a href="/">
                        <div className="flex items-center justify-start gap-3">
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
                    <div className='h-full hidden md:flex justify-center items-center'>
                        <div className='flex gap-x-4 text-sm text-gray-400 items-center'>
                            {centerMenuItems.map((item) => (
                                <a href={item.to}
                                    key={item.id}
                                >
                                    <button
                                        onMouseEnter={() => {
                                            navHoveredRef.current = true;
                                            setIsDropdownPanel(true);
                                            setPanelContent(item.id)
                                        }}
                                        onMouseLeave={() => {
                                            navHoveredRef.current = false;
                                            scheduleClose();
                                        }}
                                        className="flex items-center gap-1 px-3 py-1 rounded-xl navbar-items-animate navbar-middle-items-animate"
                                    >
                                        {item.label} <ChevronsUpDown size={15} />
                                    </button>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center justify-end gap-1 text-gray-400" aria-label="Main navigation">
                        <a href='/scan-history' className='p-2 rounded-full navbar-items-animate'><History size={20} /></a>
                        {/* {navItems.map(({ to, key, label, icon: Icon }) => (
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
                    ))} */}
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden btn-ghost p-2 flex justify-end"
                        onClick={() => setMobileOpen(v => !v)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </span>
                <div className={`absolute top-full w-full left-0 z- mt-1 flex z-50 justify-center`}>
                    <div onMouseEnter={() => { panelHoveredRef.current = true; }}
                        onMouseLeave={() => {
                            panelHoveredRef.current = false;
                            scheduleClose();
                        }}
                        className={`mx-auto p-2 glass-card transition-all duration-250 delay-70
                            ${isDropdownPanel ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                        <div className=' grid border-2 rounded-[1rem] bg-[#1e293b]/80'>
                            {panelContent == 'services' &&
                                <div className='grid grid-cols-2 divide-x w-full justify-start items-start'>
                                    <div className='h-full w-[200] text-sm flex flex-col p-2 pt-4'>
                                        <p className='text-slate-400 text-xs px-4 pb-2'>AI services</p>
                                        <a href="/text-analysis" className='flex flex-col px-4 py-3 gap-3 hover:bg-slate-900/40 border border-transparent hover:border-slate-700 rounded-xl'>
                                            <small>Text Analyzer</small>
                                            <small className='text-slate-400'>Analyze text messages, emails or whatsapp forwards</small>
                                        </a>
                                        <a href="/image-analysis" className='flex flex-col px-4 py-3 gap-3 hover:bg-slate-900/40 border border-transparent hover:border-slate-700 rounded-xl'>
                                            <small className=''>Image Analyzer</small>
                                            <small className='text-slate-400'>Analyze screenshot messages <br />or emails</small>
                                        </a>
                                    </div>
                                    <div className='h-full w-[200] text-sm flex flex-col p-2 pt-4'>
                                        <p className='text-slate-400 text-xs px-4 pb-2'>Standalone services</p>
                                        <a href="/domain-analysis/domain-age" className='flex flex-col px-4 py-3 gap-3 hover:bg-slate-900/40 border border-transparent hover:border-slate-700 rounded-xl'>
                                            <small>Webpage Age</small>
                                            <small className='text-slate-400'>Analyze text messages, emails or whatsapp forwards</small>
                                        </a>
                                        <a href="/domain-analysis/dns-lookup" className='flex flex-col px-4 py-3 gap-3 hover:bg-slate-900/40 border border-transparent hover:border-slate-700 rounded-xl'>
                                            <small className=''>Dns Lookup</small>
                                            <small className='text-slate-400'>Analyze screenshot messages <br />or emails</small>
                                        </a>
                                    </div>
                                </div>
                            }
                            {panelContent == 'models' &&
                                <div className='grid grid-cols-2 divide-x w-full justify-start items-start'>
                                    <div className='h-full w-[200] text-sm flex flex-col p-2'>
                                        <a href="#" className='flex flex-col px-4 py-3 gap-3 hover:bg-slate-900/40 border border-transparent hover:border-slate-700 rounded-xl'>
                                            <small>Mildy v1.3</small>
                                            <small className='text-slate-400'>Currently Active!!</small>
                                        </a>
                                    </div>
                                    <div className='h-full w-[200] text-sm flex flex-col p-2 coming-soon'>
                                        <a href="" className='flex flex-col px-4 py-3 gap-3 hover:bg-slate-900/40 border border-transparent hover:border-slate-700 rounded-xl'>
                                            <small>Mildy 2.0</small>
                                            <small className='text-slate-400'>Coming soon</small>
                                        </a>

                                    </div>
                                </div>
                            }
                            {panelContent == 'resources' &&
                                <div className='grid grid-cols-3 divide-x w-full justify-start items-start'>
                                    <div className='h-full w-[200] text-sm flex flex-col p-2 '>
                                        <a href="https://github.com/Sanchit-panday/AI-Scam-Text-and-Image-Detector" className='flex flex-col px-4 py-3 gap-3 hover:bg-slate-900/40 border border-transparent hover:border-slate-700 rounded-xl'>
                                            <small>Mildy AI Documentation</small>
                                            <small className='text-slate-400'>Mildy AI documentation</small>
                                        </a>
                                        <a href="https://github.com/Sanchit-panday/AI-Scam-Text-and-Image-Detector" className='flex flex-col px-4 py-3 gap-3 coming-soon'>
                                            <small className=''>Developer Docs</small>
                                            <small className='text-slate-400'>Guides, references and tutorials</small>
                                        </a>
                                    </div>
                                    <div className='h-full w-[200] text-sm flex flex-col p-2 '>
                                        <a href="/blog" className='flex flex-col px-4 py-3 gap-3 hover:bg-slate-900/40 border border-transparent hover:border-slate-700 rounded-xl'>
                                            <small>Blogs</small>
                                            <small className='text-slate-400'>News, product updates and announcements</small>
                                        </a>
                                        <a href="/contact" className='flex flex-col px-4 py-3 gap-3 hover:bg-slate-900/40 border border-transparent hover:border-slate-700 rounded-xl'>
                                            <small className=''>Community</small>
                                            <small className='text-slate-400'>Connect with us on discord</small>
                                        </a>
                                    </div>
                                    <div className='h-full w-[200] text-sm flex flex-col p-2'>
                                        <a href="/about" className='flex flex-col px-4 py-3 gap-3 hover:bg-slate-900/40 border border-transparent hover:border-slate-700 rounded-xl'>
                                            <small>About us</small>
                                            <small className='text-slate-400'>Know about our mission and goals</small>
                                        </a>
                                        <a href="/contact" className='flex flex-col px-4 py-3 gap-3 hover:bg-slate-900/40 border border-transparent hover:border-slate-700 rounded-xl'>
                                            <small className=''>Contact us</small>
                                            <small className='text-slate-400'>Reach us out using email or discord</small>
                                        </a>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
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