"use client";
import React, { useEffect, useState } from "react";
import { User, ShieldAlert, CreditCard, Building, Users } from 'lucide-react';

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null);
  const [newDep, setNewDep] = useState("");
  const subjectId = "subject-123";

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/identities/${subjectId}/portfolio`)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  if (!data) return (
     <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-tertiary">
        <span className="animate-pulse tracking-[0.3em]">DECRYPTING LEDGER...</span>
     </div>
  );

  return (
    <div className="min-h-screen bg-[#0e0e10] text-gray-300 p-8 md:p-12 font-mono flex flex-col md:flex-row gap-12">
      {/* LEFT COLUMN: THE ID BADGE */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
         <div className="flex items-center gap-3 border-b border-primary/30 pb-4 mb-4">
            <ShieldAlert className="text-primary w-8 h-8" />
            <div>
               <h1 className="text-xl font-bold tracking-[0.2em] text-primary uppercase">Legacy_Asset</h1>
               <p className="text-[10px] text-gray-500 tracking-widest uppercase">Off-Grid Identity Portfolio</p>
            </div>
         </div>

         {/* ID CARD */}
         <div className="bg-surface-container-low border border-primary/20 rounded-xl overflow-hidden shadow-2xl relative group">
            <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-primary to-tertiary"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
            
            <div className="p-6 flex gap-6">
               <div className="w-32 h-32 bg-black border border-primary/30 rounded overflow-hidden shadow-inner relative flex-shrink-0">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-screen z-10"></div>
                  <img src={data.photoUrl} alt="Avatar" className="w-full h-full object-cover filter contrast-125" />
                  <div className="absolute bottom-0 w-full bg-primary/80 text-[8px] font-bold text-black text-center py-0.5 tracking-widest uppercase backdrop-blur-md z-20">
                     Validated
                  </div>
               </div>
               <div className="flex flex-col justify-center space-y-2">
                  <div>
                     <p className="text-[9px] uppercase text-primary/70 font-bold tracking-widest">Legal Name (Alias)</p>
                     <p className="text-lg font-black text-white tracking-tight">{data.alias}</p>
                  </div>
                  <div>
                     <p className="text-[9px] uppercase text-primary/70 font-bold tracking-widest">Passport / ID</p>
                     <p className="text-sm font-mono text-gray-300">{data.passportNum}</p>
                  </div>
                  <div>
                     <p className="text-[9px] uppercase text-primary/70 font-bold tracking-widest">Clearance Level</p>
                     <p className="text-xs font-mono text-tertiary uppercase">{data.clearance}</p>
                  </div>
               </div>
            </div>
            
            <div className="bg-black/40 px-6 py-4 border-t border-primary/10 flex justify-between items-center">
               <div className="text-[10px] text-gray-500 uppercase tracking-widest">Issue Date: {new Date().toLocaleDateString()}</div>
               <div className="h-6 w-24 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e9/UPC-A-036000291452.svg')] bg-cover bg-center filter invert opacity-50 mix-blend-lighten"></div>
            </div>
         </div>
      </div>

      {/* RIGHT COLUMN: DETAILS & DEPENDENTS */}
      <div className="w-full md:w-2/3 flex flex-col gap-8 mt-2">
         {/* Core Details Grid */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-5 border-l-2 border-primary/50 flex gap-4">
               <User className="text-primary/50 w-6 h-6" />
               <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Occupation</p>
                  <p className="text-sm text-gray-200">{data.jobTitle}</p>
               </div>
            </div>
            <div className="bg-surface-container-low p-5 border-l-2 border-tertiary/50 flex gap-4">
               <CreditCard className="text-tertiary/50 w-6 h-6" />
               <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Credit Score</p>
                  <p className="text-sm text-gray-200 font-bold">{data.creditScore} <span className="text-[9px] text-green-500 font-normal ml-1">EXCELLENT</span></p>
               </div>
            </div>
            <div className="bg-surface-container-low p-5 border-l-2 border-primary/50 col-span-2 flex gap-4">
               <Building className="text-primary/50 w-6 h-6" />
               <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Registered Address (Safehouse)</p>
                  <p className="text-sm text-gray-200">{data.address}</p>
               </div>
            </div>
         </div>

         {/* Backstory */}
         <div className="bg-surface-container-lowest border border-outline-variant/20 p-6 relative">
            <div className="absolute top-0 right-0 p-2 opacity-10">
               <ShieldAlert className="w-16 h-16" />
            </div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80 mb-4 border-b border-primary/10 pb-2">Legend / Backstory (TR-2)</h2>
            <p className="text-sm leading-relaxed text-gray-400 italic">"{data.backstory}"</p>
         </div>

         {/* Dependents Box */}
         <div className="bg-surface-container-lowest border border-outline-variant/20 p-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-tertiary/80 mb-4 border-b border-tertiary/10 pb-2 flex items-center gap-2">
               <Users className="w-4 h-4" />
               Linked Dependents (TR-3)
            </h2>
            
            <div className="space-y-3 mb-6">
               {data.dependents?.map((d: string, i: number) => (
                  <div key={i} className="flex justify-between items-center bg-black/30 p-3 border border-outline-variant/10 text-sm">
                     <span className="text-gray-300 font-bold uppercase tracking-wider">{d}</span>
                     <span className="text-[9px] bg-tertiary/20 text-tertiary px-2 py-1 rounded">VINCULATED</span>
                  </div>
               ))}
               {(!data.dependents || data.dependents.length === 0) && (
                  <div className="text-center py-6 text-xs text-gray-600 uppercase tracking-widest border border-dashed border-gray-800">
                     No dependents registered under this portfolio.
                  </div>
               )}
            </div>

            {/* Add Dependent Form */}
            <div className="flex flex-col sm:flex-row gap-3">
               <input
                  type="text"
                  placeholder="ENTER ALIAS FOR NEW DEPENDENT..."
                  value={newDep}
                  onChange={(e) => setNewDep(e.target.value)}
                  className="bg-black border border-outline-variant/30 px-4 py-3 text-xs w-full focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary text-gray-200 uppercase tracking-wider placeholder:text-gray-700"
               />
               <button
                  onClick={async () => {
                     if (!newDep) return;
                     const res = await fetch(`http://localhost:8080/api/v1/identities/${subjectId}/dependents`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: newDep }),
                     });
                     setData(await res.json());
                     setNewDep("");
                  }}
                  disabled={!newDep}
                  className="bg-tertiary text-black px-6 py-3 font-bold text-xs tracking-widest uppercase hover:bg-tertiary/80 transition-colors disabled:opacity-50 whitespace-nowrap"
               >
                  Link Profile
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
