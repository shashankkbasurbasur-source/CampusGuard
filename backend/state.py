import os,json
from openai import OpenAI
from flask import current_app

#load static files at import-time (assumes working dir is backend/)
BASE_DIR=os.path.dirname(__file__)
TARGETS_PATH=os.path.join(BASE_DIR,"targets.json")
DATA_PATH=os.path.join(BASE_DIR,"data.json")

#load targets.json into dict keyed by target_id
try:
    with open(TARGETS_PATH,"r",encoding="utf-8")as f:
        TARGETS={t["target_id"]:t for t in json.load(f)}
except Exception:
    DATA={}

#in-memory scan storage (demo) 
SCAN_LOGS={}

#OpenAI client wrapper (initialized lazily)
_client=None

def get_openai_client(api_key=None):
    global _client
    if _client is None:
        key=api_key or os.getenv("OPENAI_API_KEY")
        _client=OpenAI(api_key=key)
    return _client


