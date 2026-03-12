import { Metadata } from 'next';
import MeusPedidosContent from './MeusPedidosContent';

export const metadata: Metadata = {
  title: 'Meus Pedidos - Anacli',
  description: 'Acompanhe seus pedidos e agendamentos de exames',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MeusPedidosPage() {
  return <MeusPedidosContent />;
}