/*
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
*/
      {/* Labs Grid */}
      /*
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
}*/

import React, { useState } from "react";
import {Link} from "react-router-dom";

// CampusGuard main App component (single-file) — Tailwind CSS required
// Usage: place this file at frontend/src/App.jsx
// Make sure Tailwind is configured in your project (recommended) or replace classes with your own CSS.

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


export default function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
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
            <a href="#about" className="hover:text-indigo-600">About</a>
            <a href="#contact" className="px-3 py-1 rounded-md bg-indigo-600 text-white">Get Started</a>
          </nav>

          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <Hero />

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

        <section id="why" className="mt-14 bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold">Why CampusGuard?</h3>
          <p className="mt-2 text-slate-600">CampusGuard is designed for hands-on learning with safe, simulated labs. Each lab includes guidance, automatic scoring and feedback suitable for classroom or self-study.</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Feature title="Safe Sandbox" desc="All labs run in controlled environments. No real scanning or attacks are performed on external networks." />
            <Feature title="Teacher Tools" desc="Instructors can track student progress and review results with the teacher dashboard." />
            <Feature title="Hands-on" desc="Practice real-world techniques with guided tasks and automated hints." />
          </div>
        </section>

        <section id="about" className="mt-14">
          <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold">About</h3>
            <p className="mt-2 text-slate-600">CampusGuard is a learning-first cybersecurity platform built for students and instructors. This application demonstrates safe labs and immediate feedback to accelerate learning.</p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="px-4 py-2 rounded-md border border-indigo-200 text-indigo-600">Learn more</a>
              <a href="#" className="px-4 py-2 rounded-md bg-indigo-600 text-white">Get Started</a>
            </div>
          </div>
        </section>

        <footer id="contact" className="mt-14 text-sm text-slate-500">
          <div className="flex items-center justify-between">
            <div>
              <p>© {new Date().getFullYear()} CampusGuard — Built for learning</p>
            </div>
            <div className="text-right">
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

function Hero(){
  return (
    <section id="home" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-4xl font-bold">Learn cybersecurity with hands-on labs</h2>
        <p className="mt-4 text-slate-600">Follow guided exercises in port scanning, phishing analysis, log forensics and password strength testing — all in a safe learning environment.</p>
        <div className="mt-6 flex gap-3">
          <a href="#labs" className="px-5 py-3 bg-indigo-600 text-white rounded-md">Explore Labs</a>
          <a href="#about" className="px-5 py-3 border rounded-md">How it works</a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Stat label="Labs" value="4" />
          <Stat label="Exercises" value="12+" />
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdwwacQ8DqDhhl6FolEBmSjhqeHnIVB8nkoA&s" alt="hero" className="w-full h-80 object-cover" />
        </div>
      </div>
    </section>
  )
}

function Stat({label, value}){
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  )
}

function LabCard({lab}){
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition p-0 flex flex-col">
      <div className="h-40 w-full overflow-hidden">
        <img src={lab.img} alt={lab.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-semibold">{lab.title}</h4>
        <p className="text-sm text-slate-600 mt-2 flex-1">{lab.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <a href={lab.route} className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm">Open Lab</a>
          <Link to={`/labs/${lab.id}/info`} className="text-sm text-slate-500">
           Details →
          </Link>

        </div>
      </div>
    </article>
  )
}

function Feature({title, desc}){
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h5 className="font-medium">{title}</h5>
      <p className="text-sm text-slate-600 mt-2">{desc}</p>
    </div>
  )
}

function MobileMenu(){
  const [open, setOpen] = React.useState(false)
  return (
    <div className="relative">
      <button onClick={()=>setOpen(v=>!v)} className="px-3 py-2 border rounded-md">Menu</button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow p-3">
          <a href="#home" className="block py-1">Home</a>
          <a href="#labs" className="block py-1">Labs</a>
          <a href="#about" className="block py-1">About</a>
        </div>
      )}
    </div>
  )
}
