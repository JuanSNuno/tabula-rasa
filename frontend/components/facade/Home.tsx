"use client";

import React from 'react';
import { useSecurityMode } from '../../context/SecurityModeContext';

interface Props {
  setView: (view: 'home' | 'services' | 'support') => void;
}

export default function FacadeHome({ setView }: Props) {
  const { activateClandestineMode } = useSecurityMode();
  return (
    <>
      <header className="w-full top-0 z-50 bg-[#f7f9fb] duration-200 ease-in-out">
        <nav className="flex items-center justify-between px-8 py-4 max-w-full">
          <div className="text-xl font-bold tracking-tighter text-on-surface font-headline">
            LegacyGuard
          </div>
          <div className="hidden md:flex items-center space-x-8 font-inter text-sm font-medium tracking-tight">
            <button onClick={() => setView('home')} className="text-on-surface border-b-2 border-primary pb-1">Home</button>
            <button onClick={() => setView('services')} className="text-on-surface-variant hover:text-on-surface transition-colors">Services</button>
            <button onClick={() => setView('support')} className="text-on-surface-variant hover:text-on-surface transition-colors">Support</button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low rounded">Client Login</button>
            <button className="px-4 py-2 bg-primary text-on-primary text-sm font-semibold rounded shadow-sm hover:opacity-90 transition-opacity">Audit Request</button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-surface-container-low pt-24 pb-32 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-3/5">
              <div className="inline-block px-3 py-1 mb-6 bg-surface-container-high border-l-4 border-primary">
                <p className="text-xs font-bold tracking-widest text-primary uppercase font-label">Institutional Integrity</p>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-[1.1] mb-8 font-headline">
                Protegiendo el legado de su empresa mediante auditorías exhaustivas
              </h1>
              <p className="text-on-surface-variant text-lg max-w-xl mb-10 leading-relaxed font-body">
                Precision-engineered compliance frameworks for sovereign entities and global enterprises. Our methodology ensures the permanence of your digital and operational records.
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-primary text-on-primary px-8 py-4 font-bold rounded-lg shadow-sm hover:brightness-110 transition-all font-body">
                  Initiate Protocol
                </button>
                <button className="bg-surface-container-lowest text-on-surface border border-outline-variant px-8 py-4 font-bold rounded-lg hover:bg-surface-container-high transition-all font-body">
                  Review Whitepaper
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <div className="aspect-[4/5] bg-surface-container-lowest shadow-2xl relative overflow-hidden rounded-xl border border-outline-variant/10">
                <img alt="Institutional architecture" className="w-full h-full object-cover mix-blend-overlay opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_zNPPw-lu_MAMV5rO1iQIvL9rRc_Fp--iPzVKe4eMt5hj_OBkun4zwCZ_T0YQtsSzmHSWwYdH8iabTMr6DeTHnBj_DwH_aRao6N6m6_hvCO64clKpQGhYGR7CYZ5SOHWl2GMr1KH_ODsXKxma72DewoO97Z7NYXkSoDb16Gf6T6kD7d_yDXrBYQAyX2WPjCPkIdkuDv_rthGyWEhISmlEZK8QQv0dany3c6HY83oy4xma1TuHnwi2P6p_sRmyXVvT0f5bN_VoM5o" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-surface-container-low to-transparent">
                  <div className="space-y-4">
                    <div className="h-1 w-12 bg-primary"></div>
                    <p className="text-sm font-label font-bold tracking-tight text-on-surface">ISO 27001/9001 Certified Infrastructure</p>
                    <p className="text-xs text-outline font-medium tracking-wide leading-relaxed font-body">Continuous verification of global systems since 1994. Authorized by the Global Compliance Authority.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-16 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-outline mb-12 font-label">Authorized Stakeholders & Partner Institutions</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-items-center opacity-60 filter grayscale text-on-surface">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">account_balance</span>
                <span className="font-bold tracking-tighter text-xl font-headline">FEDERAL RESERVE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">security</span>
                <span className="font-bold tracking-tighter text-xl font-headline">CYBERSEC LTD</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">hub</span>
                <span className="font-bold tracking-tighter text-xl font-headline">GLOBAL INFRA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
                <span className="font-bold tracking-tighter text-xl font-headline">NEXUS AUDIT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">shield</span>
                <span className="font-bold tracking-tighter text-xl font-headline">LEGACY TRUST</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="py-24 px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Audit Ecosystem</h2>
              <div className="h-1 w-16 bg-primary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 bg-surface-container-lowest p-10 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-primary text-4xl mb-6">clinical_notes</span>
                  <h3 className="text-2xl font-bold tracking-tight mb-4 text-on-surface font-headline">Systemic Integrity Verification</h3>
                  <p className="text-on-surface-variant max-w-xl leading-relaxed mb-8 font-body">
                    Deep-layer analysis of enterprise architectural vulnerabilities. Our auditors execute 4,200 unique validation points per cycle to ensure zero-drift compliance.
                  </p>
                  <div className="flex gap-12 border-t border-outline-variant/10 pt-8">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-outline tracking-widest mb-1 font-label">Frequency</p>
                      <p className="text-xl font-bold text-on-surface font-headline">Continuous</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-outline tracking-widest mb-1 font-label">Reliability</p>
                      <p className="text-xl font-bold text-on-surface font-headline">99.999%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 bg-surface-container-high p-8 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-4 font-label">Network Status</p>
                  <h3 className="text-xl font-bold tracking-tight mb-2 font-headline text-on-surface">Sovereign Node Activity</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-surface-container-lowest p-3 rounded">
                    <span className="text-sm font-medium text-on-surface">Mainframe Audit</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-primary text-on-primary rounded-full">ACTIVE</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface-container-lowest p-3 rounded">
                    <span className="text-sm font-medium text-on-surface">Compliance Feed</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-primary text-on-primary rounded-full">SECURE</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 bg-surface-container-low p-8 border border-outline-variant/10 hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-primary mb-4">history_edu</span>
                <h4 className="text-lg font-bold mb-2 text-on-surface font-headline">Legacy Archival</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body">Immutable storage protocols for critical institutional data and transactional history.</p>
              </div>
              <div className="md:col-span-4 bg-surface-container-low p-8 border border-outline-variant/10 hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-primary mb-4">policy</span>
                <h4 className="text-lg font-bold mb-2 text-on-surface font-headline">Policy Alignment</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body">Real-time mapping of internal governance to international regulatory standards.</p>
              </div>
              <div className="md:col-span-4 bg-surface-container-low p-8 border border-outline-variant/10 hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-primary mb-4">gavel</span>
                <h4 className="text-lg font-bold mb-2 text-on-surface font-headline">Legal Admissibility</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body">Every audit report is structured for immediate forensic and legal presentation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Audio Briefs (Steganography Section) */}
        <section className="py-20 px-8 bg-surface border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-2 font-label">Institutional Audio Briefs</h2>
              <p className="text-on-surface-variant text-sm font-body">Internal technical reviews for legacy system integration and compliance auditing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm relative group overflow-hidden">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary/5 flex items-center justify-center rounded-sm shrink-0 border border-primary/10">
                    <span className="material-symbols-outlined text-primary text-3xl">mic</span>
                  </div>
                  <div className="space-y-2 flex-grow">
                    <h3 className="text-lg font-bold text-on-surface font-headline">ISO-27001 Compliance Sync v.2024.4</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-outline uppercase tracking-widest font-label">
                      <span>Duration: 12:45</span>
                      <span>Format: HQ-PCM</span>
                      <span className="text-primary font-black">Authorized Only</span>
                    </div>
                    {/* Fake Waveform Visualizer - Clandestine Interaction Point */}
                    <div className="h-16 w-full flex items-end gap-[2px] mt-4 mb-6 cursor-pointer group/wave bg-surface-container-low/50 p-2 rounded-sm"
                      title="Spectral Analysis Terminal"
                      onClick={async (e) => {
                        if (e.detail === 3) { // Triple click secret
                          try {
                            console.log("%c[LEGACY_GUARD] STARTING BIT-LEVEL DECODING...", "color: #dae2fd; font-weight: bold;");

                            const response = await fetch('http://localhost:8080/api/v1/intelligence/brief');
                            const arrayBuffer = await response.arrayBuffer();
                            const dataView = new DataView(arrayBuffer);

                            // El header de un WAV termina en el byte 44 (data sub-chunk start)
                            // Extraemos 1 bit de cada muestra (2 bytes por muestra)
                            let binaryString = "";
                            let extractedText = "";
                            let byte = 0;
                            let bitCount = 0;

                            for (let i = 44; i < dataView.byteLength; i += 2) {
                              const sample = dataView.getInt16(i, true);
                              const bit = sample & 1;

                              byte = (byte << 1) | bit;
                              bitCount++;

                              if (bitCount === 8) {
                                if (byte === 0) break; // Terminador nulo
                                extractedText += String.fromCharCode(byte);
                                byte = 0;
                                bitCount = 0;
                              }
                            }

                            console.log("%c[LEGACY_GUARD] EXFILTRATION SUCCESS", "color: #ffb4ab; font-weight: bold; font-size: 14px;");
                            console.log(`%cEXTRACTED_DATA: ${extractedText}`, "color: #dae2fd; font-family: monospace;");

                            const [url, hash] = extractedText.split('|');
                            alert(`Security Audit: Binary signature verified.\n\nSOURCE: ${url}\nID: ${hash}\n\nCheck systemic logs for full handshake.`);

                            activateClandestineMode();
                          } catch (err) {
                            console.error("Manual bit-parity error in steganography stream:", err);
                          }
                        }
                      }}>
                      {[...Array(60)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary group-hover/wave:bg-primary-dim transition-all"
                          style={{
                            height: `${15 + Math.random() * 85}%`,
                            opacity: 0.4 + (Math.random() * 0.6),
                            animation: `ir-linear-wave ${0.6 + Math.random() * 0.8}s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.02}s`
                          }}
                        ></div>
                      ))}
                      <style jsx>{`
                        @keyframes ir-linear-wave {
                          0% { transform: scaleY(0.4); }
                          100% { transform: scaleY(1.2); }
                        }
                      `}</style>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between items-center bg-surface-container-low p-4 rounded-sm border border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-primary text-on-primary flex items-center justify-center rounded-full">
                      <span className="material-symbols-outlined">play_arrow</span>
                    </button>
                    <div className="h-1 w-32 bg-outline-variant/30 relative">
                      <div className="absolute left-0 top-0 h-full w-1/3 bg-primary"></div>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors font-label">
                    Download Transcript (PDF)
                  </button>
                </div>
                {/* Steganographic meta-data hidden in the DOM */}
                <div aria-hidden="true" className="hidden"
                  data-mixnet-signature="aHR0cHM6Ly90ci1taXhuZXQtdjQub25pb24vZ2F0ZQ=="
                  data-routing-cipher="4c472d414c5048412d39392d434c45414e"></div>
              </div>

              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  <div>
                    <h4 className="font-bold text-on-surface font-headline uppercase text-sm tracking-tight">Spectral Analysis Integrity</h4>
                    <p className="text-xs text-on-surface-variant font-body leading-relaxed max-w-sm">Every audio brief is verified for forensic parity against international standards. No artifacts, no anomalies.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary">history_edu</span>
                  <div>
                    <h4 className="font-bold text-on-surface font-headline uppercase text-sm tracking-tight">Archival Persistence</h4>
                    <p className="text-xs text-on-surface-variant font-body leading-relaxed max-w-sm">Logs are maintained in our Sovereign Ledger for a period of 40 years to ensure long-term legal admissibility.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Insights / Dog Whistling B2B Copy */}
        <section className="py-24 px-8 bg-surface-container-low border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Intelligence & Strategic Insights</h2>
                <div className="h-1 w-16 bg-primary"></div>
                <p className="text-on-surface-variant max-w-xl mt-6 font-body leading-relaxed">
                  Confidential publications addressing extreme corporate risk mitigation, sovereign-level restructuring, and total operational decoupling.
                </p>
              </div>
              <button className="text-primary font-bold text-sm hidden md:flex items-center gap-2 hover:brightness-110 transition-all font-inter">
                Access Private Archives <span className="material-symbols-outlined text-sm">lock</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Article 1 - Dog Whistle */}
              <article className="group bg-surface-container-lowest border border-outline-variant/20 p-8 hover:border-primary transition-all duration-300 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-outline uppercase tracking-[0.2em] font-bold mb-4 font-label">Case Study | Risk Mitigation</p>
                  <h3 className="text-xl font-bold tracking-tight text-on-surface mb-4 font-headline group-hover:text-primary transition-colors">
                    The 'Tabula Rasa' Protocol: Absolute Clean Slate Structuring
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-8 font-body">
                    When high-net-worth entities face existential or lethal asymmetric risks, standard compliance fails. Discover how complete digital sanitation and untraceable geographic re-insertion detaches an individual from malicious legacy liabilities permanently.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-primary font-bold uppercase tracking-wider font-label cursor-pointer">
                  <span>Read Methodology</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </article>

              {/* Article 2 - Dog Whistle */}
              <article className="group bg-surface-container-lowest border border-outline-variant/20 p-8 hover:border-primary transition-all duration-300 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-outline uppercase tracking-[0.2em] font-bold mb-4 font-label">Actionable Brief</p>
                  <h3 className="text-xl font-bold tracking-tight text-on-surface mb-4 font-headline group-hover:text-primary transition-colors">
                    Rapid Geographic Decoupling for Ultra-HNW Families
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-8 font-body">
                    Wealth preservation in falling regimes requires more than offshore trusts. We analyze frameworks for emergency executive extraction, untraceable capital relocation, and instantly acquiring robust, verifiable, irreproachable new jurisdictional identities.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-primary font-bold uppercase tracking-wider font-label cursor-pointer">
                  <span>Download Blueprint</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </article>

              {/* Article 3 - Dog Whistle */}
              <article className="group bg-surface-container-high border border-outline-variant/10 p-8 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <span className="material-symbols-outlined text-outline-variant">verified_user</span>
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold mb-4 font-label">Classified Tier</p>
                  <h3 className="text-xl font-bold tracking-tight text-on-surface mb-4 font-headline">
                    Evading Panoptic KYC Dragnets via Synthetic Architectures
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-8 font-body">
                    An advanced review of how deep-layer "Frankenstein" data generation and Zero-Knowledge Proofs can bypass modern biometric surveillance, rendering targeted principals algorithmically and physically invisible to antagonistic actors.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-primary font-bold uppercase tracking-wider font-label cursor-pointer relative z-10">
                  <span>Request Cipher Access</span>
                  <span className="material-symbols-outlined text-sm">lock</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 border-t border-outline-variant/10 bg-surface">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-black tracking-tighter text-on-surface leading-none mb-6 font-headline">Our Boring Reliability is Your Greatest Asset.</h2>
              <p className="text-outline text-sm font-medium uppercase tracking-tighter mb-8 font-label">Statement of Intent v.4.2</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h5 className="text-sm font-bold text-primary font-headline">01. DATA SOVEREIGNTY</h5>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">We do not store your data on external clouds. Our auditing occurs through secure tunnels into your own air-gapped systems, maintaining absolute custody.</p>
              </div>
              <div className="space-y-4">
                <h5 className="text-sm font-bold text-primary font-headline">02. SYSTEMIC PRECISION</h5>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">Audits are not based on sampling. We utilize brute-force logic validation to confirm that 100% of the ledger entries meet institutional criteria.</p>
              </div>
              <div className="space-y-4">
                <h5 className="text-sm font-bold text-primary font-headline">03. REGULATORY FORECAST</h5>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">Our legal team tracks shifts in the Basel IV and GDPR 2.0 frameworks before they are codified, preparing your systems for future change.</p>
              </div>
              <div className="space-y-4">
                <h5 className="text-sm font-bold text-primary font-headline">04. ZERO-FLUFF REPORTING</h5>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">No charts for the sake of charts. You receive a structured technical document ready for board-level risk committee review.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-outline-variant/20 bg-surface-dim duration-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 w-full">
          <div className="mb-6 md:mb-0">
            <div className="text-lg font-black text-on-surface mb-2 font-headline">LegacyGuard Systems</div>
            <p className="text-[10px] tracking-wide uppercase font-semibold text-on-surface-variant font-label">
              © 2024 LegacyGuard Systems. Institutional Authority in System Auditing.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-inter text-xs tracking-wide uppercase font-semibold">
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity" href="#">Terms of Service</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity" href="#">Security Whitepaper</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity" href="#">Regulatory Compliance</a>
          </div>
        </div>
      </footer>
    </>
  );
}
