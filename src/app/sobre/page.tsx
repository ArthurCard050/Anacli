import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutHeroSection from '@/components/sections/AboutHeroSection'
import AboutHistorySection from '@/components/sections/AboutHistorySection'
import AboutValuesSection from '@/components/sections/AboutValuesSection'
import AboutGallerySection from '@/components/sections/AboutGallerySection'

export const metadata: Metadata = {
  title: 'Sobre - Laboratório Anacli | 50+ Anos de Excelência',
  description: 'Conheça a história do Laboratório Anacli. Há mais de 50 anos oferecendo excelência em análises clínicas em Feira de Santana com ética, qualidade e respeito ao ser humano.',
  keywords: 'sobre anacli, história laboratório, feira de santana, análises clínicas, laboratório tradicional',
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