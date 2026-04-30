"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Video, VideoOff, Activity, ShieldAlert, Wifi, Eye } from "lucide-react";

export default function SurveillancePage() {
  const [cameras, setCameras] = useState([
    { id: "CAM-01", label: "Perímetro Norte", status: "online", motion: false },
    { id: "CAM-02", label: "Acceso Principal", status: "online", motion: true },
    { id: "CAM-03", label: "Pasillo B-4", status: "jammed", motion: false },
    { id: "CAM-04", label: "Azotea", status: "online", motion: false },
  ]);

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCameras(prev => prev.map(cam => ({
        ...cam,
        motion: cam.status === "online" ? Math.random() > 0.8 : false
      })));

      const events = [
        "Sujeto detectado en CAM-02",
        "Pérdida de señal intermitente en CAM-03",
        "Patrulla UAV detectada en sector visual CAM-04",
        "Sincronizando feeds con el centro de mando...",
        "Detección de calor anómala en CAM-01"
      ];
      
      if (Math.random() > 0.7) {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${events[Math.floor(Math.random() * events.length)]}`, ...prev].slice(0, 10));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 lg:p-10 flex flex-col justify-start min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-red-950 pb-4 mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-red-600 uppercase flex items-center gap-4">
                 <Video className="w-8 h-8 md:w-10 md:h-10" />
                 Vigilancia Táctica
              </h2>
              <p className="text-xs md:text-sm text-red-800 mt-2 max-w-2xl">Monitorización en tiempo real de feeds de cámaras locales y drones. Utilice esta vista para coordinar el movimiento del sujeto evitando patrullas.</p>
            </div>
            <div className="flex gap-4">
               <div className="flex flex-col items-end">
                  <span className="text-[10px] text-red-900 font-bold uppercase tracking-widest">Estado Global</span>
                  <span className="text-green-500 font-bold text-sm flex items-center gap-1">
                     <Wifi className="w-3 h-3" /> ENCRIPTADO
                  </span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1 overflow-hidden min-h-[500px]">
            {/* CAMERA FEEDS */}
            <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 pb-10">
              {cameras.map((cam) => (
                <div key={cam.id} className="relative aspect-video bg-black border border-red-900/50 rounded-lg overflow-hidden group">
                   {/* Video Content Simulation */}
                   <div className={`absolute inset-0 opacity-40 mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] ${cam.status === 'jammed' ? 'animate-pulse' : ''}`}></div>
                   
                   {cam.status === "online" ? (
                     <div className="absolute inset-0 flex items-center justify-center">
                        {/* Simulated "Visuals" */}
                        <div className="w-full h-full flex items-center justify-center relative">
                           <div className="absolute inset-0 border-[20px] border-transparent border-t-red-900/10 border-l-red-900/10"></div>
                           <Activity className={`w-12 h-12 text-red-900/20 ${cam.motion ? 'animate-ping' : ''}`} />
                           
                           {/* Motion Box */}
                           {cam.motion && (
                             <div className="absolute border-2 border-red-500/50 w-24 h-32 animate-pulse flex items-start justify-start p-1">
                                <span className="text-[8px] bg-red-500 text-white font-bold">HUMAN_DET</span>
                             </div>
                           )}
                        </div>
                     </div>
                   ) : (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/20">
                        <VideoOff className="w-12 h-12 text-red-900 mb-2" />
                        <span className="text-xs font-bold text-red-700 uppercase tracking-widest">Señal Perdida / Interferida</span>
                     </div>
                   )}

                   {/* Overlays */}
                   <div className="absolute top-0 w-full p-3 flex justify-between items-start z-10">
                      <div className="bg-black/80 px-2 py-1 border border-red-900/50 rounded flex flex-col">
                         <span className="text-[10px] font-black text-white">{cam.id}</span>
                         <span className="text-[8px] text-red-500 uppercase font-bold">{cam.label}</span>
                      </div>
                      {cam.motion && (
                        <div className="bg-red-600 px-2 py-0.5 rounded animate-pulse flex items-center gap-1">
                           <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                           <span className="text-[8px] text-white font-bold uppercase">Movimiento</span>
                        </div>
                      )}
                   </div>

                   <div className="absolute bottom-0 w-full p-2 bg-gradient-to-t from-black to-transparent">
                      <div className="flex justify-between items-center text-[8px] text-red-700/80 font-mono">
                         <span>REC: {new Date().toLocaleDateString()}</span>
                         <span>FPS: {cam.status === 'online' ? (24 + Math.floor(Math.random() * 5)) : 0}</span>
                      </div>
                   </div>

                   {/* SCAN LINE EFFECT */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-red-500/10 animate-[scan_4s_linear_infinite] pointer-events-none"></div>
                </div>
              ))}
            </div>

            {/* SIDEBAR TOOLS */}
            <div className="flex flex-col gap-4 pb-10">
               {/* LOGS */}
               <div className="bg-black border border-red-900 rounded-lg p-4 flex-1 flex flex-col shadow-2xl">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                     <ShieldAlert className="w-4 h-4" /> Registro de Eventos
                  </h3>
                  <div className="flex-1 overflow-y-auto space-y-2 font-mono">
                     {logs.length === 0 && (
                       <p className="text-red-900/50 text-xs italic text-center mt-10">Escaneando entorno...</p>
                     )}
                     {logs.map((log, i) => (
                       <p key={i} className="text-[10px] text-red-500/80 border-b border-red-950/30 pb-1">
                          {log}
                       </p>
                     ))}
                  </div>
               </div>

               {/* SYSTEM HEALTH */}
               <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-red-700 mb-3">Integridad del Enlace</h3>
                  <div className="space-y-3">
                     <div>
                        <div className="flex justify-between text-[10px] mb-1">
                           <span>ANCHO DE BANDA</span>
                           <span className="text-red-500">88.4 Mbps</span>
                        </div>
                        <div className="h-1 bg-red-950 rounded-full overflow-hidden">
                           <div className="h-full bg-red-600 w-[85%]"></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-[10px] mb-1">
                           <span>LATENCIA</span>
                           <span className="text-green-500">12ms</span>
                        </div>
                        <div className="h-1 bg-red-950 rounded-full overflow-hidden">
                           <div className="h-full bg-green-600 w-[15%]"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
    </div>
  );
}
