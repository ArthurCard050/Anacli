import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConveniosHeroSection from '@/components/sections/ConveniosHeroSection';
import ConveniosGallerySection from '@/components/sections/ConveniosGallerySection';
import ConveniosContactSection from '@/components/sections/ConveniosContactSection';

export const metadata: Metadata = {
  title: 'Convênios - Laboratório Anacli | Planos de Saúde Aceitos',
  description: 'Consulte os convênios médicos aceitos pelo Laboratório Anacli. Atendemos os principais planos de saúde com facilidade e agilidade no atendimento.',
  keywords: 'convênios anacli, planos de saúde, amil, hapvida, geap, unimed, laboratório credenciado',
}

export default function ConveniosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ConveniosHeroSection />
      <ConveniosGallerySection />
      <ConveniosContactSection />
      <Footer />
    </main>
  );
}