'use client';

import { motion } from "framer-motion";
import { Users, Shield, Zap, Heart, Award } from "lucide-react";

const MissionSection = () => {

  return (
    <section id="sobre" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-primary/5">
        {/* Animated Sine Wave Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Primeira linha senoidal */}
          <motion.path
            d="M0,200 Q300,100 600,200 T1200,200"
            stroke="url(#waveGradient1)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              d: [
                "M0,300 Q300,200 600,300 T1200,300",
                "M0,280 Q300,220 600,280 T1200,280",
                "M0,300 Q300,200 600,300 T1200,300"
              ]
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut" },
              opacity: { duration: 1 },
              d: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Segunda linha senoidal */}
          <motion.path
            d="M0,480 Q300,580 600,480 T1200,480"
            stroke="url(#waveGradient2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              d: [
                "M0,480 Q300,580 600,480 T1200,480",
                "M0,500 Q300,560 600,500 T1200,500",
                "M0,480 Q300,580 600,480 T1200,480"
              ]
            }}
            transition={{
              pathLength: { duration: 2.5, ease: "easeInOut", delay: 0.5 },
              opacity: { duration: 1, delay: 0.5 },
              d: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
          />

          {/* Terceira linha senoidal */}
          <motion.path
            d="M0,680 Q300,630 600,680 T1200,680"
            stroke="url(#waveGradient1)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              d: [
                "M0,680 Q300,630 600,680 T1200,680",
                "M0,660 Q300,650 600,660 T1200,660",
                "M0,680 Q300,630 600,680 T1200,680"
              ]
            }}
            transition={{
              pathLength: { duration: 3, ease: "easeInOut", delay: 1 },
              opacity: { duration: 1, delay: 1 },
              d: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }
            }}
          />
        </svg>

        {/* Glow orbs with Anacli colors */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
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
            Excelência técnica,
            <br />
            <span className="text-accent">
              responsabilidade humana.
            </span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-accent mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            A Anacli une tecnologia de ponta e atendimento humanizado para oferecer
            um serviço laboratorial de referência. Nosso compromisso é com a precisão
            científica e o respeito a cada paciente.
          </motion.p>
        </motion.div>

        {/* Bento Grid - Layout Assimétrico */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {/* Card 1 - Exames/mês - GRANDE (2x2) */}
            <motion.div
              className="md:col-span-2 md:row-span-2 group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="bg-primary/10 backdrop-blur-sm rounded-3xl p-8 h-full flex flex-col justify-center border border-primary/20 group-hover:border-primary/30 transition-all duration-300 min-h-[300px]">
                <div className="w-20 h-20 mb-8 rounded-3xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <div className="text-7xl font-bold text-primary mb-4">
                  5k+
                </div>
                <div className="text-2xl font-semibold text-gray-900 mb-4">
                  Tipos de Exames
                </div>
                <div className="text-base text-gray-600 leading-relaxed mb-6">
                  Um portfólio completo para um diagnóstico preciso.
                </div>
                <div className="text-sm text-primary/70 font-medium">
                  Precisão e dedicação à sua saúde
                </div>
              </div>
            </motion.div>

            {/* Container para Cards 2 e 3 - Lado a lado no mobile */}
            <div className="grid grid-cols-2 gap-6 md:contents">
              {/* Card 2 - Satisfação - MÉDIO */}
              <motion.div
                className="md:col-span-1 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="bg-secondary/10 backdrop-blur-sm rounded-3xl p-6 h-full flex flex-col justify-center border border-secondary/20 group-hover:border-secondary/30 transition-all duration-300 min-h-[140px]">
                  <div className="w-14 h-14 mb-4 rounded-2xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors duration-300">
                    <Shield className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div className="text-4xl font-bold text-secondary-foreground mb-2">
                    95%
                  </div>
                  <div className="text-base font-semibold text-gray-900 mb-1">
                    Satisfação
                  </div>
                  <div className="text-sm text-gray-600">
                    Pacientes
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - Anos de experiência - MÉDIO */}
              <motion.div
                className="md:col-span-1 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="bg-accent/10 backdrop-blur-sm rounded-3xl p-6 h-full flex flex-col justify-center border border-accent/20 group-hover:border-accent/30 transition-all duration-300 min-h-[140px]">
                  <div className="w-14 h-14 mb-4 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                    <Award className="w-7 h-7 text-accent" />
                  </div>
                  <div className="text-4xl font-bold text-accent mb-2">
                    50+
                  </div>
                  <div className="text-base font-semibold text-gray-900 mb-1">
                    Anos
                  </div>
                  <div className="text-sm text-gray-600">
                    Experiência
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Card 4 - Tecnologia Avançada - LARGO (2x1) */}
            <motion.div
              className="md:col-span-2 group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8  group-hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:border-primary/20 h-full min-h-[140px] flex items-center justify-center">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <Zap className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Tecnologia Avançada
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-2">
                      Equipamentos de última geração para resultados precisos
                    </p>
                    <div className="text-xs text-primary font-medium">
                      Certificação ISO 9001
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 5 - Atendimento Humanizado - PEQUENO */}
            <motion.div
              className="md:col-span-1 group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 group-hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:border-accent/20 h-full min-h-[140px]">
                <div className="w-12 h-12 mb-4 rounded-xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Atendimento Humanizado
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  Cuidado personalizado
                </p>
                <div className="text-xs text-accent font-medium">
                  Equipe especializada
                </div>
              </div>
            </motion.div>

            {/* Card 6 - Qualidade Garantida - EXTRA LARGO (3x1) */}
            <motion.div
              className="md:col-span-3 group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="bg-accent/10 backdrop-blur-sm rounded-3xl p-8 transition-all duration-300 border border-accent/20 group-hover:border-accent/30 h-full min-h-[140px] flex items-center justify-center">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300 flex-shrink-0">
                    <Shield className="w-10 h-10 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Qualidade Garantida
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Certificações e controles rigorosos de qualidade em todos os processos laboratoriais
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="text-sm bg-accent/20 text-accent px-3 py-1 rounded-full font-medium">
                        ISO 9001
                      </span>
                      <span className="text-sm bg-accent/20 text-accent px-3 py-1 rounded-full font-medium">
                        DICQ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-primary/10 backdrop-blur-sm rounded-3xl p-12 border border-primary/20">
            <motion.p
              className="text-lg text-gray-700 leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              Investimos continuamente em infraestrutura, capacitação e inovação para
              garantir resultados rápidos, seguros e confiáveis. Nossa equipe é formada
              por profissionais altamente qualificados, comprometidos com a excelência
              em cada etapa do processo.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-4 max-w-lg md:max-w-none mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
            >
              {["Precisão", "Agilidade", "Confiabilidade", "Humanização"].map((tag, index) => (
                <motion.span
                  key={index}
                  className="px-2 py-3 md:px-6 bg-white rounded-full text-primary font-semibold shadow-md text-center text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
