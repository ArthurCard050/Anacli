'use client';

import { useState, useEffect } from "react";
import { CheckCircle, Star, Target, Download, Eye, ExternalLink, X } from "lucide-react";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";

const certificationsData = [
  {
    id: 1,
    name: "ISO 9001",
    logo: "/assets/certificados/ISO.svg",
    category: "Gestão e Processos",
    badge: "3º ano consecutivo",
    title: "ISO 9001: Excelência em Gestão (Recertificação 2025)",
    description: "Pelo 3º ano consecutivo, o Anácli conquistou a recertificação ISO 9001, a norma internacional mais respeitada em gestão de qualidade.",
    benefit: "Garante que nossos processos — do atendimento à entrega do laudo — são padronizados, ágeis e auditados para oferecer a melhor experiência ao paciente, com foco na melhoria contínua.",
    color: "border-primary bg-primary/5",
    badgeColor: "bg-primary/10 text-primary",
    documentPath: "/assets/certificados/docs/ISO.webp",
    hasDocument: true
  },
  {
    id: 2,
    name: "DICQ",
    logo: "/assets/certificados/DICQ.svg",
    category: "Acreditação Técnica",
    badge: "Certificado de Conformidade",
    title: "Acreditação DICQ - Sistema Nacional de Acreditação",
    description: "Recebemos o Certificado de Conformidade do Sistema Nacional de Acreditação (DICQ), patrocinado pela Sociedade Brasileira de Análises Clínicas (SBAC). Esta é uma das validações mais importantes para um laboratório.",
    benefit: "Comprova nossa competência técnica nas áreas de Bioquímica, Hematologia e Imunologia. Significa que seguimos rigorosamente a norma NM ISO 15189:2015, garantindo que os equipamentos, insumos e técnicas utilizados no seu exame são seguros e precisos.",
    color: "border-accent bg-accent/5",
    badgeColor: "bg-accent/10 text-accent",
    documentPath: "/assets/certificados/docs/DICQ.webp",
    hasDocument: true
  },
  {
    id: 3,
    name: "PNCQ",
    logo: "/assets/certificados/PNCQ.svg",
    category: "Controle de Qualidade",
    badge: "Categoria Ouro",
    title: "PNCQ - Programa Nacional de Controle de Qualidade",
    description: "Participamos há 10 anos do maior programa de controle de qualidade do Brasil, mantendo um histórico de excelência (Categoria Ouro).",
    benefit: "Nossos exames são avaliados mensalmente por auditores externos para assegurar que os resultados sejam exatos e confiáveis.",
    color: "border-yellow-500 bg-yellow-50",
    badgeColor: "bg-yellow-100 text-yellow-700",
    documentPath: "/assets/certificados/docs/PNCQ.webp",
    hasDocument: true
  },
  {
    id: 4,
    name: "PREVECAL",
    logo: "/assets/certificados/PREVECAL.svg",
    category: "Controle de Qualidade",
    badge: "Categoria B. Humano",
    title: "Prevecal - Certificação Internacional (BioSystems)",
    description: "Conquistamos o Certificado de Qualidade Internacional Prevecal, um rigoroso controle de qualidade europeu.",
    benefit: "Validamos nossa precisão comparando nossos resultados com laboratórios de todo o mundo, assegurando um padrão de qualidade global.",
    color: "border-blue-500 bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-700",
    documentPath: "/assets/certificados/docs/PREVECAL.webp",
    hasDocument: true
  },
  {
    id: 5,
    name: "GPTW",
    logo: "/assets/certificados/GPTW.svg",
    category: "Cultura e Equipe",
    badge: "Melhor empresa para trabalhar",
    title: "Great Place to Work (GPTW) 2025",
    description: "O Anácli foi certificado como uma das melhores empresas para se trabalhar em 2025.",
    benefit: "Acreditamos que quem é bem cuidado, cuida melhor. Esta certificação reflete nosso ambiente de trabalho humanizado e colaborativo. Uma equipe feliz e valorizada entrega um atendimento com mais empatia e carinho para você.",
    color: "border-green-500 bg-green-50",
    badgeColor: "bg-green-100 text-green-700",
    externalLink: "https://certificadas.gptw.com.br/13265590000126",
    hasDocument: false
  }
];

const partnerships = [
  {
    title: "Certificado Pardini",
    subtitle: "Qualificação Unique",
    description: "Reconhecimento pela parceria e confiança técnica com o Grupo Pardini.",
    icon: <Star className="w-6 h-6" />
  },
  {
    title: "Jornada Legal",
    subtitle: "Excelência em Toxicológicos",
    description: "Certificação de excelência na realização de exames toxicológicos, contribuindo para a segurança e saúde nas estradas.",
    icon: <Target className="w-6 h-6" />
  }
];

const CertificacoesContentSection = () => {
  const [selectedCert, setSelectedCert] = useState(certificationsData[0]);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedCertificate(null);
      }
    };

    if (selectedCertificate) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCertificate]);

  const openModal = (certificatePath: string) => {
    setSelectedCertificate(certificatePath);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <section id="certificacoes-content" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Introduction */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Compromisso com a{" "}
            <span className="text-accent">Qualidade</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
            No Laboratório Anácli, a qualidade não é apenas uma promessa, é um compromisso auditado e certificado. 
            Entendemos que por trás de cada exame existe uma vida, e é por isso que submetemos nossos processos às 
            mais rigorosas avaliações externas. Conheça as certificações que garantem a precisão do seu diagnóstico 
            e a segurança do seu atendimento.
          </p>
        </div>

        {/* Interactive Certifications */}
        <div className="max-w-6xl mx-auto mb-16 sm:mb-20">
          {/* Certification Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
            {certificationsData.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  selectedCert.id === cert.id 
                    ? 'border-accent bg-accent shadow-lg' 
                    : 'bg-white border-gray-200 hover:border-accent'
                }`}
              >
                {/* Logo */}
                <div className="aspect-square flex items-center justify-center mb-3">
                  <img
                    src={cert.logo}
                    alt={`Logo ${cert.name}`}
                    className="max-w-full max-h-full object-contain transition-opacity duration-300"
                    style={
                      cert.name === 'GPTW' 
                        ? {} // GPTW sem filtro (cor original)
                        : selectedCert.id === cert.id 
                          ? { filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' } // Branco quando ativo
                          : { filter: 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)' } // Preto quando inativo
                    }
                  />
                </div>
                
                {/* Name */}
                <h3 className={`font-semibold text-sm text-center ${
                  selectedCert.id === cert.id ? 'text-white' : 'text-gray-900'
                }`}>
                  {cert.name}
                </h3>

                {/* Active Indicator */}
                {selectedCert.id === cert.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Certification Details */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-lg">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Logo and Badge */}
              <div className="text-center lg:text-left">
                <div className="w-40 h-40 bg-gray-800 rounded-3xl flex items-center justify-center p-6 mx-auto lg:mx-0 mb-6">
                  <img
                    src={selectedCert.logo}
                    alt={`Logo ${selectedCert.name}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className={`inline-block px-4 py-2 ${selectedCert.badgeColor} text-sm font-semibold rounded-full mb-4`}>
                  {selectedCert.badge}
                </div>
                <div className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full mb-4">
                  {selectedCert.category}
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  {selectedCert.hasDocument ? (
                    <>
                      <HierarchicalButton
                        hierarchy="secondary"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                        iconPosition="left"
                        onClick={() => openModal(selectedCert.documentPath!)}
                        className="w-full lg:w-auto"
                      >
                        Visualizar Certificado
                      </HierarchicalButton>
                      <HierarchicalButton
                        hierarchy="tertiary"
                        size="sm"
                        icon={<Download className="w-4 h-4" />}
                        iconPosition="left"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = selectedCert.documentPath!;
                          link.download = `${selectedCert.name}_Certificado.webp`;
                          link.click();
                        }}
                        className="w-full lg:w-auto"
                      >
                        Baixar Certificado
                      </HierarchicalButton>
                    </>
                  ) : (
                    <HierarchicalButton
                      hierarchy="secondary"
                      size="sm"
                      icon={<ExternalLink className="w-4 h-4" />}
                      iconPosition="left"
                      onClick={() => window.open(selectedCert.externalLink!, '_blank')}
                      className="w-full lg:w-auto"
                    >
                      Ver Certificação Online
                    </HierarchicalButton>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {selectedCert.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>

                {/* Benefit Box */}
                <div className="bg-primary/5 rounded-2xl p-6">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    O que isso significa para você?
                  </h5>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCert.benefit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnerships Section */}
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-12">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Parcerias de{" "}
              <span className="text-accent">Excelência</span>
            </h3>
            <div className="w-16 h-1 bg-accent mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reconhecimentos que fortalecem nossa credibilidade e ampliam nossos serviços.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {partnerships.map((partnership, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    {partnership.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {partnership.title}
                    </h4>
                    <p className="text-sm font-medium text-primary mb-3">
                      {partnership.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {partnership.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate Modal */}
        {selectedCertificate && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div 
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
                title="Fechar (ESC)"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Certificate Image */}
              <div className="p-6">
                <img
                  src={selectedCertificate}
                  alt="Certificado"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificacoesContentSection;