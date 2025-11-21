# backend/blueprints/port_scan.py
import uuid, datetime
from flask import Blueprint, jsonify, request
from state import TARGETS, SCAN_LOGS

port_scan_bp = Blueprint("port_scan", __name__)

@port_scan_bp.route("/", methods=["POST"])
def run_scan():
    """
    POST /api/scan
    body: {"user_id":"student_01","target_id":"sandbox-beginner-01","scan_options":"-sV"}
    """
    data = request.json or {}
    user_id = data.get("user_id", "unknown")
    target_id = data.get("target_id")
    if target_id not in TARGETS:
        return jsonify({"error": "invalid target_id"}), 400

    target = TARGETS[target_id]
    open_ports = target.get("services", [])

    # build fake raw output lines (similar to your prototype)
    raw_lines = []
    for s in open_ports:
        raw_lines.append(f"{s['port']}/tcp open {s['service']} {s.get('banner','')}".strip())

    result = {
        "scan_job_id": str(uuid.uuid4()),
        "user_id": user_id,
        "target_id": target_id,
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "open_ports": open_ports,
        "raw_output": "\n".join(raw_lines),
        "scan_options": data.get("scan_options", "-sS")
    }

    SCAN_LOGS[result["scan_job_id"]] = result
    return jsonify(result), 201

@port_scan_bp.route("/<job_id>", methods=["GET"])
def get_scan(job_id):
    job = SCAN_LOGS.get(job_id)
    if not job:
        return jsonify({"error":"not found"}), 404
    return jsonify(job)
