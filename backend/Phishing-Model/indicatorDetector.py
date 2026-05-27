import re

URL_REGEX = r'https?://[^\s]+|www\.[^\s]+'

PATTERNS = {
    "Urgent language": [
        r"\burgent\b",
        r"\bimmediately\b",
        r"\bact now\b",
        r"\bfinal warning\b",
        r"\bexpires? today\b",
        r"\bwithin \d+ hours?\b",
        r"\baccount will be suspended\b",
        r"\btime sensitive\b",
    ],

    "Credential request": [
        r"\bpassword\b",
        r"\blogin\b",
        r"\botp\b",
        r"\bone[- ]?time password\b",
        r"\bsecurity code\b",
        r"\bpin\b",
        r"\bverification code\b",
        r"\busername\b",
    ],

    "Financial request": [
        r"\bbank account\b",
        r"\bcredit card\b",
        r"\bdebit card\b",
        r"\bupi\b",
        r"\bpayment\b",
        r"\bwire transfer\b",
        r"\btransfer funds\b",
        r"\brefund\b",
        r"\bsend money\b",
    ],

    "Prize or lottery language": [
        r"\byou (have )?won\b",
        r"\bcongratulations\b",
        r"\blottery\b",
        r"\breward\b",
        r"\bclaim your prize\b",
        r"\bjackpot\b",
        r"\blucky winner\b",
    ],

    "Account verification request": [
        r"\bverify your account\b",
        r"\bverify account\b",
        r"\bconfirm your identity\b",
        r"\baccount verification\b",
        r"\bcomplete verification\b",
        r"\bkyc\b",
        r"\bre-verify\b",
    ],

    "Threat or penalty language": [
        r"\blegal action\b",
        r"\baccount suspended\b",
        r"\baccount locked\b",
        r"\bfine\b",
        r"\bpenalty\b",
        r"\bpolice case\b",
        r"\barrest warrant\b",
        r"\bblocked permanently\b",
    ],

    "Job scam indicators": [
        r"\bwork from home\b",
        r"\bearn ₹?\d+\b",
        r"\bearn money fast\b",
        r"\bpart[- ]time job\b",
        r"\bdata entry\b",
        r"\bno experience required\b",
        r"\bdaily income\b",
    ],

    "Crypto scam indicators": [
        r"\bbitcoin\b",
        r"\bethereum\b",
        r"\bcrypto\b",
        r"\bdouble your money\b",
        r"\binvestment opportunity\b",
        r"\bguaranteed returns\b",
    ],

    "Gift card payment request": [
        r"\bgift card\b",
        r"\bgoogle play card\b",
        r"\bitunes card\b",
        r"\bamazon gift card\b",
    ],

    "Remote access request": [
        r"\banydesk\b",
        r"\bteamviewer\b",
        r"\bremote access\b",
        r"\binstall support software\b",
    ],
}

IMPERSONATION_BRANDS = [
    "amazon",
    "paypal",
    "google",
    "microsoft",
    "apple",
    "netflix",
    "facebook",
    "instagram",
    "whatsapp",
    "telegram",
    "state bank",
    "sbi",
    "hdfc",
    "icici",
    "axis bank",
    "government",
    "income tax",
    "customs",
]


def detect_indicators(text):
    indicators = []
    text_lower = text.lower()

    # Pattern-based detection
    for label, patterns in PATTERNS.items():
        if any(re.search(pattern, text_lower) for pattern in patterns):
            indicators.append(label)

    # URL detection
    urls = re.findall(URL_REGEX, text)

    if urls:
        indicators.append("Contains links")

    # URL shorteners
    if re.search(
        r"(bit\.ly|tinyurl\.com|t\.co|goo\.gl|rb\.gy|shorturl)",
        text_lower
    ):
        indicators.append("URL shortener detected")

    # Suspicious numbers
    if re.search(r"\+?\d[\d\s\-]{8,}", text):
        indicators.append("Phone number present")

    # Excessive punctuation
    if re.search(r"[!?]{3,}", text):
        indicators.append("Excessive punctuation")

    # Excessive capitalization
    words = re.findall(r"\b[A-Z]{4,}\b", text)
    if len(words) >= 3:
        indicators.append("Excessive capitalization")

    # Impersonation attempts
    for brand in IMPERSONATION_BRANDS:
        if brand in text_lower:
            indicators.append("Possible brand impersonation")
            break

    return indicators