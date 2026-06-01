'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, ArrowLeft, Phone, HelpCircle, Info, ShieldAlert 
} from 'lucide-react';
import Link from 'next/link';

export default function ConversorClient() {
  const [glucoseMg, setGlucoseMg] = useState<string>('');
  const [glucoseMmol, setGlucoseMmol] = useState<string>('');
  const [cholMg, setCholMg] = useState<string>('');
  const [cholMmol, setCholMmol] = useState<string>('');
  const [creatinineMg, setCreatinineMg] = useState<string>('');
  const [creatinineUmol, setCreatinineUmol] = useState<string>('');

  const handleGlucoseMgChange = (val: string) => {
    setGlucoseMg(val);
    const numeric = parseFloat(val);
    if (!isNaN(numeric) && numeric > 0) {
      setGlucoseMmol((numeric / 18.016).toFixed(3));
    } else {
      setGlucoseMmol('');
    }
  };

  const handleGlucoseMmolChange = (val: string) => {
    setGlucoseMmol(val);
    const numeric = parseFloat(val);
    if (!isNaN(numeric) && numeric > 0) {
      setGlucoseMg((numeric * 18.016).toFixed(1));
    } else {
      setGlucoseMg('');
    }
  };

  const handleCholMgChange = (val: string) => {
    setCholMg(val);
    const numeric = parseFloat(val);
    if (!isNaN(numeric) && numeric > 0) {
      setCholMmol((numeric / 38.67).toFixed(3));
    } else {
      setCholMmol('');
    }
  };

  const handleCholMmolChange = (val: string) => {
    setCholMmol(val);
    const numeric = parseFloat(val);
    if (!isNaN(numeric) && numeric > 0) {
      setCholMg((numeric * 38.67).toFixed(1));
    } else {
      setCholMg('');
    }
  };

  const handleCreatinineMgChange = (val: string) => {
    setCreatinineMg(val);
    const numeric = parseFloat(val);
    if (!isNaN(numeric) && numeric > 0) {
      setCreatinineUmol((numeric * 88.4).toFixed(1));
    } else {
      setCreatinineUmol('');
    }
  };

  const handleCreatinineUmolChange = (val: string) => {
    setCreatinineUmol(val);
    const numeric = parseFloat(val);
    if (!isNaN(numeric) && numeric > 0) {
      setCreatinineMg((numeric / 88.4).toFixed(3));
    } else {
      setCreatinineMg('');
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
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">Conversor de Unidades</h1>
                <p className="text-xs text-slate-400 mt-0.5">Conversor de Concentração Química de Exames</p>
              </div>
            </div>

            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
              Digite o valor obtido em qualquer campo para converter instantaneamente entre o sistema de massa convencional brasileiro (mg/dL) e o Sistema Internacional (molar).
            </p>

            <div className="space-y-6">
              
              {/* Glucose Conversion */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  1. Glicose
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">mg/dL (Brasil / EUA)</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Ex: 99"
                      value={glucoseMg}
                      onChange={(e) => handleGlucoseMgChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-slate-850 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">mmol/L (Internacional)</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Ex: 5.5"
                      value={glucoseMmol}
                      onChange={(e) => handleGlucoseMmolChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-slate-850 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Cholesterol Conversion */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  2. Colesterol (Total, HDL, LDL, VLDL)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">mg/dL (Brasil / EUA)</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Ex: 190"
                      value={cholMg}
                      onChange={(e) => handleCholMgChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-slate-850 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">mmol/L (Internacional)</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Ex: 4.9"
                      value={cholMmol}
                      onChange={(e) => handleCholMmolChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-slate-850 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Creatinine Conversion */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  3. Creatinina
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">mg/dL (Brasil / EUA)</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Ex: 0.90"
                      value={creatinineMg}
                      onChange={(e) => handleCreatinineMgChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-slate-850 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">µmol/L (Internacional)</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Ex: 79"
                      value={creatinineUmol}
                      onChange={(e) => handleCreatinineUmolChange(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-slate-850 font-medium"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* CTA CARD */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Agende seus exames no Anacli</h4>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                    Resultados com altíssimo controle de qualidade técnico e segurança diagnóstica. Agende de forma rápida no WhatsApp.
                  </p>
                </div>
                <a
                  href={getWhatsAppLink('Olá! Desejo agendar exames laboratoriais de rotina.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-xs py-3 px-4 rounded hover:bg-primary/95 transition-all text-center shrink-0 cursor-pointer"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Agendar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Explanatory Content */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section 1: Por que unidades diferentes? */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <HelpCircle className="text-primary h-4.5 w-4.5" />
              Por que há unidades distintas?
            </h3>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              No Brasil e nos EUA, adota-se comumente a unidade de concentração de massa (<strong>mg/dL</strong> - miligramas por decilitro). Já na Europa e em artigos científicos internacionais, adota-se o Sistema Internacional (SI) em <strong>mmol/L</strong> (milimoles por litro), que reflete a quantidade real de moléculas circulando no volume de sangue.
            </p>
          </div>

          {/* Section 2: Fatores de Conversao */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Info className="text-primary h-4.5 w-4.5" />
              Fatores Matemáticos Utilizados
            </h3>
            <div className="text-slate-500 text-xs md:text-sm leading-relaxed space-y-3">
              <p>
                A conversão depende do <strong>peso molecular</strong> de cada composto biológico:
              </p>
              
              <div className="space-y-2 font-mono text-[11px] bg-slate-50 p-3 rounded-lg text-slate-700">
                <p>• Glicose: mg/dL = mmol/L × 18.016</p>
                <p>• Colesterol: mg/dL = mmol/L × 38.67</p>
                <p>• Creatinina: mg/dL = µmol/L ÷ 88.4</p>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                *Nota: Devido a essas diferenças químicas estruturais, o fator multiplicador varia para cada metabólito do sangue.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
