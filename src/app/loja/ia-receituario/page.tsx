import { Metadata } from 'next';
import { CartProvider } from '../context/CartContext';
import ShopHeader from '../components/ShopHeader';
import ShopFooter from '../components/ShopFooter';
import IAReceituarioContent from './components/IAReceituarioContent';
import './styles.css';

export const metadata: Metadata = {
  title: 'Leitura de Receituário com IA | Anacli',
  description: 'Envie seu receituário médico e nossa IA identifica automaticamente os exames solicitados em segundos.',
};

export default function IAReceituarioPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <ShopHeader />
        
        <main className="pt-20">
          <IAReceituarioContent />
        </main>

        <ShopFooter />
      </div>
    </CartProvider>
  );
}
