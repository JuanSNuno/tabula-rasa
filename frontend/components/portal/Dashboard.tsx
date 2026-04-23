"use client";

import React, { useState, useEffect, useRef } from 'react';
import TracesList from './TracesList';
import EvacRouteMap from './EvacRouteMap';

interface Message {
  id: string;
  encryptedPayload: string;
  expiresAt: string;
}

type TabMode = 'DASHBOARD' | 'CRYPTO_VAL' | 'COMM_LINK' | 'AUDIT' | 'EVAC_ROUTE';

export default function PortalDashboard() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isZkVerified, setIsZkVerified] = useState(false);
  const [activeTab, setActiveTab] = useState<TabMode>('DASHBOARD');
  const [error, setError] = useState<string | null>(null);

  // ZK State
  const [scanning, setScanning] = useState(false);
  const [zkError, setZkError] = useState<string | null>(null);

  // Access Pass State (Pase de Acceso Temporal del Operador de Admisión)
  const [accessPass, setAccessPass] = useState<string | null>(null);
  const [accessPassExpiry, setAccessPassExpiry] = useState<Date | null>(null);
  const [passCountdown, setPassCountdown] = useState<string>('');
  const [passGrantError, setPassGrantError] = useState<string | null>(null);

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

  // Poll Chat Messages: solo si hay sesión verificada Y pase de acceso concedido
  useEffect(() => {
    if (!sessionId || !isZkVerified || !accessPass) return;

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
  }, [sessionId, isZkVerified, accessPass]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Countdown del TTL del pase de acceso
  useEffect(() => {
    if (!accessPassExpiry) return;

    const tick = () => {
      const now = new Date();
      const diffMs = accessPassExpiry.getTime() - now.getTime();
      if (diffMs <= 0) {
        setPassCountdown('EXPIRADO');
        setAccessPass(null);
        setIsZkVerified(false);
        return;
      }
      const hh = Math.floor(diffMs / 3600000).toString().padStart(2, '0');
      const mm = Math.floor((diffMs % 3600000) / 60000).toString().padStart(2, '0');
      const ss = Math.floor((diffMs % 60000) / 1000).toString().padStart(2, '0');
      setPassCountdown(`${hh}:${mm}:${ss}`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [accessPassExpiry]);

  // ── MEDIDAS ANTI-RASTRO ──────────────────────────────────────────────────────

  // Panic Key: Ctrl+Shift+X — borra todo rastro en memoria y redirige a página de fachada
  useEffect(() => {
    const handlePanic = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        // Destruir estado en memoria RAM del navegador
        setMessages([]);
        setInputText('');
        // Restaurar título de fachada antes de redirigir
        document.title = 'LegacyGuard Systems | Institutional Auditing';
        // Reemplazar historial para que la página no aparezca en "Atrás"
        window.location.replace('about:blank');
      }
    };
    window.addEventListener('keydown', handlePanic);
    return () => window.removeEventListener('keydown', handlePanic);
  }, []);

  // Title Masking: enmascara la pestaña con el título de fachada cuando pierde el foco
  useEffect(() => {
    const FACADE_TITLE = 'LegacyGuard Systems | Institutional Auditing';
    const ACTIVE_TITLE  = 'TACTICAL_LINK [ACTIVE] ●';

    const handleVisibility = () => {
      document.title = document.hidden ? FACADE_TITLE : ACTIVE_TITLE;
    };

    if (isZkVerified && accessPass) {
      document.title = ACTIVE_TITLE;
    }

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      // Restaurar título de fachada al desmontar el componente
      document.title = FACADE_TITLE;
    };
  }, [isZkVerified, accessPass]);

  // beforeunload: limpiar estado local al cerrar la pestaña.
  // Los mensajes en Redis expiran automáticamente (TTL 15min / sesión 4h).
  useEffect(() => {
    const handleUnload = () => {
      setMessages([]);
      setInputText('');
      document.title = 'LegacyGuard Systems | Institutional Auditing';
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────

  // Solicitar el pase de acceso temporal al Operador de Admisión
  // Se llama automáticamente cuando la verificación ZK es exitosa
  const grantAccessPass = async (verifiedSessionId: string) => {
    setPassGrantError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/v1/session/${verifiedSessionId}/grant-pass`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        setAccessPass(data.accessPass);
        // El pase expira cuando la sesión expira (ExpiresAt del backend)
        setAccessPassExpiry(new Date(data.expiresAt));
      } else {
        const errData = await res.json();
        setPassGrantError(errData.error || 'Error al obtener el pase de acceso.');
      }
    } catch {
      setPassGrantError('Error de conexión al solicitar pase de acceso.');
    }
  };

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
            // Tras verificación ZK exitosa, solicitar el pase de acceso al Operador
            await grantAccessPass(sessionId);
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
          {/* Banner del Pase de Acceso Temporal en el header */}
          {accessPass && (
            <div className="flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1 rounded-sm">
              <span className="material-symbols-outlined text-primary text-xs">key</span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest">PASS: {accessPass.toUpperCase()}</span>
              <span className="text-[10px] text-on-surface-variant">TTL: {passCountdown}</span>
            </div>
          )}
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
              onClick={() => setActiveTab('EVAC_ROUTE')}
              className={`flex items-center gap-3 px-6 py-4 transition-all ${activeTab === 'EVAC_ROUTE' ? 'bg-primary text-on-primary-container font-black' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-sm">route</span>
              EVAC_ROUTE
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

            {/* EVAC ROUTE VIEW (Sujeto en Riesgo) */}
            {activeTab === 'EVAC_ROUTE' && (
              <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
                {/* Pasar los mensajes descifrados del COMM_LINK para que el mapa reaccione */}
                <EvacRouteMap messages={messages.map(m => decryptMock(m.encryptedPayload))} />
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
                    {/* Panel de Simulación ZK — MVP: la verificación se activa desde el navegador */}
                    <div className="w-full border border-outline-variant/30 bg-black flex flex-col overflow-hidden">
                      {/* Terminal header */}
                      <div className="flex items-center gap-2 px-4 py-2 bg-[#0e0e10] border-b border-outline-variant/20">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        <span className="w-2 h-2 rounded-full bg-yellow-600"></span>
                        <span className="w-2 h-2 rounded-full bg-green-600"></span>
                        <span className="ml-3 text-[10px] text-on-surface-variant uppercase tracking-widest">zk_verifier_v4.9 — protocol_sim</span>
                      </div>

                      {/* Terminal output */}
                      <div className="p-6 space-y-2 text-xs font-mono">
                        <p className="text-on-surface-variant"><span className="text-primary">$</span> init_zk_protocol --mode=ofac_interpol_check</p>
                        <p className="text-green-500 animate-pulse">▶ Generando zk-SNARK circuit...</p>
                        <p className="text-on-surface-variant">▶ Protocol: <span className="text-primary">Polygon ID / Groth16</span></p>
                        <p className="text-on-surface-variant">▶ Scope: <span className="text-primary">SDN / Red Notices / PEP Lists</span></p>
                        <p className="text-on-surface-variant">▶ PII exposed: <span className="text-tertiary-container font-bold">NONE</span></p>
                        <p className="text-on-surface-variant">▶ Session: <span className="text-primary">{sessionId ? sessionId.substring(0, 16) + '...' : 'PENDING'}</span></p>
                        <div className="border-t border-outline-variant/20 pt-3 mt-3">
                          <p className="text-on-surface-variant text-[10px] leading-relaxed uppercase tracking-widest">
                            [MVP] Protocolo simulado. En producción, se integrará con wallet ZK (Polygon ID / Semaphore). La prueba zero-knowledge valida que el cliente no figura en listas de sanciones sin revelar su identidad.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Estado de escaneo y botón de activación */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 border border-outline-variant/20 px-4 py-3 bg-surface-container-low">
                        <span className={`w-2 h-2 rounded-none flex-shrink-0 ${scanning ? 'bg-primary animate-pulse' : 'bg-surface-container-highest'}`}></span>
                        <span className="text-xs text-on-surface-variant uppercase tracking-widest">
                          {scanning ? 'GENERANDO ZK-SNARK... AGUARDE' : 'PROTOCOLO EN ESPERA DE ACTIVACIÓN'}
                        </span>
                      </div>

                      <button
                        id="btn-zk-verify"
                        onClick={simulateZkProof}
                        disabled={scanning || !sessionId}
                        className="w-full bg-primary text-on-primary-container font-black text-xs py-4 px-6 uppercase tracking-[0.2em] hover:bg-primary/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-primary/50"
                      >
                        {scanning ? (
                          <>
                            <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                            GENERANDO ZK-SNARK...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-sm">verified_user</span>
                            TRANSMITIR PRUEBA ZK
                          </>
                        )}
                      </button>

                      <div className="text-tertiary font-bold text-[10px] uppercase text-center tracking-[0.2em] animate-pulse">
                        OFAC / INTERPOL / SDN CHECKS: STANDBY
                      </div>
                    </div>

                    {/* Error de ZK */}
                    {zkError && (
                      <div className="border border-red-900/50 bg-red-950/20 p-4">
                        <p className="text-red-500 text-xs uppercase tracking-widest animate-pulse">&gt; ERROR: {zkError}</p>
                      </div>
                    )}
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

                    {/* Pase de Acceso Temporal - Otorgado por el Operador de Admisión */}
                    {accessPass ? (
                      <div className="w-full mt-4 border border-primary/50 bg-black p-6 space-y-4">
                        <div className="flex items-center gap-2 border-b border-primary/20 pb-3">
                          <span className="material-symbols-outlined text-primary text-lg">key</span>
                          <span className="text-xs font-black text-primary tracking-[0.2em] uppercase">Pase de Acceso Temporal</span>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Token de Acceso</div>
                          <div className="text-primary font-black text-lg tracking-[0.15em] uppercase border border-primary/30 bg-primary/5 px-3 py-2 rounded-sm">
                            {accessPass.toUpperCase()}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Expira en</div>
                            <div className="text-primary font-black text-base tracking-widest font-mono">{passCountdown}</div>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">Estado</div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-none"></span>
                              <span className="text-[10px] text-primary font-bold uppercase">Activo</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest leading-relaxed border-t border-outline-variant/20 pt-3">
                          Este pase es efímero y no rastreable. No crea cuenta ni contraseña. Expirará automáticamente.
                        </p>
                      </div>
                    ) : passGrantError ? (
                      <div className="w-full mt-4 border border-red-900/50 bg-red-950/20 p-4">
                        <p className="text-red-500 text-xs uppercase tracking-widest animate-pulse">&gt; ERROR: {passGrantError}</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 animate-pulse mt-4">
                        <span className="material-symbols-outlined text-on-surface-variant text-sm">hourglass_top</span>
                        <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Solicitando pase al Operador...</span>
                      </div>
                    )}
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

            {/* COMM_LINK VIEW — Consola de Chat Efímera Anti-Rastro (Prospecto Validado) */}
            {activeTab === 'COMM_LINK' && (
              <div className="h-full flex flex-col animate-in fade-in duration-200 overflow-hidden">

                {/* Console header */}
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-4 flex-shrink-0">
                  <div>
                    <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Modo: Consola Anti-Rastro / Sin Historial</div>
                    <div className="text-xs font-black text-primary uppercase tracking-widest">COMM_LINK CONSOLE</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {accessPass && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-none"></span>
                        <span className="text-[10px] text-primary uppercase tracking-widest font-bold">PASS ACTIVO</span>
                      </div>
                    )}
                    {/* Botón de pánico — visible y accesible */}
                    <div
                      id="panic-btn"
                      title="Tecla de pánico: Ctrl+Shift+X — Destruye todos los rastros en memoria"
                      className="flex items-center gap-1.5 border border-red-900/60 px-2 py-1 cursor-help select-none"
                    >
                      <span className="material-symbols-outlined text-red-600 text-xs">emergency</span>
                      <span className="text-[9px] text-red-600 uppercase tracking-widest font-bold">PÁNICO: Ctrl+⇧+X</span>
                    </div>
                  </div>
                </div>

                {!accessPass ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 opacity-50">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant">lock</span>
                    <span className="text-xs text-on-surface-variant uppercase tracking-widest text-center leading-loose px-8">
                      SE REQUIERE PASE DE ACCESO TEMPORAL.<br />
                      COMPLETA LA VERIFICACIÓN ZK EN SECURE_VAL.
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Barra de estado anti-rastro */}
                    <div className="flex flex-wrap items-center gap-3 text-[9px] text-on-surface-variant uppercase tracking-widest mb-4 border border-outline-variant/10 px-3 py-2 bg-surface-container-low/30 flex-shrink-0">
                      <span className="flex items-center gap-1"><span className="w-1 h-1 bg-primary"></span> TTL MENSAJES: 15MIN</span>
                      <span className="text-outline-variant">|</span>
                      <span>CIFRADO: AES-256-GCM</span>
                      <span className="text-outline-variant">|</span>
                      <span className="text-primary font-bold">HISTORIAL: NO GUARDADO</span>
                      <span className="text-outline-variant">|</span>
                      <span>AUTOCOMPLETE: DESACTIVADO</span>
                    </div>

                    {/* Stream de mensajes — no seleccionable para evitar copiar al portapapeles del SO */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 mb-4 no-select-log">
                      {/* Mensaje de bienvenida del sistema */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-highest px-1.5 py-0.5 w-fit uppercase">SYS_NODE</span>
                        <div className="bg-surface-container-high p-3 border-l-2 border-outline-variant/40 w-fit max-w-[90%] text-xs leading-relaxed text-on-surface-variant font-mono">
                          Protocolo Sphinx activo. Metadatos neutralizados. Los mensajes se destruyen en 15min. No existe registro de esta conversación.
                        </div>
                      </div>

                      {messages.length === 0 && (
                        <p className="text-on-surface-variant/40 text-[10px] animate-pulse font-mono">
                          ▶ Esperando respuesta del equipo de extracción...
                        </p>
                      )}

                      {messages.map((msg) => {
                        const expiresAt = new Date(msg.expiresAt);
                        const now = new Date();
                        const minsLeft = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 60000));
                        return (
                          <div key={msg.id} className="flex flex-col gap-0.5 items-end animate-in slide-in-from-bottom duration-200">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] text-on-surface-variant/50 uppercase">TTL: {minsLeft}min</span>
                              <span className="text-[10px] font-bold text-primary bg-surface-container-highest px-1.5 py-0.5 uppercase">CLIENT_V</span>
                            </div>
                            <div className="bg-surface-container-low p-3 border-r-2 border-primary/60 w-fit max-w-[90%] text-xs leading-relaxed text-on-surface font-mono">
                              {decryptMock(msg.encryptedPayload)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Input terminal anti-rastro */}
                    <form onSubmit={sendMessage} className="flex flex-col gap-2 flex-shrink-0">
                      <div className="flex items-center gap-2 bg-black border border-outline-variant/30 focus-within:border-primary transition-colors">
                        <span className="pl-4 text-primary text-xs font-bold font-mono">$</span>
                        <input
                          id="comm-link-input"
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          disabled={loading}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck={false}
                          placeholder="INGRESE MENSAJE — NO SE GUARDA HISTORIAL..."
                          className="flex-1 bg-transparent border-none text-xs text-on-surface focus:ring-0 placeholder:text-on-surface-variant/40 uppercase tracking-tight py-3 outline-none font-mono"
                        />
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-primary text-on-primary-container font-black text-xs px-6 py-3 h-full hover:bg-primary/80 transition-colors disabled:opacity-50"
                        >
                          TX
                        </button>
                      </div>
                      <p className="text-[9px] text-on-surface-variant/40 uppercase tracking-widest">
                        Sin historial. Mensajes destruidos en 15min. Tecla de pánico: <span className="text-red-600 font-bold">Ctrl+Shift+X</span>
                      </p>
                    </form>
                  </>
                )}
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
              {!isZkVerified || !accessPass ? (
                <div className="flex-1 flex flex-col items-center justify-center opacity-50 space-y-4">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant">lock</span>
                  <span className="text-xs uppercase text-on-surface-variant tracking-widest px-8 text-center leading-loose">
                    {!isZkVerified
                      ? 'AWAITING ZK CLEARANCE TO OPEN TUNNEL. VALIDATE IN SECURE_VAL SECTION.'
                      : 'AWAITING ACCESS PASS FROM ADMISSION OPERATOR...'}
                  </span>
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
              {(!isZkVerified || !accessPass) && (
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
                  disabled={!isZkVerified || !accessPass || loading}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                <button type="submit" disabled={!isZkVerified || !accessPass || loading} className="bg-primary text-on-primary-container font-black text-xs px-6 py-3 h-full hover:bg-tertiary transition-colors disabled:opacity-50">
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
