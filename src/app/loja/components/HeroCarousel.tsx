'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShopHeader from './ShopHeader';

interface Slide {
  id: number;
  image: string;
  alt: string;
  link?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/assets/loja/12-meses.png", // Laboratório médico
    alt: "Banner promocional 1 - Laboratório",
    link: "#"
  },
  {
    id: 2,
    image: "/assets/loja/12-meses2.png", // Médico com estetoscópio
    alt: "Banner promocional 2 - Atendimento médico", 
    link: "#"
  },
  {
    id: 3,
    image: "/assets/loja/12-meses.png", // Sua imagem local
    alt: "Banner promocional 3 - Anacli",
    link: "#"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // 4 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Scroll detection for mobile cards
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = 192 + 16; // w-48 + gap-4
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentCardIndex(newIndex);
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Reativa auto-play após 8 segundos
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const nextSlide = useCallback(() => {
    const newIndex = (currentSlide + 1) % slides.length;
    console.log('Next slide:', newIndex); // Debug
    goToSlide(newIndex);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    console.log('Prev slide:', newIndex); // Debug
    goToSlide(newIndex);
  }, [currentSlide, goToSlide]);

  const scrollToCard = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    const cardWidth = 192 + 16; // w-48 + gap-4
    carousel.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <ShopHeader />
      
      {/* Hero Banner Carousel - Estilo Mercado Livre */}
      <section 
        className="relative w-full h-48 sm:h-56 lg:h-[700px] overflow-hidden bg-gray-50 mt-[88px] md:mt-20"
        onMouseEnter={() => {
          setIsAutoPlaying(false);
          setShowArrows(true);
        }}
        onMouseLeave={() => {
          setIsAutoPlaying(true);
          setShowArrows(false);
        }}
      >
        {/* Slides Container */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Imagem do banner - SEM gradient overlay no mobile, COM gradient no desktop */}
              <div 
                className="w-full h-full bg-gray-200 relative"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Gradient overlay apenas no desktop */}
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-b from-transparent from-40% via-gray-50/10 via-60% via-gray-50/30 via-75% to-gray-50 pointer-events-none z-10"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Estilo Mercado Livre */}
        <div className={`hidden lg:block transition-opacity duration-300 ${showArrows ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-md transition-all duration-200 hover:scale-105 z-40 border border-gray-200"
            aria-label="Banner anterior"
            style={{ top: '35%' }} // Posiciona na área da imagem, não dos cards
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-md transition-all duration-200 hover:scale-105 z-40 border border-gray-200"
            aria-label="Próximo banner"
            style={{ top: '35%' }} // Posiciona na área da imagem, não dos cards
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </Button>
        </div>

        {/* Mobile Arrows - Sempre visíveis no mobile */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
            aria-label="Banner anterior"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
            aria-label="Próximo banner"
          >
            <ChevronRight className="h-4 w-4 text-gray-700" />
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-50">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Ir para banner ${index + 1}`}
            />
          ))}
        </div>

        {/* Cards Desktop - Posicionados SOBRE o Hero (como estava antes) */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="grid grid-cols-5 gap-4 max-w-7xl mx-auto">
              
              {/* Card 1 - Pacote Check-up Básico */}
              <div className="bg-white rounded-xl border-2 border-accent p-5 hover:border-accent/80 transition-all duration-300 hover:-translate-y-1 relative flex flex-col h-[280px]">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">OFERTA</span>
                </div>
                <div className="text-center space-y-3 flex-1 flex flex-col">
                  <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden">
                    <img 
                      src="/assets/loja/hero/checkup-basico.webp" 
                      alt="Check-up Básico"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base font-bold text-accent">CHECK-UP BÁSICO</h3>
                  <div className="space-y-1 flex-1">
                    <p className="text-gray-400 text-xs line-through">R$ 280,00</p>
                    <p className="text-accent font-bold text-lg">R$ 199,00</p>
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-lg text-xs font-semibold h-9 mt-auto">
                    Comprar agora
                  </Button>
                </div>
              </div>

              {/* Card 2 - Pacote Check-up Completo */}
              <div className="bg-white rounded-xl border-2 border-primary p-5 hover:border-primary/80 transition-all duration-300 hover:-translate-y-1 relative flex flex-col h-[280px]">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">COMPLETO</span>
                </div>
                <div className="text-center space-y-3 flex-1 flex flex-col">
                  <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden">
                    <img 
                      src="/assets/loja/hero/checkup-completo.webp" 
                      alt="Check-up Completo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base font-bold text-primary">CHECK-UP COMPLETO</h3>
                  <div className="space-y-1 flex-1">
                    <p className="text-gray-400 text-xs line-through">R$ 450,00</p>
                    <p className="text-primary font-bold text-lg">R$ 329,00</p>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg text-xs font-semibold h-9 mt-auto">
                    Comprar agora
                  </Button>
                </div>
              </div>

              {/* Card 3 - Exames Rápidos */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col h-[280px]">
                <div className="text-center space-y-3 flex-1 flex flex-col">
                  <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden">
                    <img 
                      src="/assets/loja/hero/exames-rapidos.webp" 
                      alt="Exames Rápidos"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base font-bold text-primary">EXAMES RÁPIDOS</h3>
                  <div className="flex-1">
                    <p className="text-gray-600 text-xs">
                      Resultados em até 24 horas
                    </p>
                  </div>
                  <Button className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg text-xs font-semibold h-9 mt-auto">
                    Ver exames
                  </Button>
                </div>
              </div>

              {/* Card 4 - IA Leitura de Exames */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#FF006A]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col h-[280px] relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FF006A] text-white text-xs font-bold px-3 py-1 rounded-full">IA</span>
                </div>
                <div className="text-center space-y-3 flex-1 flex flex-col">
                  <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden">
                    <img 
                      src="/assets/loja/hero/ia.webp" 
                      alt="IA Leitura de Exames"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base font-bold text-[#FF006A]">LEITURA DE EXAMES</h3>
                  <div className="flex-1">
                    <p className="text-gray-600 text-xs">
                      Tecnologia avançada para análise precisa
                    </p>
                  </div>
                  <Button className="w-full bg-[#FF006A]/20 hover:bg-[#FF006A]/30 text-[#FF006A] border border-[#FF006A]/30 rounded-lg text-xs font-semibold h-9 mt-auto">
                    Saiba mais
                  </Button>
                </div>
              </div>

              {/* Card 5 - Coleta Domiciliar */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col h-[280px]">
                <div className="text-center space-y-3 flex-1 flex flex-col">
                  <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden">
                    <img 
                      src="/assets/loja/hero/coleta-domiciliar.webp" 
                      alt="Coleta Domiciliar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base font-bold text-primary">COLETA DOMICILIAR</h3>
                  <div className="flex-1">
                    <p className="text-gray-600 text-xs">
                      Na sua casa ou empresa
                    </p>
                  </div>
                  <Button className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg text-xs font-semibold h-9 mt-auto">
                    Agendar coleta
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section Mobile - Carrossel Horizontal (Estilo Mercado Livre) */}
      <section className="bg-white py-6 lg:hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Banner de Benefício - Estilo Mercado Livre */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 text-primary">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="font-semibold text-sm">Exames rápidos por ser sua primeira compra</span>
            </div>
          </div>

          {/* Cards Carousel Mobile - Horizontal Scroll */}
          <div className="relative">
            <div 
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              
              {/* Card 1 - Pacote Check-up Básico */}
              <div className="flex-shrink-0 w-48 bg-white rounded-xl border-2 border-accent p-4 snap-start relative flex flex-col h-[240px]">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">OFERTA</span>
                </div>
                <div className="text-center space-y-3 flex-1 flex flex-col">
                  <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden">
                    <img 
                      src="/assets/loja/hero/checkup-basico.webp" 
                      alt="Check-up Básico"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-accent text-sm">CHECK-UP BÁSICO</h3>
                  <div className="space-y-1 flex-1">
                    <p className="text-gray-400 text-xs line-through">R$ 280,00</p>
                    <p className="text-accent font-bold text-base">R$ 199,00</p>
                  </div>
                  <Button className="w-full bg-accent text-white rounded-lg text-xs font-semibold h-9 mt-auto">
                    Comprar agora
                  </Button>
                </div>
              </div>

              {/* Card 2 - Pacote Check-up Completo */}
              <div className="flex-shrink-0 w-48 bg-white rounded-xl border-2 border-primary p-4 snap-start relative flex flex-col h-[240px]">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">COMPLETO</span>
                </div>
                <div className="text-center space-y-3 flex-1 flex flex-col">
                  <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden">
                    <img 
                      src="/assets/loja/hero/checkup-completo.webp" 
                      alt="Check-up Completo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-primary text-sm">CHECK-UP COMPLETO</h3>
                  <div className="space-y-1 flex-1">
                    <p className="text-gray-400 text-xs line-through">R$ 450,00</p>
                    <p className="text-primary font-bold text-base">R$ 329,00</p>
                  </div>
                  <Button className="w-full bg-primary text-white rounded-lg text-xs font-semibold h-9 mt-auto">
                    Comprar agora
                  </Button>
                </div>
              </div>

              {/* Card 3 - Exames Rápidos */}
              <div className="flex-shrink-0 w-48 bg-white rounded-xl border border-gray-200 p-4 snap-start flex flex-col h-[240px]">
                <div className="text-center space-y-3 flex-1 flex flex-col">
                  <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden">
                    <img 
                      src="/assets/loja/hero/exames-rapidos.webp" 
                      alt="Exames Rápidos"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-primary text-sm">EXAMES RÁPIDOS</h3>
                  <div className="flex-1">
                    <p className="text-gray-600 text-xs">Resultados em até 24 horas</p>
                  </div>
                  <Button className="w-full bg-primary text-white rounded-lg text-xs font-semibold h-9 mt-auto">
                    Ver exames
                  </Button>
                </div>
              </div>

              {/* Card 4 - IA Leitura de Exames */}
              <div className="flex-shrink-0 w-48 bg-white rounded-xl border border-gray-200 p-4 snap-start flex flex-col h-[240px] relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FF006A] text-white text-xs font-bold px-2 py-1 rounded-full">IA</span>
                </div>
                <div className="text-center space-y-3 flex-1 flex flex-col">
                  <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden">
                    <img 
                      src="/assets/loja/hero/ia.webp" 
                      alt="IA Leitura de Exames"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-[#FF006A] text-sm">IA LEITURA DE EXAMES</h3>
                  <div className="flex-1">
                    <p className="text-gray-600 text-xs">Tecnologia avançada para análise precisa</p>
                  </div>
                  <Button className="w-full bg-[#FF006A] text-white rounded-lg text-xs font-semibold h-9 mt-auto">
                    Saiba mais
                  </Button>
                </div>
              </div>

              {/* Card 5 - Coleta Domiciliar */}
              <div className="flex-shrink-0 w-48 bg-white rounded-xl border border-gray-200 p-4 snap-start flex flex-col h-[240px]">
                <div className="text-center space-y-3 flex-1 flex flex-col">
                  <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden">
                    <img 
                      src="/assets/loja/hero/coleta-domiciliar.webp" 
                      alt="Coleta Domiciliar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-primary text-sm">COLETA DOMICILIAR</h3>
                  <div className="flex-1">
                    <p className="text-gray-600 text-xs">Na sua casa ou empresa</p>
                  </div>
                  <Button className="w-full bg-primary text-white rounded-lg text-xs font-semibold h-9 mt-auto">
                    Agendar coleta
                  </Button>
                </div>
              </div>

              {/* Card 6 - Pacotes Promocionais */}
              <div className="flex-shrink-0 w-48 bg-white rounded-xl border border-gray-200 p-4 snap-start flex flex-col h-[240px]">
                <div className="text-center space-y-3 flex-1 flex flex-col">
                  <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden">
                    <img 
                      src="/assets/loja/hero/checkup-basico.webp" 
                      alt="Pacotes Promocionais"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-primary text-sm">PACOTES PROMOCIONAIS</h3>
                  <div className="flex-1">
                    <p className="text-gray-600 text-xs">Economia de até 40%</p>
                  </div>
                  <Button className="w-full bg-primary text-white rounded-lg text-xs font-semibold h-9 mt-auto">
                    Ver pacotes
                  </Button>
                </div>
              </div>
            </div>

            {/* Interactive Scroll Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentCardIndex
                      ? 'bg-primary scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir para card ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}