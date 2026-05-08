'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const STORAGE_KEY = 'anacli_promo_popup_seen';

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Só abre na primeira visita da sessão
    const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
    if (!alreadySeen) {
      // Pequeno delay para a página carregar antes de exibir
      const timer = setTimeout(() => {
        setVisible(true);
        sessionStorage.setItem(STORAGE_KEY, '1');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => setVisible(false);

  const handleBannerClick = () => {
    close();
    // Scroll suave até a seção de Check-up Fitness
    setTimeout(() => {
      const section = document.getElementById('checkup-fitness');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl animate-popup"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={close}
          aria-label="Fechar popup"
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Banner clicável */}
        <button
          onClick={handleBannerClick}
          className="block w-full focus:outline-none cursor-pointer"
          aria-label="Conhecer pacotes Check-up Fitness"
        >
          <Image
            src="/assets/Banner-Pop-up-site.webp"
            alt="Pacotes Check-up Fitness – Anacli"
            width={600}
            height={600}
            className="w-full h-auto"
            priority
          />
        </button>
      </div>

      <style jsx global>{`
        @keyframes popup-in {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(16px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-popup {
          animation: popup-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}
