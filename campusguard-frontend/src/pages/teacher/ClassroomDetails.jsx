import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper";
import teacherApi from "../../api/teacherApi";
import assignmentsApi from "../../api/assignmentApi";

export default function ClassroomDetail(){
  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    setLoading(true);
    // try to fetch classroom (api may not exist)
    Promise.allSettled([
      teacherApi.getClassrooms?.(),
      assignmentsApi.getAll?.()
    ]).then(res => {
      // classroom fetch
      const clsList = res[0]?.status === "fulfilled" ? (res[0].value || []) : [];
      const found = clsList.find(c => String(c._id) === String(id));
      setClassroom(found ?? { _id: id, name: "Classroom", code: "N/A", students: 0 });

      // assignments filter by classroom
      const all = res[1]?.status === "fulfilled" ? (res[1].value || []) : [];
      setAssignments(all.filter(a => (a.classroomId || "default") === (found?.id || id || "default")));
    }).finally(()=> setLoading(false));
  }, [id]);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{classroom?.name ?? "Classroom"}</h1>
          <p className="text-sm text-slate-500">Code: <span className="font-mono">{classroom?.code ?? "—"}</span></p>
        </div>
        <div>
          <Link to="/teacher/assignments/create" className="px-3 py-2 bg-sky-600 text-white rounded">Create Assignment</Link>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium">Assignments</h2>
        {loading ? <div className="p-4 bg-white rounded shadow mt-3">Loading...</div> : (
          assignments.length === 0 ? <div className="p-4 text-slate-500">No assignments yet.</div> :
          <ul className="mt-3 space-y-2">
            {assignments.map(a => (
              <li key={a._id} className="bg-white p-3 rounded shadow flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-slate-500">Due: {a.dueAt ?? "—"}</div>
                </div>
                <div>
                  <Link to={`/teacher/assignments/${a._id}`} className="text-sky-600 underline">Open</Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageWrapper>
  );
}
