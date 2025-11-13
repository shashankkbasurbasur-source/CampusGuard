print("app.py loaded successfully")
from flask import Flask, jsonify, request
import json,uuid,datetime,os
from openai import OpenAI
from dotenv import load_dotenv


app=Flask(__name__)

load_dotenv() #LOAD environment variables from .env file
client=OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
print("Loaded key:",os.getenv("OPENAI_API_KEY")[:10], "...")

#load staic targets
with open('targets.json')as f:
    TARGETS={t['target_id']:t for t in json.load(f)}

#in-memory store for demo scans
SCAN_LOGS={}


#target list route
@app.route("/api/targets",methods=["GET"])
def list_targets():
    return jsonify(list(TARGETS.values()))

#run scan(fake)
@app.route("/api/scan",methods=["POST"])

def run_scan():
    """
    expected body:{"user_id":"student_01","target_id":"sandbox-beginner-01","scan_options":"-sV"}
    """

    data=request.json or {}
    user_id=data.get('user_id','unknown')
    target_id=data.get('target_id')
    if target_id not in TARGETS:
        return jsonify({"error":"invalid target_id"}),400
    
    target=TARGETS[target_id]

    #build fake structure scan results
    open_ports=target['services']
    raw_lines=[]
    for s in open_ports:
        raw_lines.append(f"{s['port']}/tcp open {s['service']} {s.get('banner','')}".strip())

    result={
        "scan_job_id":str(uuid.uuid4()),
        "user_id":user_id,
        "target_id":target_id,
        "timestamp":datetime.datetime.utcnow().isoformat()+"Z",
        "open_ports":open_ports,
        "raw_output":"\n".join(raw_lines),
        "scan_options":data.get('scan_options','-sS')
    }

    #save to in-memory logs(demo)
    SCAN_LOGS[result['scan_job_id']]=result
    return jsonify(result)
    
#get scan job by Id    
@app.route('/api/scan/<job_id>',methods=['GET'])
def get_scan(job_id):
    job=SCAN_LOGS.get(job_id)
    if not job:
        return jsonify({"error":"not found"}),404
    return jsonify(job)

#simple rule-based fallback
def simple_feedback(scan_result):
    ports=[p['port']for p in scan_result['open_ports']]
    services=[p['service']for p in scan_result['open_ports']]
    comments=[]
    score=0

    #discovery score
    if len(ports)>=2:
        score+=40
        comments.append("Found multiple open services.")
    elif len(ports)==1:
        score+=25
        comments.appned("Found one open service.")
    else:
        comments.append("No open ports found.")

    #version info bonus
    if any(p.get('banner')for p in scan_result['open_ports']):
        score+=30
        comments.append("Service banners detected (good).")
    else:
        score+=10
        comments.append("No banners detected; try -sV.")

    #reporting
    if scan_result.get('raw_output'):
        score+=20

    #clamp
    if score>100:
        score=100

    return {
        "summary":f"Detected {len(ports)} open ports:{','.join(map(str,ports))}.",
        "strengths":comments[:3],
        "improvements":["Try -sV for version detection","check HTTP endpoints if HTTP present"],
        "next_steps":["Run -sV","Run targeted check for discovered services"],
        "score":score,
        "rubric":{"discovery": min(50,len(ports)*20),"analysis":30,"reporting":20},
        "teacher_note":"Automated feedback: ask student to run -sV and resubmit."
    }

#AI feedback route    
@app.route('/api/ai-feedback',methods=['POST'])
def ai_feedback():
    """
    Expected body:{"scan_job_id":"<id>"} or {"scan_result": {...}}
    """
    data=request.json or {}

    #get scan result data
    if 'scan_job_id' in data:
        job=SCAN_LOGS.get(data['scan_job_id'])
        if not job:
            return jsonify({"error":"scan job not found"}),404
        scan_result=job
    elif 'scan_result' in data:
        scan_result=data['scan_result']
    else:
        return jsonify({"error":"provide scan_job_id or scan_result"}),400
    
    #define your system prompt
    system_prompt="""
    you are an educational cybersecurity assistent.The user is a student who submitted a port scan results (structured JSON).
    Produce:
    1) 1-sentence summary
    2) 3 bullet strengths
    3) 3 bullet improvements (actionable)
    4) 1 recommended next command (shell)
    5) numeric score 0-100 with brief rubric breakdowm
    6) single-line teacher note
    Output JSON only.
    """

    #combine  prompt and input
    messages=[
        {"role":"system","content":system_prompt},
        {"role":"user","content":json.dumps(scan_result)}
    ]

    #send to openai model
    try:
            response=client.chat.completions.create(
                model="gpt-4o-mini", #can change model if needed
                messages=messages,
                temperature=0.3
            )

            ai_reply=response.choices[0].message.content.strip()

            #try to parse response into json'
            try:
                feedback=json.loads(ai_reply)
            except:
                feedback={"raw_feedback":ai_reply}

            return jsonify(feedback)
            
    except Exception as e:
        import traceback
        traceback.print_exc()
        print("AI feedback error:",e)
        fb={
            "summary":"Detected multiple open ports and services.",
            "strengths":["Good enumeration of services.","Proper -sV syntax.","Readable report."],
            "improvements":["Add version detection.","Check HTTP endpoints.","Include screenshots in report."],
            "next_steps":["Run -A for aggressive scan"],
            "score":82,
            "teacher_note":"Solid work! Try deeper version analysis next time."
        }
        return jsonify(fb)
            
#Teacher logs
@app.route('/api/teacher/scanlogs',methods=['GET'])
def teacher_logs():
    #Return all logs for teacher to view (demo)
    return jsonify(list(SCAN_LOGS.values()))

@app.route('/')
def home():
    return "backend is running"

print("Registered routes:", [str(r) for r in app.url_map.iter_rules()])

if __name__=='__main__':
  print("starting flask server on http://127.0.0.1:5000...")
  app.run(debug=True)



