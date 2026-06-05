"use client";
import { useScanStore } from "@/context/ScanContext";
import { Shield, FileText, Image, History, TrendingUp, ShieldCheck, ShieldAlert, BrickWallFire, ShieldX, Percent, LucideIcon, BrickWallShield, Rabbit } from 'lucide-react'
import Link from "next/link";
import { faqList, FAQItem } from '@/components/FAQ/faqs';
import { caveat, playfairDisplaySC, saira } from "@/components/Fonts";
type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  sub?: string;
};
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";

function StatCard({ label, value, icon: Icon, color, sub }: StatCardProps) {
  return (
    <div className="glass-card p-5 flex flex-col min-[450px]:flex-row items-center gap-y-2 gap-x-4 ">
      <div className="min-[450px]:order-2">
        <p className="text-lg md:text-2xl font-bold text-white text-center min-[450px]:text-left tabular-nums min-[450px]:order-1">{value}</p>
        <p className="text-xs md:text-sm text-slate-400 min-[450px]:oder-2">{label}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 min-[450px]:order-1 ${color}`}>
        <Icon size={22} className="text-white max-[450px]:text-[2px]" aria-hidden />
      </div>
    </div>
  )
}

type QuickActionProps = {
  to: string;
  icon: LucideIcon;
  label: string;
  description: string;
  color: string;
};
function QuickAction({ to, icon: Icon, label, description, color }: QuickActionProps) {
  return (
    <Link
      href={to}
      className="glass-card p-5 flex flex-col gap-3 hover:bg-slate-700/40 transition-colors group focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-2xl"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white group-hover:scale-110 transition-transform" aria-hidden />
      </div>
      <div>
        <p className="font-semibold text-white">{label}</p>
        <p className="text-sm text-slate-400 mt-0.5">{description}</p>
      </div>
    </Link>
  )
}
type PredictionBadgeProps = {
  prediction?: string;
};
function PredictionBadge({ prediction }: PredictionBadgeProps) {

  const colors: Record<string, string> = {
    safe: 'bg-emerald-900/50 text-emerald-300',
    suspicious: 'bg-amber-900/50 text-amber-300',
    spam: 'bg-red-900/50 text-red-300',
    scam: 'bg-red-900/50 text-red-300',
    phishing: 'bg-rose-900/50 text-rose-300',
  }
  return (
    <span className={`risk-badge capitalize ${colors[prediction?.toLowerCase() ?? ""] ?? "bg-slate-700 text-slate-300"}`}>
      {prediction}
    </span>
  )
}

export default function Home() {
  const { metrics, history } = useScanStore();
  const recent = history.slice(0, 5);

  const [visibleFaqsCount, setVisibleFaqsCount] = useState<number>(5);
  const visibleFaqs = faqList.slice(0, visibleFaqsCount);
  const handleLoadMore = () => {
    setVisibleFaqsCount((prevCount) => prevCount + 5);
  };
  return (
    <>
      <div className="space-y-8 max-w-6xl">
        {/* Hero */}
        <div className="relative glass-card p-8 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-brand-900/30 to-transparent pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center px-2.5 py-0.5 text-xs font-semibold bg-brand-600/20 text-brand-300 rounded-full border border-brand-600/30">
                  {/* live pulsing dot */}
                  <div className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </div>
                  FREE&ensp; · &ensp;AI-Powered Scam & Phishing Detector
                </span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-2">
                <div className={playfairDisplaySC.className}>Safe Click — or</div>
                <div className={`${caveat.className} font-semibold line-through text-red-400`}>Risky Trick?</div>
              </h1>
              <p className="text-slate-400 max-w-md">Protect yourself from online threats. Analyze suspicious emails, messages, and images using advanced AI detection.</p>
            </div>
            <BrickWallFire size={80} className="text-red-300/30 shrink-0 hidden sm:block" aria-hidden />
          </div>
          <div className="relative flex flex-wrap gap-3 mt-6">
            <Link href="/text-analysis" className="button-primary">Analyze Text</Link>
            <Link href="/image-analysis" className="button-secondary">Analyze Image</Link>
          </div>
        </div>

        {/* Stats */}
        <div>
          <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-brand-400" aria-hidden /> <span className={saira.className}>Dashboard Metrics</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Scans" value={metrics.total} icon={Shield} color="bg-brand-600" />
            <StatCard label="Safe" value={metrics.safe} icon={ShieldCheck} color="bg-emerald-700" />
            <StatCard label="Suspicious / Scam" value={metrics.suspicious + metrics.scam} icon={ShieldX} color="bg-red-700" />
            <StatCard label="Avg. Confidence" value={`${metrics.avgConfidence}%`} icon={Percent} color="bg-violet-700" />
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className={`text-lg font-semibold text-slate-200 mb-4 ${saira.className}`}>Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <QuickAction to="/text-analysis" icon={FileText} color="bg-brand-700" label="Text Analysis" description="Paste emails, SMS, or chat messages" />
            <QuickAction to="/image-analysis" icon={Image} color="bg-violet-700" label="Image Analysis" description="Upload screenshots for OCR + AI scan" />
            <QuickAction to="/scan-history" icon={History} color="bg-slate-600" label="Scan History" description="Review and re-run previous analyses" />
          </div>
        </div>

        {/* Recent scans */}
        {recent.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold text-slate-200 ${saira.className}`}>Recent Scans</h2>
              <Link href="/scan-history" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">View all →</Link>
            </div>
            <div className="glass-card divide-y divide-slate-700/50 overflow-hidden">
              {recent.map(item => (
                <div key={item.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-700/20 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <PredictionBadge prediction={"prediction" in item ? item.prediction : undefined} />
                      <span className="text-xs text-slate-500 capitalize">{item.type} scan</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-white tabular-nums">{'confidence' in item ? item.confidence : 0}%</p>
                    <p className="text-xs text-slate-500">confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Mildy AI */}
        {/* How it works */}
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

        {/* About scams in India */}
        <div className="mb-15">
          <div className={`mb-4 text-lg font-semibold text-slate-200 ${saira.className}`}>Made in India</div>
          <div className={`mb-10 text-5xl font-bold text-brand-400/90 ${caveat.className}`}>
            Cyber Threats Are Growing<br /><p className="text-red-500">Faster Than Ever</p>
          </div>
          <ul className="list-disc">
            <li>36+ lakh online financial fraud incidents were reported in India during 2024.</li>
            <li>₹22,845 crore was lost to cyber fraud in India in 2024, a 206% increase compared to 2023.</li>
            <li>80+ million phishing attempts were detected in India during 2024, making India one of the world's most targeted countries for phishing attacks.</li>
            <li>72.6% of registered cybercrime cases in 2024 were fraud-relate</li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="mb-15">
          <div className={`mb-4 text-lg font-semibold text-slate-200 ${saira.className}`}>Documentation</div>
          <div className={`mb-10 text-5xl font-bold text-brand-400/90 ${caveat.className}`}>Frequently Asked Questions
          </div>
          <div className="flex flex-col items-center">
            <Accordion type="multiple" className="max-w-xl">
              {visibleFaqs.map((faq: FAQItem) => (
                <AccordionItem
                key={faq.id}
                 value={String(faq.id)}>
                  <AccordionTrigger>{faq.title}</AccordionTrigger>
                  <AccordionContent>{faq.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {visibleFaqsCount < faqList.length && (
              <button onClick={handleLoadMore}
                className="text-xs hover:underline">Show More...</button>
            )}
          </div>
        </div>

        {/* Report to Government */}
        <div className="text-sm text-center mb-10">Found a suspicious link? Scan it free with Mildy AI or report to India's national cyber crime helpline:&ensp;
          <a href="tel:1930" className="underline text-red-500/80">1930</a>{" · "}
          <a href="https://cybercrime.gov.in/" className="underline text-red-500/80">cybercrime.gov.in</a></div>
      </div>
    </>
  );
}
