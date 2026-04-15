"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SecurityModeContextType {
  isClandestine: boolean;
  activateClandestineMode: () => void;
  deactivateClandestineMode: () => void;
}

const SecurityModeContext = createContext<SecurityModeContextType | undefined>(undefined);

export const SecurityModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClandestine, setIsClandestine] = useState(false);

  const activateClandestineMode = () => {
    setIsClandestine(true);
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  };

  const deactivateClandestineMode = () => {
    setIsClandestine(false);
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Trigger: Ctrl + Shift + T
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        activateClandestineMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SecurityModeContext.Provider value={{ isClandestine, activateClandestineMode, deactivateClandestineMode }}>
      {children}
    </SecurityModeContext.Provider>
  );
};

export const useSecurityMode = () => {
  const context = useContext(SecurityModeContext);
  if (!context) {
    throw new Error('useSecurityMode debe usarse dentro de un SecurityModeProvider');
  }
  return context;
};
