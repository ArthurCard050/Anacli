import type { Metadata } from 'next';
import LojaPageClient from './LojaPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Loja Anacli - Exames Laboratoriais Online',
  description: 'Compre seus exames laboratoriais online com praticidade e segurança. Resultados rápidos e confiáveis.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LojaPage() {
  return <LojaPageClient />;
}
