export interface Result {
  prediction: string;
  confidence: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  indicators: string[];
  urls: string[];
  extractedText?: string;
};
export interface ScanMeta {
  type: "text" | "image" | "domain-age" | "dns-lookup";
  input?: string;
  timestamp: string;
};
export type CookiePreferences = {
  functional: true; // always true
  analytics: boolean;
  advertising: boolean;
  consentGiven: boolean;
};
export const defaultCookiePreferences: CookiePreferences = {
  functional: true,
  analytics: false,
  advertising: false,
  consentGiven: false,
};
export interface DomainAgeResult {
  domain: string;
  created_date: string | null;
  age_days: number | null;
  riskLevel: string;
  error?: string | null;
}

export interface DnsLookupResult {
  domain: string;

  a_records: string[];
  a_ttl: number | null;

  aaaa_records: string[];

  mx_records: MxRecord[];

  ns_records: string[];

  cname_records: string[];

  txt_records: string[];

  soa_record: SoaRecord | null;

  caa_records: CaaRecord[];

  has_spf: boolean;
  spf_record: string | null;
  spf_policy?: string | null;
  spf_lookup_count?: number | null;

  has_dmarc: boolean;
  dmarc_record: string | null;
  dmarc_policy?: string | null;
  dmarc_enforcement?: string | null;
  dmarc_subdomain_policy?: string | null;
  dmarc_rua?: string | null;
  dmarc_ruf?: string | null;
  dmarc_pct?: string | null;
  dmarc_adkim?: string | null;
  dmarc_aspf?: string | null;

  dkim_selectors_found: DkimSelector[];

  has_dkim: boolean;

  has_mta_sts: boolean;
  mta_sts_record: string | null;

  has_tls_rpt: boolean;
  tls_rpt_record: string | null;

  has_bimi: boolean;
  bimi_record: string | null;

  ptr_records: Record<string, string | null>;

  disposable_mail_hosts: string[];

  suspicious_nameservers: string[];

  email_security_score: number | null;
  
  total_email_security_score : number;

  email_security_checks: EmailSecurityChecks;

  risk_score: number;

  risk_level: string;

  indicators: string[];

  error: string | null;
}

export interface MxRecord {
  host: string;
  priority: number;
}

export interface SoaRecord {
  primary_ns: string;
  admin_email: string;
  serial: number;
  refresh: number;
  retry: number;
  expire: number;
  minimum_ttl: number;
}

export interface CaaRecord {
  flags: number;
  tag: string;
  value: string;
}

export interface DkimSelector {
  selector: string;
  record: string;
}

export interface EmailSecurityChecks {
  spf: boolean;
  dmarc: boolean;
  dkim: boolean;
  mta_sts: boolean;
  bimi: boolean;
}