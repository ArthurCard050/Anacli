'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShopHeader from './ShopHeader';
import { useCart } from '../context/CartContext';

interface Slide {
  id: number;
  image: string;
  mobileImage: string;
  alt: string;
}

interface ExamProperties {
  id: number,
  category: string,
  created_at: string,
  descricao_completa: string,
  longDescription: string,
  preco: number,
  preparationInfo: string,
  rotulo: string,
  shortDescription: string,
  slug: null,
  userId: string
}

interface Items{
  id: number,
  exam: ExamProperties,
  examId: number,
  order: number,
  packageId: number
}

interface ExamPackage {
  id: number,
  name: string,
  originalPrice: number,
  price: number,
  items: Items[]
}


const slides: Slide[] = [
  {
    id: 1,
    image: "/assets/loja/banner-coleta-domiciliar.png",
    mobileImage: "/assets/loja/banner-coleta-domiciliar-mobile.png",
    alt: "Coleta em casa ou no trabalho - Conforto e praticidade"
  },
  {
    id: 2,
    image: "/assets/loja/banner-checkup-completo.png",
    mobileImage: "/assets/loja/banner-checkup-completo-mobile.png",
    alt: "Check-up Completo - Cuide da sua saúde"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [examPackages, setExamPackages] = useState<ExamPackage[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { addPackageItems } = useCart();

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Buscar pacotes da API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoadingPackages(true);
        const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL || 'http://localhost:3001';
        
        const response = await fetch(`${apiUrl}/exam-packages`);
        
        if (!response.ok) {
          throw new Error('Erro ao buscar pacotes');
        }

        const data: ExamPackage[] = await response.json();
        
        // Pegar apenas os 2 primeiros pacotes
        console.log(data)
        setExamPackages(data.slice(0, 2));
      } catch (error) {
        console.error('Erro ao carregar pacotes:', error);
      } finally {
        setIsLoadingPackages(false);
      }
    };

    fetchPackages();
  }, []);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (!isClient || !isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    const carousel = carouselRef.current;
    if (!carousel) return;
    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = 160 + 12;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentCardIndex(newIndex);
    };
    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [isClient]);


  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const nextSlide = useCallback(() => {
    const newIndex = (currentSlide + 1) % slides.length;
    goToSlide(newIndex);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(newIndex);
  }, [currentSlide, goToSlide]);

  const scrollToCard = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardWidth = 160 + 12;
    carousel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  const handleAddPackageToCart = async (pkg: ExamPackage) => {
    if (!pkg.items || pkg.items.length === 0) {
      console.error('Pacote sem exames');
      return;
    }
    
    console.log('Pacote items:', pkg.items);
    
    try {
      setIsLoadingPackages(true)
      // Extrair IDs dos exames do pacote com verificações
      const ids: string[] = [];
      
      for (const item of pkg.items) {
        // Verificar se item e item.exam existem
        if (item && item.exam && item.exam.id) {
          ids.push(item.exam.id.toString());
        } else {
          console.warn('Item inválido encontrado:', item);
        }
      }
      
      if (ids.length === 0) {
        console.error('Nenhum exame válido encontrado no pacote');
        return;
      }
      
      console.log('IDs dos exames:', ids);
      await addPackageItems(ids);
    } catch (error) {
      console.error('Erro ao adicionar pacote ao carrinho:', error);
    }finally{
      setIsLoadingPackages(false)
    }
  };

  return (
    <>
      <ShopHeader />
      <section 
        className="relative w-full overflow-hidden bg-page mt-[120px] md:mt-20"
        onMouseEnter={() => { setIsAutoPlaying(false); setShowArrows(true); }}
        onMouseLeave={() => { setIsAutoPlaying(true); setShowArrows(false); }}
      >
        <div className="lg:h-[700px] h-auto">
          <div className="lg:hidden px-4 pt-4 pb-0">
            <div 
              className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {slides.map((slide, index) => (
                <div key={slide.id} className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-full h-full bg-gray-200 relative" style={{ backgroundImage: `url(${slide.mobileImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                </div>
              ))}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-50">
                {slides.map((_, index) => (
                  <button key={index} onClick={() => goToSlide(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125 shadow-lg' : 'bg-white/60 hover:bg-white/80'}`} aria-label={`Ir para banner ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>


          <div className="hidden lg:block relative w-full h-full">
            {slides.map((slide, index) => (
              <div key={slide.id} className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-full h-full bg-gray-200 relative" style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-page/10 via-60% via-page/30 via-75% to-page pointer-events-none z-10"></div>
                </div>
              </div>
            ))}
            <div className={`transition-opacity duration-300 ${showArrows ? 'opacity-100' : 'opacity-0'}`}>
              <Button variant="ghost" size="icon" onClick={prevSlide} className="absolute left-4 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-md transition-all duration-200 hover:scale-105 z-40 border border-gray-200" aria-label="Banner anterior" style={{ top: '35%' }}>
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon" onClick={nextSlide} className="absolute right-4 w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-md transition-all duration-200 hover:scale-105 z-40 border border-gray-200" aria-label="Próximo banner" style={{ top: '35%' }}>
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </Button>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-50">
              {slides.map((_, index) => (
                <button key={index} onClick={() => goToSlide(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125 shadow-lg' : 'bg-white/60 hover:bg-white/80'}`} aria-label={`Ir para banner ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>


        <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="grid grid-cols-5 gap-4 max-w-7xl mx-auto">
              {/* Pacotes da API */}
              {isLoadingPackages ? (
                <>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-center h-[240px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-center h-[240px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                </>
              ) : (
                examPackages.map((pkg, index) => (
                  <div key={pkg.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col h-[240px]">
                    <div className="mb-3 flex-1 flex flex-col items-center">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight text-center mb-3">
                        {pkg.name}
                      </h3>
                      <div className="w-20 h-20 mb-2">
                        <img 
                          src={index === 0 ? "/assets/loja/hero/checkup-basico.png" : "/assets/loja/hero/checkup-completo.png"} 
                          alt={pkg.name} 
                          className="w-20 h-20 object-contain" 
                        />
                      </div>
                    </div>
                    <div className="space-y-3 mt-auto">
                      <div className="flex items-center justify-center gap-2">
                        {pkg.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">
                            R$ {pkg.originalPrice.toFixed(2).replace('.', ',')}
                          </div>
                        )}
                        {pkg.price && (
                          <div className="text-lg font-bold text-gray-900">
                            R$ {pkg.price.toFixed(2).replace('.', ',')}
                          </div>
                        )}
                      </div>
                      <Button 
                        onClick={() => handleAddPackageToCart(pkg)}
                        className="w-full border border-gray-300 text-gray-900 bg-white hover:bg-accent hover:border-accent hover:text-white text-sm h-9 font-medium transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        ADICIONAR
                      </Button>
                    </div>
                  </div>
                ))
              )}
              
              {/* Cards estáticos restantes */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col h-[240px]">
                <div className="mb-3 flex-1 flex flex-col items-center">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight text-center mb-3">
                    Exames Rápidos
                  </h3>
                  <div className="w-20 h-20 mb-2">
                    <img src="/assets/loja/hero/exames-rapidos.png" alt="Exames Rápidos" className="w-20 h-20 object-contain" />
                  </div>
                  <p className="text-xs text-gray-600 text-center">Resultados em até 24 horas</p>
                </div>
                <div className="space-y-3 mt-auto">
                  <Button className="w-full border border-gray-300 text-gray-900 bg-white hover:bg-accent hover:border-accent hover:text-white text-sm h-9 font-medium transition-colors">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    VER EXAMES
                  </Button>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col h-[240px]">
                <div className="mb-3 flex-1 flex flex-col items-center">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight text-center mb-3">
                    Leitura de Exames
                  </h3>
                  <div className="w-20 h-20 mb-2">
                    <img src="/assets/loja/hero/ia.png" alt="IA Leitura de Exames" className="w-20 h-20 object-contain" />
                  </div>
                  <p className="text-xs text-gray-600 text-center">Tecnologia avançada para análise precisa</p>
                </div>
                <div className="space-y-3 mt-auto">
                  <Button className="w-full border border-gray-300 text-gray-900 bg-white hover:bg-accent hover:border-accent hover:text-white text-sm h-9 font-medium transition-colors">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    SAIBA MAIS
                  </Button>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col h-[240px]">
                <div className="mb-3 flex-1 flex flex-col items-center">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight text-center mb-3">
                    Coleta Domiciliar
                  </h3>
                  <div className="w-20 h-20 mb-2">
                    <img src="/assets/loja/hero/coleta-domiciliar.png" alt="Coleta Domiciliar" className="w-20 h-20 object-contain" />
                  </div>
                  <p className="text-xs text-gray-600 text-center">Na sua casa ou empresa</p>
                </div>
                <div className="space-y-3 mt-auto">
                  <Button className="w-full border border-gray-300 text-gray-900 bg-white hover:bg-accent hover:border-accent hover:text-white text-sm h-9 font-medium transition-colors">
                    <ArrowRight className="h-4 w-4 mr-1" />
                    AGENDAR COLETA
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-page py-4 lg:hidden">
        <div className="w-full pl-4">
          <div className="relative">
            <div ref={carouselRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Pacotes da API */}
              {isLoadingPackages ? (
                <>
                  <div className="flex-shrink-0 w-40 bg-white rounded-lg border border-gray-200 p-3 snap-start flex items-center justify-center h-[200px]">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                  <div className="flex-shrink-0 w-40 bg-white rounded-lg border border-gray-200 p-3 snap-start flex items-center justify-center h-[200px]">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                </>
              ) : (
                examPackages.map((pkg, index) => (
                  <div key={pkg.id} className="flex-shrink-0 w-40 bg-white rounded-lg border border-gray-200 p-3 snap-start flex flex-col h-[200px] hover:shadow-md transition-shadow">
                    <div className="mb-2 flex-1">
                      <div className="w-16 h-16 mx-auto mb-2">
                        <img 
                          src={index === 0 ? "/assets/loja/hero/checkup-basico.png" : "/assets/loja/hero/checkup-completo.png"} 
                          alt={pkg.name} 
                          className="w-16 h-16 object-contain" 
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-xs leading-tight text-center mb-1">
                        {pkg.name}
                      </h3>
                    </div>
                    <div className="space-y-2 mt-auto">
                      <div className="text-center">
                        {pkg.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">
                            R$ {pkg.originalPrice.toFixed(2).replace('.', ',')}
                          </div>
                        )}
                        {pkg.price && (
                          <div className="text-sm font-bold text-gray-900">
                            R$ {pkg.price.toFixed(2).replace('.', ',')}
                          </div>
                        )}
                      </div>
                      <Button 
                        onClick={() => handleAddPackageToCart(pkg)}
                        className="w-full border border-gray-300 text-gray-900 bg-white hover:bg-accent hover:border-accent hover:text-white text-xs h-8 font-medium transition-colors"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        ADICIONAR
                      </Button>
                    </div>
                  </div>
                ))
              )}
              
              {/* Cards estáticos restantes */}
              <div className="flex-shrink-0 w-40 bg-white rounded-lg border border-gray-200 p-3 snap-start flex flex-col h-[200px] hover:shadow-md transition-shadow">
                <div className="mb-2 flex-1">
                  <div className="w-16 h-16 mx-auto mb-2">
                    <img src="/assets/loja/hero/exames-rapidos.png" alt="Exames Rápidos" className="w-16 h-16 object-contain" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs leading-tight text-center mb-1">
                    Exames Rápidos
                  </h3>
                  <p className="text-xs text-gray-600 text-center">Resultados em 24h</p>
                </div>
                <div className="space-y-2 mt-auto">
                  <Button className="w-full border border-gray-300 text-gray-900 bg-white hover:bg-accent hover:border-accent hover:text-white text-xs h-8 font-medium transition-colors">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    VER EXAMES
                  </Button>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 bg-white rounded-lg border border-gray-200 p-3 snap-start flex flex-col h-[200px] hover:shadow-md transition-shadow">
                <div className="mb-2 flex-1">
                  <div className="w-16 h-16 mx-auto mb-2">
                    <img src="/assets/loja/hero/ia.png" alt="IA Leitura de Exames" className="w-16 h-16 object-contain" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs leading-tight text-center mb-1">
                    Leitura de Exames
                  </h3>
                  <p className="text-xs text-gray-600 text-center">Análise precisa</p>
                </div>
                <div className="space-y-2 mt-auto">
                  <Button className="w-full border border-gray-300 text-gray-900 bg-white hover:bg-accent hover:border-accent hover:text-white text-xs h-8 font-medium transition-colors">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    SAIBA MAIS
                  </Button>
                </div>
              </div>
              <div className="flex-shrink-0 w-40 bg-white rounded-lg border border-gray-200 p-3 snap-start flex flex-col h-[200px] mr-4 hover:shadow-md transition-shadow">
                <div className="mb-2 flex-1">
                  <div className="w-16 h-16 mx-auto mb-2">
                    <img src="/assets/loja/hero/coleta-domiciliar.png" alt="Coleta Domiciliar" className="w-16 h-16 object-contain" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs leading-tight text-center mb-1">
                    Coleta Domiciliar
                  </h3>
                  <p className="text-xs text-gray-600 text-center">Em casa ou empresa</p>
                </div>
                <div className="space-y-2 mt-auto">
                  <Button className="w-full border border-gray-300 text-gray-900 bg-white hover:bg-accent hover:border-accent hover:text-white text-xs h-8 font-medium transition-colors">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    AGENDAR
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-3 gap-1">
              {[0, 1, 2, 3, 4].map((index) => (
                <button key={index} onClick={() => scrollToCard(index)} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentCardIndex ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} aria-label={`Ir para card ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
