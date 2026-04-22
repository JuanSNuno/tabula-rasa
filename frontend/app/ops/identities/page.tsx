"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function IdentitiesPage() {
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const generate = async () => {
    setLoading(true);
    setResult(null);
    const res = await fetch("http://localhost:8080/api/v1/ops/identities/scaffold", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seed }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-[#0d071a] font-sans text-purple-200">
      {/* SIDEBAR */}
      <aside className="w-80 flex flex-col bg-[#07030e] border-r border-purple-900/50 shadow-2xl z-10 font-mono">
        <div className="p-6 border-b border-purple-900/30 flex items-center justify-between">
          <h1 className="text-xl font-black tracking-widest text-purple-400 uppercase">TABULA_RASA</h1>
          <span className="material-symbols-outlined text-purple-600">fingerprint</span>
        </div>
        
        {/* PROFILE */}
        <div className="p-6 border-b border-purple-900/30">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-900/40 rounded flex items-center justify-center border border-purple-700/50">
              <span className="material-symbols-outlined text-2xl text-purple-400">face_retouching_natural</span>
            </div>
            <div>
              <h2 className="font-bold tracking-widest text-sm text-purple-300">OP: MIRAGE</h2>
              <p className="text-[10px] uppercase tracking-widest text-purple-600">Identity Architect</p>
            </div>
          </div>
          
          <div className="space-y-1.5 text-xs text-purple-500 bg-purple-950/20 p-3 rounded border border-purple-900/20">
             <div className="flex justify-between"><span>NODE:</span> <span className="text-purple-300 font-bold">Genesis-01</span></div>
             <div className="flex justify-between"><span>LOCATION:</span> <span className="text-purple-300">Deep Web Cluster</span></div>
             <div className="flex justify-between"><span>CLEARANCE:</span> <span className="text-purple-300">Level 8 (Omega)</span></div>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-purple-600 mb-4 flex justify-between items-center">
             Forge Queue
             <span className="bg-purple-900 text-purple-200 px-1.5 rounded-sm">3</span>
          </h3>
          <div className="space-y-3">
            <div className="p-3 border-l-2 border-orange-500 bg-purple-950/30 text-xs hover:bg-purple-900/30 transition-colors cursor-pointer">
               <p className="text-purple-300 font-bold mb-1">[WARN] Passport P-4399</p>
               <p className="text-purple-500/80">Biometric hash mismatch on interpol validation node.</p>
            </div>
            <div className="p-3 border-l-2 border-purple-500 bg-purple-950/30 text-xs hover:bg-purple-900/30 transition-colors cursor-pointer">
               <p className="text-purple-300 font-bold mb-1">[NEW] Subject_TR-15</p>
               <p className="text-purple-500/80">Intake ready. Awaiting generative scaffold.</p>
            </div>
            <div className="p-3 border-l-2 border-green-500 bg-purple-950/30 text-xs hover:bg-purple-900/30 transition-colors cursor-pointer">
               <p className="text-purple-300 font-bold mb-1">[OK] Credit History</p>
               <p className="text-purple-500/80">Financial backdating completed for Alias 'M. Silva'.</p>
            </div>
          </div>
        </div>
        
        {/* LOGOUT */}
        <div className="p-4 border-t border-purple-900/30">
           <Link href="/" className="flex items-center justify-center gap-2 w-full py-3 bg-purple-950/50 text-purple-400 hover:bg-purple-900 hover:text-purple-200 transition-colors text-[10px] font-bold tracking-widest uppercase rounded">
              Log out
           </Link>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gradient-to-br from-[#0d071a] to-[#04010a]">
        {/* TOPBAR */}
        <header className="p-6 flex items-center justify-between border-b border-purple-900/30 z-10 font-mono">
          <div className="flex gap-8 text-[11px] uppercase font-bold tracking-widest">
            <span className="text-purple-400 border-b border-purple-400 pb-1">Scaffold Generator (TR-26)</span>
            <span className="text-purple-800 cursor-not-allowed">Biometric Synth</span>
            <span className="text-purple-800 cursor-not-allowed">Financial Backdating</span>
          </div>
          <div className="text-[10px] text-purple-600 font-bold tracking-widest">
            GENERATIVE CORE: <span className="text-green-500">ONLINE</span>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-light tracking-tight text-white mb-3">
                Synthetic <span className="font-bold text-purple-400">Identity Generation</span>
              </h2>
              <p className="text-sm text-purple-300/60 font-mono leading-relaxed">
                Utilize generative models to forge complete, backdated historical documentation including educational records, tax histories, and digital footprints.
              </p>
            </div>

            {/* GENERATOR TOOL */}
            <div className="bg-[#0a0514] border border-purple-900/50 p-8 rounded-xl shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-3xl"></div>
               
               <div className="relative z-10">
                 <label className="block mb-3 text-xs font-bold uppercase tracking-widest text-purple-400 font-mono">
                    Personality Seed / Demographics:
                 </label>
                 <textarea
                   className="w-full bg-[#05020a] border border-purple-800/50 rounded-lg p-5 text-sm font-mono text-purple-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-900/60 resize-none"
                   rows={5}
                   placeholder="Enter seed instructions... e.g. 'Eastern Europe, low profile, IT technician, no criminal records...'"
                   value={seed}
                   onChange={(e) => setSeed(e.target.value)}
                 />
                 
                 <div className="mt-6 flex items-center justify-between">
                    <span className="text-[10px] text-purple-500/50 font-mono uppercase">
                       {seed.length} / 1000 characters
                    </span>
                    <button
                      onClick={generate}
                      disabled={loading || !seed}
                      className={`px-8 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all ${
                        loading || !seed
                          ? "bg-purple-950/50 text-purple-700 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                      }`}
                    >
                      {loading ? (
                         <span className="flex items-center gap-2 animate-pulse">
                            <span className="material-symbols-outlined text-[16px]">sync</span>
                            Forging History...
                         </span>
                      ) : "Generate Scaffold"}
                    </button>
                 </div>

                 {/* LOADING STATE */}
                 {loading && (
                   <div className="mt-8 p-6 bg-[#05020a] border border-purple-800/30 rounded-lg text-purple-400 font-mono text-xs leading-loose">
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping"></span> Forging birth records and physical traits...</p>
                     <p className="flex items-center gap-2 text-purple-500/80 ml-4"><span className="text-purple-700">├</span> Injecting records into EU_NODE_A</p>
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping"></span> Creating online forum histories (2015-2023)...</p>
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping"></span> Emitting tax certificates & utility bills...</p>
                   </div>
                 )}

                 {/* RESULT STATE */}
                 {result && !loading && (
                   <div className="mt-10 animate-fade-in">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-green-400 mb-4 border-b border-purple-900/30 pb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Scaffold Deployed [ID: {result.id}]
                     </h3>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.documents.map((doc: string, i: number) => (
                          <div key={i} className="bg-[#05020a] border border-purple-900/30 p-4 rounded flex items-start gap-3">
                             <span className="material-symbols-outlined text-purple-600">draft</span>
                             <p className="text-sm text-purple-200 font-mono leading-tight">{doc}</p>
                          </div>
                        ))}
                     </div>
                     <div className="mt-6 flex justify-end">
                        <button className="text-xs font-bold text-purple-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                           Export Package <span className="material-symbols-outlined text-[16px]">download</span>
                        </button>
                     </div>
                   </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
