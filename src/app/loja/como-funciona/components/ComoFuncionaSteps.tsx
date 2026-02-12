'use client';

import { ShoppingCart, Calendar, Home, FileText } from 'lucide-react';

export default function ComoFuncionaSteps() {
  const steps = [
    {
      number: '01',
      icon: ShoppingCart,
      title: 'Escolha seus Exames',
      description: 'Navegue pelo nosso catálogo e adicione os exames ou pacotes desejados ao carrinho. Você pode escolher exames individuais ou pacotes completos com desconto.',
    },
    {
      number: '02',
      icon: Calendar,
      title: 'Agende sua Coleta',
      description: 'Escolha o melhor dia e horário para realizar seus exames. Você pode ir até uma de nossas unidades ou solicitar coleta domiciliar gratuita.',
    },
    {
      number: '03',
      icon: Home,
      title: 'Realize os Exames',
      description: 'Nossa equipe especializada realiza a coleta com todo cuidado e segurança. O processo é rápido, confortável e seguindo todos os protocolos de qualidade.',
    },
    {
      number: '04',
      icon: FileText,
      title: 'Receba os Resultados',
      description: 'Seus resultados ficam disponíveis online em até 24h. Você recebe uma notificação e pode acessar de forma segura pelo nosso portal ou aplicativo.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector Line - Only show between steps */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-12 h-0.5 bg-gray-200 -ml-6" 
                         style={{ 
                           display: index % 2 === 0 ? 'block' : 'none' 
                         }} 
                    />
                  )}

                  <div className="flex gap-6">
                    {/* Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        {/* Number */}
                        <div className="text-6xl font-bold text-gray-100 leading-none mb-4">
                          {step.number}
                        </div>
                        {/* Icon */}
                        <div className="absolute top-0 left-0 w-16 h-16 bg-white border-2 border-primary rounded-xl flex items-center justify-center">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
