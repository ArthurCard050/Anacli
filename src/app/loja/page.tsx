'use client';

import ShopHeader from './components/ShopHeader';
import HeroSectionV2 from './components/HeroSectionV2';
import AIBanner from './components/AIBanner';
import BentoGrid from './components/BentoGrid';
import CartDrawer from './components/CartDrawer';
import WhatsAppFAB from './components/WhatsAppFAB';
import ShopFooter from './components/ShopFooter';
import { CartProvider } from './context/CartContext';

export default function LojaAnacli() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <ShopHeader />
        <HeroSectionV2 />
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
