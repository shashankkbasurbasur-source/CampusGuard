/*import React, {useEffect,useState}from "react";

export default function ScanRunner({userId="student_01"})
{
    const [targets,setTargets]=useState([])
    const [selected,setSelected]=useState([null]);
    const [scanResult,setScanResult]=useState(null);
    const [feedback,setFeedback]=useState(null);

    useEffect(()=>{
        fetch("/api/targets").then(r=>r.json()).then(setTargets);
    },[]);

    async function runScan(){
        if (!selected) return;
        const res=await fetch("/api/scan",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({user_id:userId,target_id:selected,target_id,scan_options:"-sV"})
        });
        const j=await res.json();
        setScanResult(j);
        setFeedback(null);

        //Immediately request AI feedback
        const fbRes=await fetch("/api/ai-feedback",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({scan_job_id: j.scan_job_id})

        });
        const fbJson=await fbRes.json();
        setFeedback(fbJson);
    }

    return(
        <div style={{padding:16}}>
            <h2>CampusGuard-Port Scan Lab (Prototype) </h2>

            <div>
                <label>Choose target:</label>
                <select onChange={(e)=>setSelected(JSON.parse(e.target.value))}>
                    <option value="">--select--</option>
                    {targets.map(t=>(
                        <option key={t.target_id} value={JSON.stringify(t)}>
                            {t.name}-{t.description}
                            </option>
                    ))}
                </select>
                <button onClick={runScan} disabled={!selected} style={{marginLeft:8}}>
                    Run scan
                </button>
            </div>

            {scanResult && (
                <div style={{marginTop:20}}>
                    <h3>Scan Result</h3>
                    <table border="1" cellPadding="6">
                        <thread>
                            <tr><th>Port</th>
                            <th>Service</th>
                            <th>Banner</th>
                            </tr>
                        </thread>

                        <tbody>
                            {
                                scanResult.open_ports.map(p=>(
                                    <tr key={p.port}>
                                        <td>{p.port}</td>
                                        <td>{p.service}</td>
                                        <td>{p.banner || "-"}</td>
                                    </tr>

                                ))
                            }
                            </tbody>
                            </table>

                            <h4>Raw Output</h4>
                            <pre style={{background:"#f7f7f7",padding:8}}>
                                {scanResult.raw_output}
                            </pre>
                        </div>
            )}
            {feedback && (
                <div style={{marginTop:20}}>
                    <h3>AI Feedback-Score: {feedback.score}/100</h3>
                    <p><strong>Summary:</strong> {feedback.summary}</p>
                    <p><strong>Strenghs:</strong></p>
                    <ul>{feedback.strengths.map((s,i)=> <li key={i}>{s}</li>)}</ul>
                    <p><strong>Improvements:</strong></p>
                    <ul>{feedback.improvements.map((s,i)=><li>{s}</li>)}</ul>
                    <p><strong>Teacher note:</strong> {feedback.teacher_note}</p>

                    </div>
            )}
        </div>
    );
}
*/
import React, { useState, useEffect } from "react";

export default function ScanRunner({ userId = "student_01" }) {
  const [targets, setTargets] = useState([]);
  const [selected, setSelected] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // Load targets on mount
  useEffect(() => {
    fetch("/api/targets")
      .then((res) => res.json())
      .then(setTargets)
      .catch((err) => console.error("Error loading targets:", err));
  }, []);

  async function runScan() {
    if (!selected) {
      alert("Please select a target first.");
      return;
    }
    setLoading(true);
    setScanResult(null);
    setFeedback(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          target_id: selected.target_id,
          scan_options: "-sV",
        }),
      });
      const data = await res.json();
      setScanResult(data);

      // Simulate AI processing delay
      setAiLoading(true);
      const fbRes = await fetch("/api/ai-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scan_job_id: data.scan_job_id }),
      });
      const fbJson = await fbRes.json();
      setFeedback(fbJson);
    } catch (err) {
      console.error("Scan error:", err);
      alert("Error running scan. Check backend connection.");
    } finally {
      setLoading(false);
      setAiLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#041426] to-[#0a1220] p-6 rounded-2xl border border-gray-800 text-gray-200 shadow-lg">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">
         CampusGuard – Port Scan Lab (Prototype)
      </h2>

      {/* Target Selector */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
        <label className="text-gray-300 font-medium">Choose Target:</label>
        <select
          value={selected ? JSON.stringify(selected) : ""}
          onChange={(e) =>
            setSelected(e.target.value ? JSON.parse(e.target.value) : "")
          }
          className="flex-1 p-2 rounded bg-black border border-gray-700 focus:outline-none focus:border-cyan-500"
        >
          <option value="">-- select target --</option>
          {targets.map((t) => (
            <option key={t.target_id} value={JSON.stringify(t)}>
              {t.name}
            </option>
          ))}
        </select>

        <button
          onClick={runScan}
          disabled={loading}
          className="bg-gradient-to-r from-cyan-500 to-violet-500 text-black font-semibold py-2 px-6 rounded-lg shadow hover:scale-105 transition-all"
        >
          {loading ? "Running..." : "Run Scan"}
        </button>
      </div>

      {/* Scan Results */}
      {scanResult && (
        <div className="bg-[#0b1628] p-4 rounded-xl border border-gray-700 mb-5">
          <h3 className="text-xl text-cyan-300 font-semibold mb-3">
            🔍 Scan Results
          </h3>
          <table className="w-full text-left text-gray-200 border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2 border border-gray-700">Port</th>
                <th className="p-2 border border-gray-700">Service</th>
                <th className="p-2 border border-gray-700">Banner</th>
              </tr>
            </thead>
            <tbody>
              {scanResult.open_ports.map((p) => (
                <tr key={p.port}>
                  <td className="p-2 border border-gray-700">{p.port}</td>
                  <td className="p-2 border border-gray-700">{p.service}</td>
                  <td className="p-2 border border-gray-700">
                    {p.banner || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <pre className="mt-3 text-gray-400 bg-black p-3 rounded overflow-x-auto text-sm">
            {scanResult.raw_output}
          </pre>
        </div>
      )}

      {/* AI Feedback */}
      {aiLoading && (
        <div className="text-gray-400 italic animate-pulse">
          🤖 AI is analyzing your scan results...
        </div>
      )}

      {feedback && (
        <div className="bg-[#0b1628] p-4 rounded-xl border border-gray-700 mt-4">
          <h3 className="text-xl font-semibold text-violet-400 mb-2">
            💡 AI Feedback
          </h3>
          <p className="mb-2 text-gray-300">
            <strong>Summary:</strong> {feedback.summary}
          </p>
          <ul className="list-disc list-inside text-gray-400">
            {feedback.strengths &&
              feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <p className="mt-3 text-sm text-cyan-400">
            Teacher Note: {feedback.teacher_note}
          </p>
          <p className="mt-2 font-semibold text-gray-300">
            Score: {feedback.score}/100
          </p>
        </div>
      )}
    </div>
  );
}
