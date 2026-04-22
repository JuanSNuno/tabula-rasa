"use client";

import React, { useState, useEffect, useRef } from 'react';
import TracesList from './TracesList';

interface Message {
  id: string;
  encryptedPayload: string;
  expiresAt: string;
}

type TabMode = 'DASHBOARD' | 'CRYPTO_VAL' | 'COMM_LINK' | 'AUDIT';

export default function PortalDashboard() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isZkVerified, setIsZkVerified] = useState(false);
  const [activeTab, setActiveTab] = useState<TabMode>('DASHBOARD');
  const [error, setError] = useState<string | null>(null);

  // ZK State
  const [scanning, setScanning] = useState(false);
  const [zkError, setZkError] = useState<string | null>(null);

  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Initialize Anonymous Session
  useEffect(() => {
    const initSession = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicKey: 'mock_pgp_public_key' })
        });

        if (response.ok) {
          const data = await response.json();
          setSessionId(data.id);
        } else {
          setError("Mixnet Routing Error. Hostile network detected.");
        }
      } catch (err) {
        setError("Network unreachable. Is the backend running?");
      }
    };
    initSession();
  }, []);

  // Poll Chat Messages
  useEffect(() => {
    if (!sessionId || !isZkVerified) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/messages/${sessionId}`);
        if (res.ok) {
          const data: Message[] = await res.json();
          setMessages(data || []);
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    };

    const intervalId = setInterval(fetchMessages, 3000);
    fetchMessages();
    return () => clearInterval(intervalId);
  }, [sessionId, isZkVerified]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulateZkProof = async () => {
    if (!sessionId) return;
    setScanning(true);
    setZkError(null);

    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionId,
            proofPayload: 'zk_snark_proof_v1_mock_data_polygon_id_1234567890'
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.verified) {
            setIsZkVerified(true);
          } else {
            setZkError("Proof matemático inválido.");
          }
        } else {
          setZkError("Error de red contactando la Mixnet.");
        }
      } catch (err) {
        setZkError("Error de conexión. Sistema comprometido.");
      } finally {
        setScanning(false);
      }
    }, 2000);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !sessionId) return;

    setLoading(true);
    try {
      const encrypted = `ENC_` + btoa(inputText);
      const res = await fetch('http://localhost:8080/api/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          encryptedPayload: encrypted
        })
      });

      if (res.ok) {
        setInputText('');
      }
    } catch (err) {
      console.error("Failed to send", err);
    } finally {
      setLoading(false);
    }
  };

  const decryptMock = (payload: string) => {
    if (payload.startsWith('ENC_')) {
      try {
        return atob(payload.replace('ENC_', ''));
      } catch (e) {
        return payload;
      }
    }
    return payload;
  };

  return (
    <div className="bg-[#0a0a0c] text-on-background h-screen w-screen overflow-hidden flex flex-col font-mono selection:bg-primary selection:text-on-primary">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-[#0e0e10] border-b border-outline-variant/20 flex justify-between items-center px-6 h-12">
        <div className="flex items-center gap-4">
          <span className="font-bold tracking-widest text-primary text-sm uppercase">EXTRACTION_PORTAL_V.04</span>
          {isZkVerified && (
            <span className="text-tertiary-container animate-pulse flex items-center gap-2 text-xs uppercase">
              <span className="w-1.5 h-1.5 bg-tertiary-container"></span>
              STATUS: SECURE CONDUIT ESTABLISHED
            </span>
          )}
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-xs uppercase">
            <span className="text-on-surface-variant">SESSION_ID:</span>
            <span className="text-primary">[{sessionId ? sessionId.substring(0, 13) + '...' : 'NEGOTIATING'}]</span>
          </div>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-primary text-sm">sensors</span>
            <span className="material-symbols-outlined text-primary text-sm">security</span>
            <span className="material-symbols-outlined text-primary text-sm">terminal</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-12 overflow-hidden height-[calc(100vh-3rem)]">
        {/* SideNavBar */}
        <nav className="fixed left-0 top-12 h-full w-64 flex flex-col bg-[#0e0e10] border-r border-outline-variant/20 text-xs tracking-tight">
          <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low/50">
            <div className="font-black text-primary text-base uppercase">OP_09</div>
            <div className="text-on-surface-variant uppercase">SECTOR_7</div>
          </div>
          <div className="flex flex-col py-2 uppercase">
            <button
              onClick={() => setActiveTab('DASHBOARD')}
              className={`flex items-center gap-3 px-6 py-4 transition-all ${activeTab === 'DASHBOARD' ? 'bg-primary text-on-primary-container font-black' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-sm">grid_view</span>
              OVERVIEW
            </button>
            <button
              onClick={() => setActiveTab('CRYPTO_VAL')}
              className={`flex items-center gap-3 px-6 py-4 transition-all ${activeTab === 'CRYPTO_VAL' ? 'bg-primary text-on-primary-container font-black' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-sm">qr_code_2</span>
              SECURE_VAL
            </button>
            <button
              onClick={() => setActiveTab('AUDIT')}
              className={`flex items-center gap-3 px-6 py-4 transition-all ${activeTab === 'AUDIT' ? 'bg-primary text-on-primary-container font-black' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-sm">history_edu</span>
              PAST_LIFE_AUDIT
            </button>
            <button
              onClick={() => setActiveTab('COMM_LINK')}
              className={`flex items-center gap-3 px-6 py-4 transition-all ${activeTab === 'COMM_LINK' ? 'bg-primary text-on-primary-container font-black' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-sm">chat_bubble</span>
              COMM_LINK
            </button>
          </div>
          <div className="mt-auto p-4 pb-16 border-t border-outline-variant/20">
            <div className="flex items-center gap-3 uppercase">
              <div className="w-8 h-8 bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">person</span>
              </div>
              <div>
                <div className="text-primary text-xs font-bold">OPERATOR_LOGGED</div>
                <div className="text-on-surface-variant text-[10px]">AUTH_LVL: 04</div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="ml-64 w-full h-full flex overflow-hidden bg-surface">
          {/* Left Panel: Dynamic Content */}
          <section className={`w-1/2 border-r border-outline-variant/20 flex flex-col p-12 overflow-y-auto custom-scrollbar bg-[#0a0a0c]`}>

            {/* AUDIT VIEW (Sujeto en Riesgo) */}
            {activeTab === 'AUDIT' && (
              <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
                <TracesList />
              </div>
            )}

            {/* CRYPTO_VAL VIEW (El Magnate) */}
            {activeTab === 'CRYPTO_VAL' && (
              <div className="w-full max-w-md mx-auto flex flex-col gap-12 pt-12 animate-in slide-in-from-top duration-500">
                <div className="flex justify-between items-end border-b border-outline-variant/30 pb-6">
                  <h2 className="text-xs font-black text-primary tracking-[0.3em] uppercase">CLEAN BACKGROUND PROOF (ZKP)</h2>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase">ANONYMOUS_VER_4.9</span>
                </div>

                {!isZkVerified ? (
                  <>
                    <div className="relative aspect-square w-full border-2 border-dashed border-outline-variant/50 p-10 bg-black flex items-center justify-center group cursor-pointer" onClick={simulateZkProof}>
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary"></div>

                      <div className={`relative w-64 h-64 bg-white p-6 transition-opacity ${scanning ? 'animate-pulse opacity-50' : 'group-hover:opacity-90'}`}>
                        <img alt="Security validation QR code" className="w-full h-full grayscale opacity-80" src="https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=TabulaRasa_ZK_Clean_Record_Protocol_v4" />
                      </div>
                      {scanning && <div className="scan-line top-1/2 bg-primary"></div>}
                    </div>

                    <div className="space-y-6">
                      <div className="text-center font-bold tracking-widest text-sm text-on-surface uppercase leading-relaxed">
                        {scanning ? 'GENERATING ZK-SNARK...' : 'SCAN TO VALIDATE CLEAN RECORD'}
                      </div>
                      <div className="text-tertiary font-bold text-xs uppercase text-center tracking-[0.2em] animate-pulse">
                        OFAC/INTERPOL CHECKS: ANALYZING BITS...
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-6 py-16 border border-primary/20 bg-primary/5 rounded-sm shadow-inner mt-12 mb-4">
                    <span className="material-symbols-outlined text-6xl text-primary mb-2">verified_user</span>
                    <div className="text-center font-bold tracking-[0.3em] text-xl text-primary uppercase">
                      CLEAN RECORD VERIFIED
                    </div>
                    <div className="text-[11px] text-on-surface-variant uppercase text-center max-w-xs leading-loose tracking-widest font-bold">
                      Background check successful via Zero-Knowledge proof. No PII revealed.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* DASHBOARD VIEW (Overview) */}
            {activeTab === 'DASHBOARD' && (
              <div className="w-full h-full flex flex-col gap-12 py-8 animate-in fade-in duration-300">
                <div className="p-8 border border-primary/20 bg-primary/5 rounded-sm">
                  <h3 className="text-primary font-black text-xl uppercase tracking-tighter mb-4">WELCOME TO TABULA RASA CORE</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed uppercase tracking-widest">
                    Your digital extraction begins here. Use the sidebar to audit your past life footprints or validate your clean record status via ZKP.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 border border-outline-variant/20 bg-surface-container-low flex flex-col gap-4">
                    <span className="material-symbols-outlined text-primary text-3xl">history_edu</span>
                    <h4 className="text-xs font-bold text-on-surface uppercase">Unchecked Traces</h4>
                    <span className="text-2xl font-black text-primary">05 DETECTED</span>
                    <button onClick={() => setActiveTab('AUDIT')} className="text-[10px] text-primary font-bold uppercase hover:underline text-left">GOTO AUDIT MANTLE</button>
                  </div>
                  <div className="p-6 border border-outline-variant/20 bg-surface-container-low flex flex-col gap-4">
                    <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                    <h4 className="text-xs font-bold text-on-surface uppercase">Anony-Clearance</h4>
                    <span className={`text-2xl font-black ${isZkVerified ? 'text-primary' : 'text-on-surface-variant'}`}>{isZkVerified ? 'VALIDATED' : 'PENDING'}</span>
                    <button onClick={() => setActiveTab('CRYPTO_VAL')} className="text-[10px] text-primary font-bold uppercase hover:underline text-left">GOTO ZK-VALIDATION</button>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="mt-auto grid grid-cols-2 gap-px bg-outline-variant/30 border border-outline-variant/30">
                  <div className="bg-surface p-3 space-y-1">
                    <div className="text-[10px] text-on-surface-variant uppercase">Latency</div>
                    <div className="text-xs text-primary">12ms [STABLE]</div>
                  </div>
                  <div className="bg-surface p-3 space-y-1">
                    <div className="text-[10px] text-on-surface-variant uppercase">Encryption</div>
                    <div className="text-xs text-primary">AES-256-GCM</div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Space Chat for Small screens or focused mode */}
            {activeTab === 'COMM_LINK' && (
              <div className="h-full flex items-center justify-center">
                <span className="text-xs text-on-surface-variant uppercase tracking-widest animate-pulse">Switching to full-width tactical link...</span>
              </div>
            )}

          </section>

          {/* Right Panel: Mixnet Chat (Always visible but can be expanded) */}
          <section className="w-1/2 flex flex-col bg-[#0a0a0c] overflow-hidden border-l border-outline-variant/10">
            <div className="h-12 border-b border-outline-variant/20 flex items-center justify-between px-6 bg-[#0e0e10]">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                <span className="text-xs font-bold tracking-tighter uppercase">TACTICAL_LINK [ENCRYPTED]</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-none ${isZkVerified ? 'bg-tertiary-container animate-pulse' : 'bg-surface-container-high'}`}></div>
                  <span className="text-[10px] text-on-surface-variant uppercase">TUNNEL: {isZkVerified ? 'ACTIVE' : 'LOCKED'}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 flex flex-col">
              {!isZkVerified ? (
                <div className="flex-1 flex flex-col items-center justify-center opacity-50 space-y-4">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant">lock</span>
                  <span className="text-xs uppercase text-on-surface-variant tracking-widest px-8 text-center leading-loose">AWAITING ZK CLEARANCE TO OPEN TUNNEL. VALIDATE IN SECURE_VAL SECTION.</span>
                </div>
              ) : (
                <>
                  <div className="group flex flex-col gap-1 items-start">
                    <div className="flex items-center gap-4 w-full justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-highest px-1.5 py-0.5">OP_NODE_09</span>
                      </div>
                    </div>
                    <div className="bg-surface-container-high p-3 border-l-2 border-primary w-fit max-w-[85%] text-xs leading-relaxed text-on-surface">
                      Protocolo Sphinx activo. Metadatos neutralizados. Describa su situación.
                    </div>
                  </div>

                  {messages.map(msg => (
                    <div key={msg.id} className="group flex flex-col gap-1 items-end animate-in slide-in-from-right duration-300">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-primary bg-surface-container-highest px-1.5 py-0.5 uppercase">Client_V</span>
                      </div>
                      <div className="bg-surface-container-low p-3 border-r-2 border-tertiary-container w-fit max-w-[85%] text-xs leading-relaxed text-on-surface">
                        {decryptMock(msg.encryptedPayload)}
                      </div>
                    </div>
                  ))}
                  <div ref={endOfMessagesRef} />
                </>
              )}
            </div>

            <div className="p-4 border-t border-outline-variant/20 bg-[#0e0e10] relative">
              {!isZkVerified && (
                <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center"></div>
              )}
              <form onSubmit={sendMessage} className="flex items-center gap-2 bg-black border border-outline-variant/30 focus-within:border-primary transition-colors">
                <span className="pl-4 text-primary text-xs font-bold">$</span>
                <input
                  className="flex-1 bg-transparent border-none text-xs text-on-surface focus:ring-0 placeholder:text-on-surface-variant uppercase tracking-tight py-3 outline-none"
                  placeholder="ENTER COMMAND..."
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={!isZkVerified || loading}
                />
                <button type="submit" disabled={!isZkVerified || loading} className="bg-primary text-on-primary-container font-black text-xs px-6 py-3 h-full hover:bg-tertiary transition-colors disabled:opacity-50">
                  SEND
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>

      {/* System Status Bar */}
      <footer className="fixed bottom-0 w-full h-6 bg-[#0e0e10] border-t border-outline-variant/20 z-50 flex items-center justify-between px-6 text-[9px] text-on-surface-variant uppercase">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><span className="w-1 h-1 bg-tertiary-container"></span> CPU: 12%</span>
          <span className="flex items-center gap-1"><span className="w-1 h-1 bg-tertiary-container"></span> MEM: 4.2GB</span>
        </div>
        <div className="flex items-center gap-4 font-bold">
          <span className="text-secondary tracking-widest">ENCRYPTION: AES-256-GCM</span>
          <span className="text-primary tracking-widest">STABLE_CONDUIT</span>
        </div>
      </footer>
    </div >
  );
}
