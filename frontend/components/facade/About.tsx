"use client";

import React from 'react';

interface Props {
  setView: (view: 'home' | 'services' | 'support' | 'about' | 'contact' | 'audit-request') => void;
}

export default function FacadeAbout({ setView }: Props) {
  return (
    <>
      <nav className="w-full top-0 z-50 bg-[#f7f9fb] shadow-none duration-200 ease-in-out">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 md:px-8 py-4 gap-y-4 max-w-full">
          <div className="text-xl font-bold tracking-tighter text-on-surface font-headline">LegacyGuard</div>
          <div className="flex w-full justify-center md:w-auto order-last md:order-none items-center space-x-6 md:space-x-8">
            <button onClick={() => setView('home')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Inicio</button>
            <button onClick={() => setView('services')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Servicios</button>
            <button onClick={() => setView('about')} className="font-inter text-sm font-medium tracking-tight text-on-surface border-b-2 border-primary pb-1">Nosotros</button>
            <button onClick={() => setView('contact')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Contacto</button>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="hidden sm:block px-4 py-2 font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:bg-surface-container-low rounded transition-colors">Acceso de Cliente</button>
            <button onClick={() => setView('audit-request')} className="px-4 py-2 font-inter text-sm font-medium tracking-tight bg-primary text-on-primary rounded shadow-sm hover:brightness-110 transition-all">Solicitud de Auditoría</button>
          </div>
        </div>
      </nav>

      <main className="min-h-screen">
        <section className="relative bg-surface-container-low py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block px-3 py-1 mb-6 bg-surface-container-high border-l-4 border-primary">
                  <p className="text-xs font-bold tracking-widest text-primary uppercase font-label">Historia Institucional</p>
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-[1.1] mb-8 font-headline">
                  Tres décadas de integridad auditora
                </h1>
                <p className="text-on-surface-variant text-lg max-w-xl mb-8 leading-relaxed font-body">
                  Fundada en 1994, LegacyGuard emergió de la necesidad de un enfoque más riguroso para la auditoría institucional. Nuestra metodología fue desarrollada en colaboración con organismos reguladores internacionales y ha evolucionado para abordar las complejidades del panorama digital moderno.
                </p>
                <div className="flex gap-8">
                  <div>
                    <span className="text-4xl font-black text-primary font-headline">30+</span>
                    <p className="text-xs font-bold text-outline uppercase tracking-wider mt-1 font-label">Años de operación</p>
                  </div>
                  <div>
                    <span className="text-4xl font-black text-primary font-headline">2.4K</span>
                    <p className="text-xs font-bold text-outline uppercase tracking-wider mt-1 font-label">Instituciones atendidas</p>
                  </div>
                  <div>
                    <span className="text-4xl font-black text-primary font-headline">100%</span>
                    <p className="text-xs font-bold text-outline uppercase tracking-wider mt-1 font-label">Tasa de cumplimiento</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    alt="LegacyGuard headquarters" 
                    className="w-full h-full object-cover opacity-90"
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low/80 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-xs font-bold text-on-surface uppercase tracking-wider font-label">Sede Central</p>
                    <p className="text-sm text-on-surface-variant font-body">Torre de Cumplimiento Global, Zürich</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 bg-surface border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-4 font-headline">Junta Directiva</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto font-body">Liderazgo comprometido con la excelencia en auditoría institucional y cumplimiento regulatorio.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface-container-lowest p-8 text-center border border-outline-variant/10">
                <div className="w-24 h-24 mx-auto mb-6 bg-surface-container-low rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-outline-variant">person</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface font-headline mb-2">Dr. Heinrich Weber</h3>
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4 font-label">Director Ejecutivo</p>
                <p className="text-sm text-on-surface-variant font-body">Exdirector del Banco Nacional Suizo. 35 años en servicios financieros.</p>
              </div>
              <div className="bg-surface-container-lowest p-8 text-center border border-outline-variant/10">
                <div className="w-24 h-24 mx-auto mb-6 bg-surface-container-low rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-outline-variant">person</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface font-headline mb-2">Sra. Alexandra Chen</h3>
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4 font-label">Directora de Cumplimiento</p>
                <p className="text-sm text-on-surface-variant font-body">Anterior comisaria de auditorías ISO. Especialista en marcos regulatorios.</p>
              </div>
              <div className="bg-surface-container-lowest p-8 text-center border border-outline-variant/10">
                <div className="w-24 h-24 mx-auto mb-6 bg-surface-container-low rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-outline-variant">person</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface font-headline mb-2">Ing. Marcus Van Der Berg</h3>
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4 font-label">Director de Tecnología</p>
                <p className="text-sm text-on-surface-variant font-body">Arquitecto de sistemas de auditoría para entidades soberanas.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 bg-surface-container-low border-t border-outline-variant/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-6 font-headline">Certificaciones y Acuerdos</h2>
                <p className="text-on-surface-variant mb-8 font-body leading-relaxed">
                  Nuestra operación está respaldada por las certificaciones más rigurosas del sector y acuerdos de colaboración con organismos internacionales de cumplimiento.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-surface-container-lowest border-l-4 border-primary">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    <div>
                      <p className="font-bold text-on-surface font-headline">ISO 27001:2022</p>
                      <p className="text-xs text-on-surface-variant font-body">Gestión de Seguridad de la Información</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-surface-container-lowest border-l-4 border-primary">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    <div>
                      <p className="font-bold text-on-surface font-headline">ISO 9001:2015</p>
                      <p className="text-xs text-on-surface-variant font-body">Gestión de Calidad Auditora</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-surface-container-lowest border-l-4 border-primary">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    <div>
                      <p className="font-bold text-on-surface font-headline">SOC 2 Type II</p>
                      <p className="text-xs text-on-surface-variant font-body">Controles de Servicios de Confianza</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-6 font-headline">Alianzas Estratégicas</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-high p-6 text-center">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2">account_balance</span>
                    <p className="font-bold text-on-surface font-headline text-sm">Banco Mundial</p>
                  </div>
                  <div className="bg-surface-container-high p-6 text-center">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2">security</span>
                    <p className="font-bold text-on-surface font-headline text-sm">FMI</p>
                  </div>
                  <div className="bg-surface-container-high p-6 text-center">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2">gavel</span>
                    <p className="font-bold text-on-surface font-headline text-sm">OCDE</p>
                  </div>
                  <div className="bg-surface-container-high p-6 text-center">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2">groups</span>
                    <p className="font-bold text-on-surface font-headline text-sm">BIS</p>
                  </div>
                </div>
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