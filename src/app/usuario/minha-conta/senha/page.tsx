import { Metadata } from 'next';
import AlterarSenhaContent from './AlterarSenhaContent';

export const metadata: Metadata = {
  title: 'Alterar Senha - Anacli',
  description: 'Atualize sua senha de acesso',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AlterarSenhaPage() {
  return <AlterarSenhaContent />;
}