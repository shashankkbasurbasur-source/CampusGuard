from flask import Blueprint, request, jsonify
import re
from urllib.parse import urlparse
import json
import random
import os

phishing_bp = Blueprint("phishing", __name__)

# -------------------------
# Utility functions
# -------------------------
def extract_links(text):
    return re.findall(r'(https?://[^\s]+)', text)

def is_suspicious_domain(url):
    try:
        domain = urlparse(url).netloc.lower()
        if any(bank in domain for bank in ["bank", "secure", "verify", "login", "update", "account"]):
            return True
        return False
    except:
        return False

def detect_urgency(text):
    urgency_words = ["immediately", "urgent", "24 hours", "asap", "right away", "suspended"]
    return [u for u in urgency_words if u in text.lower()]

def detect_threats(text):
    threat_words = ["account closure", "suspended", "final notice", "last warning"]
    return [t for t in threat_words if t in text.lower()]

def detect_credentials_request(text):
    patterns = ["verify your identity", "confirm your password", "login to restore access", "confirm your account"]
    return [p for p in patterns if p in text.lower()]

# --------------------------------------------
# Analyze (free analysis mode)
# --------------------------------------------
@phishing_bp.route("/analyze-phishing", methods=["POST"])
def analyze_phishing():
    data = request.get_json() or {}
    # Accept either "email" OR backward-compatible "emailText"
    email = data.get("email") or data.get("emailText") or ""

    if not email.strip():
        return jsonify({"error": "Email is required"}), 400

    links = extract_links(email)
    suspicious_links = [l for l in links if is_suspicious_domain(l)]
    urgency = detect_urgency(email)
    threats = detect_threats(email)
    credential_bait = detect_credentials_request(email)

    suspicious_keywords = ["verify", "password", "bank", "click here", "reset"]
    keyword_hits = [k for k in suspicious_keywords if k in email.lower()]

    score = (
        len(keyword_hits) * 10 +
        len(suspicious_links) * 25 +
        len(urgency) * 10 +
        len(threats) * 20 +
        len(credential_bait) * 20
    )
    score = min(score, 100)

    classification = (
        "High Probability of Phishing" if score >= 70 else
        "Suspicious Email" if score >= 40 else
        "Low Risk Email"
    )

    ai_feedback_text = (
        f"This email shows characteristics consistent with phishing.\n\n"
        f"- Suspicious links detected: {', '.join(suspicious_links) if suspicious_links else 'None'}\n"
        f"- Urgency tone detected: {', '.join(urgency) if urgency else 'None'}\n"
        f"- Threat language: {', '.join(threats) if threats else 'None'}\n"
        f"- Keyword indicators: {', '.join(keyword_hits) if keyword_hits else 'None'}\n"
        f"- Credential theft pattern: {', '.join(credential_bait) if credential_bait else 'None'}\n\n"
        f"Final score: {score}/100 — {classification}."
    )

    return jsonify({
        "analysis": classification,
        "score": score,
        "suspicious_keywords": keyword_hits,
        "suspicious_links": suspicious_links,
        "urgency_detected": urgency,
        "threats_detected": threats,
        "credential_bait": credential_bait,
        "ai_feedback": ai_feedback_text,
    })


# --------------------------------------------
# Practice challenges (load from file)
# --------------------------------------------
@phishing_bp.route("/challenge", methods=["GET"])
def get_challenge():
    print("debug: phishing challenge route hit!")
    # path relative to backend working directory
    path = os.path.join(os.getcwd(), "challenges", "phishing_emails.json")
    print("debug path=", path)
    try:
        with open(path, "r", encoding="utf-8") as f:
            emails = json.load(f)
    except Exception as e:
        print("debug error:", e)
        return jsonify({"error": f"Could not load challenges: {e}"}), 500

    challenge = random.choice(emails)
    return jsonify({
        "id": challenge["id"],
        "email": challenge["email"]
    })


# --------------------------------------------
# Submit answer for a challenge
# --------------------------------------------
@phishing_bp.route("/submit", methods=["POST"])
def submit_challenge():
    data = request.get_json() or {}
    challenge_id = data.get("challenge_id")
    user_answer = data.get("user_answer")
    user_explanation = data.get("explanation", "")

    path = os.path.join(os.getcwd(), "challenges", "phishing_emails.json")
    try:
        with open(path, "r", encoding="utf-8") as f:
            emails = json.load(f)
    except Exception as e:
        return jsonify({"error": f"Could not load challenges: {e}"}), 500

    challenge = next((e for e in emails if e["id"] == challenge_id), None)
    if not challenge:
        return jsonify({"error": "Challenge not found"}), 404

    correct_label = challenge["label"]
    correct = (user_answer == correct_label)

    base_score = 70 if correct else 30
    explanation_bonus = min(len(user_explanation.split()), 20)
    score = min(base_score + explanation_bonus, 100)

    # Build a prompt for OpenAI and try to call it, but FALLBACK if something fails
    ai_feedback = None
    try:
        from openai import OpenAI
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        prompt = f"""
You are an expert cybersecurity tutor. Provide a clear, short feedback for the student.

Email:
\"\"\"{challenge['email']}\"\"\"

Correct label: {correct_label}
User answered: {user_answer}
User explanation: {user_explanation}

Explain:
- Why the email is (or isn't) phishing
- What the student found correctly
- What was missed (if anything)
- How to improve
Score: {score}/100
"""
        # Safe call: if API shape differs, this may raise — catch below
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
        )
        # Support possible response shapes
        ai_feedback = (
            resp.choices[0].message["content"]
            if hasattr(resp, "choices")
            else getattr(resp, "content", str(resp))
        )
    except Exception as e:
        # fallback: local explanatory feedback if OpenAI fails
        missed = [ind for ind in challenge.get("indicators", [])]
        ai_feedback = (
            f"Local feedback: This exercise is labeled '{correct_label}'.\n\n"
            f"Indicators present: {', '.join(missed) if missed else 'None'}.\n"
            f"You answered: {user_answer}. That is {'correct' if correct else 'incorrect'}.\n"
            f"Score: {score}/100.\n\n"
            f"Student explanation: {user_explanation or '—'}\n"
            f"Tip: Look for suspicious links, urgency, credential requests, and odd sender addresses."
        )

    return jsonify({
        "correct": correct,
        "correct_label": correct_label,
        "score": score,
        "indicators": challenge.get("indicators", []),
        "ai_feedback": ai_feedback
    })
