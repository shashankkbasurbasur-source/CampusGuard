import React, { useState } from "react";
import { Link } from "react-router-dom";
import LabcardImage from "../../assets/labcard.png"

const labs = [
  {
    id: "portscan",
    title: "Port Scan Lab",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwwgOB-iB_vj8wR-RMA46pOHdDGYpu38t3vQ&s",
    desc: "Learn how port scanning works in a safe environment.",
    route: "/labs/port-scan",
  },
  {
    id: "phishing",
    title: "Phishing Analysis",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwD2wY_yhiJP4bn-YVcJI9dnf-33OxjGRirg&s",
    desc: "Analyze suspicious emails safely.",
    route: "/labs/phishing-analysis",
  },
  {
    id: "log",
    title: "Log Analysis",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcF2F9vmJTeCfqtxGOig6kBYaPTBrViH0xQ&s",
    desc: "Inspect logs for anomalies.",
    route: "/labs/log-analysis",
  },
  {
    id: "password",
    title: "Password Strength",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8VKq9i9WFPQUlY6LmKdnscL9GokAJwqMVA&s",
    desc: "Test password complexity.",
    route: "/labs/password-strength",
  },
];

export default function Home() {
  const [classroomCode, setClassroomCode] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      {/* ---------------- HEADER ---------------- */}
      <header className="shadow-sm bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold">CG</div>
            <div>
              <h1 className="text-xl font-semibold">CampusGuard</h1>
              <p className="text-xs text-slate-500">Cybersecurity learning labs</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-sm">
            <a href="#home" className="hover:text-indigo-600">Home</a>
            <a href="#labs" className="hover:text-indigo-600">Labs</a>
            <a href="#teacher-tools" className="hover:text-indigo-600">Teacher Tools</a>
            <a href="#about" className="hover:text-indigo-600">About</a>

            {/* Teacher Dashboard link */}
            <a href="/teacher" className="px-3 py-1 rounded-md bg-indigo-600 text-white">
              Teacher Dashboard
            </a>
          </nav>

          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <Hero />

        {/* ---------------- LABS SECTION ---------------- */}
        <section id="labs" className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Labs</h2>
            <p className="text-sm text-slate-500">Interactive exercises grouped by topic. Click a lab to open.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {labs.map(l => (
              <LabCard key={l.id} lab={l} />
            ))}
          </div>
        </section>

        {/* ---------------- TEACHER DASHBOARD SECTION ---------------- */}
        <section id="teacher-tools" className="mt-14 bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-2xl font-semibold text-slate-800">Teacher Tools</h3>
        <p className="mt-2 text-slate-600">
          CampusGuard provides a complete teacher dashboard for managing classes, creating assignments,
          reviewing student submissions, and monitoring learning progress.
        </p>

        {/* Feature cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50">
            <h4 className="font-semibold text-indigo-700 text-lg">Create Assignments</h4>
            <p className="text-slate-600 text-sm mt-2">
              Design lab tasks for students with deadlines and automated evaluation.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50">
            <h4 className="font-semibold text-indigo-700 text-lg">Review Submissions</h4>
            <p className="text-slate-600 text-sm mt-2">
              View student uploads, logs, phishing reports, and Nmap XML outputs.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50">
            <h4 className="font-semibold text-indigo-700 text-lg">Auto-Grading</h4>
            <p className="text-slate-600 text-sm mt-2">
              Automatically evaluate student labs and generate instant feedback.
            </p>
          </div>
        </div>

        {/* Open Dashboard Button */}
        <div className="mt-6">
          <a
            href="/teacher"
            className="px-5 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm font-medium"
          >
            Open Teacher Dashboard →
          </a>
        </div>

        {/* Instructions Section */}
        <div className="mt-8 bg-indigo-50 border border-indigo-200 p-4 rounded-xl">
          <h4 className="font-semibold text-indigo-700">How to use Teacher Dashboard:</h4>
          <ul className="list-disc pl-5 text-slate-700 text-sm mt-2 space-y-1">
            <li>Navigate to <strong>Assignments</strong> to create new tasks.</li>
            <li>Use <strong>Submissions</strong> to review and grade student work.</li>
            <li>Open <strong>Autograde Queue</strong> to monitor automated evaluations.</li>
            <li>Manage classrooms and student enrollments under <strong>Students</strong>.</li>
          </ul>
        </div>
      </section>

        {/* ------------Join Classroom Section------------- */}
        <section id="join-classroom" className="mt-14 bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold text-slate-800">Join a Classroom</h3>
          <p className="mt-2 text-slate-600">
            Students can enter the classroom code provided by their instructor to join a class.
          </p>

          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Enter classroom code"
              value={classroomCode}
              onChange={(e) => setClassroomCode(e.target.value)}
              className="p-3 border border-slate-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={() => {
                if (classroomCode.trim().length > 0) {
                  window.location.href = `/student/join/${classroomCode}`;
                }
              }}
              className="px-5 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-medium"
            >
              Join Classroom →
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-2">
            Your teacher will give you a classroom code to join.
          </p>
        </section>


        {/* ---------------- WHY CAMPUSGUARD ---------------- */}
        <section id="why" className="mt-14 bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold">Why CampusGuard?</h3>
          <p className="mt-2 text-slate-600">
            CampusGuard is designed for hands-on learning with safe, simulated labs. 
            Each lab includes guidance, automatic scoring, and feedback suitable for classroom or self-study.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Feature title="Safe Sandbox" desc="All labs run in controlled environments. No real scanning or attacks are performed on external networks." />
            <Feature title="Teacher Tools" desc="Instructors can track student progress and review results with the Teacher Dashboard." />
            <Feature title="Hands-on" desc="Practice real-world techniques with guided tasks and automated hints." />
          </div>
        </section>

        {/* ---------------- ABOUT ---------------- */}
        <section id="about" className="mt-14">
          <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold">About</h3>
            <p className="mt-2 text-slate-600">
              CampusGuard is a learning-first cybersecurity platform built for students and instructors. 
              This app showcases safe labs and instant feedback to accelerate learning.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="mt-14 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} CampusGuard — Built for learning</p>
        </footer>

      </main>
    </div>
  );
}

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-12 gap-8">
          
          {/* Left side text */}
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4">
              Learn cybersecurity with hands-on labs
            </h1>
            <p className="text-gray-600 text-lg">
              Follow guided exercises in port scanning, phishing analysis, log forensics 
              and password strength testing — all in a safe learning environment.
            </p>

            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              Explore Labs
            </button>
          </div>

          {/* Right side image */}
          <div className="w-full md:w-1/2">
            <img
              src={LabcardImage}
              alt="Cybersecurity Lab"
              className="rounded-2xl shadow-lg object-cover w-full"
            />
          </div>

        </section>
      );
    }

function LabCard({ lab }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition">
      <div className="h-40 w-full overflow-hidden">
        <img src={lab.img} alt={lab.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col">
        <h4 className="font-semibold">{lab.title}</h4>
        <p className="text-sm text-slate-600 mt-2 flex-1">{lab.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <a href={lab.route} className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm">Open Lab</a>
          <Link to={`/labs/${lab.id}/info`} className="text-sm text-slate-500">Details →</Link>
        </div>
      </div>
    </article>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h5 className="font-medium">{title}</h5>
      <p className="text-sm text-slate-600 mt-2">{desc}</p>
    </div>
  );
}

function TeacherFeature({ title, desc }) {
  return (
    <div className="bg-green-50 p-4 rounded-md border border-green-200 shadow-sm">
      <h5 className="font-medium text-green-700">{title}</h5>
      <p className="text-sm text-green-800 mt-2">{desc}</p>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="px-3 py-2 border rounded-md">Menu</button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow p-3">
          <a href="#home" className="block py-1">Home</a>
          <a href="#labs" className="block py-1">Labs</a>
          <a href="#teacher-tools" className="block py-1">Teacher Tools</a>
          <a href="#about" className="block py-1">About</a>
        </div>
      )}
    </div>
  );
}
