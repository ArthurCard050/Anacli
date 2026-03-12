import { Metadata } from 'next';
import DashboardContent from './DashboardContent';

export const metadata: Metadata = {
  title: 'Minha Conta - Anacli',
  description: 'Área do usuário - Gerencie seus exames, resultados e agendamentos',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return <DashboardContent />;
}
