from flask import Blueprint, jsonify
from state import SCAN_LOGS

teacher_bp=Blueprint("teacher",__name__)

@teacher_bp.route("/scanlogs",methods=["GET"])
def teacher_scanlogs():
    #for demo:return all scan logs
    return jsonify(list(SCAN_LOGS.values()))

