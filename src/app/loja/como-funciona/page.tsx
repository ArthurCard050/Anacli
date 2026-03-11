import { Metadata } from 'next';
import ShopHeader from '../components/ShopHeader';
import ShopFooter from '../components/ShopFooter';
import { CartProvider } from '../context/CartContext';
import ComoFuncionaHero from './components/ComoFuncionaHero';
import ComoFuncionaSteps from './components/ComoFuncionaSteps';
import ComoFuncionaBenefits from './components/ComoFuncionaBenefits';
import ComoFuncionaFAQ from './components/ComoFuncionaFAQ';
import ComoFuncionaCTA from './components/ComoFuncionaCTA';

export const metadata: Metadata = {
  title: 'Como Funciona | Anacli Loja',
  description: 'Entenda como é fácil e rápido fazer seus exames com a Anacli. Processo simples em 4 passos.',
};

export default function ComoFuncionaPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <ShopHeader />
        
        <main className="pt-16 md:pt-20">
          <ComoFuncionaHero />
          <ComoFuncionaSteps />
          <ComoFuncionaBenefits />
          <ComoFuncionaFAQ />
          <ComoFuncionaCTA />
        </main>

        <ShopFooter />
      </div>
    </CartProvider>
  );
}
