import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home.jsx";
import PortScan from "../pages/Home/Labs/PortScan/PortScan.jsx";
import LogAnalysis from "../pages/Home/Labs/LogAnalysis/LogAnalysis.jsx";
import UploadLog from "../pages/Home/Labs/LogAnalysis/UploadLog.jsx";
import ChallengesList from "../pages/Home/Labs/LogAnalysis/ChallengesList.jsx";
import ChallengesViewer from "../pages/Home/Labs/LogAnalysis/ChallengesViewer.jsx";
import PasswordStrength from "../pages/Home/Labs/PasswordStrength/PasswordStrength.jsx";
import PhishingAnalysis from "../pages/Home/Labs/PhishingAnalysis/PhishingAnalysis.jsx";
import LabDetails from "../pages/Home/Labs/Details/LabDetails.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Labs */}
      <Route path="/labs/port-scan" element={<PortScan />} />
      <Route path="/labs/log-analysis" element={<LogAnalysis />} />

      {/* Log Analysis Sub-pages */}
      <Route path="/labs/log-analysis/upload" element={<UploadLog />} />
      <Route path="/labs/log-analysis/challenges" element={<ChallengesList />} />
      <Route path="/labs/log-analysis/challenges/:id" element={<ChallengesViewer />} />

      <Route path="/labs/password-strength" element={<PasswordStrength />} />
      <Route path="/labs/phishing-analysis" element={<PhishingAnalysis />} />

      <Route path="/labs/:id/info" element={<LabDetails />} />

    </Routes>
  );
}




