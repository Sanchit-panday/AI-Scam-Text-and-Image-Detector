"use client";
import { useScanStore } from "@/context/ScanContext";
import { Shield, FileText, Image, History, TrendingUp, ShieldCheck, ShieldAlert, ShieldX, Percent, LucideIcon } from 'lucide-react'
import Link from "next/link";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  sub?: string;
};

function StatCard({ label, value, icon: Icon, color, sub }: StatCardProps) {
  return (
    <div className="glass-card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={22} className="text-white" aria-hidden />
      </div>
      <div>
        <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
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
function PredictionBadge( {prediction}:PredictionBadgeProps) {
  
  const colors : Record<string, string> = {
    safe:       'bg-emerald-900/50 text-emerald-300',
    suspicious: 'bg-amber-900/50 text-amber-300',
    spam:       'bg-red-900/50 text-red-300',
    scam:       'bg-red-900/50 text-red-300',
    phishing:   'bg-rose-900/50 text-rose-300',
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
  return (
    <>
      <div className="space-y-8">
        {/* Hero */}
        <div className="relative glass-card p-8 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-brand-900/30 to-transparent pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-brand-600/20 text-brand-300 rounded-full border border-brand-600/30">AI-Powered</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Phishing & Scam<br />Detection Platform</h1>
              <p className="text-slate-400 max-w-md">Protect yourself from online threats. Analyze suspicious emails, messages, and images using advanced AI detection.</p>
            </div>
            <Shield size={80} className="text-brand-600/30 shrink-0 hidden sm:block" aria-hidden />
          </div>
          <div className="relative flex flex-wrap gap-3 mt-6">
            <Link href="/text-analysis" className="button-primary">Analyze Text</Link>
            <Link href="/image-analysis" className="button-secondary">Analyze Image</Link>
          </div>
        </div>

        {/* Stats */}
        <div>
          <h2 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-brand-400" aria-hidden /> Dashboard Metrics
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
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Quick Actions</h2>
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
              <h2 className="text-lg font-semibold text-slate-200">Recent Scans</h2>
              <Link href="/scan-history" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">View all →</Link>
            </div>
            <div className="glass-card divide-y divide-slate-700/50 overflow-hidden">
              {recent.map(item => (
                <div key={item.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-700/20 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <PredictionBadge prediction={item.prediction} />
                      <span className="text-xs text-slate-500 capitalize">{item.type} scan</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-white tabular-nums">{Math.round((item.confidence || 0) * 100)}%</p>
                    <p className="text-xs text-slate-500">confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
