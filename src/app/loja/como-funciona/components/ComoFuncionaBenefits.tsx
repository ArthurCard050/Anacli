'use client';

import { Clock, Shield, Smartphone, Truck, Award, HeadphonesIcon } from 'lucide-react';

export default function ComoFuncionaBenefits() {
  const benefits = [
    {
      icon: Clock,
      title: 'Resultados em 24h',
      description: 'Acesse seus resultados rapidamente pelo portal online',
    },
    {
      icon: Truck,
      title: 'Coleta Domiciliar',
      description: 'Atendimento gratuito no conforto da sua casa',
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Protocolos rigorosos de qualidade e biossegurança',
    },
    {
      icon: Smartphone,
      title: 'Acesso Digital',
      description: 'Resultados disponíveis online e no app',
    },
    {
      icon: Award,
      title: 'Certificações',
      description: 'Laboratório certificado e reconhecido',
    },
    {
      icon: HeadphonesIcon,
      title: 'Suporte Dedicado',
      description: 'Equipe pronta para te ajudar sempre que precisar',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que Escolher a Anacli?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mais de 56 anos de experiência cuidando da saúde dos nossos pacientes
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center group"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/5 rounded-xl mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
