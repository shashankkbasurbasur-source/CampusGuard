from flask import Blueprint, request, jsonify
from database.db import classrooms, students
import random, string
from bson import ObjectId

teacher_bp = Blueprint("teacher", __name__, url_prefix="/api/teacher")


def generate_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))


# ---------------------------
# GET all classrooms
# ---------------------------
@teacher_bp.get("/classrooms")
def get_classrooms():
    data = list(classrooms.find())
    for x in data:
        x["_id"] = str(x["_id"])
    return jsonify(data)


# ---------------------------
# CREATE classroom
# ---------------------------
@teacher_bp.post("/classrooms")
def create_classroom():
    payload = request.json
    name = payload.get("name")

    new = {
        "name": name,
        "code": generate_code(),
        "students": [],
    }

    inserted = classrooms.insert_one(new)
    new["_id"] = str(inserted.inserted_id)

    return jsonify(new)


# ---------------------------
# GET classroom by ID
# ---------------------------
@teacher_bp.get("/classrooms/<id>")
def get_classroom(id):
    cls = classrooms.find_one({"_id": ObjectId(id)})
    if not cls:
        return jsonify({"error": "Not found"}), 404
    cls["_id"] = str(cls["_id"])
    return jsonify(cls)
