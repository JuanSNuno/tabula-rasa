"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  encryptedPayload: string;
  expiresAt: string;
}

export default function PortalDashboard() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isZkVerified, setIsZkVerified] = useState(false);
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
    <div className="bg-surface text-on-background h-screen w-screen overflow-hidden flex flex-col font-mono selection:bg-primary selection:text-on-primary">
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

      <div className="flex flex-1 pt-12">
        {/* SideNavBar */}
        <nav className="fixed left-0 top-12 h-screen w-64 flex flex-col bg-[#0e0e10] border-r border-outline-variant/20 text-xs tracking-tight">
          <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low/50">
            <div className="font-black text-primary text-base uppercase">OP_09</div>
            <div className="text-on-surface-variant uppercase">SECTOR_7</div>
          </div>
          <div className="flex flex-col py-2 uppercase">
            <a className="flex items-center gap-3 px-6 py-4 bg-primary text-on-primary-container font-bold duration-75 ease-in" href="#">
              <span className="material-symbols-outlined text-sm">grid_view</span>
              DASHBOARD
            </a>
            <a className="flex items-center gap-3 px-6 py-4 text-on-surface-variant hover:bg-surface-container hover:text-primary duration-75 ease-in" href="#">
              <span className="material-symbols-outlined text-sm">qr_code_2</span>
              CRYPTO_VAL
            </a>
            <a className="flex items-center gap-3 px-6 py-4 text-on-surface-variant hover:bg-surface-container hover:text-primary duration-75 ease-in" href="#">
              <span className="material-symbols-outlined text-sm">chat_bubble</span>
              COMM_LINK
            </a>
            <a className="flex items-center gap-3 px-6 py-4 text-on-surface-variant hover:bg-surface-container hover:text-primary duration-75 ease-in" href="#">
              <span className="material-symbols-outlined text-sm">history_edu</span>
              LOGS
            </a>
          </div>
          <div className="mt-auto p-4 border-t border-outline-variant/20">
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
          {/* Left Panel: ZK-KYC Module */}
          <section className={`w-1/2 border-r border-outline-variant/20 flex flex-col p-8 items-center justify-center ${isZkVerified ? 'bg-surface-container' : 'bg-surface-container-lowest'}`}>
            <div className="w-full max-w-md flex flex-col gap-8">
              <div className="flex justify-between items-end border-b border-outline-variant/30 pb-2">
                <h2 className="text-xs font-bold text-on-surface-variant tracking-[0.2em] uppercase">ZK-KYC MODULE_01</h2>
                <span className="text-[10px] text-on-surface-variant uppercase">VER_4.9.0_STABLE</span>
              </div>

              {!isZkVerified ? (
                <>
                  <div className="relative aspect-square w-full border-2 border-dashed border-outline-variant/50 p-8 bg-surface-container-low flex items-center justify-center group cursor-pointer" onClick={simulateZkProof}>
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-on-surface-variant"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-on-surface-variant"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-on-surface-variant"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-on-surface-variant"></div>
                    
                    <div className={`relative w-64 h-64 bg-[#e5e1e4] p-2 mix-blend-difference opacity-90 transition-opacity ${scanning ? 'animate-pulse' : 'group-hover:opacity-100'}`}>
                      <img alt="Security validation QR code" className="w-full h-full grayscale brightness-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4MN4lZJIEShk3NzNCP32iJbUcguNiNVJB7T4IhUG1ymkkTqG77xI0rAc9xsrKUr9htS-Md-uJu3KYUTfL7Bd6etpbBA3-IMKFR4qbl1NFlgGUGVjqHoMDcpVhqFpLLdxrTmx7rG95jWs0CEQBli1kWJByQSTNwesb0YaybigYcY_qCXPwhwkHqUdZPIDk5RSHJAcWEdhIh_MpMaiacR7H31jaAtB6okS9SjIsz89Hg7oJViGC9Bd1SgRvX5rkJ4UyRtE7UFLlPDs"/>
                    </div>
                    {scanning && <div className="scan-line top-1/2"></div>}
                  </div>

                  <div className="space-y-4">
                    <div className="text-center font-bold tracking-widest text-sm text-on-surface uppercase">
                      {scanning ? 'GENERATING ZK-SNARK...' : 'AWAITING ZERO-KNOWLEDGE PROOF. SCAN TO VALIDATE CLEARANCE'}
                    </div>
                    {zkError ? (
                      <div className="flex flex-col gap-2 p-3 bg-error-container text-on-error-container border border-error">
                         <div className="font-bold text-xs uppercase text-center">ERROR: {zkError}</div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 p-3 bg-tertiary/5 border border-tertiary/20">
                        <div className="flex justify-between items-center text-[10px] text-tertiary">
                          <span className="flex items-center gap-1 uppercase">
                            <span className="material-symbols-outlined text-[12px]">warning</span>
                            SYSTEM_LOG:
                          </span>
                          <span>{new Date().toLocaleTimeString()} UTC</span>
                        </div>
                        <div className="text-tertiary font-bold text-xs uppercase">
                          OFAC/INTERPOL CHECKS: PENDING
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
                   <span className="material-symbols-outlined text-6xl text-primary mb-4">verified_user</span>
                   <div className="text-center font-bold tracking-widest text-lg text-primary uppercase">
                      CLEARANCE GRANTED
                   </div>
                   <div className="text-xs text-on-surface-variant uppercase text-center max-w-xs">
                      Identity validated via Zero-Knowledge protocol. Mixnet routing authorized.
                   </div>
                </div>
              )}

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-px bg-outline-variant/30 border border-outline-variant/30">
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
          </section>

          {/* Right Panel: Mixnet Chat */}
          <section className="w-1/2 flex flex-col bg-surface overflow-hidden">
            <div className="h-12 border-b border-outline-variant/20 flex items-center justify-between px-6 bg-surface-container-low">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                <span className="text-xs font-bold tracking-tighter uppercase">MIXNET_COMM_CHANNEL [ENCRYPTED]</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-none ${isZkVerified ? 'bg-tertiary-container animate-pulse' : 'bg-surface-container-high'}`}></div>
                  <span className="text-[10px] text-on-surface-variant uppercase">USERS_ONLINE: {isZkVerified ? '02' : '01'}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 flex flex-col">
              {!isZkVerified ? (
                 <div className="flex-1 flex items-center justify-center opacity-50">
                    <span className="text-xs uppercase text-on-surface-variant tracking-widest">AWAITING ZK CLEARANCE TO OPEN TUNNEL...</span>
                 </div>
              ) : (
                <>
                  <div className="w-full flex items-center gap-4 py-4">
                    <div className="h-px flex-1 bg-outline-variant/20"></div>
                    <span className="text-[10px] text-on-surface-variant font-bold tracking-widest uppercase">CONNECTION_INITIATED_UTC_{new Date().toLocaleTimeString()}</span>
                    <div className="h-px flex-1 bg-outline-variant/20"></div>
                  </div>

                  <div className="group flex flex-col gap-1 items-start">
                    <div className="flex items-center gap-4 w-full justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-highest px-1.5 py-0.5">OP_NODE_09</span>
                        <span className="text-[10px] text-on-surface-variant">{new Date().toLocaleTimeString()}</span>
                      </div>
                      <span className="text-[9px] text-tertiary opacity-70 group-hover:opacity-100 transition-opacity">TTL: 14m 59s</span>
                    </div>
                    <div className="bg-surface-container-high p-3 border-l-2 border-primary w-fit max-w-[85%] text-xs leading-relaxed text-on-surface">
                        Protocolo Sphinx activo. Metadatos neutralizados. Describa su situación.
                    </div>
                  </div>

                  {messages.map(msg => (
                    <div key={msg.id} className="group flex flex-col gap-1 items-end">
                      <div className="flex items-center gap-4 w-full justify-between flex-row-reverse">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-primary bg-surface-container-highest px-1.5 py-0.5 uppercase">Client_V</span>
                          <span className="text-[10px] text-on-surface-variant">{new Date(msg.expiresAt).toLocaleTimeString()}</span>
                        </div>
                        <span className="text-[9px] text-tertiary opacity-70 group-hover:opacity-100 transition-opacity">ENCRYPTED</span>
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

            <div className="p-4 border-t border-outline-variant/20 bg-surface-container-low relative">
              {!isZkVerified && (
                 <div className="absolute inset-0 bg-surface-container-lowest/80 z-10 flex items-center justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">COMMUNICATION LOCKED</span>
                 </div>
              )}
              <form onSubmit={sendMessage} className="flex items-center gap-2 bg-[#0e0e10] border border-outline-variant/30 focus-within:border-primary transition-colors">
                <span className="pl-4 text-primary text-xs font-bold">$</span>
                <input 
                  className="flex-1 bg-transparent border-none text-xs text-on-surface focus:ring-0 placeholder:text-on-surface-variant uppercase tracking-tight py-3 outline-none" 
                  placeholder="ENTER COMMAND OR SECURE MESSAGE..." 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={!isZkVerified || loading}
                />
                <button type="submit" disabled={!isZkVerified || loading} className="bg-primary text-on-primary-container font-bold text-xs px-6 py-3 h-full hover:bg-tertiary hover:text-on-tertiary transition-colors disabled:opacity-50">
                    SEND
                </button>
              </form>
              <div className="mt-2 flex justify-between text-[10px] text-on-surface-variant px-1 uppercase">
                <span>PGP_ENCRYPTION: ENABLED</span>
                <span>CHAR_COUNT: {inputText.length}/256</span>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* System Status Bar */}
      <footer className="fixed bottom-0 w-full h-6 bg-[#0e0e10] border-t border-outline-variant/20 z-50 flex items-center justify-between px-6 text-[9px] text-on-surface-variant uppercase">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><span className="w-1 h-1 bg-tertiary-container"></span> CPU_LOAD: 12%</span>
          <span className="flex items-center gap-1"><span className="w-1 h-1 bg-tertiary-container"></span> MEM_UTIL: 4.2GB</span>
          <span className="flex items-center gap-1"><span className="w-1 h-1 bg-tertiary-container"></span> UPTIME: 00:42:19</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-on-surface-variant">LAT: 51.5074° N, 0.1278° W</span>
          <span className="text-on-surface-variant">PACKET_LOSS: 0.00%</span>
          <span className="text-primary font-bold">STABLE_CONDUIT</span>
        </div>
      </footer>
    </div>
  );
}
