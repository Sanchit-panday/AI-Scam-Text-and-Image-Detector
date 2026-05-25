import sys
import json
import re
import joblib
from pathlib import Path
from indicatorDetector import detect_indicators
from riskCalculator import calculate_risk

from PIL import Image
import pytesseract
# pytesseract.pytesseract.tesseract_cmd = (
#     r"C:\Users\JAI PRAKASH PANDEY\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"
# )


base_dir = Path(__file__).resolve().parent

model = joblib.load(base_dir / "saved-models" / "model.pkl")
vectorizer = joblib.load(base_dir / "saved-models" / "vectorizer.pkl")

image_path = sys.argv[1]

image = Image.open(image_path)

text = pytesseract.image_to_string(image)

x = vectorizer.transform([text])

prediction = model.predict(x)[0]
# prob = model.predict_proba(x)[0]
prob = model.predict_proba(x)[0][1]

# might be important
predicted_index = list(model.classes_).index(prediction)
confidence = round(
    model.predict_proba(x)[0][predicted_index],
    2
)

urls = re.findall(
    r'https?://[^\s]+|www\.[^\s]+',
    text
)
indicators = detect_indicators(text)
riskLevel = calculate_risk(
    confidence,
    len(indicators)
)
# result = {
#     "prediction": "TEST",
#     "confidence": 0.99,
#     "extractedText": "HELLO WORLD"
# }

result = {
    "prediction": prediction,
    "confidence": confidence,
    "riskLevel" : riskLevel,
    "indicators" : indicators,
    "urls" : urls,
    "extractedText": text,
}

# print("OCR TEXT:", repr(text), file=sys.stderr)

print(json.dumps(result))