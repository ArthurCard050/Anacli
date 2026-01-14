import ShopHeader from './components/ShopHeader';
import HeroSectionV2 from './components/HeroSectionV2';
import AIBanner from './components/AIBanner';

export const metadata = {
  title: 'Loja de Exames | Anacli - Compre Online',
  description: 'Compre seus exames laboratoriais online com a Anacli. Resultados rápidos, confiáveis e com a qualidade que você merece.',
};

export default function LojaAnacli() {
  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />
      <HeroSectionV2 />
      <AIBanner />
    </div>
  );
}
