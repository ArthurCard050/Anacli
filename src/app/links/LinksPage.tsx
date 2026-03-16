'use client';

import { ChevronRight, Shield, MessageCircle, Globe, MapPin, Instagram, Facebook } from 'lucide-react';

const MAP_EMBED = "https://maps.google.com/maps?q=Rua+Aristides+Novis+288+Kalil%C3%A2ndia+Feira+de+Santana+BA&output=embed";

const links = [
  {
    id: 'resultados',
    label: 'Resultado de Exames',
    icon: Shield,
    href: 'http://anacli.ddns.com.br:8090/web_laudos/login.asp',
    bg: 'bg-accent',
    iconBg: 'bg-white/20',
    textColor: 'text-white',
    external: true,
  },
  {
    id: 'whatsapp',
    label: 'Atendimento via WhatsApp',
    icon: MessageCircle,
    href: 'https://api.whatsapp.com/send?phone=557530300030&text=Ol%C3%A1.%20Vim%20atrav%C3%A9s%20do%20Instagram%20e%20desejo%20agendar%20um%20atendimento.',
    bg: 'bg-green-500',
    iconBg: 'bg-white/20',
    textColor: 'text-white',
    external: true,
  },
  {
    id: 'site',
    label: 'Acesse nosso Site',
    icon: Globe,
    href: 'https://anacli.com.br',
    bg: 'bg-white',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    textColor: 'text-gray-800',
    external: false,
  },
  {
    id: 'localizacao',
    label: 'Localização',
    sublabel: 'Feira de Santana - BA',
    icon: MapPin,
    href: 'https://maps.app.goo.gl/S5pB2jZHZs9g1ARV6',
    bg: 'bg-white',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
    textColor: 'text-gray-800',
    external: true,
  },
];

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lab_anacli/',
    icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/laboratorioanacli',
    icon: Facebook,
  },
];

export default function LinksPage() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Top bar */}
      <div className="w-full max-w-sm flex items-center justify-center px-4 py-4">
        <span className="font-semibold text-gray-800 text-base">@anacli</span>
      </div>

      {/* Content */}
      <div className="w-full max-w-sm px-4 pb-10 flex flex-col items-center gap-5">
        {/* Avatar */}
        <div className="mt-2 mb-1">
          <div className="w-24 h-24 rounded-full border-4 border-gray-200 overflow-hidden bg-white flex items-center justify-center shadow-md">
            <img
              src="/icone.svg"
              alt="Anacli Laboratório"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        {/* Identity */}
        <div className="text-center -mt-1">
          <h1 className="text-xl font-bold text-gray-900">Anacli Laboratório</h1>
          <p className="text-accent font-medium text-sm mt-0.5">Compromisso &amp; Tradição em Saúde</p>
        </div>

        {/* Link Buttons */}
        <div className="w-full flex flex-col gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                href={link.href}
                target={link.external ? '_blank' : '_self'}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl shadow-sm transition-all duration-200 active:scale-[0.98] hover:shadow-md ${link.bg}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${link.iconBg}`}>
                  <Icon className={`h-5 w-5 ${link.iconColor ?? 'text-white'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`font-semibold text-sm ${link.textColor}`}>{link.label}</span>
                  {link.sublabel && (
                    <p className="text-gray-500 text-xs mt-0.5">{link.sublabel}</p>
                  )}
                </div>
                <ChevronRight className={`h-4 w-4 flex-shrink-0 ${link.textColor === 'text-white' ? 'text-white/70' : 'text-gray-400'}`} />
              </a>
            );
          })}
        </div>

        {/* Map */}
        <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-40">
          <iframe
            src={MAP_EMBED}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Anacli"
          />
        </div>

        {/* Social */}
        <div className="w-full text-center">
          <p className="text-accent font-bold text-xs tracking-widest uppercase mb-4">Nossas Redes</p>
          <div className="flex items-center justify-center gap-6">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all duration-200 active:scale-95"
                >
                  <Icon className="h-5 w-5 text-gray-700" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-2">
          <p className="text-gray-400 text-xs">© {new Date().getFullYear()} Anacli Laboratório</p>
          <p className="text-gray-400 text-xs">Feira de Santana - BA</p>
        </div>
      </div>
    </div>
  );
}
