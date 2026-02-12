'use client';

import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../../context/CartContext';

export default function PacotesListSection() {
  const { addItem } = useCart();

  const packages = [
    {
      id: 'checkup-basico',
      name: 'Check-up Básico',
      description: 'Ideal para acompanhamento preventivo básico',
      price: 199.90,
      originalPrice: 280.00,
      popular: false,
      exams: [
        'Hemograma Completo',
        'Glicemia em Jejum',
        'Colesterol Total e Frações',
        'Triglicerídeos',
        'Ureia e Creatinina',
        'TGO e TGP',
      ]
    },
    {
      id: 'checkup-completo',
      name: 'Check-up Completo',
      description: 'Avaliação completa da sua saúde',
      price: 399.90,
      originalPrice: 580.00,
      popular: true,
      exams: [
        'Todos os exames do Check-up Básico',
        'Hemoglobina Glicada',
        'TSH e T4 Livre',
        'Vitamina D',
        'Ácido Úrico',
        'PSA (Homens) ou CA 125 (Mulheres)',
        'Eletrocardiograma',
        'Ultrassom Abdominal',
      ]
    },
    {
      id: 'checkup-premium',
      name: 'Check-up Premium',
      description: 'Avaliação completa com exames avançados',
      price: 699.90,
      originalPrice: 1050.00,
      popular: false,
      exams: [
        'Todos os exames do Check-up Completo',
        'Perfil Lipídico Completo',
        'Marcadores Cardíacos',
        'Marcadores Tumorais',
        'Teste Ergométrico',
        'Ecocardiograma',
        'Ultrassom de Tireoide',
        'Densitometria Óssea',
        'Consulta com Clínico Geral',
      ]
    },
    {
      id: 'checkup-mulher',
      name: 'Check-up Mulher',
      description: 'Exames específicos para saúde feminina',
      price: 349.90,
      originalPrice: 520.00,
      popular: false,
      exams: [
        'Hemograma Completo',
        'Glicemia e Hemoglobina Glicada',
        'Perfil Lipídico',
        'TSH e T4 Livre',
        'Vitamina D',
        'CA 125 e CA 15-3',
        'Ultrassom Transvaginal',
        'Ultrassom de Mamas',
        'Papanicolau',
      ]
    },
    {
      id: 'checkup-homem',
      name: 'Check-up Homem',
      description: 'Exames específicos para saúde masculina',
      price: 329.90,
      originalPrice: 490.00,
      popular: false,
      exams: [
        'Hemograma Completo',
        'Glicemia e Hemoglobina Glicada',
        'Perfil Lipídico',
        'TSH e T4 Livre',
        'Vitamina D',
        'PSA Total e Livre',
        'Testosterona Total',
        'Ultrassom de Próstata',
        'Eletrocardiograma',
      ]
    },
    {
      id: 'checkup-senior',
      name: 'Check-up Sênior',
      description: 'Cuidado especial para a terceira idade',
      price: 449.90,
      originalPrice: 680.00,
      popular: false,
      exams: [
        'Hemograma Completo',
        'Glicemia e Hemoglobina Glicada',
        'Perfil Lipídico Completo',
        'Função Renal e Hepática',
        'TSH e T4 Livre',
        'Vitamina D e B12',
        'Eletrocardiograma',
        'Ecocardiograma',
        'Densitometria Óssea',
        'Ultrassom Abdominal',
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
            Escolha o Pacote Ideal
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Todos incluem coleta domiciliar gratuita e resultados online em até 24h
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {packages.map((pkg) => {
            const discount = calculateDiscount(pkg.originalPrice, pkg.price);
            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-xl border ${
                  pkg.popular ? 'border-accent shadow-lg' : 'border-gray-200'
                } p-8 hover:shadow-xl transition-all duration-300 group flex flex-col h-full`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-accent text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Mais Popular
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm">{pkg.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-gray-900">
                      R$ {pkg.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      R$ {pkg.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                      -{discount}%
                    </span>
                  </div>
                </div>

                {/* Exams List - Flex grow to push button to bottom */}
                <div className="mb-8 flex-grow">
                  <p className="text-sm font-semibold text-gray-900 mb-4">O que está incluso:</p>
                  <ul className="space-y-2.5">
                    {pkg.exams.slice(0, 6).map((exam, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{exam}</span>
                      </li>
                    ))}
                    {pkg.exams.length > 6 && (
                      <li className="text-sm text-gray-500 italic pl-6">
                        + {pkg.exams.length - 6} exames adicionais
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA Button - Always at bottom */}
                <div className="mt-auto">
                  <Button
                    onClick={() => handleAddToCart(pkg)}
                    className={`w-full ${
                      pkg.popular
                        ? 'bg-accent hover:bg-accent/90'
                        : 'bg-primary hover:bg-primary/90'
                    } text-white font-semibold h-12`}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-white rounded-xl border border-gray-200 p-10 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Precisa de um pacote personalizado?
          </h3>
          <p className="text-gray-600 mb-6">
            Entre em contato e monte um pacote sob medida para suas necessidades
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Gostaria%20de%20montar%20um%20pacote%20personalizado.', '_blank')}
          >
            Falar com Especialista
          </Button>
        </div>
      </div>
    </section>
  );
}
