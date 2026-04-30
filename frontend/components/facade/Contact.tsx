"use client";

import React, { useState } from 'react';

interface Props {
  setView: (view: 'home' | 'services' | 'support' | 'about' | 'contact' | 'audit-request') => void;
}

type FormStatus = 'idle' | 'submitting' | 'success';

export default function FacadeContact({ setView }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (status === 'success') {
    return (
      <>
        <nav className="w-full top-0 z-50 bg-[#f7f9fb] shadow-none duration-200 ease-in-out">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 md:px-8 py-4 gap-y-4 max-w-full">
            <div className="text-xl font-bold tracking-tighter text-on-surface font-headline">LegacyGuard</div>
            <div className="flex w-full justify-center md:w-auto order-last md:order-none items-center space-x-6 md:space-x-8">
              <button onClick={() => setView('home')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Inicio</button>
              <button onClick={() => setView('services')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Servicios</button>
              <button onClick={() => setView('about')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Nosotros</button>
              <button onClick={() => setView('contact')} className="font-inter text-sm font-medium tracking-tight text-on-surface border-b-2 border-primary pb-1">Contacto</button>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="hidden sm:block px-4 py-2 font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:bg-surface-container-low rounded transition-colors">Acceso de Cliente</button>
              <button onClick={() => setView('audit-request')} className="px-4 py-2 font-inter text-sm font-medium tracking-tight bg-primary text-on-primary rounded shadow-sm hover:brightness-110 transition-all">Solicitud de Auditoría</button>
            </div>
          </div>
        </nav>

        <main className="min-h-screen flex items-center justify-center px-8 py-24 bg-surface">
          <div className="max-w-lg w-full bg-surface-container-lowest p-12 text-center border border-primary/20">
            <div className="w-20 h-20 mx-auto mb-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-primary">mail</span>
            </div>
            <h2 className="text-3xl font-bold text-on-surface mb-4 font-headline">Mensaje Enviado</h2>
            <p className="text-on-surface-variant mb-8 font-body">
              Gracias por contactar con LegacyGuard. Nuestro equipo responderá a su consulta en un plazo de 24-48 horas laborables.
            </p>
            <button 
              onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', subject: '', message: '' }); }}
              className="px-6 py-3 bg-primary text-on-primary font-bold rounded hover:brightness-110 transition-all"
            >
              Enviar Nuevo Mensaje
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <nav className="w-full top-0 z-50 bg-[#f7f9fb] shadow-none duration-200 ease-in-out">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 md:px-8 py-4 gap-y-4 max-w-full">
          <div className="text-xl font-bold tracking-tighter text-on-surface font-headline">LegacyGuard</div>
          <div className="flex w-full justify-center md:w-auto order-last md:order-none items-center space-x-6 md:space-x-8">
            <button onClick={() => setView('home')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Inicio</button>
            <button onClick={() => setView('services')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Servicios</button>
            <button onClick={() => setView('about')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Nosotros</button>
            <button onClick={() => setView('contact')} className="font-inter text-sm font-medium tracking-tight text-on-surface border-b-2 border-primary pb-1">Contacto</button>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="hidden sm:block px-4 py-2 font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:bg-surface-container-low rounded transition-colors">Acceso de Cliente</button>
            <button onClick={() => setView('audit-request')} className="px-4 py-2 font-inter text-sm font-medium tracking-tight bg-primary text-on-primary rounded shadow-sm hover:brightness-110 transition-all">Solicitud de Auditoría</button>
          </div>
        </div>
      </nav>

      <main className="min-h-screen py-16 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-block px-3 py-1 mb-6 bg-surface-container-high border-l-4 border-primary">
              <p className="text-xs font-bold tracking-widest text-primary uppercase font-label">Canales de Comunicación</p>
            </div>
            <h1 className="text-5xl font-black text-on-surface tracking-tighter mb-6 font-headline">Contacto Institucional</h1>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-body">
              Estamos disponibles para consultas sobre nuestros servicios de auditoría. Utilice el formulario seguro o contacte directamente a través de nuestros canales autorizados.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-surface-container-lowest p-8 border border-outline-variant/10">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2 font-headline">Sede Central</h3>
              <p className="text-sm text-on-surface-variant font-body mb-4">
                Torre de Cumplimiento Global<br/>
                Bahnhofstrasse 45<br/>
                8001 Zürich, Suiza
              </p>
              <p className="text-xs text-outline font-label">Horario: L-V 09:00-18:00 CET</p>
            </div>

            <div className="bg-surface-container-lowest p-8 border border-outline-variant/10">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">mail</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2 font-headline">Correo Institucional</h3>
              <p className="text-sm text-on-surface-variant font-body mb-4">
                consultas@legacyguard.ch<br/>
                audits@legacyguard.ch<br/>
                compliance@legacyguard.ch
              </p>
              <p className="text-xs text-outline font-label">Tiempo de respuesta: &lt; 48h</p>
            </div>

            <div className="bg-surface-container-lowest p-8 border border-outline-variant/10">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">phone</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2 font-headline">Línea Telefónica</h3>
              <p className="text-sm text-on-surface-variant font-body mb-4">
                +41 44 123 45 67<br/>
                +1 212 555 0199<br/>
                +852 9876 5432
              </p>
              <p className="text-xs text-outline font-label">Disponibilidad 24/7 para clientes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-surface-container-lowest p-10 border border-outline-variant/10">
              <h2 className="text-2xl font-bold text-on-surface mb-8 font-headline">Formulario de Contacto</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Nombre Completo</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none"
                      placeholder="Su nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Correo Electrónico</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Asunto</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="consulta">Consulta General</option>
                    <option value="servicios">Información de Servicios</option>
                    <option value="colaboracion">Propuesta de Colaboración</option>
                    <option value="prensa">Comunicación de Prensa</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Mensaje</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none resize-none"
                    placeholder="Escriba su mensaje..."
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className={`w-full py-4 px-6 text-sm font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                    status === 'submitting' 
                      ? 'bg-primary/50 text-on-primary/50 cursor-not-allowed' 
                      : 'bg-primary text-on-primary hover:brightness-110'
                  }`}
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <span className="material-symbols-outlined">send</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-surface-container-high p-8 border border-outline-variant/10">
                <h3 className="text-lg font-bold text-on-surface mb-4 font-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">security</span>
                  Canales Seguros
                </h3>
                <p className="text-sm text-on-surface-variant font-body mb-4">
                  Para comunicaciones que requieren cifrado de extremo a extremo, proporcionamos canales seguros adicionales a través de nuestro portal de clientes.
                </p>
                <button className="text-primary font-bold text-sm flex items-center gap-2 hover:brightness-110 transition-all">
                  Acceder al Portal Seguro <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </div>

              <div className="bg-surface-container-low p-8 border border-outline-variant/10">
                <h3 className="text-lg font-bold text-on-surface mb-4 font-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">business</span>
                  Oficinas Regionales
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-outline text-lg">place</span>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Londres</p>
                      <p className="text-xs text-on-surface-variant">Canary Wharf, E14 5AB</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-outline text-lg">place</span>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Nueva York</p>
                      <p className="text-xs text-on-surface-variant">One World Trade Center</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-outline text-lg">place</span>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Singapur</p>
                      <p className="text-xs text-on-surface-variant">Marina Bay Financial Centre</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-on-primary p-8">
                <h3 className="text-lg font-bold mb-4 font-headline flex items-center gap-2">
                  <span className="material-symbols-outlined">emergency</span>
                  Línea de Emergencia
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Disponible para incidentes de seguridad críticos las 24 horas.
                </p>
                <p className="text-2xl font-bold font-headline">+41 44 123 45 99</p>
              </div>
            </div>
          </div>
        </div>
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