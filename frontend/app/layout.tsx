// "use client"
import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"
export const metadata: Metadata = {
    title: 'Mildy AI | AI Scam Detection & Security Intelligence',
    description: 'Analyze websites, messages, images, DNS records, and domain information using AI-powered security tools. Detect scams, phishing attempts, and suspicious online activity with Mildy AI.',
    keywords: [
        "AI Scam Detector",
        "Phishing Detection",
        "Cyber Security",
        "DNS Lookup",
        "Domain Analysis",
        "Website Security",
        "Scam Detection",
        "AI Security",
        "URL Scanner",
        "Image Analysis",
        "Message Scanner",
        "Mildy AI",
    ],

    authors: [{ name: "Sanchit" }],
    creator: "Sanchit",
    applicationName: "Mildy AI",

    openGraph: {
        title: "Mildy AI",
        description:
            "AI-powered scam detection and cybersecurity analysis platform.",
        type: "website",
        siteName: "Mildy AI",
    },

    twitter: {
        card: "summary_large_image",
        title: "Mildy AI",
        description:
            "Analyze websites, messages, images and domains using AI-powered security tools.",
    },
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
                        <main className='flex-1'>
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
