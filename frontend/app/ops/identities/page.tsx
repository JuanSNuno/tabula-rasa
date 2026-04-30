"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Fingerprint, Database, Globe, UserCircle, Activity, Server, Hash, FileText, CheckCircle2, Menu, X, LogOut } from 'lucide-react';

export default function IdentitiesPage() {
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const steps = [
    "Compilando semilla demográfica...",
    "Sintetizando biometría facial (GAN-04)...",
    "Generando modelos vocales deep-fake...",
    "Inyectando registros académicos en nodos universitarios...",
    "Retrotrayendo historial financiero (2014-2024)...",
    "Propagando anomalías del grafo social...",
    "Finalizando libro mayor criptográfico..."
  ];

  const generate = async () => {
    setLoading(true);
    setResult(null);
    setProgress(0);
    
    // Simulate complex step-by-step progress
    for (let i = 0; i < steps.length; i++) {
      setActiveStep(steps[i]);
      await new Promise(r => setTimeout(r, 600 + Math.random() * 800));
      setProgress(Math.round(((i + 1) / steps.length) * 100));
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/ops/identities/scaffold`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed }),
      });
      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        // FALLBACK PARA LA DEMO
        const mockId = "SCAF-" + Math.floor(Math.random() * 9000 + 1000);
        setResult({
          id: mockId,
          seed: seed,
          identity: {
            photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockId}`,
            alias: "Generated Persona " + Math.floor(Math.random() * 100),
            passportNum: "EU-" + Math.floor(Math.random() * 90000000 + 10000000),
            jobTitle: "Cyber-Logistics Engineer"
          },
          documents: [
            "Academic Degree: M.S. Distributed Systems (2014) - Validated via forged transcripts.",
            "Financial History: 10 years of consistent tax returns & payroll deposits.",
            "Social Graph: 34 active synthetic accounts simulating standard peer connections.",
            "Biometric Injection: Passport hash seeded into 5 major border control nodes."
          ],
          status: "GENERATED"
        });
      }
    } catch (err) {
      // FALLBACK PARA LA DEMO
      const mockId = "SCAF-OFFLINE-" + Math.floor(Math.random() * 9000 + 1000);
      setResult({
        id: mockId,
        seed: seed,
        identity: {
          photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockId}`,
          alias: "Offline Persona " + Math.floor(Math.random() * 100),
          passportNum: "EU-" + Math.floor(Math.random() * 90000000 + 10000000),
          jobTitle: "Cyber-Logistics Engineer"
        },
        documents: [
          "Academic Degree: M.S. Distributed Systems (2014) - Validated via forged transcripts.",
          "Financial History: 10 years of consistent tax returns & payroll deposits.",
          "Social Graph: 34 active synthetic accounts simulating standard peer connections.",
          "Biometric Injection: Passport hash seeded into 5 major border control nodes."
        ],
        status: "GENERATED"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0512] font-mono text-purple-200 overflow-hidden">
      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:relative w-80 h-full flex flex-col bg-[#05020a] border-r border-purple-900/40 shadow-2xl z-50 transition-transform duration-300 shrink-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-6 border-b border-purple-900/30 flex items-center justify-between">
          <h1 className="text-xl font-black tracking-widest text-purple-500 uppercase">TABULA_RASA</h1>
          <Fingerprint className="text-purple-600 w-6 h-6" />
        </div>
        
        {/* PROFILE */}
        <div className="p-6 border-b border-purple-900/30">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-900/40 rounded flex items-center justify-center border border-purple-700/50">
              <UserCircle className="text-purple-400 w-8 h-8" />
            </div>
            <div>
              <h2 className="font-bold tracking-widest text-sm text-purple-300">OP: MIRAGE</h2>
              <p className="text-[10px] uppercase tracking-widest text-purple-600">Arquitecto de Identidad</p>
            </div>
          </div>
          
          <div className="space-y-1.5 text-xs text-purple-500 bg-purple-950/20 p-3 rounded border border-purple-900/20">
             <div className="flex justify-between"><span>NODO:</span> <span className="text-purple-300 font-bold">Genesis-01</span></div>
             <div className="flex justify-between"><span>UBICACIÓN:</span> <span className="text-purple-300">Clúster de la Deep Web</span></div>
             <div className="flex justify-between"><span>AUTORIZACIÓN:</span> <span className="text-purple-300">Nivel 8 (Omega)</span></div>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-purple-600 mb-4 flex justify-between items-center">
             Cola de Forja
             <span className="bg-purple-900 text-purple-200 px-1.5 rounded-sm">3</span>
          </h3>
          <div className="space-y-3">
            <div className="p-3 border-l-2 border-orange-500 bg-purple-950/30 text-xs hover:bg-purple-900/30 transition-colors cursor-pointer">
               <p className="text-purple-300 font-bold mb-1">[ADVERTENCIA] Pasaporte P-4399</p>
               <p className="text-purple-500/80">Incompatibilidad de hash biométrico en el nodo de validación de interpol.</p>
            </div>
            <div className="p-3 border-l-2 border-purple-500 bg-purple-950/30 text-xs hover:bg-purple-900/30 transition-colors cursor-pointer">
               <p className="text-purple-300 font-bold mb-1">[NUEVO] Sujeto_TR-15</p>
               <p className="text-purple-500/80">Ingreso listo. Esperando andamio generativo.</p>
            </div>
            <div className="p-3 border-l-2 border-green-500 bg-purple-950/30 text-xs hover:bg-purple-900/30 transition-colors cursor-pointer">
               <p className="text-purple-300 font-bold mb-1">[OK] Historial Crediticio</p>
               <p className="text-purple-500/80">Retrotraimiento financiero completado para el Alias 'M. Silva'.</p>
            </div>
          </div>
        </div>
        
        {/* LOGOUT */}
        <div className="p-4 border-t border-purple-900/30">
           <Link href="/" className="flex items-center justify-center gap-2 w-full py-3 bg-purple-950/50 text-purple-400 hover:bg-purple-900 hover:text-purple-200 transition-colors text-[10px] font-bold tracking-widest uppercase rounded border border-purple-900/30">
              <LogOut className="w-4 h-4" /> Cerrar sesión
           </Link>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background Grid & Map Simulation */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
           <svg className="w-full h-full text-purple-900/20" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>

        {/* TOPBAR */}
        <header className="p-4 lg:p-6 flex items-center justify-between border-b border-purple-900/30 z-10 bg-[#0a0512]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
             <button 
               className="lg:hidden text-purple-500 p-1 hover:bg-purple-900/20 rounded"
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu className="w-6 h-6" />
             </button>
             <div className="hidden lg:flex gap-8 text-[11px] uppercase font-bold tracking-widest">
               <Link href="/ops/identities" className="text-purple-400 border-b-2 border-purple-400 pb-1 flex items-center gap-2 transition-colors"><Globe className="w-4 h-4"/> Generador de Andamios</Link>
               <Link href="/ops/identities/validation" className="text-purple-800 hover:text-purple-400 transition-colors flex items-center gap-2 pb-1"><Database className="w-4 h-4"/> Nodos de Validación</Link>
             </div>
             <div className="lg:hidden text-[11px] font-bold uppercase tracking-widest text-purple-500">
                Andamios
             </div>
          </div>
          <div className="text-[10px] text-purple-600 font-bold tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-500 animate-pulse"/> <span className="hidden sm:inline">NÚCLEO GENERATIVO:</span> <span className="text-green-500">EN LÍNEA</span>
          </div>
        </header>

        {/* MOBILE NAVIGATION TABS */}
        <div className="lg:hidden flex overflow-x-auto border-b border-purple-900/30 bg-[#0a0512]/90 z-10 shrink-0 no-scrollbar">
          <Link href="/ops/identities" className="whitespace-nowrap px-4 py-3 text-[10px] uppercase font-bold tracking-widest text-purple-400 border-b-2 border-purple-400 bg-purple-950/20">Andamios</Link>
          <Link href="/ops/identities/validation" className="whitespace-nowrap px-4 py-3 text-[10px] uppercase font-bold tracking-widest text-purple-800 hover:text-purple-500 transition-colors">Validación ZK</Link>
        </div>

        <div className="flex-1 p-4 lg:p-8 xl:p-12 overflow-y-auto z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10">
            
            {/* LEFT COL: Input & Status */}
            <div className="flex flex-col gap-8">
               <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4 uppercase flex items-center gap-3">
                     <Hash className="text-purple-600 w-8 h-8 md:w-10 md:h-10"/> Falsificación Sintética
                  </h2>
                  <p className="text-xs md:text-sm text-purple-400/80 leading-relaxed font-mono">
                     Despliegue redes generativas adversarias para sintetizar una huella humana completa. Incluye registros gubernamentales retroactivos, expedientes académicos y hashes faciales.
                  </p>
               </div>

               {/* GENERATOR TOOL */}
               <div className="bg-[#05020a] border border-purple-900/50 p-6 rounded-xl shadow-2xl relative">
                  <label className="block mb-3 text-[10px] font-bold uppercase tracking-widest text-purple-400">
                     Vector Objetivo (Demografía / Semilla):
                  </label>
                  <textarea
                     className="w-full bg-black/50 border border-purple-800/40 rounded-lg p-5 text-sm text-purple-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-purple-900/50 resize-none shadow-inner h-32"
                     placeholder="ej. 'Hombre, 34 años, analista de ciberseguridad, residencia anterior en Europa del Este...'"
                     value={seed}
                     onChange={(e) => setSeed(e.target.value)}
                  />
                  
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                     <span className="text-[10px] text-purple-500/50 uppercase">
                        {seed.length} caracteres
                     </span>
                     <button
                       onClick={generate}
                       disabled={loading || !seed}
                       className={`w-full sm:w-auto px-8 py-4 rounded text-[10px] font-black uppercase tracking-[0.2em] transition-all overflow-hidden relative group ${
                          loading || !seed
                             ? "bg-purple-950/30 text-purple-800 border border-purple-900/30 cursor-not-allowed"
                             : "bg-purple-700 hover:bg-purple-600 text-white shadow-[0_0_30px_rgba(147,51,234,0.4)]"
                       }`}
                     >
                       {loading ? (
                          <span className="flex items-center gap-3">
                             <Server className="w-4 h-4 animate-spin"/> Procesando
                          </span>
                       ) : (
                          <>
                             <span className="relative z-10">Iniciar Andamio</span>
                             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                          </>
                       )}
                     </button>
                  </div>
               </div>

               {/* LIVE PROGRESS */}
               {loading && (
                  <div className="bg-[#05020a] border border-purple-900/50 p-6 rounded-xl shadow-2xl">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 animate-pulse">
                           {activeStep}
                        </span>
                        <span className="text-lg font-black text-white">{progress}%</span>
                     </div>
                     <div className="w-full bg-purple-950/50 h-2 rounded-full overflow-hidden mb-6">
                        <div className="bg-purple-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                     </div>
                     
                     {/* Fake console logs */}
                     <div className="h-24 overflow-hidden text-[9px] text-purple-500/60 flex flex-col justify-end space-y-1 font-mono">
                        <p>[{new Date().toISOString()}] WARN: Eludiendo captchas en el nodo #44.</p>
                        <p>[{new Date().toISOString()}] INFO: Asignando 4.2GB para renderizado neuronal.</p>
                        <p>[{new Date().toISOString()}] SEC: Conexión establecida de forma segura con el Registro de la UE.</p>
                        <p>[{new Date().toISOString()}] RUN: {activeStep} -- force=true</p>
                     </div>
                  </div>
               )}
            </div>

            {/* RIGHT COL: Output & Preview */}
            <div className="flex flex-col h-full min-h-[400px]">
               {result && !loading ? (
                  <div className="bg-[#05020a] border border-green-900/50 rounded-xl shadow-2xl flex flex-col h-full overflow-hidden animate-fade-in">
                     <div className="bg-green-950/20 border-b border-green-900/30 p-4 flex justify-between items-center">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-500 flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4"/> Andamio Desplegado
                        </h3>
                        <span className="text-[10px] bg-green-900/40 text-green-400 px-2 py-1 rounded font-mono">ID: {result.id}</span>
                     </div>
                     
                     <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
                        {/* Profile Card Preview */}
                        {result.identity && (
                           <div className="flex flex-col sm:flex-row gap-6 mb-8 border-b border-purple-900/30 pb-8">
                              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded bg-black border border-green-900 overflow-hidden relative shadow-[0_0_20px_rgba(34,197,94,0.1)] shrink-0 mx-auto sm:mx-0">
                                 <img src={result.identity.photoUrl} alt="Generated Face" className="w-full h-full object-cover filter contrast-125 grayscale" />
                                 <div className="absolute inset-0 bg-green-500/10 mix-blend-color-burn"></div>
                                 <div className="absolute bottom-0 w-full bg-black/80 text-[7px] text-center py-1 text-green-500 uppercase tracking-widest backdrop-blur">Coincidencia 99.8%</div>
                              </div>
                              <div className="flex flex-col justify-center gap-2 text-center sm:text-left">
                                 <div>
                                    <p className="text-[8px] text-green-700 uppercase tracking-widest font-bold">Alias</p>
                                    <p className="text-xl font-black text-white tracking-tight">{result.identity.alias}</p>
                                 </div>
                                 <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                       <p className="text-[8px] text-green-700 uppercase tracking-widest">Pasaporte</p>
                                       <p className="text-[11px] text-green-400">{result.identity.passportNum}</p>
                                    </div>
                                    <div>
                                       <p className="text-[8px] text-green-700 uppercase tracking-widest">Puesto</p>
                                       <p className="text-[11px] text-green-400">{result.identity.jobTitle}</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )}

                        {/* Documents List */}
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-500 mb-4 flex items-center gap-2">
                           <FileText className="w-4 h-4"/> Artefactos Falsificados
                        </h4>
                        <div className="space-y-3">
                           {result.documents.map((doc: string, i: number) => (
                              <div key={i} className="bg-black/40 border border-purple-900/30 p-3 rounded-lg flex items-start gap-4 hover:border-purple-500/50 transition-colors">
                                 <FileText className="w-4 h-4 text-purple-600 mt-0.5 shrink-0"/>
                                 <p className="text-[11px] text-purple-200 leading-relaxed font-mono">{doc}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="h-full border border-purple-900/30 border-dashed rounded-xl flex flex-col items-center justify-center text-purple-800/50 p-10 text-center relative overflow-hidden bg-black/20">
                     <Globe className="w-16 h-16 md:w-24 md:h-24 mb-6 opacity-20" />
                     <p className="text-xs md:text-sm font-bold uppercase tracking-widest mb-2">Esperando Directiva de Generación</p>
                     <p className="text-[10px] max-w-sm">Proporcione una semilla demográfica para comenzar a sintetizar una huella digital y física completa en redes globales objetivo.</p>
                     
                     {/* Decorative background nodes */}
                     <div className="absolute inset-0 pointer-events-none opacity-10">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
                        <div className="absolute top-3/4 left-2/3 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{animationDelay: "1s"}}></div>
                        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{animationDelay: "2s"}}></div>
                     </div>
                  </div>
               )}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
