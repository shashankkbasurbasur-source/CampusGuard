import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper";
import submissionsApi from "../../api/submissionsApi";

export default function Submissions(){
  const [searchParams] = useSearchParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const filters = {
    classroomId: searchParams.get("classroomId") || undefined,
    assignmentId: searchParams.get("assignmentId") || undefined,
  };

  useEffect(()=> {
    setLoading(true);
    submissionsApi.list(filters)
      .then(data => setSubmissions(data || []))
      .catch(()=> setSubmissions([]))
      .finally(()=> setLoading(false));
  }, [searchParams]);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Submissions</h1>
      </div>

      <div className="mt-4 bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-600">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Assignment</th>
              <th className="p-3">Submitted</th>
              <th className="p-3">Score</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(s => (
              <tr key={s._id} className="border-t">
                <td className="p-3">{s.studentName}</td>
                <td className="p-3">{s.assignmentTitle ?? s.assignmentId}</td>
                <td className="p-3">{s.submittedAt ?? "—"}</td>
                <td className="p-3">{s.score ?? "—"}</td>
                <td className="p-3">
                  <Link to={`/teacher/submissions/${s._id}`} className="text-sky-600 underline mr-3">Open</Link>
                  <button className="px-2 py-1 border rounded text-xs" onClick={() => {
                    submissionsApi.queueAutograde(s._id).then(()=> alert("Queued")).catch(e=>alert(e.message || "Failed"));
                  }}>Autograde</button>
                </td>
              </tr>
            ))}
            {submissions.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-slate-500">No submissions</td></tr>}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
