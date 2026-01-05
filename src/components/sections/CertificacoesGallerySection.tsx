'use client';

import { useState, useEffect } from "react";
import { Award, Download, ExternalLink, Eye, X } from "lucide-react";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";

const certificates = [
  {
    name: "ISO 9001",
    image: "/assets/certificados/ISO.svg",
    alt: "Certificação ISO 9001",
    category: "Gestão de Qualidade",
    year: "2025",
    status: "Ativo",
    documentPath: "/assets/certificados/docs/ISO.webp",
    hasDocument: true
  },
  {
    name: "DICQ",
    image: "/assets/certificados/DICQ.svg",
    alt: "Certificação DICQ",
    category: "Acreditação Técnica",
    year: "2024",
    status: "Ativo",
    documentPath: "/assets/certificados/docs/DICQ.webp",
    hasDocument: true
  },
  {
    name: "PNCQ",
    image: "/assets/certificados/PNCQ.svg",
    alt: "Certificação PNCQ",
    category: "Controle de Qualidade",
    year: "2024",
    status: "Categoria Ouro",
    documentPath: "/assets/certificados/docs/PNCQ.webp",
    hasDocument: true
  },
  {
    name: "PREVECAL",
    image: "/assets/certificados/PREVECAL.svg",
    alt: "Certificação PREVECAL",
    category: "Qualidade Internacional",
    year: "2024",
    status: "Ativo",
    documentPath: "/assets/certificados/docs/PREVECAL.webp",
    hasDocument: true
  },
  {
    name: "GPTW",
    image: "/assets/certificados/GPTW.svg",
    alt: "Great Place to Work",
    category: "Ambiente de Trabalho",
    year: "2025",
    status: "Certificado",
    externalLink: "https://certificadas.gptw.com.br/13265590000126",
    hasDocument: false
  }
];

const CertificacoesGallerySection = () => {
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
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Nossos{" "}
            <span className="text-accent">Certificados</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-accent mx-auto mb-4 sm:mb-6" />
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto px-4 whitespace-nowrap">
            Documentos oficiais que comprovam nossa excelência e compromisso com a qualidade.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {certificates.map((certificate, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Certificate Image */}
              <div className="aspect-square flex items-center justify-center mb-4 bg-gray-50 rounded-xl p-4 group-hover:bg-primary/5 transition-colors duration-300">
                <img
                  src={certificate.image}
                  alt={certificate.alt}
                  className="max-w-full max-h-full object-contain transition-opacity duration-300"
                  style={certificate.name !== 'GPTW' ? { filter: 'brightness(0) saturate(100%) invert(21%) sepia(19%) saturate(249%) hue-rotate(180deg) brightness(97%) contrast(87%)' } : {}}
                />
              </div>

              {/* Certificate Info */}
              <div className="text-center">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {certificate.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {certificate.category}
                </p>
              </div>

              {/* Certificate Actions */}
              <div className="mt-4">
                <div className="flex gap-2 justify-center">
                  {certificate.hasDocument ? (
                    <>
                      <button 
                        onClick={() => openModal(certificate.documentPath!)}
                        className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
                        title="Visualizar Certificado"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = certificate.documentPath!;
                          link.download = `${certificate.name}_Certificado.webp`;
                          link.click();
                        }}
                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        title="Baixar Certificado"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => window.open(certificate.externalLink, '_blank')}
                      className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
                      title="Ver Certificação Online"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Qualidade que você pode confiar
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nossas certificações são renovadas periodicamente e auditadas por órgãos independentes, 
              garantindo que mantemos os mais altos padrões de qualidade e segurança.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HierarchicalButton
                hierarchy="primary"
                size="lg"
                icon={<ExternalLink className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Gostaria%20de%20saber%20mais%20sobre%20as%20certifica%C3%A7%C3%B5es%20do%20laborat%C3%B3rio.', '_blank')}
              >
                Saiba mais sobre qualidade
              </HierarchicalButton>
              <HierarchicalButton
                hierarchy="tertiary"
                size="lg"
                onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Agendar exame
              </HierarchicalButton>
            </div>
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

export default CertificacoesGallerySection;