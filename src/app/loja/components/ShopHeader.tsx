'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, ShoppingCart, User, ChevronDown, Stethoscope, Droplet, Activity, Heart, Brain, Eye, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';

export default function ShopHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const { itemCount, openCart } = useCart();

  // Detecta scroll para esconder apenas a barra de busca
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Adicionar listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-[100] bg-accent backdrop-blur-md border-b border-accent/20 transition-all duration-300 ${
        scrollY > 50 ? 'rounded-b-2xl shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Menu Hamburger + Logo */}
          <div className="flex items-center gap-4">
            {/* Hamburger Menu - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </Button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/loja" className="flex items-center transition-transform hover:scale-105">
                <Image
                  src="/assets/logo.svg"
                  alt="Anacli"
                  width={120}
                  height={40}
                  className="h-8 md:h-10 w-auto brightness-0 invert"
                  priority
                />
              </a>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <div 
              className="relative"
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <button className="flex items-center gap-1 text-white hover:text-white/80 transition-colors font-medium">
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
            <a href="#" className="text-white hover:text-white/80 transition-colors font-medium">Pacotes</a>
            <a href="#" className="text-white hover:text-white/80 transition-colors font-medium">Como Funciona</a>
          </nav>

          {/* Search Bar - Desktop (sempre visível) */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
              <Input
                type="search"
                placeholder="Buscar exames..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white/20 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-white/10"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5 text-white" />
            </Button>

            {/* Login */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-white/10 transition-all hover:scale-110"
              aria-label="Login"
            >
              <User className="h-5 w-5 text-white" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative hover:bg-white/10 transition-all hover:scale-110"
              aria-label="Carrinho"
            >
              <ShoppingCart className="h-5 w-5 text-white" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white text-accent text-xs flex items-center justify-center font-medium shadow-lg animate-pulse">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile (sempre visível) */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              type="search"
              placeholder="Buscar exames..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 h-10 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white/20 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-accent border-t border-white/20 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              {/* Exames Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-white text-lg">Exames</h3>
                <div className="grid grid-cols-1 gap-3 pl-4">
                  {examCategories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <category.icon className={`h-4 w-4 text-white`} />
                        <span className="font-medium text-white text-sm">{category.name}</span>
                      </div>
                      <div className="pl-6 space-y-1">
                        {category.items.map((item) => (
                          <a 
                            key={item}
                            href="#" 
                            className="block text-sm text-white/80 hover:text-white transition-colors py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Navigation Items */}
              <div className="space-y-3 pt-4 border-t border-white/20">
                <a 
                  href="#" 
                  className="block text-white hover:text-white/80 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pacotes
                </a>
                <a 
                  href="#" 
                  className="block text-white hover:text-white/80 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Como Funciona
                </a>
                <a 
                  href="#" 
                  className="block text-white hover:text-white/80 transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ver todos os exames →
                </a>
              </div>

              {/* Site Navigation */}
              <div className="space-y-3 pt-4 border-t border-white/20">
                <h4 className="font-semibold text-white">Navegação do Site</h4>
                <div className="space-y-2 pl-4">
                  <a 
                    href="/" 
                    className="block text-white/80 hover:text-white transition-colors py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Página Inicial
                  </a>
                  <a 
                    href="/sobre" 
                    className="block text-white/80 hover:text-white transition-colors py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sobre Nós
                  </a>
                  <a 
                    href="/servicos" 
                    className="block text-white/80 hover:text-white transition-colors py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Serviços
                  </a>
                  <a 
                    href="/convenios" 
                    className="block text-white/80 hover:text-white transition-colors py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Convênios
                  </a>
                  <a 
                    href="/certificacoes" 
                    className="block text-white/80 hover:text-white transition-colors py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Certificações
                  </a>
                  <a 
                    href="/contato" 
                    className="block text-white/80 hover:text-white transition-colors py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contato
                  </a>
                  <a 
                    href="/faq" 
                    className="block text-white/80 hover:text-white transition-colors py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    FAQ
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
