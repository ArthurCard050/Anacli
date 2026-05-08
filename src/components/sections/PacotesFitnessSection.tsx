'use client';

import { useState } from 'react';
import { Check, MessageCircle, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// === CONFIGURAÇÃO ===
const WHATSAPP_NUMBER = '557530300030';

const packages = [
  {
    id: 'checkup-fitness-performance',
    name: 'Check-up Fitness',
    highlight: 'PERFORMANCE',
    description: 'Pacote completo de exames laboratoriais preventivos para quem busca alto desempenho.',
    price: 117.00,
    image: '/assets/loja/fitness-performance.png',
    imageMobile: '/assets/loja/fitness-performance-mobile.png',
    exams: [
      'Hemograma completo',
      'Ferritina',
      'Glicose',
      'Hemoglobina glicada (HbA1c)',
      'TSH',
      'Colesterol total',
      'HDL colesterol',
      'LDL colesterol',
      'Triglicerídeos',
      'Ureia',
      'Creatinina',
      'TGO (AST)',
      'TGP (ALT)',
      'Bilirrubinas',
      'Sódio',
      'Potássio',
      'Cálcio',
      'Creatina Fosfoquinase (CPK)',
      'Ácido lático',
      'Proteínas totais e frações',
      'Ácido úrico',
      'Urina Tipo I / Sumário de Urina',
    ],
    whatsappMsg: encodeURIComponent(
      'Olá! Vim pelo site da Anacli e tenho interesse no *Check-up Fitness PERFORMANCE* (R$ 117,00). Gostaria de mais informações e de agendar. Pode me ajudar?'
    ),
  },
  {
    id: 'checkup-fitness-essencial',
    name: 'Check-up Fitness',
    highlight: 'ESSENCIAL',
    description: 'Pacote essencial de exames laboratoriais preventivos, ideal para quem quer começar com consciência.',
    price: 97.00,
    image: '/assets/loja/fitness-essencial.png',
    imageMobile: '/assets/loja/fitness-essencial-mobile.png',
    exams: [
      'Hemograma completo',
      'Ferritina',
      'Glicose',
      'Hemoglobina glicada (HbA1c)',
      'TSH',
      'Colesterol total',
      'HDL colesterol',
      'LDL colesterol',
      'Triglicerídeos',
      'Ureia',
      'Creatinina',
      'TGO (AST)',
      'TGP (ALT)',
      'Sódio',
      'Potássio',
      'Ácido úrico',
      'Urina Tipo I / Sumário de Urina',
    ],
    whatsappMsg: encodeURIComponent(
      'Olá! Vim pelo site da Anacli e tenho interesse no *Check-up Fitness ESSENCIAL* (R$ 97,00). Gostaria de mais informações e de agendar. Pode me ajudar?'
    ),
  },
];

export default function PacotesFitnessSection() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const modalPkg = packages.find((p) => p.id === openModal);

  const handleWhatsApp = (pkg: typeof packages[0]) => {
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${pkg.whatsappMsg}`,
      '_blank'
    );
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gray-50">
      {/* Subtle background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/4 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-accent mb-4 leading-tight">
            Check-up Fitness
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Exames completos para quem cuida do corpo e quer entender o que se passa por dentro.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mb-10">
          {packages.map((pkg) => (
            <div key={pkg.id} className="group">
              <div className="relative flex flex-col md:flex-row h-full rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">

                {/* ── Package Image — mobile: topo / desktop: lateral esquerda ── */}
                <div className="relative bg-gradient-to-br from-gray-50 to-white flex-shrink-0
                  w-full h-52
                  md:w-56 md:h-auto">
                  {/* Mobile image (cima) */}
                  <div className="md:hidden relative w-full h-full">
                    <Image
                      src={pkg.imageMobile}
                      alt={`${pkg.name} ${pkg.highlight}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  {/* Desktop image (lado) */}
                  <div className="hidden md:block absolute inset-0">
                    <Image
                      src={pkg.image}
                      alt={`${pkg.name} ${pkg.highlight}`}
                      fill
                      className="object-cover object-center"
                      sizes="288px"
                    />
                  </div>
                </div>

                {/* Divisor mobile (horizontal) / desktop (vertical) */}
                <div className="md:hidden h-px w-full bg-gray-100" />
                <div className="hidden md:block w-px bg-gray-100 self-stretch" />

                <div className="flex flex-col flex-1 p-5 md:p-7">

                  {/* Name */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                      {pkg.name}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                      {pkg.highlight}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Price — destaque único */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Valor
                    </p>
                    <span className="text-4xl md:text-5xl font-extrabold text-gray-900">
                      R$ {pkg.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {/* Exam count + ver lista */}
                  <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <Check className="w-4 h-4 flex-shrink-0 text-accent" />
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                      {pkg.exams.length} exames inclusos
                    </span>
                    <button
                      onClick={() => setOpenModal(pkg.id)}
                      className="ml-auto flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/70 transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      Ver lista
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* CTA WhatsApp */}
                  <div className="mt-auto">
                    <button
                      onClick={() => handleWhatsApp(pkg)}
                      className="group/btn w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm bg-accent text-white hover:bg-accent/90 shadow-md shadow-accent/20 transition-all duration-200 active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Solicitar via WhatsApp
                    </button>
                  </div>

                  {/* Footer note */}
                  <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                    <Check className="w-3 h-3" />
                    Sem pedido médico necessário
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Disclaimer ── */}
        <p className="text-center text-xs text-gray-400 mt-2">
          *Exames laboratoriais preventivos não substituem consulta médica.
        </p>
      </div>

      {/* ── Modal de exames ── */}
      {openModal && modalPkg && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {modalPkg.name}
                </p>
                <h3 className="text-lg font-extrabold text-gray-900">
                  {modalPkg.highlight}
                </h3>
              </div>
              <button
                onClick={() => setOpenModal(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Exam list */}
            <div className="overflow-y-auto flex-1 p-6">
              <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                {modalPkg.exams.length} exames inclusos neste pacote:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {modalPkg.exams.map((exam, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {exam}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal footer CTA */}
            <div className="p-6 border-t border-gray-100 flex-shrink-0">
              <button
                onClick={() => {
                  setOpenModal(null);
                  handleWhatsApp(modalPkg);
                }}
                className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-accent/90 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Solicitar este pacote via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
