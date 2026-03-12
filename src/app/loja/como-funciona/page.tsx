'use client';

export const dynamic = 'force-dynamic';

import ShopHeader from '../components/ShopHeader';
import ShopFooter from '../components/ShopFooter';
import WhatsAppFAB from '../components/WhatsAppFAB';
import ComoFuncionaContent from './components/ComoFuncionaContent';

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-page">
      <ShopHeader />
      <ComoFuncionaContent />
      <ShopFooter />
      <WhatsAppFAB />
    </div>
  );
}
