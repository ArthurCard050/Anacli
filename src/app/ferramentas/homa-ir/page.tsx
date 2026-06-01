import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomaClient from './HomaClient'

export const metadata: Metadata = {
  title: 'Calculadora HOMA-IR: Resistência à Insulina | Anacli',
  description: 'Calcule seu índice HOMA-IR online. Entenda o que é o HOMA-IR, onde encontrar a glicose e a insulina em seu laudo de exame de sangue e como funciona o cálculo.',
  keywords: [
    'calculadora homa-ir',
    'resistencia a insulina',
    'homa ir referencia',
    'glicose de jejum',
    'insulina de jejum',
    'diabetes',
    'exame de sangue homa'
  ],
  openGraph: {
    title: 'Calculadora HOMA-IR: Resistência à Insulina | Anacli',
    description: 'Calcule o índice de resistência à insulina HOMA-IR de forma rápida e segura. Saiba ler seu laudo de exame do Anacli.',
    url: 'https://anacli.com.br/ferramentas/homa-ir',
  },
  alternates: {
    canonical: 'https://anacli.com.br/ferramentas/homa-ir'
  }
}

export default function HomaPage() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <main className="pt-28 pb-16">
        <HomaClient />
      </main>
      <Footer />
    </div>
  )
}
