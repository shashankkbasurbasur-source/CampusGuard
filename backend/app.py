from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
import json
import os

def create_app():
    app = Flask(__name__)

    # ---------------------------
    # Initialize MongoDB
    # ---------------------------
    app.config["MONGO_URI"] = "mongodb://localhost:27017/campusguard"

    # Enable CORS
    CORS(app)

    # ----------------------------------------------------
    # Load Log Analysis Challenges (FIXED PATH)
    # ----------------------------------------------------
    CHALLENGE_PATH = os.path.join(
        os.path.dirname(__file__),
        "labs",
        "log_analysis",
        "log_analysis.json"
    )

    try:
        with open(CHALLENGE_PATH, "r") as f:
            log_analysis_data = json.load(f)
    except Exception as e:
        print("ERROR loading log_analysis.json:", e)
        log_analysis_data = {}

    app.challenges_data = {
        "log_analysis": log_analysis_data
    }

    # ----------------------------------------------------
    # Register Blueprints
    # ----------------------------------------------------
    from blueprints import register_blueprints
    register_blueprints(app)

    # ----------------------------------------------------
    # Serve React Frontend
    # ----------------------------------------------------
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react(path):
        static_dir = os.path.join(app.root_path, 'static')

        full_path = os.path.join(static_dir, path)
        if path != "" and os.path.exists(full_path):
            return send_from_directory(static_dir, path)

        return send_from_directory(static_dir, 'index.html')

    # Print all registered routes
    with app.app_context():
        print("Registered routes:", [str(r) for r in app.url_map.iter_rules()])

    return app
