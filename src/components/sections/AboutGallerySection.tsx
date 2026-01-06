'use client';

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const AboutGallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Imagens da galeria
  const galleryImages = [
    {
      src: "/assets/unidade.avif",
      alt: "Fachada do Laboratório Anacli",
      title: "Fachada Principal"
    },
    {
      src: "/assets/estrutura/Recepcao.webp",
      alt: "Recepção do laboratório",
      title: "Recepção do laboratório"
    },
    {
      src: "/assets/estrutura/Recepcao-2.webp",
      alt: "Recepção do laboratório",
      title: "Recepção do laboratório"
    },
    {
      src: "/assets/estrutura/Sala de coleta.webp",
      alt: "Sala de coleta",
      title: "Sala de Coleta"
    },
    {
      src: "/assets/estrutura/Desjejum.webp",
      alt: "Sala de desjejum",
      title: "Sala de desjejum"
    },
    {
      src: "/assets/estrutura/Banheiro.webp",
      alt: "Toalete",
      title: "Toalete"
    }
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage !== null) {
        switch (event.key) {
          case 'Escape':
            closeModal();
            break;
          case 'ArrowLeft':
            prevImage();
            break;
          case 'ArrowRight':
            nextImage();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Conheça a nossa{" "}
            <span className="text-accent">estrutura!</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">
            Ambientes modernos, equipamentos de última geração e uma infraestrutura 
            pensada para oferecer o melhor atendimento e resultados precisos.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group cursor-pointer w-full"
              onClick={() => openModal(index)}
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 aspect-[4/3] shadow-md hover:shadow-xl transition-all duration-300">
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width={400}
                  height={300}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                
                {/* Title - Always visible on mobile, hover on desktop */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-semibold text-sm sm:text-base">{image.title}</h3>
                </div>

                {/* Hover Effect - Hidden on mobile */}
                <div className="hidden sm:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div 
              className="relative w-full max-w-4xl h-full max-h-[90vh] flex flex-col" 
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-colors"
                aria-label="Fechar galeria"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-colors"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-colors"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Container */}
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="relative w-full h-full flex items-center justify-center">
                  <OptimizedImage
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].alt}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    width={800}
                    height={600}
                  />
                </div>
              </div>

              {/* Image Info */}
              <div className="bg-black/50 backdrop-blur-sm p-4 text-center">
                <h3 className="text-white text-lg font-semibold mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <div className="text-white/70 text-sm">
                  {selectedImage + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Mobile Instructions */}
              <div className="sm:hidden absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-xs text-center bg-black/30 rounded-full px-3 py-1">
                Deslize para navegar
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutGallerySection;