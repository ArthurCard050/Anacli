'use client';

import { CartProvider } from '../context/CartContext';
import ShopHeader from '../components/ShopHeader';
import ShopFooter from '../components/ShopFooter';
import WhatsAppFAB from '../components/WhatsAppFAB';
import CartDrawer from '../components/CartDrawer';
import IAReceituarioContent from './components/IAReceituarioContent';

export default function IAReceituarioPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-page">
        <ShopHeader />
        <IAReceituarioContent />
        <ShopFooter />
        <WhatsAppFAB />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
