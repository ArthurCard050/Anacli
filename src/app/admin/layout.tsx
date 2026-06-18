'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import AdminSidebar from './components/AdminSidebar';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  // Login page — no sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-page" style={{ fontFamily: "'Mozilla Text', 'Plus Jakarta Sans', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Mozilla+Text:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <AdminSidebar />
      {/* Main content — offset by sidebar */}
      <main className="lg:ml-64 min-h-screen transition-all duration-300">
        <div className="p-4 pt-16 lg:pt-6 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}
