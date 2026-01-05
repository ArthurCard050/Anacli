import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutHeroSection from '@/components/sections/AboutHeroSection'
import AboutHistorySection from '@/components/sections/AboutHistorySection'
import AboutValuesSection from '@/components/sections/AboutValuesSection'
import AboutGallerySection from '@/components/sections/AboutGallerySection'

export const metadata: Metadata = {
  title: 'Sobre Nós - História e Valores | Anacli Laboratorial',
  description: 'Conheça a história de mais de 56 anos do Anacli Laboratorial em Feira de Santana - BA. Nossa missão, valores e compromisso com a excelência em análises clínicas.',
  keywords: [
    'história Anacli',
    'laboratório Feira de Santana história',
    'valores laboratório',
    'missão Anacli',
    'tradição análises clínicas',
    'laboratório familiar Bahia'
  ],
  openGraph: {
    title: 'Sobre Nós - História e Valores | Anacli Laboratorial',
    description: 'Conheça a história de mais de 56 anos do Anacli Laboratorial em Feira de Santana - BA.',
    url: 'https://anacli.com.br/sobre',
  },
  alternates: {
    canonical: 'https://anacli.com.br/sobre'
  }
}

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <AboutHeroSection />
      <AboutHistorySection />
      <AboutValuesSection />
      <AboutGallerySection />
      <Footer />
    </main>
  )
}