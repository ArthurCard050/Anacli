import ClientProvider from './ClientProvider';

export default function UsuarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      {children}
    </ClientProvider>
  );
}