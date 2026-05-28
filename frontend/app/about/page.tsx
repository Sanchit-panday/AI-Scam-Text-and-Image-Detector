"use client"
import { motion } from 'framer-motion';
import Image from 'next/image'
import { openSans, playfairDisplay } from '@/components/Fonts'
import Aboutus from "@/public/Assets/Images/Aboutus.webp"
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' as const },
    },
};
function page() {
    return (
        <div className="w-full flex flex-col justify-center px-6 pt-10 pb-20 md:pt-18.5 md:pb-25 gap-12.5 md:gap-25">
            <motion.div
                // variants={containerVariants}
                // initial="hidden"
                // animate="visible"
                className='flex flex-col items-center w-full'>
                <motion.div
                    // initial={{ opacity: 0, y: 10 }}
                    // whileInView={{ opacity: 1, y: 0 }}
                    // transition={{ duration: 0.6, ease: 'easeOut' as const }}
                    className='text-blue-500/70 text-lg mb-4'
                >
                //<span className='text-foreground/50'> About us </span>//
                </motion.div>
                <motion.div
                    variants={itemVariants}
                    className={`text-[32px] md:text-[48px] mb-12.5 md:mb-25.5 font-semibold text-center`}>
                    Your first line of defense<p className='text-blue-500'>against bad links</p>
                </motion.div>
                <motion.div
                    variants={itemVariants}
                    className='w-full flex justify-center'>
                    <Image src={Aboutus} alt="image" className='w-3xl rounded-2xl' />
                </motion.div>
            </motion.div>
            <div className='flex flex-col gap-y-12.5'>
                <div className='grid md:grid-cols-2'>
                    <div className="text-sm font-semibold text-slate-400/80 mb-2">Who We Are</div>
                    <div className={`${openSans.className} text-xl`}>We are an AI-powered security platform focused on helping users identify scams, phishing attempts, and suspicious online content. Our goal is to make threat detection simple, fast, and accessible to everyone.</div>
                </div>
                <div className='grid md:grid-cols-2'>
                    <div className="text-sm font-semibold text-slate-400/80 mb-2">Our Mission</div>
                    <div className={`${openSans.className} text-xl`}>Cybercriminals use increasingly sophisticated tactics to deceive people online. Our mission is to provide intelligent tools that help users verify suspicious messages, links, and images before taking action.</div>
                </div>
                <div className='grid md:grid-cols-2'>
                    <div className="text-sm font-semibold text-slate-400/80 mb-2">What We Do</div>
                    <div className={`${openSans.className} text-xl`}>Our platform analyzes:
                        <ul className='list-disc list-inside pl-4'>
                            <li>Text messages and emails</li>
                            <li>Screenshots and images</li>
                            <li>Suspicious URLs and links</li>
                            <li>Potential phishing attempts</li>
                        </ul>
                    </div>
                </div>
                <div className='grid md:grid-cols-2'>
                    <div className="text-sm font-semibold text-slate-400/80 mb-2">How It Works</div>
                    <div className={`${openSans.className} text-xl`}>
                        <strong>Text Analysis</strong>
                        <div className='pl-4 mb-4'>• Detects scam-related language, urgency tactics, and suspicious requests in messages and emails.</div>
                        <strong>Image Analysis</strong>
                        <div className='pl-4 mb-4'>• Extracts text from screenshots using OCR technology and scans it for potential threats.</div>
                        <strong>URL Detection</strong>
                        <div className='pl-4 mb-4'>• Identifies and analyzes links that may lead to phishing or malicious websites.</div>
                        <strong>Risk Assessment</strong>
                        <div className='pl-4 mb-4'>• Generates confidence scores, risk levels, and key indicators to explain the results.</div>

                    </div>
                </div>
                <div className='grid md:grid-cols-2'>
                    <div className="text-sm font-semibold text-slate-400/80 mb-2">Why Choose Us</div>
                    <div className={`${openSans.className} text-xl`}>Reasons to choose us
                        <ul className='list-disc list-inside pl-4'>
                            <li>Fast AI-powered analysis</li>
                            <li>Easy-to-understand results</li>
                            <li>Support for text and image scanning</li>
                            <li>Explainable threat indicators</li>
                            <li>User-friendly and accessible design</li>
                        </ul>
                    </div>
                </div>
                <div className='grid md:grid-cols-2'>
                    <div className="text-sm font-semibold text-slate-400/80 mb-2">Privacy First</div>
                    <div className={`${openSans.className} text-xl`}>Your security and privacy matter. Content submitted for analysis is processed securely, and we prioritize responsible handling of user information.
                    </div>
                </div>
                <div className='grid md:grid-cols-2'>
                    <div className="text-sm font-semibold text-slate-400/80 mb-2">Who It's For</div>
                    <div className={`${openSans.className} text-xl`}>Our platform is designed for:
                        <ul className='list-disc list-inside pl-4'>
                            <li>Everyday internet users</li>
                            <li>Students and educators</li>
                            <li>Professionals and remote workers</li>
                            <li>Small businesses</li>
                            <li>Anyone who wants safer online interactions</li>
                        </ul>
                    </div>
                </div>
                <div className='grid md:grid-cols-2'>
                    <div className="text-sm font-semibold text-slate-400/80 mb-2">Looking Forward</div>
                    <div className={`${openSans.className} text-xl`}>
                        We continue to improve our detection capabilities, enhance accuracy, and develop new features to help users stay protected against evolving online threats.
                    </div>
                </div>
                <div className='grid md:grid-cols-2'>
                    <div className="text-sm font-semibold text-slate-400/80 mb-2">Closing Statement</div>
                    <div className={`${openSans.className} text-xl`}>
                        <strong>Analyze. Detect. Stay Safe.</strong><br />
                        Helping users make smarter and safer decisions online through AI-powered threat detection.
                    </div>
                </div>
            </div>

        </div>
    )
}
export default page