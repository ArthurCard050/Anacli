import { Metadata } from 'next';
import EnderecosContent from './EnderecosContent';

export const metadata: Metadata = {
  title: 'Endereços - Anacli',
  description: 'Cadastre e edite seus endereços para coleta domiciliar',
  robots: {
    index: false,
    follow: false,
  },
};

export default function EnderecosPage() {
  return <EnderecosContent />;
}