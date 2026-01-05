'use client';

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useShouldAnimate } from "@/hooks/useReducedMotion";

const ConveniosHeroSection = () => {
  const shouldAnimate = useShouldAnimate();

  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-gray-50 rounded-b-[20px] md:rounded-b-[40px] lg:rounded-b-[128px] border-b border-gray-200">
      {/* Background with glow effect */}
      <div className="absolute inset-0">
        {/* Simplified background - no animated effects for cleaner look */}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-40 sm:pt-36 lg:pt-40 pb-8 sm:pb-12 lg:pb-20 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={shouldAnimate ? { duration: 0.8, ease: "easeOut" } : undefined}
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
                initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                transition={shouldAnimate ? { duration: 0.6, delay: 0.2 } : undefined}
              >
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-xs sm:text-sm">Convênios Aceitos</span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                transition={shouldAnimate ? { duration: 0.8, delay: 0.3 } : undefined}
              >
                Atendemos os{" "}
                <span className="text-accent">principais</span>
                <br />
                convênios médicos
              </motion.h1>

              <motion.div
                className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto"
                initial={shouldAnimate ? { width: 0 } : { width: "6rem" }}
                animate={shouldAnimate ? { width: "6rem" } : undefined}
                transition={shouldAnimate ? { duration: 1, delay: 0.5 } : undefined}
              />

              <motion.p
                className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
                initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                transition={shouldAnimate ? { duration: 0.6, delay: 0.6 } : undefined}
              >
                Facilitamos seu acesso aos nossos serviços através de parcerias 
                com os principais planos de saúde. Consulte se o seu convênio 
                está na nossa rede credenciada.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConveniosHeroSection;