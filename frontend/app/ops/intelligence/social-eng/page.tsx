"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UserSearch, ShieldAlert, Fingerprint, Share2, Search, BrainCircuit } from "lucide-react";

export default function SocialEngPage() {
  const [target, setTarget] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const startAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult({
        vulnerability: 74,
        leaks: ["Correo corporativo (LinkedIn)", "Patrón de contraseñas (Cumpleaños hijo)", "Ubicación gimnasio (Strava)"],
        connections: 124,
        key_traits: ["Exceso de confianza", "Dependencia de validación", "Rutina predecible"]
      });
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#050e05] text-green-500 font-mono flex">
      {/* SIDEBAR: OPERATOR PROFILE */}
      <aside className="w-72 border-r border-green-900 flex flex-col bg-[#020602] shrink-0 hidden md:flex">
        <div className="p-6 border-b border-green-900">
          <h1 className="text-xl font-bold tracking-widest text-green-400 mb-2">TABULA_RASA</h1>
          <p className="text-xs uppercase tracking-widest text-green-800">SIGINT / Inteligencia de Red</p>
        </div>
        
        <div className="p-6 border-b border-green-900 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-green-400">person_search</span>
            </div>
            <div>
              <p className="font-bold text-sm">OPERADOR: CYPHER</p>
              <p className="text-xs text-green-700">LVL AUTH: 5 (ALPHA)</p>
            </div>
          </div>
          <div className="text-xs space-y-1 text-green-600">
            <p className="flex justify-between"><span>NODO:</span> <span className="text-green-400">PXR-77</span></p>
            <p className="flex justify-between"><span>UBICACIÓN:</span> <span className="text-green-400">Desconocida (Tor)</span></p>
            <p className="flex justify-between"><span>GEO-IP:</span> <span className="text-green-400">194.150.xxx.xx</span></p>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="p-6 border-b border-green-900 flex-1 overflow-y-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-between">
            Alertas Pendientes <span className="bg-green-800 text-black px-2 py-0.5 rounded-sm">2</span>
          </h2>
          <div className="space-y-3">
            <div className="bg-green-950/30 border-l-2 border-green-500 p-3 text-xs text-green-400">
              <p className="font-bold mb-1">[URGENTE] Sincronización BD Interpol</p>
              <p className="text-green-700">Anomalía detectada en perfil objetivo 802A. Se requiere envenenamiento inmediato.</p>
            </div>
            <div className="bg-green-950/30 border-l-2 border-green-800 p-3 text-xs text-green-600">
              <p className="font-bold mb-1">[INFO] Extracción Grafo Social</p>
              <p className="text-green-800">Extracción completa para 3 asociados de TR-14.</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Link href="/" className="text-xs uppercase tracking-widest text-green-800 hover:text-green-400 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">logout</span> Terminar Sesión
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOPBAR */}
        <header className="h-16 border-b border-green-900 flex items-center justify-between px-8 bg-[#020602]/80 backdrop-blur-sm shrink-0">
          <div className="flex space-x-8 text-xs uppercase tracking-widest font-bold">
            <Link href="/ops/intelligence" className="text-green-800 hover:text-green-600 transition-colors pb-1">Envenenamiento de Datos</Link>
            <Link href="/ops/intelligence/social-eng" className="text-green-400 border-b-2 border-green-400 pb-1">Analizador Ing. Social</Link>
            <Link href="/ops/intelligence/dog-whistling" className="text-green-800 hover:text-green-600 transition-colors pb-1">Copias Dog Whistling</Link>
          </div>
          <div className="text-xs text-green-600 font-bold tracking-widest flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             Sistema en Línea
          </div>
        </header>

        {/* WORKSPACE */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto flex flex-col gap-8 h-full">
            <div className="border-b border-green-900 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-green-400 mb-2 uppercase flex items-center gap-3">
                 <UserSearch className="w-8 h-8 md:w-10 md:h-10" />
                 Analizador de Ingeniería Social
              </h2>
              <p className="text-xs md:text-sm text-green-700 max-w-3xl font-mono">
                 Mapeo de vulnerabilidades psicológicas y digitales. Cruce de datos OSINT para identificar vectores de entrada mediante manipulación.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* INPUT AREA */}
              <div className="space-y-6">
                 <div className="bg-black border border-green-900 rounded-lg p-6 shadow-xl">
                    <label className="block text-[10px] font-bold text-green-700 uppercase tracking-widest mb-3">
                       Identificador / Perfil de Redes Sociales
                    </label>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         value={target}
                         onChange={(e) => setTarget(e.target.value)}
                         placeholder="@usuario o ID_Objetivo..."
                         className="flex-1 bg-green-950/20 border border-green-900 rounded px-4 py-2 text-green-300 focus:outline-none focus:border-green-500 font-mono text-sm"
                       />
                       <button 
                         onClick={startAnalysis}
                         disabled={analyzing || !target}
                         className="bg-green-600 text-black px-6 py-2 font-bold uppercase text-[10px] hover:bg-green-400 transition-all disabled:opacity-50"
                       >
                          {analyzing ? "Escaneando..." : "Analizar"}
                       </button>
                    </div>
                 </div>

                 {analyzing && (
                    <div className="bg-green-950/10 border border-green-900/50 rounded-lg p-10 flex flex-col items-center justify-center gap-4 text-center">
                       <BrainCircuit className="w-12 h-12 text-green-500 animate-spin" />
                       <p className="text-xs text-green-600 animate-pulse font-mono tracking-widest">
                          RECOLECTANDO METADATOS...<br/>
                          CRUZANDO REGISTROS DE BRECHAS...<br/>
                          GENERANDO PERFIL PSICOLÓGICO...
                       </p>
                    </div>
                 )}

                 {!analyzing && !result && (
                    <div className="h-64 border border-green-900/30 border-dashed rounded-lg flex flex-col items-center justify-center text-green-900">
                       <Search className="w-16 h-16 opacity-20 mb-4" />
                       <p className="text-xs uppercase tracking-widest">Esperando Vector de Entrada</p>
                    </div>
                 )}

                 {result && (
                   <div className="bg-black border border-green-900 rounded-lg p-6 shadow-2xl animate-fade-in space-y-6">
                      <div className="flex justify-between items-center">
                         <h3 className="text-xs font-bold uppercase tracking-widest text-green-500">Resultado del Perfilado</h3>
                         <span className="text-[10px] bg-red-900/40 text-red-500 px-2 py-1 rounded">RIESGO CRÍTICO</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                         <div className="bg-green-950/20 p-4 rounded border border-green-900/50 flex flex-col items-center">
                            <span className="text-[8px] text-green-700 uppercase mb-1">Vulnerabilidad</span>
                            <span className="text-2xl font-black text-green-400">{result.vulnerability}%</span>
                         </div>
                         <div className="bg-green-950/20 p-4 rounded border border-green-900/50 flex flex-col items-center">
                            <span className="text-[8px] text-green-700 uppercase mb-1">Conexiones</span>
                            <span className="text-2xl font-black text-green-400">{result.connections}</span>
                         </div>
                         <div className="bg-green-950/20 p-4 rounded border border-green-900/50 flex flex-col items-center">
                            <span className="text-[8px] text-green-700 uppercase mb-1">Nivel Leak</span>
                            <span className="text-2xl font-black text-orange-500">HI</span>
                         </div>
                      </div>

                      <div>
                         <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest mb-2">Filtraciones Detectadas</p>
                         <ul className="space-y-1">
                            {result.leaks.map((leak: string, i: number) => (
                              <li key={i} className="text-[11px] text-green-500 flex items-center gap-2">
                                 <ShieldAlert className="w-3 h-3 text-red-500" /> {leak}
                              </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                 )}
              </div>

              {/* GRAPH / VISUAL AREA */}
              <div className="flex flex-col gap-4">
                 <div className="bg-black border border-green-900 rounded-lg p-6 flex-1 relative overflow-hidden flex flex-col min-h-[400px]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-green-700 mb-6 flex items-center gap-2">
                       <Share2 className="w-4 h-4" /> Grafo de Relaciones Cercanas
                    </h3>
                    
                    <div className="flex-1 relative">
                       {/* Simulated Graph Visualization */}
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center z-10 animate-pulse">
                             <Fingerprint className="w-10 h-10 text-green-400" />
                          </div>
                          {/* Connection Lines */}
                          {[...Array(6)].map((_, i) => (
                            <div 
                              key={i} 
                              className="absolute h-0.5 bg-green-900/40 origin-left"
                              style={{ width: '120px', transform: `rotate(${i * 60}deg)` }}
                            >
                               <div className="absolute right-0 w-8 h-8 -mt-4 bg-green-950 border border-green-800 rounded-full flex items-center justify-center animate-[bounce_2s_infinite]" style={{ animationDelay: `${i*0.3}s` }}>
                                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="mt-6 bg-green-950/30 p-4 rounded border border-green-900/50">
                       <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                          <BrainCircuit className="w-3 h-3" /> Rasgos de Personalidad Detectados
                       </p>
                       <div className="flex flex-wrap gap-2">
                          {result?.key_traits.map((trait: string, i: number) => (
                             <span key={i} className="text-[9px] bg-green-900 text-green-300 px-2 py-1 rounded">
                                {trait}
                             </span>
                          )) || <span className="text-[9px] text-green-800 italic">No hay datos disponibles</span>}
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
