import ShopHeader from './components/ShopHeader';
import HeroSection from './components/HeroSection';
import AIBanner from './components/AIBanner';

export default function LojaAnacli() {
  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <HeroSection />
      <AIBanner />
    </div>
  );
}
