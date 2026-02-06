'use client';

import { Search, Microscope, Clock, Shield } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ExamesHeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { icon: Microscope, label: 'Tipos de Exames', value: '200+' },
    { icon: Clock, label: 'Resultado em', value: '24h' },
    { icon: Shield, label: 'Precisão', value: '99.9%' }
  ];

  return (
    <section className="relative bg-primary py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Exames Laboratoriais
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Mais de 200 tipos de exames disponíveis com resultados rápidos e precisos
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar exames..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-20 h-12 rounded-xl bg-white border-0 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-accent shadow-lg"
              />
              <Button 
                className="absolute right-2 top-2 h-8 px-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-semibold text-sm"
              >
                Buscar
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl mb-2 mx-auto">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}