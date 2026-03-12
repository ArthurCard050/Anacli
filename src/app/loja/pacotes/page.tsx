'use client';

export const dynamic = 'force-dynamic';

import ShopHeader from '../components/ShopHeader';
import ShopFooter from '../components/ShopFooter';
import PacotesHeroSection from './components/PacotesHeroSection';
import PacotesListSection from './components/PacotesListSection';
import AIBanner from '../components/AIBanner';
import WhatsAppFAB from '../components/WhatsAppFAB';

export default function PacotesPage() {
  return (
    <div className="min-h-screen bg-page">
      <ShopHeader />
      
      <main>
        <PacotesHeroSection />
        <PacotesListSection />
        <AIBanner />
      </main>

      <ShopFooter />
      <WhatsAppFAB />
    </div>
  );
}
