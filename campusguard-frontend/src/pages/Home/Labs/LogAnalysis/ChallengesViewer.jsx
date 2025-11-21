import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://campusguard-syfu.onrender.com";

export default function ChallengesViewer() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/log-analysis/get_challenge/${id}`)
      .then((res) => res.json())
      .then((data) => setChallenge(data))
      .catch((err) => console.error("Challenge Load Error:", err));
  }, [id]);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/log-analysis/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challenge_id: id,
          ...answers,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  if (!challenge) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <p>Loading challenge...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Your same UI here */}
    </div>
  );
}
