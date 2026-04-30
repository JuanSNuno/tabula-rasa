"use client";

import React from 'react';

interface Props {
  setView: (view: 'home' | 'services' | 'support') => void;
}

export default function FacadeServicios({ setView }: Props) {
  return (
    <>
      {/* TopNavBar */}
      <nav className="w-full top-0 z-50 bg-[#f7f9fb] shadow-none duration-200 ease-in-out">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 md:px-8 py-4 gap-y-4 max-w-full">
          <div className="text-xl font-bold tracking-tighter text-on-surface font-headline">LegacyGuard</div>
          <div className="flex w-full justify-center md:w-auto order-last md:order-none items-center space-x-6 md:space-x-8">
            <button onClick={() => setView('home')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Inicio</button>
            <button onClick={() => setView('services')} className="font-inter text-sm font-medium tracking-tight text-on-surface border-b-2 border-primary pb-1">Servicios</button>
            <button onClick={() => setView('support')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Soporte</button>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="hidden sm:block px-4 py-2 font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:bg-surface-container-low rounded transition-colors">Acceso de Cliente</button>
            <button className="px-4 py-2 font-inter text-sm font-medium tracking-tight bg-primary text-on-primary rounded shadow-sm hover:brightness-110 transition-all">Solicitud de Auditoría</button>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow max-w-7xl mx-auto px-8 py-16 w-full">
        <header className="mb-20 max-w-3xl">
          <div className="mb-4 inline-flex items-center px-3 py-1 bg-surface-container-high rounded-full">
            <span className="text-[10px] font-bold tracking-[0.15em] text-outline uppercase font-label">Niveles de Servicio 2024</span>
          </div>
          <h1 className="text-5xl font-black text-on-surface tracking-tighter mb-6 font-headline">Servicios de Auditoría Institucional</h1>
          <p className="text-lg text-on-surface-variant leading-relaxed font-body">
              Sistemas de verificación de grado soberano. Nuestra arquitectura de auditoría proporciona una capa de confianza inamovible para infraestructuras críticas y marcos regulatorios complejos.
          </p>
        </header>

        {/* Servicios Bento-Inspired Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-8 group relative bg-surface-container-lowest overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="p-10 flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl">database</span>
                  <h2 className="text-2xl font-bold tracking-tight text-on-surface font-headline">Auditoría de Bases de Datos</h2>
                </div>
                <p className="text-on-surface-variant leading-relaxed mb-8 max-w-lg font-body">
                    Análisis forense y estructural de repositorios de datos masivos. Implementamos protocolos de validación íntegra para asegurar que cada entrada en su libro mayor institucional sea inalterable y auditable.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-outline text-lg">check_circle</span>
                    <span className="text-sm font-medium text-on-surface font-label">Trazabilidad de Transacciones de Nivel 0</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-outline text-lg">check_circle</span>
                    <span className="text-sm font-medium text-on-surface font-label">Detección de Anomalías Basada en Patrones</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-64 h-64 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center p-4">
                <img alt="Server infrastructure" className="w-full h-full object-cover rounded opacity-80 mix-blend-multiply grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf8tfuTMPm_hUnvxpucvBpbA9JWhtFXVbWOaQON1kzlSBpMcXsiMJaeEb6h1uLrWGo_lNAkCVu5cJQiYk-HF6SjTFfUA8Mt606gikYYK2yOsDcXtmEsFIoPKBkRkZN7MeNfGpec2Tc-GsyMrUIc9TSncbgU-uGC3fPBSPKPTeCusJOXo38wgs0SYHNxdj09Q-0XEgHCf912EvZ7xvjw8Pln_fcPD4O_4WaLKN9bohsdR39oTAAQKzUS5g2zkGBquvc6gSQh9WtTog"/>
              </div>
            </div>
            <div className="px-10 py-6 bg-surface-container-low flex justify-between items-center">
              <span className="text-xs font-semibold text-outline tracking-widest uppercase font-label">
                Ref: DB-AUDIT-PROTO <span className="ml-4 font-mono text-[10px] text-primary">IR_Specter_Override_Omega</span>
              </span>
              <button className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                  Especificaciones Técnicas <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-4 bg-surface-container-lowest relative flex flex-col">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-fixed-dim"></div>
            <div className="p-10 flex-grow">
              <div className="mb-12">
                <div className="w-12 h-12 bg-surface-container-high flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">gavel</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-on-surface mb-4 font-headline">Cumplimiento Normativo (Compliance)</h2>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body">
                    Sincronización en tiempo real con marcos regulatorios internacionales (GDPR, ISO 27001, SOC2). Transformamos la burocracia en una ventaja competitiva.
                </p>
              </div>
              <div className="p-4 bg-surface-container-low border-l-2 border-outline-variant mb-6">
                <span className="block text-[10px] font-bold text-outline uppercase mb-2 font-label">Estado Regulatorio</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-xs font-bold text-on-surface">Protocolo Estándar Activo</span>
                </div>
              </div>
            </div>
            <div className="p-10 pt-0">
              <button className="w-full py-3 bg-surface-container-high text-on-surface font-bold text-sm hover:bg-surface-container-highest transition-colors">
                  Descargar Libro Blanco
              </button>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-6 bg-primary text-on-primary p-12 flex flex-col justify-between min-h-[400px]">
            <div>
              <span className="material-symbols-outlined text-5xl mb-8">shield</span>
              <h2 className="text-3xl font-black tracking-tight mb-6 font-headline">Planes de Continuidad Institucional</h2>
              <p className="text-primary-fixed opacity-90 leading-relaxed max-w-xl font-body">
                  Arquitectura de resiliencia para fallos sistémicos. Diseñamos protocolos de "Almacenamiento en Frío" y redundancia operativa para asegurar que su institución nunca detenga su procesamiento, sin importar la escala del incidente.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 items-center border-t border-on-primary/10 pt-8">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-fixed-dim font-label">Objetivo RTO</span>
                <span className="text-2xl font-bold font-headline">&lt; 15 min</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-fixed-dim font-label">Redundancia</span>
                <span className="text-2xl font-bold font-headline" aria-details="IR_Specter_Override_Omega">Nivel IV</span>
              </div>
              <div className="ml-auto">
                <button className="px-6 py-3 border border-on-primary text-on-primary font-bold text-sm hover:bg-on-primary hover:text-primary transition-all" data-override="IR_Specter_Override_Omega">
                    Consultar Protocolo
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-6 bg-surface-container-high p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-xs font-bold text-outline tracking-[0.2em] uppercase mb-10 font-label">Métricas de Confianza de Red</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="text-4xl font-black text-on-surface font-headline">99.99%</span>
                <p className="text-xs text-on-surface-variant font-medium leading-tight font-body">Integridad de datos verificada por auditoría externa.</p>
              </div>
              <div className="space-y-2">
                <span className="text-4xl font-black text-on-surface font-headline">1.2M+</span>
                <p className="text-xs text-on-surface-variant font-medium leading-tight font-body">Puntos de control procesados diariamente.</p>
              </div>
              <div className="space-y-2">
                <span className="text-4xl font-black text-on-surface font-headline">24/7</span>
                <p className="text-xs text-on-surface-variant font-medium leading-tight font-body">Vigilancia autónoma de vectores de riesgo.</p>
              </div>
              <div className="space-y-2">
                <span className="text-4xl font-black text-on-surface font-headline">Cero</span>
                <p className="text-xs text-on-surface-variant font-medium leading-tight font-body">Brechas de seguridad reportadas en el último ciclo.</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-24 p-16 bg-surface-container-lowest border-t-4 border-primary">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-on-surface tracking-tight mb-4 font-headline">¿Requiere una evaluación personalizada?</h2>
            <p className="text-on-surface-variant mb-8 font-body">Nuestros auditores senior están disponibles para realizar una revisión inicial de su arquitectura de sistemas y marcos de cumplimiento.</p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-primary text-on-primary font-bold rounded shadow-sm hover:brightness-110 transition-all">Contactar con un Especialista</button>
              <button className="px-8 py-4 bg-surface-container-low text-on-surface font-bold rounded hover:bg-surface-container-high transition-all">Solicitar Demostración</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/20 bg-surface-dim duration-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 w-full opacity-80 hover:opacity-100 transition-opacity">
          <div className="text-lg font-black text-on-surface font-headline mb-4 md:mb-0">LegacyGuard</div>
          <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <a className="font-inter text-xs tracking-wide uppercase font-semibold text-on-surface-variant hover:text-on-surface transition-colors" href="#">Política de Privacidad</a>
            <a className="font-inter text-xs tracking-wide uppercase font-semibold text-on-surface-variant hover:text-on-surface transition-colors" href="#">Términos de Servicio</a>
            <a className="font-inter text-xs tracking-wide uppercase font-semibold text-on-surface-variant hover:text-on-surface transition-colors" href="#">Libro Blanco de Seguridad</a>
            <a className="font-inter text-xs tracking-wide uppercase font-semibold text-on-surface-variant hover:text-on-surface transition-colors" href="#">Cumplimiento Normativo</a>
          </div>
          <p className="font-inter text-xs tracking-wide uppercase font-semibold text-on-surface-variant">
              © 2024 Sistemas LegacyGuard. Autoridad Institucional en Auditoría de Sistemas.
          </p>
        </div>
      </footer>
    </>
  );
}
