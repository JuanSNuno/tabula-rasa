"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, Zap, Radar as RadarIcon, Map as MapIcon, Video, AlertTriangle, LogOut } from "lucide-react";

export default function ExtractionLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "ProjAttacker", href: "/ops/extraction", icon: Zap },
    { name: "Vigilancia", href: "/ops/extraction/surveillance", icon: Video },
    { name: "Enrutamiento", href: "/ops/extraction/routing", icon: MapIcon },
  ];

  return (
    <div className="flex h-screen bg-[#070000] font-mono text-red-500 overflow-hidden">
      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:relative w-80 h-full flex flex-col bg-[#050000] border-r border-red-900 shadow-2xl z-50 transition-transform duration-300 shrink-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
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
              <LogOut className="w-4 h-4" /> Abortar Misión
           </Link>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 flex flex-col relative overflow-hidden h-full">
        {/* Grid Background Effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-5 pointer-events-none"></div>

        <header className="p-4 lg:p-6 flex items-center justify-between border-b border-red-950 z-10 bg-[#050000]/80 backdrop-blur shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-red-500 p-1 hover:bg-red-950 rounded"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex gap-6 text-sm uppercase font-bold tracking-widest">
              <Link href="/ops/extraction" className={`pb-1 transition-colors ${pathname === '/ops/extraction' ? 'text-red-500 border-b-2 border-red-500' : 'text-red-900 hover:text-red-500'}`}>ProjAttacker (TR-25)</Link>
              <Link href="/ops/extraction/surveillance" className={`pb-1 transition-colors ${pathname === '/ops/extraction/surveillance' ? 'text-red-500 border-b-2 border-red-500' : 'text-red-900 hover:text-red-500'}`}>Transmisión de Vigilancia</Link>
              <Link href="/ops/extraction/routing" className={`pb-1 transition-colors ${pathname === '/ops/extraction/routing' ? 'text-red-500 border-b-2 border-red-500' : 'text-red-900 hover:text-red-500'}`}>Enrutamiento y Mapas</Link>
            </div>
            <div className="lg:hidden text-xs font-bold uppercase tracking-widest text-red-500">
               {navItems.find(i => i.href === pathname)?.name || "Extracción"}
            </div>
          </div>
          <div className="text-[10px] lg:text-xs text-red-500 border border-red-900 px-2 lg:px-3 py-1 bg-red-950/30 whitespace-nowrap">
            H_L: 12:04:32
          </div>
        </header>

        {/* MOBILE NAVIGATION TABS */}
        <div className="lg:hidden flex overflow-x-auto border-b border-red-950 bg-[#050000]/90 z-10 shrink-0 no-scrollbar">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className={`whitespace-nowrap px-4 py-3 text-[10px] uppercase font-bold tracking-widest transition-colors ${pathname === item.href ? 'text-red-500 border-b-2 border-red-500 bg-red-950/20' : 'text-red-900 hover:text-red-500'}`}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* TOOL VIEW CONTENT */}
        <div className="flex-1 overflow-y-auto z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
