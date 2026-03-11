'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Clock, Calendar, Plus, Check, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockExams, mockPackages } from '../data/mock-products';
import { useCart } from '../context/CartContext';
import type { Exam, ExamPackage } from '../types';

export default function BentoGrid() {
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ExamPackage | null>(null);
  const [serviceBannerModal, setServiceBannerModal] = useState<string | null>(null);
  const { addItem } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Usar todos os produtos sem filtro
  const exams = mockExams;
  const packages = mockPackages;

  const handleAddItem = (id: string, type: 'exam' | 'package') => {
    addItem(id, type);
    setAddedItems(prev => new Set(prev).add(id));
    setTimeout(() => {
      setAddedItems(prev => { const s = new Set(prev); s.delete(id); return s; });
    }, 2000);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  // Card de Pacote Fitness
  const FitnessPackageCard = ({ pkg, imageSrc, imageSrcMobile }: { pkg: ExamPackage; imageSrc: string; imageSrcMobile: string }) => {
    const isAdded = addedItems.has(pkg.id);
    const totalExams = pkg.exams?.length || 0;
    
    return (
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Imagem - aparece em cima no mobile, ao lado no desktop */}
        <div className="w-full h-48 md:w-48 md:h-full rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center">
          {/* Imagem mobile */}
          <img 
            src={imageSrcMobile} 
            alt={pkg.title}
            className="w-full h-full object-contain md:hidden"
          />
          {/* Imagem desktop */}
          <img 
            src={imageSrc} 
            alt={pkg.title}
            className="w-full h-full object-contain hidden md:block"
          />
        </div>

        {/* Card com informações */}
        <div className="card-clean hover:micro-shadow transition-all duration-300 flex flex-col h-full flex-1">
          <div className="flex items-start justify-between mb-3 md:mb-4">
            <div className="flex-1">
              {pkg.discount && (
                <span className="inline-block bg-brand-accent/10 text-brand-accent text-xs font-clean-semibold px-2.5 py-1 rounded-button-clean mb-2">
                  {pkg.discount}
                </span>
              )}
              <h3 className="text-lg md:text-xl font-clean-bold text-text-primary-clean mb-1.5 md:mb-2">{pkg.title}</h3>
              <p className="text-text-secondary-clean text-xs md:text-sm leading-relaxed">{pkg.description}</p>
            </div>
          </div>
          
          {/* Indicador de quantidade de exames com botão */}
          <div className="mb-3 md:mb-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-clean-medium text-brand-accent bg-brand-accent/5 px-2.5 py-1 rounded-button-clean">
              <Check className="h-3.5 w-3.5" />
              {totalExams} exames inclusos
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSelectedPackage(pkg);
                setModalOpen(true);
              }}
              className="text-xs text-brand-accent hover:text-brand-accent hover:bg-brand-accent/10 h-7 px-2 rounded-button-clean"
            >
              Ver exames
            </Button>
          </div>
          
          <div className="flex-grow mb-4" />
          
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-3 md:gap-0 mt-auto pt-3 md:pt-4 border-t border-border-clean">
            <div className="text-center md:text-left">
              {pkg.originalPrice && (
                <span className="text-xs md:text-sm text-text-secondary-clean line-through block mb-1">
                  R$ {pkg.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-2xl md:text-3xl font-clean-bold text-brand-accent">
                R$ {pkg.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Link href={`/loja/produto/${pkg.slug}`} className="flex-1 md:flex-none">
                <Button size="sm" variant="ghost" className="text-text-secondary-clean hover:text-text-primary-clean hover:bg-gray-100 active:bg-gray-200 w-full md:w-auto text-xs h-9 rounded-button-clean">
                  <Info className="h-4 w-4 mr-1.5" />
                  Detalhes
                </Button>
              </Link>
              <Button 
                size="sm"
                onClick={() => handleAddItem(pkg.id, 'package')} 
                className={`btn-primary-clean rounded-button-clean px-3 md:px-4 h-9 font-clean-semibold flex-1 md:flex-none text-xs ${
                  isAdded 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : ''
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Adicionado
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Adicionar
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="vitrine" className="py-12 md:py-20 bg-page">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-clean-bold text-text-primary-clean mb-3">Nossos Exames e Pacotes</h2>
          <p className="text-sm md:text-base text-text-secondary-clean">Escolha entre exames individuais ou pacotes completos com desconto</p>
        </div>

        {/* 2 Pacotes Fitness em Destaque */}
        {packages.length >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-16">
            <FitnessPackageCard 
              pkg={packages[0]} 
              imageSrc="/assets/loja/fitness-essencial.png"
              imageSrcMobile="/assets/loja/fitness-essencial-mobile.png"
            />
            <FitnessPackageCard 
              pkg={packages[1]} 
              imageSrc="/assets/loja/fitness-performance.png"
              imageSrcMobile="/assets/loja/fitness-performance-mobile.png"
            />
          </div>
        )}

        {/* Banners de Serviços */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 mb-12 md:mb-16">
          {/* Banner Doença Celíaca */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-100/50 rounded-2xl overflow-hidden border border-gray-200/50">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:hidden p-3">
                <img
                  src="/assets/servicos/doenca-celiaca.webp"
                  alt="Teste para Doença Celíaca"
                  className="w-20 h-20 mx-auto object-contain rounded-full"
                />
              </div>
              <div className="flex-1 p-3 md:p-6">
                <span className="text-[8px] md:text-xs font-clean-semibold text-amber-600 uppercase tracking-wider mb-1 md:mb-2 block">
                  Diagnóstico Especializado
                </span>
                <h3 className="text-sm md:text-lg lg:text-xl font-clean-bold text-text-primary-clean mb-2 md:mb-3">
                  <span className="md:hidden">Doença Celíaca</span>
                  <span className="hidden md:inline">Teste para Doença Celíaca</span>
                </h3>
                <p className="text-[10px] md:text-xs lg:text-sm text-text-secondary-clean mb-2 md:mb-4 leading-relaxed line-clamp-2 md:line-clamp-none">
                  Exames completos para diagnóstico da doença celíaca, incluindo anticorpos anti-transglutaminase, anti-endomísio e anti-gliadina.
                </p>
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <span className="text-lg md:text-2xl font-clean-bold text-brand-accent">
                    R$ 189,00
                  </span>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                  <Button
                    size="sm"
                    className="btn-primary-clean text-[10px] md:text-xs h-7 md:h-auto"
                    onClick={() => {
                      handleAddItem('doenca-celiaca', 'exam');
                    }}
                  >
                    <Plus className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1" />
                    Adicionar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-button-clean text-[10px] md:text-xs h-7 md:h-auto"
                    onClick={() => setServiceBannerModal('celiaca')}
                  >
                    <Info className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1" />
                    Saiba mais
                  </Button>
                </div>
              </div>
              <div className="hidden md:block w-40 md:w-48 flex-shrink-0 p-4">
                <img
                  src="/assets/servicos/doenca-celiaca.webp"
                  alt="Teste para Doença Celíaca"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Banner HPV Autocoleta */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-100/50 rounded-2xl overflow-hidden border border-gray-200/50">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:hidden p-3">
                <img
                  src="/assets/servicos/hpv-autocoleta.webp"
                  alt="HPV Autocoleta"
                  className="w-20 h-20 mx-auto object-contain rounded-full"
                />
              </div>
              <div className="flex-1 p-3 md:p-6">
                <span className="text-[8px] md:text-xs font-clean-semibold text-pink-600 uppercase tracking-wider mb-1 md:mb-2 block">
                  Praticidade e Privacidade
                </span>
                <h3 className="text-sm md:text-lg lg:text-xl font-clean-bold text-text-primary-clean mb-2 md:mb-3">
                  HPV Autocoleta
                </h3>
                <p className="text-[10px] md:text-xs lg:text-sm text-text-secondary-clean mb-2 md:mb-4 leading-relaxed line-clamp-2 md:line-clamp-none">
                  Realize o teste de HPV com total privacidade através da autocoleta. Um método simples, seguro e eficaz.
                </p>
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <span className="text-lg md:text-2xl font-clean-bold text-brand-accent">
                    R$ 149,00
                  </span>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                  <Button
                    size="sm"
                    className="btn-primary-clean text-[10px] md:text-xs h-7 md:h-auto"
                    onClick={() => {
                      handleAddItem('hpv-autocoleta', 'exam');
                    }}
                  >
                    <Plus className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1" />
                    Adicionar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-button-clean text-[10px] md:text-xs h-7 md:h-auto"
                    onClick={() => setServiceBannerModal('hpv')}
                  >
                    <Info className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1" />
                    Saiba mais
                  </Button>
                </div>
              </div>
              <div className="hidden md:block w-40 md:w-48 flex-shrink-0 p-4">
                <img
                  src="/assets/servicos/hpv-autocoleta.webp"
                  alt="HPV Autocoleta"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Carrossel de Exames */}
        <div className="relative -mr-4 sm:-mr-6 lg:-mr-[2rem]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-clean-bold text-text-primary-clean">Exames Individuais</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => scrollCarousel('left')} className="rounded-full w-9 h-9 p-0 border-border-clean hover:border-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => scrollCarousel('right')} className="rounded-full w-9 h-9 p-0 border-border-clean hover:border-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div ref={carouselRef} className="flex gap-4 overflow-x-auto pb-4 pl-4 sm:pl-6 lg:pl-8 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {exams.slice(0, 30).map((exam) => {
              const isAdded = addedItems.has(exam.id);
              const hasDiscount = exam.originalPrice && exam.originalPrice > exam.price;
              return (
                <div key={exam.id} className="card-clean-sm hover:micro-shadow transition-all duration-300 w-[200px] md:w-[220px] flex-shrink-0 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-clean-semibold text-text-primary-clean text-sm line-clamp-2 flex-1 pr-1">{exam.name}</h3>
                    {(exam.popular || hasDiscount) && (
                      <div className="flex flex-col gap-0.5 flex-shrink-0">
                        {exam.popular && <span className="text-[8px] bg-brand-accent/10 text-brand-accent px-1.5 py-0.5 rounded-button-clean font-clean-medium">Popular</span>}
                        {hasDiscount && <span className="text-[8px] bg-brand-accent/10 text-brand-accent px-1.5 py-0.5 rounded-button-clean font-clean-medium">{Math.round(((exam.originalPrice! - exam.price) / exam.originalPrice!) * 100)}%</span>}
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-text-secondary-clean mb-2 line-clamp-1">{exam.shortDescription}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {exam.tags?.slice(0, 2).map((tag, i) => (
                      <span key={i} className="inline-flex items-center gap-0.5 text-[9px] text-text-secondary-clean bg-gray-100 px-1.5 py-0.5 rounded-button-clean">
                        {tag.includes('Jejum') && <Clock className="h-2.5 w-2.5" />}
                        {tag.includes('Resultado') && <Calendar className="h-2.5 w-2.5" />}
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      {hasDiscount && <span className="text-[9px] text-text-secondary-clean line-through block">R$ {exam.originalPrice!.toFixed(2)}</span>}
                      <span className="font-clean-bold text-brand-accent text-base">R$ {exam.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link href={`/loja/produto/${exam.slug}`}>
                        <Button size="sm" variant="outline" className="rounded-full w-7 h-7 p-0 border-border-clean hover:border-brand-accent hover:bg-brand-accent/10"><Info className="h-3 w-3 text-text-secondary-clean" /></Button>
                      </Link>
                      <Button size="sm" onClick={() => handleAddItem(exam.id, 'exam')} className={`btn-primary-clean rounded-full w-7 h-7 p-0 ${isAdded ? 'bg-green-500 hover:bg-green-600' : ''}`}>
                        {isAdded ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ver mais */}
        <div className="text-center mt-8 md:mt-12">
          <Link href="/loja/exames">
            <Button size="lg" variant="outline" className="rounded-button-clean border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white">
              Ver todos os exames
            </Button>
          </Link>
        </div>
      </div>

      {/* Modal de Exames do Pacote */}
      {modalOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border-clean">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-clean-bold text-text-primary-clean mb-1">{selectedPackage.title}</h3>
                  <p className="text-sm text-text-secondary-clean">
                    {selectedPackage.exams?.length || 0} exames inclusos
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setModalOpen(false)}
                  className="rounded-full w-8 h-8 p-0"
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
              {selectedPackage.benefits && (
                <ul className="space-y-2">
                  {selectedPackage.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-primary-clean">
                      <Check className="h-4 w-4 text-brand-accent mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Serviços - Doença Celíaca */}
      {serviceBannerModal === 'celiaca' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setServiceBannerModal(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border-clean">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-clean-semibold text-amber-600 uppercase tracking-wider">
                    Diagnóstico Especializado
                  </span>
                  <h3 className="text-xl font-clean-bold text-text-primary-clean mt-1">Diagnóstico de Doença Celíaca</h3>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setServiceBannerModal(null)}
                  className="rounded-full w-8 h-8 p-0"
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
              <p className="text-gray-600 mb-6 leading-relaxed">
                A doença celíaca é uma condição autoimune que afeta o intestino delgado quando há ingestão de glúten. O diagnóstico precoce é fundamental para evitar complicações e melhorar a qualidade de vida.
              </p>
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">Benefícios:</h5>
                <ul className="space-y-2">
                  {[
                    'Painel completo de anticorpos específicos',
                    'Anti-transglutaminase IgA e IgG',
                    'Anti-endomísio (EMA)',
                    'Anti-gliadina deaminada',
                    'Dosagem de IgA total',
                    'Resultados em até 5 dias úteis'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-brand-accent mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">
                  Recomendamos que o paciente mantenha dieta com glúten por pelo menos 6 semanas antes da coleta para garantir a precisão dos resultados. Consulte seu médico para orientações específicas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Serviços - HPV Autocoleta */}
      {serviceBannerModal === 'hpv' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setServiceBannerModal(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border-clean">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-clean-semibold text-pink-600 uppercase tracking-wider">
                    Praticidade e Privacidade
                  </span>
                  <h3 className="text-xl font-clean-bold text-text-primary-clean mt-1">HPV Autocoleta</h3>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setServiceBannerModal(null)}
                  className="rounded-full w-8 h-8 p-0"
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
              <p className="text-gray-600 mb-6 leading-relaxed">
                O teste de HPV por autocoleta é uma alternativa moderna e confortável para a detecção do Papilomavírus Humano. A paciente realiza a coleta de forma autônoma, com orientação da nossa equipe, garantindo privacidade e conforto.
              </p>
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">Benefícios:</h5>
                <ul className="space-y-2">
                  {[
                    'Coleta realizada pela própria paciente',
                    'Maior privacidade e conforto',
                    'Mesma precisão da coleta tradicional',
                    'Detecção de HPV de alto risco oncogênico',
                    'Orientação completa da equipe',
                    'Resultado em até 7 dias úteis'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-brand-accent mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">
                  O teste detecta os tipos de HPV de alto risco associados ao câncer de colo de útero. É indicado para mulheres a partir de 25 anos como parte do rastreamento preventivo. Consulte seu médico sobre a frequência recomendada.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
