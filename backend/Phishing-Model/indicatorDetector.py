import re

def detect_indicators(text):
    text_lower = text.lower()

    indicators = []

    # Urgent language
    urgent_words = [
        "urgent",
        "immediately",
        "act now",
        "within 24 hours",
        "expires today",
        "final warning"
    ]

    if any(word in text_lower for word in urgent_words):
        indicators.append("Urgent language")

    # Suspicious links
    if re.search(r'https?://|www\.', text):
        indicators.append("Suspicious links")

    # Verification requests
    verification_words = [
        "verify account",
        "verify your identity",
        "confirm account",
        "account verification"
    ]

    if any(word in text_lower for word in verification_words):
        indicators.append("Account verification request")

    # Prize language
    prize_words = [
        "winner",
        "won",
        "congratulations",
        "prize",
        "reward",
        "lottery"
    ]

    if any(word in text_lower for word in prize_words):
        indicators.append("Prize/winner language")

    # Credential requests
    credential_words = [
        "password",
        "username",
        "login",
        "otp",
        "security code",
        "pin"
    ]

    if any(word in text_lower for word in credential_words):
        indicators.append("Credential requests")

    # Financial requests
    financial_words = [
        "bank account",
        "payment",
        "transfer",
        "credit card",
        "debit card",
        "transaction",
        "refund"
    ]

    if any(word in text_lower for word in financial_words):
        indicators.append("Financial requests")

    # Impersonation
    impersonation_words = [
        "amazon",
        "paypal",
        "google",
        "microsoft",
        "bank",
        "government",
        "irs"
    ]

    if any(word in text_lower for word in impersonation_words):
        indicators.append("Impersonation indicators")

    return indicators