from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
import json
import os

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)

    # ----------------------------------------------------
    # Load Log Analysis Challenges (FIXED PATH)
    # ----------------------------------------------------
    with open("challenges/log_analysis.json", "r") as f:
        log_analysis_data = json.load(f)

    # Store challenges data globally
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

    # Print registered routes
    with app.app_context():
        print("Registered routes:", [str(r) for r in app.url_map.iter_rules()])

    return app


