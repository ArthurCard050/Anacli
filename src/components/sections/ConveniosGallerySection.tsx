'use client';

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, CheckCircle, AlertCircle, MessageCircle, MapPin } from "lucide-react";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";
import { useShouldAnimate } from "@/hooks/useReducedMotion";

// Lista completa de convênios
const convenios = [
  { name: "Amil", logo: "/assets/convenios/Amil.webp", category: "Nacional" },
  { name: "Hapvida", logo: "/assets/convenios/hapvida.webp", category: "Nacional" },
  { name: "Geap", logo: "/assets/convenios/Geap.webp", category: "Nacional" },
  { name: "Blue Med", logo: "/assets/convenios/Blue.webp", category: "Regional" },
  { name: "Camed", logo: "/assets/convenios/Camed.webp", category: "Regional" },
  { name: "Fusex", logo: "/assets/convenios/Fusex.webp", category: "Militar" },
  { name: "Planserv", logo: "/assets/convenios/planserv.webp", category: "Público" },
  { name: "Saúde Caixa", logo: "/assets/convenios/SaudeCaixa.webp", category: "Público" },
  { name: "Sanitas", logo: "/assets/convenios/Sanitas.webp", category: "Regional" },
  { name: "Promedica", logo: "/assets/convenios/Promedica.webp", category: "Regional" },
  { name: "Select", logo: "/assets/convenios/Select.webp", category: "Regional" },
  { name: "Bem Estar Saúde", logo: "/assets/convenios/bemstar saude.webp", category: "Regional" },
  { name: "Atitude Saúde", logo: "/assets/convenios/atitudesaude.webp", category: "Regional" },
  { name: "Plan Assiste", logo: "/assets/convenios/plan assiste.webp", category: "Regional" },
  { name: "Pro Social", logo: "/assets/convenios/pro social.webp", category: "Regional" },
  { name: "Nordeste Saúde", logo: "/assets/convenios/NordesteSaudeEmpresarial.webp", category: "Regional" },
  { name: "ArcelorMittal", logo: "/assets/convenios/arcelormittal.webp", category: "Empresarial" },
  { name: "ASFEB", logo: "/assets/convenios/asfeb.webp", category: "Empresarial" },
  { name: "FACEHSF", logo: "/assets/convenios/facehsf.webp", category: "Empresarial" },
  { name: "Amex", logo: "/assets/convenios/Amex.webp", category: "Empresarial" },
];

const categories = ["Todos", "Nacional", "Regional", "Público", "Militar", "Empresarial"];

const ConveniosGallerySection = () => {
  const shouldAnimate = useShouldAnimate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showNotFound, setShowNotFound] = useState(false);

  // Componente wrapper que usa motion apenas se shouldAnimate for true
  const MotionWrapper = ({ children, className, ...motionProps }: any) => {
    if (shouldAnimate) {
      return <motion.div className={className} {...motionProps}>{children}</motion.div>;
    }
    return <div className={className}>{children}</div>;
  };

  // Filtrar convênios baseado na pesquisa e categoria
  const filteredConvenios = useMemo(() => {
    let filtered = convenios;

    // Filtrar por categoria
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(convenio => convenio.category === selectedCategory);
    }

    // Filtrar por termo de pesquisa
    if (searchTerm) {
      filtered = filtered.filter(convenio =>
        convenio.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Verificar se deve mostrar mensagem de "não encontrado"
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value && filteredConvenios.length === 0) {
      setShowNotFound(true);
    } else {
      setShowNotFound(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowNotFound(false);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <MotionWrapper
          className="text-center mb-12 sm:mb-16"
          initial={shouldAnimate ? { opacity: 0, y: 30 } : {}}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={shouldAnimate ? { duration: 0.8 } : {}}
          viewport={shouldAnimate ? { once: true } : {}}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Nossos{" "}
            <span className="text-accent">Convênios</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Consulte se o seu plano de saúde está credenciado conosco. 
            Utilize a barra de pesquisa ou navegue pelas categorias.
          </p>
        </MotionWrapper>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Digite o nome do seu convênio..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
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
              {filteredConvenios.length > 0 
                ? `${filteredConvenios.length} convênio(s) encontrado(s) para "${searchTerm}"`
                : `Nenhum resultado para "${searchTerm}"`
              }
            </p>
          </div>
        )}

        {/* Not Found Message */}
        {showNotFound && filteredConvenios.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-12 px-6">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8">
              <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Convênio não localizado
              </h3>
              <p className="text-gray-600 mb-6">
                O convênio pesquisado não consta em nossa rede credenciada no momento. 
                Entre em contato conosco para verificar possibilidades de atendimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Gostaria%20de%20verificar%20se%20meu%20conv%C3%AAnio%20%C3%A9%20aceito."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Consultar via WhatsApp
                </a>
                <a
                  href="tel:+557530300030"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Ligar: (75) 3030-0030
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Convenios Grid */}
        {filteredConvenios.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredConvenios.map((convenio, index) => (
              <div
                key={convenio.name}
                className="group relative bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Status Badge */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    <CheckCircle className="w-3 h-3" />
                    <span>Aceito</span>
                  </div>
                </div>

                {/* Logo */}
                <div className="aspect-[3/2] flex items-center justify-center mb-3">
                  <img
                    src={convenio.logo}
                    alt={`Logo ${convenio.name}`}
                    className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/120x60/E5E7EB/6B7280?text=${convenio.name.replace(' ', '+')}`;
                    }}
                  />
                </div>

                {/* Info */}
                <div className="text-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {convenio.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* CTA Section - Moved from ConveniosContactSection */}
        <MotionWrapper
          className="text-center mt-12 sm:mt-16"
          initial={shouldAnimate ? { opacity: 0, y: 30 } : {}}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={shouldAnimate ? { duration: 0.8, delay: 0.8 } : {}}
          viewport={shouldAnimate ? { once: true } : {}}
        >
          <div className="bg-primary/10 rounded-3xl p-8 sm:p-12 border border-primary/20">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Não encontrou seu convênio?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco. Estamos sempre expandindo nossa rede credenciada 
              e podemos verificar possibilidades especiais para seu caso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HierarchicalButton
                hierarchy="primary"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Meu%20conv%C3%AAnio%20n%C3%A3o%20est%C3%A1%20na%20lista.%20Podem%20me%20ajudar%3F', '_blank')}
              >
                Consultar via WhatsApp
              </HierarchicalButton>
              <HierarchicalButton
                hierarchy="tertiary"
                size="lg"
                icon={<MapPin className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Visitar nossas unidades
              </HierarchicalButton>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default ConveniosGallerySection;