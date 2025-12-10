import React from "react";
import { NavLink } from "react-router-dom";

export default function TeacherSidebar() {
  return (
    <aside className="w-60 h-screen bg-white border-r border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-700 mb-6">Teacher Panel</h2>

      <nav className="flex flex-col gap-3">

        <NavLink
          to="/teacher"
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-medium 
            ${isActive ? "bg-sky-600 text-white" : "text-slate-700 hover:bg-slate-100"}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/teacher/classrooms"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-medium 
            ${isActive ? "bg-sky-600 text-white" : "text-slate-700 hover:bg-slate-100"}`
          }
        >
          Classrooms
        </NavLink>

        <NavLink
          to="/teacher/assignments"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-medium 
            ${isActive ? "bg-sky-600 text-white" : "text-slate-700 hover:bg-slate-100"}`
          }
        >
          Assignments
        </NavLink>

        <NavLink
          to="/teacher/submissions"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg font-medium 
            ${isActive ? "bg-sky-600 text-white" : "text-slate-700 hover:bg-slate-100"}`
          }
        >
          Submissions
        </NavLink>

      </nav>
    </aside>
  );
}
