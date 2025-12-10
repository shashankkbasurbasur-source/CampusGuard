import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper";
import submissionsApi from "../../api/submissionsApi";

export default function SubmissionDetail(){
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(()=> {
    setLoading(true);
    submissionsApi.getOne(id)
      .then(s => {
        setSubmission(s);
        setGrade(s?.score ?? "");
        setFeedback(s?.feedback ?? "");
      })
      .catch(()=> setSubmission(null))
      .finally(()=> setLoading(false));
  }, [id]);

  async function saveGrade(){
    setSaving(true);
    try {
      await submissionsApi.grade(id, { points: Number(grade), feedback });
      alert("Saved");
      // refresh
      const fresh = await submissionsApi.getOne(id);
      setSubmission(fresh);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save grade");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <PageWrapper><div>Loading...</div></PageWrapper>;

  return (
    <PageWrapper>
      <h1 className="text-2xl font-semibold">Submission by {submission?.studentName}</h1>

      <div className="mt-4 bg-white p-4 rounded shadow">
        <div className="text-sm text-slate-500">Submitted: {submission?.submittedAt ?? "—"}</div>
        <div className="mt-3">
          <h4 className="font-medium">Files / Output</h4>
          <div className="mt-2 text-sm text-slate-700">
            {submission?.fileId ? <a className="text-sky-600 underline" href={`/api/files/${submission.fileId}`} target="_blank" rel="noreferrer">Download file</a> : "No file attached"}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600">Score</label>
            <input type="number" className="w-full border p-2 rounded" value={grade} onChange={e=>setGrade(e.target.value)} />
          </div>

          <div>
            <label className="text-sm text-slate-600">Feedback</label>
            <input className="w-full border p-2 rounded" value={feedback} onChange={e=>setFeedback(e.target.value)} />
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <button className="px-3 py-2 border rounded" onClick={()=>window.history.back()}>Back</button>
          <button className="px-3 py-2 bg-sky-600 text-white rounded" onClick={saveGrade} disabled={saving}>{saving ? "Saving..." : "Save Grade"}</button>
        </div>
      </div>
    </PageWrapper>
  );
}
