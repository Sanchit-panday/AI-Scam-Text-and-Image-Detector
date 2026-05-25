def calculate_risk(confidence, indicatorCount):

    confidence_percent = confidence * 100

    if confidence_percent >= 85 and indicatorCount >= 3:
        return "High"

    if confidence_percent >= 70 or indicatorCount >= 1:
        return "Medium"

# new ruleset
    if confidence >= 0.90:
        return "High"

    elif confidence >= 0.75:
        return "Medium"

    elif indicatorCount >= 3:
        return "Medium"

    else:
        return "Low"
        
    return "Low"