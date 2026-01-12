import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContatoHeroSection from '@/components/sections/ContatoHeroSection'
import ContatoInfoSection from '@/components/sections/ContatoInfoSection'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contato | Anacli Laboratorial Feira de Santana',
  description: 'Entre em contato com o Anacli Laboratorial. Telefone, WhatsApp, endereços das unidades e horários de funcionamento em Feira de Santana - BA.',
  keywords: [
    'contato Anacli',
    'telefone laboratório Feira de Santana',
    'endereço Anacli',
    'horário funcionamento laboratório',
    'WhatsApp Anacli',
    'unidades Anacli Feira de Santana'
  ],
  openGraph: {
    title: 'Contato | Anacli Laboratorial',
    description: 'Entre em contato com o Anacli Laboratorial em Feira de Santana - BA.',
    url: 'https://anacli.com.br/contato',
  },
  alternates: {
    canonical: 'https://anacli.com.br/contato'
  }
}

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ContatoHeroSection />
      <ContatoInfoSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
