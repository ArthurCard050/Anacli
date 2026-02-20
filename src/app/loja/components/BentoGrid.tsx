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
    return (
      <div className="bg-white rounded-2xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <div className="flex-1">
            {pkg.discount && (
              <span className="inline-block bg-accent/10 text-accent text-xs md:text-sm font-semibold px-3 md:px-4 py-1 md:py-1.5 rounded-full mb-3 md:mb-4">
                {pkg.discount}
              </span>
            )}
            <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">{pkg.title}</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">{pkg.description}</p>
          </div>
        </div>
        {pkg.benefits && (
          <ul className="space-y-2 md:space-y-3 mb-5 md:mb-6 flex-grow">
            {pkg.benefits.slice(0, 4).map((b, i) => (
              <li key={i} className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-gray-700">
                <Check className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-0 mt-auto pt-4 md:pt-6 border-t border-gray-100">
          <div className="text-center md:text-left">
            {pkg.originalPrice && (
              <span className="text-sm md:text-base text-gray-400 line-through block mb-1 md:mb-2">
                R$ {pkg.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-3xl md:text-4xl font-bold text-primary">
              R$ {pkg.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Link href={`/loja/produto/${pkg.slug}`} className="flex-1 md:flex-none">
              <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 w-full md:w-auto text-sm md:text-base h-10 md:h-11">
                <Info className="h-4 w-4 md:h-5 md:w-5 mr-1.5" />
                Detalhes
              </Button>
            </Link>
            <Button 
              size="sm"
              onClick={() => handleAddItem(pkg.id, 'package')} 
              className={`rounded-xl px-4 md:px-5 h-9 md:h-10 font-semibold flex-1 md:flex-none text-xs md:text-sm ${
                isAdded 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-primary hover:bg-primary/90 text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  Adicionado
                </>
              ) : (
                <>
                  <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1" />
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
      <div className="bg-white rounded-2xl border border-gray-200 hover:border-primary transition-all duration-300 p-4 w-[200px] md:w-[220px] flex-shrink-0 flex flex-col h-[180px]">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-sm line-clamp-2 flex-1 pr-1">{exam.name}</h3>
          {(exam.popular || hasDiscount) && (
            <div className="flex flex-col gap-0.5 flex-shrink-0">
              {exam.popular && <span className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">Popular</span>}
              {hasDiscount && <span className="text-[8px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full font-medium">{Math.round(((exam.originalPrice! - exam.price) / exam.originalPrice!) * 100)}%</span>}
            </div>
          )}
        </div>
        <p className="text-[11px] text-gray-600 mb-2 line-clamp-1">{exam.shortDescription}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {exam.tags?.slice(0, 2).map((tag, i) => (
            <span key={i} className="inline-flex items-center gap-0.5 text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
              {tag.includes('Jejum') && <Clock className="h-2.5 w-2.5" />}
              {tag.includes('Resultado') && <Calendar className="h-2.5 w-2.5" />}
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-end justify-between mt-auto">
          <div>
            {hasDiscount && <span className="text-[9px] text-gray-400 line-through block">R$ {exam.originalPrice!.toFixed(2)}</span>}
            <span className="font-bold text-primary text-base">R$ {exam.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Link href={`/loja/produto/${exam.slug}`}>
              <Button size="sm" variant="outline" className="rounded-full w-7 h-7 p-0 border-gray-300"><Info className="h-3 w-3 text-gray-600" /></Button>
            </Link>
            <Button size="sm" onClick={() => handleAddItem(exam.id, 'exam')} className={`rounded-full w-7 h-7 p-0 ${isAdded ? 'bg-green-500' : 'bg-primary hover:bg-primary/90'}`}>
              {isAdded ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="vitrine" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">Nossos Exames e Pacotes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Escolha entre exames individuais ou pacotes completos com desconto</p>
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
            <h3 className="text-2xl font-bold text-gray-900">Exames Individuais</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => scrollCarousel('left')} className="rounded-full w-9 h-9 p-0 border-gray-300 hover:border-primary hover:text-primary">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => scrollCarousel('right')} className="rounded-full w-9 h-9 p-0 border-gray-300 hover:border-primary hover:text-primary">
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
            <Button variant="outline" size="lg" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white">
              Ver todos os exames
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
