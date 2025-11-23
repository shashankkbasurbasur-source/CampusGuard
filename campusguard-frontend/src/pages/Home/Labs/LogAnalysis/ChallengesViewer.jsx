import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export default function ChallengesViewer() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  // Load challenge
  useEffect(() => {
    fetch(`${API_BASE}/api/log-analysis/get_challenge/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Invalid challenge", data);
        } else {
          setChallenge(data);
        }
      })
      .catch((err) => console.error("Error fetching challenge:", err));
  }, [id]);

  // Submit
  const handleSubmit = async () => {
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
      <h1 className="text-3xl font-bold">{challenge.title}</h1>
      <p className="text-gray-400 mt-2">{challenge.description}</p>

      {/* Log preview */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Log Snippet</h2>
        <pre className="text-sm whitespace-pre-wrap">{challenge.log}</pre>
      </div>

      {/* Questions */}
      <div className="mt-6 space-y-4">
        {Object.entries(challenge.questions).map(([key, question]) => (
          <div key={key}>
            <label className="block mb-2 font-semibold">{question}</label>
            <input
              className="w-full p-2 rounded bg-gray-900 border border-gray-700"
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          </div>
        ))}
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Answers
      </button>

      {/* Result section */}
      {result && (
        <div className="mt-6 p-4 bg-gray-900 rounded border border-gray-700">
          <h2 className="text-xl font-bold mb-2">Results</h2>

          <p>Score: {result.score} / {result.total}</p>
          <p>Passed: {result.passed ? "Yes" : "No"}</p>

          {/* Correct Answers */}
          <h3 className="mt-4 font-semibold">Correct Answers</h3>
          <ul className="list-disc ml-6 text-gray-300">
            {Object.entries(challenge.answers).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>

          {/* Feedback */}
          {result.feedback && (
            <>
              <h3 className="mt-4 font-semibold">Explanation</h3>
              <ul className="list-disc ml-6 text-gray-300">
                {Object.entries(result.feedback).map(([key, text]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {text}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
