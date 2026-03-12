'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, User, ChevronDown, Stethoscope, Droplet, Activity, Heart, Brain, Eye, Menu, X, TestTube, Microscope, Zap, Shield, Target, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../../usuario/context/AuthContext';
import '../styles/mega-menu.css';

export default function ShopHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { itemCount, openCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detecta scroll para esconder apenas a barra de busca
  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Adicionar listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

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
    if (!isClient) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mega-menu-container') && !target.closest('.user-menu-container')) {
        setShowMegaMenu(false);
        setShowUserMenu(false);
      }
    };

    if (showMegaMenu || showUserMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMegaMenu, showUserMenu, isClient]);

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
      className={`fixed top-0 left-0 right-0 z-[100] bg-card-clean backdrop-blur-md border-b border-border-clean transition-all duration-300 ${
        scrollY > 50 ? 'micro-shadow' : ''
      }`}
      style={{ overflow: 'visible' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ overflow: 'visible' }}>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Menu Hamburger + Logo */}
          <div className="flex items-center gap-4">
            {/* Hamburger Menu - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <div className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <span className="hamburger-line bg-text-primary-clean"></span>
                <span className="hamburger-line bg-text-primary-clean"></span>
                <span className="hamburger-line bg-text-primary-clean"></span>
              </div>
            </Button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/loja" className="flex items-center transition-transform hover:scale-105">
                <img
                  src="/assets/logo.svg"
                  alt="Anacli"
                  width={120}
                  height={40}
                  className="h-8 md:h-10 w-auto"
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
                className="flex items-center gap-1 text-text-primary-clean hover:text-brand-accent transition-colors font-clean-medium py-4"
              >
                Exames
                <ChevronDown className={`h-4 w-4 chevron-rotate ${showMegaMenu ? 'open' : ''}`} />
              </button>

              {/* Mega Menu */}
              {showMegaMenu && (
                <div 
                  className="mega-menu-dropdown w-[900px] bg-card-clean rounded-small-clean no-shadow border border-border-clean overflow-hidden mega-menu-enter"
                >
                  {/* Header do Menu */}
                  <div className="bg-gray-50 p-6 border-b border-border-clean">
                    <h2 className="text-xl font-clean-bold mb-2 text-text-primary-clean">Nossos Exames</h2>
                    <p className="text-text-secondary-clean text-sm">Escolha entre mais de 200 tipos de exames disponíveis</p>
                  </div>

                  {/* Conteúdo do Menu */}
                  <div className="p-8 bg-card-clean">
                    <div className="grid grid-cols-3 gap-8">
                      {examCategories.map((category, index) => (
                        <div key={category.name} className={`group stagger-animation`}>
                          <div className={`menu-category-header flex items-center gap-3 mb-4 p-3 rounded-small-clean ${category.bgColor} group-hover:micro-shadow transition-all duration-200`}>
                            <div className={`p-2 rounded-button-clean bg-card-clean no-shadow`}>
                              <category.icon className={`h-5 w-5 ${category.color}`} />
                            </div>
                            <h3 className="font-clean-semibold text-text-primary-clean text-sm">{category.name}</h3>
                          </div>
                          <ul className="space-y-2 pl-2">
                            {category.items.map((item) => (
                              <li key={item.name}>
                                <a 
                                  href="#" 
                                  onClick={closeMenu}
                                  className="menu-category-item menu-clickable-area text-sm text-text-secondary-clean hover:text-brand-accent transition-colors block py-1.5 px-2 rounded-button-clean hover:bg-gray-50 flex items-center gap-2"
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
                    <div className="mt-8 pt-6 border-t border-border-clean flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-text-secondary-clean">
                        <Microscope className="h-4 w-4" />
                        <span>Mais de 200 exames disponíveis</span>
                      </div>
                      <a 
                        href="/loja/exames" 
                        onClick={closeMenu}
                        className="menu-clickable-area inline-flex items-center gap-2 text-sm font-clean-medium text-brand-accent hover:text-brand-accent/80 transition-colors bg-brand-accent/5 px-4 py-2 rounded-button-clean hover:bg-brand-accent/10"
                      >
                        Ver todos os exames
                        <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <a href="/loja/pacotes" className="text-text-primary-clean hover:text-brand-accent transition-colors font-clean-medium">Pacotes</a>
            <a href="/loja/como-funciona" className="text-text-primary-clean hover:text-brand-accent transition-colors font-clean-medium">Como Funciona</a>
          </nav>

          {/* Search Bar - Desktop (sempre visível) */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary-clean" />
              <Input
                type="search"
                placeholder="Buscar exames..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 rounded-full bg-gray-50 border-border-clean text-text-primary-clean placeholder:text-text-secondary-clean focus:border-brand-accent focus:ring-brand-accent/20 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5 text-text-primary-clean" />
            </Button>

            {/* Login/User Menu */}
            <div className="relative user-menu-container">
              {isAuthenticated && user ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="relative hover:bg-gray-100 transition-all hover:scale-105 flex items-center gap-2 px-3"
                    aria-label="Menu do usuário"
                  >
                    <User className="h-5 w-5 text-text-primary-clean" />
                    <span className="hidden md:block text-sm font-medium text-text-primary-clean">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 text-text-primary-clean" />
                  </Button>
                  
                  {/* Dropdown do usuário */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <a
                          href="/usuario/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          Minha Conta
                        </a>
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          Sair
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => window.location.href = '/usuario/login'}
                  className="relative hover:bg-gray-100 transition-all hover:scale-105"
                  aria-label="Login"
                >
                  <User className="h-5 w-5 text-text-primary-clean" />
                </Button>
              )}
            </div>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative hover:bg-gray-100 transition-all hover:scale-110"
              aria-label="Carrinho"
            >
              <ShoppingCart className="h-5 w-5 text-text-primary-clean" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand-accent text-white text-xs flex items-center justify-center font-clean-medium no-shadow animate-pulse">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile (sempre visível) */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar exames..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 h-10 rounded-full bg-gray-100 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary/20 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-6 max-h-[80vh] overflow-y-auto">
            {/* Navegação Principal - Pacotes e Como Funciona */}
            <div className="mb-6">
              <div className="flex gap-4">
                <a 
                  href="/loja/pacotes" 
                  className="flex-1 text-center text-white bg-primary hover:bg-primary/90 transition-colors font-semibold py-3 px-4 rounded-xl shadow-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pacotes
                </a>
                <a 
                  href="/loja/como-funciona" 
                  className="flex-1 text-center text-primary bg-primary/10 hover:bg-primary/20 transition-colors font-semibold py-3 px-4 rounded-xl border border-primary/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Como Funciona
                </a>
              </div>
            </div>

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
                  href="/loja/exames" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/5 px-4 py-3 rounded-lg hover:bg-primary/10"
                >
                  Ver todos os exames
                  <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                </a>
              </div>
            </div>

            {/* Links do Site */}
            <div className="mt-6 pt-4 border-t border-gray-100">
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
      )}
    </header>
  );
}
