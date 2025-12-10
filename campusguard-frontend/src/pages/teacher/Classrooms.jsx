import { useEffect, useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper";
import teacherApi from "../../api/teacherApi";
import CreateClassroomModal from "./CreateClassroomModel";
import { Link } from "react-router-dom";

export default function Classrooms(){
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    setLoading(true);
    teacherApi.getClassrooms?.()
      .then(data => setClassrooms(data || []))
      .catch(() => {
        // fallback mock
        setClassrooms([
          { _id: "c1", name: "Cybersecurity 101", code: "ABC123", students: 12 },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  function onCreated(newClass) {
    setClassrooms(prev => [newClass, ...prev]);
    setShowCreate(false);
  }

  return (
    <PageWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Classrooms</h1>
        <button className="px-3 py-2 bg-sky-600 text-white rounded" onClick={() => setShowCreate(true)}>+ Create Classroom</button>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="bg-white p-4 rounded shadow">Loading...</div>
        ) : (
          <div className="bg-white rounded shadow overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-600">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Code</th>
                  <th className="p-3">Students</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classrooms.map(c => (
                  <tr key={c._id} className="border-t">
                    <td className="p-3">{c.name}</td>
                    <td className="p-3 font-mono">{c.code || "—"}</td>
                    <td className="p-3">{c.students ?? 0}</td>
                    <td className="p-3">
                      <Link to={`/teacher/classrooms/${c._id}`} className="text-sky-600 underline">Open</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCreate && <CreateClassroomModal onClose={() => setShowCreate(false)} onCreated={onCreated} />}
    </PageWrapper>
  );
}
