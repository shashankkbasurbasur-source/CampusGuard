import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

class Config:
    DEBUG = True

    # Secret key for sessions & CSRF
    SECRET_KEY = os.getenv("FLASK_SECRET", "dev-secret")

    # Database (you can change to Mongo, SQLite, PostgreSQL, etc.)
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/campusguard")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # OpenAI key
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
