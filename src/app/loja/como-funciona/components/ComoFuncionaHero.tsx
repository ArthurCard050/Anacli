'use client';

import { HelpCircle } from 'lucide-react';

export default function ComoFuncionaHero() {
  return (
    <section className="relative bg-white py-20 md:py-24 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Como Funciona</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Simples, Rápido e Seguro
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Fazer seus exames nunca foi tão fácil. Conheça nosso processo em 4 passos simples
          </p>

          {/* Simple divider */}
          <div className="w-16 h-1 bg-accent mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
