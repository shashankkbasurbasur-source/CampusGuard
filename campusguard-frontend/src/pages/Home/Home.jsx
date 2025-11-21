import React, { useState } from "react";
import {Link} from "react-router-dom";

export default function Home() {
  const labs = [
    { id: 1, title: "Port Scan", route: "/labs/port-scan" },
    { id: 2, title: "Log Analysis", route: "/labs/log-analysis" },
    { id: 3, title: "Password Strength", route: "/labs/password-strength" },
    { id: 4, title: "Phishing Mail", route: "/labs/phishing-analysis" },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center py-10">
      <h1 className="text-5xl font-bold mb-6">
        <span className="text-cyan-400">Campus</span>
        <span className="text-violet-400">Guard</span>
      </h1>

      <p className="text-gray-400 mb-10 text-center max-w-md">
        A beginner-friendly cyber-lab where students can practice port scanning,
        log analysis, password testing, and phishing detection.
      </p>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 w-11/12 max-w-5xl">
        {labs.map((lab) => (
          
          <Link
          key={lab.id}
          to={lab.route}
          className="bg-gradient-to-br from-[#041426] to-[#081224] 
             rounded-2xl border-gray-800 p-5 text-center 
             hover:scale-105 transition-transform"
             >
            <h2 className="text-lg font-semibold text-cyan-300 mb-2">
              {lab.title}
            </h2>
            <p className="text-gray-400 text-sm">
              Click to open
            </p>
          </Link>
          
        ))}
      </div>

      <footer className="mt-10 text-gray-500 text-xs">
        © {new Date().getFullYear()} CampusGuard - Cyber Security Learning Labs
      </footer>
    </div>
  );
}
