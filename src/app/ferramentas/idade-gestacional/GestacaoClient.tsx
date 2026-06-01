'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Baby, ArrowLeft, Calculator, CheckCircle2, AlertCircle, Phone, 
  HelpCircle, Search, Info, Calendar 
} from 'lucide-react';
import Link from 'next/link';

export default function GestacaoClient() {
  const [dumDate, setDumDate] = useState<string>('');
  const [result, setResult] = useState<{ weeks: number; days: number; dpp: string } | null>(null);

  const calculateGestacao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dumDate) return;
    const dum = new Date(dumDate);
    dum.setHours(12, 0, 0, 0); // Evitar bugs de fuso horário
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    const diffTime = today.getTime() - dum.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0 || diffDays > 300) {
      alert('Por favor, insira uma data de menstruação válida no passado (limite de 300 dias).');
      return;
    }

    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    const dppDate = new Date(dum.getTime() + 280 * 24 * 60 * 60 * 1000);
    const dppString = dppDate.toLocaleDateString('pt-BR');

    setResult({ weeks, days, dpp: dppString });
  };

  const getWhatsAppLink = (message: string) => {
    return `https://api.whatsapp.com/send?phone=557530300030&text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="container mx-auto px-6 max-w-4xl">
      
      {/* Back Button */}
      <Link 
        href="/ferramentas" 
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-wider mb-6 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para o Portal
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Calculator Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                <Baby className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">Idade Gestacional & DPP</h1>
                <p className="text-xs text-slate-400 mt-0.5">Calculadora de Semanas e Parto</p>
              </div>
            </div>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
              Saiba em qual semana de gravidez você se encontra e obtenha uma previsão aproximada da Data Provável do Parto (DPP) a partir da data do primeiro dia da sua última menstruação (DUM).
            </p>

            <form onSubmit={calculateGestacao} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Primeiro dia da Última Menstruação (DUM)
                </label>
                <input
                  type="date"
                  required
                  value={dumDate}
                  onChange={(e) => setDumDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-800 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg py-3.5 transition-all text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Calculator className="h-4 w-4" />
                Calcular Tempo Gestacional
              </button>
            </form>

            <AnimatePresence>
              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 border-t border-slate-100 pt-6"
                >
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Resultado Calculado</h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <span className="text-xs text-slate-400 font-medium">Tempo de Gravidez Atual</span>
                      <p className="text-2xl font-extrabold text-slate-900 mt-1">
                        {result.weeks} semanas e {result.days} dias
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-xs text-slate-400 font-medium">Data Provável do Parto (DPP)</span>
                      <p className="text-xl font-bold text-primary mt-1 flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {result.dpp}
                      </p>
                    </div>
                  </div>

                  {/* CTA CARD */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-5 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Precisa fazer exames de Pré-Natal?</h4>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                        O Anacli realiza todos os exames do acompanhamento pré-natal e exames de Beta-hCG com laudos rápidos. Agende com facilidade no WhatsApp.
                      </p>
                    </div>
                    <a
                      href={getWhatsAppLink(`Olá! Estou com ${result.weeks} semanas de gestação e gostaria de agendar meus exames pré-natais.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-xs py-3 px-4 rounded hover:bg-primary/95 transition-all text-center shrink-0 cursor-pointer"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      Agendar no WhatsApp
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Explanatory Content */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section 1: O que é a DUM? */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <HelpCircle className="text-primary h-4.5 w-4.5" />
              O que é a DUM?
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              A <strong>DUM</strong> representa a <strong>Data da Última Menstruação</strong> (especificamente o primeiro dia de sangramento). Como na maioria das vezes é impossível saber o dia exato da concepção, a medicina obstétrica adota internacionalmente o primeiro dia do último ciclo menstrual como o marco inicial para contar a idade gestacional.
            </p>
          </div>

          {/* Section 2: Estimativa de Beta-hCG */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Search className="text-primary h-4.5 w-4.5" />
              Semanas x Taxa de Beta-hCG
            </h3>
            <div className="text-slate-500 text-xs md:text-sm leading-relaxed space-y-3">
              <p>
                Se você não lembra da DUM ou deseja cruzar o cálculo com seu laudo de <strong>Beta-hCG Quantitativo</strong> do Anacli, veja as faixas aproximadas de hormônio no sangue:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-slate-100 text-left text-[11px] mt-2">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
                      <th className="p-2 border-r border-slate-100">Tempo de Gestação</th>
                      <th className="p-2">Nível de HCG (mUI/mL)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 text-slate-600">
                      <td className="p-2 border-r border-slate-100 font-semibold">3 semanas</td>
                      <td className="p-2">5,8 a 71,2</td>
                    </tr>
                    <tr className="border-b border-slate-100 text-slate-600">
                      <td className="p-2 border-r border-slate-100 font-semibold">4 semanas</td>
                      <td className="p-2">9,5 a 750</td>
                    </tr>
                    <tr className="border-b border-slate-100 text-slate-600">
                      <td className="p-2 border-r border-slate-100 font-semibold">5 semanas</td>
                      <td className="p-2">217 a 7.138</td>
                    </tr>
                    <tr className="border-b border-slate-100 text-slate-600">
                      <td className="p-2 border-r border-slate-100 font-semibold">6 semanas</td>
                      <td className="p-2">158 a 31.795</td>
                    </tr>
                    <tr className="border-b border-slate-100 text-slate-600">
                      <td className="p-2 border-r border-slate-100 font-semibold">7 a 8 semanas</td>
                      <td className="p-2">3.697 a 163.563</td>
                    </tr>
                    <tr className="text-slate-600">
                      <td className="p-2 border-r border-slate-100 font-semibold">9 a 12 semanas</td>
                      <td className="p-2">25.720 a 288.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-slate-400 italic mt-2">
                *Nota: Os níveis de hCG variam drasticamente de mulher para mulher. Apenas uma ultrassonografia gestacional precoce pode confirmar com exatidão científica a idade fetal.
              </p>
            </div>
          </div>

          {/* Section 3: Data Provável do Parto */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Info className="text-primary h-4.5 w-4.5" />
              Como a DPP é calculada?
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              O cálculo da Data Provável do Parto é baseado na <strong>Regra de Naegele</strong>. Assume-se que uma gestação dura cerca de <strong>280 dias</strong> (ou 40 semanas) a partir da DUM. Somam-se 9 meses e 7 dias ao primeiro dia da última menstruação para obter a data aproximada do nascimento.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
