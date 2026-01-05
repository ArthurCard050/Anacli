import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CertificacoesHeroSection from '@/components/sections/CertificacoesHeroSection';
import CertificacoesContentSection from '@/components/sections/CertificacoesContentSection';

export const metadata: Metadata = {
  title: 'Certificações - Laboratório Anacli | Qualidade Comprovada',
  description: 'Conheça nossas certificações ISO 9001, DICQ, PNCQ, GPTW e parcerias. Excelência técnica, segurança e cuidado humanizado reconhecidos nacional e internacionalmente.',
  keywords: 'certificações anacli, ISO 9001, DICQ, PNCQ, GPTW, qualidade laboratório, acreditação',
}

export default function CertificacoesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <CertificacoesHeroSection />
      <CertificacoesContentSection />
      <Footer />
    </main>
  );
}