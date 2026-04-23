"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSecurityMode } from '../../context/SecurityModeContext';

interface Props {
  setView: (view: 'home' | 'services' | 'support') => void;
}

export default function FacadeSoporte({ setView }: Props) {
  const { activateClandestineMode } = useSecurityMode();
  const router = useRouter();
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = ticketId.trim();

    // Routing Logic based on secret codes
    if (code === 'Error_704_Null_Pointer_Extraction') {
      activateClandestineMode(); // Prospect Dashboard
    } else if (code === 'SIGINT_Poison_Protocol_Alpha') {
      router.push('/ops/intelligence'); // TR-24
    } else if (code === 'Forged_Genesis_Block_0x9A') {
      router.push('/ops/identities'); // TR-26
    } else if (code === 'IR_Specter_Override_Omega') {
      router.push('/ops/extraction'); // TR-25
    } else {
      alert("Ticket enviado con éxito. Nuestro equipo de soporte corporativo se pondrá en contacto con usted pronto.");
    }
  };

  return (
    <>
      <nav className="w-full top-0 z-50 bg-[#f7f9fb] flex flex-wrap md:flex-nowrap items-center justify-between px-6 md:px-8 py-4 gap-y-4 max-w-full">
        <div className="text-xl font-bold tracking-tighter text-on-surface font-headline">LegacyGuard</div>
        <div className="flex w-full justify-center md:w-auto order-last md:order-none items-center space-x-6 md:space-x-8 font-inter text-sm font-medium tracking-tight">
          <button onClick={() => setView('home')} className="text-on-surface-variant hover:text-on-surface transition-colors duration-200">Inicio</button>
          <button onClick={() => setView('services')} className="text-on-surface-variant hover:text-on-surface transition-colors duration-200">Servicios</button>
          <button onClick={() => setView('support')} className="text-on-surface border-b-2 border-primary pb-1 duration-200">Soporte</button>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="hidden sm:block px-4 py-2 font-inter text-sm font-medium text-on-surface-variant hover:bg-surface-container-low duration-200">Acceso de Cliente</button>
          <button className="px-4 py-2 bg-primary text-on-primary rounded font-inter text-sm font-medium hover:bg-primary-dim transition-colors duration-200">Solicitud de Auditoría</button>
        </div>
      </nav>

      <main className="min-h-screen">
        <section className="px-8 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl mx-auto">
          <div className="md:col-span-7 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest font-bold text-outline mb-4">Centro de Soporte Institucional</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-[1.1] mb-8 font-headline">
                Protocolo de Consulta <br/><span className="text-outline-variant">Técnica</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed font-light mb-12 font-body">
                Sistemas LegacyGuard proporciona soporte de auditoría de grado institucional. Envíe su documentación técnica o anomalías del sistema a través de nuestro canal seguro del libro mayor para una resolución inmediata.
            </p>
            <div className="flex space-x-12 mt-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-outline tracking-wider mb-2">Estado de Sistemas</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-sm font-semibold text-on-surface">Estado Operativo Nominal</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-outline tracking-wider mb-2">Latencia de Respuesta</p>
                <p className="text-sm font-semibold tracking-tight text-on-surface">&lt; 14 Minutos</p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-5 relative">
            <div className="bg-surface-container-lowest p-8 md:p-10 relative z-10">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-on-surface font-headline">Terminal de Tickets</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-outline tracking-wide font-label">Nombre Completo</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none" placeholder="Nombre del Oficial Institucional" type="text"/>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] uppercase font-bold text-outline tracking-wide font-label">Correo Electrónico Corporativo</label>
                  <input className="w-full bg-surface-container-lowest border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none" placeholder="oficial@corporativo.tld" type="email"/>
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
                    Todos los envíos están cifrados y registrados en el Libro Mayor Soberano para la auditoría de cumplimiento.
                </p>
              </form>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-surface-container-high -z-10"></div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24 px-8 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h3 className="text-3xl font-bold tracking-tighter text-on-surface font-headline">Documentación y Recursos</h3>
              <p className="text-on-surface-variant text-sm mt-2 font-body">Acceda a libros blancos institucionales y registros del sistema.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 bg-surface-container-lowest p-8 flex flex-col justify-between h-64 border-l-4 border-primary">
                <div>
                  <span className="material-symbols-outlined text-primary mb-4">shield_with_heart</span>
                  <h4 className="text-lg font-bold text-on-surface font-headline">Libro Blanco de Seguridad</h4>
                  <p className="text-sm text-on-surface-variant mt-2 max-w-xs font-body">Revise la arquitectura central del motor de auditoría de LegacyGuard y los estándares de cifrado de datos.</p>
                </div>
                <a className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1" href="#">Descargar PDF <span className="material-symbols-outlined text-xs">download</span></a>
              </div>
              <div className="bg-surface-container-lowest p-8 flex flex-col justify-between h-64 border-l-4 border-secondary-dim">
                <div>
                  <span className="material-symbols-outlined text-secondary-dim mb-4">gavel</span>
                  <h4 className="text-lg font-bold text-on-surface font-headline">Regulatorio</h4>
                  <p className="text-sm text-on-surface-variant mt-2 font-body">Documentación de cumplimiento para ISO 27001 y estándares institucionales.</p>
                </div>
                <a className="text-xs font-bold uppercase tracking-widest text-secondary-dim" href="#">Acceder al Libro Mayor</a>
              </div>
              <div className="bg-surface-container-lowest p-8 flex flex-col justify-between h-64 border-l-4 border-outline-variant">
                <div>
                  <span className="material-symbols-outlined text-outline-variant mb-4">history</span>
                  <h4 className="text-lg font-bold text-on-surface font-headline">Registros del Sistema</h4>
                  <p className="text-sm text-on-surface-variant mt-2 font-body">Informes de transparencia en tiempo real para todos los ciclos de auditoría activos.</p>
                </div>
                <a className="text-xs font-bold uppercase tracking-widest text-outline" href="#">Ver Análisis</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-dim w-full border-t border-outline-variant/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-8 w-full">
          <div className="text-lg font-black text-on-surface mb-6 md:mb-0 font-headline">Sistemas LegacyGuard</div>
          <div className="flex flex-wrap justify-center gap-8 font-inter text-xs tracking-wide uppercase font-semibold">
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity opacity-80 hover:opacity-100" href="#">Política de Privacidad</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity opacity-80 hover:opacity-100" href="#">Términos de Servicio</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity opacity-80 hover:opacity-100" href="#">Libro Blanco de Seguridad</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-opacity opacity-80 hover:opacity-100" href="#">Cumplimiento Normativo</a>
          </div>
          <div className="mt-8 md:mt-0 text-[10px] text-on-surface-variant font-medium opacity-60 font-label">
              © 2024 Sistemas LegacyGuard. Autoridad Institucional en Auditoría de Sistemas.
          </div>
        </div>
      </footer>
    </>
  );
}
