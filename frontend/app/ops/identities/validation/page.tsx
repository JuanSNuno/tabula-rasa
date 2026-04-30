"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Fingerprint, Database, Globe, UserCircle, Activity, ShieldCheck, Network, RefreshCw, LogOut } from 'lucide-react';

export default function ValidationNodesPage() {
  const [validating, setValidating] = useState(false);
  const [nodes, setNodes] = useState([
    { id: "INTERPOL-EU", status: "pending", progress: 0, result: null },
    { id: "SWIFT-FIN", status: "pending", progress: 0, result: null },
    { id: "DMV-GLOBAL", status: "pending", progress: 0, result: null },
    { id: "SOCIAL-GRAPH", status: "pending", progress: 0, result: null }
  ]);
  const [targetId, setTargetId] = useState("");

  const startValidation = () => {
    setValidating(true);
    
    // Reset nodes
    setNodes(nodes.map(n => ({ ...n, status: "processing", progress: 0, result: null })));

    nodes.forEach((node, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setNodes(prev => prev.map((n, i) => i === index ? { 
            ...n, 
            progress: 100, 
            status: "complete", 
            result: Math.random() > 0.1 ? "VERIFIED" : "FLAGGED" 
          } : n));
        } else {
          setNodes(prev => prev.map((n, i) => i === index ? { ...n, progress } : n));
        }
      }, 500 + (index * 200));
    });

    setTimeout(() => setValidating(false), 5000);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0a0512] font-mono text-purple-200 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-full md:w-80 flex flex-col bg-[#05020a] border-b md:border-b-0 md:border-r border-purple-900/40 shadow-2xl z-10 font-mono shrink-0 hidden md:flex">
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
        <div className="absolute inset-0 pointer-events-none opacity-20">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
           <svg className="w-full h-full text-purple-900/20" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
        </div>

        {/* TOPBAR */}
        <header className="p-6 flex items-center justify-between border-b border-purple-900/30 z-10 bg-[#0a0512]/90 backdrop-blur-md">
          <div className="flex gap-8 text-[11px] uppercase font-bold tracking-widest">
            <Link href="/ops/identities" className="text-purple-800 hover:text-purple-400 transition-colors flex items-center gap-2"><Globe className="w-4 h-4"/> Generador de Andamios</Link>
            <Link href="/ops/identities/validation" className="text-purple-400 border-b border-purple-400 pb-1 flex items-center gap-2"><Database className="w-4 h-4"/> Nodos de Validación</Link>
          </div>
          <div className="text-[10px] text-purple-600 font-bold tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-500 animate-pulse"/> NÚCLEO GENERATIVO: <span className="text-green-500">EN LÍNEA</span>
          </div>
        </header>

        <div className="flex-1 p-8 lg:p-12 overflow-y-auto z-10">
          <div className="flex flex-col gap-8 h-full">
            <div className="border-b border-purple-900 pb-4">
              <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-2 uppercase flex items-center gap-3">
                 <Database className="w-8 h-8 md:w-10 md:h-10 text-purple-600" />
                 Nodos de Validación
              </h2>
              <p className="text-xs md:text-sm text-purple-400/80 max-w-3xl font-mono leading-relaxed">
                 Monitor de la red descentralizada de pruebas de conocimiento cero (zk-SNARKs). Verifica que las identidades sintéticas generadas se integren en las bases de datos globales sin disparar alarmas criptográficas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
              {/* CONTROL PANEL */}
              <div className="flex flex-col gap-6">
                 <div className="bg-[#05020a] border border-purple-900/50 rounded-xl p-6 shadow-2xl">
                    <label className="block mb-3 text-[10px] font-bold uppercase tracking-widest text-purple-400">
                       Identificador de Andamio (SCAF-ID):
                    </label>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         value={targetId}
                         onChange={(e) => setTargetId(e.target.value)}
                         placeholder="ej: SCAF-8492"
                         className="flex-1 bg-black/50 border border-purple-800/40 rounded px-4 py-3 text-purple-200 focus:outline-none focus:border-purple-500 font-mono text-sm"
                       />
                       <button 
                         onClick={startValidation}
                         disabled={validating || !targetId}
                         className="bg-purple-700 text-white px-6 py-3 font-bold uppercase text-[10px] tracking-widest rounded hover:bg-purple-600 transition-all disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                       >
                          {validating ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Auditar"}
                       </button>
                    </div>
                 </div>

                 <div className="bg-purple-950/10 border border-purple-900/30 p-6 rounded-xl flex-1 flex flex-col shadow-inner">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-purple-500 mb-4 flex items-center gap-2">
                       <Network className="w-4 h-4" /> Topología de Red ZK
                    </h3>
                    <div className="flex-1 relative min-h-[200px]">
                       {/* Visual Representation of Network */}
                       <div className="absolute inset-0 flex items-center justify-center opacity-30">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                             <circle cx="50" cy="50" r="40" fill="none" stroke="#9333ea" strokeWidth="0.5" strokeDasharray="2 2" className="animate-[spin_20s_linear_infinite]" />
                             <circle cx="50" cy="50" r="25" fill="none" stroke="#a855f7" strokeWidth="1" className="animate-[spin_10s_linear_infinite_reverse]" />
                             
                             {/* Nodes */}
                             <circle cx="50" cy="10" r="3" fill="#d8b4fe" className="animate-pulse" />
                             <circle cx="90" cy="50" r="3" fill="#d8b4fe" className="animate-pulse" style={{animationDelay: "0.5s"}} />
                             <circle cx="50" cy="90" r="3" fill="#d8b4fe" className="animate-pulse" style={{animationDelay: "1s"}} />
                             <circle cx="10" cy="50" r="3" fill="#d8b4fe" className="animate-pulse" style={{animationDelay: "1.5s"}} />
                             
                             <circle cx="50" cy="50" r="5" fill="#a855f7" />
                          </svg>
                       </div>
                    </div>
                 </div>
              </div>

              {/* NODES STATUS */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
                 {nodes.map((node) => (
                   <div key={node.id} className="bg-[#05020a] border border-purple-900/50 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
                      <div className="flex justify-between items-start mb-6 z-10 relative">
                         <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded border flex items-center justify-center
                              ${node.status === 'complete' && node.result === 'VERIFIED' ? 'bg-green-950/50 border-green-700 text-green-500' : 
                                node.status === 'complete' && node.result === 'FLAGGED' ? 'bg-red-950/50 border-red-700 text-red-500' :
                                'bg-purple-950/50 border-purple-700 text-purple-500'}`}
                            >
                               {node.status === 'complete' ? <ShieldCheck className="w-4 h-4" /> : <Database className="w-4 h-4" />}
                            </div>
                            <div>
                               <h4 className="text-xs font-bold text-white tracking-wider">{node.id}</h4>
                               <p className="text-[9px] uppercase tracking-widest text-purple-500">
                                 {node.status === 'pending' ? 'ESPERANDO' : node.status === 'processing' ? 'SINCRONIZANDO...' : 'FINALIZADO'}
                               </p>
                            </div>
                         </div>
                         
                         {node.result && (
                           <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest
                             ${node.result === 'VERIFIED' ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}
                           `}>
                              {node.result}
                           </span>
                         )}
                      </div>

                      <div className="relative z-10">
                         <div className="flex justify-between text-[8px] text-purple-600 mb-1 font-mono">
                            <span>PROGRESO DEL HASH</span>
                            <span>{node.progress}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-purple-950 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300
                                ${node.status === 'complete' && node.result === 'FLAGGED' ? 'bg-red-500' : 
                                  node.status === 'complete' && node.result === 'VERIFIED' ? 'bg-green-500' : 
                                  'bg-purple-500'}`}
                              style={{ width: `${node.progress}%` }}
                            ></div>
                         </div>
                      </div>

                      {/* Background scanning effect */}
                      {node.status === 'processing' && (
                        <div className="absolute top-0 left-0 h-full w-2 bg-purple-500/20 animate-[scan_2s_linear_infinite] shadow-[0_0_20px_rgba(168,85,247,0.5)] blur-[2px]"></div>
                      )}
                   </div>
                 ))}

                 {/* SUMMARY REPORT */}
                 {nodes.every(n => n.status === 'complete') && targetId && (
                   <div className="md:col-span-2 bg-black border border-green-900/50 p-6 rounded-xl animate-fade-in flex items-center justify-between">
                      <div>
                         <h3 className="text-sm font-bold uppercase tracking-widest text-green-500 mb-1">Auditoría Completada</h3>
                         <p className="text-xs text-purple-300 font-mono">La identidad sintética [{targetId}] ha sido propagada exitosamente a través de la red global sin levantar sospechas sistémicas.</p>
                      </div>
                      <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center text-green-500">
                         <ShieldCheck className="w-8 h-8" />
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
