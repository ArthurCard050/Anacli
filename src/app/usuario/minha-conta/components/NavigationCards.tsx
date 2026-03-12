'use client';

import { useRouter } from 'next/navigation';
import { Package, User, MapPin, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NavigationCards() {
  const router = useRouter();
  const [pathname, setPathname] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setPathname(window.location.pathname);
  }, []);

  const menuItems = [
    {
      title: 'Meus Pedidos',
      description: 'Acompanhe seus pedidos e agendamentos',
      icon: Package,
      href: '/usuario/minha-conta/pedidos',
      color: 'text-gray-700',
      bgColor: 'bg-gray-100'
    },
    {
      title: 'Meus Dados',
      description: 'Gerencie suas informações pessoais',
      icon: User,
      href: '/usuario/minha-conta/dados',
      color: 'text-gray-700',
      bgColor: 'bg-gray-100'
    },
    {
      title: 'Endereços',
      description: 'Cadastre e edite seus endereços',
      icon: MapPin,
      href: '/usuario/minha-conta/enderecos',
      color: 'text-gray-700',
      bgColor: 'bg-gray-100'
    },
    {
      title: 'Alterar Senha',
      description: 'Atualize sua senha de acesso',
      icon: Lock,
      href: '/usuario/minha-conta/senha',
      color: 'text-gray-700',
      bgColor: 'bg-gray-100'
    }
  ];

  if (!isClient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className="bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all group cursor-pointer text-left w-full"
            >
              <div className="flex items-center gap-3 p-2 md:p-4">
                <div className={`p-2 rounded-lg ${item.bgColor} group-hover:scale-110 transition-transform flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold group-hover:text-primary transition-colors text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 hidden md:block">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`bg-white border rounded-lg hover:shadow-sm transition-all group cursor-pointer text-left w-full ${
              isActive 
                ? 'border-magenta-500 bg-magenta-50 ring-2 ring-magenta-500 ring-opacity-20' 
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 p-2 md:p-4">
              <div className={`p-2 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0 ${
                isActive 
                  ? 'bg-magenta-100 border border-magenta-300' 
                  : item.bgColor
              }`}>
                <Icon className={`h-5 w-5 ${
                  isActive ? 'text-magenta-600' : item.color
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-base font-semibold group-hover:text-primary transition-colors truncate ${
                  isActive ? 'text-magenta-600' : 'text-gray-900'
                }`}>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 hidden md:block">
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}