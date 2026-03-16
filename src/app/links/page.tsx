import type { Metadata } from 'next';
import LinksPage from './LinksPage';

export const metadata: Metadata = {
  title: 'Anacli Laboratório - Links',
  description: 'Links rápidos do Laboratório Anacli - Resultados de exames, WhatsApp, site e localização.',
  robots: { index: false },
};

export default function Page() {
  return <LinksPage />;
}
