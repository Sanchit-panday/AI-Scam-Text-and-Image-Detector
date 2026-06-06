using System.Text.Json.Serialization;

namespace PhishingDetector.API.DTOs;

public class DnsLookupResponseDto
{
    [JsonPropertyName("domain")]
    public string Domain { get; set; }

    [JsonPropertyName("a_records")]
    public List<string> ARecords { get; set; } = [];

    [JsonPropertyName("a_ttl")]
    public int? ATtl { get; set; }

    [JsonPropertyName("aaaa_records")]
    public List<string> AaaaRecords { get; set; } = [];

    [JsonPropertyName("mx_records")]
    public List<MxRecordDto> MxRecords { get; set; } = [];

    [JsonPropertyName("ns_records")]
    public List<string> NsRecords { get; set; } = [];

    [JsonPropertyName("cname_records")]
    public List<string> CnameRecords { get; set; } = [];

    [JsonPropertyName("txt_records")]
    public List<string> TxtRecords { get; set; } = [];

    [JsonPropertyName("soa_record")]
    public SoaRecordDto? SoaRecord { get; set; }

    [JsonPropertyName("caa_records")]
    public List<CaaRecordDto> CaaRecords { get; set; } = [];

    [JsonPropertyName("has_spf")]
    public bool HasSpf { get; set; }

    [JsonPropertyName("spf_record")]
    public string? SpfRecord { get; set; }

    [JsonPropertyName("spf_policy")]
    public string? SpfPolicy { get; set; }

    [JsonPropertyName("spf_lookup_count")]
    public int? SpfLookupCount { get; set; }

    [JsonPropertyName("has_dmarc")]
    public bool HasDmarc { get; set; }

    [JsonPropertyName("dmarc_record")]
    public string? DmarcRecord { get; set; }

    [JsonPropertyName("dmarc_policy")]
    public string? DmarcPolicy { get; set; }

    [JsonPropertyName("dmarc_enforcement")]
    public string? DmarcEnforcement { get; set; }

    [JsonPropertyName("dmarc_subdomain_policy")]
    public string? DmarcSubdomainPolicy { get; set; }

    [JsonPropertyName("dmarc_rua")]
    public string? DmarcRua { get; set; }

    [JsonPropertyName("dmarc_ruf")]
    public string? DmarcRuf { get; set; }

    [JsonPropertyName("dmarc_pct")]
    public string? DmarcPct { get; set; }

    [JsonPropertyName("dmarc_adkim")]
    public string? DmarcAdkim { get; set; }

    [JsonPropertyName("dmarc_aspf")]
    public string? DmarcAspf { get; set; }

    [JsonPropertyName("dkim_selectors_found")]
    public List<DkimSelectorDto> DkimSelectorsFound { get; set; } = [];

    [JsonPropertyName("has_dkim")]
    public bool HasDkim { get; set; }

    [JsonPropertyName("has_mta_sts")]
    public bool HasMtaSts { get; set; }

    [JsonPropertyName("mta_sts_record")]
    public string? MtaStsRecord { get; set; }

    [JsonPropertyName("has_tls_rpt")]
    public bool HasTlsRpt { get; set; }

    [JsonPropertyName("tls_rpt_record")]
    public string? TlsRptRecord { get; set; }

    [JsonPropertyName("has_bimi")]
    public bool HasBimi { get; set; }

    [JsonPropertyName("bimi_record")]
    public string? BimiRecord { get; set; }

    [JsonPropertyName("ptr_records")]
    public Dictionary<string, string?> PtrRecords { get; set; } = [];

    [JsonPropertyName("disposable_mail_hosts")]
    public List<string> DisposableMailHosts { get; set; } = [];

    [JsonPropertyName("suspicious_nameservers")]
    public List<string> SuspiciousNameservers { get; set; } = [];

    [JsonPropertyName("email_security_score")]
    public int? EmailSecurityScore { get; set; } = 0;

    [JsonPropertyName("total_email_security_score")]
    public int TotalEmailSecurityScore { get; set; }

    [JsonPropertyName("email_security_checks")]
    public EmailSecurityChecksDto EmailSecurityChecks { get; set; } = new();

    [JsonPropertyName("risk_score")]
    public int RiskScore { get; set; }

    [JsonPropertyName("risk_level")]
    public string RiskLevel { get; set; } = string.Empty;

    [JsonPropertyName("indicators")]
    public List<string> Indicators { get; set; } = [];

    [JsonPropertyName("error")]
    public string? Error { get; set; } = string.Empty;
}

public class MxRecordDto
{
    [JsonPropertyName("host")]
    public string Host { get; set; } = string.Empty;

    [JsonPropertyName("priority")]
    public int Priority { get; set; }
}

public class SoaRecordDto
{
    [JsonPropertyName("primary_ns")]
    public string PrimaryNs { get; set; } = string.Empty;

    [JsonPropertyName("admin_email")]
    public string AdminEmail { get; set; } = string.Empty;

    [JsonPropertyName("serial")]
    public long Serial { get; set; }

    [JsonPropertyName("refresh")]
    public int Refresh { get; set; }

    [JsonPropertyName("retry")]
    public int Retry { get; set; }

    [JsonPropertyName("expire")]
    public int Expire { get; set; }

    [JsonPropertyName("minimum_ttl")]
    public int MinimumTtl { get; set; }
}

public class CaaRecordDto
{
    [JsonPropertyName("flags")]
    public int Flags { get; set; }

    [JsonPropertyName("tag")]
    public string Tag { get; set; } = string.Empty;

    [JsonPropertyName("value")]
    public string Value { get; set; } = string.Empty;
}

public class DkimSelectorDto
{
    [JsonPropertyName("selector")]
    public string Selector { get; set; } = string.Empty;

    [JsonPropertyName("record")]
    public string Record { get; set; } = string.Empty;
}

public class EmailSecurityChecksDto
{
    [JsonPropertyName("spf")]
    public bool Spf { get; set; }

    [JsonPropertyName("dmarc")]
    public bool Dmarc { get; set; }

    [JsonPropertyName("dkim")]
    public bool Dkim { get; set; }

    [JsonPropertyName("mta_sts")]
    public bool MtaSts { get; set; }

    [JsonPropertyName("bimi")]
    public bool Bimi { get; set; }
}
