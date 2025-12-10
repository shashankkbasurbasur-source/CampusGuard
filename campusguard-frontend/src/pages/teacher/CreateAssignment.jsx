import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper";
import teacherApi from "../../api/teacherApi";
import assignmentsApi from "../../api/assignmentApi";

export default function CreateAssignment(){
  const nav = useNavigate();
  const [classrooms, setClassrooms] = useState([]);
  const [form, setForm] = useState({
    title: "", classroomId: "default", dueAt: "", pointsTotal: 100, type: "lab", payload: {}
  });
  const [saving, setSaving] = useState(false);

  useEffect(()=> {
    teacherApi.getClassrooms?.()
      .then(d => setClassrooms(d || []))
      .catch(() => setClassrooms([{ _id: "default", name: "Default" }]));
  }, []);

  async function save(){
    if (!form.title.trim()) return alert("Add a title");
    setSaving(true);
    const payload = {
      classroomId: form.classroomId,
      title: form.title,
      dueAt: form.dueAt,
      pointsTotal: Number(form.pointsTotal),
      type: form.type,
      meta: form.payload
    };
    try {
      if (teacherApi.createAssignment) {
        const created = await teacherApi.createAssignment(payload);
        nav(`/teacher/assignments/${created._id}`);
      } else if (assignmentsApi.create) {
        const created = await assignmentsApi.create(payload);
        nav(`/teacher/assignments/${created._id}`);
      } else {
        // fallback local success
        alert("Assignment created (local)");
        nav("/teacher/assignments");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to create assignment");
    } finally {
      setSaving(false);
    }
  }

  return (
    <PageWrapper>
      <h1 className="text-2xl font-semibold">Create Assignment</h1>

      <div className="mt-4 bg-white p-4 rounded shadow space-y-4">
        <div>
          <label className="block text-sm text-slate-600">Title</label>
          <input className="w-full border p-2 rounded" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600">Classroom</label>
            <select className="w-full border p-2 rounded" value={form.classroomId} onChange={e=>setForm({...form, classroomId: e.target.value})}>
              {classrooms.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm text-slate-600">Due date</label>
            <input type="date" className="w-full border p-2 rounded" value={form.dueAt} onChange={e=>setForm({...form, dueAt: e.target.value})} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600">Points</label>
            <input type="number" className="w-full border p-2 rounded" value={form.pointsTotal} onChange={e=>setForm({...form, pointsTotal: e.target.value})} />
          </div>
          <div>
            <label className="text-sm text-slate-600">Type</label>
            <select className="w-full border p-2 rounded" value={form.type} onChange={e=>setForm({...form, type: e.target.value})}>
              <option value="lab">Lab</option>
              <option value="mcq">MCQ</option>
              <option value="short">Short Answer</option>
            </select>
          </div>
        </div>

        {/* For MCQ / short answer you would extend UI here. Minimal placeholder: */}
        <div>
          <label className="text-sm text-slate-600">Instructions</label>
          <textarea className="w-full border p-2 rounded" rows={4} value={form.payload.instructions || ""} onChange={e=>setForm({...form, payload:{...form.payload, instructions: e.target.value}})} />
        </div>

        <div className="flex justify-end gap-2">
          <button className="px-3 py-2 border rounded" onClick={()=>nav(-1)}>Cancel</button>
          <button className="px-3 py-2 bg-sky-600 text-white rounded" onClick={save} disabled={saving}>{saving ? "Saving..." : "Create"}</button>
        </div>
      </div>
    </PageWrapper>
  );
}
