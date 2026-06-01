'use client';

import React from 'react';
import { 
  CheckSquare, ArrowLeft, Clock, AlertTriangle, Activity, 
  Info, CheckCircle2, Phone, Heart, RefreshCw 
} from 'lucide-react';
import Link from 'next/link';

interface PrepChecklist {
  titulo: string;
  subtitulo: string;
  icon: React.ReactNode;
  pontos: string[];
}

export default function PreparoClient() {
  const PREPARO_CHECKLISTS: PrepChecklist[] = [
    {
      titulo: 'Jejum Recomendado',
      subtitulo: 'Regra básica para evitar distorções de açúcar e gorduras no sangue.',
      icon: <Clock className="h-6 w-6 text-primary" />,
      pontos: [
        'Respeite o tempo de jejum solicitado (comumente 8h a 12h, dependendo do exame).',
        'Água é permitida em quantidade moderada (evite excesso de hidratação para não hemodiluir a amostra).',
        'Nunca fique mais de 14 horas de jejum absoluto antes de colher sangue.',
        'Não consuma café, chás ou refrigerantes (mesmo sem açúcar) no período de jejum.'
      ]
    },
    {
      titulo: 'Restrição Alcoólica e Tabaco',
      subtitulo: 'Substâncias químicas interferem diretamente no fígado e nas gorduras.',
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
      pontos: [
        'Evite bebidas alcoólicas 72 horas (3 dias) antes de exames de perfil lipídico e triglicerídeos.',
        'Não fume no dia do exame, especialmente nas horas que antecedem a coleta de sangue.',
        'O álcool altera drasticamente as taxas enzimáticas do fígado (Gama GT, TGO e TGP).'
      ]
    },
    {
      titulo: 'Exercício e Esforço Físico',
      subtitulo: 'Atividade física mobiliza proteínas e pode alterar enzimas musculares.',
      icon: <Activity className="h-6 w-6 text-primary" />,
      pontos: [
        'Evite exercícios físicos extenuantes 24h antes da coleta.',
        'Atividades de alta intensidade podem liberar enzimas na circulação (como CK e LDH), falseando resultados.',
        'O estresse físico imediato altera a contagem de leucócitos no sangue.'
      ]
    },
    {
      titulo: 'Medicamentos e Suplementos',
      subtitulo: 'Drogas terapêuticas e vitaminas alteram dosagens bioquímicas.',
      icon: <Info className="h-6 w-6 text-primary" />,
      pontos: [
        'Nunca suspenda remédios de uso contínuo (pressão, coração, tireoide) sem indicação médica.',
        'Informe à recepção todos os medicamentos que utilizou nas últimas semanas.',
        'Suplementos de Biotina (Vitamina B7) devem ser suspensos de 3 a 5 dias antes de exames de tireoide (TSH/T4), pois causam resultados falsamente alterados.'
      ]
    }
  ];

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

      <div className="space-y-8">
        
        {/* Checklists */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
              <CheckSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Guia de Preparo para Exames</h1>
              <p className="text-xs text-slate-400 mt-0.5">Checklist e Instruções de Pré-Coleta</p>
            </div>
          </div>

          <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8">
            Respeitar as diretrizes de preparo é vital para evitar repetições indesejadas e garantir laudos confiáveis. Confira os principais eixos abaixo:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PREPARO_CHECKLISTS.map((list, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-slate-100 bg-slate-50 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    {list.icon}
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-slate-950">{list.titulo}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{list.subtitulo}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mt-2">
                  {list.pontos.map((ponto, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-550 flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{ponto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Alterations */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Info className="text-primary h-5 w-5" />
            O que pode alterar meu exame de sangue?
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mb-6">
            Pequenos desvios na rotina diária podem alterar parâmetros químicos. Entenda os fatores biológicos mais sensíveis:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-lg self-start">
                <Activity className="h-5 w-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Sono Insuficiente</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Noites mal dormidas ativam respostas adrenais. O estresse de vigília eleva a glicemia de jejum e desregula picos do hormônio cortisol e TSH.
              </p>
            </div>
            
            <div className="p-5 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-lg self-start">
                <Heart className="h-5 w-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Estresse Agudo</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Medo excessivo de agulhas ou nervosismo momentâneo liberam hormônios que mobilizam glóbulos brancos de defesa, alterando temporariamente o hemograma.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-lg self-start">
                <RefreshCw className="h-5 w-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-950 uppercase tracking-wider">Suplemento de Biotina</h4>
              <p className="text-xs text-slate-550 leading-relaxed">
                Suplementos de Biotina (vitamina B7) usados para cabelos e unhas ligam-se às proteínas do teste de laboratório, gerando falsas leituras hormonais de tireoide.
              </p>
            </div>
          </div>
        </div>

        {/* CTA CARD */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Pronto para agendar seus exames?</h4>
              <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                Fale com nossa central de agendamento via WhatsApp e escolha o melhor dia e horário para a sua coleta.
              </p>
            </div>
            <a
              href={getWhatsAppLink('Olá! Li o guia de preparo de exames e gostaria de agendar uma coleta.')}
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
  );
}
