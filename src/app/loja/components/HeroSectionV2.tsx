'use client';

import { useState, useCallback } from 'react';
import { Upload, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockPackages } from '../data/mock-products';
import SocialProofTicker from './SocialProofTicker';
import SearchDropdown from './SearchDropdown';
import HeroBannerCarousel from './HeroBannerCarousel';
import { useCart } from '../context/CartContext';

export default function HeroSectionV2() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { addItem } = useCart();

  const featuredProducts = mockPackages.filter(pkg => pkg.featured).slice(0, 3);

  // Dropzone handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setUploadedFile(files[0]);
    }
  }, []);

  // Função placeholder para análise de IA (será implementada na próxima fase)
  const startAIAnalysis = () => {
    console.log('Iniciando análise de IA do arquivo:', uploadedFile?.name);
    // TODO: Implementar análise de IA na próxima fase
  };

  return (
    <section className="relative pt-40 md:pt-32 pb-8 md:pb-16 bg-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[60%_40%] gap-8 lg:gap-16 items-center">
          {/* Coluna Esquerda - Ação (60%) */}
          <div className="space-y-6 md:space-y-8">
            {/* Título com destaque */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Cuide da sua{' '}
                <span className="text-primary relative inline-block">
                  Saúde
                  <svg
                    className="absolute -bottom-1 md:-bottom-2 left-0 w-full"
                    height="12"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 10C50 5 150 5 198 10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                agora
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-light">
                Exames laboratoriais com resultados rápidos e confiáveis
              </p>
            </div>

            {/* Busca com Dropdown Inteligente */}
            <div className="space-y-3 md:space-y-4">
              <SearchDropdown />

              {/* Dropzone para Upload */}
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl md:rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer group ${
                  isDragging
                    ? 'border-accent bg-accent/5 scale-[1.02]'
                    : uploadedFile
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-accent hover:bg-accent/5'
                }`}
              >
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
                  {uploadedFile ? (
                    <>
                      <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm md:text-base">{uploadedFile.name}</p>
                        <p className="text-xs md:text-sm text-gray-600">Arquivo pronto para análise</p>
                      </div>
                      <Button
                        size="lg"
                        onClick={startAIAnalysis}
                        className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white rounded-xl transition-all h-12 md:h-auto"
                      >
                        <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                        Analisar com IA
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-base md:text-lg mb-1">
                          Envie sua receita médica
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">
                          Arraste e solte ou clique para selecionar
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                        <FileText className="h-3 w-3 md:h-4 md:w-4" />
                        <span>JPG, PNG ou PDF até 10MB</span>
                      </div>
                    </>
                  )}
                </div>

                {!uploadedFile && (
                  <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    <div className="flex items-center gap-1 bg-accent/10 text-accent px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold">
                      <Sparkles className="h-3 w-3" />
                      IA
                    </div>
                  </div>
                )}
              </div>

              <p className="text-xs md:text-sm text-center text-gray-500 flex items-center justify-center gap-2">
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-accent" />
                Nossa IA identifica os exames em segundos
              </p>
            </div>
          </div>

          {/* Coluna Direita - Visual (40%) */}
          <div className="relative mt-8 lg:mt-0">
            {/* Banner Carrossel */}
            <div className="mb-6">
              <HeroBannerCarousel />
            </div>

            {/* Pacotes em Destaque */}
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-200">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Pacotes em Destaque</h3>
                <div className="space-y-2 md:space-y-3">
                  {featuredProducts.map((product) => (
                    <Card
                      key={product.id}
                      onClick={() => addItem(product.id, 'package')}
                      className="group overflow-hidden border-gray-200 hover:border-primary transition-all cursor-pointer hover:-translate-y-1"
                    >
                      <div className="flex gap-2 md:gap-3 p-2 md:p-3">
                        <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden bg-primary/10">
                          {product.discount && (
                            <div className="absolute top-0.5 left-0.5 md:top-1 md:left-1 bg-accent text-white text-[8px] md:text-[10px] font-bold px-1 md:px-1.5 py-0.5 rounded">
                              {product.discount}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs md:text-sm text-gray-900 group-hover:text-primary transition-colors mb-0.5 md:mb-1 line-clamp-1">
                            {product.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              {product.originalPrice && (
                                <span className="text-[9px] md:text-[10px] text-gray-400 line-through">
                                  R$ {product.originalPrice.toFixed(2)}
                                </span>
                              )}
                              <span className="text-sm md:text-base font-bold text-primary">
                                R$ {product.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Social Proof Ticker - Posicionado fora do card de produtos */}
              <div className="mt-4 md:mt-6">
                <SocialProofTicker />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
