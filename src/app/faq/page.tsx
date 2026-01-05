import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FaqHeroSection from '@/components/sections/FaqHeroSection';
import FaqContentSection from '@/components/sections/FaqContentSection';
import FaqContactSection from '@/components/sections/FaqContactSection';

export const metadata: Metadata = {
  title: 'FAQ - Laboratório Anacli | Perguntas Frequentes',
  description: 'Tire suas dúvidas sobre exames laboratoriais, jejum, coleta de sangue e procedimentos. Respostas às perguntas mais frequentes do Laboratório Anacli.',
  keywords: 'faq anacli, perguntas frequentes, exames sangue, jejum, coleta, laboratório dúvidas',
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <FaqHeroSection />
      <FaqContentSection />
      <FaqContactSection />
      <Footer />
    </main>
  );
}