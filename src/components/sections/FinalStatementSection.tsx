'use client';

import { motion } from "framer-motion";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { MapPin, Phone } from "lucide-react";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";

const FinalStatementSection = () => {
  return (
    <section className="relative py-20 bg-primary/5 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            <span className="text-gray-900">Excelência em análises clínicas</span>
            <br />
            <span className="text-accent">
              é a nossa tradição.
            </span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Pronto para cuidar da sua saúde?
          </h3>
          <p className="text-gray-600 mb-6">
            Entre em contato conosco e agende seus exames com a qualidade e confiança
            que você merece.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <HierarchicalButton
              hierarchy="primary"
              size="lg"
              icon={<Phone className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => window.open('https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Vim%20atrav%C3%A9s%20do%20site%20e%20desejo%20agendar%20um%20atendimento.', '_blank')}
            >
              Ligar Agora
            </HierarchicalButton>

            <HierarchicalButton
              hierarchy="tertiary"
              size="lg"
              icon={<MapPin className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Localização
            </HierarchicalButton>
          </div>
        </motion.div>

        {/* Brand Footer */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <OptimizedImage
              src="/assets/logo02.svg"
              alt="Anacli Laboratório"
              width={96}
              height={96}
              className="h-24 w-auto"
            />
          </div>
          <div className="text-sm text-gray-500 tracking-wider">
            Excelência em Análises Clínicas

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalStatementSection;
