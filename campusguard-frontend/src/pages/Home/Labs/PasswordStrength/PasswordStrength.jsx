import React, { useState } from "react";
import "./style.css";
import { analyzePassword } from "./passwordAPI";

const PasswordStrength = () => {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

const handleAnalyze = async () => {
  console.log("Analyze button clicked");
  console.log("Password entered:", password);

  const res = await analyzePassword(password);
  console.log("API Response:", res);

  if (res.status === "success") setResult(res.analysis);
};


  return (
    <div className="container">
      <h2>Password Strength Checker</h2>

      <input
        type="password"
        placeholder="Enter password..."
        className="inputBox"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="button" onClick={handleAnalyze}>
        Analyze
      </button>

      {result && (
        <div className="result">
          <h3>Score: {result.score} / 100</h3>
          <p>Strength: {result.strength}</p>

          <div className="bar">
            <div
              className="bar-fill"
              style={{
                width: `${result.score}%`,
                background: result.color,
              }}
            ></div>
          </div>

         <h4>Issues:</h4>
          <ul>
            {result.issues.length > 0 ? (
              result.issues.map((i, idx) => <li key={idx}>{i}</li>)
            ) : (
              <li>No issues found. Your password looks strong.</li>
            )}
          </ul>

          <h4>Improvements:</h4>
          <ul>
            {result.improvements.length > 0 ? (
              result.improvements.map((i, idx) => <li key={idx}>{i}</li>)
            ) : (
              <li>No improvements needed.</li>
            )}
          </ul>

        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
