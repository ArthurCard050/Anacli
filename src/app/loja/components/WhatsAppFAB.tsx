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
      {/* Balão de mensagem */}
      {showBubble && (
        <div className="relative bg-white rounded-2xl shadow-2xl p-4 pr-10 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={dismissBubble}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">Posso ajudar?</span>
            <br />
            Tire suas dúvidas sobre exames ou envie sua receita!
          </p>
        </div>
      )}

      {/* Botão FAB */}
      <button
        onClick={openWhatsApp}
        className={`relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          isPulsing ? 'animate-pulse' : ''
        }`}
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Indicador de notificação */}
        {showBubble && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold">1</span>
          </span>
        )}

        {/* Ring de pulse */}
        {isPulsing && (
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
        )}
      </button>
    </div>
  );
}
