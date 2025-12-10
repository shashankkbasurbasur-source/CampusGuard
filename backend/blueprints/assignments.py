from flask import Blueprint, request, jsonify
from database.db import assignments
from bson import ObjectId

assign_bp = Blueprint("assignments", __name__, url_prefix="/api/teacher/assignments")


# ---------------------------
# GET all assignments
# ---------------------------
@assign_bp.get("/")
def get_assignments():
    classroom_id = request.args.get("classroomId")

    query = {}
    if classroom_id:
        query["classroomId"] = classroom_id

    data = list(assignments.find(query))

    for a in data:
        a["_id"] = str(a["_id"])

    return jsonify(data)


# ---------------------------
# CREATE assignment
# ---------------------------
@assign_bp.post("/")
def create_assignment():
    payload = request.json

    new = {
        "title": payload.get("title"),
        "classroomId": payload.get("classroomId"),
        "type": payload.get("type", "lab"),
        "dueAt": payload.get("dueAt"),
        "pointsTotal": payload.get("pointsTotal", 100),
        "meta": payload.get("meta", {}),
    }

    inserted = assignments.insert_one(new)
    new["_id"] = str(inserted.inserted_id)

    return jsonify(new)


# ---------------------------
# GET assignment by ID
# ---------------------------
@assign_bp.get("/<id>")
def get_assignment(id):
    a = assignments.find_one({"_id": ObjectId(id)})
    if not a:
        return jsonify({"error": "Not found"}), 404

    a["_id"] = str(a["_id"])
    return jsonify(a)
