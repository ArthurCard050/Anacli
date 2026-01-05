'use client';

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useShouldAnimate } from "@/hooks/useReducedMotion";

const AboutHeroSection = () => {
  const shouldAnimate = useShouldAnimate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-50 rounded-b-[20px] md:rounded-b-[40px] lg:rounded-b-[128px] border-b border-gray-200">
      {/* Background with glow effect */}
      <div className="absolute inset-0">
        {/* Simplified background - no animated effects for cleaner look */}
      </div>

      {/* Clean background without accent */}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-32 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-20 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 items-center h-full">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8 text-center lg:text-left order-1">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-xs sm:text-sm">Conheça nossa história</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Mais de{" "}
                <span className="text-accent">50 anos</span>
                <br />
                cuidando de você
              </h1>

              <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto lg:mx-0" />

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Desde 1969, o Laboratório Anacli tem sido sinônimo de excelência, 
                ética e qualidade em análises clínicas. Nossa jornada começou com 
                uma missão simples: oferecer o melhor em cuidados laboratoriais 
                para os feirenses.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1 sm:mb-2">50+</div>
                <div className="text-xs sm:text-sm text-gray-600">Anos de tradição</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">5k+</div>
                <div className="text-xs sm:text-sm text-gray-600">Pacientes/mês</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">2</div>
                <div className="text-xs sm:text-sm text-gray-600">Unidades</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="lg:col-span-3 relative order-2">
            <div className="relative rounded-2xl lg:rounded-[20px] overflow-hidden">
              <OptimizedImage
                src="/assets/Sobre - hero.webp"
                alt="Laboratório Anacli - Nossa História"
                className="w-full h-72 sm:h-96 md:h-[500px] lg:h-[650px] object-cover"
                width={800}
                height={650}
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;