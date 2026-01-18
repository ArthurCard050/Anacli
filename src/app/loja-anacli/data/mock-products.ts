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
    id: 'checkup-completo',
    title: 'Check-up Completo',
    slug: 'checkup-completo',
    description: 'Avaliação geral de saúde com os principais exames',
    exams: ['hemograma-completo', 'glicemia-jejum', 'colesterol-total'],
    price: 189.90,
    originalPrice: 249.90,
    discount: '20% OFF',
    featured: true,
    benefits: [
      'Hemograma Completo',
      'Glicemia de Jejum',
      'Colesterol Total e Frações',
      'Economia de R$ 60,00'
    ]
  },
  {
    id: 'perfil-hormonal',
    title: 'Perfil Hormonal Feminino',
    slug: 'perfil-hormonal',
    description: 'Avaliação completa dos hormônios femininos',
    exams: ['tsh'],
    price: 249.90,
    originalPrice: 299.90,
    discount: '15% OFF',
    featured: true,
    benefits: [
      'TSH',
      'T4 Livre',
      'Prolactina',
      'Estradiol',
      'Economia de R$ 50,00'
    ]
  },
  {
    id: 'vitaminas-essenciais',
    title: 'Vitaminas Essenciais',
    slug: 'vitaminas-essenciais',
    description: 'Dosagem das principais vitaminas para sua saúde',
    exams: ['vitamina-d', 'vitamina-b12'],
    price: 159.90,
    originalPrice: 189.90,
    discount: 'PROMO',
    featured: true,
    benefits: [
      'Vitamina D',
      'Vitamina B12',
      'Ferro Sérico',
      'Economia de R$ 30,00'
    ]
  },
  {
    id: 'perfil-cardiaco',
    title: 'Perfil Cardíaco',
    slug: 'perfil-cardiaco',
    description: 'Avaliação completa da saúde cardiovascular',
    exams: ['colesterol-total'],
    price: 199.90,
    originalPrice: 259.90,
    discount: '23% OFF',
    benefits: [
      'Colesterol Total e Frações',
      'Triglicerídeos',
      'PCR (Proteína C Reativa)',
      'Homocisteína'
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
