import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Loja Anacli',
  description: 'Área restrita - Login para acesso à loja',
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

export default function LojaLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
