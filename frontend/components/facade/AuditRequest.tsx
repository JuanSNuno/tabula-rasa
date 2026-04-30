"use client";

import React, { useState } from 'react';

interface Props {
  setView: (view: 'home' | 'services' | 'support' | 'about' | 'contact' | 'audit-request') => void;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function AuditRequest({ setView }: Props) {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    auditType: '',
    complianceFramework: '',
    dataVolume: '',
    additionalInfo: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.organizationName.trim()) newErrors.organizationName = 'Nombre de organización requerido';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Persona de contacto requerida';
    if (!formData.email.trim()) newErrors.email = 'Correo electrónico requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Formato de correo inválido';
    if (!formData.auditType) newErrors.auditType = 'Seleccione un tipo de auditoría';
    if (!formData.complianceFramework) newErrors.complianceFramework = 'Seleccione un marco de cumplimiento';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus('submitting');

    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
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
              <button onClick={() => setView('contact')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Contacto</button>
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
              <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
            </div>
            <h2 className="text-3xl font-bold text-on-surface mb-4 font-headline">Solicitud Enviada</h2>
            <p className="text-on-surface-variant mb-8 font-body">
              Su solicitud de auditoría ha sido registrada en nuestro sistema. Un auditor senior contactará con usted en las próximas 48 horas.
            </p>
            <div className="p-4 bg-surface-container-low border border-outline-variant/10 mb-8">
              <p className="text-xs font-mono text-on-surface-variant">ID: LG-AUDIT-{Date.now().toString(36).toUpperCase()}</p>
            </div>
            <button 
              onClick={() => { setStatus('idle'); setFormData({ organizationName: '', contactPerson: '', email: '', phone: '', auditType: '', complianceFramework: '', dataVolume: '', additionalInfo: '' }); }}
              className="px-6 py-3 bg-primary text-on-primary font-bold rounded hover:brightness-110 transition-all"
            >
              Nueva Solicitud
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
            <button onClick={() => setView('contact')} className="font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:text-on-surface transition-colors">Contacto</button>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="hidden sm:block px-4 py-2 font-inter text-sm font-medium tracking-tight text-on-surface-variant hover:bg-surface-container-low rounded transition-colors">Acceso de Cliente</button>
            <button onClick={() => setView('audit-request')} className="px-4 py-2 font-inter text-sm font-medium tracking-tight bg-primary text-on-primary rounded shadow-sm hover:brightness-110 transition-all">Solicitud de Auditoría</button>
          </div>
        </div>
      </nav>

      <main className="min-h-screen py-16 px-8 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <button onClick={() => setView('home')} className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors mb-6">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Volver al inicio
            </button>
            <div className="inline-block px-3 py-1 mb-4 bg-surface-container-high border-l-4 border-primary">
              <p className="text-xs font-bold tracking-widest text-primary uppercase font-label">Protocolo de Auditoría</p>
            </div>
            <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-4 font-headline">Solicitud de Auditoría Institucional</h1>
            <p className="text-on-surface-variant font-body">Complete el formulario para iniciar el proceso de auditoría. Nuestro equipo evaluará su solicitud y contactará en un plazo de 48 horas.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-surface-container-lowest p-8 border border-outline-variant/10">
              <h3 className="text-lg font-bold text-on-surface mb-6 font-headline flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">business</span>
                Información de la Organización
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Nombre de la Organización *</label>
                  <input
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className={`w-full bg-surface-container-low border ${errors.organizationName ? 'border-red-500' : 'border-outline-variant/30'} px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none`}
                    placeholder="Razón social oficial"
                  />
                  {errors.organizationName && <p className="text-xs text-red-500">{errors.organizationName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Persona de Contacto *</label>
                  <input
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className={`w-full bg-surface-container-low border ${errors.contactPerson ? 'border-red-500' : 'border-outline-variant/30'} px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none`}
                    placeholder="Nombre completo"
                  />
                  {errors.contactPerson && <p className="text-xs text-red-500">{errors.contactPerson}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Correo Corporativo *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-surface-container-low border ${errors.email ? 'border-red-500' : 'border-outline-variant/30'} px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none`}
                    placeholder="oficial@corporativo.com"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Teléfono</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none"
                    placeholder="+00 000 000 0000"
                  />
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 border border-outline-variant/10">
              <h3 className="text-lg font-bold text-on-surface mb-6 font-headline flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">fact_check</span>
                Detalles de la Auditoría
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Tipo de Auditoría *</label>
                  <select
                    name="auditType"
                    value={formData.auditType}
                    onChange={handleChange}
                    className={`w-full bg-surface-container-low border ${errors.auditType ? 'border-red-500' : 'border-outline-variant/30'} px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none`}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="full">Auditoría Completa de Sistemas</option>
                    <option value="compliance">Auditoría de Cumplimiento</option>
                    <option value="security">Auditoría de Seguridad Informática</option>
                    <option value="financial">Auditoría Financiera</option>
                    <option value="forensic">Auditoría Forense</option>
                  </select>
                  {errors.auditType && <p className="text-xs text-red-500">{errors.auditType}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Marco de Cumplimiento *</label>
                  <select
                    name="complianceFramework"
                    value={formData.complianceFramework}
                    onChange={handleChange}
                    className={`w-full bg-surface-container-low border ${errors.complianceFramework ? 'border-red-500' : 'border-outline-variant/30'} px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none`}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="iso27001">ISO 27001</option>
                    <option value="iso9001">ISO 9001</option>
                    <option value="gdpr">GDPR</option>
                    <option value="soc2">SOC 2</option>
                    <option value="pci-dss">PCI-DSS</option>
                    <option value="basel">Basilea III/IV</option>
                  </select>
                  {errors.complianceFramework && <p className="text-xs text-red-500">{errors.complianceFramework}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Volumen de Datos (aprox.)</label>
                  <select
                    name="dataVolume"
                    value={formData.dataVolume}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="small">&lt; 1 TB</option>
                    <option value="medium">1 - 50 TB</option>
                    <option value="large">50 - 500 TB</option>
                    <option value="enterprise">&gt; 500 TB</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase font-bold text-outline tracking-wide font-label">Información Adicional</label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-surface-container-low border border-outline-variant/30 px-4 py-3 text-on-surface text-sm focus:border-primary focus:ring-0 transition-all outline-none resize-none"
                    placeholder="Describa brevemente las necesidades específicas de auditoría..."
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <input type="checkbox" id="terms" className="mt-1 w-4 h-4" required />
              <label htmlFor="terms" className="text-sm text-on-surface-variant">
                Acepto los términos del servicio y la política de privacidad. Mis datos serán tratados de acuerdo con el Reglamento General de Protección de Datos.
              </label>
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
                  Procesando Solicitud...
                </>
              ) : (
                <>
                  Enviar Solicitud
                  <span className="material-symbols-outlined">send</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-outline leading-tight font-body">
              Todos los envíos están cifrados y registrados en el Libro Mayor Soberano para auditoría de cumplimiento. Tiempo de respuesta estimado: &lt; 48 horas.
            </p>
          </form>
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