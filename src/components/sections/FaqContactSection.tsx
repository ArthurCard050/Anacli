'use client';

import { MessageCircle, Phone, Mail, Clock, HelpCircle } from "lucide-react";

const FaqContactSection = () => {
  const contactOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      description: "Resposta rápida para suas dúvidas",
      action: "Enviar mensagem",
      link: "https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Tenho%20uma%20d%C3%BAvida%20sobre%20exames.",
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
      link: "mailto:contato@anacli.com.br?subject=Dúvida sobre exames",
      color: "bg-accent hover:bg-accent/90"
    }
  ];

  const quickTips = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Jejum",
      tip: "Água não quebra o jejum, mas alimentos líquidos sim"
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Dúvidas",
      tip: "Sempre pergunte sobre preparação específica do seu exame"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Contato",
      tip: "Nossa equipe está sempre disponível para esclarecer dúvidas"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ainda tem{" "}
            <span className="text-accent">dúvidas?</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Nossa equipe está pronta para esclarecer qualquer dúvida sobre exames e procedimentos.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Contact Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
            {contactOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
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
              </div>
            ))}

            {/* Business Hours */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
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
            </div>
          </div>

          {/* Quick Tips */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              Dicas importantes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickTips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/30 transition-all duration-300 text-center"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary flex-shrink-0 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    {tip.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqContactSection;