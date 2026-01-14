'use client';

import { Sparkles, Camera, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AIBanner() {
  return (
    <section className="py-8 bg-gradient-to-r from-accent/5 via-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent to-accent/90 p-8 md:p-12 shadow-xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">
                  Novidade no Anacli
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                Envie a foto da sua receita
              </h2>
              
              <p className="text-lg text-white/90 mb-6 md:mb-0">
                Nossa IA lê automaticamente e agenda seus exames em segundos
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-accent hover:bg-gray-50 font-semibold rounded-xl shadow-lg h-12 px-8"
              >
                <Camera className="mr-2 h-5 w-5" />
                Experimentar agora
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold rounded-xl h-12 px-8"
              >
                <Zap className="mr-2 h-5 w-5" />
                Saiba mais
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-3 text-white">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Leitura Inteligente</p>
                <p className="text-sm text-white/80">IA reconhece todos os exames</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-white">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Super Rápido</p>
                <p className="text-sm text-white/80">Processamento em segundos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-white">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Camera className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Fácil de Usar</p>
                <p className="text-sm text-white/80">Tire uma foto e pronto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
