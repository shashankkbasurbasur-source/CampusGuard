import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChallengesList() {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/log-analysis/challenges")
      .then((res) => res.json())
      .then((data) => {
        console.log("CHALLENGES RECEIVED:",data);
        setChallenges(Object.entries(data)); // convert object → array
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Log Analysis Challenges</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map(([id, challenge]) => (
          <div
            key={id}
            className="bg-gray-900 p-4 rounded-lg border border-gray-700 hover:border-gray-500 cursor-pointer"
            onClick={() => navigate(`/labs/log-analysis/challenges/${id}`)}
          >
            <h2 className="text-xl font-semibold">{challenge.title}</h2>
            <p className="text-gray-400 text-sm mt-2">{challenge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
