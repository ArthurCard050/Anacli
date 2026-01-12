'use client';

import { Home, ClipboardCheck, Beaker, Building2, Users, Clock } from "lucide-react";
import { useShouldAnimate } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";

const servicos = [
  {
    id: "coleta-domiciliar",
    icon: <Home className="w-8 h-8" />,
    title: "Coleta Domiciliar",
    description: "Realizamos coleta de exames no conforto da sua casa. Ideal para pacientes com mobilidade reduzida, idosos ou quem busca praticidade.",
    features: ["Agendamento flexível", "Profissionais qualificados", "Resultados online"],
    color: "bg-blue-500"
  },
  {
    id: "checkups",
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: "Check-ups Completos",
    description: "Pacotes de exames preventivos para avaliação geral da saúde. Personalizados por faixa etária e necessidades específicas.",
    features: ["Check-up executivo", "Check-up feminino/masculino", "Check-up cardiológico"],
    color: "bg-green-500"
  },
  {
    id: "toxicologicos",
    icon: <Beaker className="w-8 h-8" />,
    title: "Exames Toxicológicos",
    description: "Exames toxicológicos para admissão, demissão e periódicos. Atendemos empresas e motoristas profissionais conforme legislação.",
    features: ["Larga janela de detecção", "Laudo oficial", "Atendimento empresarial"],
    color: "bg-purple-500"
  },
  {
    id: "empresarial",
    icon: <Building2 className="w-8 h-8" />,
    title: "Atendimento Empresarial",
    description: "Soluções completas para empresas: exames admissionais, demissionais, periódicos e programas de saúde ocupacional.",
    features: ["Medicina do trabalho", "Gestão de saúde", "Relatórios gerenciais"],
    color: "bg-orange-500"
  },
  {
    id: "convenios",
    icon: <Users className="w-8 h-8" />,
    title: "Ampla Rede de Convênios",
    description: "Aceitamos os principais planos de saúde da região. Consulte nossa lista completa de convênios credenciados.",
    features: ["Principais operadoras", "Atendimento particular", "Preços acessíveis"],
    color: "bg-teal-500"
  },
  {
    id: "resultados",
    icon: <Clock className="w-8 h-8" />,
    title: "Resultados Rápidos",
    description: "Agilidade na entrega dos resultados. Acesse seus laudos online de forma segura e prática, 24 horas por dia.",
    features: ["Portal do paciente", "Resultados em até 24h*", "Histórico completo"],
    color: "bg-pink-500"
  }
];

const ServicosListSection = () => {
  const shouldAnimate = useShouldAnimate();

  const MotionWrapper = ({ children, className, ...motionProps }: any) => {
    if (shouldAnimate) {
      return <motion.div className={className} {...motionProps}>{children}</motion.div>;
    }
    return <div className={className}>{children}</div>;
  };

  return (
    <section id="servicos" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <MotionWrapper
          className="text-center mb-12 sm:mb-16"
          initial={shouldAnimate ? { opacity: 0, y: 30 } : {}}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={shouldAnimate ? { duration: 0.8 } : {}}
          viewport={shouldAnimate ? { once: true } : {}}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Nossos{" "}
            <span className="text-primary">Serviços</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Oferecemos uma gama completa de serviços para atender você e sua família 
            com qualidade, conforto e agilidade.
          </p>
        </MotionWrapper>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicos.map((servico, index) => (
            <MotionWrapper
              key={servico.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
              initial={shouldAnimate ? { opacity: 0, y: 30 } : {}}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
              transition={shouldAnimate ? { duration: 0.5, delay: index * 0.1 } : {}}
              viewport={shouldAnimate ? { once: true } : {}}
            >
              {/* Icon */}
              <div className={`${servico.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {servico.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {servico.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {servico.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {servico.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </MotionWrapper>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          * Prazo pode variar de acordo com o tipo de exame
        </p>
      </div>
    </section>
  );
};

export default ServicosListSection;
