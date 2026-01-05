'use client';

import { motion } from "framer-motion";
import { Calendar, MapPin, Target } from "lucide-react";
import { useShouldAnimate } from "@/hooks/useReducedMotion";

const AboutHistorySection = () => {
  const shouldAnimate = useShouldAnimate();

  const timeline = [
    {
      year: "1969",
      title: "Fundação",
      description: "O Laboratório Anacli foi fundado em Feira de Santana com a missão de oferecer excelência em análises clínicas.",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      year: "1980s",
      title: "Expansão",
      description: "Crescimento da equipe e ampliação dos serviços oferecidos, sempre mantendo a qualidade como prioridade.",
      icon: <Target className="w-6 h-6" />
    },
    {
      year: "2000s",
      title: "Modernização",
      description: "Investimento em tecnologia de ponta e certificações de qualidade para melhor atender nossos pacientes.",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      year: "Hoje",
      title: "Excelência",
      description: "Mais de 50 anos de tradição, atendendo mais de 5 mil pacientes mensalmente com ética e qualidade.",
      icon: <Target className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Nossa{" "}
            <span className="text-accent">Jornada</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Uma história construída com dedicação, ética e compromisso com a excelência. 
            Conheça os marcos que definiram nossa trajetória ao longo de mais de cinco décadas.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto px-4">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col sm:flex-row items-start sm:items-center mb-8 sm:mb-12 last:mb-0"
            >
              {/* Timeline Line - Hidden on mobile, visible on sm+ */}
              {index < timeline.length - 1 && (
                <div className="hidden sm:block absolute left-8 top-16 w-0.5 h-20 bg-primary/20" />
              )}

              {/* Mobile Timeline Line - Positioned correctly for mobile */}
              {index < timeline.length - 1 && (
                <div className="block sm:hidden absolute left-6 top-16 w-0.5 h-20 bg-primary/20 z-0" />
              )}

              {/* Icon */}
              <div className="relative w-12 sm:w-16 h-12 sm:h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg z-10 flex-shrink-0 mb-4 sm:mb-0">
                {item.icon}
              </div>

              {/* Content */}
              <div className="sm:ml-6 md:ml-8 flex-1 w-full relative z-10">
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-primary/30 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <span className="text-xl sm:text-2xl font-bold text-accent">{item.year}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHistorySection;