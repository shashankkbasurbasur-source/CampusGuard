import React, { useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://campusguard-syfu.onrender.com";

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

    try {
      const res = await fetch(`${API_BASE}/api/log-analysis/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Upload Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* your existing UI */}
    </div>
  );
}

