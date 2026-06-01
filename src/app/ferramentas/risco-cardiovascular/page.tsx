import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FraminghamClient from './FraminghamClient'

export const metadata: Metadata = {
  title: 'Calculadora de Risco Cardiovascular (Escore de Framingham) | Anacli',
  description: 'Calcule a porcentagem de risco de infarto ou AVC em 10 anos pelo Escore de Framingham. Saiba como ler o Colesterol Total, HDL e pressão arterial no seu laudo de exames.',
  keywords: [
    'escore de framingham',
    'risco cardiovascular calculadora',
    'colesterol total e hdl',
    'pressao arterial sistolica',
    'prevencao infarto',
    'calculadora de saude do coracao'
  ],
  openGraph: {
    title: 'Calculadora de Risco Cardiovascular (Escore de Framingham) | Anacli',
    description: 'Estime a saúde do seu coração em 10 anos. Aprenda a identificar as taxas de colesterol e pressão no laudo Anacli.',
    url: 'https://anacli.com.br/ferramentas/risco-cardiovascular',
  },
  alternates: {
    canonical: 'https://anacli.com.br/ferramentas/risco-cardiovascular'
  }
}

export default function RiscoCardiovascularPage() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <main className="pt-28 pb-16">
        <FraminghamClient />
      </main>
      <Footer />
    </div>
  )
}
