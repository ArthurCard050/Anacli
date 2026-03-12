'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '../context/AuthContext';

export default function LoginPageContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirecionar se já estiver logado - com verificação mais segura
  useEffect(() => {
    // Aguarda um pouco para evitar redirecionamentos durante hidratação
    const timer = setTimeout(() => {
      if (!isLoading && isAuthenticated) {
        router.push('/usuario/dashboard');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/usuario/dashboard');
      } else {
        setError('Email ou senha incorretos. Tente novamente.');
      }
    } catch (error) {
      setError('Erro interno. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mostrar loading se ainda estiver verificando autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/assets/logo.svg"
            alt="Anacli"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Área do Cliente
          </h1>
          <p className="text-gray-600">
            Acesse sua conta para visualizar exames e resultados
          </p>
        </div>

        {/* Formulário de Login */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Botão de Login */}
            <Button
              type="submit"
              disabled={isSubmitting || !email || !password}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Entrar
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <a
                href="#"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Esqueceu sua senha?
              </a>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Não tem conta?</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/usuario/cadastro')}
              className="w-full h-12 border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-xl transition-all duration-200"
            >
              Criar conta gratuita
            </Button>
          </div>
        </div>

        {/* Dados para teste */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h3 className="font-medium text-yellow-800 mb-2">Dados para teste:</h3>
          <p className="text-sm text-yellow-700">
            <strong>Email:</strong> joao.silva@email.com<br />
            <strong>Senha:</strong> senha123
          </p>
        </div>
      </div>
    </div>
  );
}