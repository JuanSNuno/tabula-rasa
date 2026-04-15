import React from 'react';
import { SecurityModeProvider } from '../context/SecurityModeContext';
import './globals.css';

export const metadata = {
  title: 'LegacyGuard Systems | Institutional Auditing',
  description: 'Enterprise-grade risk mitigation and legacy system integration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
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
