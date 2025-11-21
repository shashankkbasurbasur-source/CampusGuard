from . import db

class ScanHistory(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    scan_job_id=db.Column(db.String(128),unique=True)
    user_id=db.Column(db.String(128))
    payload=db.Column(db.JSON)