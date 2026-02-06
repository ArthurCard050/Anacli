'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Search, ShoppingCart, User, ChevronDown, Stethoscope, Droplet, Activity, Heart, Brain, Eye, Menu, X, TestTube, Microscope, Zap, Shield, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';

export default function ShopHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
    { 
      name: 'Check-ups Completos', 
      icon: Shield, 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50',
      items: [
        { name: 'Check-up Básico', icon: Stethoscope },
        { name: 'Check-up Premium', icon: Target },
        { name: 'Check-up Executivo', icon: Zap }
      ]
    },
    { 
      name: 'Exames de Sangue', 
      icon: Droplet, 
      color: 'text-red-600', 
      bgColor: 'bg-red-50',
      items: [
        { name: 'Hemograma', icon: TestTube },
        { name: 'Glicemia', icon: TestTube },
        { name: 'Colesterol', icon: TestTube },
        { name: 'Vitaminas', icon: TestTube }
      ]
    },
    { 
      name: 'Exames de Imagem', 
      icon: Activity, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      items: [
        { name: 'Ultrassom', icon: Activity },
        { name: 'Raio-X', icon: Activity },
        { name: 'Tomografia', icon: Activity },
        { name: 'Ressonância', icon: Activity }
      ]
    },
    { 
      name: 'Cardiologia', 
      icon: Heart, 
      color: 'text-pink-600', 
      bgColor: 'bg-pink-50',
      items: [
        { name: 'ECG', icon: Heart },
        { name: 'Holter', icon: Heart },
        { name: 'Teste Ergométrico', icon: Heart }
      ]
    },
    { 
      name: 'Neurologia', 
      icon: Brain, 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50',
      items: [
        { name: 'EEG', icon: Brain },
        { name: 'Doppler Cerebral', icon: Brain }
      ]
    },
    { 
      name: 'Oftalmologia', 
      icon: Eye, 
      color: 'text-cyan-600', 
      bgColor: 'bg-cyan-50',
      items: [
        { name: 'Acuidade Visual', icon: Eye },
        { name: 'Tonometria', icon: Eye },
        { name: 'Fundo de Olho', icon: Eye }
      ]
    },
  ];

  // Funções para controlar o menu com clique
  const toggleMenu = () => {
    setShowMegaMenu(!showMegaMenu);
  };

  const closeMenu = () => {
    setShowMegaMenu(false);
  };

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mega-menu-container')) {
        setShowMegaMenu(false);
      }
    };

    if (showMegaMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMegaMenu]);

  // Cleanup do timeout
  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
      }
    };
  }, []);

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
                  src="/assets/Logo-Hor-branca.svg"
                  alt="Anacli"
                  width={120}
                  height={40}
                  className="h-8 md:h-10 w-auto"
                  priority
                />
              </a>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <div 
              className="mega-menu-container relative"
            >
              <button 
                onClick={toggleMenu}
                className="flex items-center gap-1 text-white hover:text-white/80 transition-colors font-medium py-4"
              >
                Exames
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMegaMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu */}
              {showMegaMenu && (
                <div 
                  className="mega-menu-dropdown w-[900px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mega-menu-enter"
                >
                  {/* Header do Menu */}
                  <div className="bg-gray-50 p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold mb-2 text-gray-900">Nossos Exames</h2>
                    <p className="text-gray-600 text-sm">Escolha entre mais de 200 tipos de exames disponíveis</p>
                  </div>

                  {/* Conteúdo do Menu */}
                  <div className="p-8 bg-white">
                    <div className="grid grid-cols-3 gap-8">
                      {examCategories.map((category, index) => (
                        <div key={category.name} className={`group stagger-animation`}>
                          <div className={`menu-category-header flex items-center gap-3 mb-4 p-3 rounded-xl ${category.bgColor} group-hover:shadow-md transition-all duration-200`}>
                            <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                              <category.icon className={`h-5 w-5 ${category.color}`} />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                          </div>
                          <ul className="space-y-2 pl-2">
                            {category.items.map((item) => (
                              <li key={item.name}>
                                <a 
                                  href="#" 
                                  onClick={closeMenu}
                                  className="menu-category-item menu-clickable-area text-sm text-gray-600 hover:text-primary transition-colors block py-1.5 px-2 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <item.icon className="h-3 w-3 text-gray-400" />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    
                    {/* Footer do Menu */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Microscope className="h-4 w-4" />
                        <span>Mais de 200 exames disponíveis</span>
                      </div>
                      <a 
                        href="#" 
                        onClick={closeMenu}
                        className="menu-clickable-area inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/5 px-4 py-2 rounded-lg hover:bg-primary/10"
                      >
                        Ver todos os exames
                        <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                      </a>
                    </div>
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
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
          <div className="container mx-auto px-4 py-6 max-h-[80vh] overflow-y-auto">
            {/* Header do Menu - Igual ao Desktop */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
              <h2 className="text-lg font-bold mb-1 text-gray-900">Nossos Exames</h2>
              <p className="text-gray-600 text-sm">Escolha entre mais de 200 tipos de exames disponíveis</p>
            </div>

            {/* Conteúdo do Menu - Layout similar ao Desktop */}
            <div className="bg-white">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {examCategories.map((category, index) => (
                  <div key={category.name} className="group">
                    <div className={`flex items-center gap-2 mb-3 p-3 rounded-xl ${category.bgColor} group-hover:shadow-md transition-all duration-200`}>
                      <div className="p-1.5 rounded-lg bg-white shadow-sm">
                        <category.icon className={`h-4 w-4 ${category.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-xs">{category.name}</h3>
                    </div>
                    <ul className="space-y-1 pl-1">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <a 
                            href="#" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-xs text-gray-600 hover:text-primary transition-colors block py-1.5 px-2 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                          >
                            <item.icon className="h-3 w-3 text-gray-400" />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* Footer do Menu - Igual ao Desktop */}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                  <Microscope className="h-4 w-4" />
                  <span>Mais de 200 exames disponíveis</span>
                </div>
                <a 
                  href="#" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/5 px-4 py-3 rounded-lg hover:bg-primary/10"
                >
                  Ver todos os exames
                  <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                </a>
              </div>
            </div>

            {/* Navegação Adicional */}
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-4">
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="flex-1 text-center text-gray-700 hover:text-primary transition-colors font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pacotes
                </a>
                <a 
                  href="#" 
                  className="flex-1 text-center text-gray-700 hover:text-primary transition-colors font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Como Funciona
                </a>
              </div>

              {/* Links do Site */}
              <div className="pt-3 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Site Anacli</h4>
                <div className="grid grid-cols-2 gap-2">
                  <a 
                    href="/" 
                    className="text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Página Inicial
                  </a>
                  <a 
                    href="/sobre" 
                    className="text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sobre Nós
                  </a>
                  <a 
                    href="/servicos" 
                    className="text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Serviços
                  </a>
                  <a 
                    href="/convenios" 
                    className="text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Convênios
                  </a>
                  <a 
                    href="/certificacoes" 
                    className="text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Certificações
                  </a>
                  <a 
                    href="/contato" 
                    className="text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contato
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
