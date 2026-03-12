'use client';

import HeroCarousel from './components/HeroCarousel';
import ShopHeader from './components/ShopHeader';
import AIBanner from './components/AIBanner';
import BentoGrid from './components/BentoGrid';
import ShopFooter from './components/ShopFooter';

export default function LojaPageClient() {
  return (
    <div className="min-h-screen bg-page">
      <ShopHeader />
      <HeroCarousel />
      <AIBanner />
      <BentoGrid />
      <ShopFooter />
    </div>
  );
}