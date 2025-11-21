import os 
from dotenv import load_dotenv

load_dotenv()

class Config:
    DEBUG=True
    SECRET_KEY=os.getenv("FLASK_SECRET","dev-secret")
    SQLALCHEMY_DATABASE_URL=os.getenv("DATABASE_URL","sqlite:///campusguard.db")
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    OPENAI_API_KEY=os.getenv("OPENAI_API_KEY","")

