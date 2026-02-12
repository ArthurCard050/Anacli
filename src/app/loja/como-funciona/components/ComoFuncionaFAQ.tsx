'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ComoFuncionaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Preciso de pedido médico para fazer exames?',
      answer: 'Para a maioria dos exames, não é necessário pedido médico. Você pode realizar exames de rotina e check-ups por conta própria. Alguns exames específicos podem requerer solicitação médica.',
    },
    {
      question: 'Como funciona a coleta domiciliar?',
      answer: 'A coleta domiciliar é gratuita e pode ser agendada pelo site ou WhatsApp. Nossa equipe vai até sua casa no horário combinado, realiza a coleta com todo cuidado e leva as amostras para análise.',
    },
    {
      question: 'Quanto tempo demora para sair o resultado?',
      answer: 'A maioria dos exames fica pronta em até 24 horas. Alguns exames mais complexos podem levar de 3 a 7 dias úteis. Você será informado do prazo no momento do agendamento.',
    },
    {
      question: 'Como acesso meus resultados?',
      answer: 'Você recebe uma notificação por e-mail e SMS quando os resultados estiverem prontos. Pode acessá-los pelo nosso portal online ou aplicativo, usando seu CPF e senha cadastrada.',
    },
    {
      question: 'Posso parcelar o pagamento?',
      answer: 'Sim! Aceitamos cartão de crédito com parcelamento em até 12x sem juros. Também aceitamos PIX, débito e dinheiro.',
    },
    {
      question: 'Preciso estar em jejum?',
      answer: 'Depende do tipo de exame. No momento do agendamento, você receberá todas as orientações de preparo necessárias. Para exames de sangue de rotina, geralmente é necessário jejum de 8 a 12 horas.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600">
              Tire suas dúvidas sobre nosso processo
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
