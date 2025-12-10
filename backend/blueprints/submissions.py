from flask import Blueprint, request, jsonify
from database.db import submissions
from bson import ObjectId
import datetime

sub_bp = Blueprint("submissions", __name__, url_prefix="/api/teacher/submissions")


# ---------------------------
# GET submissions
# ---------------------------
@sub_bp.get("/")
def get_submissions():
    assignment_id = request.args.get("assignmentId")

    query = {}
    if assignment_id:
        query["assignmentId"] = assignment_id

    data = list(submissions.find(query))

    for s in data:
        s["_id"] = str(s["_id"])

    return jsonify(data)


# ---------------------------
# GET single submission
# ---------------------------
@sub_bp.get("/<id>")
def get_submission(id):
    s = submissions.find_one({"_id": ObjectId(id)})
    if not s:
        return jsonify({"error": "Not found"}), 404

    s["_id"] = str(s["_id"])
    return jsonify(s)


# ---------------------------
# Grade submission
# ---------------------------
@sub_bp.post("/<id>/grade")
def grade_submission(id):
    payload = request.json

    submissions.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "score": payload.get("points"),
                "feedback": payload.get("feedback"),
            }
        }
    )

    return jsonify({"message": "Graded"})


# ---------------------------
# Autograde mock
# ---------------------------
@sub_bp.post("/<id>/run")
def autograde_run(id):
    submissions.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "score": 100,
                "feedback": "Auto-graded successfully"
            }
        }
    )

    return jsonify({"message": "Auto-graded"})
