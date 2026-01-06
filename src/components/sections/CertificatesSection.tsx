'use client';

import { motion } from "framer-motion";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useShouldAnimate } from "@/hooks/useReducedMotion";

const certificates = [
  {
    name: "ISO 9001",
    description: "Sistema de Gestão da Qualidade",
    logo: "/assets/certificados/ISO.svg"
  },
  {
    name: "DICQ",
    description: "Departamento de Inspeção e Controle da Qualidade",
    logo: "/assets/certificados/DICQ.svg"
  },
  {
    name: "PNCQ",
    description: "Programa Nacional de Controle de Qualidade",
    logo: "/assets/certificados/PNCQ.svg"
  },
  {
    name: "PREVECAL",
    description: "Programa de Verificação Externa da Qualidade",
    logo: "/assets/certificados/PREVECAL.svg"
  }
];

const CertificatesSection = () => {
  const shouldAnimate = useShouldAnimate();

  // Componente wrapper que usa motion apenas se shouldAnimate for true
  const MotionWrapper = ({ children, ...motionProps }: any) => {
    if (shouldAnimate) {
      return <motion.div {...motionProps}>{children}</motion.div>;
    }
    return <div>{children}</div>;
  };

  return (
    <section className="relative py-16 md:py-20 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #A6C022 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #FF0068 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Layout: Text Left, Logos Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">

          {/* Left Side - Text Content */}
          <MotionWrapper
            className="space-y-6"
            initial={shouldAnimate ? { opacity: 0, x: -50 } : {}}
            whileInView={shouldAnimate ? { opacity: 1, x: 0 } : {}}
            transition={shouldAnimate ? { duration: 0.8 } : {}}
            viewport={shouldAnimate ? { once: true } : {}}
          >
            <MotionWrapper
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
              initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
              transition={shouldAnimate ? { duration: 0.8, delay: 0.2 } : {}}
              viewport={shouldAnimate ? { once: true } : {}}
            >
              <h2>
                Certificações e
                <br />
                <span className="text-accent">
                  Acreditações
                </span>
              </h2>
            </MotionWrapper>

            <MotionWrapper
              className="w-20 h-1 bg-accent"
              initial={shouldAnimate ? { width: 0 } : {}}
              whileInView={shouldAnimate ? { width: "5rem" } : {}}
              transition={shouldAnimate ? { duration: 1, delay: 0.4 } : {}}
              viewport={shouldAnimate ? { once: true } : {}}
            />

            <MotionWrapper
              className="text-lg text-gray-600 leading-relaxed"
              initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
              transition={shouldAnimate ? { duration: 0.8, delay: 0.6 } : {}}
              viewport={shouldAnimate ? { once: true } : {}}
            >
              <p>
                Nosso compromisso com a excelência é reconhecido pelos principais órgãos reguladores do país. Cada certificação representa nosso dedicação à qualidade, precisão e segurança em todos os processos laboratoriais.
              </p>
            </MotionWrapper>

            <MotionWrapper
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20"
              initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
              transition={shouldAnimate ? { duration: 0.8, delay: 0.8 } : {}}
              viewport={shouldAnimate ? { once: true } : {}}
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Laboratório certificado
              </span>
            </MotionWrapper>
          </MotionWrapper>

          {/* Right Side - Certificates Grid */}
          <MotionWrapper
            className="grid grid-cols-2 gap-6 lg:gap-8"
            initial={shouldAnimate ? { opacity: 0, x: 50 } : {}}
            whileInView={shouldAnimate ? { opacity: 1, x: 0 } : {}}
            transition={shouldAnimate ? { duration: 0.8, delay: 0.2 } : {}}
            viewport={shouldAnimate ? { once: true } : {}}
          >
            {certificates.map((cert, index) => (
              <MotionWrapper
                key={index}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md"
                initial={shouldAnimate ? { opacity: 0, y: 30 } : {}}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                transition={shouldAnimate ? { duration: 0.6, delay: 0.4 + index * 0.1 } : {}}
                viewport={shouldAnimate ? { once: true } : {}}
                whileHover={shouldAnimate ? { y: -8, scale: 1.02 } : {}}
              >
                {/* Certificate Logo */}
                <MotionWrapper
                  className="relative w-16 h-16 lg:w-20 lg:h-20 mb-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:border-primary/30 transition-all duration-300"
                  whileHover={shouldAnimate ? { scale: 1.1, rotate: 2 } : {}}
                >
                  <div 
                    className="w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center"
                    style={{ filter: 'brightness(0) saturate(100%) invert(13%) sepia(100%) saturate(7500%) hue-rotate(335deg) brightness(100%) contrast(100%)' }}
                  >
                    <OptimizedImage
                      src={cert.logo}
                      alt={`Certificado ${cert.name}`}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain transition-all duration-300"
                    />
                  </div>

                  {/* Glow effect */}
                  <MotionWrapper
                    className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={shouldAnimate ? { scale: 0.8 } : {}}
                    whileHover={shouldAnimate ? { scale: 1.1 } : {}}
                  />
                </MotionWrapper>

                {/* Certificate Info */}
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-900 text-sm lg:text-base group-hover:text-primary transition-colors duration-300">
                    {cert.name}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600 leading-tight">
                    {cert.description}
                  </p>
                </div>
              </MotionWrapper>
            ))}
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;