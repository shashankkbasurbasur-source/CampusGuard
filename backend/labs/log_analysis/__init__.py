from flask import Blueprint

log_analysis_bp = Blueprint("log_analysis", __name__)

from . import routes
