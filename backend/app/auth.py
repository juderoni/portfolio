from flask import Blueprint, request, jsonify, session
import bcrypt

auth_bp = Blueprint("auth", __name__)

# Hardcoded username & hashed password for security
USERNAME = "juderoni"
PASSWORD_HASH = bcrypt.hashpw(b"fishsticks", bcrypt.gensalt()).decode("utf-8")


@auth_bp.route("/api/login", methods=["POST"])
def login():
    """Authenticate user login"""
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Validate username
    if username != USERNAME:
        return jsonify({"message": "Invalid username"}), 401

    # Validate password securely
    if not bcrypt.checkpw(password.encode("utf-8"), PASSWORD_HASH.encode("utf-8")):
        return jsonify({"message": "Invalid password"}), 401

    # Store session
    session["user"] = username
    return jsonify({"message": "Login successful"}), 200


@auth_bp.route("/api/logout", methods=["POST"])
def logout():
    """Logout user by clearing session"""
    session.pop("user", None)
    return jsonify({"message": "Logged out successfully"}), 200


@auth_bp.route("/api/status", methods=["GET"])
def check_status():
    """Check if the user is logged in"""
    if "user" in session:
        return jsonify({"logged_in": True, "user": session["user"]}), 200
    return jsonify({"logged_in": False}), 401
