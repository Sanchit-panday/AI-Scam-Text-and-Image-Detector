import {
    ShieldCheck, ShieldAlert, ShieldX, ShieldQuestionMark, AlertTriangle,
    Globe,
    Shield,
    TriangleAlert,
    Triangle,
    CircleX,
    CircleCheck,
    MailCheck,
    Server,
    Check,
    X,
    Mail
} from 'lucide-react'
import ReportButton from '../ReportButton';
import type { DnsLookupResult, ScanMeta } from "@/types/types"
import { cn } from '@/lib/utils';

const PREDICTION_CONFIG = {
    safe: { label: 'Safe', icon: ShieldCheck, bg: 'bg-emerald-900/40', border: 'border-emerald-700/40', text: 'text-emerald-300', badge: 'bg-emerald-900/60 text-emerald-300' },
    suspicious: { label: 'Suspicious', icon: AlertTriangle, bg: 'bg-amber-900/40', border: 'border-amber-700/40', text: 'text-amber-300', badge: 'bg-amber-900/60 text-amber-300' },
    spam: { label: 'Spam', icon: ShieldX, bg: 'bg-red-900/40', border: 'border-red-700/40', text: 'text-red-300', badge: 'bg-red-900/60 text-red-300' },
    scam: { label: 'Scam', icon: ShieldX, bg: 'bg-red-900/40', border: 'border-red-700/40', text: 'text-red-300', badge: 'bg-red-900/60 text-red-300' },
    phishing: { label: 'Phishing', icon: ShieldAlert, bg: 'bg-rose-900/40', border: 'border-rose-700/40', text: 'text-rose-300', badge: 'bg-rose-900/60 text-rose-300' },
    unknown: { label: 'Unknown', icon: ShieldQuestionMark, bg: 'bg-gray-900/40', border: 'border-gray-700/40', text: 'text-gray-300', badge: 'bg-gray-900/60 text-gray-300' },
}

const RISK_CONFIG = {
    Low: { color: 'bg-emerald-500', text: 'text-emerald-300', badge: 'bg-emerald-900/60 text-emerald-300' },
    Medium: { color: 'bg-amber-500', text: 'text-amber-300', badge: 'bg-amber-900/60 text-amber-300' },
    High: { color: 'bg-red-500', text: 'text-red-300', badge: 'bg-red-900/60 text-red-300' },
}

export default function DnsLookupCard({ DnsLookupResult, scanMeta }: { DnsLookupResult: DnsLookupResult, scanMeta: ScanMeta }) {

    const domain = DnsLookupResult.domain;
    const riskScore = DnsLookupResult.risk_score;
    const emailSecurityScore = DnsLookupResult.email_security_score ?? 0;
    const totalEmailSecurityScore = DnsLookupResult.total_email_security_score;
    const riskLevel = DnsLookupResult.risk_level;
    const countIPv4 = DnsLookupResult.a_records.length;
    const countIPv6 = DnsLookupResult.aaaa_records.length;
    const countMXRecords = DnsLookupResult.mx_records.length;
    const countNSRecords = DnsLookupResult.ns_records.length;

    const SIZE = 120; // Change only this
    const EMAILSECURITYCHARTSIZE = 100;

    const riskScoreFontSize = SIZE * 0.22;
    const riskScoretotalFontSize = SIZE * 0.12;
    const emailSecurityScoreFontSize = SIZE * 0.22;
    const emailSecuritytotalFontSize = SIZE * 0.12;

    const text = ["appears legitimate but has a few security configuration issues that should be reviewed."]

    var riskCfg = RISK_CONFIG.Low;
    var cfg = PREDICTION_CONFIG.unknown;

    if (DnsLookupResult.error != null) {
        switch (riskLevel) {
            case "clean":
                riskCfg = RISK_CONFIG.Low;
                break;
            case "low":
                riskCfg = RISK_CONFIG.Low;
                break;
            case "medium":
                riskCfg = RISK_CONFIG.Medium;
                break;
            case "high":
                riskCfg = RISK_CONFIG.High;
                break;
            case "critical":
                riskCfg = RISK_CONFIG.High;
                break;
        }
    }
    console.log(riskCfg)
    const Icon = cfg.icon;

    type DnsCheck = {
        label: string;
        value: boolean;
        description: string;
        failDescription: string;
    };
    const dnsChecks: DnsCheck[] = [
        {
            label: "DMARC",
            value: DnsLookupResult.has_dmarc,
            description: "Good protection against email spoofing",
            failDescription: "Email spoofing protection not configured",
        },
        {
            label: "MTA-STS",
            value: DnsLookupResult.has_mta_sts,
            description: "Mail server security enforced",
            failDescription: "Email transport security not enforced",
        },
        {
            label: "SPF",
            value: DnsLookupResult.has_spf,
            description: "Authorized mail servers are defined",
            failDescription: "Domain vulnerable to email spoofing",
        },
        {
            label: "DKIM",
            value: DnsLookupResult.has_dkim,
            description: "Email authenticity can be verified",
            failDescription: "Email authenticity cannot be verified",
        },
        {
            label: "BIMI",
            value: DnsLookupResult.has_bimi,
            description: "Brand indicators are published",
            failDescription: "Brand indicators not published",
        },
        {
            label: "TLS RPT",
            value: DnsLookupResult.has_tls_rpt,
            description: "Email transport issues can be monitored",
            failDescription: "Email transport issues may go undetected",
        },
    ];

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);

        const datePart = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(date);

        const timePart = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).format(date);

        return `${datePart} · ${timePart}`;
    };

    return (
        <>
            <section
                aria-label="Analysis result"
                className={`glass-card border-2 p-6 space-y-5 transition-all ${cfg.bg} ${cfg.border}`}
            >
                {/* Header */}
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <div className='flex gap-x-4 items-center'>
                            <Globe />
                            <div className='flex flex-col font-bold text-xl'>
                                {domain}
                                <span className='text-xs font-light'> Analysis Completed on {" "}
                                    {formatTimestamp(scanMeta.timestamp)}
                                </span>
                            </div>
                        </div>
                        {/* <div className='text-sm'>Download</div> */}
                    </div>
                </div>
                {/* trust score and risk level */}
                <div className='flex flex-col md:flex-row gap-2 '>
                    <div className='flex-1 p-4 space-y-4 rounded-lg border border-gray-500/70 shadow-sm'>
                        <div className='flex gap-x-3'>
                            <Shield />
                            Trust Score
                        </div>
                        <div className='flex items-center justify-between'>
                            <svg width={SIZE} height={SIZE} className='flex-1'>
                                <circle cx={SIZE / 2} cy={SIZE / 2} r={(SIZE - (SIZE * 0.1)) / 2} stroke="#e5e7eb" strokeWidth={SIZE * 0.1} fill="none" />
                                <circle cx={SIZE / 2} cy={SIZE / 2} r={(SIZE - (SIZE * 0.1)) / 2} stroke="#ef4444" strokeWidth={SIZE * 0.1} fill="none"
                                    strokeDasharray={2 * Math.PI * (SIZE / 2)}
                                    strokeDashoffset={(2 * Math.PI * (SIZE / 2)) - (riskScore / 100) * (2 * Math.PI * (SIZE / 2))}
                                    strokeLinecap="round"
                                    transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                                />
                                <text x={SIZE / 2} y={(SIZE / 2) - 3} textAnchor="middle" dominantBaseline="middle" fill="white" fontWeight={600} fontSize={riskScoreFontSize} >
                                    {riskScore}
                                </text>
                                <text x={SIZE / 2} y={(SIZE / 2) + riskScoreFontSize} textAnchor="middle" fill="#9ca3af" fontSize={riskScoretotalFontSize} >
                                    /100
                                </text>
                            </svg>
                            <div className='p-2 flex-1'>
                                <div className={`capitalize mb-2 text-xl font-semibold ${riskCfg.text}`}>{riskLevel} Risk</div>
                                <div className='text-sm '>{domain}{" "}{text}</div>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 p-4 space-y-4 rounded-lg border border-gray-500/70 shadow-sm'>
                        <div className='flex gap-x-3'>
                            <TriangleAlert />
                            Risk Level
                        </div>
                        <div className={`capitalize text-xl w-fit font-semibold rounded-md py-1 px-3 ${riskCfg.badge}`}>{riskLevel} Risk</div>
                        <div className="w-full max-w-xl">
                            {/* Pointer */}
                            <div className="relative mb-2 h-6">
                                <div
                                    className="absolute -translate-x-1/2 rotate-180 text-white"
                                    style={{
                                        left: `${riskScore}%`,
                                    }}
                                >
                                    <Triangle size={18} fill='white' className='-translate-y-1/3' />
                                </div>
                            </div>

                            {/* Bar */}
                            <div className="flex gap-1 h-4">
                                <div className={`flex-1 ${RISK_CONFIG.Low.color} rounded-l-full`} />
                                <div className={`flex-1 ${RISK_CONFIG.Medium.color}`} />
                                <div className={`flex-1 ${RISK_CONFIG.Medium.color}`} />
                                <div className={`flex-1 ${RISK_CONFIG.High.color} rounded-r-full`} />
                            </div>

                            {/* Labels */}
                            <div className="flex mt-4 text-sm text-slate-500">
                                <div className="flex-1 text-center">Low</div>
                                <div className="flex-1 text-center">Medium</div>
                                <div className="flex-1 text-center">High</div>
                                <div className="flex-1 text-center">Critical</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* dns checks */}
                <div className='p-4 space-y-4 rounded-lg border border-gray-500/70 shadow-sm'>
                    <div className='flex gap-x-3'>
                        <ShieldCheck />
                        DNS Checks
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-0.5 bg-border '>
                        {dnsChecks.map((check) => (
                            <div key={check.label} className="p-4 flex flex-col bg-background gap-y-4">
                                <div className='gap-x-2 flex flex-row items-center'>
                                    <div className=''>
                                        {check.value ? (
                                            <CircleCheck size={42} color="green" />
                                        ) : (
                                            <CircleX size={42} color="red" />
                                        )}
                                    </div>
                                    <div className='flex flex-col'>
                                        <span>{check.label}</span>
                                        <span className={`${check.value ? "text-green-400" : "text-red-500"}`}>{check.value ? "Enabled" : "Missing"}</span>
                                    </div>
                                </div>
                                <span>
                                    {check.value ? check.description : check.failDescription}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* email security and infrastructure */}
                <div className='grid md:grid-cols-2 gap-x-2 gap-y-4'>
                    <div className='flex-1 p-4 space-y-4 rounded-lg border border-gray-500/70 shadow-sm'>
                        <div className='flex gap-x-3'>
                            <MailCheck />
                            Email Security Overview
                        </div>
                        <div className='flex justify-evenly gap-x-4'>
                            <div className='flex-1 border border-gray-400 p-4 rounded-lg space-y-3'>
                                {dnsChecks.slice(0, 5).map((check, index) => (
                                    <div key={check.label}
                                        className={cn(`flex justify-between`,
                                            index != (dnsChecks.length - 2) && "pb-3 border-b border-gray-400"
                                        )}>
                                        {check.label}
                                        <span className='flex gap-x-2'>
                                            {check.value ? (
                                                <Check strokeWidth={2.5} size={20} color="green" />
                                            ) : (
                                                <X strokeWidth={2.5} size={20} color="red" />
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className='flex-1 flex flex-col items-center'>
                                <div className='flex flex-col items-center gap-y-4'>
                                    <svg width={SIZE} height={EMAILSECURITYCHARTSIZE} className='flex-1'>
                                        <circle cx={EMAILSECURITYCHARTSIZE / 2} cy={EMAILSECURITYCHARTSIZE / 2} r={(EMAILSECURITYCHARTSIZE - (EMAILSECURITYCHARTSIZE * 0.1)) / 2} stroke="#e5e7eb" strokeWidth={EMAILSECURITYCHARTSIZE * 0.1} fill="none" />
                                        <circle cx={EMAILSECURITYCHARTSIZE / 2} cy={EMAILSECURITYCHARTSIZE / 2} r={(EMAILSECURITYCHARTSIZE - (EMAILSECURITYCHARTSIZE * 0.1)) / 2} stroke="#ef4444" strokeWidth={EMAILSECURITYCHARTSIZE * 0.1} fill="none"
                                            strokeDasharray={2 * Math.PI * (EMAILSECURITYCHARTSIZE / 2)}
                                            strokeDashoffset={(2 * Math.PI * (EMAILSECURITYCHARTSIZE / 2)) - (emailSecurityScore / totalEmailSecurityScore) * (2 * Math.PI * (EMAILSECURITYCHARTSIZE / 2))}
                                            strokeLinecap="round"
                                            transform={`rotate(-90 ${EMAILSECURITYCHARTSIZE / 2} ${EMAILSECURITYCHARTSIZE / 2})`}
                                        />
                                        <text x={EMAILSECURITYCHARTSIZE / 2} y={(EMAILSECURITYCHARTSIZE / 2) - 3} textAnchor="middle" dominantBaseline="middle" fill="white" fontWeight={600} fontSize={emailSecurityScoreFontSize} >
                                            {emailSecurityScore}
                                        </text>
                                        <text x={EMAILSECURITYCHARTSIZE / 2} y={(EMAILSECURITYCHARTSIZE / 2) + emailSecurityScoreFontSize} textAnchor="middle" fill="#9ca3af" fontSize={emailSecuritytotalFontSize} >
                                            /{totalEmailSecurityScore}
                                        </text>
                                    </svg>
                                    <span className='font-semibold text-center'>
                                        Email security score
                                    </span>
                                </div>
                                <div className='mt-2.5 max-w-[200] text-center md:text-left text-gray-400 text-sm'>
                                    Stronger email security reduces the risk of phishing and impersonation.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 p-3 space-y-4 rounded-lg border border-gray-500/70 shadow-sm'>
                        <div className='flex gap-x-3'>
                            <Server />
                            Infrastructure Summary
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='flex p-2 gap-x-2 items-center justify-evenly border border-slate-600 rounded-lg'>
                                <span className='text-blue-500'><Globe size={36} /></span>
                                <div className='flex flex-col space-y-2'>
                                    <p className='text-sm'>IPv4 Addresses</p>
                                    <p className='font-bold text-3xl'>{countIPv4}</p>
                                    <p className='font-light text-sm'>A Records</p>
                                </div>
                            </div>
                            <div className='flex p-2 gap-x-2 items-center justify-evenly border border-slate-600 rounded-lg'>
                                <span className='text-purple-500'><Globe size={36} /></span>
                                <div className='flex flex-col space-y-2'>
                                    <p className='text-sm'>IPv6 Addresses</p>
                                    <p className='font-bold text-3xl'>{countIPv6}</p>
                                    <p className='font-light text-sm'>AAAA Records</p>
                                </div>
                            </div>
                            <div className='flex p-2 gap-x-2 items-center justify-evenly border border-slate-600 rounded-lg'>
                                <span className='text-green-500'><Mail size={36} /></span>
                                <div className='flex flex-col space-y-2'>
                                    <p className='text-sm'>Mail Servers</p>
                                    <p className='font-bold text-3xl'>{countMXRecords}</p>
                                    <p className='font-light text-sm'>MX Records</p>
                                </div>
                            </div>
                            <div className='flex p-2 gap-x-2 items-center justify-evenly border border-slate-600 rounded-lg'>
                                <span className='text-orange-500'><Server size={36} /></span>
                                <div className='flex flex-col space-y-2'>
                                    <p className='text-sm'>Name Servers</p>
                                    <p className='font-bold text-3xl'>{countNSRecords}</p>
                                    <p className='font-light text-sm'>NS Records</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* warnings and findings */}
                <div className='p-4 space-y-4 rounded-lg border border-gray-500/70 shadow-sm'>
                    <div className='flex gap-x-3'>
                        <TriangleAlert />
                        Warnings and Findings
                    </div>
                    <div className='px-4'>
                        <ul className='list-disc'>
                            {DnsLookupResult.indicators.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>


                {/* <div className="flex items-center gap-2 flex-wrap"> */}
                {/* <span className={`risk-badge ${riskCfg.badge}`}>{domainRiskLevel}</span> */}
                {/* {scanMeta && (
0                            <ReportButton result={{
                                type: "domain-age",
                                domain: domainAgeResult.domain,
                                createdDate: domainAgeResult.created_date ?? "NA",
                                ageDays: domainAgeResult.age_days ?? undefined,
                                riskLevel: domainAgeResult.riskLevel,
                            }}
                                scanMeta={scanMeta} />
                        )} */}
                {/* </div> */}
            </section>
        </>
    )
}
