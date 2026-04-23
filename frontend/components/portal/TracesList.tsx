"use client";

import React, { useState } from 'react';

interface Trace {
    id: string;
    source: string;
    category: 'Government' | 'Financial' | 'Digital' | 'Biometric';
    status: 'Detected' | 'Neutralizing' | 'Eliminated';
    riskLevel: 'Critical' | 'High' | 'Medium';
    details?: string;
}

const traces: Trace[] = [
    { id: 'TR-001', source: 'Civil Registry (Interpol Dragnet)', category: 'Government', status: 'Detected', riskLevel: 'Critical', details: 'Record found in Interpol Centralized Repository. Linked to passport [REDACTED]. Last sync: 4h ago.' },
    { id: 'TR-002', source: 'SWIFT Transaction Logs (Flagged)', category: 'Financial', status: 'Detected', riskLevel: 'High', details: 'Transaction 0x992B flagged for manual review at [LOCAL BANK]. Source: Foreign wire transfer.' },
    { id: 'TR-003', source: 'Facial Recognition Database (Public Safety)', category: 'Biometric', status: 'Neutralizing', riskLevel: 'Critical', details: 'Biometric vector detected in 420 surveillance cameras. Entropy injection ongoing.' },
    { id: 'TR-004', source: 'Social Integrity Score (Metadata)', category: 'Digital', status: 'Detected', riskLevel: 'Medium', details: 'Shadow profile generated based on geolocation habits. Score: 0.12 [UNRELIABLE].' },
    { id: 'TR-005', source: 'Digital Identity (Frankenstein Shadow)', category: 'Digital', status: 'Neutralizing', riskLevel: 'High', details: 'Synthetic identity merging with origin. Collision probability: < 0.05%.' },
];

export default function TracesList() {
    const [selectedTrace, setSelectedTrace] = useState<Trace | null>(null);

    if (selectedTrace) {
        return (
            <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-left duration-300">
                <button
                    onClick={() => setSelectedTrace(null)}
                    className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase hover:bg-primary/10 w-fit p-2 border border-primary/20 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    RETURN TO TRACE LIST
                </button>

                <div className="bg-surface-container-high/60 border border-primary/20 p-6 space-y-6">
                    <div className="flex justify-between items-start border-b border-outline-variant/10 pb-4">
                        <div className="space-y-1">
                            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{selectedTrace.id} // {selectedTrace.category}</span>
                            <h3 className="text-xl font-black text-on-surface uppercase tracking-tighter">{selectedTrace.source}</h3>
                        </div>
                        <span className="px-3 py-1 bg-error-container text-on-error-container text-[9px] font-black uppercase">RISK_LEVEL: {selectedTrace.riskLevel}</span>
                    </div>

                    <div className="space-y-6">
                        <div className="p-4 bg-black/40 border-l-4 border-primary">
                            <div className="text-[10px] text-primary font-bold uppercase mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-xs">folder_open</span>
                                RAW_DATA_LEAK_REPORT:
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed font-mono italic">
                                "{selectedTrace.details}"
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 p-4 bg-surface-container-lowest/30 rounded-sm">
                            <div className="space-y-2 border-r border-outline-variant/10">
                                <div className="text-[10px] text-on-surface-variant font-bold uppercase">Persistence Matrix:</div>
                                <div className="text-sm text-primary font-black tracking-widest">HIGH [REPLICATED]</div>
                            </div>
                            <div className="space-y-2 pl-4">
                                <div className="text-[10px] text-on-surface-variant font-bold uppercase">Estimated Purge Time:</div>
                                <div className="text-sm text-primary font-black tracking-widest">12m 45s</div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full bg-primary text-on-primary-container font-black py-4 uppercase text-xs hover:bg-tertiary transition-colors shadow-lg active:scale-[0.98] duration-150">
                        CONFIRM TOTAL NEUTRALIZATION
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-end border-b border-outline-variant/30 pb-2">
                <h2 className="text-xs font-bold text-on-surface-variant tracking-[0.2em] uppercase">Digital Footprint Destruction</h2>
                <span className="text-[10px] text-primary uppercase">Active OSINT Scan</span>
            </div>

            <div className="space-y-3">
                {traces.map((trace) => (
                    <div
                        key={trace.id}
                        onClick={() => setSelectedTrace(trace)}
                        className="bg-surface-container-high/40 border border-outline-variant/20 p-4 flex flex-col gap-2 group hover:border-primary/50 transition-colors cursor-pointer active:bg-surface-container-highest/20"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">{trace.id} // {trace.category}</span>
                                <span className="text-sm font-bold text-on-surface mt-1 font-headline tracking-tighter">{trace.source}</span>
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase ${trace.riskLevel === 'Critical' ? 'bg-error-container text-on-error-container' :
                                    trace.riskLevel === 'High' ? 'bg-tertiary-container text-on-tertiary-container' :
                                        'bg-surface-container-highest text-on-surface-variant'
                                }`}>
                                RISK: {trace.riskLevel}
                            </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${trace.status === 'Eliminated' ? 'bg-primary' :
                                        trace.status === 'Neutralizing' ? 'bg-tertiary animate-pulse' :
                                            'bg-outline-variant'
                                    }`}></div>
                                <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">{trace.status}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-primary group-hover:underline uppercase tracking-tight">
                                VIEW DATA REPORT [OSINT]
                                <span className="material-symbols-outlined text-xs">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
