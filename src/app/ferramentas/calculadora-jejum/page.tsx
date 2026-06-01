import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JejumClient from './JejumClient'

export const metadata: Metadata = {
  title: 'Calculadora de Tempo de Jejum para Exames | Anacli',
  description: 'Calcule o horário exato da sua última refeição antes da coleta de exames laboratoriais de acordo com o tempo solicitado (12h, 8h ou 4h). Saiba o que é permitido ingerir.',
  keywords: [
    'calculadora de jejum exame',
    'tempo de jejum exames de sangue',
    'jejum de 12 horas horario',
    'beber agua em jejum exame',
    'preparo exames laboratorios'
  ],
  openGraph: {
    title: 'Calculadora de Tempo de Jejum para Exames | Anacli',
    description: 'Evite erros na coleta. Planeje o horário de início do seu jejum conforme seu agendamento no Anacli.',
    url: 'https://anacli.com.br/ferramentas/calculadora-jejum',
  },
  alternates: {
    canonical: 'https://anacli.com.br/ferramentas/calculadora-jejum'
  }
}

export default function CalculadoraJejumPage() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <main className="pt-28 pb-16">
        <JejumClient />
      </main>
      <Footer />
    </div>
  )
}
