"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";

export default function ExtractionPage() {
  const [data, setData] = useState<{ coverage: number; camerasCaged: number }>({
    coverage: 0,
    camerasCaged: 0,
  });
  const [active, setActive] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const startAttack = () => {
    if (ws.current) return;
    ws.current = new WebSocket(
      "ws://localhost:8080/ws/v1/ops/extraction/proj-attacker"
    );
    ws.current.onopen = () => setActive(true);
    ws.current.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setData(msg);
    };
    ws.current.onclose = () => {
      setActive(false);
      ws.current = null;
    };
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
                <p className="text-xs uppercase tracking-widest text-red-900">Tactical Extraction</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span className="text-[10px] text-green-700 uppercase font-bold">In-Field [Active]</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-xs uppercase tracking-widest text-red-800">
             <div className="flex justify-between border-b border-red-950 pb-1"><span>Target:</span> <span className="text-red-500">Subject_TR-12</span></div>
             <div className="flex justify-between border-b border-red-950 pb-1"><span>Grid:</span> <span className="text-red-500">Sector 4, Alpha</span></div>
             <div className="flex justify-between"><span>Status:</span> <span className="text-red-500">En Route</span></div>
          </div>
        </div>

        {/* ALERTS */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-xs font-bold uppercase tracking-widest text-red-700 mb-4">Tactical Comms</h3>
          <div className="space-y-4">
            <div className="p-3 border border-red-900 bg-red-950/10 text-xs">
               <div className="flex justify-between items-center text-red-500 font-bold mb-1">
                 <span>[UPDATE] UAV Patrol</span>
                 <span className="text-[10px]">12:04</span>
               </div>
               <p className="text-red-800">Hostile drone detected in sector 4. Prepare IR jamming.</p>
            </div>
            <div className="p-3 border border-red-950 bg-black/50 text-xs">
               <div className="flex justify-between items-center text-red-700 font-bold mb-1">
                 <span>[CLEAR] Safehouse B</span>
                 <span className="text-[10px]">11:45</span>
               </div>
               <p className="text-red-900">Perimeter secured. Awaiting package drop.</p>
            </div>
          </div>
        </div>
        
        {/* LOGOUT */}
        <div className="p-4 border-t border-red-950">
           <Link href="/" className="flex items-center justify-center gap-2 w-full py-2 bg-red-950 text-red-500 hover:bg-red-900 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">
              Abort Mission
           </Link>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Grid Background Effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-5 pointer-events-none"></div>

        <header className="p-6 flex items-center justify-between border-b border-red-950 z-10 bg-[#050000]/80 backdrop-blur">
          <div className="flex gap-6 text-xs uppercase font-bold tracking-widest">
            <span className="text-red-500 border-b-2 border-red-500 pb-1">ProjAttacker (TR-25)</span>
            <span className="text-red-900 cursor-not-allowed">Surveillance Feed (Offline)</span>
            <span className="text-red-900 cursor-not-allowed">Routing & Maps</span>
          </div>
          <div className="text-xs text-red-500 border border-red-900 px-3 py-1 bg-red-950/30">
            LOCAL TIME: {new Date().toLocaleTimeString()}
          </div>
        </header>

        <div className="flex-1 p-10 z-10 overflow-y-auto flex items-center justify-center">
          <div className="max-w-3xl w-full">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold tracking-tighter text-red-600 mb-4 uppercase">Adversarial Projections</h2>
              <p className="text-sm text-red-800">Deploy infrared noise to blind CCTV cameras and hostile drones during extraction.</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-10">
              {/* Coverage Gauge */}
              <div className="bg-black border border-red-900 rounded p-8 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute top-0 w-full h-1 bg-red-950"></div>
                <p className="text-red-900 mb-2 font-bold uppercase tracking-widest text-xs z-10">IR Noise Saturation</p>
                <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-red-950">
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle cx="60" cy="60" r="56" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-red-900" />
                    <circle cx="60" cy="60" r="56" fill="transparent" stroke="currentColor" strokeWidth="4" 
                      strokeDasharray="351.8" 
                      strokeDashoffset={351.8 - (351.8 * data.coverage) / 100}
                      className="text-red-500 transition-all duration-300" />
                  </svg>
                  <span className="text-4xl font-bold text-white z-10">{data.coverage}<span className="text-xl text-red-600">%</span></span>
                </div>
              </div>

              {/* Targets Neutralized */}
              <div className="bg-black border border-red-900 rounded p-8 flex flex-col items-center justify-center relative">
                <div className="absolute top-0 w-full h-1 bg-red-950"></div>
                <p className="text-red-900 mb-2 font-bold uppercase tracking-widest text-xs">Cameras Blinded</p>
                <p className="text-6xl font-black text-orange-600 drop-shadow-[0_0_15px_rgba(234,88,12,0.5)]">
                  {data.camerasCaged}
                </p>
                <p className="text-[10px] mt-4 text-red-800 tracking-widest uppercase">
                  {data.coverage === 100 ? "[ MAXIMUM DISRUPTION ]" : "[ SEARCHING... ]"}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={startAttack}
                disabled={active}
                className={`group relative w-full max-w-md py-5 font-bold uppercase tracking-widest text-lg border-2 overflow-hidden transition-all ${
                  active
                    ? "bg-red-950/50 border-red-900 text-red-800 cursor-not-allowed"
                    : "bg-red-900 border-red-600 hover:bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)]"
                }`}
              >
                {active ? (
                  <span className="relative z-10 animate-pulse">Engaging Targets...</span>
                ) : (
                  <>
                    <span className="relative z-10 group-hover:scale-105 inline-block transition-transform">Initiate Sequence</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
