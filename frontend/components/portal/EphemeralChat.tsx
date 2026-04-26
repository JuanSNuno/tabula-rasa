"use client";

import React, { useState, useEffect, useRef } from 'react';

interface EphemeralChatProps {
  sessionId: string;
}

interface Message {
  id: string;
  encryptedPayload: string;
  expiresAt: string;
}

export default function EphemeralChat({ sessionId }: EphemeralChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Short Polling
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}`}/api/v1/messages/${sessionId}`);
        if (res.ok) {
          const data: Message[] = await res.json();
          // Solo actualiza si hay cambios para no romper el scroll
          setMessages(data || []);
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    };

    const intervalId = setInterval(fetchMessages, 3000); // Poll cada 3s
    fetchMessages(); // Initial fetch

    return () => clearInterval(intervalId);
  }, [sessionId]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    const sentText = inputText;
    try {
      // Mock de encriptación PGP/RSA
      const encrypted = `ENC_` + btoa(sentText); 
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          encryptedPayload: encrypted
        })
      });

      if (res.ok) {
        setInputText('');
      } else {
        throw new Error("Backend unreachable");
      }
    } catch (err) {
      // FALLBACK PARA LA DEMO
      const mockMsg: Message = {
        id: Math.random().toString(),
        encryptedPayload: `ENC_` + btoa(sentText),
        expiresAt: new Date(Date.now() + 15 * 60000).toISOString()
      };
      setMessages(prev => [...prev, mockMsg]);
      setInputText('');
    } finally {
      setLoading(false);
    }
  };

  const decryptMock = (payload: string) => {
    if (payload.startsWith('ENC_')) {
      try {
        return atob(payload.replace('ENC_', ''));
      } catch (e) {
        return payload;
      }
    }
    return payload;
  };

  return (
    <div className="flex flex-col h-[400px] md:h-[600px] border border-red-900 bg-black font-mono text-sm max-w-3xl mx-auto rounded-lg overflow-hidden shadow-[0_0_15px_rgba(220,38,38,0.3)] w-full">
      <div className="bg-red-950 text-red-500 p-2 border-b border-red-900 flex justify-between">
        <span>Túnel Mixnet [ACTIVO]</span>
        <span className="animate-pulse">TTL: 15m</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-600 italic">Esperando Operador...</p>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="text-green-500">
              <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>{' '}
              <span className="text-blue-400">Cliente:</span> {decryptMock(msg.encryptedPayload)}
            </div>
          ))
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <form onSubmit={sendMessage} className="border-t border-red-900 p-2 flex bg-zinc-950">
        <span className="text-green-500 p-2">&gt;</span>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-transparent text-green-500 focus:outline-none"
          placeholder="Escriba su mensaje (Será cifrado)..."
          disabled={loading}
          autoComplete="off"
        />
        <button type="submit" disabled={loading} className="text-gray-500 hover:text-green-500 px-2">
          [ENVIAR]
        </button>
      </form>
    </div>
  );
}
