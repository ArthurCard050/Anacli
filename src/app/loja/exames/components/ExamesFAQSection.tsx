'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Clock, Shield, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExamesFAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Como funciona o agendamento de exames?',
      answer: 'O agendamento é simples e rápido. Você pode agendar online através do nosso site, escolhendo o horário que melhor se adequa à sua rotina. Também oferecemos agendamento por telefone ou WhatsApp. Após o agendamento, você receberá uma confirmação com todas as informações necessárias.'
    },
    {
      question: 'Preciso de jejum para todos os exames?',
      answer: 'Não, nem todos os exames exigem jejum. Cada exame tem suas especificidades de preparo. Na descrição de cada exame, você encontrará as informações sobre o preparo necessário. Exames como hemograma completo não precisam de jejum, enquanto glicemia e colesterol geralmente requerem jejum de 8 a 12 horas.'
    },
    {
      question: 'Em quanto tempo ficam prontos os resultados?',
      answer: 'O tempo varia conforme o tipo de exame. Exames simples como hemograma e urina ficam prontos em até 24 horas. Exames mais complexos podem levar de 2 a 7 dias úteis. Todos os prazos são informados no momento do agendamento e você pode acompanhar o status pelo nosso portal online.'
    },
    {
      question: 'Como recebo os resultados dos meus exames?',
      answer: 'Os resultados são disponibilizados através do nosso portal online, onde você pode acessar com seu CPF e data de nascimento. Também enviamos uma notificação por SMS e email quando os resultados estão prontos. Se preferir, você pode retirar uma via impressa em nossa unidade.'
    },
    {
      question: 'Vocês atendem convênios médicos?',
      answer: 'Sim, atendemos os principais convênios médicos. Consulte nossa lista completa de convênios aceitos em nosso site ou entre em contato conosco. É importante apresentar a carteirinha do convênio e um documento de identidade no momento da coleta.'
    },
    {
      question: 'Posso fazer exames sem pedido médico?',
      answer: 'Alguns exames podem ser realizados sem pedido médico, como check-ups preventivos e exames de rotina. No entanto, recomendamos sempre consultar um médico para orientação adequada. Nossa equipe pode esclarecer quais exames podem ser feitos sem prescrição médica.'
    },
    {
      question: 'Vocês fazem coleta domiciliar?',
      answer: 'Sim, oferecemos serviço de coleta domiciliar para sua comodidade. O serviço está disponível para a maioria dos exames de sangue e urina. Entre em contato conosco para verificar disponibilidade em sua região e agendar a coleta em sua casa ou empresa.'
    },
    {
      question: 'Como posso cancelar ou remarcar meu exame?',
      answer: 'Você pode cancelar ou remarcar seu exame através do nosso portal online, por telefone ou WhatsApp. Recomendamos fazer alterações com pelo menos 2 horas de antecedência. Não cobramos taxa para cancelamentos ou remarcações feitas dentro do prazo.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HelpCircle className="h-4 w-4" />
            Dúvidas Frequentes
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes sobre Exames
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Esclarecemos as principais dúvidas sobre nossos exames laboratoriais
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ List */}
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Help Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Horário de Funcionamento</h3>
              <p className="text-sm text-gray-600 mb-4">
                Segunda a Sexta: 6:30 às 18:00<br />
                Sábado: 7:00 às 11:00
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Ver Horários
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Preparo para Exames</h3>
              <p className="text-sm text-gray-600 mb-4">
                Guia completo de preparação para cada tipo de exame
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Ver Guia
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Atendimento</h3>
              <p className="text-sm text-gray-600 mb-4">
                Fale conosco por telefone ou WhatsApp
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Entrar em Contato
              </Button>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Nossa equipe especializada está pronta para esclarecer todas as suas dúvidas sobre exames e procedimentos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8">
                Falar no WhatsApp
              </Button>
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-primary">
                Ligar Agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}