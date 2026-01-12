'use client';

import { useState } from "react";
import { Search, X, Droplets, Heart, Activity, Pill, Baby, Dna, FlaskConical, Stethoscope } from "lucide-react";

const exameCategories = [
  {
    id: "hematologia",
    name: "Hematologia",
    icon: <Droplets className="w-6 h-6" />,
    color: "bg-red-500",
    exames: [
      "Hemograma Completo",
      "Coagulograma",
      "Tempo de Protrombina (TP)",
      "Tempo de Tromboplastina (TTPA)",
      "Velocidade de Hemossedimentação (VHS)",
      "Reticulócitos",
      "Plaquetas",
      "Ferritina",
      "Ferro Sérico",
      "Transferrina"
    ]
  },
  {
    id: "bioquimica",
    name: "Bioquímica",
    icon: <FlaskConical className="w-6 h-6" />,
    color: "bg-blue-500",
    exames: [
      "Glicemia de Jejum",
      "Hemoglobina Glicada (HbA1c)",
      "Colesterol Total",
      "HDL Colesterol",
      "LDL Colesterol",
      "Triglicerídeos",
      "Ureia",
      "Creatinina",
      "Ácido Úrico",
      "TGO (AST)",
      "TGP (ALT)",
      "Gama GT",
      "Fosfatase Alcalina",
      "Bilirrubinas",
      "Proteínas Totais e Frações"
    ]
  },
  {
    id: "hormonal",
    name: "Hormônios",
    icon: <Activity className="w-6 h-6" />,
    color: "bg-purple-500",
    exames: [
      "TSH",
      "T3 Livre",
      "T4 Livre",
      "Testosterona",
      "Estradiol",
      "Progesterona",
      "FSH",
      "LH",
      "Prolactina",
      "Cortisol",
      "Insulina",
      "DHEA-S",
      "PTH (Paratormônio)"
    ]
  },
  {
    id: "cardiaco",
    name: "Cardíacos",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-pink-500",
    exames: [
      "Troponina",
      "CK-MB",
      "BNP / NT-proBNP",
      "Homocisteína",
      "PCR Ultrassensível",
      "Lipoproteína (a)",
      "Apolipoproteína A e B"
    ]
  },
  {
    id: "urinario",
    name: "Urinálise",
    icon: <Pill className="w-6 h-6" />,
    color: "bg-yellow-500",
    exames: [
      "Urina Tipo I (EAS)",
      "Urocultura",
      "Clearance de Creatinina",
      "Microalbuminúria",
      "Proteinúria 24h",
      "Sedimento Urinário"
    ]
  },
  {
    id: "imunologia",
    name: "Imunologia",
    icon: <Dna className="w-6 h-6" />,
    color: "bg-green-500",
    exames: [
      "FAN (Fator Antinuclear)",
      "Fator Reumatoide",
      "Anti-CCP",
      "Complemento C3 e C4",
      "Imunoglobulinas (IgA, IgG, IgM)",
      "Anti-TPO",
      "Anti-Tireoglobulina"
    ]
  },
  {
    id: "infecciosas",
    name: "Doenças Infecciosas",
    icon: <Stethoscope className="w-6 h-6" />,
    color: "bg-orange-500",
    exames: [
      "HIV 1 e 2",
      "Hepatite B (HBsAg, Anti-HBs, Anti-HBc)",
      "Hepatite C (Anti-HCV)",
      "VDRL / RPR",
      "Toxoplasmose (IgG e IgM)",
      "Rubéola (IgG e IgM)",
      "Citomegalovírus (IgG e IgM)",
      "Dengue (NS1, IgG, IgM)"
    ]
  },
  {
    id: "gestacional",
    name: "Pré-Natal",
    icon: <Baby className="w-6 h-6" />,
    color: "bg-teal-500",
    exames: [
      "Beta HCG Quantitativo",
      "Tipagem Sanguínea (ABO/Rh)",
      "Coombs Indireto",
      "Glicemia de Jejum",
      "Curva Glicêmica",
      "Sorologias (TORCH)",
      "Urina Tipo I",
      "Urocultura",
      "Hemograma"
    ]
  }
];

const ServicosExamesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtrar exames baseado na pesquisa
  const filteredCategories = exameCategories.map(category => ({
    ...category,
    exames: category.exames.filter(exame =>
      exame.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    selectedCategory ? category.id === selectedCategory : category.exames.length > 0
  );

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <section id="exames" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Nossos{" "}
            <span className="text-accent">Exames</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Realizamos mais de 1.000 tipos de exames laboratoriais. 
            Pesquise pelo nome do exame ou navegue pelas categorias.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar exame..."
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
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === null
                ? "bg-primary text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          {exameCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              {filteredCategories.reduce((acc, cat) => acc + cat.exames.length, 0)} exame(s) encontrado(s) para "{searchTerm}"
            </p>
          </div>
        )}

        {/* Exames Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Category Header */}
              <div className={`${category.color} p-4 flex items-center gap-3`}>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white">{category.name}</h3>
                  <p className="text-white/80 text-xs">{category.exames.length} exames</p>
                </div>
              </div>

              {/* Exames List */}
              <div className="p-4">
                <ul className="space-y-2">
                  {category.exames.slice(0, 6).map((exame, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span className={searchTerm && exame.toLowerCase().includes(searchTerm.toLowerCase()) ? "bg-yellow-100 px-1 rounded" : ""}>
                        {exame}
                      </span>
                    </li>
                  ))}
                  {category.exames.length > 6 && (
                    <li className="text-sm text-primary font-medium pt-2">
                      + {category.exames.length - 6} outros exames
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum exame encontrado para "{searchTerm}"
            </p>
            <button
              onClick={clearSearch}
              className="mt-4 text-primary hover:underline"
            >
              Limpar pesquisa
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicosExamesSection;
