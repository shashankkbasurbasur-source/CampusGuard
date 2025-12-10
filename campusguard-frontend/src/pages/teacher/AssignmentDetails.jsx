import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper";
import assignmentsApi from "../../api/assignmentApi";
import submissionsApi from "../../api/submissionsApi";

export default function AssignmentDetail(){
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    setLoading(true);
    assignmentsApi.getOne(id)
      .then(a => setAssignment(a))
      .catch(()=> setAssignment(null));

    submissionsApi.list({ assignmentId: id, limit: 100 })
      .then(s => setSubmissions(s || []))
      .catch(()=> setSubmissions([]))
      .finally(()=> setLoading(false));
  }, [id]);

  return (
    <PageWrapper>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{assignment?.title ?? "Assignment"}</h1>
          <p className="text-sm text-slate-500">Points: {assignment?.pointsTotal ?? "—"}</p>
        </div>
        <div><Link to={`/teacher/submissions?assignmentId=${id}`} className="px-3 py-2 bg-sky-600 text-white rounded">View Submissions</Link></div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="font-medium">Instructions</h3>
        <p className="text-slate-700 mt-2">{assignment?.meta?.instructions ?? "No instructions provided."}</p>

        <h4 className="mt-4 font-medium">Submissions ({submissions.length})</h4>
        <ul className="mt-2 space-y-2">
          {submissions.map(s => (
            <li key={s._id} className="flex items-center justify-between bg-slate-50 p-2 rounded">
              <div>
                <div className="font-medium">{s.studentName}</div>
                <div className="text-xs text-slate-500">{s.submittedAt ?? "—"}</div>
              </div>
              <div>
                <Link to={`/teacher/submissions/${s._id}`} className="text-sky-600 underline">Open</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageWrapper>
  );
}
