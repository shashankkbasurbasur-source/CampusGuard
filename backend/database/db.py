from pymongo import MongoClient
import os

# MongoDB Connection URL
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")

# Connect to MongoDB
client = MongoClient(MONGO_URL)

# Database name
db = client["campusguard"]

# Collections
classrooms = db["classrooms"]
assignments = db["assignments"]
submissions = db["submissions"]
students = db["students"]
