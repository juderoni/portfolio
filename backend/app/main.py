from flask import Flask, jsonify
from flask_cors import CORS
from flask_session import Session
from auth import auth_bp  # Import auth blueprint

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configure session storage (server-side)
app.config["SESSION_TYPE"] = "filesystem"
app.config["SECRET_KEY"] = "supersecretkey"  # Change this for real security
Session(app)

# Register authentication routes
app.register_blueprint(auth_bp)

@app.route("/")
def home():
    return "Flask Backend Running!"

@app.route("/api/resume", methods=["GET"])
def get_resume():
    return jsonify({
        "name": "Jude Sproul",
        "email": "jnsproul@ncsu.edu",
        "linkedin": "https://www.linkedin.com/in/jude-n-sproul/",
        "education": [  # ✅ Added missing education field
            {
                "institution": "North Carolina State University",
                "degree": "Master's in Computer Science (ABM Program)",
                "graduation": "May 2025"
            },
            {
                "institution": "North Carolina State University",
                "degree": "Bachelor's in Computer Science",
                "gpa": "3.949",
                "graduation": "2021-2024"
            }
        ],
        "skills": [  # ✅ Added missing skills field
            "Java", "Python", "C", "C++", "Julia", "JavaScript",
            "HTML", "CSS", "React", "Bootstrap", "Node.js"
        ],
        "work_experience": [  # ✅ Added missing work_experience field
            {
                "title": "Data Management Intern",
                "company": "Renaissance Computing Institute",
                "date": "05/2023 – Present",
                "description": "Developed a Python package for Docker image automation and deployment security on Google Cloud."
            },
            {
                "title": "Research Intern",
                "company": "Coastal Studies Institute",
                "date": "05/2022 – 08/2022",
                "description": "Created a Julia program to analyze Gulf Stream characteristics using HF Radars."
            }
        ],
        "projects": [  # ✅ Added missing projects field
            {
                "title": "Zybook Clone",
                "date": "05/2023 – 07/2023",
                "description": "Developed a reduced functionality clone of Zybooks using Python and MySQL with a BCNF-compliant database."
            }
        ]
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
