from flask import Flask, jsonify
from flask_cors import CORS
from auth import auth_bp  # Import auth blueprint
from flask_session import Session

from google.cloud import firestore  # Import Firestore client
from google.cloud import secretmanager  # Import Secret Manager client


app = Flask(__name__)
CORS(app, supports_credentials=True)

# Retrieve the secret from Google Cloud Secret Manager
client = secretmanager.SecretManagerServiceClient()
secret_name = "projects/327442487363/secrets/portfolio_flask_key/versions/latest"
response = client.access_secret_version(request={"name": secret_name})
app.config["SECRET_KEY"] = response.payload.data.decode("UTF-8").strip()

# Configure session storage (server-side)
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Register authentication routes
app.register_blueprint(auth_bp)

# Initialize the Firestore client.

db = firestore.Client(project="jude-personal", database="portfolio-db")


@app.route("/")
def home():
    return "Flask Backend Running!"

@app.route("/api/resume", methods=["GET"])
def get_resume():
    # Retrieve resume data from Firestore.
    resume_ref = db.collection('resumes').document('jude_resume')
    resume_doc = resume_ref.get()
    if resume_doc.exists:
        resume_data = resume_doc.to_dict()
        return jsonify(resume_data), 200
    else:
        return jsonify({"error": "Resume not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
