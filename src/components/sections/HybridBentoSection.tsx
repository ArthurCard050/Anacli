'use client';

import { motion } from "framer-motion";
import { TestTube, Shield, HeartPulse, Baby, Zap, Users, Clock, Home, ArrowRight } from "lucide-react";
import { CleanButton } from "@/components/ui/clean-button";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";

const servicesData = [
  {
    icon: TestTube,
    title: "Exames Laboratoriais",
    description: "Diagnóstico confiável para cada etapa da sua saúde. Análises realizadas com tecnologia avançada e padrões rigorosos de qualidade, oferecendo resultados precisos e seguros."
  },
  {
    icon: Shield,
    title: "Exames Toxicológicos",
    description: "Atenda às exigências da CNH com rapidez e segurança. Processos confiáveis, sigilosos e com emissão de laudos reconhecidos nacionalmente."
  },
  {
    icon: HeartPulse,
    title: "Check-up Completo",
    description: "Prevenção com pacotes sob medida. Cuide de sua saúde antes dos sintomas — realizamos check-ups personalizados de acordo com seu perfil e histórico clínico."
  },
  {
    icon: Baby,
    title: "Atendimento Gestante",
    description: "Acompanhamento acolhedor no pré-natal. Exames específicos para cada fase da gestação, com cuidado humano e atenção especial a cada detalhe."
  }
];

const differentialsData = [
  {
    icon: Zap,
    title: "Tecnologia & Precisão",
    description: "Equipamentos modernos e processos automatizados garantem resultados rápidos e confiáveis."
  },
  {
    icon: Users,
    title: "Equipe Especializada",
    description: "Profissionais experientes e empáticos, comprometidos com a sua saúde e bem-estar em cada etapa do atendimento."
  },
  {
    icon: Clock,
    title: "Hora Marcada",
    description: "Mais agilidade e conforto: escolha o melhor horário e evite filas com nosso sistema de agendamento."
  },
  {
    icon: Home,
    title: "Ambiente Acolhedor",
    description: "Espaços planejados para proporcionar tranquilidade, segurança e uma experiência agradável em todas as nossas unidades."
  }
];

const HybridBentoSection = () => {
  return (
    <section className="relative py-12 md:py-32 overflow-hidden bg-gray-50">
      {/* Animated flowing lines background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="flowingGold1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A6C022" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#D1D87F" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A6C022" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          <motion.path
            d="M0,200 Q300,180 600,200 T1200,200"
            stroke="url(#flowingGold1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              d: [
                "M0,200 Q300,180 600,200 T1200,200",
                "M0,220 Q300,200 600,220 T1200,220",
                "M0,200 Q300,180 600,200 T1200,200"
              ]
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut" },
              opacity: { duration: 1 },
              d: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {/* Services Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Como podemos
                <br />
                <span className="text-accent">
                  ajudar você?
                </span>
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {servicesData.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    {service.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Differentials Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Por que escolher
                <br />
                <span className="text-accent">
                  a Anacli?
                </span>
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {differentialsData.map((differential, index) => (
                <motion.div
                  key={index}
                  className="bg-primary/10 backdrop-blur-sm rounded-xl p-4 border border-primary/20 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/20 flex items-center justify-center">
                    <differential.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    {differential.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">

          {/* Left Side - Como podemos ajudar você */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Como podemos
                <br />
                <span className="text-accent">
                  ajudar você?
                </span>
              </h2>
              <div className="w-20 h-1 bg-accent"></div>
            </div>

            <div className="space-y-0">
              {servicesData.map((service, index) => (
                <motion.div
                  key={index}
                  className="group relative p-6 border-b border-gray-200 last:border-b-0 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8 }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 flex items-start gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <service.icon className="w-6 h-6 text-primary" />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Por que escolher a Anacli */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Magenta gradient background */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  background: [
                    "linear-gradient(45deg, #FF0068, #FF3385, #FF0068)",
                    "linear-gradient(135deg, #FF3385, #FF0068, #FF3385)",
                    "linear-gradient(225deg, #FF0068, #FF3385, #FF0068)",
                    "linear-gradient(315deg, #FF3385, #FF0068, #FF3385)",
                    "linear-gradient(45deg, #FF0068, #FF3385, #FF0068)"
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(45deg, #FF0068, #FF3385, #FF0068)",
                  padding: "3px"
                }}
                animate={{
                  background: [
                    "linear-gradient(45deg, #FF0068, #FF3385, #FF0068)",
                    "linear-gradient(135deg, #FF3385, #FF0068, #FF3385)",
                    "linear-gradient(225deg, #FF0068, #FF3385, #FF0068)",
                    "linear-gradient(315deg, #FF3385, #FF0068, #FF3385)",
                    "linear-gradient(45deg, #FF0068, #FF3385, #FF0068)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-accent rounded-3xl"></div>
              </motion.div>

              <div className="relative z-10 p-8">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Por que escolher
                    <br />
                    <span className="text-white drop-shadow-lg">
                      a Anacli?
                    </span>
                  </h2>
                  <div className="w-20 h-1 bg-accent"></div>
                </div>

                <div className="space-y-6">
                  {differentialsData.map((differential, index) => (
                    <motion.div
                      key={index}
                      className="group relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 8, scale: 1.02 }}
                    >
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10 flex items-start gap-4">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300 flex-shrink-0"
                          whileHover={{ rotate: -10, scale: 1.1 }}
                        >
                          <differential.icon className="w-6 h-6 text-white" />
                        </motion.div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {differential.title}
                          </h3>
                          <p className="text-white/80 leading-relaxed text-sm">
                            {differential.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 lg:mt-20">
          <motion.div
            className="text-center mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-full h-px bg-primary mb-6"></div>
              <p className="text-base lg:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                Excelência técnica e cuidado humano: é isso que nos torna únicos.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <HierarchicalButton
              hierarchy="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Ver todos os exames
            </HierarchicalButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HybridBentoSection;