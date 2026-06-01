import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConversorClient from './ConversorClient'

export const metadata: Metadata = {
  title: 'Conversor de Unidades de Exame de Sangue | Anacli',
  description: 'Converta facilmente valores de exames laboratoriais: Glicose (mg/dL para mmol/L), Colesterol e Creatinina. Entenda os fatores de conversão química e por que as unidades variam.',
  keywords: [
    'conversor de unidades exames',
    'glicose mg/dl para mmol/l',
    'colesterol mg/dl mmol/l',
    'creatinina mg/dl umol/l',
    'converter exames laboratoriais',
    'sistema internacional de unidades'
  ],
  openGraph: {
    title: 'Conversor de Unidades de Exame de Sangue | Anacli',
    description: 'Converta taxas de exames entre padrões nacional (mg/dL) e internacional (mmol/L ou µmol/L). Fácil, rápido e didático.',
    url: 'https://anacli.com.br/ferramentas/conversor-unidades',
  },
  alternates: {
    canonical: 'https://anacli.com.br/ferramentas/conversor-unidades'
  }
}

export default function ConversorPage() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <main className="pt-28 pb-16">
        <ConversorClient />
      </main>
      <Footer />
    </div>
  )
}
