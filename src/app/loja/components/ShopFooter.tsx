'use client';

import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from 'next/image';
import { mockExams } from '../data/mock-products';

export default function ShopFooter() {
  const currentYear = new Date().getFullYear();

  // Lista de exames A-Z para SEO
  const examsAZ = [...mockExams].sort((a, b) => a.name.localeCompare(b.name));

  const footerSections = [
    {
      title: "E-commerce",
      links: [
        { label: "Exames", href: "#vitrine" },
        { label: "Pacotes", href: "#pacotes" },
        { label: "Como Funciona", href: "#como-funciona" },
        { label: "Preparo para Exames", href: "#preparo" },
      ],
    },
    {
      title: "Serviços",
      links: [
        { label: "Análises Clínicas", href: "/servicos#exames" },
        { label: "Toxicológicos", href: "/servicos#servicos" },
        { label: "Check-up", href: "/servicos#servicos" },
        { label: "Coleta Domiciliar", href: "/servicos#coleta" },
      ],
    },
    {
      title: "Institucional",
      links: [
        { label: "Sobre Nós", href: "/sobre" },
        { label: "Certificações", href: "/certificacoes" },
        { label: "Convênios", href: "/convenios" },
        { label: "Contato", href: "/contato" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Resultados Online", href: "#resultados" },
        { label: "Política de Privacidade", href: "#privacidade" },
        { label: "Termos de Uso", href: "#termos" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const certificates = [
    {
      name: "ISO 9001",
      image: "/assets/certificados/ISO.svg",
      alt: "Certificação ISO 9001"
    },
    {
      name: "DICQ",
      image: "/assets/certificados/DICQ.svg",
      alt: "Certificação DICQ"
    },
    {
      name: "PNCQ",
      image: "/assets/certificados/PNCQ.svg",
      alt: "Certificação PNCQ"
    },
    {
      name: "PREVECAL",
      image: "/assets/certificados/PREVECAL.svg",
      alt: "Certificação PREVECAL"
    }
  ];

  return (
    <footer className="bg-gray-900 text-white border-t border-primary/20 rounded-t-[20px] md:rounded-t-[40px] lg:rounded-t-[64px]">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1 text-center">
            <a
              href="/loja"
              className="inline-block mb-4 cursor-pointer"
            >
              <Image
                src="/assets/Logo-Hor-branca.svg"
                alt="Anacli - Laboratório de Análises Clínicas"
                width={120}
                height={48}
                className="h-12 w-auto mb-2 hover:opacity-80 transition-opacity mx-auto"
              />
              <div className="text-xs text-gray-400 tracking-wide select-none">
                Loja Online de Exames
              </div>
            </a>
            <p className="text-sm text-gray-300 leading-relaxed">
              Agende seus exames online com praticidade e segurança. Resultados rápidos e confiáveis.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="text-center">
              <h4 className="font-bold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certificates and GPTW Section */}
        <div className="pt-8 border-t border-gray-700 mb-8">
          <h4 className="text-center text-sm font-semibold text-gray-300 mb-8">
            Certificações e Reconhecimentos
          </h4>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* GPTW Highlight Card */}
            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-4 bg-primary/20 rounded-2xl p-6 border border-white/10">
                <img
                  src="/assets/certificados/GPTW.svg"
                  alt="Great Place to Work"
                  className="w-24 h-16 object-contain"
                />
                <div className="text-left">
                  <div className="text-lg font-bold text-white mb-1">
                    Great Place to Work
                  </div>
                  <div className="text-sm text-gray-300">
                    Certificado como uma das melhores empresas para trabalhar
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Certificates */}
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  title={cert.alt}
                >
                  <div className="w-16 h-10 bg-white/10 rounded-lg p-2 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                    <img
                      src={cert.image}
                      alt={cert.alt}
                      className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="text-xs text-gray-400 text-center mt-1 group-hover:text-gray-300 transition-colors">
                    {cert.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exames de A a Z (SEO) */}
        <div className="pt-8 border-t border-gray-700 mb-8">
          <h4 className="text-center text-sm font-semibold text-gray-300 mb-6">Exames de A a Z</h4>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-4xl mx-auto">
            {examsAZ.map((exam) => (
              <a
                key={exam.id}
                href={`/loja/produto/${exam.slug}`}
                className="text-xs text-gray-400 hover:text-primary transition-colors"
              >
                {exam.name}
              </a>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8 pt-8 border-t border-gray-700">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              aria-label={social.label}
              className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-accent flex items-center justify-center transition-all duration-300 group"
            >
              <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700">
          <div className="text-center">
            <div className="text-sm text-gray-400">
              © {currentYear} Laboratório Anacli — Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
