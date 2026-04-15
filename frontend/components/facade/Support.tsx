"use client";

import React, { useState } from 'react';
import { useSecurityMode } from '../../context/SecurityModeContext';

interface Props {
  setView: (view: 'home' | 'services' | 'support') => void;
}

export default function FacadeSupport({ setView }: Props) {
  const { activateClandestineMode } = useSecurityMode();
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketId.trim() === 'Error_704_Null_Pointer_Extraction') {
      activateClandestineMode();
    } else {
      alert("Ticket submitted successfully. Our corporate support team will contact you soon.");
    }
  };

  return (
    <>
      <nav className="w-full top-0 z-50 bg-[#f7f9fb] flex items-center justify-between px-8 py-4 max-w-full">
        <div className="text-xl font-bold tracking-tighter text-on-surface font-headline">LegacyGuard</div>
        <div className="hidden md:flex items-center space-x-8 font-inter text-sm font-medium tracking-tight">
          <button onClick={() => setView('home')} className="text-on-surface-variant hover:text-on-surface transition-colors duration-200">Home</button>
          <button onClick={() => setView('services')} className="text-on-surface-variant hover:text-on-surface transition-colors duration-200">Services</button>
          <button onClick={() => setView('support')} className="text-on-surface border-b-2 border-primary pb-1 duration-200">Support</button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 font-inter text-sm font-medium text-on-surface-variant hover:bg-surface-container-low duration-200">Client Login</button>
          <button className="px-4 py-2 bg-primary text-on-primary rounded font-inter text-sm font-medium hover:bg-primary-dim transition-colors duration-200">Audit Request</button>
        </div>
      </nav>

      <main className="min-h-screen">
        <section className="px-8 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl mx-auto">
          <div className="md:col-span-7 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest font-bold text-outline mb-4">Institutional Support Center</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-[1.1] mb-8 font-headline">
                Technical <br/>Inquiry <span className="text-outline-variant">Protocol</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed font-light mb-12 font-body">
                LegacyGuard Systems provides institutional-grade auditing support. Submit your technical documentation or system anomalies through our secure ledger channel for immediate resolution.
            </p>
            <div className="flex space-x-12 mt-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-outline tracking-wider mb-2">Systems Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-sm font-semibold text-on-surface">Nominal Operating State</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-outline tracking-wider mb-2">Response Latency</p>
                <p className="text-sm font-semibold tracking-tight text-on-surface">&lt; 14 Minutes</p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-5 relative">
            <div className="bg-surface-container-lowest p-8 md:p-10 relative z-10">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-on-surface font-headline">Ticketing Terminal</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-outline tracking-wide font-label">Full Name</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none" placeholder="Institutional Officer Name" type="text"/>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-outline tracking-wide font-label">Corporate Email</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none" placeholder="officer@corporate.tld" type="email"/>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-outline tracking-wide font-label">Código de Incidencia</label>
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none font-mono" 
                    placeholder="LG-AUDIT-XXXXX" 
                    type="text"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                  />
                </div>
                <button className="w-full bg-primary text-on-primary py-4 px-6 text-sm font-bold tracking-widest uppercase hover:bg-primary-dim transition-all duration-200 flex items-center justify-center gap-2 group" type="submit">
                    Enviar Ticket
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <p className="text-[10px] text-center text-outline leading-tight mt-4 font-body">
                    All submissions are encrypted and logged in the Sovereign Ledger for compliance auditing.
                </p>
              </form>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-surface-container-high -z-10"></div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24 px-8 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h3 className="text-3xl font-bold tracking-tighter text-on-surface font-headline">Documentation & Resources</h3>
              <p className="text-on-surface-variant text-sm mt-2 font-body">Access institutional whitepapers and system logs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 bg-surface-container-lowest p-8 flex flex-col justify-between h-64 border-l-4 border-primary">
                <div>
                  <span className="material-symbols-outlined text-primary mb-4">shield_with_heart</span>
                  <h4 className="text-lg font-bold text-on-surface font-headline">Security Whitepaper</h4>
                  <p className="text-sm text-on-surface-variant mt-2 max-w-xs font-body">Review the core architecture of the LegacyGuard auditing engine and data encryption standards.</p>
                </div>
                <a className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1" href="#">Download PDF <span className="material-symbols-outlined text-xs">download</span></a>
              </div>
              <div className="bg-surface-container-lowest p-8 flex flex-col justify-between h-64 border-l-4 border-secondary-dim">
                <div>
                  <span className="material-symbols-outlined text-secondary-dim mb-4">gavel</span>
                  <h4 className="text-lg font-bold text-on-surface font-headline">Regulatory</h4>
                  <p className="text-sm text-on-surface-variant mt-2 font-body">Compliance documentation for ISO 27001 and institutional standards.</p>
                </div>
                <a className="text-xs font-bold uppercase tracking-widest text-secondary-dim" href="#">Access Ledger</a>
              </div>
              <div className="bg-surface-container-lowest p-8 flex flex-col justify-between h-64 border-l-4 border-outline-variant">
                <div>
                  <span className="material-symbols-outlined text-outline-variant mb-4">history</span>
                  <h4 className="text-lg font-bold text-on-surface font-headline">System Logs</h4>
                  <p className="text-sm text-on-surface-variant mt-2 font-body">Real-time transparency reports for all active auditing cycles.</p>
                </div>
                <a className="text-xs font-bold uppercase tracking-widest text-outline" href="#">View Analytics</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-dim w-full border-t border-outline-variant/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 w-full">
          <div className="text-lg font-black text-on-surface mb-6 md:mb-0 font-headline">LegacyGuard</div>
          <div className="flex flex-wrap justify-center gap-8 font-inter text-xs tracking-wide uppercase font-semibold">
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity opacity-80 hover:opacity-100" href="#">Terms of Service</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity opacity-80 hover:opacity-100" href="#">Security Whitepaper</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity opacity-80 hover:opacity-100" href="#">Regulatory Compliance</a>
          </div>
          <div className="mt-8 md:mt-0 text-[10px] text-on-surface-variant font-medium opacity-60 font-label">
              © 2024 LegacyGuard Systems. Institutional Authority in System Auditing.
          </div>
        </div>
      </footer>
    </>
  );
}
