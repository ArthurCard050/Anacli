'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, ArrowLeft, Search, AlertTriangle, Phone 
} from 'lucide-react';
import Link from 'next/link';

interface GlossaryTerm {
  sigla: string;
  nome: string;
  categoria: 'Hemograma' | 'Tireoide' | 'Lipídios' | 'Renal' | 'Outros';
  descricao: string;
  valorReferencia: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    sigla: 'VCM',
    nome: 'Volume Corpuscular Médio',
    categoria: 'Hemograma',
    descricao: 'Mede o tamanho médio dos glóbulos vermelhos (hemácias). Valores baixos podem indicar anemia microcítica (como por deficiência de ferro), enquanto valores altos podem indicar anemias macrocíticas (como por deficiência de vitamina B12 ou de ácido fólico).',
    valorReferencia: '80 a 100 fl (fentolitros)'
  },
  {
    sigla: 'HCM',
    nome: 'Hemoglobina Corpuscular Média',
    categoria: 'Hemograma',
    descricao: 'Avalia o peso da hemoglobina dentro de cada glóbulo vermelho, responsável pelo transporte de oxigênio e pela cor vermelha do sangue. Auxilia a discernir anemias hipocrômicas ou normocrômicas.',
    valorReferencia: '26 a 34 pg (picogramas)'
  },
  {
    sigla: 'TSH',
    nome: 'Hormônio Tireoestimulante',
    categoria: 'Tireoide',
    descricao: 'Hormônio hipofisário encarregado de estimular a produção hormonal da tireoide. Índices altos sugerem hipofunção tireoidiana (hipotireoidismo), enquanto taxas baixas apontam hiperatividade (hipertireoidismo).',
    valorReferencia: '0.4 a 4.5 mUI/L (variável de acordo com o laboratório)'
  },
  {
    sigla: 'T4 Livre',
    nome: 'Tiroxina Livre',
    categoria: 'Tireoide',
    descricao: 'O principal hormônio produzido ativamente pela glândula tireoide circulando livre de ligações proteicas no organismo. Coavaliado com o TSH para detalhar disfunções metabólicas.',
    valorReferencia: '0.7 a 1.8 ng/dL'
  },
  {
    sigla: 'HDL',
    nome: 'Colesterol de Alta Densidade (Bom)',
    categoria: 'Lipídios',
    descricao: 'Lipoproteína protetora que captura gordura excedente dos tecidos e artérias conduzindo-a ao fígado para descarte biliar. Níveis maiores indicam melhor proteção cardiovascular.',
    valorReferencia: 'Desejável acima de 40 mg/dL (homens) e 50 mg/dL (mulheres)'
  },
  {
    sigla: 'LDL',
    nome: 'Colesterol de Baixa Densidade (Ruim)',
    categoria: 'Lipídios',
    descricao: 'Gordura que, em quantidades elevadas, deposita-se nas artérias gerando aterosclerose (placas rígidas) e elevando exponencialmente o risco de infartos e AVCs.',
    valorReferencia: 'Desejável abaixo de 100 mg/dL (variável por perfil de risco)'
  },
  {
    sigla: 'Triglicerídeos',
    nome: 'Triglicérides',
    categoria: 'Lipídios',
    descricao: 'Principais gorduras alimentares usadas como estoque calórico. Excesso severo (acima de 500 mg/dL) pode causar inflamação do pâncreas (pancreatite) e coronariopatias.',
    valorReferencia: 'Desejável abaixo de 150 mg/dL (em jejum)'
  },
  {
    sigla: 'Creatinina',
    nome: 'Creatinina Sérica',
    categoria: 'Renal',
    descricao: 'Subproduto do desgaste muscular expelido exclusivamente pelos rins. Taxas sanguíneas elevadas denotam redução na eficiência de filtração renal.',
    valorReferencia: '0.6 a 1.2 mg/dL (proporcional à massa muscular)'
  },
  {
    sigla: 'Ureia',
    nome: 'Ureia Sérica',
    categoria: 'Renal',
    descricao: 'Composto nitrogenado resultante do metabolismo protéico no fígado. Junto com a creatinina, auxilia a mensurar o nível de filtração e estados de desidratação.',
    valorReferencia: '15 a 45 mg/dL'
  },
  {
    sigla: 'HbA1c',
    nome: 'Hemoglobina Glicada',
    categoria: 'Outros',
    descricao: 'Reflete a média do açúcar no sangue no intervalo de 90 a 120 dias anteriores à coleta. Exame padrão-ouro para diagnóstico e acompanhamento do diabetes.',
    valorReferencia: 'Normal < 5.7%, Pré-diabetes de 5.7 a 6.4%, Diabetes &ge; 6.5%'
  },
  {
    sigla: 'PCR',
    nome: 'Proteína C Reativa',
    categoria: 'Outros',
    descricao: 'Proteína hepática inflamatória aguda. Seus níveis disparam perante processos infecciosos bacterianos, inflamações sistêmicas ou danos teciduais.',
    valorReferencia: 'Normalmente inferior a 3.0 mg/L'
  },
  {
    sigla: 'Leucócitos',
    nome: 'Glóbulos Brancos',
    categoria: 'Hemograma',
    descricao: 'Grupo de células de defesa imunitária. Flutuações para cima indicam processos infecciosos/alérgicos em andamento. Valores abaixo de 4.000 indicam imunodepressão.',
    valorReferencia: '4.000 a 11.000 /mm³'
  }
];

export default function DicionarioClient() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const filteredGlossary = useMemo(() => {
    return GLOSSARY_TERMS.filter(term => {
      const matchesSearch = term.sigla.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            term.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            term.descricao.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Todos' || term.categoria === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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

      <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">Dicionário de Exames</h1>
            <p className="text-xs text-slate-400 mt-0.5">Tradutor de Termos e Siglas Laboratoriais</p>
          </div>
        </div>

        <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8">
          Entenda de forma descomplicada o que significam as principais siglas presentes nos seus resultados de exames de sangue.
        </p>

        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Pesquisar sigla ou termo (ex: VCM, Tireoide...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-slate-800"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
          
          <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {['Todos', 'Hemograma', 'Tireoide', 'Lipídios', 'Renal', 'Outros'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-primary border-primary text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredGlossary.length > 0 ? (
              filteredGlossary.map((term) => (
                <motion.div
                  key={term.sigla}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {term.categoria}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium font-mono">Ref: {term.valorReferencia}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mt-3 mb-1 flex items-baseline gap-2">
                    <span>{term.sigla}</span>
                    <span className="text-xs font-normal text-slate-500">({term.nome})</span>
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed mt-2">
                    {term.descricao}
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-slate-400 flex flex-col items-center justify-center gap-2">
                <AlertTriangle className="h-8 w-8 text-slate-300" />
                <p className="text-sm font-medium">Nenhum resultado para "{searchQuery}".</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA CARD */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Ficou com alguma dúvida sobre seu exame?</h4>
              <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                Nossa equipe médica e técnica está pronta para ajudar. Se preferir, agende uma coleta domiciliar ou tire dúvidas pelo WhatsApp.
              </p>
            </div>
            <a
              href={getWhatsAppLink('Olá! Estava visualizando o dicionário de exames e gostaria de tirar uma dúvida sobre exames.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-xs py-3 px-4 rounded hover:bg-primary/95 transition-all text-center shrink-0 cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5" />
              Tirar Dúvidas
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
