import sys
import joblib
import re
import json
from pathlib import Path
from indicatorDetector import detect_indicators
from riskCalculator import calculate_risk

from PIL import Image
import pytesseract

base_dir = Path(__file__).resolve().parent
model = joblib.load(base_dir / "saved-models" / "model.pkl")
vectorizer = joblib.load(base_dir / "saved-models" / "vectorizer.pkl")

text = sys.argv[1]

x = vectorizer.transform([text])

prediction = model.predict(x)[0]
prob = model.predict_proba(x)[0][1]

predicted_index = list(model.classes_).index(prediction)
confidence = round(
    model.predict_proba(x)[0][predicted_index],
    2
)
# tempeorary
prob = confidence

urls = re.findall(
    r'https?://[^\s]+|www\.[^\s]+',
    text
)
indicators = detect_indicators(text)
riskLevel = calculate_risk(
    prob,
    len(indicators)
)

# if hasattr(prediction, "item"):
#     prediction = prediction.item()

# confidence = prob.tolist() if hasattr(prob, "tolist") else prob



# predicted_index = list(model.classes_).index(prediction)
# confidence = float(prob[predicted_index])

# if prob < 0.5:
#     prob = 1 - prob
#     prediction = "scam"


# prediction = "not a scam" if prediction == "ham" else "scam"


result = {
    "prediction": prediction,
    "confidence": prob,
    "riskLevel" : riskLevel,
    "indicators" : indicators,
    "urls" : urls
}

print(json.dumps(result))