"use client";

import React from 'react';
import { useSecurityMode } from '../../context/SecurityModeContext';

interface Props {
  setView: (view: 'home' | 'services' | 'support') => void;
}

export default function FacadeInicio({ setView }: Props) {
  const { activateClandestineMode } = useSecurityMode();
  return (
    <>
      <header className="w-full top-0 z-50 bg-[#f7f9fb] duration-200 ease-in-out">
        <nav className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 md:px-8 py-4 gap-y-4 max-w-full">
          <div className="text-xl font-bold tracking-tighter text-on-surface font-headline">
            LegacyGuard
          </div>
          <div className="flex w-full justify-center md:w-auto order-last md:order-none items-center space-x-6 md:space-x-8 font-inter text-sm font-medium tracking-tight">
            <button onClick={() => setView('home')} className="text-on-surface border-b-2 border-primary pb-1">Inicio</button>
            <button onClick={() => setView('services')} className="text-on-surface-variant hover:text-on-surface transition-colors">Servicios</button>
            <button onClick={() => setView('support')} className="text-on-surface-variant hover:text-on-surface transition-colors">Soporte</button>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="hidden sm:block px-4 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low rounded">Acceso de Cliente</button>
            <button className="px-4 py-2 bg-primary text-on-primary text-sm font-semibold rounded shadow-sm hover:opacity-90 transition-opacity">Solicitud de Auditoría</button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-surface-container-low pt-24 pb-32 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-3/5">
              <div className="inline-block px-3 py-1 mb-6 bg-surface-container-high border-l-4 border-primary">
                <p className="text-xs font-bold tracking-widest text-primary uppercase font-label">Integridad Institucional</p>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-[1.1] mb-8 font-headline">
                Protegiendo el legado de su empresa mediante auditorías exhaustivas
              </h1>
              <p className="text-on-surface-variant text-lg max-w-xl mb-10 leading-relaxed font-body">
                Marcos de cumplimiento diseñados con precisión para entidades soberanas y empresas globales. Nuestra metodología asegura la permanencia de sus registros digitales y operativos.
              </p>
              <div className="flex items-center gap-4">
                <button className="bg-primary text-on-primary px-8 py-4 font-bold rounded-lg shadow-sm hover:brightness-110 transition-all font-body">
                  Iniciar Protocolo
                </button>
                <button className="bg-surface-container-lowest text-on-surface border border-outline-variant px-8 py-4 font-bold rounded-lg hover:bg-surface-container-high transition-all font-body">
                  Revisar Libro Blanco
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <div className="aspect-[4/5] bg-surface-container-lowest shadow-2xl relative overflow-hidden rounded-xl border border-outline-variant/10">
                <img alt="Institutional architecture" className="w-full h-full object-cover mix-blend-overlay opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_zNPPw-lu_MAMV5rO1iQIvL9rRc_Fp--iPzVKe4eMt5hj_OBkun4zwCZ_T0YQtsSzmHSWwYdH8iabTMr6DeTHnBj_DwH_aRao6N6m6_hvCO64clKpQGhYGR7CYZ5SOHWl2GMr1KH_ODsXKxma72DewoO97Z7NYXkSoDb16Gf6T6kD7d_yDXrBYQAyX2WPjCPkIdkuDv_rthGyWEhISmlEZK8QQv0dany3c6HY83oy4xma1TuHnwi2P6p_sRmyXVvT0f5bN_VoM5o" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-surface-container-low to-transparent">
                  <div className="space-y-4">
                    <div className="h-1 w-12 bg-primary"></div>
                    <p className="text-sm font-label font-bold tracking-tight text-on-surface">Infraestructura Certificada ISO 27001/9001</p>
                    <p className="text-xs text-outline font-medium tracking-wide leading-relaxed font-body">Verificación continua de sistemas globales desde 1994. Autorizado por la Autoridad Global de Cumplimiento.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-16 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-outline mb-12 font-label">Partes Interesadas Autorizadas e Instituciones Asociadas</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-items-center opacity-60 filter grayscale text-on-surface">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">account_balance</span>
                <span className="font-bold tracking-tighter text-xl font-headline">RESERVA FEDERAL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">security</span>
                <span className="font-bold tracking-tighter text-xl font-headline">CYBERSEC LTD</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">hub</span>
                <span className="font-bold tracking-tighter text-xl font-headline">INFRA GLOBAL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
                <span className="font-bold tracking-tighter text-xl font-headline">AUDITORÍA NEXUS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">shield</span>
                <span className="font-bold tracking-tighter text-xl font-headline">FIDEICOMISO LEGACY</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="py-16 md:py-24 px-6 md:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Ecosistema de Auditoría</h2>
              <div className="h-1 w-16 bg-primary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 bg-surface-container-lowest p-10 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-primary text-4xl mb-6">clinical_notes</span>
                  <h3 className="text-2xl font-bold tracking-tight mb-4 text-on-surface font-headline">Verificación de Integridad Sistémica</h3>
                  <p className="text-on-surface-variant max-w-xl leading-relaxed mb-8 font-body">
                    Análisis de capa profunda de vulnerabilidades arquitectónicas empresariales. Nuestros auditores ejecutan 4,200 puntos de validación únicos por ciclo para asegurar un cumplimiento sin desviaciones.
                  </p>
                  <div className="flex gap-12 border-t border-outline-variant/10 pt-8">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-outline tracking-widest mb-1 font-label">Frecuencia</p>
                      <p className="text-xl font-bold text-on-surface font-headline">Continua</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-outline tracking-widest mb-1 font-label">Confiabilidad</p>
                      <p className="text-xl font-bold text-on-surface font-headline">99.999%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 bg-surface-container-high p-8 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-4 font-label">Estado de la Red</p>
                  <h3 className="text-xl font-bold tracking-tight mb-2 font-headline text-on-surface">Actividad del Nodo Soberano</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-surface-container-lowest p-3 rounded">
                    <span className="text-sm font-medium text-on-surface">Auditoría de Mainframe</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-primary text-on-primary rounded-full">ACTIVO</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface-container-lowest p-3 rounded">
                    <span className="text-sm font-medium text-on-surface">Canal de Cumplimiento</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-primary text-on-primary rounded-full">SEGURO</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 bg-surface-container-low p-8 border border-outline-variant/10 hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-primary mb-4">history_edu</span>
                <h4 className="text-lg font-bold mb-2 text-on-surface font-headline">Archivo Heredado</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body">Protocolos de almacenamiento inmutable para datos institucionales críticos e historial transaccional.</p>
              </div>
              <div className="md:col-span-4 bg-surface-container-low p-8 border border-outline-variant/10 hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-primary mb-4">policy</span>
                <h4 className="text-lg font-bold mb-2 text-on-surface font-headline">Alineación de Políticas</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body">Mapeo en tiempo real de la gobernanza interna a los estándares regulatorios internacionales.</p>
              </div>
              <div className="md:col-span-4 bg-surface-container-low p-8 border border-outline-variant/10 hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-primary mb-4">gavel</span>
                <h4 className="text-lg font-bold mb-2 text-on-surface font-headline">Admisibilidad Legal</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body">Cada informe de auditoría está estructurado para presentación forense y legal inmediata.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Audio Briefs (Steganography Section) */}
        <section className="py-20 px-8 bg-surface border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-2 font-label">Informes de Audio Institucionales</h2>
              <p className="text-on-surface-variant text-sm font-body">Revisiones técnicas internas para integración de sistemas heredados y auditoría de cumplimiento.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm relative group overflow-hidden">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary/5 flex items-center justify-center rounded-sm shrink-0 border border-primary/10">
                    <span className="material-symbols-outlined text-primary text-3xl">mic</span>
                  </div>
                  <div className="space-y-2 flex-grow">
                    <h3 className="text-lg font-bold text-on-surface font-headline">Cumplimiento ISO-27001 Sinc. v.2024.4</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-outline uppercase tracking-widest font-label">
                      <span>Duración: 12:45</span>
                      <span>Formato: HQ-PCM</span>
                      <span className="text-primary font-black">Solo Autorizados</span>
                    </div>
                    {/* Fake Waveform Visualizer - Clandestine Interaction Point */}
                    <div className="h-16 w-full flex items-end gap-[2px] mt-4 mb-6 cursor-pointer group/wave bg-surface-container-low/50 p-2 rounded-sm"
                      title="Terminal de Análisis Espectral"
                      onClick={async (e) => {
                        if (e.detail === 3) { // Triple click secret
                          try {
                            console.log("%c[LEGACY_GUARD] STARTING BIT-LEVEL DECODING...", "color: #dae2fd; font-weight: bold;");

                            const fetchData = async () => {
                              try {
                                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/intelligence/brief`);
                                if (!response.ok) throw new Error("Backend unreachable");
                                return await response.arrayBuffer();
                              } catch (err) {
                                console.warn("Steganography fetch failed. Using internal mock parity.");
                                // Generar un buffer mockeado que contenga el mensaje secreto
                                // "https://tr-mixnet-v4.onion/gate|4c472d414c5048412d39392d434c45414e"
                                const secret = "https://tr-mixnet-v4.onion/gate|4c472d414c5048412d39392d434c45414e";
                                const buffer = new ArrayBuffer(44 + secret.length * 16); // Suficiente espacio
                                const view = new DataView(buffer);
                                for (let i = 0; i < secret.length; i++) {
                                  const charCode = secret.charCodeAt(i);
                                  for (let bit = 7; bit >= 0; bit--) {
                                    const b = (charCode >> bit) & 1;
                                    const offset = 44 + (i * 8 + (7 - bit)) * 2;
                                    view.setInt16(offset, b, true); // bit en LSB
                                  }
                                }
                                return buffer;
                              }
                            };

                            const arrayBuffer = await fetchData();
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
                            alert(`Auditoría de Seguridad: Firma binaria verificada.\n\nFUENTE: ${url}\nID: ${hash}\n\nVerifique registros sistémicos para handshake completo.`);

                            activateClandestineMode();
                          } catch (err) {
                            console.error("Error de paridad de bits manual en flujo de esteganografía:", err);
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
                    Descargar Transcripción (PDF)
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
                    <h4 className="font-bold text-on-surface font-headline uppercase text-sm tracking-tight">Integridad de Análisis Espectral</h4>
                    <p className="text-xs text-on-surface-variant font-body leading-relaxed max-w-sm">Cada informe de audio está verificado para paridad forense contra estándares internacionales. Sin artefactos, sin anomalías.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-primary">history_edu</span>
                  <div>
                    <h4 className="font-bold text-on-surface font-headline uppercase text-sm tracking-tight">Persistencia de Archivo</h4>
                    <p className="text-xs text-on-surface-variant font-body leading-relaxed max-w-sm">Los registros se mantienen en nuestro Libro Mayor Soberano por un período de 40 años para asegurar la admisibilidad legal a largo plazo.</p>
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
                <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Inteligencia e Ideas Estratégicas</h2>
                <div className="h-1 w-16 bg-primary"></div>
                <p className="text-on-surface-variant max-w-xl mt-6 font-body leading-relaxed">
                  Publicaciones confidenciales que abordan la mitigación de riesgos corporativos extremos, la reestructuración a nivel soberano y el desacoplamiento operativo total.
                </p>
              </div>
              <button className="text-primary font-bold text-sm hidden md:flex items-center gap-2 hover:brightness-110 transition-all font-inter">
                Acceder a Archivos Privados <span className="material-symbols-outlined text-sm">lock</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Article 1 - Dog Whistle */}
              <article className="group bg-surface-container-lowest border border-outline-variant/20 p-8 hover:border-primary transition-all duration-300 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-outline uppercase tracking-[0.2em] font-bold mb-4 font-label">Estudio de Caso | Mitigación de Riesgos</p>
                  <h3 className="text-xl font-bold tracking-tight text-on-surface mb-4 font-headline group-hover:text-primary transition-colors">
                    El Protocolo 'Tabula Rasa': Estructuración de Pizarra Absolutamente Limpia
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-8 font-body">
                    Cuando las entidades de alto patrimonio se enfrentan a riesgos asimétricos existenciales o letales, el cumplimiento estándar falla. Descubra cómo la sanidad digital completa y la reinserción geográfica irrastreable separan a un individuo de las responsabilidades heredadas maliciosas de forma permanente.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-primary font-bold uppercase tracking-wider font-label cursor-pointer">
                  <span>Leer Metodología</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </article>

              {/* Article 2 - Dog Whistle */}
              <article className="group bg-surface-container-lowest border border-outline-variant/20 p-8 hover:border-primary transition-all duration-300 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] text-outline uppercase tracking-[0.2em] font-bold mb-4 font-label">Informe Procesable</p>
                  <h3 className="text-xl font-bold tracking-tight text-on-surface mb-4 font-headline group-hover:text-primary transition-colors">
                    Desacoplamiento Geográfico Rápido para Familias Ultra-HNW
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-8 font-body">
                    La preservación de la riqueza en regímenes en caída requiere más que fideicomisos offshore. Analizamos marcos para la extracción ejecutiva de emergencia, la reubicación de capital irrastreable y la adquisición instantánea de nuevas identidades jurisdiccionales robustas, verificables e irreprochables.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-primary font-bold uppercase tracking-wider font-label cursor-pointer">
                  <span>Descargar Plano</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </article>

              {/* Article 3 - Dog Whistle */}
              <article className="group bg-surface-container-high border border-outline-variant/10 p-8 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                  <span className="material-symbols-outlined text-outline-variant">verified_user</span>
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold mb-4 font-label">Nivel Clasificado</p>
                  <h3 className="text-xl font-bold tracking-tight text-on-surface mb-4 font-headline">
                    Evadiendo Redadas Panópticas KYC a través de Arquitecturas Sintéticas
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-8 font-body">
                    Una revisión avanzada de cómo la generación de datos "Frankenstein" de capa profunda y las Pruebas de Conocimiento Cero pueden eludir la vigilancia biométrica moderna, haciendo que los principales objetivos sean invisibles algorítmica y físicamente a los actores antagonistas.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-primary font-bold uppercase tracking-wider font-label cursor-pointer relative z-10">
                  <span>Solicitar Acceso de Cifrado</span>
                  <span className="material-symbols-outlined text-sm">lock</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 border-t border-outline-variant/10 bg-surface">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-black tracking-tighter text-on-surface leading-none mb-6 font-headline">Nuestra Confiabilidad Aburrida es su Mayor Activo.</h2>
              <p className="text-outline text-sm font-medium uppercase tracking-tighter mb-8 font-label">Declaración de Intenciones v.4.2</p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h5 className="text-sm font-bold text-primary font-headline">01. SOBERANÍA DE DATOS</h5>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">No almacenamos sus datos en nubes externas. Nuestra auditoría se produce a través de túneles seguros hacia sus propios sistemas aislados, manteniendo una custodia absoluta.</p>
              </div>
              <div className="space-y-4">
                <h5 className="text-sm font-bold text-primary font-headline">02. PRECISIÓN SISTÉMICA</h5>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">Las auditorías no se basan en muestreos. Utilizamos validación lógica de fuerza bruta para confirmar que el 100% de las entradas del libro mayor cumplen con los criterios institucionales.</p>
              </div>
              <div className="space-y-4">
                <h5 className="text-sm font-bold text-primary font-headline">03. PRONÓSTICO REGULATORIO</h5>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">Nuestro equipo legal rastrea los cambios en los marcos de Basilea IV y GDPR 2.0 antes de que sean codificados, preparando sus sistemas para futuros cambios.</p>
              </div>
              <div className="space-y-4">
                <h5 className="text-sm font-bold text-primary font-headline">04. REPORTES SIN RELLENO</h5>
                <p className="text-on-surface-variant text-sm leading-relaxed font-body">Sin gráficos por el simple hecho de hacer gráficos. Usted recibe un documento técnico estructurado listo para la revisión del comité de riesgos a nivel de la junta.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-outline-variant/20 bg-surface-dim duration-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 w-full">
          <div className="mb-6 md:mb-0">
            <div className="text-lg font-black text-on-surface mb-2 font-headline">Sistemas LegacyGuard</div>
            <p className="text-[10px] tracking-wide uppercase font-semibold text-on-surface-variant font-label">
              © 2024 Sistemas LegacyGuard. Autoridad Institucional en Auditoría de Sistemas.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-inter text-xs tracking-wide uppercase font-semibold">
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity" href="#">Política de Privacidad</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity" href="#">Términos de Servicio</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity" href="#">Libro Blanco de Seguridad</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity" href="#">Cumplimiento Normativo</a>
          </div>
        </div>
      </footer>
    </>
  );
}
