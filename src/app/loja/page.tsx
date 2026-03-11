'use client';

import HeroCarousel from './components/HeroCarousel';
import ShopHeader from './components/ShopHeader';
import AIBanner from './components/AIBanner';
import BentoGrid from './components/BentoGrid';
import ShopFooter from './components/ShopFooter';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

export default function LojaPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-page">
        <ShopHeader />
        <HeroCarousel />
        <AIBanner />
        <BentoGrid />
        <ShopFooter />
        
        {/* Componentes Flutuantes */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
