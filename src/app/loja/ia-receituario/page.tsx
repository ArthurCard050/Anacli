'use client';

export const dynamic = 'force-dynamic';

import ShopHeader from '../components/ShopHeader';
import ShopFooter from '../components/ShopFooter';
import WhatsAppFAB from '../components/WhatsAppFAB';
import IAReceituarioContent from './components/IAReceituarioContent';

export default function IAReceituarioPage() {
  return (
    <div className="min-h-screen bg-page">
      <ShopHeader />
      <IAReceituarioContent />
      <ShopFooter />
      <WhatsAppFAB />
    </div>
  );
}
