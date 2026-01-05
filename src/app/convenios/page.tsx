import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConveniosHeroSection from '@/components/sections/ConveniosHeroSection';
import ConveniosGallerySection from '@/components/sections/ConveniosGallerySection';
import ConveniosContactSection from '@/components/sections/ConveniosContactSection';

export const metadata: Metadata = {
  title: 'Convênios Médicos Aceitos | Anacli Laboratorial Feira de Santana',
  description: 'Confira todos os convênios médicos aceitos pelo Anacli Laboratorial. Unimed, Bradesco Saúde, SulAmérica e mais. Agende seus exames com facilidade.',
  keywords: [
    'convênios Anacli',
    'planos de saúde aceitos',
    'Unimed Feira de Santana',
    'Bradesco Saúde',
    'SulAmérica',
    'convênios laboratório Bahia',
    'planos médicos aceitos'
  ],
  openGraph: {
    title: 'Convênios Médicos Aceitos | Anacli Laboratorial',
    description: 'Confira todos os convênios médicos aceitos pelo Anacli Laboratorial em Feira de Santana - BA.',
    url: 'https://anacli.com.br/convenios',
  },
  alternates: {
    canonical: 'https://anacli.com.br/convenios'
  }
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