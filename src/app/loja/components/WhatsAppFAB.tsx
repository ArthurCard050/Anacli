'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = '5575999999999'; // Substituir pelo número real
const IDLE_TIME = 30000; // 30 segundos

export default function WhatsAppFAB() {
  const [showBubble, setShowBubble] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  // Detectar inatividade do usuário
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(idleTimer);
      setIsPulsing(false);
      
      if (!bubbleDismissed) {
        idleTimer = setTimeout(() => {
          setShowBubble(true);
          setIsPulsing(true);
        }, IDLE_TIME);
      }
    };

    // Eventos que resetam o timer
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    // Iniciar timer
    resetTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [bubbleDismissed]);

  // Fechar balão
  const dismissBubble = () => {
    setShowBubble(false);
    setBubbleDismissed(true);
    setIsPulsing(false);
  };

  // Abrir WhatsApp
  const openWhatsApp = () => {
    const message = encodeURIComponent('Olá! Preciso de ajuda com minha receita médica.');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
    dismissBubble();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Botão FAB */}
      <button
        onClick={openWhatsApp}
        className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
