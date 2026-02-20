'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../../context/CartContext';

export default function PacotesListSection() {
  const { addItem } = useCart();

  const packages = [
    {
      id: 'checkup-fitness-performance',
      name: 'Check-up Fitness PERFORMANCE',
      description: 'Pacote completo de exames laboratoriais preventivos',
      price: 117.00,
      originalPrice: 150.00,
      popular: true,
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pacotes Check-up Fitness
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exames completos para quem busca performance e saúde. Resultados em até 24h.
          </p>
        </div>

        {/* Packages Grid - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {packages.map((pkg) => {
            const discount = calculateDiscount(pkg.originalPrice, pkg.price);
            return (
              <div
                key={pkg.id}
                className="relative bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="p-8 pb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                {/* Price Section */}
                <div className="px-8 pb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-5xl font-bold text-gray-900">
                      R$ {pkg.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      R$ {pkg.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold">
                      Economize {discount}%
                    </span>
                  </div>
                </div>

                {/* Exams List */}
                <div className="px-8 pb-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <p className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      {pkg.exams.length} exames inclusos:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5">
                      {pkg.exams.map((exam, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{exam}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="px-8 pb-8">
                  <Button
                    onClick={() => handleAddToCart(pkg)}
                    className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-white"
                  >
                    Adicionar ao Carrinho
                  </Button>
                </div>

                {/* Benefits Footer */}
                <div className="px-8 pb-8 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="font-medium">Sem pedido médico</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="text-center mb-12">
          <p className="text-xs text-gray-500">
            *Exames laboratoriais preventivos não substituem consulta médica.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-white rounded-2xl border-2 border-gray-200 p-10 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Precisa de orientação?
          </h3>
          <p className="text-gray-600 mb-6">
            Fale com nossos especialistas e tire suas dúvidas sobre os pacotes
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white font-semibold h-12 px-8"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20pacotes%20Fitness.', '_blank')}
          >
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
