import ClientLayout from './ClientLayout';
import ClientProvider from '../usuario/ClientProvider';

export default function LojaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <link
        href="https://fonts.googleapis.com/css2?family=Mozilla+Text:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <div style={{ fontFamily: "'Mozilla Text', sans-serif" }}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </div>
    </ClientProvider>
  );
}
