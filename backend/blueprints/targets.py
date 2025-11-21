from flask import Blueprint,jsonify
from state import TARGETS

targets_bp=Blueprint("targets",__name__)

@targets_bp.route("/",methods=["GET"])
def list_targets():
    return jsonify(list(TARGETS.values()))
