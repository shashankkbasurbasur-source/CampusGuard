import { Routes, Route } from "react-router-dom";

// Home + Labs
import Home from "../pages/home/Home.jsx";
import PortScan from "../pages/Home/Labs/PortScan/PortScan.jsx";
import LogAnalysis from "../pages/Home/Labs/LogAnalysis/LogAnalysis.jsx";
import UploadLog from "../pages/Home/Labs/LogAnalysis/UploadLog.jsx";
import ChallengesList from "../pages/Home/Labs/LogAnalysis/ChallengesList.jsx";
import ChallengesViewer from "../pages/Home/Labs/LogAnalysis/ChallengesViewer.jsx";
import PasswordStrength from "../pages/Home/Labs/PasswordStrength/PasswordStrength.jsx";
import PhishingAnalysis from "../pages/Home/Labs/PhishingAnalysis/PhishingAnalysis.jsx";
import LabDetails from "../pages/Home/Labs/Details/LabDetails.jsx";

// Teacher pages
import TeacherDashboard from "../pages/teacher/TeacherDashboard.jsx";
import Classrooms from "../pages/teacher/Classrooms.jsx";
import ClassroomDetail from "../pages/teacher/ClassroomDetails.jsx";
import Assignments from "../pages/teacher/Assignments.jsx";
import CreateAssignment from "../pages/teacher/CreateAssignment.jsx";
import AssignmentDetail from "../pages/teacher/AssignmentDetails.jsx";
import Submissions from "../pages/teacher/Submissions.jsx";
import SubmissionDetail from "../pages/teacher/SubmissionDetails.jsx";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Labs */}
      <Route path="/labs/port-scan" element={<PortScan />} />
      <Route path="/labs/log-analysis" element={<LogAnalysis />} />
      <Route path="/labs/log-analysis/upload" element={<UploadLog />} />
      <Route path="/labs/log-analysis/challenges" element={<ChallengesList />} />
      <Route path="/labs/log-analysis/challenges/:id" element={<ChallengesViewer />} />
      <Route path="/labs/password-strength" element={<PasswordStrength />} />
      <Route path="/labs/phishing-analysis" element={<PhishingAnalysis />} />
      <Route path="/labs/:id/info" element={<LabDetails />} />

      /* TEACHER DASHBOARD ROUTES */
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/teacher/classrooms" element={<Classrooms />} />
      <Route path="/teacher/classrooms/:id" element={<ClassroomDetail />} />
      <Route path="/teacher/assignments" element={<Assignments />} />
      <Route path="/teacher/assignments/create" element={<CreateAssignment />} />
      <Route path="/teacher/assignments/:id" element={<AssignmentDetail />} />
      <Route path="/teacher/submissions" element={<Submissions />} />
      <Route path="/teacher/submissions/:id" element={<SubmissionDetail />} />


    </Routes>
  );
}
