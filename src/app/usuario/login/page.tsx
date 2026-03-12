import { Metadata } from 'next';
import LoginPageContentSimple from './LoginPageContentSimple';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Login | Anacli - Área do Cliente',
  description: 'Acesse sua conta Anacli para visualizar exames, resultados e agendar novos procedimentos.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginPageContentSimple />;
}