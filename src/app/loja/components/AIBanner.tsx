'use client';

import { Camera, Zap, Brain, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AIBanner() {
  return (
    <section className="py-8 md:py-section-clean bg-page">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card Principal */}
        <div className="card-clean max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            
            {/* Conteúdo Textual */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-clean-bold text-text-primary-clean mb-3 md:mb-4">
                  Envie a foto da sua receita
                </h2>
                
                <p className="text-base md:text-lg text-text-secondary-clean mb-4 md:mb-6">
                  Nossa IA lê automaticamente e agenda seus exames em segundos
                </p>

                {/* Botão Principal */}
                <Link href="/loja/ia-receituario">
                  <Button className="btn-primary-clean h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-clean-semibold group">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="p-1.5 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                        <Camera className="h-4 w-4 md:h-5 md:w-5" />
                      </div>
                      <span>Experimentar agora</span>
                    </div>
                  </Button>
                </Link>
              </div>

              {/* Benefícios */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 pt-3 md:pt-4 border-t border-border-clean">
                <div className="flex items-center gap-2 text-text-secondary-clean">
                  <div className="p-1.5 md:p-2 bg-brand-accent/10 rounded-full">
                    <Brain className="h-3.5 w-3.5 md:h-4 md:w-4 text-brand-accent" />
                  </div>
                  <span className="text-xs md:text-sm font-clean-medium">Leitura Inteligente</span>
                </div>
                
                <div className="flex items-center gap-2 text-text-secondary-clean">
                  <div className="p-1.5 md:p-2 bg-brand-accent/10 rounded-full">
                    <Zap className="h-3.5 w-3.5 md:h-4 md:w-4 text-brand-accent" />
                  </div>
                  <span className="text-xs md:text-sm font-clean-medium">Super Rápido</span>
                </div>
                
                <div className="flex items-center gap-2 text-text-secondary-clean">
                  <div className="p-1.5 md:p-2 bg-brand-accent/10 rounded-full">
                    <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-brand-accent" />
                  </div>
                  <span className="text-xs md:text-sm font-clean-medium">Fácil de Usar</span>
                </div>
              </div>
            </div>

            {/* Vídeo */}
            <div className="relative h-[180px] lg:h-[280px] rounded-small-clean overflow-hidden bg-gray-100">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-105 md:scale-100"
                src="/assets/loja/Video-IA.mp4"
              >
                Seu navegador não suporta vídeos.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
