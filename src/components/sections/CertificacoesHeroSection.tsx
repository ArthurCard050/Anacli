'use client';

import { Award } from "lucide-react";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";

const CertificacoesHeroSection = () => {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-gray-50 rounded-b-[20px] md:rounded-b-[40px] lg:rounded-b-[128px] border-b border-gray-200">
      {/* Background with glow effect */}
      <div className="absolute inset-0">
        {/* Simplified background - no animated effects for cleaner look */}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-40 pb-8 sm:pb-12 lg:pb-20 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-xs sm:text-sm">Certificações e Acreditações</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Qualidade{" "}
                <span className="text-accent">Comprovada:</span>
                <br />
                Nossas Certificações
              </h1>

              <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto" />

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Excelência técnica, segurança e cuidado humanizado reconhecidos 
                nacional e internacionalmente.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-6 flex justify-center">
              <HierarchicalButton
                hierarchy="primary"
                size="lg"
                icon={<Award className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => document.getElementById('certificacoes-content')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Conheça nossas certificações
              </HierarchicalButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificacoesHeroSection;