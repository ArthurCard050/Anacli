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
  const FitnessPackageCard = ({ pkg }: { pkg: ExamPackage }) => {
    const isAdded = addedItems.has(pkg.id);
    const totalExams = pkg.exams?.length || 0;
    const displayedBenefits = 3; // Mostrar apenas 3 benefícios
    
    return (
      <div className="card-clean hover:micro-shadow transition-all duration-300 flex flex-col h-full">
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
        
        {/* Indicador de quantidade de exames */}
        <div className="mb-3 md:mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-clean-medium text-brand-accent bg-brand-accent/5 px-2.5 py-1 rounded-button-clean">
            <Check className="h-3.5 w-3.5" />
            {totalExams} exames inclusos
          </span>
        </div>
        
        {pkg.benefits && (
          <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-5 flex-grow">
            {pkg.benefits.slice(0, displayedBenefits).map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-text-primary-clean">
                <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-brand-accent mt-0.5 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
            {pkg.benefits.length > displayedBenefits && (
              <li className="text-xs text-text-secondary-clean pl-5 md:pl-6 italic">
                + {pkg.benefits.length - displayedBenefits} benefícios adicionais
              </li>
            )}
          </ul>
        )}
        
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
    );
  };

  // Card Compacto para Carrossel
  const CarouselExamCard = ({ exam }: { exam: Exam }) => {
    const isAdded = addedItems.has(exam.id);
    const hasDiscount = exam.originalPrice && exam.originalPrice > exam.price;
    return (
      <div className="card-clean-sm hover:micro-shadow transition-all duration-300 w-[200px] md:w-[220px] flex-shrink-0 flex flex-col h-[180px]">
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
            <FitnessPackageCard pkg={packages[0]} />
            <FitnessPackageCard pkg={packages[1]} />
          </div>
        )}

        {/* Carrossel de Exames */}
        <div className="relative">
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
          
          <div ref={carouselRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {exams.slice(0, 12).map((exam) => (
              <CarouselExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        </div>

        {/* Ver mais */}
        <div className="text-center mt-8 md:mt-12">
          <Link href="/loja/exames">
            <Button size="lg" className="btn-secondary-clean">
              Ver todos os exames
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
