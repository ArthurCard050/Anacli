'use client';

import { useState } from "react";
import { Search, X, ChevronDown, ChevronUp, Droplets, Heart, Clock, AlertTriangle, Coffee, Thermometer } from "lucide-react";

// FAQ data com as perguntas e respostas fornecidas
const faqData = [
  {
    id: 1,
    category: "Preparação para Exames",
    icon: <Clock className="w-5 h-5" />,
    question: "Pode-se fazer exame de sangue gripado, resfriado ou com febre?",
    answer: "Apenas se os exames destinam-se ao estudo dos sintomas relatados. Salvo orientação médica, exames de rotina devem ser feitos com o paciente em seu estado normal."
  },
  {
    id: 2,
    category: "Ciclo Menstrual",
    icon: <Heart className="w-5 h-5" />,
    question: "Menstruação interfere nos exames?",
    answer: "Em exames de sangue geralmente não, mas, em alguns exames, como de urina, pode causar. Por isso o ideal é fazê-lo fora do período menstrual. Se necessário, a urina pode ser colhida, adotando-se dois cuidados: higienização na hora do exame e uso de tampão vaginal, para evitar que o sangue menstrual contamine a urina. Diversos hormônios variam com a fase do ciclo menstrual e portanto é importante que o médico saiba em que fase do ciclo ele foi realizado, por isso algumas vezes a recepcionista pergunta qual a data da última menstruação."
  },
  {
    id: 3,
    category: "Alimentação e Bebidas",
    icon: <Coffee className="w-5 h-5" />,
    question: "Bebida alcoólica pode alterar resultados de exames?",
    answer: "Sim, principalmente gama GT, triglicérideos e colesterol. Uma dose de uísque, uma cerveja ou um copo de vinho na véspera é suficiente para invalidar os resultados. Deve-se passar pelo menos 3 dias sem ingerir álcool antes de realizar exames de sangue."
  },
  {
    id: 4,
    category: "Alimentação e Bebidas",
    icon: <Coffee className="w-5 h-5" />,
    question: "A alimentação interfere nos resultados de colesterol e triglicérides?",
    answer: "Sim, principalmente no de triglicérides. Por exemplo, alguém com triglicérides elevado, se comer uma dieta rígida nos dias anteriores à coleta do exame terá um resultado falsamente baixo. Já uma pessoa com triglicérides normais, mas que come uma feijoada no dia anterior à coleta, apresentará resultado falsamente alto. Para triglicérides, você deve manter a sua dieta habitual nos 5 dias que antecedem os exames. Dieta habitual é a que você costuma comer no seu dia-a-dia. O ideal é não mudar a alimentação. É fundamental jejum de 12 a 16 horas para a coleta do sangue, na dosagem de triglicérides e frações do colesterol."
  },
  {
    id: 5,
    category: "Jejum",
    icon: <Droplets className="w-5 h-5" />,
    question: "Água quebra o jejum?",
    answer: "Não. Mas em excesso interfere nos exames de urina. Importante: alimentos líquidos (como leite, café mesmo com adoçante) quebram o jejum."
  },
  {
    id: 6,
    category: "Jejum",
    icon: <Droplets className="w-5 h-5" />,
    question: "Exame de sangue tem que ser sempre em jejum?",
    answer: "Nem todos. Hemograma, por exemplo, dispensa o jejum. Glicose geralmente precisa de 8 horas sem alimentação. Para lipidograma e triglicerídeos é indispensável no mínimo 12 horas (e no máximo 16 horas) sem alimentação. Sempre nos pergunte, é nossa obrigação informá-lo."
  },
  {
    id: 7,
    category: "Coleta de Sangue",
    icon: <AlertTriangle className="w-5 h-5" />,
    question: "Porque quando se tira sangue para exame, às vezes o local fica roxo?",
    answer: "O hematoma é causado pelo extravasamento de sangue. Pode ocorrer quando há algum acidente na coleta, quando as veias são muito finas, se houver compressão inadequada do local puncionado, ou por efeito de aspirina ou outro medicamento. Normalmente some em 2 semanas (ou menos com o uso de compressas quentes)."
  }
];

const categories = ["Todas", "Preparação para Exames", "Ciclo Menstrual", "Alimentação e Bebidas", "Jejum", "Coleta de Sangue"];

const FaqContentSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  // Filtrar FAQs baseado na pesquisa e categoria
  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <section id="faq-content" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Perguntas{" "}
            <span className="text-accent">Frequentes</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Encontre respostas rápidas para suas dúvidas sobre exames laboratoriais.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquise sua dúvida..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-primary focus:outline-none transition-colors duration-300"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              {filteredFaqs.length > 0 
                ? `${filteredFaqs.length} resultado(s) encontrado(s) para "${searchTerm}"`
                : `Nenhum resultado para "${searchTerm}"`
              }
            </p>
          </div>
        )}

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full p-6 text-left flex items-start gap-4 hover:bg-gray-50 transition-colors duration-200 rounded-2xl"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mt-1">
                      {faq.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-2">
                            {faq.category}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                            {faq.question}
                          </h3>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          {expandedItems.includes(faq.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Answer */}
                  {expandedItems.includes(faq.id) && (
                    <div className="px-6 pb-6">
                      <div className="ml-14 pt-4 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma pergunta encontrada
              </h3>
              <p className="text-gray-600 mb-6">
                Tente usar outros termos de pesquisa ou navegue pelas categorias.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Todas");
                }}
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Ver todas as perguntas
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqContentSection;