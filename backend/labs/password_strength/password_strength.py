from flask import Blueprint, request, jsonify
import re

password_bp = Blueprint("password_strength", __name__)

COMMON_PASSWORDS = [
    "123456", "password", "qwerty", "12345678", "admin", "letmein"
]

def evaluate_password(password):
    score = 0
    issues = []
    improvements = []

    # Length
    if len(password) >= 12:
        score += 30
    elif len(password) >= 8:
        score += 15
        issues.append("Password is shorter than recommended 12 characters.")
        improvements.append("Increase password length to at least 12 characters.")
    else:
        score += 5
        issues.append("Password is too short.")
        improvements.append("Use at least 12 characters for strong security.")

    # Uppercase
    if re.search(r"[A-Z]", password):
        score += 15
    else:
        issues.append("No uppercase letters found.")
        improvements.append("Add uppercase letters.")

    # Lowercase
    if re.search(r"[a-z]", password):
        score += 15
    else:
        issues.append("No lowercase letters found.")
        improvements.append("Add lowercase letters.")

    # Numbers
    if re.search(r"\d", password):
        score += 15
    else:
        issues.append("No numbers found.")
        improvements.append("Add numbers.")

    # Special chars
    if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        score += 15
    else:
        issues.append("No special characters found.")
        improvements.append("Add special characters (!, @, #, $, etc.).")

    # Common password check
    if password.lower() in COMMON_PASSWORDS:
        issues.append("Password is a very common and easy-to-guess password.")
        improvements.append("Avoid common passwords like '123456' or 'password'.")
        score -= 20

    # Pattern check
    if re.search(r"(123|abc|qwerty)", password.lower()):
        issues.append("Contains common patterns like '123' or 'qwerty'.")
        improvements.append("Avoid predictable patterns.")
        score -= 10

    # Final strength level
    if score < 30:
        strength = "Very Weak"
        color = "red"
    elif score < 50:
        strength = "Weak"
        color = "orange"
    elif score < 70:
        strength = "Moderate"
        color = "yellow"
    elif score < 90:
        strength = "Strong"
        color = "lightgreen"
    else:
        strength = "Very Strong"
        color = "green"

    return {
        "score": max(0, min(score, 100)),
        "strength": strength,
        "color": color,
        "issues": issues,
        "improvements": improvements
    }

@password_bp.route("/analyze", methods=["POST"])
def analyze_password():
    data = request.get_json()
    password = data.get("password", "")

    result = evaluate_password(password)

    return jsonify({
        "status": "success",
        "analysis": result
    })
