// "use client"
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'AI Scam Detector',
    description: 'Detect and prevent scams using AI technology',
}
import './globals.css'
// import ThemeToggle from "@/components/ui/ThemeToggle";
import { ThemeProvider } from '@/components/ThemeProvider';
import {
    CookieProvider,
    useCookieContext
} from "@/context/CookieContext";
import CookieBanner from "@/components/cookies/CookieBanner";
import CookieSettingsModal from "@/components/cookies/CookieSettingsModal";
import Navbar from '@/components/cutsom-ui/Navbar';
import { ScanProvider } from '@/context/ScanContext';
import { caveat, inter, playfairDisplaySC } from "@/components/Fonts";
import Footer from '@/components/cutsom-ui/Footer';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });


export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en"
            suppressHydrationWarning className={cn("font-sans", geist.variable)}
            >
            <body className={inter.className}>
                <ThemeProvider>
                    <div className="min-h-screen flex flex-col">
                        <Navbar />
                        {/* <div className='w-fit'>
                            <ThemeToggle />
                        </div> */}
                        {/* main content */}
                        <main className='flex-1 py-6 '>
                            <CookieProvider>
                                <ScanProvider>
                                    <div className='px-6 md:px-6 max-w-6xl w-full mx-auto'>
                                        {children}
                                    </div>
                                </ScanProvider>
                                <CookieBanner />
                                <CookieSettingsModal />
                                <Footer />
                            </CookieProvider>
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
