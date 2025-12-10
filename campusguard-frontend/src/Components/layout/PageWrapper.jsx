import TeacherSidebar from "../../Components/layout/TeacherSidebar";
import TeacherHeader from "../../Components/layout/TeacherHeader";

export default function PageWrapper({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <TeacherSidebar />

      <div className="flex-1 flex flex-col">
        <TeacherHeader />

        <main className="p-6 text-slate-800">
          {children}
        </main>
      </div>
    </div>
  );
}
