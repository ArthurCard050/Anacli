import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DicionarioClient from './DicionarioClient'

export const metadata: Metadata = {
  title: 'Dicionário de Exames Laboratoriais (Glossário) | Anacli',
  description: 'Entenda os termos e siglas comuns em laudos de exames de sangue (VCM, HCM, Leucócitos, TSH, PCR, HDL, LDL). Glossário didático para esclarecer suas dúvidas.',
  keywords: [
    'dicionario de exames',
    'glossario exames de sangue',
    'tradutor de siglas hemograma',
    'o que significa vcm',
    'leucocitos e plaquetas',
    'tsh e t4 livre significado'
  ],
  openGraph: {
    title: 'Dicionário de Exames Laboratoriais (Glossário) | Anacli',
    description: 'Explore nosso glossário simplificado de termos e siglas de exames de sangue. Sem termos difíceis ou jargões.',
    url: 'https://anacli.com.br/ferramentas/dicionario-exames',
  },
  alternates: {
    canonical: 'https://anacli.com.br/ferramentas/dicionario-exames'
  }
}

export default function DicionarioPage() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <main className="pt-28 pb-16">
        <DicionarioClient />
      </main>
      <Footer />
    </div>
  )
}
