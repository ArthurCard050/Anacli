'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MinhaContaRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para a página de pedidos
    router.replace('/usuario/minha-conta/pedidos');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-page">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}