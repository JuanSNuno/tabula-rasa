"use client";

import React, { useState } from 'react';
import { useSecurityMode } from '../context/SecurityModeContext';
import FacadeHome from '../components/facade/Home';
import FacadeServices from '../components/facade/Services';
import FacadeSupport from '../components/facade/Support';
import PortalDashboard from '../components/portal/Dashboard';

export default function Page() {
  const { isClandestine } = useSecurityMode();
  const [view, setView] = useState<'home' | 'services' | 'support'>('home');

  if (isClandestine) {
    return <PortalDashboard />;
  }

  return (
    <>
      {view === 'home' && <FacadeHome setView={setView} />}
      {view === 'services' && <FacadeServices setView={setView} />}
      {view === 'support' && <FacadeSupport setView={setView} />}
    </>
  );
}
