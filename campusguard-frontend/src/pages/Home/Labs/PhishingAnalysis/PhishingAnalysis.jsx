import React, { useState, useEffect } from "react";

export default function PhishingAnalysis() {
  const [tab, setTab] = useState("practice");
  const [challenge, setChallenge] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [challengeResult, setChallengeResult] = useState(null);

  const [emailText, setEmailText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadChallenge() {
    setChallengeResult(null);
    setUserAnswer("");
    setExplanation("");

    try {
      const res = await fetch("/api/phishing/challenge");
      if (!res.ok) throw new Error("Failed to load challenge");
      const data = await res.json();
      setChallenge(data);
    } catch (err) {
      console.error(err);
      alert("Could not load challenge. Check backend.");
    }
  }

  useEffect(() => {
    if (tab === "practice") loadChallenge();
  }, [tab]);

  // FIXED —— added /phishing prefix
  async function submitChallenge() {
    if (!userAnswer) {
      alert("Please select an answer.");
      return;
    }

    try {
      const res = await fetch("/api/phishing/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challenge_id: challenge.id,
          user_answer: userAnswer,
          explanation,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setChallengeResult(data);
    } catch (err) {
      console.error(err);
      alert("Error submitting answer. Check backend.");
    }
  }

  // FIXED —— added /phishing prefix
  async function analyzeEmail() {
    if (!emailText.trim()) {
      alert("Paste an email first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/phishing/analyze-phishing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailText }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
      alert("Error analyzing email. Check backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">
        <span className="text-cyan-400">Phishing</span>{" "}
        <span className="text-violet-400">Detection Lab</span>
      </h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setTab("practice")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            tab === "practice"
              ? "bg-cyan-600 text-black shadow-lg scale-105"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          🧪 Practice Exercises
        </button>

        <button
          onClick={() => setTab("analyze")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            tab === "analyze"
              ? "bg-violet-600 text-black shadow-lg scale-105"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          🔍 Analyze Your Email
        </button>
      </div>

      {/* ---- Practice Mode ---- */}
      {tab === "practice" && (
        <div className="w-11/12 max-w-3xl bg-[#041026] p-6 rounded-2xl border border-gray-800 shadow-lg">
          <h2 className="text-2xl text-cyan-300 font-semibold mb-4">
            🧪 Practice Exercise
          </h2>

          {challenge ? (
            <>
              <p className="text-gray-300 mb-4 text-left">
                Read the email below and identify whether it is phishing or legitimate.
              </p>

              <div className="bg-black p-4 rounded-xl border border-gray-700 text-left mb-5">
                <p className="whitespace-pre-wrap text-gray-300">{challenge.email}</p>
              </div>

              <div className="flex flex-col gap-3 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="phishing"
                    checked={userAnswer === "phishing"}
                    onChange={(e) => setUserAnswer(e.target.value)}
                  />
                  Phishing Email
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="legitimate"
                    checked={userAnswer === "legitimate"}
                    onChange={(e) => setUserAnswer(e.target.value)}
                  />
                  Legitimate Email
                </label>
              </div>

              <textarea
                className="w-full bg-black border border-gray-700 p-3 rounded-xl text-gray-200 mb-4"
                placeholder="Explain your reasoning…"
                rows={4}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              />

              <button
                onClick={submitChallenge}
                className="bg-gradient-to-r from-cyan-500 to-violet-500 text-black font-semibold py-2 px-6 rounded-lg shadow hover:scale-105 transition-all"
              >
                Submit Answer
              </button>

              {challengeResult && (
                <div className="mt-6 bg-[#0b1628] p-4 rounded-xl border border-gray-700">
                  <h3 className="text-xl text-violet-400 font-semibold mb-2">
                    📘 Results
                  </h3>

                  <p className="text-gray-300">
                    <strong>Correct Answer:</strong>{" "}
                    {challengeResult.correct_label.toUpperCase()}
                  </p>

                  <p className="text-gray-300 mb-3">
                    <strong>Your Score:</strong> {challengeResult.score}/100
                  </p>

                  <div className="text-gray-200 whitespace-pre-wrap border-t border-gray-700 mt-3 pt-3">
                    {challengeResult.ai_feedback}
                  </div>

                  <button
                    onClick={loadChallenge}
                    className="mt-4 bg-gray-800 px-4 py-2 rounded-xl hover:bg-gray-700"
                  >
                    Next Exercise →
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-400">Loading challenge...</p>
          )}
        </div>
      )}

      {/* ---- Analyze Mode ---- */}
      {tab === "analyze" && (
        <div className="w-11/12 max-w-3xl bg-[#041026] p-6 rounded-2xl border border-gray-800 shadow-lg">
          <h2 className="text-2xl text-violet-300 font-semibold mb-4">
            🔍 Analyze Your Email
          </h2>

          <textarea
            className="w-full bg-black border border-gray-700 p-3 rounded-xl text-gray-200 mb-4"
            placeholder="Paste an email here…"
            rows={6}
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
          />

          <button
            onClick={analyzeEmail}
            className="bg-gradient-to-r from-violet-500 to-cyan-500 text-black font-semibold py-2 px-6 rounded-lg shadow hover:scale-105 transition-all"
          >
            {loading ? "Analyzing…" : "Analyze Email"}
          </button>

          {analysisResult && (
            <div className="mt-6 bg-[#0b1628] p-4 rounded-xl border border-gray-700">
              <h3 className="text-xl text-cyan-300 font-semibold mb-2">
                📊 Analysis Result
              </h3>

              <div className="text-gray-200 whitespace-pre-wrap">
                {analysisResult.ai_feedback}
              </div>

              <p className="mt-3 text-gray-300">
                <strong>Score:</strong> {analysisResult.score}/100
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
