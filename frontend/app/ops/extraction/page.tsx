"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function ExtractionPage() {
  const [data, setData] = useState<{ coverage: number; camerasCaged: number; jammingPower: number; tick: number }>({
    coverage: 0,
    camerasCaged: 0,
    jammingPower: 0,
    tick: 0
  });
  const [history, setHistory] = useState<any[]>(Array(30).fill({ tick: 0, power: 0, coverage: 0 }));
  const [active, setActive] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const startAttack = () => {
    if (ws.current) return;
    
    const connectWs = () => {
      const socket = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080"}/ws/v1/ops/extraction/proj-attacker`
      );
      
      socket.onopen = () => {
        setActive(true);
        ws.current = socket;
      };
      
      socket.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        setData(msg);
        setHistory(prev => {
           const updated = [...prev, { tick: msg.tick, power: msg.jammingPower, coverage: msg.coverage }];
           return updated.slice(-30); // Keep last 30 ticks
        });
      };
      
      socket.onclose = () => {
        setActive(false);
        ws.current = null;
      };

      socket.onerror = () => {
        console.warn("WebSocket connection failed. Starting DEMO MOCK MODE.");
        startMockMode();
      };
    };

    const startMockMode = () => {
      setActive(true);
      let currentTick = 0;
      const interval = setInterval(() => {
        currentTick++;
        const mockData = {
          tick: currentTick,
          coverage: Math.min(100, currentTick * 0.8 + Math.random() * 5),
          camerasCaged: Math.floor(currentTick / 5),
          jammingPower: Math.floor(180 + Math.random() * 40)
        };
        
        setData(mockData);
        setHistory(prev => {
           const updated = [...prev, { tick: mockData.tick, power: mockData.jammingPower, coverage: mockData.coverage }];
           return updated.slice(-30);
        });

        if (currentTick >= 130) {
          clearInterval(interval);
          setActive(false);
        }
      }, 500);

      // Clean up mock interval if component unmounts
      const cleanup = () => {
        clearInterval(interval);
        setActive(false);
      };
      // Store cleanup as ws.current dummy
      (ws.current as any) = { close: cleanup };
    };

    connectWs();
  };

  return (
    <div className="flex h-screen bg-[#070000] font-mono text-red-500">
      {/* SIDEBAR */}
      <aside className="w-80 flex flex-col bg-[#050000] border-r border-red-900 shadow-2xl z-10">
        <div className="p-6 border-b border-red-950 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-widest text-red-600">TABULA_RASA</h1>
          <span className="material-symbols-outlined text-red-900 animate-pulse">crisis_alert</span>
        </div>
        
        {/* PROFILE */}
        <div className="p-6 border-b border-red-950">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 border border-red-800 bg-red-950/20 rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-red-700">security</span>
              </div>
              <div>
                <h2 className="font-bold tracking-widest text-sm text-red-500">OP: NOMAD</h2>
                <p className="text-xs uppercase tracking-widest text-red-900">Extracción Táctica</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span className="text-[10px] text-green-700 uppercase font-bold">En Campo [Activo]</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-xs uppercase tracking-widest text-red-800">
             <div className="flex justify-between border-b border-red-950 pb-1"><span>Objetivo:</span> <span className="text-red-500">Sujeto_TR-12</span></div>
             <div className="flex justify-between border-b border-red-950 pb-1"><span>Cuadrícula:</span> <span className="text-red-500">Sector 4, Alpha</span></div>
             <div className="flex justify-between"><span>Estado:</span> <span className="text-red-500">En Camino</span></div>
          </div>
        </div>

        {/* ALERTS */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-xs font-bold uppercase tracking-widest text-red-700 mb-4">Comunicaciones Tácticas</h3>
          <div className="space-y-4">
            <div className="p-3 border border-red-900 bg-red-950/10 text-xs">
               <div className="flex justify-between items-center text-red-500 font-bold mb-1">
                 <span>[ACTUALIZACIÓN] Patrulla UAV</span>
                 <span className="text-[10px]">12:04</span>
               </div>
               <p className="text-red-800">Dron hostil detectado en el sector 4. Prepare interferencia IR.</p>
            </div>
            <div className="p-3 border border-red-950 bg-black/50 text-xs">
               <div className="flex justify-between items-center text-red-700 font-bold mb-1">
                 <span>[DESPEJADO] Casa de Seguridad B</span>
                 <span className="text-[10px]">11:45</span>
               </div>
               <p className="text-red-900">Perímetro asegurado. Esperando entrega del paquete.</p>
            </div>
          </div>
        </div>
        
        {/* LOGOUT */}
        <div className="p-4 border-t border-red-950">
           <Link href="/" className="flex items-center justify-center gap-2 w-full py-2 bg-red-950 text-red-500 hover:bg-red-900 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">
              Abortar Misión
           </Link>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 flex flex-col relative overflow-y-auto md:overflow-hidden h-full">
        {/* Grid Background Effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-5 pointer-events-none"></div>

        <header className="p-6 flex items-center justify-between border-b border-red-950 z-10 bg-[#050000]/80 backdrop-blur">
          <div className="flex gap-6 text-xs uppercase font-bold tracking-widest">
            <span className="text-red-500 border-b-2 border-red-500 pb-1">ProjAttacker (TR-25)</span>
            <span className="text-red-900 cursor-not-allowed">Transmisión de Vigilancia (Desconectado)</span>
            <span className="text-red-900 cursor-not-allowed">Enrutamiento y Mapas</span>
          </div>
          <div className="text-xs text-red-500 border border-red-900 px-3 py-1 bg-red-950/30">
            HORA LOCAL: {new Date().toLocaleTimeString()}
          </div>
        </header>

        <div className="flex-1 p-10 z-10 overflow-y-auto flex flex-col justify-start">
          <div className="max-w-6xl w-full mx-auto">
            <div className="flex justify-between items-end mb-8 border-b border-red-950 pb-4">
              <div>
                <h2 className="text-4xl font-black tracking-tighter text-red-600 uppercase flex items-center gap-4">
                   <span className="material-symbols-outlined text-4xl">radar</span>
                   Proyecciones Adversarias
                </h2>
                <p className="text-sm text-red-800 mt-2 max-w-2xl">Despliegue ruido infrarrojo para cegar cámaras CCTV y drones hostiles durante la extracción. La interferencia de alta potencia saturará los sensores visuales.</p>
              </div>
              
              {/* Action Button */}
              <button
                onClick={startAttack}
                disabled={active}
                className={`group relative px-8 py-4 font-bold uppercase tracking-widest text-sm border-2 overflow-hidden transition-all ${
                  active
                    ? "bg-red-950/50 border-red-900 text-red-700 cursor-not-allowed"
                    : "bg-red-900 border-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
                }`}
              >
                {active ? (
                  <span className="relative z-10 flex items-center gap-2">
                     <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                     Iniciando...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10 group-hover:scale-105 inline-block transition-transform">Iniciar Ataque</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {/* Radar Animation / Coverage Gauge */}
              <div className="bg-black border border-red-900 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl h-[350px]">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-red-950 via-red-600 to-red-950"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none"></div>
                
                <p className="text-red-800 mb-6 font-bold uppercase tracking-[0.3em] text-[10px] z-10">Saturación de Ruido IR</p>
                
                <div className="relative flex items-center justify-center w-48 h-48 rounded-full border border-red-950/50 bg-red-950/10 shadow-[inset_0_0_50px_rgba(220,38,38,0.1)]">
                  {/* Radar Sweep */}
                  {active && (
                     <div className="absolute w-full h-full rounded-full overflow-hidden z-0">
                        <div className="w-1/2 h-1/2 bg-gradient-to-br from-red-500/40 to-transparent origin-bottom-right animate-[spin_2s_linear_infinite]"></div>
                     </div>
                  )}
                  {/* Circular Progress */}
                  <svg className="absolute w-full h-full transform -rotate-90 z-10">
                    <circle cx="96" cy="96" r="92" fill="transparent" stroke="currentColor" strokeWidth="2" className="text-red-900/30" />
                    <circle cx="96" cy="96" r="92" fill="transparent" stroke="currentColor" strokeWidth="6" 
                      strokeDasharray="578" 
                      strokeDashoffset={578 - (578 * data.coverage) / 100}
                      className="text-red-600 transition-all duration-300 filter drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                  </svg>
                  
                  {/* Center Value */}
                  <div className="flex flex-col items-center z-20">
                     <span className="text-5xl font-black text-white drop-shadow-md">{Math.floor(data.coverage)}<span className="text-2xl text-red-600">%</span></span>
                     <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-1 opacity-70">Cobertura</span>
                  </div>
                </div>
              </div>

              {/* Live Signal Chart */}
              <div className="col-span-2 bg-black border border-red-900 rounded-xl p-6 relative overflow-hidden shadow-2xl flex flex-col h-[350px]">
                 <div className="absolute inset-0 bg-red-950/5 pointer-events-none"></div>
                 <div className="flex justify-between items-center mb-6 z-10">
                    <p className="text-red-800 font-bold uppercase tracking-[0.3em] text-[10px]">Potencia de Interferencia de Señal (dBm)</p>
                    <p className="text-2xl font-bold text-red-500">{data.jammingPower} <span className="text-sm text-red-800">W</span></p>
                 </div>
                 
                 <div className="flex-1 w-full z-10">
                    <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={history} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#450a0a" vertical={false} />
                          <YAxis hide domain={[0, 250]} />
                          <Line type="step" dataKey="power" stroke="#dc2626" strokeWidth={2} dot={false} isAnimationActive={false} />
                          <Line type="monotone" dataKey="coverage" stroke="#f97316" strokeWidth={1} strokeOpacity={0.5} dot={false} isAnimationActive={false} />
                       </LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>
            </div>

            {/* Bottom Targets Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-6 flex flex-col items-center">
                  <span className="material-symbols-outlined text-red-800 text-4xl mb-2">videocam_off</span>
                  <p className="text-[10px] text-red-700 font-bold uppercase tracking-widest text-center">Cámaras Cegadas</p>
                  <p className="text-5xl font-black text-orange-500 mt-2">{data.camerasCaged}</p>
               </div>
               <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-6 flex flex-col items-center">
                  <span className="material-symbols-outlined text-red-800 text-4xl mb-2">flight_takeoff</span>
                  <p className="text-[10px] text-red-700 font-bold uppercase tracking-widest text-center">UAVs Interrumpidos</p>
                  <p className="text-5xl font-black text-red-500 mt-2">{Math.floor(data.camerasCaged / 3)}</p>
               </div>
               <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-6 flex justify-center items-center">
                  <div className="text-center">
                     <p className="text-[10px] text-red-700 font-bold uppercase tracking-[0.2em] mb-4">Estado del Sistema</p>
                     <p className={`text-xl font-bold uppercase tracking-widest ${data.coverage > 95 ? 'text-green-500 animate-pulse' : 'text-red-600'}`}>
                        {data.coverage > 95 ? 'OBJETIVO ASEGURADO' : (active ? 'DESPLEGANDO RUIDO' : 'EN ESPERA')}
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
