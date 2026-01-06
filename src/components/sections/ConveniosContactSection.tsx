'use client';

import { HelpCircle } from "lucide-react";
import { useShouldAnimate } from "@/hooks/useReducedMotion";

const ConveniosContactSection = () => {
  const shouldAnimate = useShouldAnimate();

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
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Perguntas{" "}
            <span className="text-accent">Frequentes</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Tire suas dúvidas sobre convênios, documentação e procedimentos.
          </p>
        </div>

        {/* FAQ Centralizado */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Dúvidas sobre Convênios
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="font-semibold text-gray-900 mb-3">{item.question}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConveniosContactSection;