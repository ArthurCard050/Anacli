import { Exam, ExamPackage } from '../types';

// Exames individuais (mock data)
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
    tags: ['sangue', 'básico', 'check-up']
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
    tags: ['diabetes', 'glicose', 'jejum']
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
    tags: ['coração', 'colesterol', 'lipídico']
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
    tags: ['tireoide', 'hormônio', 'tsh']
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
    preparationInfo: [
      'Não requer jejum'
    ],
    tags: ['vitamina', 'ossos', 'imunidade']
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
    tags: ['vitamina', 'energia', 'nervoso']
  }
];

// Pacotes de exames (mock data)
export const mockPackages: ExamPackage[] = [
  {
    id: 'checkup-fitness-performance',
    title: 'Check-up Fitness PERFORMANCE',
    slug: 'checkup-fitness-performance',
    description: 'Pacote de exames laboratoriais preventivos',
    exams: ['hemograma-completo', 'glicemia-jejum', 'colesterol-total', 'tsh'],
    price: 117.00,
    originalPrice: 150.00,
    discount: '22% OFF',
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
      'Sem pedido médico'
    ]
  },
  {
    id: 'checkup-fitness-essencial',
    title: 'Check-up Fitness ESSENCIAL',
    slug: 'checkup-fitness-essencial',
    description: 'Pacote de exames laboratoriais preventivos',
    exams: ['hemograma-completo', 'glicemia-jejum', 'colesterol-total', 'tsh'],
    price: 97.00,
    originalPrice: 130.00,
    discount: '25% OFF',
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
      'TSH •',
      'Urina tipo I / Sumário de urina',
      'Sem pedido médico'
    ]
  }
];

// Categorias para filtros
export const examCategories = [
  { value: 'check-up', label: 'Check-up' },
  { value: 'hormonal', label: 'Hormonal' },
  { value: 'vitaminas', label: 'Vitaminas' },
  { value: 'cardiaco', label: 'Cardíaco' },
  { value: 'hepatico', label: 'Hepático' },
  { value: 'renal', label: 'Renal' },
  { value: 'tireoide', label: 'Tireoide' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'alergias', label: 'Alergias' },
  { value: 'dst', label: 'DST' },
  { value: 'outros', label: 'Outros' }
] as const;
