export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorBio: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'importancia-exames-preventivos',
    title: 'A Importância dos Exames Preventivos na Terceira Idade',
    excerpt: 'Descubra quais exames são essenciais para manter a saúde em dia após os 60 anos e como a prevenção pode salvar vidas.',
    content: `
      <p>A terceira idade é uma fase da vida que requer cuidados especiais com a saúde. Os exames preventivos desempenham um papel fundamental na detecção precoce de doenças e na manutenção da qualidade de vida.</p>

      <h2>Por que os exames preventivos são importantes?</h2>
      <p>Com o envelhecimento, o corpo passa por diversas mudanças naturais que podem aumentar o risco de desenvolvimento de certas condições de saúde. A detecção precoce através de exames regulares pode fazer toda a diferença no tratamento e prognóstico de diversas doenças.</p>

      <p>Estudos mostram que pessoas que realizam check-ups regulares têm maior expectativa de vida e melhor qualidade de vida na terceira idade. Isso porque muitas doenças, quando detectadas precocemente, podem ser tratadas de forma mais eficaz.</p>

      <h2>Principais exames recomendados</h2>
      <p>Para pessoas acima de 60 anos, alguns exames são especialmente importantes para monitorar a saúde:</p>

      <ul>
        <li><strong>Hemograma completo:</strong> Avalia a saúde geral do sangue</li>
        <li><strong>Glicemia:</strong> Detecta diabetes e pré-diabetes</li>
        <li><strong>Colesterol:</strong> Monitora riscos cardiovasculares</li>
        <li><strong>Função renal:</strong> Avalia a saúde dos rins</li>
        <li><strong>Função hepática:</strong> Verifica o funcionamento do fígado</li>
      </ul>

      <h2>Frequência recomendada</h2>
      <p>A frequência dos exames deve ser definida pelo médico, mas geralmente recomenda-se um check-up completo anualmente para pessoas acima de 60 anos, ou com maior frequência se houver condições pré-existentes.</p>

      <p>Lembre-se: a prevenção é sempre o melhor remédio. Não espere sentir sintomas para procurar um médico e realizar seus exames de rotina.</p>
    `,
    category: 'Prevenção',
    author: 'Dr. Carlos Silva',
    authorBio: 'Médico especialista em medicina preventiva com mais de 15 anos de experiência em geriatria e cuidados com a terceira idade.',
    date: '15 Jan 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop',
    tags: ['Prevenção', 'Terceira Idade', 'Saúde'],
  },
  {
    id: '2',
    slug: 'hemograma-completo-guia',
    title: 'Hemograma Completo: Entenda Cada Resultado',
    excerpt: 'Guia completo para interpretar os valores do hemograma e entender o que cada alteração pode significar para sua saúde.',
    content: `
      <p>O hemograma é um dos exames mais solicitados pelos médicos e fornece informações valiosas sobre a saúde geral do paciente. Entender seus resultados pode ajudar você a ter conversas mais produtivas com seu médico.</p>

      <h2>O que é o Hemograma?</h2>
      <p>O hemograma completo é um exame de sangue que avalia três tipos principais de células: glóbulos vermelhos (hemácias), glóbulos brancos (leucócitos) e plaquetas. Cada um desses componentes tem funções específicas no organismo.</p>

      <h2>Série Vermelha (Eritrograma)</h2>
      <p>A série vermelha avalia os glóbulos vermelhos, responsáveis pelo transporte de oxigênio. Os principais parâmetros incluem:</p>
      <ul>
        <li><strong>Hemoglobina:</strong> Proteína que transporta oxigênio</li>
        <li><strong>Hematócrito:</strong> Percentual de células vermelhas no sangue</li>
        <li><strong>VCM:</strong> Volume corpuscular médio das hemácias</li>
      </ul>

      <h2>Série Branca (Leucograma)</h2>
      <p>Os glóbulos brancos são responsáveis pela defesa do organismo. Alterações podem indicar infecções, inflamações ou outras condições.</p>

      <h2>Plaquetas</h2>
      <p>As plaquetas são essenciais para a coagulação sanguínea. Valores alterados podem indicar problemas de coagulação.</p>

      <p>Importante: Sempre consulte um médico para interpretar seus resultados. Este artigo é apenas informativo.</p>
    `,
    category: 'Exames',
    author: 'Dra. Maria Santos',
    authorBio: 'Biomédica especialista em análises clínicas com mais de 10 anos de experiência em laboratórios de diagnóstico.',
    date: '12 Jan 2024',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=630&fit=crop',
    tags: ['Exames', 'Hemograma', 'Saúde'],
  },
  {
    id: '3',
    slug: 'alimentos-sistema-imunologico',
    title: '10 Alimentos que Fortalecem o Sistema Imunológico',
    excerpt: 'Conheça os superalimentos que podem ajudar a fortalecer suas defesas naturais e prevenir doenças.',
    content: '<p>Uma alimentação equilibrada é fundamental...</p>',
    category: 'Nutrição',
    author: 'Nutricionista Ana Paula',
    authorBio: 'Nutricionista especializada em nutrição clínica.',
    date: '10 Jan 2024',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop',
    tags: ['Nutrição', 'Imunidade', 'Alimentação'],
  },
  {
    id: '4',
    slug: 'diabetes-guia-completo',
    title: 'Diabetes: Sintomas, Prevenção e Tratamento',
    excerpt: 'Tudo o que você precisa saber sobre diabetes mellitus, desde os primeiros sinais até as formas de controle.',
    content: '<p>O diabetes é uma condição crônica...</p>',
    category: 'Prevenção',
    author: 'Dr. Roberto Lima',
    authorBio: 'Endocrinologista com foco em diabetes.',
    date: '08 Jan 2024',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=630&fit=crop',
    tags: ['Diabetes', 'Prevenção', 'Saúde'],
  },
  {
    id: '5',
    slug: 'saude-mental-importancia',
    title: 'Saúde Mental: Quebrando Tabus e Buscando Ajuda',
    excerpt: 'A importância de cuidar da saúde mental e como buscar apoio profissional sem preconceitos.',
    content: '<p>A saúde mental é tão importante quanto a física...</p>',
    category: 'Bem-estar',
    author: 'Psicóloga Juliana Costa',
    authorBio: 'Psicóloga clínica especializada em terapia cognitivo-comportamental.',
    date: '05 Jan 2024',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=630&fit=crop',
    tags: ['Saúde Mental', 'Bem-estar', 'Psicologia'],
  },
  {
    id: '6',
    slug: 'checkup-anual-guia',
    title: 'Check-up Anual: Quais Exames Fazer?',
    excerpt: 'Lista completa dos exames recomendados para cada faixa etária no check-up anual de rotina.',
    content: '<p>O check-up anual é essencial...</p>',
    category: 'Exames',
    author: 'Dr. Carlos Silva',
    authorBio: 'Médico especialista em medicina preventiva.',
    date: '03 Jan 2024',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=630&fit=crop',
    tags: ['Check-up', 'Exames', 'Prevenção'],
  },
  {
    id: '7',
    slug: 'colesterol-alto-prevencao',
    title: 'Colesterol Alto: Como Prevenir e Controlar',
    excerpt: 'Entenda os riscos do colesterol elevado e aprenda estratégias eficazes para manter níveis saudáveis.',
    content: '<p>O colesterol alto é um dos principais fatores de risco...</p>',
    category: 'Prevenção',
    author: 'Dra. Ana Paula',
    authorBio: 'Cardiologista especializada em prevenção cardiovascular.',
    date: '28 Dez 2023',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=1200&h=630&fit=crop',
    tags: ['Colesterol', 'Coração', 'Prevenção'],
  },
  {
    id: '8',
    slug: 'hidratacao-importancia',
    title: 'A Importância da Hidratação para a Saúde',
    excerpt: 'Descubra por que beber água é fundamental e quantos litros você realmente precisa por dia.',
    content: '<p>A água é essencial para todas as funções do corpo...</p>',
    category: 'Bem-estar',
    author: 'Nutricionista Ana Paula',
    authorBio: 'Nutricionista especializada em nutrição clínica.',
    date: '25 Dez 2023',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1200&h=630&fit=crop',
    tags: ['Hidratação', 'Bem-estar', 'Saúde'],
  },
  {
    id: '9',
    slug: 'exercicios-fisicos-beneficios',
    title: 'Exercícios Físicos: Benefícios Além do Corpo',
    excerpt: 'Como a atividade física regular pode melhorar sua saúde mental e qualidade de vida.',
    content: '<p>Os benefícios dos exercícios vão muito além da estética...</p>',
    category: 'Bem-estar',
    author: 'Dr. Roberto Lima',
    authorBio: 'Médico do esporte e fisiologista.',
    date: '22 Dez 2023',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=630&fit=crop',
    tags: ['Exercícios', 'Bem-estar', 'Saúde Mental'],
  },
  {
    id: '10',
    slug: 'sono-qualidade-dicas',
    title: 'Como Melhorar a Qualidade do Seu Sono',
    excerpt: 'Dicas práticas e cientificamente comprovadas para ter noites de sono mais reparadoras.',
    content: '<p>Um sono de qualidade é fundamental para a saúde...</p>',
    category: 'Bem-estar',
    author: 'Dra. Juliana Costa',
    authorBio: 'Neurologista especializada em medicina do sono.',
    date: '20 Dez 2023',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200&h=630&fit=crop',
    tags: ['Sono', 'Bem-estar', 'Qualidade de Vida'],
  },
  {
    id: '11',
    slug: 'vitamina-d-importancia',
    title: 'Vitamina D: O Hormônio do Sol',
    excerpt: 'Entenda a importância da vitamina D e como garantir níveis adequados no organismo.',
    content: '<p>A vitamina D é essencial para diversas funções...</p>',
    category: 'Nutrição',
    author: 'Nutricionista Ana Paula',
    authorBio: 'Nutricionista especializada em nutrição clínica.',
    date: '18 Dez 2023',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=630&fit=crop',
    tags: ['Vitaminas', 'Nutrição', 'Saúde'],
  },
  {
    id: '12',
    slug: 'pressao-alta-controle',
    title: 'Hipertensão: Controle e Prevenção',
    excerpt: 'Guia completo sobre pressão alta, seus riscos e como manter sob controle.',
    content: '<p>A hipertensão arterial é conhecida como assassina silenciosa...</p>',
    category: 'Prevenção',
    author: 'Dra. Ana Paula',
    authorBio: 'Cardiologista especializada em prevenção cardiovascular.',
    date: '15 Dez 2023',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&h=630&fit=crop',
    tags: ['Hipertensão', 'Coração', 'Prevenção'],
  },
];

export const categories = [
  { name: 'Prevenção', slug: 'prevencao', count: 12 },
  { name: 'Exames', slug: 'exames', count: 18 },
  { name: 'Nutrição', slug: 'nutricao', count: 8 },
  { name: 'Bem-estar', slug: 'bem-estar', count: 15 },
  { name: 'Saúde Mental', slug: 'saude-mental', count: 6 },
  { name: 'Família', slug: 'familia', count: 10 },
];
