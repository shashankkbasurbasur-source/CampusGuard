# backend/blueprints/ai_feedback.py
import json
from flask import Blueprint, request, jsonify, current_app
from state import SCAN_LOGS, get_openai_client

ai_feedback_bp = Blueprint("ai_feedback", __name__)

def simple_feedback(scan_result):
    ports = [p["port"] for p in scan_result.get("open_ports", [])]
    comments = []
    score = 0

    # discovery score
    if len(ports) >= 2:
        score += 40
        comments.append("Found multiple open services.")
    elif len(ports) == 1:
        score += 25
        comments.append("Found one open service.")
    else:
        comments.append("No open ports found.")

    # version info bonus
    if any(p.get("banner") for p in scan_result.get("open_ports", [])):
        score += 30
        comments.append("Service banners detected (good).")
    else:
        score += 10
        comments.append("No banners detected; try -sV.")

    # reporting
    if scan_result.get("raw_output"):
        score += 20

    if score > 100:
        score = 100

    return {
        "summary": f"Detected {len(ports)} open ports: {','.join(map(str, ports))}.",
        "strengths": comments[:3],
        "improvements": ["Try -sV for version detection", "check HTTP endpoints if HTTP present"],
        "next_steps": ["Run -sV", "Run targeted check for discovered services"],
        "score": score,
        "rubric": {"discovery": min(50, len(ports) * 20), "analysis": 30, "reporting": 20},
        "teacher_note": "Automated feedback: ask student to run -sV and resubmit."
    }

@ai_feedback_bp.route("/", methods=["POST"])
def ai_feedback():
    """
    POST /api/ai-feedback
    body: {"scan_job_id":"<id>"} or {"scan_result": {...}}
    """
    data = request.json or {}

    # obtain scan_result
    if "scan_job_id" in data:
        job = SCAN_LOGS.get(data["scan_job_id"])
        if not job:
            return jsonify({"error":"scan job not found"}), 404
        scan_result = job
    elif "scan_result" in data:
        scan_result = data["scan_result"]
    else:
        return jsonify({"error":"provide scan_job_id or scan_result"}), 400

    # system prompt
    system_prompt = """
    you are an educational cybersecurity assistent.The user is a student who submitted a port scan results (structured JSON).
    Produce:
    1) 1-sentence summary
    2) 3 bullet strengths
    3) 3 bullet improvements (actionable)
    4) 1 recommended next command (shell)
    5) numeric score 0-100 with brief rubric breakdowm
    6) single-line teacher note
    Output JSON only.
    """

    messages = [
        {"role":"system", "content": system_prompt},
        {"role":"user", "content": json.dumps(scan_result)}
    ]

    # call OpenAI (use client from state; if missing, fallback to simple_feedback)
    try:
        client = get_openai_client()
        # using the same call pattern you had — adjust as needed for your OpenAI SDK version
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.3
        )
        ai_reply = response.choices[0].message.content.strip()

        # try to parse JSON
        try:
            feedback = json.loads(ai_reply)
        except Exception:
            feedback = {"raw_feedback": ai_reply}

        return jsonify(feedback)
    except Exception as e:
        current_app.logger.exception("AI feedback error, returning fallback.")
        # fallback simple rule-based
        return jsonify(simple_feedback(scan_result))
