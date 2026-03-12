'use client';

import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import { useEffect, useState } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>{children}</div>;
  }

  return (
    <CartProvider>
      {children}
      {/* CartDrawer global para todas as páginas da loja */}
      <CartDrawer />
    </CartProvider>
  );
}