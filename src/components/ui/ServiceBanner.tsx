'use client';

import { useState } from "react";
import { MessageCircle, Info, X } from "lucide-react";
import { HierarchicalButton } from "@/components/ui/hierarchical-button";

interface ServiceBannerProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
  modalContent: {
    title: string;
    description: string;
    benefits?: string[];
    details?: string;
  };
  bgColor?: string;
  accentColor?: string;
  reversed?: boolean;
}

const ServiceBanner = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  whatsappMessage,
  modalContent,
  bgColor = "bg-gradient-to-r from-primary/10 to-primary/5",
  accentColor = "text-primary",
  reversed = false,
}: ServiceBannerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://api.whatsapp.com/send?phone=557530300030&text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      {/* Banner */}
      <div className={`${bgColor} rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/50 max-w-5xl mx-auto`}>
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
          {/* Content Side */}
          <div className="flex-1 p-6 sm:p-8 lg:p-8">
            <span className={`inline-block text-xs sm:text-sm font-semibold ${accentColor} uppercase tracking-wider mb-2`}>
              {subtitle}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-5 leading-relaxed">
              {description}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <HierarchicalButton
                hierarchy="primary"
                size="sm"
                icon={<MessageCircle className="w-4 h-4" />}
                iconPosition="left"
                onClick={handleWhatsApp}
              >
                Falar no WhatsApp
              </HierarchicalButton>
              <HierarchicalButton
                hierarchy="tertiary"
                size="sm"
                icon={<Info className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => setIsModalOpen(true)}
              >
                Saiba mais
              </HierarchicalButton>
            </div>
          </div>

          {/* Image Side */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="relative h-56 sm:h-64 md:h-full md:min-h-[220px] flex items-center justify-center p-6 md:p-4">
              <img
                src={image}
                alt={imageAlt}
                className="max-h-full max-w-full object-contain drop-shadow-lg"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 sm:p-6 flex items-start justify-between rounded-t-2xl sm:rounded-t-3xl">
              <div>
                <span className={`text-xs sm:text-sm font-semibold ${accentColor} uppercase tracking-wider`}>
                  {subtitle}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  {modalContent.title}
                </h4>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">
                {modalContent.description}
              </p>

              {modalContent.benefits && modalContent.benefits.length > 0 && (
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Benefícios:</h5>
                  <ul className="space-y-2">
                    {modalContent.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {modalContent.details && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600">
                    {modalContent.details}
                  </p>
                </div>
              )}

              {/* Modal CTA */}
              <HierarchicalButton
                hierarchy="primary"
                size="lg"
                fullWidth
                icon={<MessageCircle className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => {
                  setIsModalOpen(false);
                  handleWhatsApp();
                }}
              >
                Agendar pelo WhatsApp
              </HierarchicalButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceBanner;
