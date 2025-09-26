from flask import Flask, request, jsonify, redirect
import json
import os
import re

app = Flask(__name__)

#Config
COURSES_FILE = "Courses.json"

# Dummy syllabus templates
DUMMY_SYLLABI = {
    "intro": [
        "Introduction to Python Syntax",
        "Variables and Data Types",
        "Control Flow: if/else, loops",
        "Functions and Modules",
        "Basic File I/O"
    ],
    "data": [
        "NumPy Arrays and Operations",
        "Pandas DataFrames and Series",
        "Data Cleaning and Transformation",
        "Data Visualization with Matplotlib/Seaborn",
        "Introduction to Jupyter Notebooks"
    ],
    "web": [
        "HTTP Basics and REST APIs",
        "Web Scraping with BeautifulSoup",
        "Building APIs with Flask/FastAPI",
        "HTML/CSS Basics for Developers",
        "Deployment with Heroku or Render"
    ],
    "ml": [
        "Supervised vs Unsupervised Learning",
        "Linear Regression and Classification",
        "Model Evaluation Metrics",
        "Scikit-learn Basics",
        "Introduction to Neural Networks"
    ]
}

def get_dummy_syllabus(title):
    t = title.lower()
    if "python" in t:
        if any(kw in t for kw in ["data", "analysis", "pandas", "numpy"]):
            return DUMMY_SYLLABI["data"]
        elif any(kw in t for kw in ["web", "django", "flask", "api"]):
            return DUMMY_SYLLABI["web"]
        elif any(kw in t for kw in ["machine learning", "ml", "ai", "deep learning"]):
            return DUMMY_SYLLABI["ml"]
        else:
            return DUMMY_SYLLABI["intro"]
    elif any(kw in t for kw in ["data", "analytics", "visualization"]):
        return DUMMY_SYLLABI["data"]
    elif any(kw in t for kw in ["machine learning", "ai", "neural", "deep"]):
        return DUMMY_SYLLABI["ml"]
    else:
        return DUMMY_SYLLABI["intro"]

# Load courses once at startup
if not os.path.exists(COURSES_FILE):
    raise FileNotFoundError(f"{COURSES_FILE} not found. Please place it in the same directory.")

with open(COURSES_FILE, 'r', encoding='utf-8') as f:
    COURSE_DATA = json.load(f)

# Ensure it's a list
if isinstance(COURSE_DATA, dict) and "courses" in COURSE_DATA:
    COURSE_DATA = COURSE_DATA["courses"]

print(f"Loaded {len(COURSE_DATA)} courses from {COURSES_FILE}")

@app.route('/api/search', methods=['GET'])
def search_courses():
    q = request.args.get('q', '').strip().lower()
    if not q:
        return jsonify({"success": False, "error": "Query parameter 'q' is required"}), 400

    results = [
        course for course in COURSE_DATA
        if (q in course.get("title", "").lower() or
            q in course.get("provider", "").lower() or
            q in course.get("platform", "").lower())
    ]

    return jsonify({
        "success": True,
        "count": len(results),
        "courses": results
    })

@app.route('/api/course/<int:course_id>', methods=['GET'])
def get_course_details(course_id):
    course = next((c for c in COURSE_DATA if c.get("id") == course_id), None)
    if not course:
        return jsonify({"success": False, "error": "Course not found"}), 404
    return jsonify({"success": True, "course": course})

@app.route('/api/syllabus/<int:course_id>', methods=['GET'])
def get_syllabus(course_id):
    course = next((c for c in COURSE_DATA if c.get("id") == course_id), None)
    if not course:
        return jsonify({"success": False, "error": "Course not found"}), 404

    syllabus = get_dummy_syllabus(course["title"])
    return jsonify({
        "success": True,
        "course_id": course_id,
        "title": course["title"],
        "syllabus": syllabus
    })

@app.route('/api/view/<int:course_id>', methods=['GET'])
def view_course(course_id):
    course = next((c for c in COURSE_DATA if c.get("id") == course_id), None)
    if not course:
        return jsonify({"success": False, "error": "Course not found"}), 404
    return redirect(course["url"], code=302)

@app.route('/api/popular', methods=['GET'])
def get_popular_courses():
    # Return top 5–10 courses by popularity (or random sample)
    popular = COURSE_DATA[:10]  # First 10 courses as example
    return jsonify({"success": True, "courses": popular})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "OK",
        "courses_loaded": len(COURSE_DATA)
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)