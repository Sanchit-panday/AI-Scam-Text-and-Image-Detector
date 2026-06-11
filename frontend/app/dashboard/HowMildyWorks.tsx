import { caveat, saira } from '@/components/Fonts'
import { BrickWallShield, Rabbit, ShieldAlert } from 'lucide-react'
export default function HowMildyWorks() {
    return (
        <div className="mb-15">
            <div className={`mb-4 text-lg font-semibold text-slate-200 ${saira.className}`}>
                How it Works
            </div>
            <div className={`mb-10 text-5xl font-bold text-brand-400/90 ${caveat.className}`}>
                How Mildy Works
            </div>

            <div className="space-y-15 w-full ">
                <div className="grid md:grid-cols-2 gap-5 items-center justify-center">
                    <div className="max-w-64 frounded-xl flex flex-col justify-center p-4">
                        <div className="flex items-center w-full mb-2">
                            <ShieldAlert className="mr-2" size={40} />
                            <p className={`font-semibold ${saira.className}`}>
                                Upload any Suspicious Text/Image
                            </p>
                        </div>
                        <div className="text-xs leading-relaxed">Paste a suspicious text message or upload a screenshot from email, WhatsApp, SMS, or social media. The analysis begins instantly with no account required.</div>
                    </div>

                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-sm rounded-xl border"
                    >
                        <source src="/Assets/Demo/Demo1.webm" type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="grid md:grid-cols-2 gap-5 items-center justify-center ">
                    <div className="max-w-64 rounded-xl flex flex-col justify-center p-4 order-1 md:order-2">
                        <div className="flex items-center w-full mb-4">
                            <BrickWallShield className="mr-2" size={40} />
                            <p className={`font-semibold ${saira.className}`}>
                                AI-Powered Threat Inspection
                            </p>
                        </div>
                        <div className="text-xs leading-relaxed">Our detection engine examines the content for phishing indicators, deceptive language, urgency tactics, suspicious links, impersonation attempts, and other common scam patterns.</div>
                    </div>

                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-sm rounded-xl border order-2 md:order-1"
                    >
                        <source src="/Assets/Demo/Demo2.webm" type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="grid md:grid-cols-2 gap-5 items-center justify-center">
                    <div className="max-w-64 rounded-xl flex flex-col justify-center p-4">
                        <div className="flex items-center w-full mb-4">
                            <Rabbit className="mr-2" size={40} />
                            <p className={`font-semibold ${saira.className}`}>
                                Receive a Detailed Risk Assessment
                            </p>
                        </div>
                        <div className="text-xs leading-relaxed">Get an immediate verdict with confidence scores, risk level classification, detected warning signs, extracted URLs, and a clear explanation of why the content may be safe or suspicious.</div>
                    </div>

                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-sm rounded-xl border md:mb-0"
                    >
                        <source src="/Assets/Demo/Demo3.webm" type="video/webm" />
                        Your browser does not support the video tag.
                    </video>

                </div>

            </div>
        </div>
    )
}
