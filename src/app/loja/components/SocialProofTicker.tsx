'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Star, Users } from 'lucide-react';

const proofMessages = [
  { icon: Users, text: 'Mais de 150 exames agendados hoje', color: 'text-green-600' },
  { icon: Star, text: 'Nota 4.9 no Google Reviews', color: 'text-yellow-600' },
  { icon: TrendingUp, text: '98% de satisfação dos clientes', color: 'text-blue-600' },
];

export default function SocialProofTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % proofMessages.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentProof = proofMessages[currentIndex];
  const Icon = currentProof.icon;

  return (
    <div
      className={`bg-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl p-3 md:p-4 pr-4 md:pr-6 border border-gray-100 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div className={`h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 ${currentProof.color}`}>
          <Icon className="h-4 w-4 md:h-5 md:w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-1">{currentProof.text}</p>
          <p className="text-[10px] md:text-xs text-gray-500">Atualizado agora</p>
        </div>
      </div>
    </div>
  );
}
