import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServicosHeroSection from '@/components/sections/ServicosHeroSection';
import ServicosExamesSection from '@/components/sections/ServicosExamesSection';
import ServicosListSection from '@/components/sections/ServicosListSection';
import ServicosDestaquesSection from '@/components/sections/ServicosDestaquesSection';
import ServicosCtaSection from '@/components/sections/ServicosCtaSection';

export const metadata: Metadata = {
  title: 'Serviços e Exames | Anacli Laboratorial Feira de Santana',
  description: 'Conheça todos os serviços e exames oferecidos pelo Anacli Laboratorial. Análises clínicas, exames toxicológicos, check-ups, coleta domiciliar e muito mais.',
  keywords: [
    'exames laboratoriais Feira de Santana',
    'análises clínicas Bahia',
    'exames toxicológicos',
    'check-up médico',
    'coleta domiciliar',
    'hemograma',
    'glicemia',
    'colesterol',
    'exames de sangue'
  ],
  openGraph: {
    title: 'Serviços e Exames | Anacli Laboratorial',
    description: 'Conheça todos os serviços e exames oferecidos pelo Anacli Laboratorial em Feira de Santana - BA.',
    url: 'https://anacli.com.br/servicos',
  },
  alternates: {
    canonical: 'https://anacli.com.br/servicos'
  }
}

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ServicosHeroSection />
      <ServicosDestaquesSection />
      <ServicosExamesSection />
      <ServicosListSection />
      <ServicosCtaSection />
      <Footer />
    </main>
  );
}
