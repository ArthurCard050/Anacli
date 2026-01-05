'use client';

import { HelpCircle, Search, MessageCircle } from "lucide-react";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";

const FaqHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-gray-50 rounded-b-[20px] md:rounded-b-[40px] lg:rounded-b-[128px] border-b border-gray-200">
      {/* Background with glow effect */}
      <div className="absolute inset-0">
        {/* Simplified background - no animated effects for cleaner look */}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-40 sm:pt-36 lg:pt-40 pb-8 sm:pb-12 lg:pb-20 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-xs sm:text-sm">Perguntas Frequentes</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Tire suas{" "}
                <span className="text-accent">dúvidas</span>
                <br />
                sobre exames
              </h1>

              <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto" />

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Encontre respostas para as perguntas mais comuns sobre exames laboratoriais, 
                jejum, coleta de sangue e procedimentos do nosso laboratório.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <HierarchicalButton
                hierarchy="primary"
                size="lg"
                icon={<Search className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => document.getElementById('faq-content')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Buscar resposta
              </HierarchicalButton>
              <HierarchicalButton
                hierarchy="tertiary"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Tenho%20uma%20d%C3%BAvida%20sobre%20exames.', '_blank')}
              >
                Falar conosco
              </HierarchicalButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqHeroSection;