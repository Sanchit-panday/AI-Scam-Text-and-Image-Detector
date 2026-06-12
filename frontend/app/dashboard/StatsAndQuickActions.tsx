"use client"
import { saira } from '@/components/Fonts';
import { useScanStore } from '@/context/ScanContext';
import Link from 'next/link';
import { FileText, History, LucideIcon, Percent, Shield, ShieldCheck, ShieldX, TrendingUp, Image, ChevronRight, Link2, Dot, ChartArea } from 'lucide-react'

import { Doughnut } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    plugins,
} from "chart.js";
import AiInsight from './AiInsight';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);


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
    iconColor: string;
    iconBg: string;
};
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
function QuickAction({ to, icon: Icon, label, description, iconColor, iconBg }: QuickActionProps) {
    return (
        <Link
            href={to}
            className="flex justify-center sm:grid sm:grid-cols-[auto_1fr_auto] gap-x-4 items-center px-3 py-5 bg-card border border-border gap-3 hover:bg-card-hover transition-colors group rounded-2xl"
        >
            <div className={`w-11 h-11 rounded-xl items-center justify-center flex max-[450px]:hidden ${iconBg}`}>
                <Icon size={20} className={`${iconColor} group-hover:scale-110 transition-transform`} aria-hidden />
            </div>
            <div>
                <p className="font-semibold">{label}</p>
                <p className="text-sm text-secondary mt-0.5 hidden md:flex">{description}</p>
            </div>
            <div className={`text-secondary group-hover:scale-120 group-hover:text-primary transition-transform hidden sm:flex`}>
                <ChevronRight />
            </div>
        </Link>
    )
}
export default function StatsAndQuickActions() {
    const { metrics } = useScanStore();

    const data = {
        labels: ["Safe", "Suspicious", "Dangerous"],
        datasets: [
            {
                data: [metrics.scam, metrics.safe, metrics.suspicious],
                backgroundColor: [
                    "#10B981",
                    "#FF5E1F",
                    "#EF4444",
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: "75%",
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    return (
        <>
            <div className='flex flex-col sm:grid grid-cols-[auto_1fr] gap-4'>
                {/* Stats */}
                <div className='bg-card rounded-xl p-4 border border-border' aria-label='threat overview'>
                    <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                        <TrendingUp size={18} className="text-brand-400" aria-hidden /><span className={saira.className}>Threat Overview</span>
                    </h2>
                    <div className='flex gap-x-4 mb-4'>
                        <div className='h-25'>
                            <Doughnut
                                data={data}
                                options={options}
                            />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <div className='grid grid-cols-2 justify-start items-start gap-x-5 gap-y-2'>
                                <div className='flex items-center gap-x-2 font-light text-sm'><span className='inline-block w-2 h-2 bg-amber-300 rounded-full' />Scam</div>
                                <div className='font-semibold'>{metrics.scam}</div>
                                <div className='flex items-center gap-x-2 font-light text-sm'><span className='inline-block w-2 h-2 bg-green-500 rounded-full' />Safe</div>
                                <div className='font-semibold'>{metrics.safe}</div>
                            </div>
                        </div>
                    </div>
                    <a href="/scan-history">
                        <button className='text-sm p-2 w-full hover:bg-card-hover transition-all rounded-md border border-border flex justify-center items-center gap-x-2 group'>
                            <ChartArea size={15} className='group-hover:text-accent group-hover:scale-120 transition-all' />
                            View Full Analytics
                        </button>
                    </a>
                    {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Scans" value={metrics.total} icon={Shield} color="bg-brand-600" />
                    <StatCard label="Safe" value={metrics.safe} icon={ShieldCheck} color="bg-emerald-700" />
                    <StatCard label="Suspicious / Scam" value={metrics.suspicious + metrics.scam} icon={ShieldX} color="bg-red-700" />
                    <StatCard label="Avg. Confidence" value={`${metrics.avgConfidence}%`} icon={Percent} color="bg-violet-700" />
                    </div> */}
                </div>
                <AiInsight />
            </div>

            {/* Quick actions */}
            <div>
                <h2 className={`text-lg font-semibold text-slate-200 mb-4 ${saira.className}`}>Quick Actions</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <QuickAction to="/text-analysis" icon={FileText} iconColor="text-brand-300" iconBg="bg-brand-700/30" label="Message Scan" description="Analyze suspicious message" />
                    <QuickAction to="/image-analysis" icon={Image} iconColor="text-violet-300" iconBg="bg-violet-700/30" label="Image Scan" description="Scan screenshots & images" />
                    <QuickAction to="/scan-history" icon={Link2} iconColor="text-slate-300" iconBg="bg-slate-600/30" label="URL Scan" description="Security scores of a website" />
                    <QuickAction to="/scan-history" icon={History} iconColor="text-slate-300" iconBg="bg-slate-600/30" label="Website Age" description="How old is the website?" />
                </div>
            </div>
        </>
    )
}
