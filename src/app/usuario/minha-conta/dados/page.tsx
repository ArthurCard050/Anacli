import { Metadata } from 'next';
import MeusDadosContent from './MeusDadosContent';

export const metadata: Metadata = {
  title: 'Meus Dados - Anacli',
  description: 'Gerencie suas informações pessoais',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MeusDadosPage() {
  return <MeusDadosContent />;
}