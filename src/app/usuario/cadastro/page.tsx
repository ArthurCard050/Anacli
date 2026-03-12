import { Metadata } from 'next';
import CadastroPageContent from './CadastroPageContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cadastro | Anacli - Criar Conta',
  description: 'Crie sua conta Anacli e tenha acesso completo aos nossos serviços de exames laboratoriais.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CadastroPage() {
  return <CadastroPageContent />;
}