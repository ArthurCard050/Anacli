import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GestacaoClient from './GestacaoClient'

export const metadata: Metadata = {
  title: 'Calculadora de Idade Gestacional e DPP | Anacli',
  description: 'Calcule com quantas semanas e dias de gravidez você está e descubra sua Data Provável do Parto (DPP). Veja a tabela de valores de referência de Beta-hCG Quantitativo.',
  keywords: [
    'calculadora de idade gestacional',
    'data provavel do parto dpp',
    'dum menstruacao',
    'beta hcg quantitativo valores',
    'semanas de gravidez',
    'exame de gravidez'
  ],
  openGraph: {
    title: 'Calculadora de Idade Gestacional e DPP | Anacli',
    description: 'Estime o tempo de sua gestação a partir da DUM ou confira a tabela de semanas por taxas de Beta-hCG do Anacli.',
    url: 'https://anacli.com.br/ferramentas/idade-gestacional',
  },
  alternates: {
    canonical: 'https://anacli.com.br/ferramentas/idade-gestacional'
  }
}

export default function GestacaoPage() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <main className="pt-28 pb-16">
        <GestacaoClient />
      </main>
      <Footer />
    </div>
  )
}
