# Gen AI Voice Agent

A voice-powered AI course consultant that allows users to search for courses, view course details, and get dummy syllabi using speech recognition. Built with **React** frontend and **Flask** backend.

---

## Features

- Voice-based search for courses
- Real-time speech-to-text transcription
- Dummy syllabus generation for courses
- Course detail modal with duration, fees, and notes
- Popular courses section
- Type-to-simulate voice input
- REST API endpoints for search, course details, syllabus, and redirection

---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Python, Flask
- **Speech:** Browser Web Speech API / custom voice.js
- **Data:** JSON (`Courses.json`)

---

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/gen-ai-voice-agent.git
cd gen-ai-voice-agent
```
### Step 2: Setup Backend (Flask)
### 2.1 Go to backend folder
```bash
cd Backend
```
### 2.2 Create a virtual environment
```bash
python -m venv venv
```
### 2.3 Activate the environment
### Windows:
```bash
venv\Scripts\activate
```
### Mac/Linux::
```bash
source venv/bin/activate
```
### 2.4 Install dependencies
```bash
pip install -r requirements.txt
```
### 2.5 Run the backend server
```bash
python app.py
```
The backend will be available at http://localhost:5000
### Step 3: Setup Frontend (React + Vite)
### 3.1 Go to frontend folder
```bash
cd ../Frontend
```
### 3.2 Install dependencies
```bash
npm install
```
### 3.3 Run the frontend dev server
```bash
npm run dev
```
The frontend will be available at http://localhost:5173
### API Endpoints
### Courses
- Method	Endpoint	Description
- GET	/api/search?q=<query>	Search for courses
- GET	/api/course/<id>	Get course details
- GET	/api/syllabus/<id>	Get syllabus outline
- GET	/api/popular	Get popular courses
- GET	/api/view/<id>	Redirect to course URL



## Notes

### Ensure Courses.json is in the Backend/ directory before starting Flask.
### If accessing backend from a separate frontend host, enable CORS:
``` bash
from flask_cors import CORS
CORS(app)
```
### For production deployment, host backend on a server (e.g., Render, Heroku) and frontend on Vercel/Netlify.

## Quick API Test Examples
### Search Courses
```bash
curl "http://localhost:5000/api/search?q=python"
```

### Get Course Details
```bash
curl "http://localhost:5000/api/course/1
```
### Get Course Syllabus
```bash
curl "http://localhost:5000/api/syllabus/1"
```
### View Popular Courses
```bash
curl "http://localhost:5000/api/popular"
```
### Redirect to Course URL
```bash
curl -L "http://localhost:5000/api/view/1"
```
### Roadmap

- ✅ Search courses and view syllabus
- ✅ Popular courses API
- ✅ Voice interaction with TTS and interruption
- 🔜 AI-powered course recommendation
- 🔜 User accounts + favorites
- 🔜 Analytics dashboard for courses
---
## Contributing

- Fork the repository
- Create a new branch (feature-xyz)
- Commit your changes
- Push and create a Pull Request
---

## Authors

- **Gaurav Singh** – [GitHub](https://github.com/Gaurav7974)  
- **Anshul** – [GitHub](https://github.com/Anshul96-bhu)  
- **Bhumika** – [GitHub](https://github.com/bhumika69)

---
