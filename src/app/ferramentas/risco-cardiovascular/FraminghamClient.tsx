'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ArrowLeft, Calculator, CheckCircle2, AlertCircle, Phone, 
  HelpCircle, Search, Info, ShieldAlert 
} from 'lucide-react';
import Link from 'next/link';

export default function FraminghamClient() {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [totalChol, setTotalChol] = useState<string>('');
  const [hdl, setHdl] = useState<string>('');
  const [systolicBP, setSystolicBP] = useState<string>('');
  const [bpTreated, setBpTreated] = useState<boolean>(false);
  const [smoker, setSmoker] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);

  const calculateFramingham = (e: React.FormEvent) => {
    e.preventDefault();
    const ageVal = parseInt(age);
    const cholVal = parseFloat(totalChol);
    const hdlVal = parseFloat(hdl);
    const bpVal = parseFloat(systolicBP);

    if (isNaN(ageVal) || isNaN(cholVal) || isNaN(hdlVal) || isNaN(bpVal)) return;

    let points = 0;

    // Age
    if (gender === 'male') {
      if (ageVal >= 30 && ageVal <= 34) points += 0;
      else if (ageVal >= 35 && ageVal <= 39) points += 2;
      else if (ageVal >= 40 && ageVal <= 44) points += 5;
      else if (ageVal >= 45 && ageVal <= 49) points += 6;
      else if (ageVal >= 50 && ageVal <= 54) points += 8;
      else if (ageVal >= 55 && ageVal <= 59) points += 10;
      else if (ageVal >= 60 && ageVal <= 64) points += 11;
      else if (ageVal >= 65 && ageVal <= 69) points += 12;
      else if (ageVal >= 70 && ageVal <= 74) points += 14;
      else points += 15;
    } else {
      if (ageVal >= 30 && ageVal <= 34) points += 0;
      else if (ageVal >= 35 && ageVal <= 39) points += 2;
      else if (ageVal >= 40 && ageVal <= 44) points += 4;
      else if (ageVal >= 45 && ageVal <= 49) points += 5;
      else if (ageVal >= 50 && ageVal <= 54) points += 7;
      else if (ageVal >= 55 && ageVal <= 59) points += 8;
      else if (ageVal >= 60 && ageVal <= 64) points += 9;
      else if (ageVal >= 65 && ageVal <= 69) points += 10;
      else if (ageVal >= 70 && ageVal <= 74) points += 11;
      else points += 12;
    }

    // HDL
    if (hdlVal >= 60) points -= 1;
    else if (hdlVal >= 50 && hdlVal <= 59) points += 0;
    else if (hdlVal >= 45 && hdlVal <= 49) points += 1;
    else if (hdlVal >= 35 && hdlVal <= 44) points += 1;
    else points += 2; // < 35

    // Total Cholesterol
    if (cholVal < 160) points += 0;
    else if (cholVal >= 160 && cholVal < 200) points += 1;
    else if (cholVal >= 200 && cholVal < 240) points += 2;
    else points += 3; // >= 240

    // Systolic BP & Treatment
    if (bpTreated) {
      if (bpVal < 120) points += 0;
      else if (bpVal >= 120 && bpVal < 130) points += 2;
      else if (bpVal >= 130 && bpVal < 140) points += 3;
      else if (bpVal >= 140 && bpVal < 160) points += 4;
      else points += 5;
    } else {
      if (bpVal < 120) points += 0;
      else if (bpVal >= 120 && bpVal < 130) points += 1;
      else if (bpVal >= 130 && bpVal < 140) points += 2;
      else if (bpVal >= 140 && bpVal < 160) points += 3;
      else points += 4;
    }

    // Smoker
    if (smoker) {
      points += 4;
    }

    // Map points to risk percentage
    let risk = 0;
    if (gender === 'male') {
      if (points <= 0) risk = 0.9;
      else if (points === 1) risk = 1.1;
      else if (points === 2) risk = 1.4;
      else if (points === 3) risk = 1.8;
      else if (points === 4) risk = 2.3;
      else if (points === 5) risk = 2.9;
      else if (points === 6) risk = 3.7;
      else if (points === 7) risk = 4.7;
      else if (points === 8) risk = 5.9;
      else if (points === 9) risk = 7.5;
      else if (points === 10) risk = 9.4;
      else if (points === 11) risk = 11.7;
      else if (points === 12) risk = 14.5;
      else if (points === 13) risk = 18.0;
      else if (points === 14) risk = 22.1;
      else if (points === 15) risk = 26.8;
      else risk = 32.5;
    } else {
      if (points <= 0) risk = 0.9;
      else if (points === 1) risk = 1.0;
      else if (points === 2) risk = 1.2;
      else if (points === 3) risk = 1.5;
      else if (points === 4) risk = 1.7;
      else if (points === 5) risk = 2.0;
      else if (points === 6) risk = 2.4;
      else if (points === 7) risk = 2.8;
      else if (points === 8) risk = 3.3;
      else if (points === 9) risk = 3.9;
      else if (points === 10) risk = 4.6;
      else if (points === 11) risk = 5.4;
      else if (points === 12) risk = 6.3;
      else if (points === 13) risk = 7.4;
      else if (points === 14) risk = 8.6;
      else if (points === 15) risk = 10.0;
      else if (points === 16) risk = 11.6;
      else if (points === 17) risk = 13.5;
      else if (points === 18) risk = 15.6;
      else if (points === 19) risk = 18.0;
      else if (points === 20) risk = 20.7;
      else risk = 25.0;
    }

    setResult(risk);
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
                <Heart className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">Calculadora de Risco Cardíaco</h1>
                <p className="text-xs text-slate-400 mt-0.5">Escore de Risco Cardiovascular de Framingham</p>
              </div>
            </div>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
              Estime sua porcentagem de risco de infarto, angina ou AVC nos próximos 10 anos inserindo seus dados clínicos e laboratoriais básicos.
            </p>

            <form onSubmit={calculateFramingham} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Idade (30 a 79 anos)
                  </label>
                  <input
                    type="number"
                    required
                    min="30"
                    max="79"
                    placeholder="Ex: 52"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-800 font-medium"
                  />
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

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Colesterol Total (mg/dL)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 215"
                    value={totalChol}
                    onChange={(e) => setTotalChol(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    HDL - Colesterol Bom (mg/dL)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 48"
                    value={hdl}
                    onChange={(e) => setHdl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Pressão Arterial Sistólica (mmHg)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 135 (do clássico 13,5 por 8)"
                    value={systolicBP}
                    onChange={(e) => setSystolicBP(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={bpTreated}
                    onChange={(e) => setBpTreated(e.target.checked)}
                    className="custom-checkbox shrink-0"
                  />
                  <span className="text-xs font-semibold text-slate-700">Faço tratamento medicamentoso para pressão alta</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none mt-1">
                  <input
                    type="checkbox"
                    checked={smoker}
                    onChange={(e) => setSmoker(e.target.checked)}
                    className="custom-checkbox shrink-0"
                  />
                  <span className="text-xs font-semibold text-slate-700">Sou fumante ativo / tabagista</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg py-3.5 transition-all text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Calculator className="h-4 w-4" />
                Calcular Escore de Risco
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
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Risco Estimado</h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <span className="text-xs text-slate-400 font-medium">Chance de evento cardíaco em 10 anos</span>
                      <p className="text-3xl font-extrabold text-slate-900 mt-1">{result}%</p>
                    </div>
                    
                    <div className="flex items-center gap-2.5">
                      {result < 10 ? (
                        <>
                          <CheckCircle2 className="text-green-500 h-6 w-6 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded">Risco Baixo (&lt; 10%)</span>
                            <p className="text-[11px] text-slate-400 mt-1">Ótimo. Continue cultivando bons hábitos.</p>
                          </div>
                        </>
                      ) : result <= 20 ? (
                        <>
                          <AlertCircle className="text-amber-500 h-6 w-6 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">Risco Moderado (10% - 20%)</span>
                            <p className="text-[11px] text-slate-400 mt-1">Atenção ao colesterol e acompanhamento médico.</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="text-rose-500 h-6 w-6 shrink-0" />
                          <div>
                            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded">Risco Elevado (&gt; 20%)</span>
                            <p className="text-[11px] text-slate-400 mt-1">Altamente recomendado marcar uma consulta.</p>
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
                      <h4 className="text-sm font-bold text-slate-900">Agende seu Lipidograma Completo</h4>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                        O Anacli realiza a medição de Colesterol, Triglicerídeos e exames metabólicos completos. Agende seu atendimento via WhatsApp.
                      </p>
                    </div>
                    <a
                      href={getWhatsAppLink(`Olá! Utilizei o Escore de Framingham no site e deu risco de ${result}%. Gostaria de agendar exames de Colesterol Total e frações.`)}
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
              O que é o Escore de Framingham?
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Baseado no histórico estudo clínico da cidade de Framingham (EUA), este algoritmo calcula a probabilidade estatística de um indivíduo sofrer infarto do miocárdio, angina ou acidente vascular cerebral (AVC) nos próximos 10 anos. Ele é amplamente utilizado por cardiologistas e clínicos gerais em check-ups de rotina.
            </p>
          </div>

          {/* Section 2: Onde encontrar no exame? */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Search className="text-primary h-4.5 w-4.5" />
              Onde achar no meu exame?
            </h3>
            <div className="text-slate-500 text-xs md:text-sm leading-relaxed space-y-2">
              <p>
                Consulte o laudo do <strong>Anacli</strong> na seção de <strong>Lipidograma</strong> ou <strong>Perfil Lipídico</strong>:
              </p>
              <p>
                • <strong>Colesterol Total:</strong> O somatório de todos os tipos de colesterol.
              </p>
              <p>
                • <strong>HDL-Colesterol:</strong> O colesterol de alta densidade (conhecido popularmente como colesterol "bom").
              </p>
              <p>
                A <strong>Pressão Arterial Sistólica</strong> é o valor máximo verificado no braço com aparelho de pressão (ex: 130 mmHg para pressão sistólica de 13).
              </p>
            </div>
          </div>

          {/* Section 3: Fatores de risco */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Info className="text-primary h-4.5 w-4.5" />
              Fatores Modificáveis
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Diferente da idade ou do sexo biológico, os valores de <strong>Colesterol Total e HDL</strong>, a <strong>pressão arterial</strong> e o <strong>tabagismo</strong> são considerados fatores de risco modificáveis. Mudanças alimentares direcionadas, a cessação do fumo e tratamentos recomendados por médicos são fundamentais para reduzir significativamente a sua pontuação no escore.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
