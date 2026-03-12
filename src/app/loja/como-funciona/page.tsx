'use client';

import ShopHeader from '../components/ShopHeader';
import ShopFooter from '../components/ShopFooter';
import { CartProvider } from '../context/CartContext';
import WhatsAppFAB from '../components/WhatsAppFAB';
import ComoFuncionaContent from './components/ComoFuncionaContent';

export default function ComoFuncionaPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-page">
        <ShopHeader />
        <ComoFuncionaContent />
        <ShopFooter />
        <WhatsAppFAB />
      </div>
    </CartProvider>
  );
}
