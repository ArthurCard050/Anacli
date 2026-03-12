'use client';

import { useRouter } from 'next/navigation';
import { SignUpPage, Testimonial } from '@/components/ui/sign-up';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { RegisterData } from '../types';

const testimonials: Testimonial[] = [
  {
    avatarSrc: "/assets/loja/depoimentos/deborah-franca.png",
    name: "Deborah Franca",
    handle: "@deborahfranca",
    text: "Excelente atendimento e profissionalismo!!"
  },
  {
    avatarSrc: "/assets/loja/depoimentos/barbara-miranda.png",
    name: "Barbara Miranda",
    handle: "@barbaramiranda",
    text: "Atendimento de qualidade. Pessoal da recepção muito ágil e atencioso."
  },
  {
    avatarSrc: "/assets/loja/depoimentos/anne-sa.png",
    name: "Anne Sa",
    handle: "@annesa",
    text: "Maravilhosa!!!! Super competente a equipe domiciliar, carinhosos e o melhor mega ágeis."
  },
];

export default function CadastroPageContent() {
  const [isClient, setIsClient] = useState(false);
  const { register, isAuthenticated, isLoading } = useAuth();
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

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const phone = formData.get('phone') as string;
    const terms = formData.get('terms') as string;

    // Validações
    if (!terms) {
      alert('Você deve aceitar os termos de uso para continuar.');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const registerData: RegisterData & { password: string } = {
      name,
      email,
      phone: phone || '',
      cpf: '',
      birthDate: '',
      password,
    };

    try {
      const success = await register(registerData);
      if (success) {
        router.push('/usuario/dashboard');
      } else {
        alert('Erro ao criar conta. Tente novamente.');
      }
    } catch (error) {
      alert('Erro interno. Tente novamente mais tarde.');
    }
  };

  const handleSignIn = () => {
    router.push('/usuario/login');
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
      <SignUpPage
        title={
          <span className="font-light text-foreground tracking-tighter">
            Junte-se à <span className="font-semibold text-primary">Anacli</span>
          </span>
        }
        description="Crie sua conta e tenha acesso completo aos nossos serviços de saúde"
        heroImageSrc="/assets/loja/login-gptw.png"
        testimonials={testimonials}
        onSignUp={handleSignUp}
        onSignIn={handleSignIn}
      />
    </div>
  );
}