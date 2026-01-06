'use client';

import { Eye, Target, Heart, Shield, Users, Award } from "lucide-react";

const AboutValuesSection = () => {
  const coreValues = [
    {
      title: "Visão",
      subtitle: "Reconhecimento pela ética",
      description: "Ser reconhecida por nossa ética, postura e filosofia de qualidade e respeito ao ser humano.",
      icon: <Eye className="w-8 h-8" />,
      color: "bg-primary",
      textColor: "text-primary"
    },
    {
      title: "Missão", 
      subtitle: "Resultados com qualidade",
      description: "Respeitar princípios éticos para garantir resultados de qualidade e confiança.",
      icon: <Target className="w-8 h-8" />,
      color: "bg-accent",
      textColor: "text-accent"
    },
    {
      title: "Valores",
      subtitle: "Nossos pilares",
      description: "Respeito • Ética • Qualidade • Dedicação • Persistência • Solidariedade",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-gray-800",
      textColor: "text-gray-800"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Nossos{" "}
            <span className="text-accent">Princípios</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Os valores que nos guiam há mais de 50 anos
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {coreValues.map((value, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 h-full border border-gray-200 group-hover:border-primary/30 group-hover:-translate-y-2">
                {/* Icon */}
                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                  {value.icon}
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className={`text-2xl font-bold ${value.textColor} mb-2`}>
                    {value.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
                    {value.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mt-12 sm:mt-16 text-center max-w-4xl mx-auto">
        </div>
      </div>
    </section>
  );
};

export default AboutValuesSection;