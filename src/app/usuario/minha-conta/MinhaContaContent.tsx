'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Package, User, MapPin, Lock, ShoppingBag, FileText } from 'lucide-react';
import ShopHeader from '@/app/loja/components/ShopHeader';
import ShopFooter from '@/app/loja/components/ShopFooter';
import { CartProvider } from '@/app/loja/context/CartContext';

export default function MinhaContaContent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/usuario/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const menuItems = [
    {
      title: 'Meus Pedidos',
      description: 'Acompanhe seus pedidos e agendamentos',
      icon: Package,
      href: '/usuario/minha-conta/pedidos',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Meus Dados',
      description: 'Gerencie suas informações pessoais',
      icon: User,
      href: '/usuario/minha-conta/dados',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Endereços',
      description: 'Cadastre e edite seus endereços',
      icon: MapPin,
      href: '/usuario/minha-conta/enderecos',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Alterar Senha',
      description: 'Atualize sua senha de acesso',
      icon: Lock,
      href: '/usuario/minha-conta/senha',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-page flex flex-col">
        <ShopHeader />
        
        {/* Main Content */}
        <main className="flex-1 pt-24 md:pt-28 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary-clean mb-2">
                Minha Conta
              </h1>
              <p className="text-text-secondary-clean">
                Olá, {user.name}! Gerencie sua conta e acompanhe seus pedidos
              </p>
            </div>

            {/* Quick Actions - Agendar Exames */}
            <div className="card-clean mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <ShoppingBag className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary-clean mb-1">
                      Agendar Novos Exames
                    </h3>
                    <p className="text-sm text-text-secondary-clean">
                      Navegue por nosso catálogo completo e agende com facilidade
                    </p>
                  </div>
                </div>
                <a
                  href="/loja"
                  className="btn-primary-clean px-6 py-3 whitespace-nowrap"
                >
                  Ver Exames
                </a>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="card-clean hover:micro-shadow transition-all group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${item.bgColor} group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary-clean mb-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-text-secondary-clean">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-text-secondary-clean group-hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Links Rápidos */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              <a
                href="/loja/pacotes"
                className="card-clean-sm hover:micro-shadow transition-all text-center group cursor-pointer"
              >
                <Package className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-text-primary-clean">Pacotes</p>
              </a>
              <a
                href="/loja/ia-receituario"
                className="card-clean-sm hover:micro-shadow transition-all text-center group cursor-pointer"
              >
                <FileText className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-text-primary-clean">Enviar Receita</p>
              </a>
              <button className="card-clean-sm hover:micro-shadow transition-all text-center group cursor-pointer md:col-span-1 col-span-2">
                <User className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-text-primary-clean">Suporte</p>
              </button>
            </div>
          </div>
        </main>

        <ShopFooter />
      </div>
    </CartProvider>
  );
}
