'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ArrowLeft, Calculator, CheckCircle2, AlertCircle, Phone, 
  HelpCircle, Search, Info, ShieldAlert 
} from 'lucide-react';
import Link from 'next/link';

export default function HomaClient() {
  const [glucose, setGlucose] = useState<string>('');
  const [insulin, setInsulin] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateHomaIr = (e: React.FormEvent) => {
    e.preventDefault();
    const g = parseFloat(glucose);
    const i = parseFloat(insulin);
    if (!isNaN(g) && !isNaN(i) && g > 0 && i > 0) {
      const homaVal = (g * i) / 405;
      setResult(parseFloat(homaVal.toFixed(2)));
    }
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
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">Calculadora HOMA-IR</h1>
                <p className="text-xs text-slate-400 mt-0.5">Homeostatic Model Assessment of Insulin Resistance</p>
              </div>
            </div>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
              Insira seus valores de glicose e insulina de jejum obtidos em seu último exame para calcular o índice HOMA-IR.
            </p>

            <form onSubmit={calculateHomaIr} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Glicose de Jejum (mg/dL)
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="Ex: 88"
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Insulina de Jejum (µUI/mL)
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="Ex: 9.5"
                  value={insulin}
                  onChange={(e) => setInsulin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-800 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg py-3.5 transition-all text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Calculator className="h-4 w-4" />
                Calcular HOMA-IR
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
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <span className="text-xs text-slate-400 font-medium">Seu Índice HOMA-IR</span>
                      <p className="text-3xl font-extrabold text-slate-900 mt-1">{result}</p>
                    </div>
                    
                    <div className="flex items-center gap-2.5">
                      {result < 2.15 ? (
                        <>
                          <CheckCircle2 className="text-green-500 h-6 w-6 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded">Saudável / Normal</span>
                            <p className="text-[11px] text-slate-400 mt-1">Sem indícios de resistência insulínica.</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="text-amber-500 h-6 w-6 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">Atenção / Alerta</span>
                            <p className="text-[11px] text-slate-400 mt-1">Indica uma provável resistência à insulina.</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* CTA CARD */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-5 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Agende seus exames preventivos</h4>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                        O Anacli realiza coletas rápidas e precisas. Para confirmar e analisar seus índices com segurança, agende um atendimento pelo WhatsApp.
                      </p>
                    </div>
                    <a
                      href={getWhatsAppLink(`Olá! Fiz o cálculo de HOMA-IR e deu ${result}. Gostaria de agendar exames de Glicose e Insulina de Jejum.`)}
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
          
          {/* Section 1: O que é? */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <HelpCircle className="text-primary h-4.5 w-4.5" />
              O que é o HOMA-IR?
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              O <strong>HOMA-IR</strong> é um índice numérico que serve para estimar a <strong>Resistência à Insulina</strong>. A resistência insulínica ocorre quando as células do corpo não respondem adequadamente à insulina, exigindo que o pâncreas produza quantidades cada vez maiores de hormônio para manter a glicose controlada. É um sinalizador precoce importante para a prevenção do <strong>Diabetes Tipo 2</strong> e Síndrome Metabólica.
            </p>
          </div>

          {/* Section 2: Onde encontrar no exame? */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Search className="text-primary h-4.5 w-4.5" />
              Onde achar no meu exame?
            </h3>
            <div className="text-slate-500 text-xs md:text-sm leading-relaxed space-y-3">
              <p>
                No seu laudo de exames emitido pelo <strong>Anacli</strong>, você precisará coletar dois dados específicos:
              </p>
              <ul className="space-y-2 pl-1">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                  <span>
                    <strong>Glicose de Jejum:</strong> Localizada geralmente na seção de <strong>Bioquímica</strong> do laudo. Ela vem expressa em <strong>mg/dL</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                  <span>
                    <strong>Insulina de Jejum:</strong> Localizada na seção de <strong>Hormônios</strong> ou <strong>Imunoensaios</strong>. Expressa em <strong>µUI/mL</strong> (ou mUI/L).
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Como funciona a fórmula? */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Info className="text-primary h-4.5 w-4.5" />
              Como funciona o cálculo?
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-3">
              A fórmula matemática clássica do HOMA-IR cruza os dois hormônios de jejum:
            </p>
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-center font-mono text-xs text-slate-700">
              HOMA-IR = (Glicose × Insulina) / 405
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed mt-3">
              O divisor 405 é um fator constante de conversão necessário quando a glicose está em mg/dL e a insulina em µUI/mL.
            </p>
          </div>

          {/* Section 4: Valores de Referência */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldAlert className="text-primary h-4.5 w-4.5" />
              Valores de Referência
            </h3>
            <div className="text-slate-500 text-xs md:text-sm leading-relaxed space-y-2">
              <p>
                • <strong>Abaixo de 2.15:</strong> Considerado normal e saudável.
              </p>
              <p>
                • <strong>Igual ou superior a 2.15:</strong> Alerta. Pode sugerir resistência periférica à insulina.
              </p>
              <p className="text-[10px] text-slate-400 italic mt-2">
                *Nota: Os limites ideais de HOMA-IR podem variar ligeiramente conforme a idade, o índice de massa corporal (IMC) e as diretrizes médicas aplicadas. Sempre apresente os resultados ao seu médico.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
