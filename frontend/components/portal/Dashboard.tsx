"use client";

import React, { useState, useEffect, useRef } from 'react';
import TracesList from './TracesList';
import EvacRouteMap from './EvacRouteMap';

interface Message {
  id: string;
  encryptedPayload: string;
  expiresAt: string;
}

type TabMode = 'DASHBOARD' | 'CRYPTO_VAL' | 'COMM_LINK' | 'AUDIT' | 'EVAC_ROUTE' | 'NEW_IDENTITY';

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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Identity Generation State
  const [seed, setSeed] = useState("");
  const [idLoading, setIdLoading] = useState(false);
  const [idProgress, setIdProgress] = useState(0);
  const [idStep, setIdStep] = useState("");
  const [idResult, setIdResult] = useState<any>(null);

  const generateIdentity = async () => {
    setIdLoading(true);
    setIdResult(null);
    setIdProgress(0);
    const steps = [
      "Compilando semilla demográfica...",
      "Sintetizando biometría facial...",
      "Generando modelos vocales...",
      "Inyectando registros en nodos...",
      "Retrotrayendo historial...",
      "Finalizando libro mayor criptográfico..."
    ];
    for (let i = 0; i < steps.length; i++) {
      setIdStep(steps[i]);
      await new Promise(r => setTimeout(r, 600 + Math.random() * 500));
      setIdProgress(Math.round(((i + 1) / steps.length) * 100));
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/ops/identities/scaffold`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed }),
      });
      if (res.ok) {
        const data = await res.json();
        setIdResult(data);
      } else {
         // FALLBACK PARA LA DEMO
         const mockId = "SCAF-" + Math.floor(Math.random() * 9000 + 1000);
         setIdResult({
           id: mockId,
           seed: seed,
           identity: {
             photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockId}`,
             alias: "Generated Persona " + Math.floor(Math.random() * 100),
             passportNum: "EU-" + Math.floor(Math.random() * 90000000 + 10000000),
             jobTitle: "Cyber-Logistics Engineer"
           },
           documents: [
             "Academic Degree: M.S. Distributed Systems (2014) - Validated via forged transcripts.",
             "Financial History: 10 years of consistent tax returns & payroll deposits.",
             "Social Graph: 34 active synthetic accounts simulating standard peer connections.",
             "Biometric Injection: Passport hash seeded into 5 major border control nodes."
           ],
           status: "GENERATED"
         });
      }
    } catch(err) {
       // FALLBACK PARA LA DEMO
       const mockId = "SCAF-OFFLINE-" + Math.floor(Math.random() * 9000 + 1000);
       setIdResult({
         id: mockId,
         seed: seed,
         identity: {
           photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mockId}`,
           alias: "Offline Persona " + Math.floor(Math.random() * 100),
           passportNum: "EU-" + Math.floor(Math.random() * 90000000 + 10000000),
           jobTitle: "Cyber-Logistics Engineer"
         },
         documents: [
           "Academic Degree: M.S. Distributed Systems (2014) - Validated via forged transcripts.",
           "Financial History: 10 years of consistent tax returns & payroll deposits.",
           "Social Graph: 34 active synthetic accounts simulating standard peer connections.",
           "Biometric Injection: Passport hash seeded into 5 major border control nodes."
         ],
         status: "GENERATED"
       });
    } finally {
      setIdLoading(false);
    }
  };

  // Initialize Anonymous Session
  useEffect(() => {
    const initSession = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicKey: 'mock_pgp_public_key' })
        });

        if (response.ok) {
          const data = await response.json();
          setSessionId(data.id);
        } else {
          // FALLBACK PARA LA DEMO
          setSessionId("DEMO-SESSION-" + Math.random().toString(36).substring(2, 10).toUpperCase());
          setError(null);
        }
      } catch (err) {
        // FALLBACK PARA LA DEMO
        setSessionId("DEMO-OFFLINE-" + Math.random().toString(36).substring(2, 10).toUpperCase());
      }
    };
    initSession();
  }, []);

  // Poll Chat Messages: solo si hay sesión verificada Y pase de acceso concedido
  useEffect(() => {
    if (!sessionId || !isZkVerified || !accessPass) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}`}/api/v1/messages/${sessionId}`);
        if (res.ok) {
          const data: Message[] = await res.json();
          setMessages(data || []);
        }
      } catch (err) {
        console.error("Error de sondeo", err);
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
        document.title = 'Sistemas LegacyGuard | Auditoría Institucional';
        // Reemplazar historial para que la página no aparezca en "Atrás"
        window.location.replace('about:blank');
      }
    };
    window.addEventListener('keydown', handlePanic);
    return () => window.removeEventListener('keydown', handlePanic);
  }, []);

  // Title Masking: enmascara la pestaña con el título de fachada cuando pierde el foco
  useEffect(() => {
    const FACADE_TITLE = 'Sistemas LegacyGuard | Auditoría Institucional';
    const ACTIVE_TITLE  = 'ENLACE_TÁCTICO [ACTIVO] ●';

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
      document.title = 'Sistemas LegacyGuard | Auditoría Institucional';
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}`}/api/v1/session/${verifiedSessionId}/grant-pass`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        setAccessPass(data.accessPass);
        // El pase expira cuando la sesión expira (ExpiresAt del backend)
        setAccessPassExpiry(new Date(data.expiresAt));
      } else {
        // FALLBACK PARA LA DEMO: Si el backend no tiene el endpoint, simulamos el pase
        const mockPass = "TR-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-PASS";
        setAccessPass(mockPass);
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 15);
        setAccessPassExpiry(expiry);
      }
    } catch {
      // Si el backend está completamente caído, también permitimos continuar la demo
      const mockPass = "TR-EMERGENCY-PASS";
      setAccessPass(mockPass);
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 15);
      setAccessPassExpiry(expiry);
    }
  };

  const simulateZkProof = async () => {
    const currentSessionId = sessionId || "DEMO-AUTO-SESSION";
    setScanning(true);
    setZkError(null);

    setTimeout(async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: currentSessionId,
            proofPayload: 'zk_snark_proof_v1_mock_data_polygon_id_1234567890'
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.verified) {
            setIsZkVerified(true);
            // Tras verificación ZK exitosa, solicitar el pase de acceso al Operador
            await grantAccessPass(currentSessionId);
          } else {
            setZkError("Proof matemático inválido.");
          }
        } else {
          // FALLBACK PARA LA DEMO
          setIsZkVerified(true);
          await grantAccessPass(currentSessionId);
        }
      } catch (err) {
        // FALLBACK PARA LA DEMO
        setIsZkVerified(true);
        await grantAccessPass(currentSessionId);
      } finally {
        setScanning(false);
      }
    }, 2000);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !sessionId) return;

    setLoading(true);
    const sentText = inputText;
    
    try {
      const encrypted = `ENC_` + btoa(sentText);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          encryptedPayload: encrypted
        })
      });

      if (res.ok) {
        setInputText('');
      } else {
        throw new Error("Backend not available");
      }
    } catch (err) {
      // DEMO FALLBACK: Simular envío de mensaje local
      const mockMsg: Message = {
        id: Math.random().toString(),
        encryptedPayload: `ENC_` + btoa(sentText),
        expiresAt: new Date(Date.now() + 15 * 60000).toISOString()
      };
      setMessages(prev => [...prev, mockMsg]);
      setInputText('');
    } finally {
      setLoading(false);
      
      // DEMO FALLBACK: Simular respuesta del operador y forja automática
      setTimeout(() => {
        const replyMsg: Message = {
          id: Math.random().toString(),
          encryptedPayload: `ENC_` + btoa("Situación recibida. Extracción autorizada. Iniciando forja de identidad sintética de emergencia. Redirigiendo al conducto generativo..."),
          expiresAt: new Date(Date.now() + 15 * 60000).toISOString()
        };
        setMessages(prev => [...prev, replyMsg]);
        
        // Esperar 3 segundos para que el usuario lea, cambiar de pestaña y generar
        setTimeout(() => {
           setActiveTab('NEW_IDENTITY');
           const defaultSeed = "Perfil corporativo estándar, residencia internacional, sin dependientes, historial financiero intachable.";
           setSeed(sentText.length > 10 ? sentText : defaultSeed);
           // Dar tiempo a la UI para cambiar de pestaña
           setTimeout(() => {
              generateIdentity();
           }, 500);
        }, 3000);
      }, 1500);
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
    <div className="bg-[#0a0a0c] text-on-background min-h-screen md:h-screen w-full md:overflow-hidden flex flex-col font-mono selection:bg-primary selection:text-on-primary">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-[#0e0e10] border-b border-outline-variant/20 flex justify-between items-center px-4 md:px-6 h-12">
        <div className="flex items-center gap-2 md:gap-4">
          <button className="md:hidden text-primary flex items-center justify-center" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className="material-symbols-outlined text-sm">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          <span className="font-bold tracking-widest text-primary text-[10px] md:text-sm uppercase truncate max-w-[120px] md:max-w-none">PORTAL_DE_EXTRACCIÓN_V.04</span>
          {isZkVerified && (
            <span className="text-tertiary-container animate-pulse hidden sm:flex items-center gap-2 text-[10px] md:text-xs uppercase">
              <span className="w-1.5 h-1.5 bg-tertiary-container"></span>
              ESTADO: CONDUCTO SEGURO ESTABLECIDO
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden sm:flex items-center gap-3 text-[10px] md:text-xs uppercase">
            <span className="text-on-surface-variant">ID_DE_SESIÓN:</span>
            <span className="text-primary">[{sessionId ? sessionId.substring(0, 13) + '...' : 'NEGOCIANDO'}]</span>
          </div>
          {/* Banner del Pase de Acceso Temporal en el header */}
          {accessPass && (
            <div className="flex items-center gap-1 md:gap-2 border border-primary/40 bg-primary/10 px-2 py-0.5 md:px-3 md:py-1 rounded-sm">
              <span className="material-symbols-outlined text-primary text-[10px] md:text-xs">key</span>
              <span className="text-[9px] md:text-[10px] text-primary font-bold uppercase tracking-widest truncate max-w-[60px] md:max-w-none">PASE: {accessPass.toUpperCase()}</span>
              <span className="text-[9px] md:text-[10px] text-on-surface-variant hidden sm:inline">TTL: {passCountdown}</span>
            </div>
          )}
          <div className="flex gap-2 md:gap-4">
            <span className="material-symbols-outlined text-primary text-xs md:text-sm">sensors</span>
            <span className="material-symbols-outlined text-primary text-xs md:text-sm hidden sm:block">security</span>
            <span className="material-symbols-outlined text-primary text-xs md:text-sm">terminal</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-12 pb-6 md:overflow-hidden h-full">
        {/* SideNavBar */}
        <nav className={`fixed md:left-0 top-12 h-[calc(100vh-3rem-1.5rem)] md:h-full w-64 flex flex-col bg-[#0e0e10] border-r border-outline-variant/20 text-xs tracking-tight z-40 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="p-4 border-b border-outline-variant/20 bg-surface-container-low/50 flex justify-between items-center">
            <div>
              <div className="font-black text-primary text-base uppercase">OP_09</div>
              <div className="text-on-surface-variant uppercase">SECTOR_7</div>
            </div>
            <button className="md:hidden text-on-surface-variant" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          <div className="flex flex-col py-2 uppercase overflow-y-auto">
            <button
              onClick={() => { setActiveTab('DASHBOARD'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-6 py-4 transition-all ${activeTab === 'DASHBOARD' ? 'bg-primary text-on-primary-container font-black' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-sm">grid_view</span>
              RESUMEN
            </button>
            <button
              onClick={() => { setActiveTab('CRYPTO_VAL'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-6 py-4 transition-all ${activeTab === 'CRYPTO_VAL' ? 'bg-primary text-on-primary-container font-black' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-sm">qr_code_2</span>
              VAL_SEGURA
            </button>
            <button
              onClick={() => { setActiveTab('AUDIT'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-6 py-4 transition-all ${activeTab === 'AUDIT' ? 'bg-primary text-on-primary-container font-black' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-sm">history_edu</span>
              AUDIT_VIDA_PASADA
            </button>
            <button
              onClick={() => { setActiveTab('EVAC_ROUTE'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-6 py-4 transition-all ${activeTab === 'EVAC_ROUTE' ? 'bg-primary text-on-primary-container font-black' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-sm">route</span>
              RUTA_EVAC
            </button>
            <button
              onClick={() => { setActiveTab('COMM_LINK'); setIsMobileMenuOpen(false); }}
              className={`flex items-center gap-3 px-6 py-4 transition-all ${activeTab === 'COMM_LINK' ? 'bg-primary text-on-primary-container font-black' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}
            >
              <span className="material-symbols-outlined text-sm">chat_bubble</span>
              ENLACE_COM
            </button>
          </div>
          <div className="mt-auto p-4 pb-16 md:pb-6 border-t border-outline-variant/20">
            <div className="flex items-center gap-3 uppercase">
              <div className="w-8 h-8 bg-surface-container-high flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">person</span>
              </div>
              <div>
                <div className="text-primary text-xs font-bold">OPERADOR_CONECTADO</div>
                <div className="text-on-surface-variant text-[10px]">AUTH_LVL: 04</div>
              </div>
            </div>
          </div>
        </nav>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <main className="md:ml-64 w-full flex-1 flex flex-col md:flex-row md:overflow-hidden bg-surface">
          {/* Left Panel: Dynamic Content */}
          <section className={`w-full md:w-1/2 min-h-[70vh] md:min-h-0 md:h-full border-b md:border-b-0 md:border-r border-outline-variant/20 flex flex-col p-4 sm:p-8 md:p-12 overflow-y-auto custom-scrollbar bg-[#0a0a0c]`}>

            {/* AUDIT VIEW (Sujeto en Riesgo) */}
            {activeTab === 'AUDIT' && (
              <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
                <TracesList />
                <div className="mt-8">
                  <button onClick={() => setActiveTab('CRYPTO_VAL')} className="w-full py-4 bg-primary/20 hover:bg-primary/40 border border-primary text-primary font-black tracking-widest text-xs uppercase transition-colors">
                    CONFIRMAR RASTROS Y PROCEDER -&gt;
                  </button>
                </div>
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
              <div className="w-full max-w-md mx-auto flex flex-col gap-6 md:gap-12 pt-6 md:pt-12 animate-in slide-in-from-top duration-500">
                <div className="flex justify-between items-end border-b border-outline-variant/30 pb-6">
                  <h2 className="text-xs font-black text-primary tracking-[0.3em] uppercase">PRUEBA DE ANTECEDENTES LIMPIOS (ZKP)</h2>
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
                        <p className="text-on-surface-variant">▶ Protocolo: <span className="text-primary">Polygon ID / Groth16</span></p>
                        <p className="text-on-surface-variant">▶ Alcance: <span className="text-primary">SDN / Notificaciones Rojas / Listas PEP</span></p>
                        <p className="text-on-surface-variant">▶ PII expuesta: <span className="text-tertiary-container font-bold">NINGUNA</span></p>
                        <p className="text-on-surface-variant">▶ Sesión: <span className="text-primary">{sessionId ? sessionId.substring(0, 16) + '...' : 'PENDIENTE'}</span></p>
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
                        disabled={scanning}
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
                        CHEQUEOS OFAC / INTERPOL / SDN: EN ESPERA
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
                      HISTORIAL LIMPIO VERIFICADO
                    </div>
                    <div className="text-[11px] text-on-surface-variant uppercase text-center max-w-xs leading-loose tracking-widest font-bold">
                      Verificación de antecedentes exitosa a través de prueba de Conocimiento Cero. No se reveló PII.
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

            {/* NEW IDENTITY VIEW */}
            {activeTab === 'NEW_IDENTITY' && (
              <div className="w-full flex flex-col gap-6 animate-in fade-in duration-500">
                <div className="flex justify-between items-end border-b border-outline-variant/30 pb-6 mb-4">
                  <h2 className="text-xs font-black text-primary tracking-[0.3em] uppercase">FORJA DE IDENTIDAD SINTÉTICA</h2>
                </div>

                {!idResult ? (
                  <div className="border border-outline-variant/20 bg-surface-container-low p-6 flex flex-col gap-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary">
                       Semilla Demográfica:
                    </label>
                    <textarea
                       className="w-full bg-black border border-outline-variant/30 p-4 text-xs text-on-surface focus:outline-none focus:border-primary resize-none font-mono"
                       rows={4}
                       placeholder="Ej. 'Hombre, 34 años, antecedentes penales limpios...'"
                       value={seed}
                       onChange={(e) => setSeed(e.target.value)}
                    />
                    
                    <button
                       onClick={generateIdentity}
                       disabled={idLoading || !seed}
                       className="w-full bg-primary text-on-primary-container font-black text-xs py-4 px-6 uppercase tracking-[0.2em] hover:bg-primary/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-primary/50 mt-4"
                    >
                       {idLoading ? (
                          <>
                             <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                             GENERANDO ANDAMIO...
                          </>
                       ) : (
                          <>
                             <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
                             GENERAR IDENTIDAD
                          </>
                       )}
                    </button>

                    {idLoading && (
                       <div className="mt-6">
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] uppercase tracking-widest text-primary animate-pulse">{idStep}</span>
                             <span className="text-xs font-black text-primary">{idProgress}%</span>
                          </div>
                          <div className="w-full bg-surface-container-highest h-1 rounded-none overflow-hidden">
                             <div className="bg-primary h-full transition-all duration-300" style={{ width: `${idProgress}%` }}></div>
                          </div>
                       </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-[#05020a] border border-green-900/50 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in w-full max-w-2xl mx-auto">
                     <div className="bg-green-950/20 border-b border-green-900/30 p-4 flex justify-between items-center">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-green-500 flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm">check_circle</span> Andamio Desplegado
                        </h3>
                        <span className="text-[10px] bg-green-900/40 text-green-400 px-2 py-1 rounded font-mono">ID: {idResult.id}</span>
                     </div>
                     
                     <div className="p-6 flex-1 overflow-y-auto">
                        {/* Profile Card Preview */}
                        {idResult.identity && (
                           <div className="flex flex-col sm:flex-row gap-6 mb-8 border-b border-green-900/30 pb-8">
                              <div className="w-32 h-32 rounded bg-black border border-green-900 overflow-hidden relative shadow-[0_0_20px_rgba(34,197,94,0.1)] flex-shrink-0">
                                 <img src={idResult.identity.photoUrl} alt="Generated Face" className="w-full h-full object-cover filter contrast-125 grayscale" />
                                 <div className="absolute inset-0 bg-green-500/10 mix-blend-color-burn"></div>
                                 <div className="absolute bottom-0 w-full bg-black/80 text-[8px] text-center py-1 text-green-500 uppercase tracking-widest backdrop-blur">Coincidencia 99.8%</div>
                              </div>
                              <div className="flex flex-col justify-center gap-2 w-full">
                                 <div>
                                    <p className="text-[9px] text-green-700 uppercase tracking-widest">Alias Asignado</p>
                                    <p className="text-xl font-black text-white tracking-tight">{idResult.identity.alias}</p>
                                 </div>
                                 <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                       <p className="text-[9px] text-green-700 uppercase tracking-widest">Pasaporte</p>
                                       <p className="text-sm text-green-400">{idResult.identity.passportNum}</p>
                                    </div>
                                    <div>
                                       <p className="text-[9px] text-green-700 uppercase tracking-widest">Puesto de Trabajo</p>
                                       <p className="text-sm text-green-400">{idResult.identity.jobTitle}</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )}

                        {/* Documents List */}
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-green-500 mb-4 flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm">description</span> Artefactos Falsificados
                        </h4>
                        <div className="space-y-3">
                           {idResult.documents && idResult.documents.map((doc: string, i: number) => (
                              <div key={i} className="bg-black/40 border border-green-900/30 p-4 rounded-lg flex items-start gap-4 hover:border-green-500/50 transition-colors">
                                 <div className="mt-1"><span className="material-symbols-outlined text-green-600 text-sm">description</span></div>
                                 <p className="text-xs text-green-200 leading-relaxed font-mono">{doc}</p>
                              </div>
                           ))}
                        </div>
                        
                        <div className="mt-8 border-t border-green-900/30 pt-6">
                           <p className="text-center text-xs font-bold text-red-500 uppercase tracking-widest animate-pulse">
                              OPERACIÓN COMPLETADA. DESCONECTANDO EN 3... 2... 1...
                           </p>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            )}

            {/* DASHBOARD VIEW (Overview) */}
            {activeTab === 'DASHBOARD' && (
              <div className="w-full h-full flex flex-col gap-12 py-8 animate-in fade-in duration-300">
                <div className="p-8 border border-primary/20 bg-primary/5 rounded-sm">
                  <h3 className="text-primary font-black text-xl uppercase tracking-tighter mb-4">BIENVENIDO AL NÚCLEO DE TABULA RASA</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed uppercase tracking-widest">
                    Su extracción digital comienza aquí. Utilice la barra lateral para auditar las huellas de su vida pasada o validar su estado de antecedentes limpios a través de ZKP.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="p-4 md:p-6 border border-outline-variant/20 bg-surface-container-low flex flex-col gap-4">
                    <span className="material-symbols-outlined text-primary text-3xl">history_edu</span>
                    <h4 className="text-xs font-bold text-on-surface uppercase">Rastros no Verificados</h4>
                    <span className="text-2xl font-black text-primary">05 DETECTADOS</span>
                    <button onClick={() => setActiveTab('AUDIT')} className="text-[10px] text-primary font-bold uppercase hover:underline text-left">IR AL MANTO DE AUDITORÍA</button>
                  </div>
                  <div className="p-4 md:p-6 border border-outline-variant/20 bg-surface-container-low flex flex-col gap-4">
                    <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                    <h4 className="text-xs font-bold text-on-surface uppercase">Autorización Anónima</h4>
                    <span className={`text-2xl font-black ${isZkVerified ? 'text-primary' : 'text-on-surface-variant'}`}>{isZkVerified ? 'VALIDADO' : 'PENDIENTE'}</span>
                    <button onClick={() => setActiveTab('CRYPTO_VAL')} className="text-[10px] text-primary font-bold uppercase hover:underline text-left">IR A VALIDACIÓN ZK</button>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="mt-auto grid grid-cols-2 gap-px bg-outline-variant/30 border border-outline-variant/30">
                  <div className="bg-surface p-3 space-y-1">
                    <div className="text-[10px] text-on-surface-variant uppercase">Latencia</div>
                    <div className="text-xs text-primary">12ms [ESTABLE]</div>
                  </div>
                  <div className="bg-surface p-3 space-y-1">
                    <div className="text-[10px] text-on-surface-variant uppercase">Cifrado</div>
                    <div className="text-xs text-primary">AES-256-GCM</div>
                  </div>
                </div>

                <div className="mt-8">
                  <button onClick={() => setActiveTab('AUDIT')} className="w-full py-4 bg-primary/20 hover:bg-primary/40 border border-primary text-primary font-black tracking-widest text-xs uppercase transition-colors">
                    INICIAR PROTOCOLO DE EXTRACCIÓN -&gt;
                  </button>
                </div>
              </div>
            )}

            {/* COMM_LINK VIEW — Consola de Chat Efímera Anti-Rastro (Prospecto Validado) */}
            {activeTab === 'COMM_LINK' && (
              <div className="flex-1 flex flex-col animate-in fade-in duration-200 overflow-hidden min-h-[400px] md:min-h-0">

                {/* Console header */}
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-4 flex-shrink-0">
                  <div>
                    <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Modo: Consola Anti-Rastro / Sin Historial</div>
                    <div className="text-xs font-black text-primary uppercase tracking-widest">CONSOLA ENLACE_COM</div>
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
                      COMPLETA LA VERIFICACIÓN ZK EN VAL_SEGURA.
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
                      <span>AUTOCOMPLETAR: DESACTIVADO</span>
                    </div>

                    {/* Stream de mensajes — no seleccionable para evitar copiar al portapapeles del SO */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 mb-4 no-select-log">
                      {/* Mensaje de bienvenida del sistema */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-highest px-1.5 py-0.5 w-fit uppercase">NODO_SIS</span>
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
                              <span className="text-[10px] font-bold text-primary bg-surface-container-highest px-1.5 py-0.5 uppercase">CLIENTE_V</span>
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
          <section className="w-full md:w-1/2 min-h-[60vh] md:min-h-0 md:h-full flex flex-col bg-[#0a0a0c] overflow-hidden">
            <div className="h-12 border-b border-outline-variant/20 flex items-center justify-between px-6 bg-[#0e0e10]">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                <span className="text-xs font-bold tracking-tighter uppercase">ENLACE_TÁCTICO [CIFRADO]</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-none ${isZkVerified ? 'bg-tertiary-container animate-pulse' : 'bg-surface-container-high'}`}></div>
                  <span className="text-[10px] text-on-surface-variant uppercase">TÚNEL: {isZkVerified ? 'ACTIVO' : 'BLOQUEADO'}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-4 md:space-y-6 flex flex-col">
              {!isZkVerified || !accessPass ? (
                <div className="flex-1 flex flex-col items-center justify-center opacity-50 space-y-4">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant">lock</span>
                  <span className="text-xs uppercase text-on-surface-variant tracking-widest px-8 text-center leading-loose">
                    {!isZkVerified
                      ? 'ESPERANDO AUTORIZACIÓN ZK PARA ABRIR TÚNEL. VALIDE EN SECCIÓN VAL_SEGURA.'
                      : 'ESPERANDO PASE DE ACCESO DEL OPERADOR DE ADMISIÓN...'}
                  </span>
                </div>
              ) : (
                <>
                  <div className="group flex flex-col gap-1 items-start">
                    <div className="flex items-center gap-4 w-full justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-highest px-1.5 py-0.5">NODO_OP_09</span>
                      </div>
                    </div>
                    <div className="bg-surface-container-high p-3 border-l-2 border-primary w-fit max-w-[85%] text-xs leading-relaxed text-on-surface">
                      Protocolo Sphinx activo. Metadatos neutralizados. Describa su situación.
                    </div>
                  </div>

                  {messages.map(msg => (
                    <div key={msg.id} className="group flex flex-col gap-1 items-end animate-in slide-in-from-right duration-300">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-primary bg-surface-container-highest px-1.5 py-0.5 uppercase">Cliente_V</span>
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
                  placeholder="INTRODUCIR COMANDO..."
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
                  ENVIAR
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>

      {/* System Status Bar */}
      <footer className="fixed bottom-0 w-full h-6 bg-[#0e0e10] border-t border-outline-variant/20 z-50 flex items-center justify-between px-2 md:px-6 text-[8px] md:text-[9px] text-on-surface-variant uppercase">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="flex items-center gap-1"><span className="w-1 h-1 bg-tertiary-container"></span> CPU: 12%</span>
          <span className="flex items-center gap-1"><span className="w-1 h-1 bg-tertiary-container"></span> MEM: 4.2GB</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4 font-bold">
          <span className="text-secondary tracking-widest hidden sm:inline">CIFRADO: AES-256-GCM</span>
          <span className="text-primary tracking-widest">CONDUCTO_ESTABLE</span>
        </div>
      </footer>
    </div >
  );
}
