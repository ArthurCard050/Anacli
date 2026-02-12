import { Metadata } from 'next';
import ShopHeader from '../components/ShopHeader';
import ShopFooter from '../components/ShopFooter';
import WhatsAppFAB from '../components/WhatsAppFAB';
import { CartProvider } from '../context/CartContext';
import PacotesHeroSection from './components/PacotesHeroSection';
import PacotesListSection from './components/PacotesListSection';
import AIBanner from '../components/AIBanner';

export const metadata: Metadata = {
  title: 'Pacotes de Exames | Anacli Loja',
  description: 'Confira nossos pacotes de exames com preços especiais. Check-ups completos e personalizados para cuidar da sua saúde.',
};

export default function PacotesPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <ShopHeader />
        
        <main className="pt-16 md:pt-20">
          <PacotesHeroSection />
          <PacotesListSection />
          <AIBanner />
        </main>

        <ShopFooter />
        <WhatsAppFAB />
      </div>
    </CartProvider>
  );
}
