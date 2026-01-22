'use client';

import HeroCarousel from './components/HeroCarousel';
import AIBanner from './components/AIBanner';
import BentoGrid from './components/BentoGrid';
import CartDrawer from './components/CartDrawer';
import WhatsAppFAB from './components/WhatsAppFAB';
import ShopFooter from './components/ShopFooter';
import { CartProvider } from './context/CartContext';
import './styles/hero-carousel.css';

export default function LojaAnacli() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <HeroCarousel />
        <AIBanner />
        <BentoGrid />
        <ShopFooter />
        
        {/* Componentes Flutuantes */}
        <CartDrawer />
        <WhatsAppFAB />
      </div>
    </CartProvider>
  );
}
