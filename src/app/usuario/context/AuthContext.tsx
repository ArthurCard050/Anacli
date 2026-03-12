'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, RegisterData } from '../types';
import { mockApi } from '../data/mock-data';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'anacli-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Carregar usuário do localStorage
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const userData = JSON.parse(stored);
        setUser(userData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      // Sempre define loading como false após tentar carregar
      setIsLoading(false);
    }
  }, [isClient]);

  // Salvar usuário no localStorage
  useEffect(() => {
    if (!isClient) return;
    
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, isClient]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userData = await mockApi.login(email, password);
      if (userData) {
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser = await mockApi.register(userData);
      if (newUser) {
        setUser(newUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no registro:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    if (isClient) {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedUser = { ...user, ...userData, updatedAt: new Date().toISOString() };
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  // Se não estamos no cliente, retorna valores padrão
  if (typeof window === 'undefined') {
    return {
      user: null,
      isLoading: false, // Mudado para false para evitar loops
      isAuthenticated: false,
      login: async () => false,
      register: async () => false,
      logout: () => {},
      updateUser: async () => false,
    };
  }
  
  // Se o contexto não está disponível no cliente, também retorna valores padrão
  // Isso pode acontecer durante a hidratação
  if (!context) {
    return {
      user: null,
      isLoading: false, // Mudado para false para evitar loops
      isAuthenticated: false,
      login: async () => false,
      register: async () => false,
      logout: () => {},
      updateUser: async () => false,
    };
  }
  
  return context;
}