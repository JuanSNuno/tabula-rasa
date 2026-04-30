"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, ShieldCheck, EyeOff, Send, Copy, RefreshCw } from "lucide-react";

export default function DogWhistlingPage() {
  const [instruction, setInstruction] = useState("");
  const [context, setContext] = useState("Moda / Lifestyle");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);

  const contexts = ["Moda / Lifestyle", "Deportes", "Política (Neutral)", "Cripto / Tech", "Gastronomía"];

  const generatePost = () => {
    setLoading(true);
    setTimeout(() => {
      const mocks: Record<string, string> = {
        "Moda / Lifestyle": `La nueva colección de otoño tiene tonos tierra increíbles. El corte es clásico pero con un toque moderno que no deja indiferente a nadie. #FallStyle #FashionTrend`,
        "Deportes": `Vaya partido el de anoche. La defensa estuvo sólida en la primera mitad, pero el contraataque fue lo que realmente definió el marcador final. ¡Increíble energía!`,
        "Cripto / Tech": `Interesante ver cómo evoluciona la capa 2. La escalabilidad es la clave para la adopción masiva, aunque todavía falta pulir la experiencia de usuario. #Web3 #Crypto`,
        "Gastronomía": `El secreto de un buen risotto está en la paciencia y en la calidad del caldo. Nunca subestimes el poder de un ingrediente fresco. 🍲 #Foodie #Cooking`
      };
      setGenerated(mocks[context] || mocks["Moda / Lifestyle"]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050e05] text-green-500 font-mono flex">
      {/* SIDEBAR: OPERATOR PROFILE */}
      <aside className="w-72 border-r border-green-900 flex flex-col bg-[#020602] shrink-0 hidden md:flex">
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
        <div className="p-6 border-b border-green-900 flex-1 overflow-y-auto">
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
        <header className="h-16 border-b border-green-900 flex items-center justify-between px-8 bg-[#020602]/80 backdrop-blur-sm shrink-0">
          <div className="flex space-x-8 text-xs uppercase tracking-widest font-bold">
            <Link href="/ops/intelligence" className="text-green-800 hover:text-green-600 transition-colors pb-1">Envenenamiento de Datos</Link>
            <Link href="/ops/intelligence/social-eng" className="text-green-800 hover:text-green-600 transition-colors pb-1">Analizador Ing. Social</Link>
            <Link href="/ops/intelligence/dog-whistling" className="text-green-400 border-b-2 border-green-400 pb-1">Copias Dog Whistling</Link>
          </div>
          <div className="text-xs text-green-600 font-bold tracking-widest flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             Sistema en Línea
          </div>
        </header>

        {/* WORKSPACE */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto flex flex-col gap-8 h-full">
            <div className="border-b border-green-900 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-green-400 mb-2 uppercase flex items-center gap-3">
                 <MessageSquare className="w-8 h-8 md:w-10 md:h-10" />
                 Generador de Dog Whistling
              </h2>
              <p className="text-xs md:text-sm text-green-700 max-w-3xl font-mono">
                 Codificación de instrucciones tácticas en lenguaje natural aparentemente inocuo. Utilice esta herramienta para comunicarse con agentes en campo mediante redes sociales públicas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* INPUT PANEL */}
              <div className="space-y-6">
                 <div className="bg-black border border-green-900 rounded-lg p-6 shadow-xl space-y-4">
                    <div>
                       <label className="block text-[10px] font-bold text-green-700 uppercase tracking-widest mb-2">Instrucción Táctica (Secreto)</label>
                       <textarea 
                         value={instruction}
                         onChange={(e) => setInstruction(e.target.value)}
                         placeholder="ej: Extraer sujeto TR-12 por salida norte a las 22:00..."
                         className="w-full bg-green-950/20 border border-green-900 rounded p-3 text-green-300 text-sm focus:outline-none focus:border-green-500 h-24 resize-none"
                       />
                    </div>

                    <div>
                       <label className="block text-[10px] font-bold text-green-700 uppercase tracking-widest mb-2">Contexto de la Publicación</label>
                       <select 
                         value={context}
                         onChange={(e) => setContext(e.target.value)}
                         className="w-full bg-green-950/20 border border-green-900 rounded p-2 text-green-300 text-sm focus:outline-none"
                       >
                          {contexts.map(c => <option key={c} value={c}>{c}</option>)}
                       </select>
                    </div>

                    <button 
                      onClick={generatePost}
                      disabled={loading || !instruction}
                      className="w-full bg-green-600 text-black py-3 font-bold uppercase text-xs flex items-center justify-center gap-2 hover:bg-green-400 transition-all disabled:opacity-50"
                    >
                       {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                       Codificar y Generar Copia
                    </button>
                 </div>

                 <div className="bg-green-950/10 border border-green-900/30 p-4 rounded text-[10px] text-green-700 font-mono italic">
                    <p>Nota: El algoritmo utiliza esteganografía lingüística de grado militar (TR-14) para asegurar que el mensaje sea indescifrable para sistemas de monitoreo estatales.</p>
                 </div>
              </div>

              {/* PREVIEW PANEL */}
              <div className="flex flex-col gap-4">
                 <div className="bg-black border border-green-900 rounded-lg p-6 flex-1 flex flex-col shadow-2xl relative overflow-hidden">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-green-700 mb-6 flex items-center gap-2">
                       <EyeOff className="w-4 h-4" /> Vista Previa de la Publicación
                    </h3>
                    
                    {!generated && !loading ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-green-900 opacity-30">
                         <MessageSquare className="w-16 h-16 mb-4" />
                         <p className="text-xs uppercase tracking-widest">Esperando Generación</p>
                      </div>
                    ) : loading ? (
                      <div className="flex-1 flex flex-col items-center justify-center">
                         <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                         <p className="text-[10px] uppercase tracking-widest text-green-600 animate-pulse font-mono">Aplicando Esteganografía...</p>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col gap-6 animate-fade-in">
                         <div className="bg-green-950/20 border border-green-800 p-6 rounded-lg relative">
                            <div className="flex items-center gap-3 mb-4">
                               <div className="w-10 h-10 bg-green-900 rounded-full border border-green-700"></div>
                               <div>
                                  <p className="text-xs font-bold text-green-300">Persona_Sintética_84</p>
                                  <p className="text-[8px] text-green-700">Hace 1 minuto • Público</p>
                               </div>
                            </div>
                            <p className="text-sm text-green-100 leading-relaxed italic">
                               "{generated}"
                            </p>
                            <div className="absolute top-4 right-4 flex gap-2">
                               <button className="text-green-700 hover:text-green-400 transition-colors">
                                  <Copy className="w-4 h-4" />
                               </button>
                            </div>
                         </div>

                         <div className="bg-green-900/20 border border-green-700 p-4 rounded flex items-center gap-4">
                            <ShieldCheck className="w-8 h-8 text-green-500" />
                            <div>
                               <p className="text-[10px] font-bold text-green-400 uppercase">Mensaje Oculto Verificado</p>
                               <p className="text-[9px] text-green-600">La instrucción ha sido inyectada correctamente en el flujo semántico.</p>
                            </div>
                         </div>
                      </div>
                    )}

                    <button className="mt-6 w-full py-3 bg-green-950 border border-green-800 text-green-400 font-bold uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-green-900 transition-all">
                       <Send className="w-4 h-4" /> Publicar vía Proxy
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
