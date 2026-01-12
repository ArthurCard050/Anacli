'use client';

import { MessageCircle, Phone, MapPin } from "lucide-react";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";
import { useShouldAnimate } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";

const ServicosCtaSection = () => {
  const shouldAnimate = useShouldAnimate();

  const MotionWrapper = ({ children, className, ...motionProps }: any) => {
    if (shouldAnimate) {
      return <motion.div className={className} {...motionProps}>{children}</motion.div>;
    }
    return <div className={className}>{children}</div>;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-white to-accent/10">
      <div className="container mx-auto px-4 sm:px-6">
        <MotionWrapper
          className="max-w-4xl mx-auto text-center"
          initial={shouldAnimate ? { opacity: 0, y: 30 } : {}}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={shouldAnimate ? { duration: 0.8 } : {}}
          viewport={shouldAnimate ? { once: true } : {}}
        >
          {/* Main CTA Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Agende seu exame{" "}
              <span className="text-accent">agora mesmo</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para atendê-lo. Entre em contato pelo WhatsApp 
              para agendar seus exames ou tirar dúvidas sobre nossos serviços.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <HierarchicalButton
                hierarchy="primary"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Vim%20atrav%C3%A9s%20do%20site%20e%20desejo%20agendar%20um%20exame.', '_blank')}
              >
                Agendar pelo WhatsApp
              </HierarchicalButton>
              <HierarchicalButton
                hierarchy="secondary"
                size="lg"
                icon={<Phone className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => window.open('tel:+557530300030')}
              >
                Ligar: (75) 3030-0030
              </HierarchicalButton>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Localização</h4>
                <p className="text-sm text-gray-600">Feira de Santana - BA</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Horário</h4>
                <p className="text-sm text-gray-600">Seg a Sáb: 6h às 17h</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Qualidade</h4>
                <p className="text-sm text-gray-600">+50 anos de experiência</p>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default ServicosCtaSection;
