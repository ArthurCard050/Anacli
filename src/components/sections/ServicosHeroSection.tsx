'use client';

import { Microscope, Search, ArrowRight } from "lucide-react";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";

const ServicosHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-gray-50 rounded-b-[20px] md:rounded-b-[40px] lg:rounded-b-[128px] border-b border-gray-200">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-36 pb-8 sm:pb-12 lg:pb-16 min-h-[60vh] flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Microscope className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-xs sm:text-sm">Serviços e Exames</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Exames e serviços{" "}
                <span className="text-accent">completos</span>
                <br className="hidden sm:block" />
                {" "}para sua saúde
              </h1>

              <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto lg:mx-0" />

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Oferecemos uma ampla variedade de exames laboratoriais e serviços 
                especializados com tecnologia de ponta e resultados confiáveis.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <HierarchicalButton
                  hierarchy="primary"
                  size="lg"
                  icon={<Search className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={() => document.getElementById('exames')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver todos os exames
                </HierarchicalButton>
                <HierarchicalButton
                  hierarchy="tertiary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  onClick={() => window.open('https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Gostaria%20de%20agendar%20um%20exame.', '_blank')}
                >
                  Agendar exame
                </HierarchicalButton>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-2/5 flex-shrink-0">
            <div className="rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden bg-white p-4">
              <img
                src="/assets/servicos/hero-servicos.webp"
                alt="Serviços e exames laboratoriais Anacli"
                className="w-full h-auto max-h-[400px] object-contain rounded-xl"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicosHeroSection;
