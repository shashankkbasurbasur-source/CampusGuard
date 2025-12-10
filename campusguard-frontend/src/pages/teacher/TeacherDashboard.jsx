import { useEffect, useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper";
import teacherApi from "../../api/teacherApi";
import Button from "../../Components/layout/Button";

export default function TeacherDashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    teacherApi.getClassrooms().then((data) => setClassrooms(data ?? []));
    teacherApi.getAssignments().then((data) => setAssignments(data ?? []));
    teacherApi.getSubmissions().then((data) => setSubmissions(data ?? []));
  }, []);

  return (
    <PageWrapper>
      <h2 className="text-xl font-bold mb-1">Overview</h2>
      <p className="text-slate-600 mb-6">
        Quick summary of your classrooms, assignments and student activity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Classrooms */}
        <SummaryCard
          title="Classrooms"
          count={classrooms.length}
          link="/teacher/classrooms"
          action="Manage"
        />

        {/* Assignments */}
        <SummaryCard
          title="Assignments"
          count={assignments.length}
          link="/teacher/assignments"
          action="Open"
        />

        {/* Submissions */}
        <SummaryCard
          title="Submissions"
          count={submissions.length}
          link="/teacher/submissions"
          action="Review"
        />
      </div>

      {/* Latest submissions */}
      <div className="bg-white mt-10 p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Recent Student Submissions
        </h3>

        {submissions.length === 0 ? (
          <p className="text-slate-500">No submissions yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-slate-600">
                <th className="py-2">Student</th>
                <th className="py-2">Assignment</th>
                <th className="py-2">Status</th>
                <th className="py-2">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {submissions.slice(0, 5).map((s) => (
                <tr key={s._id} className="border-b">
                  <td className="py-2">{s.studentName || "Unknown"}</td>
                  <td className="py-2">{s.assignmentTitle}</td>
                  <td className="py-2 capitalize">{s.status}</td>
                  <td className="py-2">{s.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageWrapper>
  );
}

function SummaryCard({ title, count, link, action }) {
  return (
    <div className="bg-white shadow-sm border rounded-lg p-6">
      <h4 className="text-lg text-slate-800 font-semibold">{title}</h4>
      <p className="text-slate-500 text-sm mt-1">{count} total</p>

      <div className="mt-4">
        <a href={link}>
          <Button>{action}</Button>
        </a>
      </div>
    </div>
  );
}
