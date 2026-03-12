'use client';

import { useRouter } from 'next/navigation';
import { SignInPage, Testimonial } from '@/components/ui/sign-in';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const testimonials: Testimonial[] = [
  {
    avatarSrc: "/assets/loja/depoimentos/hemilly-marques.png",
    name: "Hemilly Marques",
    handle: "@hemillymarques",
    text: "Amo que o cafezinho é em copo de papel"
  },
  {
    avatarSrc: "/assets/loja/depoimentos/paulo-junior.png",
    name: "Paulo Junior",
    handle: "@paulojunior",
    text: "Ótimo atendimento, as meninas são super educadas, rápido atendimento."
  },
  {
    avatarSrc: "/assets/loja/depoimentos/flavia-santos.png",
    name: "Flavia Santos",
    handle: "@flaviasantos",
    text: "Laboratório de excelência atendimento maravilhoso. Muito gentil e educada e prestativa"
  },
];

export default function LoginPageContentSimple() {
  const [isClient, setIsClient] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isClient && !isLoading && isAuthenticated) {
      router.push('/usuario/dashboard');
    }
  }, [isClient, isAuthenticated, isLoading, router]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/usuario/dashboard');
      } else {
        alert('Email ou senha incorretos. Tente novamente.');
      }
    } catch (error) {
      alert('Erro interno. Tente novamente mais tarde.');
    }
  };

  const handleResetPassword = () => {
    alert('Recuperação de senha em desenvolvimento');
  };

  const handleCreateAccount = () => {
    router.push('/usuario/cadastro');
  };

  // Mostrar loading se não estiver no cliente
  if (!isClient) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background overflow-hidden">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground h-screen w-screen overflow-hidden">
      <SignInPage
        title={
          <span className="font-light text-foreground tracking-tighter">
            Bem-vindo à <span className="font-semibold text-primary">Anacli</span>
          </span>
        }
        description="Acesse sua conta e continue sua jornada de cuidados com a saúde"
        heroImageSrc="/assets/loja/login-gptw.png"
        testimonials={testimonials}
        onSignIn={handleSignIn}
        onResetPassword={handleResetPassword}
        onCreateAccount={handleCreateAccount}
      />
    </div>
  );
}