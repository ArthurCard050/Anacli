'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExamCard from './ExamCard';
import { mockExams } from '../data/mock-products';

export default function ExamsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });

    setTimeout(checkScroll, 300);
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da seção */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Exames Individuais
            </h2>
            <p className="text-lg text-gray-600">
              Escolha exames específicos para suas necessidades
            </p>
          </div>

          {/* Controles do carrossel - Desktop */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carrossel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {mockExams.map((exam) => (
              <div
                key={exam.id}
                className="flex-none w-[300px] snap-start"
              >
                <ExamCard exam={exam} />
              </div>
            ))}
          </div>

          {/* Gradientes nas bordas - Desktop */}
          {canScrollLeft && (
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          )}
          {canScrollRight && (
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
          )}
        </div>

        {/* Controles do carrossel - Mobile */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
