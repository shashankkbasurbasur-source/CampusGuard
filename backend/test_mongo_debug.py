from pymongo import MongoClient

try:
    client = MongoClient("mongodb://localhost:27017", serverSelectionTimeoutMS=3000)
    db = client["campusguard"]

    print("Connected to LOCAL MongoDB successfully!")
    print("Databases:", client.list_database_names())
    print("Collections in 'campusguard':", db.list_collection_names())

except Exception as e:
    print("Failed to connect:", e)

