'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, ShoppingCart, User, ChevronDown, Stethoscope, Droplet, Activity, Heart, Brain, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ShopHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  // Smart Sticky Header - esconde ao rolar para baixo, mostra ao rolar para cima
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const examCategories = [
    { name: 'Check-ups Completos', icon: Stethoscope, color: 'text-primary', items: ['Check-up Básico', 'Check-up Premium', 'Check-up Executivo'] },
    { name: 'Exames de Sangue', icon: Droplet, color: 'text-red-500', items: ['Hemograma', 'Glicemia', 'Colesterol', 'Vitaminas'] },
    { name: 'Exames de Imagem', icon: Activity, color: 'text-blue-500', items: ['Ultrassom', 'Raio-X', 'Tomografia', 'Ressonância'] },
    { name: 'Cardiologia', icon: Heart, color: 'text-pink-500', items: ['ECG', 'Holter', 'Teste Ergométrico'] },
    { name: 'Neurologia', icon: Brain, color: 'text-purple-500', items: ['EEG', 'Doppler Cerebral'] },
    { name: 'Oftalmologia', icon: Eye, color: 'text-cyan-500', items: ['Acuidade Visual', 'Tonometria', 'Fundo de Olho'] },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center transition-transform hover:scale-105">
              <Image
                src="/assets/logo.svg"
                alt="Anacli"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </a>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-8 ml-12">
            <div 
              className="relative"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors font-medium">
                Exames
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Mega Menu */}
              {showMegaMenu && (
                <div className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-3 gap-6">
                    {examCategories.map((category) => (
                      <div key={category.name} className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <category.icon className={`h-5 w-5 ${category.color}`} />
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        </div>
                        <ul className="space-y-2">
                          {category.items.map((item) => (
                            <li key={item}>
                              <a 
                                href="#" 
                                className="text-sm text-gray-600 hover:text-primary transition-colors block py-1"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      Ver todos os exames →
                    </a>
                  </div>
                </div>
              )}
            </div>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">Pacotes</a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">Como Funciona</a>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar exames..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 rounded-full border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Login */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gray-100 transition-all hover:scale-110"
              aria-label="Login"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gray-100 transition-all hover:scale-110"
              aria-label="Carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-white text-xs flex items-center justify-center font-medium shadow-lg animate-pulse">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar exames..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 h-10 rounded-full border-gray-200 text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
