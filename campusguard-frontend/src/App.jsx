import React,{useState} from "react";
import ScanRunner from "./ScanRunner";

export default function App(){
  const labs=[
    {id:1,title:"Port Scan"},
    {id:2,title:"Log Analysis"},
    {id:3,title:"Password Strength"},
    {id:4,title:"phishing Mail"},
  ];

  const[activeLab,setActiveLab]=useState(null);

  return(
    <div className="min-h-screen bg-black text-grey-100 flex flex-col items-center py-10">
      <h1 className="text-5xl font-bold mb-6">
        <span className="text-cyan-400">Campus</span>
        <span className="text-violet-400">Guard</span>
        </h1>
        <p className="text-grey-400 mb-10 text-center max-w-md">
          A beginner-friendly cyber-lab where students can practice port scanning,
          log analysis,password testing,and phishing detection.
          </p>

          {/*Labs grid */}
          <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 w-11/12 max-w-5xl">
          {labs.map((labs)=>(
            <div
            key={labs.id}
            onClick={()=>setActiveLab(labs.title)}
            className="bg-gradient-to-br from-[#041426] to-[#081224] rounded -2xl border-grey-800
            p-5 text-center hover:scale-105 tramsition-transform">
              <h2 className="text-lg font-semibold text-cyan-300 mb-2">
                {labs.title}
                </h2>
                <p className="text-grey-400 text-sm">
                  {labs.title=="Port Scan" ? "Click to open":"Coming soon..."}
                </p>
                </div>

          ))}
     </div>

     {/* Active Lab Section*/}
     <div className="w-11/12 max-w-5xl">
     {activeLab==="Port Scan" &&(
      <div className="bg-[#041026] p-6 rounded-2xl border border-grey-800">
        <ScanRunner userId="student_01" />
        </div>
     )}
     {activeLab && activeLab !== "Port Scan" &&(
      <div className="bg-[#041026] p-6 rounded-2xl border border-grey-800 text-gray-400 text-center">
        <h3 clssName="text-xl font-semibold mb-2 text-cyan-300">{activeLab}</h3>
        <p>Coming soon...</p>
        </div>
     )}
     </div>
     

      <footer className="mt-10 text-grey-500 text-xs">
       © {new Date().getFullYear()} CampusGuard-Cyber Security Learning Labs
</footer>
</div>
  );
}