"use client";

import React, { useState, useEffect } from 'react';

interface EvacRouteMapProps {
  messages?: string[];
}

export default function EvacRouteMap({ messages = [] }: EvacRouteMapProps) {
  const [scanning, setScanning] = useState(true);
  const [routeVariant, setRouteVariant] = useState<'default' | 'norte' | 'sur' | 'oriente' | 'occidente'>('default');

  // Evaluar los mensajes del chat para cambiar dinámicamente la ruta
  useEffect(() => {
    if (messages.length === 0) return;
    
    // Concatenamos todos los mensajes recientes para buscar palabras clave
    const chatContext = messages.join(' ').toLowerCase();
    
    if (chatContext.includes('norte')) {
      setRouteVariant('norte');
    } else if (chatContext.includes('sur')) {
      setRouteVariant('sur');
    } else if (chatContext.includes('occidente') || chatContext.includes('oeste')) {
      setRouteVariant('occidente');
    } else if (chatContext.includes('oriente') || chatContext.includes('este')) {
      setRouteVariant('oriente');
    }
  }, [messages]);

  // Configuración de rutas dinámica
  const routeConfigs = {
    default: {
      points: "150,400 300,350 450,200 650,150",
      n1: { x: 150, y: 400, label: "ORIGIN (RED_ZONE)", desc: "Proceed on foot through service corridor B." },
      n2: { x: 300, y: 350, label: "CP_01: BLIND_ALLEY", desc: "Cross the subterranean transit nexus." },
      n3: { x: 450, y: 200, label: "CP_02: ASSET_SWAP", desc: "Enter the unmarked sedan (Plates: ██-██-██)." },
      n4: { x: 650, y: 150, label: "EXFIL_POINT", desc: "Board transport vessel. Destination: SAFE_ZONE." },
      grid: "SECTOR_7_ECHO"
    },
    norte: {
      points: "400,450 420,300 400,150 450,50",
      n1: { x: 400, y: 450, label: "ORIGIN (SOUTH_GATE)", desc: "Exit via southern loading dock. Head due NORTH." },
      n2: { x: 420, y: 300, label: "CP_01: HIGHLINE", desc: "Ascend to elevated walkway. Avoid patrol drones." },
      n3: { x: 400, y: 150, label: "CP_02: THE_ROOST", desc: "Retrieve parachute cache. Prepare for HALO jump." },
      n4: { x: 450, y: 50, label: "EXFIL: AERO_LINK", desc: "Deploy chute. Intercept by stealth chopper." },
      grid: "SECTOR_NORTH_9"
    },
    sur: {
      points: "350,50 350,200 450,350 350,450",
      n1: { x: 350, y: 50, label: "ORIGIN (NORTH_TOWER)", desc: "Take service elevator to subterranean level." },
      n2: { x: 350, y: 200, label: "CP_01: SEWER_MAIN", desc: "Enter drainage system. Follow markings south." },
      n3: { x: 450, y: 350, label: "CP_02: CATAMARAN", desc: "Board waiting submersible vessel." },
      n4: { x: 350, y: 450, label: "EXFIL: DEEP_SEA", desc: "Submerge. Link with extraction sub." },
      grid: "SECTOR_SOUTH_4"
    },
    occidente: {
      points: "700,250 500,280 250,220 50,250",
      n1: { x: 700, y: 250, label: "ORIGIN (EAST_WING)", desc: "Move West through the abandoned mall." },
      n2: { x: 500, y: 280, label: "CP_01: METRO_WEST", desc: "Board westbound train. Jump before terminal." },
      n3: { x: 250, y: 220, label: "CP_02: DESERT_LINK", desc: "Locate dirt bike in storage unit #404." },
      n4: { x: 50, y: 250, label: "EXFIL: BORDER_RUN", desc: "Cross western boundary. No pursuit likely." },
      grid: "SECTOR_WEST_1"
    },
    oriente: {
      points: "100,250 300,200 550,300 750,250",
      n1: { x: 100, y: 250, label: "ORIGIN (WEST_COAST)", desc: "Proceed East via freight train." },
      n2: { x: 300, y: 200, label: "CP_01: RAIL_YARD", desc: "Disembark at yard. Switch to cargo truck." },
      n3: { x: 550, y: 300, label: "CP_02: MOUNTAIN_PASS", desc: "Drive over eastern range. Avoid tolls." },
      n4: { x: 750, y: 250, label: "EXFIL: EAST_HARBOR", desc: "Board cargo ship heading overseas." },
      grid: "SECTOR_EAST_3"
    }
  };

  const currentRoute = routeConfigs[routeVariant];

  // Simulate initial map decryption
  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom duration-500">
      
      {/* Top Warning Banner */}
      <div className="bg-error-dim/40 border border-error/50 p-4 flex items-start gap-4">
        <span className="material-symbols-outlined text-error animate-pulse text-2xl">warning</span>
        <div>
          <h3 className="text-error font-black text-xs uppercase tracking-[0.2em] mb-1">
            CRITICAL MEMORY CACHE NOTICE
          </h3>
          <p className="text-[10px] text-error/80 uppercase tracking-widest leading-relaxed">
            THIS TACTICAL MAP IS RENDERED ENTIRELY IN THE BROWSER'S VOLATILE MEMORY VIA INLINE VECTOR GRAPHICS. 
            NO EXTERNAL MAP APIs (GOOGLE/OSM) ARE USED. NO GEO-TELEMETRY IS TRANSMITTED. 
            UPON CLOSING THIS TAB, ALL ROUTE DATA IS MATHEMATICALLY DESTROYED.
          </p>
        </div>
      </div>

      <div className="flex gap-6 h-[500px]">
        {/* Left Side: SVG Map Render */}
        <div className="w-2/3 bg-[#050505] border border-outline-variant/30 relative overflow-hidden flex items-center justify-center">
          {/* Overlay grid lines for tactical feel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          {scanning ? (
            <div className="flex flex-col items-center gap-4 text-primary">
              <span className="material-symbols-outlined text-4xl animate-spin">radar</span>
              <span className="text-[10px] font-mono tracking-widest animate-pulse uppercase">Decrypting Route Topology...</span>
            </div>
          ) : (
            <svg width="100%" height="100%" viewBox="0 0 800 500" className="absolute inset-0 transition-all duration-1000">
              {/* Route Lines */}
              <polyline 
                points={currentRoute.points} 
                fill="none" 
                stroke="var(--color-primary)" 
                strokeWidth="3" 
                strokeDasharray="10 5"
                className="opacity-50 transition-all duration-1000"
              />
              
              {/* Animated Path Overlay */}
              <polyline 
                points={currentRoute.points} 
                fill="none" 
                stroke="var(--color-tertiary-container)" 
                strokeWidth="4" 
                strokeDasharray="800"
                strokeDashoffset="800"
              >
                <animate 
                  attributeName="stroke-dashoffset" 
                  from="800" 
                  to="0" 
                  dur="4s" 
                  fill="freeze" 
                  key={routeVariant} // reset animation on change
                />
              </polyline>

              {/* Node 1: Origin */}
              <circle cx={currentRoute.n1.x} cy={currentRoute.n1.y} r="8" fill="var(--color-surface-container-high)" stroke="var(--color-outline-variant)" strokeWidth="2" className="transition-all duration-1000" />
              <text x={currentRoute.n1.x - 10} y={currentRoute.n1.y + 25} fill="var(--color-on-surface-variant)" fontSize="10" fontFamily="monospace" letterSpacing="1" className="transition-all duration-1000">{currentRoute.n1.label}</text>

              {/* Node 2: Blind Transit */}
              <circle cx={currentRoute.n2.x} cy={currentRoute.n2.y} r="6" fill="var(--color-surface-container-high)" stroke="var(--color-primary)" strokeWidth="2" className="transition-all duration-1000" />
              <text x={currentRoute.n2.x + 15} y={currentRoute.n2.y - 5} fill="var(--color-primary)" fontSize="10" fontFamily="monospace" letterSpacing="1" className="transition-all duration-1000">{currentRoute.n2.label}</text>

              {/* Node 3: Vehicle Switch */}
              <circle cx={currentRoute.n3.x} cy={currentRoute.n3.y} r="8" fill="var(--color-primary)" stroke="var(--color-tertiary-container)" strokeWidth="2" className="animate-pulse transition-all duration-1000" />
              <text x={currentRoute.n3.x + 20} y={currentRoute.n3.y - 5} fill="var(--color-tertiary-container)" fontSize="10" fontFamily="monospace" letterSpacing="1" fontWeight="bold" className="transition-all duration-1000">{currentRoute.n3.label}</text>
              
              {/* Node 4: Exfil (Target) */}
              <polygon points={`${currentRoute.n4.x},${currentRoute.n4.y-10} ${currentRoute.n4.x+10},${currentRoute.n4.y+10} ${currentRoute.n4.x-10},${currentRoute.n4.y+10}`} fill="var(--color-error)" className="transition-all duration-1000" />
              <circle cx={currentRoute.n4.x} cy={currentRoute.n4.y} r="20" fill="none" stroke="var(--color-error)" strokeWidth="1" strokeDasharray="4 4" className="animate-spin origin-center" style={{ transformOrigin: `${currentRoute.n4.x}px ${currentRoute.n4.y}px`, animationDuration: '8s' }} />
              <text x={currentRoute.n4.x - 20} y={currentRoute.n4.y - 20} fill="var(--color-error)" fontSize="12" fontFamily="monospace" letterSpacing="2" fontWeight="black" className="transition-all duration-1000">{currentRoute.n4.label}</text>

              {/* Fake Coordinates Overlay */}
              <text x="20" y="30" fill="var(--color-on-surface-variant)" fontSize="9" fontFamily="monospace" opacity="0.5">LAT: 34.████ N</text>
              <text x="20" y="45" fill="var(--color-on-surface-variant)" fontSize="9" fontFamily="monospace" opacity="0.5">LNG: 118.████ W</text>
              <text x="20" y="60" fill="var(--color-on-surface-variant)" fontSize="9" fontFamily="monospace" opacity="0.5">GRID: {currentRoute.grid}</text>
            </svg>
          )}
        </div>

        {/* Right Side: Itinerary Panel */}
        <div className="w-1/3 border border-outline-variant/30 bg-surface-container-low/50 flex flex-col relative overflow-hidden">
           {/* Terminal header */}
           <div className="flex items-center gap-2 px-4 py-3 bg-[#0e0e10] border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-sm">route</span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">TACTICAL ITINERARY [{routeVariant.toUpperCase()}]</span>
           </div>

           <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {scanning ? (
                  <div className="h-full flex items-center justify-center">
                      <div className="w-1/2 h-1 bg-outline-variant/20 overflow-hidden relative">
                          <div className="absolute top-0 bottom-0 left-0 bg-primary animate-[translate_2s_infinite]"></div>
                      </div>
                  </div>
              ) : (
                  <div className="animate-in fade-in slide-in-from-right duration-500" key={routeVariant}>
                      {/* Step 1 */}
                      <div className="relative pl-6 border-l-2 border-outline-variant/30 opacity-70 mb-6">
                          <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-outline-variant border-2 border-[#0a0a0c]"></div>
                          <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">T-Minus 00:00 (Origin)</div>
                          <h4 className="text-xs text-on-surface font-black uppercase mb-2">{currentRoute.n1.label}</h4>
                          <p className="text-[10px] text-on-surface-variant leading-relaxed font-mono">
                              {currentRoute.n1.desc}
                          </p>
                      </div>

                      {/* Step 2 */}
                      <div className="relative pl-6 border-l-2 border-primary mb-6">
                          <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-primary border-2 border-[#0a0a0c]"></div>
                          <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">T-Minus 00:15 (CP_01)</div>
                          <h4 className="text-xs text-primary font-black uppercase mb-2">{currentRoute.n2.label}</h4>
                          <p className="text-[10px] text-on-surface-variant leading-relaxed font-mono">
                              {currentRoute.n2.desc}
                          </p>
                      </div>

                      {/* Step 3 */}
                      <div className="relative pl-6 border-l-2 border-tertiary-container mb-6">
                          <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-tertiary-container border-2 border-[#0a0a0c] animate-pulse"></div>
                          <div className="text-[10px] font-bold text-tertiary-container uppercase tracking-widest mb-1">T-Minus 00:30 (CP_02)</div>
                          <h4 className="text-xs text-on-surface font-black uppercase mb-2">{currentRoute.n3.label}</h4>
                          <p className="text-[10px] text-on-surface-variant leading-relaxed font-mono">
                              {currentRoute.n3.desc}
                          </p>
                      </div>

                      {/* Step 4 */}
                      <div className="relative pl-6 border-l-2 border-transparent">
                          <div className="absolute -left-[7px] top-0 w-3 h-3 polygon-node bg-error border-2 border-[#0a0a0c]"></div>
                          <div className="text-[10px] font-bold text-error uppercase tracking-widest mb-1">T-Minus 01:45 (Exfil)</div>
                          <h4 className="text-xs text-error font-black uppercase mb-2">{currentRoute.n4.label}</h4>
                          <p className="text-[10px] text-error/80 leading-relaxed font-mono">
                              {currentRoute.n4.desc}
                          </p>
                      </div>
                  </div>
              )}
           </div>

           <div className="p-3 border-t border-outline-variant/20 bg-black text-center">
               <span className="text-[9px] text-on-surface-variant/50 font-mono tracking-widest">
                   CONNECTION: SECURE // ROUTE: UNTRACEABLE
               </span>
           </div>
        </div>
      </div>
    </div>
  );
}
