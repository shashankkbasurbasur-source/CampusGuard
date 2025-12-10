import { useEffect, useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper";
import assignmentsApi from "../../api/assignmentApi";
import { Link, useSearchParams } from "react-router-dom";

export default function Assignments(){
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const classroomId = params.get("classroomId") || "default";

  useEffect(() => {
    setLoading(true);
    assignmentsApi.getAll(classroomId)
      .then(data => setAssignments(data || []))
      .catch(() => setAssignments([]))
      .finally(()=>setLoading(false));
  }, [classroomId]);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Assignments</h1>
        <div className="flex gap-2">
          <Link to="/teacher/assignments/create" className="px-3 py-2 bg-sky-600 text-white rounded">+ Create</Link>
        </div>
      </div>

      <div className="mt-4 bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-600">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Classroom</th>
              <th className="p-3">Due</th>
              <th className="p-3">Points</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(a => (
              <tr key={a._id} className="border-t">
                <td className="p-3">{a.title}</td>
                <td className="p-3">{a.classroomId ?? "default"}</td>
                <td className="p-3">{a.dueAt ?? "—"}</td>
                <td className="p-3">{a.pointsTotal ?? 0}</td>
                <td className="p-3">
                  <Link to={`/teacher/assignments/${a._id}`} className="text-sky-600 underline">Open</Link>
                </td>
              </tr>
            ))}
            {assignments.length === 0 && (
              <tr><td colSpan={5} className="p-4 text-center text-slate-500">No assignments yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
