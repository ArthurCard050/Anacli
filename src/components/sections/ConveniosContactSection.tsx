'use client';

import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Clock, MapPin, HelpCircle } from "lucide-react";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";
import { useShouldAnimate } from "@/hooks/useReducedMotion";

const ConveniosContactSection = () => {
  const shouldAnimate = useShouldAnimate();

  /* 
  // SEÇÃO COMENTADA PARA USO FUTURO - "Precisa de ajuda?"
  const contactOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      description: "Atendimento rápido e direto",
      action: "Consultar convênio",
      link: "https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Gostaria%20de%20verificar%20se%20meu%20conv%C3%AAnio%20%C3%A9%20aceito.",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefone",
      description: "(75) 3030-0030",
      action: "Ligar agora",
      link: "tel:+557530300030",
      color: "bg-primary hover:bg-primary/90"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "E-mail",
      description: "contato@anacli.com.br",
      action: "Enviar e-mail",
      link: "mailto:contato@anacli.com.br?subject=Consulta sobre convênio",
      color: "bg-accent hover:bg-accent/90"
    }
  ];
  */

  const faqItems = [
    {
      question: "Como verifico se meu convênio é aceito?",
      answer: "Utilize nossa barra de pesquisa acima ou entre em contato conosco através dos canais disponíveis."
    },
    {
      question: "Preciso de autorização prévia?",
      answer: "Alguns exames podem necessitar de autorização prévia do convênio. Consulte-nos para verificar."
    },
    {
      question: "Qual documentação devo levar?",
      answer: "Carteirinha do convênio, documento de identidade e pedido médico são obrigatórios."
    },
    {
      question: "Posso agendar pelo convênio?",
      answer: "Sim, oferecemos agendamento para todos os convênios credenciados. Entre em contato conosco."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={shouldAnimate ? { duration: 0.8 } : undefined}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Perguntas{" "}
            <span className="text-accent">Frequentes</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Tire suas dúvidas sobre convênios, documentação e procedimentos.
          </p>
        </motion.div>

        {/* FAQ Centralizado */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-6"
            initial={shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={shouldAnimate ? { duration: 0.8, delay: 0.4 } : undefined}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Dúvidas sobre Convênios
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                  whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                  transition={shouldAnimate ? { duration: 0.6, delay: 0.5 + index * 0.1 } : undefined}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-gray-900 mb-3">{item.question}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 
        // SEÇÃO COMENTADA PARA USO FUTURO - Layout com contato e FAQ lado a lado
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          // Contact Options
          <motion.div
            className="space-y-6"
            initial={shouldAnimate ? { opacity: 0, x: -30 } : { opacity: 1, x: 0 }}
            whileInView={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
            transition={shouldAnimate ? { duration: 0.8, delay: 0.2 } : undefined}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Entre em contato
            </h3>

            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                transition={shouldAnimate ? { duration: 0.6, delay: 0.3 + index * 0.1 } : undefined}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl text-white ${option.color.split(' ')[0]} flex-shrink-0`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{option.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                    <a
                      href={option.link}
                      target={option.link.startsWith('http') ? '_blank' : undefined}
                      rel={option.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`inline-flex items-center px-4 py-2 text-white text-sm rounded-lg transition-colors ${option.color}`}
                    >
                      {option.action}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}

            // Business Hours
            <motion.div
              className="bg-white rounded-2xl p-6 border border-gray-200"
              initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={shouldAnimate ? { duration: 0.6, delay: 0.6 } : undefined}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gray-100 text-gray-600 flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Horário de Atendimento</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Segunda a Sexta: 6:00 às 16:00</p>
                    <p>Sábado: 6:00 às 12:00</p>
                    <p>Domingo: Fechado</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        */}
      </div>
    </section>
  );
};

export default ConveniosContactSection;