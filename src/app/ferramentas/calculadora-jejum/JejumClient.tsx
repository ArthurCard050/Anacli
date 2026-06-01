'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, ArrowLeft, Calculator, Phone, HelpCircle, Info, ShieldAlert 
} from 'lucide-react';
import Link from 'next/link';

export default function JejumClient() {
  const [examTime, setExamTime] = useState<string>('08:00');
  const [fastingHours, setFastingHours] = useState<string>('12');
  const [result, setResult] = useState<{ limitTime: string; isPreviousDay: boolean } | null>(null);

  const calculateJejum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTime) return;
    const [hours, minutes] = examTime.split(':').map(Number);
    const fastingAmount = parseInt(fastingHours);

    const examDate = new Date();
    examDate.setHours(hours, minutes, 0, 0);

    const fastingStartDate = new Date(examDate.getTime() - fastingAmount * 60 * 60 * 1000);
    const formatTime = fastingStartDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const isPrevDay = fastingStartDate.getDate() !== examDate.getDate() || fastingStartDate.getMonth() !== examDate.getMonth();

    setResult({ limitTime: formatTime, isPreviousDay: isPrevDay });
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
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">Calculadora de Jejum</h1>
                <p className="text-xs text-slate-400 mt-0.5">Planejador de Horário de Preparo</p>
              </div>
            </div>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
              Evite invalidar seus exames. Escolha a hora marcada para sua coleta e a quantidade de horas de jejum recomendada para saber exatamente quando parar de comer.
            </p>

            <form onSubmit={calculateJejum} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Horário da Coleta
                  </label>
                  <input
                    type="time"
                    required
                    value={examTime}
                    onChange={(e) => setExamTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Horas de Jejum Exigidas
                  </label>
                  <select
                    value={fastingHours}
                    onChange={(e) => setFastingHours(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-805 font-medium"
                  >
                    <option value="12">12 horas (Lípidos/Triglicerídeos completos)</option>
                    <option value="8">8 horas (Glicemia de jejum)</option>
                    <option value="4">4 horas (Hemograma e coletas básicas)</option>
                    <option value="0">Sem necessidade de jejum</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg py-3.5 transition-all text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Calculator className="h-4 w-4" />
                Calcular Início do Jejum
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
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Horário Recomendado</h3>
                  
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-4">
                    <Info className="text-primary h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs md:text-sm text-slate-600 font-medium">
                        Você deve iniciar seu jejum absoluto às{' '}
                        <strong className="text-slate-900 text-base md:text-lg font-bold">{result.limitTime}</strong>{' '}
                        {result.isPreviousDay ? 'do dia anterior' : 'do mesmo dia'} do exame.
                      </p>
                      
                      <div className="mt-3 text-[11px] text-slate-400 space-y-1.5">
                        <p>• Beba água em quantidade normal para se manter hidratado.</p>
                        <p>• Balas, chás e café (inclusive sem açúcar) quebram o jejum.</p>
                        <p>• Mantenha o uso de seus remédios de rotina (salvo contraindicação médica).</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA CARD */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-5 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Quer agendar sua coleta?</h4>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                        Agende seus exames no Anacli. Garantimos rapidez no atendimento físico e na liberação digital de seus laudos.
                      </p>
                    </div>
                    <a
                      href={getWhatsAppLink(`Olá! Desejo agendar exames para as ${examTime} e precisarei de ${fastingHours}h de jejum.`)}
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
          
          {/* Section 1: O que e jejum? */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <HelpCircle className="text-primary h-4.5 w-4.5" />
              O que significa jejum laboratorial?
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Estar em jejum significa <strong>abster-se de alimentos sólidos e bebidas</strong> (exceto água) por um período contínuo. Alimentos ingeridos desencadeiam a digestão e liberam hormônios e nutrientes na circulação, alterando taxas de glicose, ferro, cálcio e triglicerídeos.
            </p>
          </div>

          {/* Section 2: Beber agua */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Info className="text-primary h-4.5 w-4.5" />
              Pode beber água?
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              <strong>Sim.</strong> A ingestão de água pura de forma moderada é permitida e não quebra o jejum. Ficar excessivamente desidratado dificulta a visualização das veias e a punção pelo profissional de coleta. Evite apenas ingerir copos excessivos de água logo antes de colher.
            </p>
          </div>

          {/* Section 3: Perigo jejum prolongado */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldAlert className="text-primary h-4.5 w-4.5" />
              Perigos do Jejum Prolongado
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Ficar mais de <strong>14 horas em jejum absoluto é prejudicial</strong> e distorce os resultados. O corpo inicia um processo de autofagia e lipólise, liberando ácidos graxos livres e corpos cetônicos no sangue, o que eleva artificialmente gorduras e reduz perigosamente a glicose (hipoglicemia).
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
