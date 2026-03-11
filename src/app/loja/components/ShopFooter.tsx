'use client';

import { Facebook, Instagram, Linkedin, ShoppingBag, Package, Zap } from "lucide-react";
import { mockExams } from '../data/mock-products';

export default function ShopFooter() {
  const currentYear = new Date().getFullYear();

  // Lista de exames A-Z para SEO
  const examsAZ = [...mockExams].sort((a, b) => a.name.localeCompare(b.name));

  const ecommerceLinks = [
    { label: "Todos os Exames", href: "/loja/exames", icon: ShoppingBag },
    { label: "Pacotes Promocionais", href: "/loja/pacotes", icon: Package },
    { label: "IA Receituário", href: "/loja/ia-receituario", icon: Zap },
    { label: "Como Funciona", href: "/loja/como-funciona" },
    { label: "Coleta Domiciliar", href: "/servicos#coleta" },
  ];

  const supportLinks = [
    { label: "FAQ - Perguntas Frequentes", href: "/faq" },
    { label: "Resultados Online", href: "#resultados" },
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Termos de Uso", href: "#termos" },
  ];

  const institutionalLinks = [
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Contato", href: "/contato" },
    { label: "Convênios", href: "/convenios" },
  ];

  const certificates = [
    { name: "ISO 9001", image: "/assets/certificados/ISO.svg", alt: "Certificação ISO 9001" },
    { name: "DICQ", image: "/assets/certificados/DICQ.svg", alt: "Certificação DICQ" },
    { name: "PNCQ", image: "/assets/certificados/PNCQ.svg", alt: "Certificação PNCQ" },
    { name: "PREVECAL", image: "/assets/certificados/PREVECAL.svg", alt: "Certificação PREVECAL" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-white border-t border-border-clean">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Seção Principal - E-commerce em Destaque */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pb-12 border-b border-border-clean">
          
          {/* Brand */}
          <div>
            <a href="/loja" className="inline-block mb-4">
              <img
                src="/assets/logo.svg"
                alt="Anacli"
                className="h-10 w-auto hover:opacity-80 transition-opacity"
              />
            </a>
            <p className="text-text-secondary-clean text-sm mb-4">
              Agende seus exames online com praticidade e segurança.
            </p>
            
            {/* Certificados */}
            <div className="flex items-center gap-2 flex-wrap">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  title={cert.alt}
                >
                  <div className="w-12 h-8 bg-gray-50 rounded border border-border-clean p-1 flex items-center justify-center hover:border-brand-accent/30 transition-all">
                    <img
                      src={cert.image}
                      alt={cert.alt}
                      className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* E-commerce Links */}
          <div>
            <h4 className="text-base font-clean-semibold text-text-primary-clean mb-4">E-commerce</h4>
            <ul className="space-y-2.5">
              {ecommerceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-text-secondary-clean hover:text-brand-accent transition-colors font-clean-medium group"
                  >
                    {link.icon && <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-base font-clean-semibold text-text-primary-clean mb-4">Suporte</h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary-clean hover:text-brand-accent transition-colors block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Institucional */}
          <div>
            <h4 className="text-base font-clean-semibold text-text-primary-clean mb-4">Institucional</h4>
            <ul className="space-y-2.5">
              {institutionalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary-clean hover:text-brand-accent transition-colors block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Exames de A a Z (SEO) */}
        <div className="mb-8 pb-8 border-b border-border-clean">
          <h4 className="text-xs font-clean-semibold text-text-secondary-clean mb-4 text-center">Exames Disponíveis</h4>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 max-w-5xl mx-auto">
            {examsAZ.map((exam) => (
              <a
                key={exam.id}
                href={`/loja/produto/${exam.slug}`}
                className="text-xs text-text-secondary-clean hover:text-brand-accent transition-colors"
              >
                {exam.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar - Social + Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-text-secondary-clean">
            © {currentYear} Laboratório Anacli. Todos os direitos reservados.
          </div>
          
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-brand-accent/10 flex items-center justify-center transition-all duration-300 group"
              >
                <social.icon className="h-4 w-4 text-text-secondary-clean group-hover:text-brand-accent transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
