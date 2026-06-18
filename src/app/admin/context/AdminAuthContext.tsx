'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AdminUser } from '../types';

interface AdminAuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'anacli-admin';

// Credenciais mock do admin
const ADMIN_CREDENTIALS = [
  { email: 'admin@anacli.com.br', password: 'admin123', user: { id: 'adm-1', name: 'Administrador', email: 'admin@anacli.com.br', role: 'admin' as const } },
  { email: 'gerente@anacli.com.br', password: 'gerente123', user: { id: 'adm-2', name: 'Gerente', email: 'gerente@anacli.com.br', role: 'manager' as const } },
];

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored) {
        setAdmin(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const match = ADMIN_CREDENTIALS.find(
      c => c.email === email && c.password === password
    );
    if (match) {
      setAdmin(match.user);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(match.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, isLoading, isAuthenticated: !!admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
