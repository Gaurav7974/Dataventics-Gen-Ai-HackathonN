# Gen AI Voice Agent 
Gen AI Voice Agent is an intelligent, real-time voice assistant built with modern web technologies.
It combines Generative AI with speech recognition and text-to-speech synthesis to create a natural, interactive experience directly in your browser..

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Flask](https://img.shields.io/badge/Backend-Flask-black?logo=flask)
![Python](https://img.shields.io/badge/Python-3.8%2B-green?logo=python)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 🚀 Features
- Voice-based search for courses
- Real-time speech-to-text transcription
- Dummy syllabus generation for courses
- Course detail modal with duration, fees, and notes
- Popular courses section
- Type-to-simulate voice input
- REST API endpoints for search, details, syllabus, and redirection

---

## 🛠 Tech Stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Python, Flask
- Speech: Browser Web Speech API / custom `voice.js`
- Data: JSON (`Courses.json`)

---

## Installation & Setup

### 1. Clone the Repository
``` bash
git clone https://github.com/your-username/gen-ai-voice-agent.git
cd gen-ai-voice-agent
```
### 2. Setup Backend (Flask)
``` bash
cd Backend
python -m venv venv
```
## Activate environment
### Windows
``` bash
venv\Scripts\activate
```
### Mac/Linux
``` bash
source venv/bin/activate
```
#### Install dependencies
``` bash
pip install -r requirements.txt
```

#### Run the backend server
``` bash
python app.py
```
Backend available at: http://localhost:5000

---

### 3. Setup Frontend (React + Vite)
``` bash
cd ../Frontend
npm install
npm run dev
```
Frontend available at: http://localhost:5173

---

## 🔗 API Endpoints

| Method | Endpoint                | Description                |
|-------|--------------------------|----------------------------|
| GET   | `/api/search?q=<query>` | Search for courses         |
| GET   | `/api/course/<id>`      | Get course details         |
| GET   | `/api/syllabus/<id>`    | Get syllabus outline       |
| GET   | `/api/popular`          | View popular courses       |
| GET   | `/api/view/<id>`        | Redirect to course URL     |

---

## 🧪 Quick API Test Examples

### Search Courses
``` bash
curl "http://localhost:5000/api/search?q=python"
```

### Get Course Details
``` bash
curl "http://localhost:5000/api/course/1"
```

### Get Course Syllabus
``` bash
curl "http://localhost:5000/api/syllabus/1"
```
### View Popular Courses
``` bash
curl "http://localhost:5000/api/popular"
```

### Redirect to Course URL
``` bash
curl -L "http://localhost:5000/api/view/1"
```
---

## 📌 Notes
- Ensure `Courses.json` is present in the `Backend/` directory before starting Flask.
- If the frontend runs on a different origin, enable CORS in Flask:
``` bash
from flask_cors import CORS
CORS(app)
```
- For production: deploy backend (Render/Heroku/Fly.io) and frontend (Vercel/Netlify), and set the frontend to use the deployed API base URL.

---

## 🗺️ Roadmap
- ✅ Search courses and view syllabus
- ✅ Popular courses API
- ✅ Voice interaction with TTS and interruption
- 🔜 AI-powered course recommendation
- 🔜 User accounts + favorites
- 🔜 Analytics dashboard for courses

---

## 🤝 Contributing
1) Fork the repo
2) Create a feature branch
``` bash
git checkout -b feature-xyz
```
4) Commit changes
``` bash
git commit -m "Add feature xyz"
```
5) Push and open a PR
``` bash
git push origin feature-xyz
```

---

## 👥 Authors
- Gaurav Singh – https://github.com/Gaurav7974
- Anshul – https://github.com/Anshul96-bhu
- Bhumika – https://github.com/bhumika69
