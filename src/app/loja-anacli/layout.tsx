import type { Metadata } from 'next';

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

export default function LojaAnacliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
