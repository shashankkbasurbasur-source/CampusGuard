import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ChallengesViewer() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  // Load challenge details
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/log-analysis/get_challenge/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChallenge(data);
      });
  }, [id]);

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/log-analysis/validate", {
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
      <h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
      <p className="text-gray-400 mb-6">{challenge.description}</p>

      {/* Log Preview Block */}
      <div className="bg-gray-900 p-4 rounded-lg mb-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Log Snippet</h2>
        <pre className="whitespace-pre-wrap text-gray-300 text-sm">
          {challenge.log}
        </pre>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {Object.entries(challenge.questions).map(([key, text]) => (
          <div key={key}>
            <label className="block mb-1 text-gray-300">{text}</label>
            <input
              className="w-full bg-gray-800 p-2 rounded border border-gray-700 text-white"
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        className="mt-6 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
        onClick={handleSubmit}
      >
        Submit Answers
      </button>

      {/* Results */}
      {result && (
        <div className="bg-gray-800 p-4 mt-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-2">Results</h2>
          <p className="text-gray-300">
            Score: {result.score}/{result.total}
          </p>
          <p className="text-gray-300 mb-4">
            Passed: {result.passed ? "Yes" : "No"}
          </p>

        <h3 className="font-semibold mt-4 mb-2">Correct Answers:</h3>
        <ul className="list-disc ml-5 text-gray-300">
        {Object.entries(challenge.answers).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
        ))}
    </ul>

    {/* Feedback Section */}
    {result.feedback && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Explanation</h3>
        <ul className="list-disc ml-5">
          {Object.entries(result.feedback).map(([key, text]) => (
            <li key={key} className="text-gray-300 mb-1">
              <strong>{key}:</strong> {text}
            </li>
          ))}
        </ul>
      </div>
    )}
    
  </div>
  )}
  </div>
  );
}
