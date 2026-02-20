import { Exam, ExamPackage } from '../types';

// Exames individuais expandidos (15 exames)
export const mockExams: Exam[] = [
  {
    id: 'hemograma-completo',
    name: 'Hemograma Completo',
    slug: 'hemograma-completo',
    description: 'Avaliação completa das células sanguíneas, incluindo glóbulos vermelhos, brancos e plaquetas.',
    shortDescription: 'Análise completa do sangue',
    price: 45.90,
    category: 'check-up',
    deliveryTime: '24h',
    popular: true,
    preparationInfo: [
      'Jejum de 4 horas',
      'Evitar exercícios físicos intensos 24h antes'
    ],
    tags: ['Jejum 4h', 'Resultado 24h', 'Sangue']
  },
  {
    id: 'glicemia-jejum',
    name: 'Glicemia de Jejum',
    slug: 'glicemia-jejum',
    description: 'Medição dos níveis de glicose no sangue para diagnóstico e controle de diabetes.',
    shortDescription: 'Controle de diabetes',
    price: 25.90,
    category: 'diabetes',
    deliveryTime: '24h',
    popular: true,
    preparationInfo: [
      'Jejum de 8 a 12 horas',
      'Pode beber água'
    ],
    tags: ['Jejum 8h', 'Resultado 24h', 'Sangue']
  },
  {
    id: 'colesterol-total',
    name: 'Colesterol Total e Frações',
    slug: 'colesterol-total',
    description: 'Avaliação dos níveis de colesterol total, HDL, LDL e triglicerídeos.',
    shortDescription: 'Perfil lipídico completo',
    price: 55.90,
    originalPrice: 69.90,
    category: 'cardiaco',
    deliveryTime: '24h',
    featured: true,
    preparationInfo: [
      'Jejum de 12 horas',
      'Evitar bebidas alcoólicas 72h antes'
    ],
    tags: ['Jejum 12h', 'Resultado 24h', 'Sangue']
  },
  {
    id: 'tsh',
    name: 'TSH - Hormônio Tireoestimulante',
    slug: 'tsh',
    description: 'Avaliação da função da tireoide através da dosagem do TSH.',
    shortDescription: 'Função da tireoide',
    price: 39.90,
    category: 'tireoide',
    deliveryTime: '48h',
    preparationInfo: [
      'Não requer jejum',
      'Coletar preferencialmente pela manhã'
    ],
    tags: ['Sem jejum', 'Resultado 48h', 'Sangue']
  },
  {
    id: 'vitamina-d',
    name: 'Vitamina D (25-OH)',
    slug: 'vitamina-d',
    description: 'Dosagem da vitamina D para avaliação de deficiência e saúde óssea.',
    shortDescription: 'Saúde óssea e imunidade',
    price: 89.90,
    originalPrice: 120.00,
    category: 'vitaminas',
    deliveryTime: '48h',
    featured: true,
    popular: true,
    preparationInfo: [
      'Não requer jejum'
    ],
    tags: ['Sem jejum', 'Resultado 48h', 'Sangue']
  },
  {
    id: 'vitamina-b12',
    name: 'Vitamina B12',
    slug: 'vitamina-b12',
    description: 'Avaliação dos níveis de vitamina B12, importante para sistema nervoso e produção de células.',
    shortDescription: 'Energia e sistema nervoso',
    price: 65.90,
    category: 'vitaminas',
    deliveryTime: '48h',
    preparationInfo: [
      'Jejum de 4 horas recomendado'
    ],
    tags: ['Jejum 4h', 'Resultado 48h', 'Sangue']
  },
  {
    id: 'ureia-creatinina',
    name: 'Ureia e Creatinina',
    slug: 'ureia-creatinina',
    description: 'Avaliação da função renal através da dosagem de ureia e creatinina.',
    shortDescription: 'Função dos rins',
    price: 35.90,
    category: 'renal',
    deliveryTime: '24h',
    preparationInfo: [
      'Jejum de 4 horas'
    ],
    tags: ['Jejum 4h', 'Resultado 24h', 'Sangue']
  },
  {
    id: 'tgo-tgp',
    name: 'TGO e TGP (Transaminases)',
    slug: 'tgo-tgp',
    description: 'Avaliação da função hepática através das enzimas TGO e TGP.',
    shortDescription: 'Função do fígado',
    price: 42.90,
    category: 'hepatico',
    deliveryTime: '24h',
    preparationInfo: [
      'Jejum de 8 horas'
    ],
    tags: ['Jejum 8h', 'Resultado 24h', 'Sangue']
  },
  {
    id: 'psa-total',
    name: 'PSA Total',
    slug: 'psa-total',
    description: 'Marcador para rastreamento de câncer de próstata em homens.',
    shortDescription: 'Saúde da próstata',
    price: 58.90,
    category: 'hormonal',
    deliveryTime: '48h',
    preparationInfo: [
      'Não requer jejum',
      'Evitar relações sexuais 48h antes'
    ],
    tags: ['Sem jejum', 'Resultado 48h', 'Sangue', 'Homem']
  },
  {
    id: 'beta-hcg',
    name: 'Beta HCG (Teste de Gravidez)',
    slug: 'beta-hcg',
    description: 'Teste de gravidez quantitativo através do sangue.',
    shortDescription: 'Teste de gravidez',
    price: 48.90,
    category: 'hormonal',
    deliveryTime: '24h',
    popular: true,
    preparationInfo: [
      'Não requer jejum'
    ],
    tags: ['Sem jejum', 'Resultado 24h', 'Sangue', 'Mulher']
  },
  {
    id: 'ferritina',
    name: 'Ferritina',
    slug: 'ferritina',
    description: 'Avaliação dos estoques de ferro no organismo.',
    shortDescription: 'Reserva de ferro',
    price: 52.90,
    category: 'vitaminas',
    deliveryTime: '48h',
    preparationInfo: [
      'Jejum de 4 horas'
    ],
    tags: ['Jejum 4h', 'Resultado 48h', 'Sangue']
  },
  {
    id: 'acido-urico',
    name: 'Ácido Úrico',
    slug: 'acido-urico',
    description: 'Dosagem do ácido úrico para diagnóstico de gota e problemas renais.',
    shortDescription: 'Diagnóstico de gota',
    price: 28.90,
    category: 'renal',
    deliveryTime: '24h',
    preparationInfo: [
      'Jejum de 8 horas'
    ],
    tags: ['Jejum 8h', 'Resultado 24h', 'Sangue']
  },
  {
    id: 'eas-urina',
    name: 'EAS - Exame de Urina',
    slug: 'eas-urina',
    description: 'Análise completa da urina para detecção de infecções e problemas renais.',
    shortDescription: 'Análise de urina',
    price: 22.90,
    category: 'renal',
    deliveryTime: '24h',
    popular: true,
    preparationInfo: [
      'Primeira urina da manhã',
      'Higiene íntima antes da coleta'
    ],
    tags: ['Sem jejum', 'Resultado 24h', 'Urina']
  },
  {
    id: 'pcr',
    name: 'PCR - Proteína C Reativa',
    slug: 'pcr',
    description: 'Marcador de inflamação e risco cardiovascular.',
    shortDescription: 'Marcador inflamatório',
    price: 38.90,
    category: 'cardiaco',
    deliveryTime: '48h',
    preparationInfo: [
      'Jejum de 4 horas'
    ],
    tags: ['Jejum 4h', 'Resultado 48h', 'Sangue']
  },
  {
    id: 'hba1c',
    name: 'Hemoglobina Glicada (HbA1c)',
    slug: 'hba1c',
    description: 'Controle do diabetes nos últimos 3 meses.',
    shortDescription: 'Controle glicêmico',
    price: 68.90,
    category: 'diabetes',
    deliveryTime: '48h',
    preparationInfo: [
      'Não requer jejum'
    ],
    tags: ['Sem jejum', 'Resultado 48h', 'Sangue']
  }
];

// Pacotes de exames expandidos
export const mockPackages: ExamPackage[] = [
  {
    id: 'checkup-fitness-essencial',
    title: 'Check-up Fitness Essencial',
    slug: 'checkup-fitness-essencial',
    description: 'Pacote de exames laboratoriais preventivos para quem pratica atividades físicas',
    exams: ['hemograma-completo', 'ferritina', 'glicemia-jejum', 'hba1c', 'colesterol-total', 'ureia-creatinina', 'tgo-tgp', 'tsh'],
    price: 97.00,
    originalPrice: 150.00,
    discount: '35% OFF',
    featured: true,
    benefits: [
      'Hemograma completo',
      'Ferritina',
      'Glicose',
      'Hemoglobina glicada (HbA1c)',
      'Colesterol total',
      'HDL colesterol',
      'LDL colesterol',
      'Triglicerídeos',
      'Ureia',
      'Creatinina',
      'TGO (AST) • TGP (ALT)',
      'Sódio',
      'Potássio',
      'Ácido úrico',
      'TSH',
      'Urina tipo I / Sumário de urina',
      'Sem pedido médico',
      'Economia de R$ 53,00'
    ]
  },
  {
    id: 'checkup-fitness-performance',
    title: 'Check-up Fitness Performance',
    slug: 'checkup-fitness-performance',
    description: 'Pacote completo de exames laboratoriais preventivos para atletas e praticantes de atividades físicas intensas',
    exams: ['hemograma-completo', 'ferritina', 'glicemia-jejum', 'hba1c', 'colesterol-total', 'ureia-creatinina', 'tgo-tgp', 'bilirrubinas', 'cpk', 'acido-latico', 'proteinas-totais', 'tsh'],
    price: 117.00,
    originalPrice: 180.00,
    discount: '35% OFF',
    featured: true,
    benefits: [
      'Hemograma completo',
      'Ferritina',
      'Glicose',
      'Hemoglobina glicada (HbA1c)',
      'Colesterol total',
      'HDL colesterol',
      'LDL colesterol',
      'Triglicerídeos',
      'Ureia',
      'Creatinina',
      'TGO (AST) • TGP (ALT)',
      'Bilirrubinas',
      'Sódio',
      'Potássio • Cálcio',
      'Creatina fosfoquinase (CPK)',
      'Ácido lático',
      'Proteínas totais e frações',
      'Ácido úrico',
      'TSH • Urina I / Sumário de urina',
      'Sem pedido médico',
      'Economia de R$ 63,00'
    ]
  }
];

// Categorias para filtros
export const examCategories = [
  { value: 'todos', label: 'Todos' },
  { value: 'check-up', label: 'Check-ups' },
  { value: 'mulher', label: 'Mulher' },
  { value: 'homem', label: 'Homem' },
  { value: 'vitaminas', label: 'Vitaminas' },
  { value: 'cardiaco', label: 'Cardíaco' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'tireoide', label: 'Tireoide' },
] as const;

// Função helper para buscar exame por ID
export function getExamById(id: string): Exam | undefined {
  return mockExams.find(exam => exam.id === id);
}

// Função helper para buscar pacote por ID
export function getPackageById(id: string): ExamPackage | undefined {
  return mockPackages.find(pkg => pkg.id === id);
}

// Função helper para buscar por termo
export function searchProducts(query: string): (Exam | ExamPackage)[] {
  const lowerQuery = query.toLowerCase();
  const exams = mockExams.filter(exam => 
    exam.name.toLowerCase().includes(lowerQuery) ||
    exam.description.toLowerCase().includes(lowerQuery) ||
    exam.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
  const packages = mockPackages.filter(pkg =>
    pkg.title.toLowerCase().includes(lowerQuery) ||
    pkg.description.toLowerCase().includes(lowerQuery)
  );
  return [...exams, ...packages];
}
