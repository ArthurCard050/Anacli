'use client';

import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GlowBadge } from "@/components/ui/glow-badge";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useShouldAnimate } from "@/hooks/useReducedMotion";

const HeroSection = () => {
  const shouldAnimate = useShouldAnimate(); // Desktop = true, Mobile = false

  // Componente wrapper que usa motion apenas se shouldAnimate for true
  const MotionWrapper = ({ children, ...motionProps }: any) => {
    if (shouldAnimate) {
      return <motion.div {...motionProps}>{children}</motion.div>;
    }
    return <div className={motionProps.className}>{children}</div>;
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-50 rounded-b-[20px] md:rounded-b-[40px] lg:rounded-b-[128px] border-b border-gray-200">
      {/* Background with glow effect */}
      <div className="absolute inset-0">
        {/* Simplified background - no animated effects for cleaner look */}
      </div>

      {/* Clean background without accent */}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-20 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center h-full">
          {/* Left Content */}
          <MotionWrapper
            className="space-y-6 sm:space-y-8 max-w-full lg:max-w-[585px] text-center lg:text-left"
            initial={shouldAnimate ? { opacity: 0, x: -50 } : {}}
            animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
            transition={shouldAnimate ? { duration: 0.8, ease: "easeOut" } : {}}
          >
            {/* Welcome Text */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex justify-center lg:justify-start">
                <GlowBadge icon={<Sparkles className="w-4 h-4" />}>
                  Bem-vindos ao Laboratório Anacli
                </GlowBadge>
              </div>

              <MotionWrapper
                className="text-4xl md:text-7xl font-bold text-gray-900 mb-6"
                initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : {}}
                whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
                transition={shouldAnimate ? { duration: 0.8, delay: 0.2 } : {}}
                viewport={shouldAnimate ? { once: true } : {}}
              >
                <h1>
                  Compromisso
                  <br />
                  & Tradição
                  <br />
                  <span className="text-accent">
                    em Saúde
                  </span>
                </h1>
              </MotionWrapper>

              {/* Linha decorativa */}
              <div className="w-24 h-1 bg-accent mx-auto lg:mx-0"></div>
            </div>

            {/* Description */}
            <div className="space-y-2 sm:space-y-4">
              <p className="text-muted-foreground text-base sm:text-lg lg:text-[24px] leading-relaxed lg:leading-[28.8px] tracking-wide lg:tracking-[0.2px]">
                Uma trajetória de <span className="font-bold text-primary-dark">56 anos</span> cuidando
              </p>
              <p className="text-muted-foreground text-base sm:text-lg lg:text-[24px] leading-relaxed lg:leading-[28.8px] tracking-wide lg:tracking-[0.2px]">
                de nossos pacientes.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <HierarchicalButton
                hierarchy="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                fullWidth={true}
                className="sm:w-auto"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Vim%20atrav%C3%A9s%20do%20site%20e%20desejo%20agendar%20um%20atendimento.', '_blank')}
              >
                Acelere seu atendimento
              </HierarchicalButton>

              <HierarchicalButton
                hierarchy="tertiary"
                size="lg"
                icon={<MapPin className="w-4 h-4" />}
                iconPosition="left"
                fullWidth={true}
                className="sm:w-auto"
                onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Conheça nossas unidades
              </HierarchicalButton>
            </div>

            {/* Patient Avatars */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-6 sm:pt-8 lg:pt-[30px]">
              <div className="flex -space-x-2">
                <OptimizedImage
                  src="https://lh3.googleusercontent.com/a-/ALV-UjXEvoW_jJDs7mwp2VvjQJtBXA_SC-bdffW6BBIrFO6BpnbbAmFvOA=w72-h72-p-rp-mo-ba4-br100"
                  alt="Paciente satisfeita"
                  width={50}
                  height={50}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px] rounded-full border-2 sm:border-[3px] border-white object-cover"
                  priority={false}
                />
                <OptimizedImage
                  src="https://lh3.googleusercontent.com/a-/ALV-UjVoYenF9K2XQjdCFkPcmxzgiM13GqCNx-v-84udsxRQFapUCOwz7w=w72-h72-p-rp-mo-br100"
                  alt="Paciente satisfeito"
                  width={50}
                  height={50}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px] rounded-full border-2 sm:border-[3px] border-white object-cover"
                  priority={false}
                />
                <OptimizedImage
                  src="https://lh3.googleusercontent.com/a-/ALV-UjUwUhvZsF1k5SKuEIRiXKP2rGogV86D1GaIHHR_ndYIS_K-73O2vA=w72-h72-p-rp-mo-ba3-br100"
                  alt="Paciente satisfeita"
                  width={50}
                  height={50}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px] rounded-full border-2 sm:border-[3px] border-white object-cover"
                  priority={false}
                />
                <OptimizedImage
                  src="https://lh3.googleusercontent.com/a-/ALV-UjV5jxMHA_6HsEhLUyaB3AuaRhMb9vTJfYkAl3zm2Ua5AVlX1GcaUg=w72-h72-p-rp-mo-br100"
                  alt="Paciente satisfeito"
                  width={50}
                  height={50}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px] rounded-full border-2 sm:border-[3px] border-white object-cover"
                  priority={false}
                />
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-[13px] leading-relaxed lg:leading-[28.8px] text-center sm:text-left pl-0 sm:pl-[10px]">
                Mais de 5 mil pacientes confiam na gente todos os meses.
              </p>
            </div>
          </MotionWrapper>

          {/* Right Content - Cards */}
          <MotionWrapper
            className="relative flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-[30px] items-center lg:items-start w-full"
            initial={shouldAnimate ? { opacity: 0, x: 50 } : {}}
            animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
            transition={shouldAnimate ? { duration: 0.8, delay: 0.2, ease: "easeOut" } : {}}
          >
            {/* Left Column */}
            <div className="flex flex-col gap-4 sm:gap-6 lg:gap-[30px] w-full lg:w-[341.98px]">
              {/* Lab Building Image Card - LCP Element */}
              <div className="h-[240px] sm:h-[300px] lg:h-[300px] w-full rounded-2xl lg:rounded-[20px] overflow-hidden shadow-xl lg:shadow-2xl relative">
                <OptimizedImage
                  src="/assets/unidade.avif"
                  alt="Fachada do Laboratório Anacli"
                  className="w-full h-full object-cover"
                  width={342}
                  height={340}
                  priority={true}
                  fetchPriority="high"
                />
              </div>

              {/* Results Access Card */}
              <MotionWrapper
                className="bg-accent rounded-3xl p-7 shadow-2xl relative overflow-hidden min-h-[200px] flex flex-col justify-center"
                whileHover={shouldAnimate ? { scale: 1.02, y: -4 } : {}}
                transition={shouldAnimate ? { duration: 0.3 } : {}}
              >
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-sm"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/5 rounded-full blur-md"></div>

                {/* Geometric pattern */}
                <div className="absolute top-4 right-4 w-16 h-16 border border-white/20 rounded-lg rotate-12 opacity-30"></div>
                <div className="absolute bottom-6 left-6 w-8 h-8 border border-white/15 rounded rotate-45 opacity-40"></div>

                <div className="relative z-10 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2">
                      Acesse seu resultado
                    </p>
                    <p className="text-white/80 text-sm">
                      Seus exames de forma rápida e segura
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <HierarchicalButton
                      hierarchy="secondary"
                      size="md"
                      icon={<ArrowRight className="w-4 h-4" />}
                      iconPosition="right"
                      className="bg-white text-accent hover:bg-primary hover:text-white focus:ring-accent"
                      onClick={() => window.open("http://anacli.ddns.com.br:8090/web_laudos/login.asp")}
                    >
                      Acessar
                    </HierarchicalButton>
                  </div>
                </div>
              </MotionWrapper>
            </div>

            {/* Right Column - Interior Card - LCP Element Mobile */}
            <div className="w-full lg:w-[343.02px] h-[300px] sm:h-[400px] lg:min-h-[650px] rounded-2xl lg:rounded-[20px] overflow-hidden shadow-xl lg:shadow-2xl relative">
              {/* Imagem Mobile - LCP Priority */}
              <OptimizedImage
                src="/assets/teste-mobile.avif"
                alt="Promo Anacli Mobile"
                className="w-full h-full object-cover lg:hidden"
                width={343}
                height={400}
                priority={true}
                fetchPriority="high"
              />
              {/* Imagem Desktop */}
              <OptimizedImage
                src="/assets/teste.avif"
                alt="Promo Anacli Desktop"
                className="w-full h-full object-cover hidden lg:block"
                width={343}
                height={650}
                priority={true}
                fetchPriority="high"
              />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;