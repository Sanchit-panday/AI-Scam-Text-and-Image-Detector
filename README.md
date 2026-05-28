# Mildy AI 🛡️

An AI-powered phishing and scam detection platform that analyzes both text messages and screenshots to identify potential scams, phishing attempts, and suspicious content using Machine Learning and OCR.

🔗 **Live Demo:** [MildyAI.com](https://ai-scam-text-and-image-detector.vercel.app/)

🔗 **GitHub Repository:** [Github Link](https://github.com/Sanchit-panday/AI-Scam-Text-and-Image-Detector)

---

## Overview

Mildy AI is a full-stack security application designed to help users identify potentially malicious messages and phishing attempts.

The platform supports:

- Text-based scam detection
- Screenshot/image-based scam detection
- OCR-powered text extraction
- Confidence scoring
- Risk-level classification
- Scam indicator analysis
- URL detection
- Scan history tracking

The application combines a machine learning pipeline built with Python and Scikit-Learn with an ASP.NET Core backend and a modern Next.js frontend.

---

## Features

### Text Analysis

- Detect phishing and scam messages
- Confidence score prediction
- Risk level classification
- Suspicious keyword detection
- URL extraction and detection
- Real-time validation

### Image Analysis

- Upload screenshots and images
- OCR text extraction using Tesseract
- Scam analysis on extracted content
- Image preview before analysis
- Confidence score generation

### Security Features

- Input validation
- API rate limiting
- Restricted CORS configuration
- Upload size restrictions
- Error handling and fault tolerance

### User Experience

- Responsive modern UI
- Loading indicators
- Error feedback
- Scan history
- Search and filter history
- Local storage persistence
- Dark mode support

---

## Screenshots

### Home Page

![Home Page](https://ik.imagekit.io/sanchitp/Screenshots/AI%20SCAM%20DETECTION/Home?updatedAt=1779721465998)

### Detection Results

![Detection Results](https://ik.imagekit.io/sanchitp/Screenshots/AI%20SCAM%20DETECTION/DetectionResult.png?updatedAt=1779721874122)

### Scan History Dashboard

![History Dashboard](https://ik.imagekit.io/sanchitp/Screenshots/AI%20SCAM%20DETECTION/ScanHistory.png)

---

## Architecture

```text
User
 │
 ▼
Next.js Frontend
 │
 ▼
ASP.NET Core Web API
 │
 ▼
Python ML Service
 │
 ├── TF-IDF Vectorizer
 ├── Logistic Regression Model
 ├── OCR Processing
 ├── URL Detection
 └── Indicator Analysis
 │
 ▼
Prediction Result
```

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Context API

### Backend

- ASP.NET Core
- C#
- REST APIs

### Machine Learning

- Python
- Scikit-Learn
- TF-IDF Vectorization
- Logistic Regression

### OCR

- Tesseract OCR
- Pillow

### Deployment

- Docker
- Vercel
- Render

---

## Machine Learning Pipeline

### Text Processing

1. User submits text or image
2. Text is extracted (OCR for images)
3. Text is cleaned and vectorized using TF-IDF
4. Logistic Regression model predicts classification
5. Confidence score is calculated
6. Risk level and indicators are generated
7. Results are returned to the frontend

---

## API Example

### Analyze Text

**POST**

```http
/api/phishing/check
```

Request:

```json
{
  "message": "Congratulations! You have won a prize. Click here immediately."
}
```

Response:

```json
{
  "prediction": "spam",
  "confidence": 0.94,
  "riskLevel": "High",
  "indicators": [
    "Urgent language detected",
    "Prize claim language detected"
  ],
  "urls": [
    "http://example.com"
  ]
}
```

---

## Local Development Setup

### Clone Repository

```bash
git clone https://github.com/Sanchit-panday/AI-Scam-Text-and-Image-Detector.git

cd AI-Scam-Text-and-Image-Detector
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

### Backend Setup

```bash
cd backend

dotnet restore

dotnet run
```

Backend:

```text
http://localhost:5000
```

---

### Python Dependencies

```bash
pip install -r requirements.txt
```

---

## Environment Variables

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:{PORT}
```

### Production

```env
NEXT_PUBLIC_API_URL=BACKEND_API_URL
```

---

## Project Structure

```text
AI-Scam-Text-and-Image-Detector
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── context/
│   └── public/
│   └── types/
│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Phishing-Model/
│   │   ├── Saved-Models/
│   │   │   ├── model.pkl
│   │   │   └── vectorizer.pkl
│   │   ├── *.py
│   │   └── requirements.txt
│   ├── Services/
│   └── Dockerfile
│
└── README.md
```

---

## Key Highlights

- Built a complete AI-powered phishing and scam detection platform
- Integrated ASP.NET Core with Python machine learning services
- Implemented OCR-based scam detection using Tesseract
- Added confidence scoring and risk classification
- Containerized and deployed using Docker
- Production deployment on Vercel and Render
- Designed a responsive and user-friendly interface

---

## Future Enhancements

- URL reputation analysis
- PDF report export
- Database-backed scan history
- User authentication and profiles
- Browser extension
- AI-generated threat explanations
- Email phishing header analysis

---

## Why This Project?

Phishing and online scams remain one of the most common cybersecurity threats. Mildy AI demonstrates how machine learning, OCR, and modern full-stack technologies can be combined to help users identify potentially malicious content quickly and effectively.

---

## Author

**Sanchit Panday**

GitHub:
https://github.com/Sanchit-panday

If you found this project interesting, consider starring the repository ⭐