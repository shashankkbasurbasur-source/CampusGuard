import React from "react";
import { useNavigate } from "react-router-dom";
import { FlaskConical, FileUp } from "lucide-react";

export default function LogAnalysis() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-center bg-gray-950 text-white">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">Log Analysis Lab</h1>
      <p className="text-gray-400 mb-10 text-center max-w-xl">
        Learn to analyze security logs through guided challenges or analyze your own log files.
      </p>

      {/* Cards container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">

        {/* Upload Log Card */}
        <div className="bg-gray-900 border border-gray-700 hover:border-gray-500 transition cursor-pointer rounded-xl p-6 flex flex-col items-center text-center">
          <FileUp className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Upload Log File</h2>
          <p className="text-gray-400 mb-4">
            Analyze your own log file with automatic detection and insights.
          </p>
          <button
            className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
            onClick={() => navigate("/labs/log-analysis/upload")}
          >
            Upload Log
          </button>
        </div>

        {/* Challenges Card */}
        <div className="bg-gray-900 border border-gray-700 hover:border-gray-500 transition cursor-pointer rounded-xl p-6 flex flex-col items-center text-center">
          <FlaskConical className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Solve Challenges</h2>
          <p className="text-gray-400 mb-4">
            Practice real-world cybersecurity scenarios designed for learning.
          </p>
          <button
            className="w-full bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
            onClick={() => navigate("/labs/log-analysis/challenges")}
          >
            Start Challenges
          </button>
        </div>

      </div>
    </div>
  );
}


