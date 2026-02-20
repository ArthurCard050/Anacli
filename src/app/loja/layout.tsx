import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loja Anacli - Exames Laboratoriais Online',
  description: 'Compre seus exames laboratoriais online com praticidade e segurança. Resultados rápidos e confiáveis.',
};

export default function LojaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Mozilla+Text:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <div style={{ fontFamily: "'Mozilla Text', sans-serif" }}>
        {children}
      </div>
    </>
  );
}
