import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PreparoClient from './PreparoClient'

export const metadata: Metadata = {
  title: 'Guia de Preparo para Exames Laboratoriais | Anacli',
  description: 'Saiba como se preparar corretamente para exames de sangue, fezes e urina. Orientações sobre jejum, medicamentos, exercícios físicos e álcool antes da coleta.',
  keywords: [
    'guia de preparo exames',
    'preparo exame de sangue',
    'jejum recomendacoes',
    'exercicio fisico antes do exame',
    'biotina exames hormonio',
    'instrucoes de coleta de urina'
  ],
  openGraph: {
    title: 'Guia de Preparo para Exames Laboratoriais | Anacli',
    description: 'Acesse nosso guia prático de preparo e evite coletas repetidas. Saiba o que pode e o que não pode fazer antes dos exames.',
    url: 'https://anacli.com.br/ferramentas/guia-preparo',
  },
  alternates: {
    canonical: 'https://anacli.com.br/ferramentas/guia-preparo'
  }
}

export default function GuiaPreparoPage() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <main className="pt-28 pb-16">
        <PreparoClient />
      </main>
      <Footer />
    </div>
  )
}
