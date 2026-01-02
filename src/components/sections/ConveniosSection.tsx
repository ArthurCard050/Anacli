'use client';

import { motion } from "framer-motion";
import Marquee from "@/components/ui/marquee";
import { CleanButton } from "@/components/ui/clean-button";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";
import { ArrowRight } from "lucide-react";

// Primeira fileira - vai da esquerda para direita
const conveniosFileira1 = [
  { name: "Amil", logo: "/assets/convenios/Amil.webp" },
  { name: "Hapvida", logo: "/assets/convenios/hapvida.webp" },
  { name: "Geap", logo: "/assets/convenios/Geap.webp" },
  { name: "Blue Med", logo: "/assets/convenios/Blue.webp" },
  { name: "Camed", logo: "/assets/convenios/Camed.webp" },
  { name: "Fusex", logo: "/assets/convenios/Fusex.webp" },
  { name: "Planserv", logo: "/assets/convenios/planserv.webp" },
  { name: "Saúde Caixa", logo: "/assets/convenios/SaudeCaixa.webp" },
  { name: "Sanitas", logo: "/assets/convenios/Sanitas.webp" },
  { name: "Promedica", logo: "/assets/convenios/Promedica.webp" },
];

// Segunda fileira - vai da direita para esquerda
const conveniosFileira2 = [
  { name: "Select", logo: "/assets/convenios/Select.webp" },
  { name: "Bem Estar Saúde", logo: "/assets/convenios/bemstar saude.webp" },
  { name: "Atitude Saúde", logo: "/assets/convenios/atitudesaude.webp" },
  { name: "Plan Assiste", logo: "/assets/convenios/plan assiste.webp" },
  { name: "Pro Social", logo: "/assets/convenios/pro social.webp" },
  { name: "Nordeste Saúde", logo: "/assets/convenios/NordesteSaudeEmpresarial.webp" },
  { name: "ArcelorMittal", logo: "/assets/convenios/arcelormittal.webp" },
  { name: "ASFEB", logo: "/assets/convenios/asfeb.webp" },
  { name: "FACEHSF", logo: "/assets/convenios/facehsf.webp" },
  { name: "Amex", logo: "/assets/convenios/Amex.webp" },
];

const ConveniosSection = () => {
  return (
    <section id="convenios" className="section-spacing bg-secondary/10">
      <div className="container mx-auto px-">
        <motion.div
          className="text-center mb-6 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Atendemos os
            <br />
            <span className="text-accent">
              principais convênios.
            </span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-accent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="-space-y-14">
          {/* Primeira fileira - Esquerda para Direita */}
          <div className="relative overflow-hidden" style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
          }}>
            {/* Enhanced gradient overlays for smooth fade effect - matching section background */}
            <div className="absolute left-0 top-0 z-10 h-full w-40 bg-white/0 pointer-events-none"></div>
            <div className="absolute right-0 top-0 z-10 h-full w-40 bg-white/0 pointer-events-none"></div>

            {/* Additional stronger fade layers */}
            <div className="absolute left-0 top-0 z-20 h-full w-24 bg-white/0 pointer-events-none"></div>
            <div className="absolute right-0 top-0 z-20 h-full w-24 bg-white/0 pointer-events-none"></div>

            {/* Outer edge strong fade */}
            <div className="absolute left-0 top-0 z-30 h-full w-12 bg-white/0 pointer-events-none"></div>
            <div className="absolute right-0 top-0 z-30 h-full w-12 bg-white/0 pointer-events-none"></div>

            <Marquee pauseOnHover className="[--duration:40s] py-6">
              {conveniosFileira1.map((convenio, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center mx-0 bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={convenio.logo}
                    alt={`Logo ${convenio.name}`}
                    className="h-12 sm:h-32 w-auto max-w-[80px] sm:max-w-[180px] object-contain transition-all duration-300 opacity-90 hover:opacity-100 hover:scale-105"
                    width={180}
                    height={128}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/120x24/E5E7EB/6B7280?text=${convenio.name.replace(' ', '+')}`;
                    }}
                  />
                </motion.div>
              ))}
            </Marquee>
          </div>

          {/* Segunda fileira - Direita para Esquerda */}
          <div className="relative overflow-hidden" style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
          }}>
            {/* Enhanced gradient overlays for smooth fade effect - matching section background */}
            <div className="absolute left-0 top-0 z-10 h-full w-40 bg-white/0 pointer-events-none"></div>
            <div className="absolute right-0 top-0 z-10 h-full w-40 bg-white/0 pointer-events-none"></div>

            {/* Additional stronger fade layers */}
            <div className="absolute left-0 top-0 z-20 h-full w-24 bg-white/0 pointer-events-none"></div>
            <div className="absolute right-0 top-0 z-20 h-full w-24 bg-white/0 pointer-events-none"></div>

            {/* Outer edge strong fade */}
            <div className="absolute left-0 top-0 z-30 h-full w-12 bg-white/0 pointer-events-none"></div>
            <div className="absolute right-0 top-0 z-30 h-full w-12 bg-white/0 pointer-events-none"></div>

            <Marquee pauseOnHover reverse className="[--duration:45s] py-12">
              {conveniosFileira2.map((convenio, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center mx-0 bg-white rounded-xl p-8 shadow-sm border border-gray-100"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={convenio.logo}
                    alt={`Logo ${convenio.name}`}
                    className="h-12 sm:h-32 w-auto max-w-[80px] sm:max-w-[180px] object-contain transition-all duration-300 opacity-90 hover:opacity-100 hover:scale-105"
                    width={180}
                    height={128}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/120x24/E5E7EB/6B7280?text=${convenio.name.replace(' ', '+')}`;
                    }}
                  />
                </motion.div>
              ))}
            </Marquee>
          </div>
        </div>

        <motion.div
          className="flex justify-center mt-0 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <HierarchicalButton
            hierarchy="tertiary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Ver todos os Convênios
          </HierarchicalButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ConveniosSection;
