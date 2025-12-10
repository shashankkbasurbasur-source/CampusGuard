from .targets import targets_bp
from .port_scan import port_scan_bp
from .ai_feedback import ai_feedback_bp
from .phishing import phishing_bp

# NEW dashboard blueprints
from .teacher import teacher_bp
from .assignments import assign_bp
from .submissions import sub_bp

# Lab blueprints
from labs.log_analysis.routes import log_analysis_bp
from labs.password_strength.password_strength import password_bp


def register_blueprints(app):

    # ----------- LABS -----------
    app.register_blueprint(targets_bp, url_prefix="/api/targets")
    app.register_blueprint(port_scan_bp, url_prefix="/api/scan")
    app.register_blueprint(ai_feedback_bp, url_prefix="/api/ai-feedback")
    app.register_blueprint(phishing_bp, url_prefix="/api/phishing")

    # Log analysis
    app.register_blueprint(log_analysis_bp, url_prefix="/api/log-analysis")

    # Password checker
    app.register_blueprint(password_bp, url_prefix="/api/password")

    # ----------- TE
