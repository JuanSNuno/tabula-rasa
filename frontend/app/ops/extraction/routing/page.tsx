"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Map as MapIcon, Navigation, Target, Route, Crosshair, Menu, Zap, Video, LogOut } from "lucide-react";

export default function RoutingPage() {
  const [position, setPosition] = useState({ x: 45, y: 30 });
  const [routeLogs, setRouteLogs] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate subtle movement
      setPosition(prev => ({
        x: prev.x + (Math.random() - 0.5) * 2,
        y: prev.y + (Math.random() - 0.5) * 2
      }));

      const nodes = ["Nudo Alpha-9", "Callejón Trasero", "Punto de Extracción B", "Bloque Residencial 4", "Zona de Sombra"];
      if (Math.random() > 0.8) {
        setRouteLogs(prev => [`[INFO] Calculando desviación vía ${nodes[Math.floor(Math.random() * nodes.length)]}...`, ...prev].slice(0, 8));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 lg:p-10 flex flex-col justify-start min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-red-950 pb-4 mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-red-600 uppercase flex items-center gap-4">
                 <MapIcon className="w-8 h-8 md:w-10 md:h-10" />
                 Enrutamiento Táctico
              </h2>
              <p className="text-xs md:text-sm text-red-800 mt-2 max-w-2xl">Mapeo de rutas de escape y seguimiento GPS del sujeto. Los nodos de sombra indican zonas sin cobertura de cámaras aliadas.</p>
            </div>
            <div className="bg-red-950/20 border border-red-900 px-4 py-2 rounded">
               <span className="text-[10px] text-red-700 font-bold block">COORDENADAS</span>
               <span className="text-sm font-mono text-red-500">{position.x.toFixed(4)} N / {position.y.toFixed(4)} E</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden min-h-[500px]">
            {/* TACTICAL MAP SIMULATION */}
            <div className="lg:col-span-2 relative bg-[#0a0000] border border-red-900 rounded-xl overflow-hidden shadow-2xl min-h-[400px]">
               {/* Grid Pattern */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                     <pattern id="grid-routing" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#dc2626" strokeWidth="0.5"/>
                     </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-routing)" />
               </svg>

               {/* Simulated Map Elements */}
               <div className="absolute inset-0 p-10">
                  {/* Buildings / Obstacles */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-48 bg-red-950/20 border border-red-900/40 rounded rotate-12"></div>
                  <div className="absolute top-1/2 right-1/3 w-40 h-24 bg-red-950/20 border border-red-900/40 rounded -rotate-6"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-red-950/20 border border-red-900/40 rounded-full"></div>
                  
                  {/* Escape Route Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                     <path 
                       d="M 100 500 Q 300 300 500 100" 
                       fill="none" 
                       stroke="#dc2626" 
                       strokeWidth="2" 
                       strokeDasharray="8,4" 
                       className="opacity-30"
                     />
                  </svg>

                  {/* Subject Marker */}
                  <div 
                    className="absolute transition-all duration-1000 ease-in-out"
                    style={{ left: `${position.x}%`, top: `${position.y}%` }}
                  >
                     <div className="relative">
                        <div className="absolute -inset-4 bg-red-500/20 rounded-full animate-ping"></div>
                        <Crosshair className="w-6 h-6 text-red-500 filter drop-shadow-[0_0_5px_rgba(220,38,38,1)]" />
                        <div className="absolute top-6 left-6 bg-black/80 border border-red-500 p-1 rounded text-[8px] whitespace-nowrap text-red-500 font-bold">
                           TR-12 [ACTIVO]
                        </div>
                     </div>
                  </div>

                  {/* Extraction Point */}
                  <div className="absolute bottom-20 right-20">
                     <Target className="w-10 h-10 text-green-500/50 animate-pulse" />
                     <span className="text-[8px] text-green-500 font-bold block text-center mt-1">LZ_ALPHA</span>
                  </div>
               </div>

               {/* Compass Overlay */}
               <div className="absolute top-4 right-4 w-12 h-12 border border-red-900/50 rounded-full flex items-center justify-center bg-black/50">
                  <Navigation className="w-6 h-6 text-red-800 rotate-45" />
               </div>
            </div>

            {/* ROUTING INFO & LOGS */}
            <div className="flex flex-col gap-6">
               <div className="bg-black border border-red-900 rounded-lg p-6 flex flex-col gap-4 shadow-xl">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-red-600 flex items-center gap-2">
                     <Route className="w-4 h-4" /> Cálculo de Trayectoria
                  </h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center border-b border-red-950 pb-2">
                        <span className="text-[10px] text-red-800 font-bold uppercase">Distancia al LZ</span>
                        <span className="text-sm font-mono text-red-500">1.4 km</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-red-950 pb-2">
                        <span className="text-[10px] text-red-800 font-bold uppercase">Tiempo Est.</span>
                        <span className="text-sm font-mono text-red-500">04:12 min</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-red-950 pb-2">
                        <span className="text-[10px] text-red-800 font-bold uppercase">Riesgo de Interceptación</span>
                        <span className="text-sm font-mono text-orange-500">BAJO (12%)</span>
                     </div>
                  </div>
               </div>

               <div className="bg-black border border-red-900 rounded-lg p-6 flex-1 flex flex-col shadow-xl overflow-hidden min-h-[200px]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-red-700 mb-4">Nav_System Logs</h3>
                  <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[10px]">
                     {routeLogs.map((log, i) => (
                        <div key={i} className="text-red-900 flex gap-2">
                           <span className="text-red-600 font-black shrink-0">&gt;</span>
                           <span>{log}</span>
                        </div>
                     ))}
                     <div className="animate-pulse text-red-600">_</div>
                  </div>
               </div>

               <button className="w-full py-4 bg-red-900/20 border border-red-500 text-red-500 font-bold uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all rounded shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                  Recalcular Ruta de Emergencia
               </button>
            </div>
          </div>
    </div>
  );
}
