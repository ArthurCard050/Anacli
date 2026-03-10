"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Clock,
  Star,
  ShoppingCart,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCart } from "../../context/CartContext";

import axios from "axios";

interface Exam {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  duration: string;
  preparation: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  isFast?: boolean;
}

export default function ExamesListSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allExams, setAllExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 12;

  const { addItem } = useCart();

  useEffect(() => {
    async function fetchExams() {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_VARIAVEL_API_URL;
        const response = await axios.get(`${apiUrl}`);
        if (response.data && Array.isArray(response.data)) {
          setAllExams(response.data);
        }
      } catch (err) {
        console.error("Erro ao buscar exames:", err);
        setAllExams([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchExams();
  }, []);

  // const allExams: Exam[] = [
  //   {
  //     id: '1',
  //     name: 'Hemograma Completo',
  //     category: 'sangue',
  //     price: 35.90,
  //     originalPrice: 45.90,
  //     duration: '24h',
  //     preparation: 'sem-jejum',
  //     rating: 4.9,
  //     reviewCount: 1247,
  //     description: 'Avaliação completa das células sanguíneas, detecta anemias, infecções e outras alterações.',
  //     features: ['Contagem de glóbulos vermelhos', 'Contagem de glóbulos brancos', 'Plaquetas'],
  //     isPopular: true,
  //     isFast: true
  //   },
  //   {
  //     id: '2',
  //     name: 'Glicemia de Jejum',
  //     category: 'sangue',
  //     price: 25.90,
  //     duration: '24h',
  //     preparation: 'jejum-8h',
  //     rating: 4.8,
  //     reviewCount: 892,
  //     description: 'Dosagem da glicose no sangue para diagnóstico e controle do diabetes.',
  //     features: ['Diagnóstico de diabetes', 'Controle glicêmico'],
  //     isFast: true
  //   },
  //   {
  //     id: '3',
  //     name: 'Colesterol Total e Frações',
  //     category: 'sangue',
  //     price: 42.90,
  //     originalPrice: 55.90,
  //     duration: '24h',
  //     preparation: 'jejum-12h',
  //     rating: 4.7,
  //     reviewCount: 654,
  //     description: 'Avaliação completa do perfil lipídico para prevenção cardiovascular.',
  //     features: ['Colesterol total', 'HDL', 'LDL', 'Triglicérides'],
  //     isPopular: true
  //   },
  //   {
  //     id: '4',
  //     name: 'TSH - Hormônio da Tireoide',
  //     category: 'hormonal',
  //     price: 38.90,
  //     duration: '48h',
  //     preparation: 'sem-jejum',
  //     rating: 4.9,
  //     reviewCount: 423,
  //     description: 'Avaliação da função da tireoide, essencial para o metabolismo.',
  //     features: ['Função tireoidiana', 'Diagnóstico hormonal']
  //   },
  //   {
  //     id: '5',
  //     name: 'Urina Tipo I (EAS)',
  //     category: 'urina',
  //     price: 28.90,
  //     duration: '24h',
  //     preparation: 'sem-jejum',
  //     rating: 4.6,
  //     reviewCount: 789,
  //     description: 'Análise completa da urina para detectar infecções e alterações renais.',
  //     features: ['Detecção de infecções', 'Função renal'],
  //     isFast: true
  //   },
  //   {
  //     id: '6',
  //     name: 'Eletrocardiograma (ECG)',
  //     category: 'cardiologia',
  //     price: 65.90,
  //     duration: '24h',
  //     preparation: 'sem-jejum',
  //     rating: 4.8,
  //     reviewCount: 334,
  //     description: 'Avaliação da atividade elétrica do coração.',
  //     features: ['Detecção de arritmias', 'Função cardíaca'],
  //     isFast: true
  //   },
  //   {
  //     id: '7',
  //     name: 'Ultrassom Abdominal',
  //     category: 'imagem',
  //     price: 120.90,
  //     duration: '24h',
  //     preparation: 'jejum-8h',
  //     rating: 4.7,
  //     reviewCount: 567,
  //     description: 'Exame de imagem para avaliação dos órgãos abdominais.',
  //     features: ['Fígado', 'Vesícula', 'Rins']
  //   },
  //   {
  //     id: '8',
  //     name: 'Check-up Básico',
  //     category: 'checkup',
  //     price: 189.90,
  //     originalPrice: 249.90,
  //     duration: '48h',
  //     preparation: 'jejum-12h',
  //     rating: 4.9,
  //     reviewCount: 1123,
  //     description: 'Pacote completo com os principais exames preventivos.',
  //     features: ['Hemograma', 'Glicemia', 'Colesterol'],
  //     isPopular: true
  //   },
  //   // Adicionando mais exames para demonstrar paginação
  //   {
  //     id: '9',
  //     name: 'Vitamina D',
  //     category: 'vitaminas',
  //     price: 89.90,
  //     duration: '48h',
  //     preparation: 'sem-jejum',
  //     rating: 4.8,
  //     reviewCount: 445,
  //     description: 'Dosagem da vitamina D para saúde óssea.',
  //     features: ['Saúde óssea', 'Imunidade']
  //   },
  //   {
  //     id: '10',
  //     name: 'Vitamina B12',
  //     category: 'vitaminas',
  //     price: 65.90,
  //     duration: '48h',
  //     preparation: 'sem-jejum',
  //     rating: 4.7,
  //     reviewCount: 332,
  //     description: 'Avaliação dos níveis de vitamina B12.',
  //     features: ['Sistema nervoso', 'Energia']
  //   },
  //   {
  //     id: '11',
  //     name: 'Ferritina',
  //     category: 'sangue',
  //     price: 52.90,
  //     duration: '48h',
  //     preparation: 'jejum-4h',
  //     rating: 4.6,
  //     reviewCount: 278,
  //     description: 'Avaliação dos estoques de ferro no organismo.',
  //     features: ['Reserva de ferro', 'Anemia']
  //   },
  //   {
  //     id: '12',
  //     name: 'PSA Total',
  //     category: 'hormonal',
  //     price: 58.90,
  //     duration: '48h',
  //     preparation: 'sem-jejum',
  //     rating: 4.8,
  //     reviewCount: 189,
  //     description: 'Marcador para rastreamento de câncer de próstata.',
  //     features: ['Saúde da próstata', 'Prevenção']
  //   },
  //   {
  //     id: '13',
  //     name: 'Beta HCG',
  //     category: 'hormonal',
  //     price: 48.90,
  //     duration: '24h',
  //     preparation: 'sem-jejum',
  //     rating: 4.9,
  //     reviewCount: 567,
  //     description: 'Teste de gravidez quantitativo.',
  //     features: ['Teste de gravidez', 'Hormonal']
  //   },
  //   {
  //     id: '14',
  //     name: 'Ácido Úrico',
  //     category: 'sangue',
  //     price: 28.90,
  //     duration: '24h',
  //     preparation: 'jejum-8h',
  //     rating: 4.5,
  //     reviewCount: 234,
  //     description: 'Dosagem do ácido úrico para diagnóstico de gota.',
  //     features: ['Diagnóstico de gota', 'Função renal']
  //   },
  //   {
  //     id: '15',
  //     name: 'Cultura de Urina',
  //     category: 'urina',
  //     price: 45.90,
  //     duration: '72h',
  //     preparation: 'sem-jejum',
  //     rating: 4.7,
  //     reviewCount: 156,
  //     description: 'Identificação de bactérias na urina.',
  //     features: ['Infecção urinária', 'Antibiograma']
  //   }
  // ];

  
  // const categories = [
  //   { value: "", label: "Todas as categorias" },
  //   { value: "sangue", label: "Exames de Sangue" },
  //   { value: "urina", label: "Exames de Urina" },
  //   { value: "imagem", label: "Exames de Imagem" },
  //   { value: "cardiologia", label: "Cardiologia" },
  //   { value: "hormonal", label: "Hormônios" },
  //   { value: "checkup", label: "Check-ups" },
  //   { value: "vitaminas", label: "Vitaminas" },
  // ];

  const categoriesAllFiltered = allExams.map((exam) => {
    return {
      value: exam.category,
      label: exam.category
    } 
  })

  const categoriesAll = categoriesAllFiltered.filter((obj, index, self) =>
    index === self.findIndex(o =>
      o.value === obj.value && o.label === obj.label
    )
  );
  
  categoriesAll.unshift({ value: "", label: "Todas as categorias" });

  const categories = categoriesAll

  const priceRanges = [
    { value: "", label: "Todos os preços" },
    { value: "0-50", label: "Até R$ 50" },
    { value: "50-100", label: "R$ 50 - R$ 100" },
    { value: "100-200", label: "R$ 100 - R$ 200" },
    { value: "200+", label: "Acima de R$ 200" },
  ];

  // Filtrar exames
  const filteredExams = useMemo(() => {
    let filtered = allExams;

    // Filtro por busca
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (exam) =>
          exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exam.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filtro por categoria
    if (selectedCategory) {
      filtered = filtered.filter((exam) => exam.category === selectedCategory);
    }

    // Filtro por preço
    if (selectedPriceRange) {
      filtered = filtered.filter((exam) => {
        const price = exam.price;
        switch (selectedPriceRange) {
          case "0-50":
            return price <= 50;
          case "50-100":
            return price > 50 && price <= 100;
          case "100-200":
            return price > 100 && price <= 200;
          case "200+":
            return price > 200;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedPriceRange, allExams]);

  // Paginação
  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExams = filteredExams.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleAddToCart = (exam: Exam) => {
    addItem(exam.id, "exam");
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ExamCard = ({ exam }: { exam: Exam }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col h-[200px]">
      <div className="mb-3 flex-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2">
          {exam.name}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">{exam.description}</p>
      </div>

      <div className="space-y-3 mt-auto">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900">
              R$ {exam.price.toFixed(2).replace(".", ",")}
            </div>
            {/* {exam.originalPrice && (
              <div className="text-xs text-gray-500 line-through">
                R$ {exam.originalPrice.toFixed(2).replace('.', ',')}
              </div>
            )} */}
          </div>
          <a
            href={`/loja/produto/exam-${exam.id}`}
            className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            title="Ver informações do exame"
          >
            <span className="text-gray-600 text-sm font-bold">!</span>
          </a>
        </div>

        <Button
          onClick={() => handleAddToCart(exam)}
          variant="outline"
          className="w-full border border-gray-300 text-gray-900 bg-white hover:bg-accent hover:border-accent hover:text-white active:bg-accent/90 text-sm h-9 font-medium transition-colors"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          ADICIONAR
        </Button>
      </div>
    </div>
  );

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar exames
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Digite o nome do exame..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Faixa de preço
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setSelectedPriceRange("");
                  setCurrentPage(1);
                }}
                className="w-full text-sm"
              >
                Limpar filtros
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Exames Laboratoriais
              </h1>
              <p className="text-gray-600">
                {filteredExams.length} exames encontrados
              </p>
            </div>

            {/* Exams Grid */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">Carregando exames...</p>
              </div>
            ) : paginatedExams.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg text-gray-600 mb-2">
                  Nenhum exame encontrado
                </p>
                <p className="text-sm text-gray-500">
                  Tente ajustar os filtros ou buscar por outros termos
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                  {paginatedExams.map((exam) => (
                    <ExamCard key={exam.id} exam={exam} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 7) {
                        pageNum = i + 1;
                      } else if (currentPage <= 4) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 3) {
                        pageNum = totalPages - 6 + i;
                      } else {
                        pageNum = currentPage - 3 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => goToPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-8 h-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    {totalPages > 7 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(totalPages)}
                        className="px-3 h-8"
                      >
                        PRÓXIMA
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
