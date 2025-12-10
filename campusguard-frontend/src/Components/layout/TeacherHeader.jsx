import React, { useState } from "react";
import { Bell, User, Settings, LogOut } from "lucide-react";

export default function TeacherHeader() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      
      {/* Left: Title */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800">Teacher Dashboard</h1>
        <p className="text-xs text-slate-600">Manage classes, assignments & grading</p>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-6 relative">

        {/* Notifications */}
        <button className="relative text-slate-700 hover:text-sky-600 transition">
          <Bell size={22} strokeWidth={2} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
            3
          </span>
        </button>

        {/* Settings */}
        <button className="text-slate-700 hover:text-sky-600 transition">
          <Settings size={22} strokeWidth={2} />
        </button>

        {/* Profile */}
        <div
          className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-md hover:bg-slate-100"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <User size={22} className="text-slate-700" />
          <span className="text-sm text-slate-800 font-medium">Teacher</span>
        </div>

        {/* Profile Dropdown */}
        {openMenu && (
          <div className="absolute right-0 top-12 bg-white shadow-lg border border-slate-200 rounded-md w-44 py-2 z-50">
            
            <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2">
              <Settings size={16} /> Settings
            </button>

            <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2">
              <User size={16} /> My Account
            </button>

            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
              <LogOut size={16} /> Logout
            </button>

          </div>
        )}

      </div>
    </header>
  );
}
