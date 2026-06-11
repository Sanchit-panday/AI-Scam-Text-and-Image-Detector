import { saira } from '@/components/Fonts';
import { useScanStore } from '@/context/ScanContext';
import Link from 'next/link';
import { FileText, History, LucideIcon, Percent, Shield, ShieldCheck, ShieldX, TrendingUp, Image } from 'lucide-react'
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
type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  sub?: string;
};
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
export default function StatsAndQuickActions() {
    const { metrics } = useScanStore();

    return (
        <>
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
        </>
    )
}
