'use client';

import { Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export default function PacotesListSection() {
  const { addItem } = useCart();
  const [openModal, setOpenModal] = useState<string | null>(null);

  const packages = [
    {
      id: 'checkup-fitness-performance',
      name: 'Check-up Fitness PERFORMANCE',
      description: 'Pacote completo de exames laboratoriais preventivos',
      price: 117.00,
      originalPrice: 150.00,
      popular: true,
      image: '/assets/loja/fitness-performance.png',
      imageMobile: '/assets/loja/fitness-performance-mobile.png',
      exams: [
        'Hemograma completo',
        'Ferritina',
        'Glicose',
        'Hemoglobina glicada (HbA1c)',
        'Colesterol total',
        'HDL colesterol',
        'LDL colesterol',
        'Triglicerídeos',
        'Ureia',
        'Creatinina',
        'TGO (AST) • TGP (ALT)',
        'Bilirrubinas',
        'Sódio',
        'Potássio • Cálcio',
        'Creatina fosfoquinase (CPK)',
        'Ácido lático',
        'Proteínas totais e frações',
        'Ácido úrico',
        'TSH • Urina I / Sumário de urina',
      ]
    },
    {
      id: 'checkup-fitness-essencial',
      name: 'Check-up Fitness ESSENCIAL',
      description: 'Pacote essencial de exames laboratoriais preventivos',
      price: 97.00,
      originalPrice: 130.00,
      popular: false,
      image: '/assets/loja/fitness-essencial.png',
      imageMobile: '/assets/loja/fitness-essencial-mobile.png',
      exams: [
        'Hemograma completo',
        'Ferritina',
        'Glicose',
        'Hemoglobina glicada (HbA1c)',
        'Colesterol total',
        'HDL colesterol',
        'LDL colesterol',
        'Triglicerídeos',
        'Ureia',
        'Creatinina',
        'TGO (AST) • TGP (ALT)',
        'Sódio',
        'Potássio',
        'Ácido úrico',
        'TSH',
        'Urina tipo I / Sumário de urina',
      ]
    },
  ];

  const handleAddToCart = (pkg: typeof packages[0]) => {
    addItem(pkg.id, 'package');
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="relative py-8 md:py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,102,204,0.03),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(0,102,204,0.02),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-clean-bold text-text-primary-clean mb-3 md:mb-4">
            Pacotes Check-up Fitness
          </h1>
          <p className="text-sm md:text-lg text-text-secondary-clean max-w-2xl mx-auto font-clean-regular">
            Exames completos para quem busca performance e saúde. Resultados em até 24h.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto mb-8 md:mb-16">
          {packages.map((pkg) => {
            const discount = calculateDiscount(pkg.originalPrice, pkg.price);
            return (
              <div
                key={pkg.id}
                className="relative group"
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-brand-accent text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs font-clean-semibold shadow-lg">
                      MAIS POPULAR
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-0 bg-white rounded-xl md:rounded-2xl shadow-card-clean hover:shadow-card-hover-clean transition-all duration-300 overflow-hidden border border-border-clean">
                  {/* Image Section */}
                  <div className="w-full md:w-64 lg:w-80 flex-shrink-0 bg-gradient-to-br from-blue-50 to-white p-3 md:p-4 flex items-center justify-center">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="hidden md:block w-full h-auto object-contain rounded-xl"
                    />
                    <img
                      src={pkg.imageMobile}
                      alt={pkg.name}
                      className="md:hidden w-full max-w-[280px] h-auto object-contain mx-auto rounded-lg"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-4 md:p-8 flex flex-col">
                    {/* Title */}
                    <h3 className="text-base md:text-2xl font-clean-bold text-text-primary-clean mb-1 md:mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs md:text-sm text-text-secondary-clean mb-3 md:mb-4 font-clean-regular">
                      {pkg.description}
                    </p>

                    {/* Price Section */}
                    <div className="mb-3 md:mb-4">
                      <div className="flex items-baseline gap-1.5 md:gap-2 mb-1">
                        <span className="text-2xl md:text-4xl font-clean-bold text-text-primary-clean">
                          R$ {pkg.price.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-sm md:text-lg text-text-secondary-clean line-through font-clean-regular">
                          R$ {pkg.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1 md:gap-1.5 bg-accent/10 text-brand-accent px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                        <span className="text-xs font-clean-semibold">
                          Economize {discount}%
                        </span>
                      </div>
                    </div>

                    {/* Exams Info */}
                    <div className="mb-4 md:mb-6">
                      <div className="flex items-center gap-2 text-xs md:text-sm text-text-secondary-clean mb-2">
                        <Check className="h-3.5 md:h-4 w-3.5 md:w-4 text-brand-accent" />
                        <span className="font-clean-medium">{pkg.exams.length} exames inclusos</span>
                        <button
                          onClick={() => setOpenModal(pkg.id)}
                          className="ml-auto text-brand-accent hover:text-brand-accent/80 transition-colors font-clean-medium text-xs flex items-center gap-1"
                        >
                          <Info className="h-3.5 md:h-4 w-3.5 md:w-4" />
                          Ver exames
                        </button>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Button
                        onClick={() => handleAddToCart(pkg)}
                        className="w-full h-10 md:h-12 text-sm md:text-base font-clean-semibold bg-brand-accent hover:bg-brand-accent/90 text-white rounded-lg md:rounded-xl transition-all"
                      >
                        Adicionar ao Carrinho
                      </Button>
                    </div>

                    {/* Benefits */}
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border-clean">
                      <div className="flex items-center gap-1.5 md:gap-2 text-xs text-text-secondary-clean">
                        <Check className="h-3 md:h-3.5 w-3 md:w-3.5 text-brand-accent" />
                        <span className="font-clean-medium">Sem pedido médico</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs text-text-secondary-clean font-clean-regular">
            *Exames laboratoriais preventivos não substituem consulta médica.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="bg-white rounded-xl md:rounded-2xl border border-border-clean shadow-card-clean overflow-hidden max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Image Section */}
            <div className="w-20 md:w-48 flex-shrink-0 p-4 md:p-6">
              <img
                src="/assets/loja/atendimento.png"
                alt="Atendimento Anacli"
                className="w-full h-auto object-contain"
              />
            </div>
            
            {/* Content Section */}
            <div className="flex-1 px-4 pb-4 md:p-10 text-center md:text-left">
              <h3 className="text-base md:text-2xl font-clean-bold text-text-primary-clean mb-1.5 md:mb-3">
                Precisa de orientação?
              </h3>
              <p className="text-xs md:text-base text-text-secondary-clean mb-3 md:mb-6 font-clean-regular">
                Fale com nossos especialistas e tire suas dúvidas sobre os pacotes
              </p>
              <Button
                size="lg"
                className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white font-clean-semibold h-10 md:h-12 px-6 md:px-8 rounded-lg md:rounded-xl text-sm md:text-base"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20pacotes%20Fitness.', '_blank')}
              >
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Exames */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border-clean p-6 flex items-center justify-between">
              <h3 className="text-xl font-clean-bold text-text-primary-clean">
                {packages.find(p => p.id === openModal)?.name}
              </h3>
              <button
                onClick={() => setOpenModal(null)}
                className="text-text-secondary-clean hover:text-text-primary-clean transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm font-clean-semibold text-text-primary-clean mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-brand-accent" />
                {packages.find(p => p.id === openModal)?.exams.length} exames inclusos:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                {packages.find(p => p.id === openModal)?.exams.map((exam, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-text-secondary-clean">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 flex-shrink-0" />
                    <span className="font-clean-regular">{exam}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
