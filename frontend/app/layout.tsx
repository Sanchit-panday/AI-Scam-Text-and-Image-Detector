import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'AI Scam Detector',
    description: 'Detect and prevent scams using AI technology',
}
import './globals.css'
// import ThemeToggle from "@/components/ui/ThemeToggle";
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/ui/Navbar';
import { ScanProvider } from '@/context/ScanContext';



export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <div className="min-h-screen flex flex-col">
                        <Navbar />
                        {/* <div className='w-fit'>
                            <ThemeToggle />
                        </div> */}
                        {/* main content */}
                        <main className='flex-1 px-4 md:px-6 py-6 max-w-6xl w-full mx-auto'>
                            <ScanProvider>
                                {children}
                            </ScanProvider>
                        </main>
                        <footer className="text-center text-xs text-slate-600 py-4 border-t border-slate-800">
                            PhishGuard AI · Powered by AI · For educational use
                        </footer>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
