"use client";

import React, { useState } from 'react';

interface ZkScannerProps {
  sessionId: string;
  onVerified: () => void;
}

export default function ZkScanner({ sessionId, onVerified }: ZkScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulateZkProof = async () => {
    setScanning(true);
    setError(null);

    // Simulate network delay and ZK generation
    setTimeout(async () => {
      try {
        // Enviar proof mockeado a nuestra API de Go
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionId || "DEMO-ZK-SESSION",
            proofPayload: 'zk_snark_proof_v1_mock_data_polygon_id_1234567890'
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.verified) {
            onVerified();
          } else {
            setError("Proof matemático inválido.");
          }
        } else {
          // FALLBACK PARA LA DEMO
          onVerified();
        }
      } catch (err) {
        // FALLBACK PARA LA DEMO
        onVerified();
      } finally {
        setScanning(false);
      }
    }, 2000);
  };

  return (
    <div className="border border-green-800 bg-black p-6 rounded-lg font-mono w-full max-w-lg mx-auto">
      <h3 className="text-green-500 text-xl mb-4">[ZKP] OFAC/Interpol Autorización Requerida</h3>
      <p className="text-gray-400 mb-6 text-sm">
        Para acceder a la Mixnet, debe proveer una credencial ZK verificable de que no figura en listas de sanciones (SDN/Red Notices). No envíe PII.
      </p>
      
      <div className="flex justify-center mb-6">
        <div className={`w-32 h-32 border-4 ${scanning ? 'border-green-500 animate-pulse' : 'border-gray-600'} rounded-lg flex items-center justify-center`}>
           <span className="text-xs text-center text-gray-500">Escáner<br/>QR / Wallet</span>
        </div>
      </div>

      <button 
        onClick={simulateZkProof}
        disabled={scanning}
        className="w-full bg-green-900 text-black font-bold py-2 px-4 rounded disabled:opacity-50 hover:bg-green-700 transition-colors"
      >
        {scanning ? 'Generando zk-SNARK...' : 'Transmitir Prueba ZK'}
      </button>

      {error && (
        <p className="text-red-500 mt-4 text-sm font-bold animate-pulse">&gt; ERROR: {error}</p>
      )}
    </div>
  );
}
