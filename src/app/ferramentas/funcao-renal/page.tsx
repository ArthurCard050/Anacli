import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RenalClient from './RenalClient'

export const metadata: Metadata = {
  title: 'Calculadora de Função Renal (TFG / GFR) | Anacli',
  description: 'Calcule sua Taxa de Filtração Glomerular (TFG) online utilizando a fórmula CKD-EPI (2021) sem componente de raça. Entenda onde encontrar o valor de Creatinina no seu exame de sangue.',
  keywords: [
    'calculadora de funcao renal',
    'calculadora tfg ckd-epi',
    'taxa de filtracao glomerular',
    'creatinina serica',
    'saude dos rins',
    'doenca renal cronica'
  ],
  openGraph: {
    title: 'Calculadora de Função Renal (TFG / GFR) | Anacli',
    description: 'Estime o funcionamento dos seus rins com a moderna fórmula CKD-EPI. Saiba onde encontrar os dados no seu laudo de exame do Anacli.',
    url: 'https://anacli.com.br/ferramentas/funcao-renal',
  },
  alternates: {
    canonical: 'https://anacli.com.br/ferramentas/funcao-renal'
  }
}

export default function RenalPage() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <main className="pt-28 pb-16">
        <RenalClient />
      </main>
      <Footer />
    </div>
  )
}
