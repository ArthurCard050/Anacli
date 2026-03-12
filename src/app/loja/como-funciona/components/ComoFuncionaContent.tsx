'use client';

import { ShoppingCart, Calendar, FileText, CheckCircle, Clock, Shield, Smartphone, MapPin } from 'lucide-react';

export default function ComoFuncionaContent() {
  const steps = [
    {
      number: '01',
      icon: ShoppingCart,
      title: 'Escolha seus exames',
      description: 'Navegue pelo nosso catálogo e adicione os exames que precisa ao carrinho. Sem pedido médico necessário.',
      color: 'text-brand-accent',
      bgColor: 'bg-brand-accent/10'
    },
    {
      number: '02',
      icon: Calendar,
      title: 'Agende sua coleta',
      description: 'Escolha o melhor dia e horário para você. Atendimento em nossa unidade ou coleta domiciliar.',
      color: 'text-brand-accent',
      bgColor: 'bg-brand-accent/10'
    },
    {
      number: '03',
      icon: FileText,
      title: 'Realize seus exames',
      description: 'Compareça no horário agendado. Nossa equipe especializada garante um atendimento rápido e confortável.',
      color: 'text-brand-accent',
      bgColor: 'bg-brand-accent/10'
    },
    {
      number: '04',
      icon: CheckCircle,
      title: 'Receba seus resultados',
      description: 'Resultados disponíveis online em até 24h. Acesse de qualquer lugar pelo nosso portal.',
      color: 'text-brand-accent',
      bgColor: 'bg-brand-accent/10'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Resultados em 24h',
      description: 'Agilidade na entrega dos seus exames'
    },
    {
      icon: Shield,
      title: 'Certificação de Qualidade',
      description: 'Laboratório certificado e acreditado'
    },
    {
      icon: Smartphone,
      title: 'Acesso Online',
      description: 'Resultados disponíveis no portal'
    },
    {
      icon: MapPin,
      title: 'Coleta Domiciliar',
      description: 'Atendimento no conforto da sua casa'
    }
  ];

  return (
    <main className="pt-[120px] md:pt-32">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden bg-page">
        <div className="px-4 sm:px-6 lg:px-8 pt-4 md:pt-0 pb-0">
          <div className="lg:container lg:mx-auto">
            <div className="relative w-full h-48 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gray-200 relative" 
                style={{ 
                  backgroundImage: 'url(/assets/loja/como-funciona.png)', 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center', 
                  backgroundRepeat: 'no-repeat' 
                }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-8 md:py-20 bg-page">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="card-clean p-4 md:p-8 hover:shadow-card-hover-clean transition-all duration-300"
                >
                  <div className="flex items-start gap-3 md:gap-6">
                    <div className={`flex-shrink-0 w-10 h-10 md:w-16 md:h-16 rounded-small-clean ${step.bgColor} flex items-center justify-center`}>
                      <step.icon className={`h-5 w-5 md:h-8 md:w-8 ${step.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                        <span className="text-2xl md:text-4xl font-clean-bold text-gray-200">{step.number}</span>
                        <h3 className="text-base md:text-2xl font-clean-bold text-text-primary-clean">{step.title}</h3>
                      </div>
                      <p className="text-xs md:text-base text-text-secondary-clean font-clean-regular leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-clean-bold text-text-primary-clean mb-3 md:mb-4">
                Por que escolher a Anacli?
              </h2>
              <p className="text-sm md:text-lg text-text-secondary-clean font-clean-regular">
                Qualidade, agilidade e confiança em cada atendimento
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="card-clean p-4 md:p-6 text-center hover:shadow-card-hover-clean transition-all duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-brand-accent/10 mb-3 md:mb-4 group-hover:bg-brand-accent/20 transition-colors">
                    <benefit.icon className="h-6 w-6 md:h-8 md:w-8 text-brand-accent" />
                  </div>
                  <h3 className="text-sm md:text-lg font-clean-bold text-text-primary-clean mb-1 md:mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs md:text-sm text-text-secondary-clean font-clean-regular">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
