'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ArrowLeft, Calculator, CheckCircle2, AlertCircle, Phone, 
  HelpCircle, Search, Info, ShieldAlert 
} from 'lucide-react';
import Link from 'next/link';

export default function RenalClient() {
  const [creatinine, setCreatinine] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [result, setResult] = useState<number | null>(null);

  const calculateGfr = (e: React.FormEvent) => {
    e.preventDefault();
    const cr = parseFloat(creatinine);
    const ageVal = parseInt(age);
    if (!isNaN(cr) && !isNaN(ageVal) && cr > 0 && ageVal > 0) {
      let gfr = 0;
      if (gender === 'female') {
        const k = 0.7;
        const alpha = -0.241;
        const minVal = Math.min(cr / k, 1);
        const maxVal = Math.max(cr / k, 1);
        gfr = 142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.200) * Math.pow(0.9938, ageVal) * 1.012;
      } else {
        const k = 0.9;
        const alpha = -0.302;
        const minVal = Math.min(cr / k, 1);
        const maxVal = Math.max(cr / k, 1);
        gfr = 142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.200) * Math.pow(0.9938, ageVal);
      }
      setResult(parseFloat(gfr.toFixed(1)));
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
                <h1 className="text-xl font-bold text-slate-900 leading-tight">Calculadora de Função Renal</h1>
                <p className="text-xs text-slate-400 mt-0.5">Estimativa de TFG (Equação CKD-EPI 2021)</p>
              </div>
            </div>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
              Estime sua Taxa de Filtração Glomerular (TFG) inserindo os dados de Creatinina Sérica, idade e sexo biológico.
            </p>

            <form onSubmit={calculateGfr} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Creatinina Sérica (mg/dL)
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="Ex: 0.85"
                    value={creatinine}
                    onChange={(e) => setCreatinine(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Idade (Anos)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 48"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Sexo Biológico
                </label>
                <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      gender === 'female' ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Feminino
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`flex-1 text-center py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      gender === 'male' ? 'bg-white shadow text-slate-900' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Masculino
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg py-3.5 transition-all text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Calculator className="h-4 w-4" />
                Calcular TFG Estimada
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
                      <span className="text-xs text-slate-400 font-medium">Filtração Renal Estimada</span>
                      <p className="text-2xl font-extrabold text-slate-900 mt-1">
                        {result} <span className="text-xs text-slate-400 font-semibold">mL/min/1.73m²</span>
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2.5">
                      {result >= 90 ? (
                        <>
                          <CheckCircle2 className="text-green-500 h-6 w-6 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded">Normal / Excelente</span>
                            <p className="text-[11px] text-slate-400 mt-1">Função renal em níveis plenos.</p>
                          </div>
                        </>
                      ) : result >= 60 ? (
                        <>
                          <CheckCircle2 className="text-emerald-500 h-6 w-6 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">Redução Leve</span>
                            <p className="text-[11px] text-slate-400 mt-1">Normalmente aceitável conforme a idade.</p>
                          </div>
                        </>
                      ) : result >= 45 ? (
                        <>
                          <AlertCircle className="text-amber-500 h-6 w-6 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">Redução Leve a Moderada</span>
                            <p className="text-[11px] text-slate-400 mt-1">Recomenda-se acompanhamento médico.</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="text-rose-500 h-6 w-6 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded">Alerta / Redução Grave</span>
                            <p className="text-[11px] text-slate-400 mt-1">Consulte um nefrologista ou clínico geral.</p>
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
                      <h4 className="text-sm font-bold text-slate-900">Precisa dosar sua Creatinina?</h4>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                        O Anacli oferece dosagem de Creatinina e Ureia de alta precisão. Agende seus exames pelo WhatsApp.
                      </p>
                    </div>
                    <a
                      href={getWhatsAppLink(`Olá! Utilizei a Calculadora de TFG Renal e deu ${result} mL/min. Gostaria de agendar exames de Creatinina e Ureia para avaliação.`)}
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
              O que é a TFG?
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              A <strong>Taxa de Filtração Glomerular (TFG)</strong> mede a quantidade de sangue filtrada pelos rins por minuto. Ela serve como a principal régua de medição da saúde e do funcionamento renal. Níveis reduzidos de filtração por longos períodos podem sinalizar Doença Renal Crônica (DRC).
            </p>
          </div>

          {/* Section 2: Onde encontrar no exame? */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Search className="text-primary h-4.5 w-4.5" />
              Onde achar no meu exame?
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              No seu laudo laboratorial do <strong>Anacli</strong>, procure pela página com exames de <strong>Bioquímica</strong> e busque pelo termo <strong>Creatinina Sérica</strong> ou plasmática. O valor estará expresso em <strong>mg/dL</strong> (geralmente variando entre 0.5 e 1.3 mg/dL).
            </p>
          </div>

          {/* Section 3: CKD-EPI 2021 */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Info className="text-primary h-4.5 w-4.5" />
              A Fórmula CKD-EPI (2021)
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed space-y-2">
              Nossa ferramenta utiliza a mais moderna diretriz de nefrologia recomendada mundialmente: a equação <strong>CKD-EPI de 2021</strong>. Esta fórmula <strong>removeu o coeficiente étnico (raça)</strong> para evitar imprecisões no diagnóstico e garantir equidade clínica na estimativa da filtração glomerular. Ela depende apenas da creatinina sérica, idade e sexo biológico.
            </p>
          </div>

          {/* Section 4: Estágios de Função Renal */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldAlert className="text-primary h-4.5 w-4.5" />
              Estágios da Doença Renal
            </h3>
            <div className="text-slate-500 text-xs md:text-sm leading-relaxed space-y-2.5">
              <p>• <strong>Estágio 1 (&ge; 90):</strong> Função renal normal ou alta.</p>
              <p>• <strong>Estágio 2 (60 a 89):</strong> Perda de função renal discreta.</p>
              <p>• <strong>Estágio 3 (30 a 59):</strong> Perda de função renal moderada (a/b).</p>
              <p>• <strong>Estágio 4 (15 a 29):</strong> Perda de função renal grave.</p>
              <p>• <strong>Estágio 5 (&lt; 15):</strong> Falência renal crônica.</p>
              <p className="text-[10px] text-slate-400 italic pt-1">
                *Nota: A diminuição moderada da TFG é comum com o envelhecimento, mas deve ser sempre monitorada e interpretada em conjunto com exames de urina e de imagem por um médico.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
