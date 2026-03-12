import { Metadata } from 'next';
import ShopHeader from '../components/ShopHeader';
import ShopFooter from '../components/ShopFooter';
import AIBanner from '../components/AIBanner';
import ExamesListSection from './components/ExamesListSection';
import './styles/exames.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Exames Laboratoriais | Anacli - Mais de 200 Tipos Disponíveis',
  description: 'Realize seus exames laboratoriais com a Anacli. Mais de 200 tipos de exames disponíveis, resultados rápidos e precisos. Agende online agora!',
  keywords: 'exames laboratoriais, análises clínicas, hemograma, glicemia, colesterol, check-up, Anacli',
};

export default function ExamesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      
      <main className="pt-20">
        <ExamesListSection />
        <AIBanner />
      </main>

      <ShopFooter />
    </div>
  );
}