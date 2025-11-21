from flask import Flask
from flask_cors import CORS
from config import Config
import json
import os
from flask import send_from_directory

def create_app():
    app=Flask(__name__,instance_relative_config=False)
    app.config.from_object(Config)

    #CORS (allow frontend during dev)
    CORS(app)

    #load challenge files before blueprint
    with open("challenges/log_analysis.json") as f:
        log_analysis_data=json.load(f)

    #store challeges files
    app.challenges_data={
        "log_analysis":log_analysis_data
    }    

    #register blueprints
    from blueprints import register_blueprints
    register_blueprints(app)

    #simple home
    @app.route("/")
    def home():
        return "CampusGuard backend (modular) is running."
    
    #show routes on startup 
    with app.app_context():
        print("Registered routes:",[str(r) for r in app.url_map.iter_rules()])    

    # Serve React Frontend
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react(path):
        static_dir = os.path.join(os.getcwd(), "static")

        # If path is a valid file, serve it
        if path != "" and os.path.exists(os.path.join(static_dir, path)):
            return send_from_directory(static_dir, path)

        # Otherwise serve index.html
        return send_from_directory(static_dir, 'index.html')
        
    return app
    