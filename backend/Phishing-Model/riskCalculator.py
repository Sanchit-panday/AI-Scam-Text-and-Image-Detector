def calculate_risk(confidence, indicatorCount):

    if confidence >= 85 and indicatorCount >= 3:
        return "High"

    if confidence >= 70 or indicatorCount >= 1:
        return "Medium"

    confidence_prob = confidence / 100
# new ruleset
    if confidence_prob >= 0.90:
        return "High"

    elif confidence_prob >= 0.75:
        return "Medium"

    elif confidence_prob >= 3:
        return "Medium"

    else:
        return "Low"
        
    return "Low"