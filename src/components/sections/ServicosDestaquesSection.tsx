'use client';

import ServiceBanner from "@/components/ui/ServiceBanner";
import { useShouldAnimate } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";

const servicosDestaque = [
  {
    title: "Atendimento Móvel",
    subtitle: "Coleta Domiciliar",
    description: "Realizamos coleta de exames no conforto da sua casa ou empresa. Ideal para pacientes com mobilidade reduzida, idosos ou quem busca praticidade no dia a dia.",
    image: "/assets/servicos/atendimento-movel.webp",
    imageAlt: "Atendimento móvel Anacli",
    whatsappMessage: "Olá! Gostaria de agendar uma coleta domiciliar.",
    modalContent: {
      title: "Atendimento Móvel",
      description: "Nosso serviço de coleta domiciliar leva a qualidade do Anacli até você. Com profissionais altamente qualificados e equipamentos de última geração, garantimos a mesma precisão dos exames realizados em nossas unidades.",
      benefits: [
        "Coleta no conforto da sua casa ou empresa",
        "Agendamento flexível conforme sua disponibilidade",
        "Profissionais treinados e equipados",
        "Resultados disponíveis online",
        "Atendimento humanizado e personalizado",
        "Ideal para idosos e pessoas com mobilidade reduzida"
      ],
      details: "O serviço está disponível em Feira de Santana e região. Entre em contato para verificar disponibilidade e agendar sua coleta."
    },
    bgColor: "bg-gradient-to-r from-blue-50 to-blue-100/50",
    accentColor: "text-blue-600",
    reversed: false
  },
  {
    title: "Teste para Doença Celíaca",
    subtitle: "Diagnóstico Especializado",
    description: "Exames completos para diagnóstico da doença celíaca, incluindo anticorpos anti-transglutaminase, anti-endomísio e anti-gliadina. Resultados precisos para um diagnóstico seguro.",
    image: "/assets/servicos/doenca-celiaca.webp",
    imageAlt: "Teste para Doença Celíaca",
    whatsappMessage: "Olá! Gostaria de informações sobre o teste para Doença Celíaca.",
    modalContent: {
      title: "Diagnóstico de Doença Celíaca",
      description: "A doença celíaca é uma condição autoimune que afeta o intestino delgado quando há ingestão de glúten. O diagnóstico precoce é fundamental para evitar complicações e melhorar a qualidade de vida.",
      benefits: [
        "Painel completo de anticorpos específicos",
        "Anti-transglutaminase IgA e IgG",
        "Anti-endomísio (EMA)",
        "Anti-gliadina deaminada",
        "Dosagem de IgA total",
        "Resultados em até 5 dias úteis"
      ],
      details: "Recomendamos que o paciente mantenha dieta com glúten por pelo menos 6 semanas antes da coleta para garantir a precisão dos resultados. Consulte seu médico para orientações específicas."
    },
    bgColor: "bg-gradient-to-r from-amber-50 to-orange-100/50",
    accentColor: "text-amber-600",
    reversed: true
  },
  {
    title: "HPV Autocoleta",
    subtitle: "Praticidade e Privacidade",
    description: "Realize o teste de HPV com total privacidade através da autocoleta. Um método simples, seguro e tão eficaz quanto a coleta tradicional para detecção do vírus.",
    image: "/assets/servicos/hpv-autocoleta.webp",
    imageAlt: "HPV Autocoleta",
    whatsappMessage: "Olá! Gostaria de informações sobre o teste HPV Autocoleta.",
    modalContent: {
      title: "HPV Autocoleta",
      description: "O teste de HPV por autocoleta é uma alternativa moderna e confortável para a detecção do Papilomavírus Humano. A paciente realiza a coleta de forma autônoma, com orientação da nossa equipe, garantindo privacidade e conforto.",
      benefits: [
        "Coleta realizada pela própria paciente",
        "Maior privacidade e conforto",
        "Mesma precisão da coleta tradicional",
        "Detecção de HPV de alto risco oncogênico",
        "Orientação completa da equipe",
        "Resultado em até 7 dias úteis"
      ],
      details: "O teste detecta os tipos de HPV de alto risco associados ao câncer de colo de útero. É indicado para mulheres a partir de 25 anos como parte do rastreamento preventivo. Consulte seu médico sobre a frequência recomendada."
    },
    bgColor: "bg-gradient-to-r from-pink-50 to-rose-100/50",
    accentColor: "text-pink-600",
    reversed: false
  }
];

const ServicosDestaquesSection = () => {
  const shouldAnimate = useShouldAnimate();

  const MotionWrapper = ({ children, className, ...motionProps }: any) => {
    if (shouldAnimate) {
      return <motion.div className={className} {...motionProps}>{children}</motion.div>;
    }
    return <div className={className}>{children}</div>;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <MotionWrapper
          className="text-center mb-10 sm:mb-14"
          initial={shouldAnimate ? { opacity: 0, y: 30 } : {}}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={shouldAnimate ? { duration: 0.8 } : {}}
          viewport={shouldAnimate ? { once: true } : {}}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Serviços em{" "}
            <span className="text-accent">Destaque</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Conheça alguns dos nossos serviços especializados que fazem a diferença 
            no cuidado com a sua saúde.
          </p>
        </MotionWrapper>

        {/* Banners */}
        <div className="space-y-6 sm:space-y-8">
          {servicosDestaque.map((servico, index) => (
            <MotionWrapper
              key={servico.title}
              initial={shouldAnimate ? { opacity: 0, y: 30 } : {}}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
              transition={shouldAnimate ? { duration: 0.6, delay: index * 0.15 } : {}}
              viewport={shouldAnimate ? { once: true } : {}}
            >
              <ServiceBanner {...servico} />
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicosDestaquesSection;
