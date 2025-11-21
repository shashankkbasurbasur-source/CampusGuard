from flask import request, jsonify, current_app
from . import log_analysis_bp
from .analyzer import analyze_logs, get_challenge, validate_answers


@log_analysis_bp.route("/upload", methods=["POST"])
def upload_logs():
    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    content = file.read().decode("utf-8", errors="ignore")
    result = analyze_logs(content)
    return jsonify(result)


@log_analysis_bp.route("/challenges", methods=["GET"])
def list_challenges():
    challenges_data = current_app.challenges_data
    return jsonify(challenges_data.get("log_analysis", {}))


@log_analysis_bp.route("/get_challenge/<cid>", methods=["GET"])
def get_log_challenge(cid):
    challenges_data = current_app.challenges_data
    challenge = get_challenge(challenges_data, cid)

    if not challenge:
        return jsonify({"error": "Invalid challenge ID"}), 404

    return jsonify(challenge)


@log_analysis_bp.route("/validate", methods=["POST"])
def validate():
    data = request.json
    cid = data.get("challenge_id")

    challenges_data = current_app.challenges_data
    challenge = get_challenge(challenges_data, cid)

    if not challenge:
        return jsonify({"error": "Invalid challenge ID"}), 404

    expected = challenge["answers"]
    result = validate_answers(data, expected)

    #Add feedback from challenges JSON
    result["feedback"]=challenge.get("feedback",{})
    return jsonify(result)
