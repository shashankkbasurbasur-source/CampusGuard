import ScanRunner from "./ScanRunner";

export default function PortScan() {
  return (
    <div className="min-h-screen bg-black text-gray-100 py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">
        <span className="text-cyan-400">Port</span>{" "}
        <span className="text-violet-400">Scan Lab</span>
      </h1>

      <p className="text-gray-400 mb-8 text-center max-w-xl">
        Select a target machine and run a simulated port scan. Results and
        AI-generated feedback will appear below.
      </p>

      <div className="w-11/12 max-w-3xl bg-[#041026] p-6 rounded-2xl border border-gray-800 shadow-lg">
        <ScanRunner userId="student_01" />
      </div>
    </div>
  );
}
