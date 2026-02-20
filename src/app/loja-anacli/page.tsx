import ShopHeader from './components/ShopHeader';
import HeroSection from './components/HeroSection';
import PackagesSection from './components/PackagesSection';
import ExamsCarousel from './components/ExamsCarousel';
import AIBanner from './components/AIBanner';

export default function LojaAnacli() {
  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <HeroSection />
      <PackagesSection />
      <ExamsCarousel />
      <AIBanner />
    </div>
  );
}
