'use client';

import { Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useShouldAnimate } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";

const contatoInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Telefone",
    info: "(75) 3030-0030",
    description: "Central de atendimento",
    action: "tel:+557530300030",
    color: "bg-blue-500"
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp",
    info: "(75) 3030-0030",
    description: "Atendimento rápido",
    action: "https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Vim%20atrav%C3%A9s%20do%20site.",
    color: "bg-green-500"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "E-mail",
    info: "contato@anacli.com.br",
    description: "Dúvidas e sugestões",
    action: "mailto:contato@anacli.com.br",
    color: "bg-purple-500"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Horário",
    info: "Seg a Sáb: 6h às 17h",
    description: "Atendimento presencial",
    action: null,
    color: "bg-orange-500"
  }
];

const ContatoInfoSection = () => {
  const shouldAnimate = useShouldAnimate();

  const MotionWrapper = ({ children, className, ...motionProps }: any) => {
    if (shouldAnimate) {
      return <motion.div className={className} {...motionProps}>{children}</motion.div>;
    }
    return <div className={className}>{children}</div>;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <MotionWrapper
          className="text-center mb-10 sm:mb-14"
          initial={shouldAnimate ? { opacity: 0, y: 30 } : {}}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={shouldAnimate ? { duration: 0.8 } : {}}
          viewport={shouldAnimate ? { once: true } : {}}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Canais de{" "}
            <span className="text-accent">Atendimento</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4" />
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Escolha o canal mais conveniente para você
          </p>
        </MotionWrapper>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {contatoInfo.map((item, index) => (
            <MotionWrapper
              key={item.title}
              initial={shouldAnimate ? { opacity: 0, y: 30 } : {}}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
              transition={shouldAnimate ? { duration: 0.5, delay: index * 0.1 } : {}}
              viewport={shouldAnimate ? { once: true } : {}}
            >
              {item.action ? (
                <a
                  href={item.action}
                  target={item.action.startsWith('http') ? '_blank' : undefined}
                  rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group h-full"
                >
                  <div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-primary font-semibold mb-1">{item.info}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </a>
              ) : (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full">
                  <div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-primary font-semibold mb-1">{item.info}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              )}
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContatoInfoSection;
