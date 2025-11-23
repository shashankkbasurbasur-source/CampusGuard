import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export default function UploadLog() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/api/log-analysis/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-2xl font-bold mb-4">Upload Log File</h1>

      <div className="bg-gray-900 p-5 rounded-lg w-full max-w-xl">
        <input
          type="file"
          className="mb-4"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="bg-blue-600 px-4 py-2 rounded-lg"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>

      {result && (
        <div className="bg-gray-800 p-4 mt-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Analysis Result</h2>
          <p>Total Lines: {result.total_lines}</p>
          <p>Failed Attempts: {result.failed_attempts}</p>
          <p>Warnings: {result.warnings}</p>
          <p>Errors: {result.errors}</p>

          <h3 className="mt-3 font-semibold">Top IPs:</h3>
          <ul>
            {result.top_ips.map(([ip, count]) => (
              <li key={ip}>{ip} — {count}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

