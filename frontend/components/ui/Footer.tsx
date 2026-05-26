"use client"
import { caveat, playfairDisplaySC } from '../Fonts'
import { BrickWallFire, GitPullRequestArrow, Globe, MessagesSquare } from 'lucide-react'
import { useCookieContext } from '@/context/CookieContext';

function Footer() {
    const { setShowSettings } = useCookieContext();

    return (
        <section className="w-full text-xs text-slate-400/70 py-10 mt-10 border-t border-slate-800">
            <div className='px-4 md:px-6 max-w-6xl mx-auto space-y-12 '>
                <span className={`${caveat.className} text-4xl text-gray-300`}>
                    Scan. Verify. Click.
                </span>

                <div className='md:flex mt-5 space-y-10 md:justify-between'>
                    {/* quick links */}
                    <div className='grid grid-cols-2 space-x-10 md:order-2'>
                        {/* Tools */}
                        <div className='space-y-3 '>
                            <p className='font-semibold'>Tools</p>
                            <ul className='space-y-2 quickLink'>
                                <li><a href="/text-analysis">Text analyzer</a></li>
                                <li><a href="/image-analysis">Image analyzer</a></li>
                            </ul>
                        </div>
                        {/* Resources */}
                        <div className='space-y-3'>
                            <p className='font-semibold'>Resources</p>
                            <ul className='space-y-2 quickLink'>
                                <li><a href="/">Blogs</a></li>
                                <li><a href="/about" target="_blank">About us</a></li>
                                <li><a href="/">Terms of service</a></li>
                                <li><a href="/">Privacy policy</a></li>
                                <li><button onClick={() => setShowSettings(true)} className='hover:underline'> Manage Cookies</button></li>
                            </ul>
                        </div>
                    </div>
                    {/* branding */}
                    <div className='max-w-sm space-y-2 md:order-1'>
                        <div className='flex'>
                            <BrickWallFire className='mr-4' size={30} />
                            <span className={`text-2xl font-bold ${playfairDisplaySC.className}`}>Mildy Ai</span>
                        </div>
                        <div className='text-sm'>Protect yourself from online threats. Analyze suspicious emails, messages, and images using advanced AI detection.
                        </div>
                        <p className='italic'>
                            Build by Sanchit  · India 🇮🇳
                        </p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className='flex items-center gap-2 text-gray-300'>
                        <a href="https://github.com/Sanchit-panday/AI-Scam-Text-and-Image-Detector" target="_blank">
                            <GitPullRequestArrow size={20} />
                        </a>
                        <a href="https://ai-scam-text-and-image-detector.vercel.app/" target="_blank">
                            <Globe size={20} />
                        </a>
                        <a href="https://discord.gg/nxpMtBrdb7" target="_blank">
                            <MessagesSquare size={20} />
                        </a>
                    </div>
                    <div className='border-t border-slate-800 w-full'></div>
                    <div className='flex items-center justify-between'>
                        <p>Mildy · Powered by AI · For educational use </p>
                        <p>©2026</p>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Footer