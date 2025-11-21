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
      {/* same UI */}
    </div>
  );
}


