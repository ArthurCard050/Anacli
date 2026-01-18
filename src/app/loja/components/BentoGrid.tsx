'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Clock, Calendar, Plus, Check, Info, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockExams, mockPackages, examCategories } from '../data/mock-products';
import { useCart } from '../context/CartContext';
import type { Exam, ExamPackage } from '../types';

type FilterCategory = 'todos' | 'check-up' | 'mulher' | 'homem' | 'vitaminas' | 'cardiaco' | 'diabetes' | 'tireoide';

export default function BentoGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('todos');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const { addItem } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);

  const getFilteredProducts = () => {
    let exams = [...mockExams];
    let packages = [...mockPackages];
    if (activeFilter !== 'todos') {
      if (activeFilter === 'mulher') {
        exams = exams.filter(e => e.tags?.some(t => t.toLowerCase().includes('mulher')));
        packages = packages.filter(p => p.slug.includes('mulher'));
      } else if (activeFilter === 'homem') {
        exams = exams.filter(e => e.tags?.some(t => t.toLowerCase().includes('homem')));
        packages = packages.filter(p => p.slug.includes('homem'));
      } else {
        exams = exams.filter(e => e.category === activeFilter);
        packages = packages.filter(p => p.slug.includes(activeFilter));
      }
    }
    return { exams, packages };
  };

  const { exams, packages } = getFilteredProducts();

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


  // Card Grande Destaque
  const FeaturedPackageCard = ({ pkg }: { pkg: ExamPackage }) => {
    const isAdded = addedItems.has(pkg.id);
    return (
      <div className="bg-primary/5 rounded-3xl border border-gray-200 hover:border-primary transition-all duration-300 p-5 md:p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent">Mais Vendido</span>
          </div>
          {pkg.discount && <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{pkg.discount}</span>}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
        {pkg.benefits && (
          <ul className="space-y-1 mb-4 flex-grow">
            {pkg.benefits.slice(0, 4).map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-700">
                <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />{b}
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-200">
          <div>
            {pkg.originalPrice && <span className="text-xs text-gray-400 line-through block">R$ {pkg.originalPrice.toFixed(2)}</span>}
            <span className="text-2xl font-bold text-primary">R$ {pkg.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/loja/produto/${pkg.slug}`}>
              <Button size="sm" variant="outline" className="rounded-full w-9 h-9 p-0 border-gray-300"><Info className="h-4 w-4 text-gray-600" /></Button>
            </Link>
            <Button size="sm" onClick={() => handleAddItem(pkg.id, 'package')} className={`rounded-xl h-9 px-3 text-xs ${isAdded ? 'bg-green-500' : 'bg-accent hover:bg-accent/90'}`}>
              {isAdded ? <><Check className="h-3.5 w-3.5 mr-1" />OK</> : <><Plus className="h-3.5 w-3.5 mr-1" />Adicionar</>}
            </Button>
          </div>
        </div>
      </div>
    );
  };


  // Card Médio para Pacotes
  const MediumPackageCard = ({ pkg }: { pkg: ExamPackage }) => {
    const isAdded = addedItems.has(pkg.id);
    return (
      <div className="bg-white rounded-2xl border border-gray-200 hover:border-primary transition-all duration-300 p-4 flex flex-col h-full min-h-[160px]">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-sm md:text-base line-clamp-2 flex-1 pr-2">{pkg.title}</h3>
          {pkg.discount && <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-full font-bold flex-shrink-0">{pkg.discount}</span>}
        </div>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-grow">{pkg.description}</p>
        <div className="flex items-end justify-between mt-auto">
          <div>
            {pkg.originalPrice && <span className="text-[10px] text-gray-400 line-through block">R$ {pkg.originalPrice.toFixed(2)}</span>}
            <span className="font-bold text-primary text-lg">R$ {pkg.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Link href={`/loja/produto/${pkg.slug}`}>
              <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0 border-gray-300"><Info className="h-3.5 w-3.5 text-gray-600" /></Button>
            </Link>
            <Button size="sm" onClick={() => handleAddItem(pkg.id, 'package')} className={`rounded-xl text-[10px] h-8 px-2.5 ${isAdded ? 'bg-green-500' : 'bg-accent hover:bg-accent/90'}`}>
              {isAdded ? <><Check className="h-3 w-3 mr-0.5" />OK</> : <><Plus className="h-3 w-3 mr-0.5" />Adicionar</>}
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
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossos Exames e Pacotes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Escolha entre exames individuais ou pacotes completos com desconto</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {examCategories.slice(0, 6).map((category) => (
            <button key={category.value} onClick={() => setActiveFilter(category.value as FilterCategory)}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.value ? 'bg-primary text-white scale-105' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}>{category.label}</button>
          ))}
        </div>

        {/* 3 Pacotes Fixos */}
        {packages.length >= 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
            {/* Card Grande */}
            <div className="lg:row-span-2">
              <FeaturedPackageCard pkg={packages[0]} />
            </div>
            {/* 2 Cards Médios empilhados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <MediumPackageCard pkg={packages[1]} />
              <MediumPackageCard pkg={packages[2]} />
            </div>
          </div>
        )}

        {/* Carrossel de Exames */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Exames Individuais</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => scrollCarousel('left')} className="rounded-full w-9 h-9 p-0 border-gray-300">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => scrollCarousel('right')} className="rounded-full w-9 h-9 p-0 border-gray-300">
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
          <Button variant="outline" size="lg" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white">
            Ver todos os exames
          </Button>
        </div>
      </div>
    </section>
  );
}
