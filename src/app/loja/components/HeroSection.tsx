'use client';

import { useState } from 'react';
import { Search, Upload, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockPackages } from '../data/mock-products';

export default function HeroSection() {
  const [examSearch, setExamSearch] = useState('');

  // Pega os 3 primeiros pacotes em destaque
  const featuredProducts = mockPackages.filter(pkg => pkg.featured).slice(0, 3);

  return (
    <section className="pt-20 md:pt-24 pb-12 md:pb-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Coluna Esquerda - Ação */}
          <div className="space-y-8 md:space-y-10">
            {/* Título Principal */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Realize seu
                <span className="block text-primary">exame</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600">
                Rápido, fácil e com resultados confiáveis
              </p>
            </div>

            {/* Busca de Exames */}
            <div className="space-y-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Digite o nome do exame..."
                  value={examSearch}
                  onChange={(e) => setExamSearch(e.target.value)}
                  className="pl-14 pr-4 h-16 text-lg rounded-xl border-gray-200 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              {/* CTA Principal - Upload de Receituário */}
              <a href="/loja/ia-receituario">
                <Button
                  size="lg"
                  className="w-full h-16 text-lg font-semibold rounded-xl bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Upload className="mr-2 h-6 w-6" />
                  Envie seu receituário
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </a>

              <p className="text-base text-center text-gray-500 flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Leitura via IA em segundos
              </p>
            </div>

            {/* Badges de Confiança */}
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center gap-3 text-base text-gray-600">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">Resultados em 24h</span>
              </div>
              <div className="flex items-center gap-3 text-base text-gray-600">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">Certificado ISO</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Vitrine de Produtos */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pacotes em Destaque
            </h2>
            <div className="grid gap-4">
              {featuredProducts.map((product) => {
                // Mapeia o ID do produto para a imagem correspondente
                const imageMap: Record<string, string> = {
                  'checkup-fitness-essencial': '/assets/loja/fitness-essencial.png',
                  'checkup-fitness-performance': '/assets/loja/fitness-performance.png',
                };
                const productImage = imageMap[product.id];

                return (
                  <div key={product.id} className="flex gap-4">
                    {/* Card com informações */}
                    <Card className="group flex-1 border-gray-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer">
                      <div className="p-6">
                        {product.discount && (
                          <div className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                            {product.discount}
                          </div>
                        )}
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors mb-2">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            {product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                R$ {product.originalPrice.toFixed(2)}
                              </span>
                            )}
                            <span className="text-xl font-bold text-primary">
                              R$ {product.price.toFixed(2)}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                          >
                            Ver mais
                          </Button>
                        </div>
                      </div>
                    </Card>

                    {/* Card com imagem */}
                    {productImage && (
                      <Card className="w-40 h-40 border-gray-200 flex items-center justify-center p-4 bg-white">
                        <img
                          src={productImage}
                          alt={product.title}
                          className="w-full h-full object-contain"
                        />
                      </Card>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
