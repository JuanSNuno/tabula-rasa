"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";

export default function IntelligencePage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const startPoisoning = () => {
    if (ws.current) return;
    ws.current = new WebSocket("ws://localhost:8080/ws/v1/ops/intel/poisoning");
    ws.current.onopen = () => setConnected(true);
    ws.current.onmessage = (e) => {
      setLogs((prev) => [...prev, e.data].slice(-15));
    };
    ws.current.onclose = () => {
      setConnected(false);
      ws.current = null;
    };
  };

  return (
    <div className="min-h-screen bg-[#050e05] text-green-500 font-mono flex">
      {/* SIDEBAR: OPERATOR PROFILE */}
      <aside className="w-72 border-r border-green-900 flex flex-col bg-[#020602]">
        <div className="p-6 border-b border-green-900">
          <h1 className="text-xl font-bold tracking-widest text-green-400 mb-2">TABULA_RASA</h1>
          <p className="text-xs uppercase tracking-widest text-green-800">SIGINT / Network Intel</p>
        </div>
        
        <div className="p-6 border-b border-green-900 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-green-400">person_search</span>
            </div>
            <div>
              <p className="font-bold text-sm">OPERATOR: CYPHER</p>
              <p className="text-xs text-green-700">AUTH LVL: 5 (ALPHA)</p>
            </div>
          </div>
          <div className="text-xs space-y-1 text-green-600">
            <p className="flex justify-between"><span>NODE:</span> <span className="text-green-400">PXR-77</span></p>
            <p className="flex justify-between"><span>LOCATION:</span> <span className="text-green-400">Unknown (Tor)</span></p>
            <p className="flex justify-between"><span>GEO-IP:</span> <span className="text-green-400">194.150.xxx.xx</span></p>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="p-6 border-b border-green-900 flex-1">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-between">
            Pending Alerts <span className="bg-green-800 text-black px-2 py-0.5 rounded-sm">2</span>
          </h2>
          <div className="space-y-3">
            <div className="bg-green-950/30 border-l-2 border-green-500 p-3 text-xs text-green-400">
              <p className="font-bold mb-1">[URGENT] Interpol DB Sync</p>
              <p className="text-green-700">Anomaly detected in target profile 802A. Immediate poisoning required.</p>
            </div>
            <div className="bg-green-950/30 border-l-2 border-green-800 p-3 text-xs text-green-600">
              <p className="font-bold mb-1">[INFO] Social Graph Scrape</p>
              <p className="text-green-800">Scraping complete for 3 associates of TR-14.</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Link href="/" className="text-xs uppercase tracking-widest text-green-800 hover:text-green-400 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">logout</span> Terminate Session
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOPBAR */}
        <header className="h-16 border-b border-green-900 flex items-center justify-between px-8 bg-[#020602]/80 backdrop-blur-sm">
          <div className="flex space-x-8 text-xs uppercase tracking-widest font-bold">
            <span className="text-green-400 border-b-2 border-green-400 pb-1 cursor-pointer">Data Poisoning (TR-24)</span>
            <span className="text-green-800 hover:text-green-600 cursor-not-allowed">Social Eng. Analyzer</span>
            <span className="text-green-800 hover:text-green-600 cursor-not-allowed">Dog Whistling Copys (TR-14)</span>
          </div>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-xs text-green-600">System Online</span>
          </div>
        </header>

        {/* WORKSPACE */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tighter text-green-400 mb-2">MASS DATA INJECTION PROTOCOL</h2>
              <p className="text-sm text-green-700">Deploy corrupted datasets to government and surveillance databases to create digital noise around active extraction targets.</p>
            </div>

            {/* THE TR-24 TERMINAL */}
            <div className="bg-black border border-green-900 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[500px]">
              <div className="bg-green-950 border-b border-green-900 px-4 py-3 flex justify-between items-center">
                <span className="text-xs font-bold tracking-widest text-green-500">TERMINAL: ROOT@TR-INTEL:~#</span>
                <button
                  onClick={startPoisoning}
                  disabled={connected}
                  className={`text-xs px-4 py-1.5 font-bold uppercase tracking-wider rounded ${
                    connected
                      ? "bg-green-900 text-green-500 cursor-not-allowed"
                      : "bg-green-600 text-black hover:bg-green-500 transition-colors"
                  }`}
                >
                  {connected ? "Injecting..." : "Execute Exploit"}
                </button>
              </div>

              <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-end text-sm leading-relaxed shadow-inner font-mono">
                {logs.length === 0 && !connected && (
                  <div className="text-center text-green-800 my-auto opacity-50">
                    <span className="material-symbols-outlined text-4xl block mb-2">hub</span>
                    Awaiting command execution...
                  </div>
                )}
                {logs.map((log, i) => (
                  <div key={i} className={`${log.includes("COMPLETE") ? "text-blue-400 font-bold" : "text-green-500"}`}>
                    <span className="text-green-800 mr-2">{'>'}</span> {log}
                  </div>
                ))}
                {connected && (
                  <div className="animate-pulse mt-2 text-green-700 font-bold">_</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
