import React from 'react';
import { SecurityModeProvider } from '../context/SecurityModeContext';
import './globals.css';

export const metadata = {
  title: 'Sistemas LegacyGuard | Auditoría Institucional',
  description: 'Mitigación de riesgos de grado empresarial e integración de sistemas heredados.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased transition-colors duration-500">
        <SecurityModeProvider>
          {children}
        </SecurityModeProvider>
      </body>
    </html>
  );
}
