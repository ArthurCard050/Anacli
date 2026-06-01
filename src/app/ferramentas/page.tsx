import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  Activity, Heart, Baby, RefreshCw, Clock, BookOpen, CheckSquare, ArrowRight, ShieldAlert 
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Canal de Ferramentas e Saúde | Anacli Laboratorial',
  description: 'Acesse nossas calculadoras interativas de saúde: HOMA-IR, Função Renal (TFG), Risco Cardiovascular (Framingham), Idade Gestacional, Conversor de Unidades e Planejador de Jejum. Conteúdo e guias de apoio para exames.',
  keywords: [
    'calculadoras de saude',
    'homa-ir',
    'tfg ckd-epi',
    'escore de framingham',
    'calculadora de gravidez',
    'jejum exames laboratoriais',
    'glossario de exames',
    'preparo exames de sangue'
  ],
  openGraph: {
    title: 'Canal de Ferramentas e Saúde | Anacli Laboratorial',
    description: 'Calcule seus índices metabólicos, renais, cardíacos e gestacionais online. Acesse o dicionário de siglas e preparo de exames do Anacli.',
    url: 'https://anacli.com.br/ferramentas',
  },
  alternates: {
    canonical: 'https://anacli.com.br/ferramentas'
  }
}

interface ToolCard {
  id: string;
  title: string;
  description: string;
  category: 'calculadora' | 'guia';
  link: string;
  icon: React.ReactNode;
}

const TOOLS: ToolCard[] = [
  {
    id: 'homa-ir',
    title: 'Calculadora HOMA-IR',
    description: 'Avalie de forma simplificada o risco de resistência insulínica utilizando valores de Glicose e Insulina de Jejum.',
    category: 'calculadora',
    link: '/ferramentas/homa-ir',
    icon: <Activity className="h-6 w-6" />
  },
  {
    id: 'tfg',
    title: 'Função Renal (TFG)',
    description: 'Estime a Taxa de Filtração Glomerular (TFG) com a equação CKD-EPI (2021) sem viés racial a partir da Creatinina.',
    category: 'calculadora',
    link: '/ferramentas/funcao-renal',
    icon: <Activity className="h-6 w-6" />
  },
  {
    id: 'framingham',
    title: 'Risco Cardiovascular',
    description: 'Cruze dados de perfil lipídico, pressão arterial e hábitos para estimar o risco de eventos cardíacos em 10 anos.',
    category: 'calculadora',
    link: '/ferramentas/risco-cardiovascular',
    icon: <Heart className="h-6 w-6" />
  },
  {
    id: 'gestacao',
    title: 'Idade Gestacional e DPP',
    description: 'Estime o tempo de gravidez atual (semanas/dias) e a Data Provável do Parto a partir da data da última menstruação.',
    category: 'calculadora',
    link: '/ferramentas/idade-gestacional',
    icon: <Baby className="h-6 w-6" />
  },
  {
    id: 'conversor',
    title: 'Conversor de Unidades',
    description: 'Converta de maneira rápida valores de Glicose, Colesterol e Creatinina entre sistemas convencional (mg/dL) e internacional.',
    category: 'calculadora',
    link: '/ferramentas/conversor-unidades',
    icon: <RefreshCw className="h-6 w-6" />
  },
  {
    id: 'jejum',
    title: 'Calculadora de Jejum',
    description: 'Planeje o horário exato da sua última refeição antes de vir ao laboratório, baseando-se no agendamento e tempo exigido.',
    category: 'calculadora',
    link: '/ferramentas/calculadora-jejum',
    icon: <Clock className="h-6 w-6" />
  },
  {
    id: 'dicionario',
    title: 'Dicionário de Exames',
    description: 'Entenda a "sopa de letrinhas" dos laudos laboratoriais (VCM, HCM, TSH, PCR) com explicações amigáveis sem jargões.',
    category: 'guia',
    link: '/ferramentas/dicionario-exames',
    icon: <BookOpen className="h-6 w-6" />
  },
  {
    id: 'preparo',
    title: 'Guia de Preparo para Exames',
    description: 'Saiba o que evitar (bebidas alcoólicas, esforço físico) e como se preparar adequadamente nas 24h que antecedem a coleta.',
    category: 'guia',
    link: '/ferramentas/guia-preparo',
    icon: <CheckSquare className="h-6 w-6" />
  }
];

export default function FerramentasIndexPage() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Hero Header Section */}
          <div className="text-center mb-12">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              Canal de Apoio ao Paciente
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3 text-slate-900 tracking-tight">
              Portal de Ferramentas e Saúde
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Explore nossas calculadoras interativas, conversores, dicionário explicativo de termos médicos e guias visuais para ter total controle e clareza sobre os seus exames laboratoriais.
            </p>
          </div>

          {/* Grid Layout of Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => (
              <div 
                key={tool.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                      {tool.icon}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      tool.category === 'calculadora' 
                        ? 'bg-pink-50 text-accent border border-pink-100' 
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {tool.category === 'calculadora' ? 'Calculadora' : 'Guia Informativo'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                    {tool.title}
                  </h3>
                  
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                <Link 
                  href={tool.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider group/link cursor-pointer"
                >
                  Acessar Ferramenta
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

          {/* Clinica Medicos Warning Disclaimer */}
          <div className="mt-12 p-6 rounded-2xl bg-white border border-amber-100 flex items-start gap-4">
            <ShieldAlert className="text-amber-500 h-6 w-6 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">Aviso Legal Importante</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                As ferramentas e calculadoras disponibilizadas neste portal servem unicamente como guia informativo para apoio à saúde e autocuidado do paciente. Os resultados obtidos são estimativas e de caráter educacional. Eles <strong>não substituem</strong> sob qualquer hipótese o diagnóstico médico, a consulta clínica formal ou a prescrição de tratamentos por profissionais de saúde qualificados.
              </p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
