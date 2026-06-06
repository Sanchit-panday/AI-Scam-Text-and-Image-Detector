import dns.resolver
import json
import sys
import socket

def dns_lookup(domain: str):
    
    if not domain:
        print(json.dumps({"error": "No domain provided"}))
        sys.exit(1)

    result = {}
    indicators = []
    risk_score = 0

    # ------------------
    # Constants
    # ------------------

    DISPOSABLE_MAIL_PROVIDERS = [
        "mailinator.com",
        "guerrillamail.com",
        "10minutemail.com",
        "tempmail.com",
        "temp-mail.org",
        "throwaway.email",
        "yopmail.com",
        "trashmail.com",
        "fakeinbox.com",
        "maildrop.cc",
        "sharklasers.com",
        "dispostable.com",
        "getnada.com",
        "spamgourmet.com",
    ]

    # Common DKIM selectors used by major ESPs and mail providers
    DKIM_SELECTORS = [
        "default", "google", "mail", "email", "dkim",
        "s1", "s2", "k1", "selector1", "selector2",
        "zoho", "sendgrid", "mailchimp", "mandrill",
        "smtp", "amazonses", "protonmail", "pm", "mx",
        "mimecast", "mailjet", "postmark", "sparkpost",
    ]

    SUSPICIOUS_NS_KEYWORDS = [
        "free", "temp", "cheap", "anonymous",
        "hide", "proxy", "vpn", "dynamic", "bulletproof",
    ]
    
    result["domain"]  = domain

    # ------------------
    # A Records + TTL (fast-flux detection)
    # ------------------

    try:
        a_answers = dns.resolver.resolve(domain, "A")
        result["a_records"] = [str(r) for r in a_answers]
        result["a_ttl"] = a_answers.rrset.ttl

        if a_answers.rrset.ttl < 300:
            indicators.append(
                f"Very low A record TTL ({a_answers.rrset.ttl}s) — "
                "possible fast-flux phishing domain"
            )
            risk_score += 25
    except Exception:
        result["a_records"] = []
        result["a_ttl"] = None

    # ------------------
    # AAAA Records (IPv6)
    # ------------------

    try:
        result["aaaa_records"] = [
            str(r) for r in dns.resolver.resolve(domain, "AAAA")
        ]
    except Exception:
        result["aaaa_records"] = []

    # ------------------
    # MX Records (with priority)
    # ------------------

    try:
        result["mx_records"] = [
            {
                "host": str(r.exchange).rstrip("."),
                "priority": r.preference,
            }
            for r in sorted(
                dns.resolver.resolve(domain, "MX"),
                key=lambda r: r.preference,
            )
        ]
    except Exception:
        result["mx_records"] = []

        if not result["mx_records"]:
            indicators.append("No MX records — domain cannot receive email")

    # ------------------
    # NS Records
    # ------------------

    try:
        result["ns_records"] = [
            str(r).rstrip(".") for r in dns.resolver.resolve(domain, "NS")
        ]
    except Exception:
        result["ns_records"] = []

    # ------------------
    # CNAME Records
    # ------------------

    try:
        result["cname_records"] = [
            str(r.target).rstrip(".")
            for r in dns.resolver.resolve(domain, "CNAME")
        ]
    except Exception:
        result["cname_records"] = []

    # ------------------
    # TXT Records
    # ------------------

    try:
        txt_records = [
            "".join(
                s.decode() if isinstance(s, bytes) else s
                for s in record.strings
            )
            for record in dns.resolver.resolve(domain, "TXT")
        ]
    except Exception:
        txt_records = []

    result["txt_records"] = txt_records

    # ------------------
    # SOA Record
    # ------------------

    try:
        soa = dns.resolver.resolve(domain, "SOA")[0]
        result["soa_record"] = {
            "primary_ns": str(soa.mname).rstrip("."),
            "admin_email": str(soa.rname).rstrip(".").replace(".", "@", 1),
            "serial": soa.serial,
            "refresh": soa.refresh,
            "retry": soa.retry,
            "expire": soa.expire,
            "minimum_ttl": soa.minimum,
        }
    except Exception:
        result["soa_record"] = None

    # ------------------
    # CAA Records (SSL/TLS issuance control)
    # ------------------

    try:
        caa_records = []
        for r in dns.resolver.resolve(domain, "CAA"):
            tag = r.tag.decode() if isinstance(r.tag, bytes) else r.tag
            value = r.value.decode() if isinstance(r.value, bytes) else r.value
            caa_records.append({
                "flags": r.flags,
                "tag": tag,
                "value": value,
            })
        result["caa_records"] = caa_records
    except Exception:
        result["caa_records"] = []

    if not result["caa_records"]:
        indicators.append(
            "No CAA records — any Certificate Authority can issue SSL "
            "certs for this domain (phishing risk)"
        )
        risk_score += 10

    # ------------------
    # SPF Analysis
    # ------------------

    spf_record = next(
        (r for r in txt_records if r.lower().startswith("v=spf1")),
        None,
    )

    result["has_spf"] = spf_record is not None
    result["spf_record"] = spf_record

    if not spf_record:
        indicators.append("Missing SPF record — domain vulnerable to email spoofing")
        risk_score += 25
    else:
        # Determine policy strength
        if "+all" in spf_record:
            result["spf_policy"] = "pass_all"
            indicators.append(
                "CRITICAL: SPF +all detected — any server can send mail "
                "as this domain"
            )
            risk_score += 50

        elif "-all" in spf_record:
            result["spf_policy"] = "strict"

        elif "~all" in spf_record:
            result["spf_policy"] = "softfail"
            indicators.append(
                "SPF ~all (softfail) — messages from unlisted servers "
                "are accepted but marked. Consider upgrading to -all"
            )

        elif "?all" in spf_record:
            result["spf_policy"] = "neutral"
            indicators.append(
                "SPF ?all (neutral) — provides no real protection "
                "against spoofing"
            )
            risk_score += 15

        else:
            result["spf_policy"] = "unknown"

        # Count DNS lookups — RFC 7208 allows max 10
        lookup_mechanisms = [
            "include:", "a:", "a ", "mx:", "mx ", "ptr:", "exists:",
        ]
        lookup_count = sum(
            spf_record.lower().count(m) for m in lookup_mechanisms
        )
        result["spf_lookup_count"] = lookup_count

        if lookup_count > 10:
            indicators.append(
                f"SPF exceeds 10 DNS lookup limit ({lookup_count} found) "
                "— may cause delivery failures (permerror)"
            )
            risk_score += 10

    # ------------------
    # DMARC Analysis
    # ------------------

    try:
        dmarc_records = [
            str(r)
            for r in dns.resolver.resolve(f"_dmarc.{domain}", "TXT")
        ]
        dmarc_found = bool(dmarc_records)
        dmarc_raw = dmarc_records[0] if dmarc_records else None
    except Exception:
        dmarc_records = []
        dmarc_found = False
        dmarc_raw = None

    result["has_dmarc"] = dmarc_found
    result["dmarc_record"] = dmarc_raw

    if not dmarc_found:
        indicators.append(
            "Missing DMARC record — phishing domains commonly lack DMARC"
        )
        risk_score += 30
    else:
        # Parse all DMARC tags
        dmarc_tags = {}
        if dmarc_raw:
            for tag in dmarc_raw.split(";"):
                tag = tag.strip()
                if "=" in tag:
                    k, v = tag.split("=", 1)
                    dmarc_tags[k.strip().lower()] = v.strip()

        policy = dmarc_tags.get("p", "none")
        result["dmarc_policy"] = policy

        if policy == "none":
            indicators.append(
                "DMARC policy is 'none' — monitoring only, no enforcement. "
                "Emails can still be spoofed and delivered"
            )
            risk_score += 15
        elif policy == "quarantine":
            result["dmarc_enforcement"] = "partial"
        elif policy == "reject":
            result["dmarc_enforcement"] = "strict"

        # Subdomain policy
        sp = dmarc_tags.get("sp")
        if sp:
            result["dmarc_subdomain_policy"] = sp
            if sp == "none" and policy in ("quarantine", "reject"):
                indicators.append(
                    "DMARC subdomain policy (sp=none) is weaker than "
                    "the main domain policy — subdomains can be spoofed"
                )

        # Reporting URIs
        result["dmarc_rua"] = dmarc_tags.get("rua")  # Aggregate reports
        result["dmarc_ruf"] = dmarc_tags.get("ruf")  # Forensic reports

        # Partial enforcement
        pct = dmarc_tags.get("pct", "100")
        result["dmarc_pct"] = pct
        if pct != "100":
            indicators.append(
                f"DMARC pct={pct} — policy only enforced on {pct}% "
                "of messages, not full protection"
            )

        # DKIM/SPF alignment mode
        result["dmarc_adkim"] = dmarc_tags.get("adkim", "r")  # r=relaxed, s=strict
        result["dmarc_aspf"] = dmarc_tags.get("aspf", "r")

    # ------------------
    # DKIM Detection (probe common selectors)
    # ------------------

    dkim_selectors_found = []

    for selector in DKIM_SELECTORS:
        try:
            dkim_query = f"{selector}._domainkey.{domain}"
            records = dns.resolver.resolve(dkim_query, "TXT")
            for r in records:
                record_str = "".join(
                    s.decode() if isinstance(s, bytes) else s
                    for s in r.strings
                )
                if "v=dkim1" in record_str.lower() or "p=" in record_str:
                    dkim_selectors_found.append({
                        "selector": selector,
                        "record": record_str[:120] + "..."
                        if len(record_str) > 120
                        else record_str,
                    })
                    break
        except Exception:
            pass

    result["dkim_selectors_found"] = dkim_selectors_found
    result["has_dkim"] = bool(dkim_selectors_found)

    if not dkim_selectors_found:
        indicators.append(
            "No DKIM records found for common selectors — "
            "emails may fail authentication checks"
        )
        risk_score += 15

    # ------------------
    # MTA-STS (Mail Transfer Agent Strict Transport Security)
    # ------------------

    try:
        mta_sts_records = [
            "".join(
                s.decode() if isinstance(s, bytes) else s
                for s in r.strings
            )
            for r in dns.resolver.resolve(f"_mta-sts.{domain}", "TXT")
        ]
        result["has_mta_sts"] = bool(mta_sts_records)
        result["mta_sts_record"] = mta_sts_records[0] if mta_sts_records else None
    except Exception:
        result["has_mta_sts"] = False
        result["mta_sts_record"] = None

    # ------------------
    # TLS-RPT (TLS Reporting)
    # ------------------

    try:
        tls_rpt_records = [
            "".join(
                s.decode() if isinstance(s, bytes) else s
                for s in r.strings
            )
            for r in dns.resolver.resolve(f"_smtp._tls.{domain}", "TXT")
        ]
        result["has_tls_rpt"] = bool(tls_rpt_records)
        result["tls_rpt_record"] = tls_rpt_records[0] if tls_rpt_records else None
    except Exception:
        result["has_tls_rpt"] = False
        result["tls_rpt_record"] = None

    # ------------------
    # BIMI (Brand Indicators for Message Identification)
    # ------------------

    try:
        bimi_records = [
            "".join(
                s.decode() if isinstance(s, bytes) else s
                for s in r.strings
            )
            for r in dns.resolver.resolve(f"default._bimi.{domain}", "TXT")
        ]
        result["has_bimi"] = bool(bimi_records)
        result["bimi_record"] = bimi_records[0] if bimi_records else None
    except Exception:
        result["has_bimi"] = False
        result["bimi_record"] = None

    # ------------------
    # PTR / Reverse DNS (for A records)
    # ------------------

    ptr_results = {}
    for ip in result.get("a_records", []):
        try:
            ptr = socket.gethostbyaddr(ip)[0]
            ptr_results[ip] = ptr
        except Exception:
            ptr_results[ip] = None

    result["ptr_records"] = ptr_results

    # No PTR = may be flagged as spam by receiving servers
    missing_ptr = [ip for ip, ptr in ptr_results.items() if ptr is None]
    if missing_ptr:
        indicators.append(
            f"Missing PTR (reverse DNS) for {len(missing_ptr)} IP(s) — "
            "mail from these IPs may be rejected as spam"
        )

    # ------------------
    # Disposable Mail Detection
    # ------------------

    disposable_mx = []
    mx_hosts = [
        mx["host"] if isinstance(mx, dict) else mx
        for mx in result["mx_records"]
    ]

    for mx in mx_hosts:
        mx_lower = mx.lower()
        for provider in DISPOSABLE_MAIL_PROVIDERS:
            if provider in mx_lower:
                disposable_mx.append(mx)
                indicators.append(
                    f"Disposable email provider detected ({mx}) — "
                    "high scam/fraud risk"
                )
                risk_score += 40
                break

    result["disposable_mail_hosts"] = disposable_mx

    # ------------------
    # Nameserver Analysis
    # ------------------

    suspicious_ns = []
    for ns in result["ns_records"]:
        ns_lower = ns.lower()
        if any(keyword in ns_lower for keyword in SUSPICIOUS_NS_KEYWORDS):
            suspicious_ns.append(ns)

    if suspicious_ns:
        indicators.append(
            "Potentially suspicious nameservers detected — "
            "commonly associated with phishing infrastructure"
        )
        risk_score += 20

    result["suspicious_nameservers"] = suspicious_ns

    # ------------------
    # Excessive CNAME Chains
    # ------------------

    if len(result["cname_records"]) > 3:
        indicators.append(
            f"Excessive CNAME chain ({len(result['cname_records'])} records) "
            "— may indicate domain cloaking or redirector abuse"
        )
        risk_score += 10

    # ------------------
    # Email Security Score (out of 5)
    # ------------------

    email_checks = {
        "spf": result["has_spf"],
        "dmarc": result["has_dmarc"],
        "dkim": result["has_dkim"],
        "mta_sts": result["has_mta_sts"],
        "bimi": result["has_bimi"],
    }
    email_score = sum(1 for v in email_checks.values() if v)
    result["email_security_score"] = email_score
    result["total_email_security_score"] = len(email_checks)
    result["email_security_checks"] = email_checks

    # ------------------
    # Risk Scoringns
    # ------------------

    risk_score = min(risk_score, 100)

    if risk_score >= 70:
        risk_level = "critical"
    elif risk_score >= 45:
        risk_level = "high"
    elif risk_score >= 20:
        risk_level = "medium"
    elif risk_score > 0:
        risk_level = "low"
    else:
        risk_level = "clean"

    result["risk_score"] = risk_score
    result["risk_level"] = risk_level
    result["indicators"] = indicators

    return result
    # ------------------
    # Output
    # ------------------
if __name__ == "__main__":
    import sys
    import json

    domain = sys.argv[1]
    result = dns_lookup(domain)

    print(json.dumps(result, indent=2))