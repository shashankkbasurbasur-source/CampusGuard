// src/pages/teacher/CreateClassroomModal.jsx
import { useState } from "react";
import teacherApi from "../../api/teacherApi";

export default function CreateClassroomModal({ onClose, onCreated }){
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  async function create(){
    if (!name.trim()) return alert("Enter classroom name");
    setCreating(true);
    try {
      // Try backend create endpoint (may or may not exist)
      if (teacherApi.createClassroom) {
        const created = await teacherApi.createClassroom({ name });
        onCreated(created);
      } else {
        // fallback: local generated classroom
        const code = Math.random().toString(36).slice(2,8).toUpperCase();
        const created = { _id: `c${Date.now()}`, name, code, students: 0 };
        onCreated(created);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to create classroom");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Create Classroom</h3>
        <label className="text-sm text-slate-600">Classroom name</label>
        <input className="w-full border p-2 rounded mt-1" value={name} onChange={e=>setName(e.target.value)} />
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-2 border rounded" onClick={onClose}>Cancel</button>
          <button className="px-3 py-2 bg-sky-600 text-white rounded" onClick={create} disabled={creating}>{creating ? "Creating..." : "Create"}</button>
        </div>
      </div>
    </div>
  );
}
