"use client";
import React, { useEffect, useState } from "react";
import { User, ShieldAlert, CreditCard, Building, Users, Activity, FileText, Plus, HeartPulse } from 'lucide-react';

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null);
  const subjectId = "subject-123";

  // Form states
  const [isAdding, setIsAdding] = useState(false);
  const [depForm, setDepForm] = useState({
    name: "",
    age: "",
    relationship: "",
    medicalNeeds: ""
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/identities/${subjectId}/portfolio`)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const handleAddDependent = async () => {
    if (!depForm.name || !depForm.age || !depForm.relationship) return;
    
    const res = await fetch(`http://localhost:8080/api/v1/identities/${subjectId}/dependents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         name: depForm.name,
         age: parseInt(depForm.age),
         relationship: depForm.relationship,
         medicalNeeds: depForm.medicalNeeds
      }),
    });
    
    setData(await res.json());
    setDepForm({ name: "", age: "", relationship: "", medicalNeeds: "" });
    setIsAdding(false);
  };

  if (!data) return (
     <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-tertiary">
        <span className="animate-pulse tracking-[0.3em] flex items-center gap-4">
           <Activity className="animate-spin"/> DECRYPTING LEDGER...
        </span>
     </div>
  );

  return (
    <div className="min-h-screen bg-[#0e0e10] text-gray-300 p-6 md:p-10 font-mono flex flex-col xl:flex-row gap-10">
      {/* LEFT COLUMN: THE ID BADGE */}
      <div className="w-full xl:w-[380px] flex flex-col gap-6 shrink-0">
         <div className="flex items-center gap-3 border-b border-primary/30 pb-4 mb-2">
            <ShieldAlert className="text-primary w-8 h-8" />
            <div>
               <h1 className="text-xl font-bold tracking-[0.2em] text-primary uppercase">Legacy_Asset</h1>
               <p className="text-[10px] text-gray-500 tracking-widest uppercase">Primary Subject Portfolio</p>
            </div>
         </div>

         {/* ID CARD */}
         <div className="bg-surface-container-low border border-primary/20 rounded-xl overflow-hidden shadow-2xl relative group">
            <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-primary to-tertiary"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
            
            <div className="p-6 flex flex-col gap-6">
               <div className="flex gap-4">
                  <div className="w-28 h-28 bg-black border border-primary/30 rounded overflow-hidden shadow-inner relative flex-shrink-0">
                     <div className="absolute inset-0 bg-primary/10 mix-blend-screen z-10"></div>
                     <img src={data.photoUrl} alt="Avatar" className="w-full h-full object-cover filter contrast-125" />
                     <div className="absolute bottom-0 w-full bg-primary/80 text-[8px] font-bold text-black text-center py-0.5 tracking-widest uppercase backdrop-blur-md z-20">
                        Validated
                     </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-3">
                     <div>
                        <p className="text-[9px] uppercase text-primary/70 font-bold tracking-widest">Legal Name (Alias)</p>
                        <p className="text-lg font-black text-white tracking-tight leading-tight">{data.alias}</p>
                     </div>
                     <div>
                        <p className="text-[9px] uppercase text-primary/70 font-bold tracking-widest">Passport / ID</p>
                        <p className="text-xs font-mono text-gray-300 bg-black/40 px-2 py-0.5 inline-block rounded">{data.passportNum}</p>
                     </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-3 pt-4 border-t border-primary/10">
                  <div>
                     <p className="text-[9px] uppercase text-primary/70 font-bold tracking-widest">Clearance Level</p>
                     <p className="text-xs font-mono text-tertiary uppercase">{data.clearance}</p>
                  </div>
                  <div>
                     <p className="text-[9px] uppercase text-primary/70 font-bold tracking-widest">Status</p>
                     <p className="text-xs font-mono text-green-500 uppercase flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> SECURED</p>
                  </div>
               </div>
            </div>
            
            <div className="bg-black/60 px-6 py-3 border-t border-primary/10 flex justify-between items-center">
               <div className="text-[10px] text-gray-500 uppercase tracking-widest">Issue Date: {new Date().toLocaleDateString()}</div>
               <div className="h-6 w-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e9/UPC-A-036000291452.svg')] bg-cover bg-center filter invert opacity-50 mix-blend-lighten"></div>
            </div>
         </div>

         {/* Subject Stats */}
         <div className="grid grid-cols-1 gap-3">
            <div className="bg-surface-container-low p-4 border-l-2 border-primary/50 flex gap-4 items-center">
               <User className="text-primary/50 w-5 h-5" />
               <div>
                  <p className="text-[9px] uppercase text-gray-500 font-bold tracking-widest">Occupation Overlay</p>
                  <p className="text-sm text-gray-200">{data.jobTitle}</p>
               </div>
            </div>
            <div className="bg-surface-container-low p-4 border-l-2 border-tertiary/50 flex gap-4 items-center">
               <CreditCard className="text-tertiary/50 w-5 h-5" />
               <div>
                  <p className="text-[9px] uppercase text-gray-500 font-bold tracking-widest">Synthetic Credit Score</p>
                  <p className="text-sm text-gray-200 font-bold">{data.creditScore} <span className="text-[9px] text-green-500 font-normal ml-1">EXCELLENT</span></p>
               </div>
            </div>
            <div className="bg-surface-container-low p-4 border-l-2 border-primary/50 flex gap-4 items-center">
               <Building className="text-primary/50 w-5 h-5" />
               <div>
                  <p className="text-[9px] uppercase text-gray-500 font-bold tracking-widest">Registered Safehouse</p>
                  <p className="text-xs text-gray-200">{data.address}</p>
               </div>
            </div>
         </div>
      </div>

      {/* RIGHT COLUMN: DEPENDENTS UI */}
      <div className="w-full flex-1 flex flex-col gap-6 mt-2">
         {/* Backstory */}
         <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 relative rounded-lg">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <FileText className="w-16 h-16" />
            </div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80 mb-3 flex items-center gap-2">
               <Activity className="w-4 h-4"/> Legend & Backstory
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 border-l border-primary/20 pl-4 py-1">"{data.backstory}"</p>
         </div>

         {/* Dependents Hub */}
         <div className="bg-surface-container-lowest border border-outline-variant/20 flex-1 rounded-lg flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-black/40 p-5 border-b border-outline-variant/10 flex justify-between items-center">
               <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] text-tertiary flex items-center gap-2">
                     <Users className="w-5 h-5" />
                     Associated Personnel (TR-3)
                  </h2>
                  <p className="text-[10px] text-gray-500 tracking-widest mt-1">Manage linked profiles, clearance, and operational requirements.</p>
               </div>
               
               <button 
                  onClick={() => setIsAdding(!isAdding)}
                  className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-colors border flex items-center gap-2 rounded ${
                     isAdding 
                     ? 'bg-red-950/30 text-red-500 border-red-900/50 hover:bg-red-900/50' 
                     : 'bg-tertiary/10 text-tertiary border-tertiary/30 hover:bg-tertiary/20 hover:border-tertiary'
                  }`}
               >
                  <Plus className={`w-3 h-3 ${isAdding ? 'rotate-45' : ''} transition-transform duration-300`} />
                  {isAdding ? 'Cancel Registration' : 'New Intake Form'}
               </button>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 overflow-y-auto bg-[#0a0a0d]">
               
               {/* Registration Form (Conditionally rendered) */}
               {isAdding && (
                  <div className="bg-black/60 border border-tertiary/40 rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-300 shadow-[0_0_30px_rgba(167,139,250,0.05)]">
                     <h3 className="text-xs font-bold text-tertiary mb-6 uppercase tracking-widest border-b border-tertiary/20 pb-2">New Profile Registration</h3>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        <div className="space-y-1.5">
                           <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Alias / Name</label>
                           <input
                              type="text"
                              value={depForm.name}
                              onChange={(e) => setDepForm({...depForm, name: e.target.value})}
                              className="w-full bg-[#050505] border border-outline-variant/30 px-4 py-2.5 text-xs focus:outline-none focus:border-tertiary text-gray-200"
                              placeholder="e.g. S. Miller"
                           />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Age</label>
                           <input
                              type="number"
                              value={depForm.age}
                              onChange={(e) => setDepForm({...depForm, age: e.target.value})}
                              className="w-full bg-[#050505] border border-outline-variant/30 px-4 py-2.5 text-xs focus:outline-none focus:border-tertiary text-gray-200"
                              placeholder="e.g. 12"
                           />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Relationship to Target</label>
                           <input
                              type="text"
                              value={depForm.relationship}
                              onChange={(e) => setDepForm({...depForm, relationship: e.target.value})}
                              className="w-full bg-[#050505] border border-outline-variant/30 px-4 py-2.5 text-xs focus:outline-none focus:border-tertiary text-gray-200"
                              placeholder="e.g. Daughter, Spouse"
                           />
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[10px] uppercase text-gray-500 font-bold tracking-widest flex items-center gap-1"><HeartPulse className="w-3 h-3 text-red-500"/> Specific / Medical Needs</label>
                           <input
                              type="text"
                              value={depForm.medicalNeeds}
                              onChange={(e) => setDepForm({...depForm, medicalNeeds: e.target.value})}
                              className="w-full bg-[#050505] border border-outline-variant/30 px-4 py-2.5 text-xs focus:outline-none focus:border-tertiary text-gray-200"
                              placeholder="e.g. Asthma medication, None"
                           />
                        </div>
                     </div>
                     
                     <div className="flex justify-end">
                        <button
                           onClick={handleAddDependent}
                           disabled={!depForm.name || !depForm.age || !depForm.relationship}
                           className="bg-tertiary text-black px-8 py-2.5 font-bold text-xs tracking-widest uppercase hover:bg-tertiary/90 transition-colors disabled:opacity-30 flex items-center gap-2"
                        >
                           <Activity className="w-4 h-4"/> Submit Profile
                        </button>
                     </div>
                  </div>
               )}

               {/* Dependents List Grid */}
               {(!data.dependents || data.dependents.length === 0) ? (
                  <div className="h-full flex flex-col items-center justify-center py-20 text-gray-600 opacity-50">
                     <Users className="w-20 h-20 mb-4" />
                     <p className="text-xs uppercase tracking-[0.3em] font-bold">No Associated Personnel</p>
                     <p className="text-[10px] mt-2 max-w-xs text-center">Use the intake form above to add family members or dependents to this extraction plan.</p>
                  </div>
               ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     {data.dependents.map((dep: any, i: number) => (
                        <div key={i} className="bg-[#050508] border border-outline-variant/20 rounded-lg p-5 relative overflow-hidden group hover:border-tertiary/40 transition-colors">
                           <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-tertiary/80 to-transparent"></div>
                           
                           <div className="flex justify-between items-start mb-4">
                              <div>
                                 <h3 className="text-lg font-black text-gray-100 tracking-tight">{dep.name}</h3>
                                 <p className="text-[10px] uppercase tracking-widest text-tertiary/80 flex items-center gap-2 mt-1">
                                    <span>{dep.relationship}</span> • <span>{dep.age} Y/O</span>
                                 </p>
                              </div>
                              <span className="text-[9px] bg-tertiary/10 text-tertiary border border-tertiary/20 px-2 py-1 rounded tracking-widest uppercase font-bold">
                                 {dep.id}
                              </span>
                           </div>

                           <div className="space-y-3 mt-5">
                              <div className="bg-black/50 p-2.5 rounded border border-white/5 flex items-start gap-3">
                                 <HeartPulse className="w-4 h-4 text-red-500/70 mt-0.5 shrink-0"/>
                                 <div>
                                    <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Medical / Specific Needs</p>
                                    <p className="text-xs text-gray-300 mt-0.5">{dep.medicalNeeds || "None specified"}</p>
                                 </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                 <div className="bg-black/50 p-2.5 rounded border border-white/5">
                                    <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">Status</p>
                                    <p className="text-[10px] font-mono uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                                       <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span> {dep.status}
                                    </p>
                                 </div>
                                 <div className="bg-black/50 p-2.5 rounded border border-white/5">
                                    <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1">Clearance</p>
                                    <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400">{dep.clearanceStatus}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
