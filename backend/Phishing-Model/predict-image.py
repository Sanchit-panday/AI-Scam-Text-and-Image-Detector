import sys
import json
import re
import joblib
import math
from pathlib import Path
from indicatorDetector import detect_indicators
from riskCalculator import calculate_risk

from PIL import Image
import pytesseract

base_dir = Path(__file__).resolve().parent

model = joblib.load(base_dir / "saved-models" / "model.pkl")
vectorizer = joblib.load(base_dir / "saved-models" / "vectorizer.pkl")

image_path = sys.argv[1]
image = Image.open(image_path)
text = pytesseract.image_to_string(image)
x = vectorizer.transform([text])

# URL extractor
urls = re.findall(
    r'https?://[^\s]+|www\.[^\s]+',
    text
)
urls = [
    url.rstrip(".,!?:;")
    for url in urls
]

# Prediction and confidence percentage
prediction = model.predict(x)[0]

score = model.decision_function(x)[0]

confidence = (
    1 /
    (1 + math.exp(-abs(score)))
)

confidence = round(
    confidence * 100,
    2
)

# mapping
prediction_map = {
    "spam": "scam",
    "ham": "safe"
}
prediction = prediction_map.get(
    prediction,
    prediction
)

# indicator and RiskLevel Calculator
indicators = detect_indicators(text)
riskLevel = calculate_risk(
    confidence,
    len(indicators)
)

# Result
result = {
    "prediction": prediction,
    "confidence": confidence,
    "riskLevel" : riskLevel,
    "indicators" : indicators,
    "urls" : urls,
    "extractedText": text,
}
print(json.dumps(result))