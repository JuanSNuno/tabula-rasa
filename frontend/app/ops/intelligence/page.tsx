"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid } from 'recharts';

export default function IntelligencePage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const [chartData, setChartData] = useState<{time: string, rate: number}[]>(Array(20).fill({time: '', rate: 0}));
  const ws = useRef<WebSocket | null>(null);

  const startPoisoning = () => {
    if (ws.current) return;
    ws.current = new WebSocket("ws://localhost:8080/ws/v1/ops/intel/poisoning");
    ws.current.onopen = () => setConnected(true);
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setLogs((prev) => [...prev, data].slice(-25));
      
      setChartData((prev) => {
         const newChart = [...prev, { time: new Date().toLocaleTimeString([], {minute: '2-digit', second:'2-digit'}), rate: data.rate }];
         return newChart.slice(-20);
      });
    };
    ws.current.onclose = () => {
      setConnected(false);
      ws.current = null;
    };
  };

  useEffect(() => {
    // Fill initial empty chart
    setChartData(Array.from({length: 20}).map((_, i) => ({
      time: `00:0${i}`,
      rate: 0
    })));
  }, []);

  return (
    <div className="min-h-screen bg-[#050e05] text-green-500 font-mono flex">
      {/* SIDEBAR: OPERATOR PROFILE */}
      <aside className="w-72 border-r border-green-900 flex flex-col bg-[#020602]">
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
        <div className="p-6 border-b border-green-900 flex-1">
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
        <header className="h-16 border-b border-green-900 flex items-center justify-between px-8 bg-[#020602]/80 backdrop-blur-sm">
          <div className="flex space-x-8 text-xs uppercase tracking-widest font-bold">
            <span className="text-green-400 border-b-2 border-green-400 pb-1 cursor-pointer">Envenenamiento de Datos (TR-24)</span>
            <span className="text-green-800 hover:text-green-600 cursor-not-allowed">Analizador Ing. Social</span>
            <span className="text-green-800 hover:text-green-600 cursor-not-allowed">Copias Dog Whistling (TR-14)</span>
          </div>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-xs text-green-600">Sistema en Línea</span>
          </div>
        </header>

        {/* WORKSPACE */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            <div className="mb-4">
              <h2 className="text-3xl font-bold tracking-tighter text-green-400 mb-2">PROTOCOLO DE INYECCIÓN MASIVA DE DATOS</h2>
              <p className="text-sm text-green-700 max-w-3xl">Despliegue conjuntos de datos corruptos en bases de datos gubernamentales y de vigilancia para crear ruido digital alrededor de objetivos de extracción activos.</p>
            </div>

            {/* LIVE TELEMETRY GRAPHS */}
            <div className="grid grid-cols-3 gap-6 h-64 mb-4">
               {/* Left Stat Box */}
               <div className="bg-black border border-green-900/50 rounded-lg shadow-2xl p-6 flex flex-col justify-center items-center relative">
                  <div className="absolute top-0 right-0 p-2 text-green-900 opacity-20">
                     <span className="material-symbols-outlined text-6xl">blur_on</span>
                  </div>
                  <p className="text-[10px] text-green-600 font-bold tracking-widest uppercase mb-2">Tasa de Inyección Actual (MB/s)</p>
                  <p className="text-6xl font-black text-green-400">{logs[logs.length-1]?.rate?.toFixed(1) || "0.0"}</p>
                  
                  {connected && <div className="mt-4 w-full bg-green-950 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-green-500 h-full w-full animate-[pulse_1s_ease-in-out_infinite] transition-all"></div>
                  </div>}
               </div>

               {/* Center Graph */}
               <div className="col-span-2 bg-black border border-green-900/50 rounded-lg shadow-2xl p-4">
                  <h3 className="text-[10px] font-bold text-green-600 tracking-[0.2em] mb-4">TELEMETRÍA DE RENDIMIENTO</h3>
                  <div className="h-44 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                           <defs>
                              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                                 <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <XAxis dataKey="time" hide />
                           <YAxis hide domain={[0, 25]} />
                           <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} opacity={0.3} />
                           <Tooltip 
                              contentStyle={{ backgroundColor: '#022c22', border: '1px solid #166534', color: '#4ade80', fontSize: '12px' }} 
                              itemStyle={{ color: '#86efac' }}
                           />
                           <Area type="monotone" dataKey="rate" stroke="#22c55e" fillOpacity={1} fill="url(#colorRate)" strokeWidth={2} isAnimationActive={false} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>

            {/* THE TR-24 TERMINAL */}
            <div className="bg-black border border-green-900 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[400px]">
              <div className="bg-green-950 border-b border-green-900 px-4 py-3 flex justify-between items-center">
                <span className="text-xs font-bold tracking-widest text-green-500 flex items-center gap-2">
                   <span className="material-symbols-outlined text-[14px]">terminal</span>
                   TERMINAL: ROOT@TR-INTEL:~#
                </span>
                <button
                  onClick={startPoisoning}
                  disabled={connected}
                  className={`text-xs px-6 py-2 font-bold uppercase tracking-wider rounded transition-all duration-300 ${
                    connected
                      ? "bg-green-900/40 text-green-600 cursor-not-allowed border border-green-900/50"
                      : "bg-green-600 text-black hover:bg-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                  }`}
                >
                  {connected ? "Infiltrando BDs..." : "Ejecutar Exploit"}
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-end text-xs leading-relaxed shadow-inner font-mono">
                {logs.length === 0 && !connected && (
                  <div className="text-center text-green-800 my-auto opacity-50 flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-6xl">cell_wifi</span>
                    Esperando inicio de vector objetivo...
                  </div>
                )}
                {logs.map((item, i) => (
                  <div key={i} className={`flex justify-between border-b border-green-950/30 py-1 hover:bg-green-900/10 ${item.log.includes("COMPLETE") ? "text-blue-400 font-bold bg-blue-900/20" : "text-green-500"}`}>
                    <span className="flex-1"><span className="text-green-800 font-black mr-2">&gt;</span> {item.log}</span>
                    <span className="text-[10px] text-green-700 uppercase tracking-widest opacity-60 w-32 text-right">[{item.target}]</span>
                    <span className="text-[10px] text-green-600 opacity-40 ml-4">{item.progress}%</span>
                  </div>
                ))}
                {connected && (
                  <div className="animate-pulse mt-2 text-green-600/50 font-bold">_</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
