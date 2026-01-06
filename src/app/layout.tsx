import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  adjustFontFallback: true,
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://anacli.com.br'),
  title: {
    default: 'Anacli Laboratorial - Excelência em Análises Clínicas | Feira de Santana - BA',
    template: '%s | Anacli Laboratorial'
  },
  description: 'Laboratório de análises clínicas em Feira de Santana - BA com mais de 56 anos de experiência. Exames laboratoriais, toxicológicos, check-ups e convênios. Tecnologia de ponta e atendimento humanizado.',
  authors: [{ name: 'Anacli Laboratorial', url: 'https://anacli.com.br' }],
  keywords: [
    'laboratório análises clínicas',
    'exames laboratoriais Feira de Santana',
    'laboratório Bahia',
    'exames toxicológicos',
    'check-up médico',
    'convênios médicos',
    'laboratório certificado ISO',
    'análises clínicas BA',
    'exames de sangue',
    'laboratório DICQ',
    'exames PNCQ'
  ],
  openGraph: {
    title: 'Anacli Laboratorial - Excelência em Análises Clínicas',
    description: 'Laboratório de análises clínicas em Feira de Santana - BA com mais de 56 anos de experiência. Tecnologia de ponta, certificações ISO e atendimento humanizado.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://anacli.com.br',
    siteName: 'Anacli Laboratorial',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anacli Laboratorial - Laboratório de Análises Clínicas'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anacli Laboratorial - Excelência em Análises Clínicas',
    description: 'Laboratório de análises clínicas em Feira de Santana - BA com mais de 56 anos de experiência.',
    images: ['/assets/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://anacli.com.br'
  },
  other: {
    'google-site-verification': 'your-google-verification-code'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Anacli Laboratorial',
    description: 'Laboratório de análises clínicas em Feira de Santana - BA com mais de 56 anos de experiência',
    url: 'https://anacli.com.br',
    logo: 'https://anacli.com.br/assets/logo.svg',
    image: 'https://anacli.com.br/assets/og-image.jpg',
    telephone: '+55-75-3030-0030',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Exemplo, 123',
      addressLocality: 'Feira de Santana',
      addressRegion: 'BA',
      postalCode: '44000-000',
      addressCountry: 'BR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -12.2664,
      longitude: -38.9663
    },
    openingHours: [
      'Mo-Fr 06:00-18:00',
      'Sa 06:00-12:00'
    ],
    sameAs: [
      'https://instagram.com/lab_anacli',
      'https://facebook.com/anacli'
    ],
    medicalSpecialty: [
      'Clinical Laboratory Services',
      'Medical Testing',
      'Toxicology Testing'
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 9001 Certification',
        credentialCategory: 'Quality Management'
      },
      {
        '@type': 'EducationalOccupationalCredential', 
        name: 'DICQ Accreditation',
        credentialCategory: 'Technical Accreditation'
      }
    ]
  }

  return (
    <html lang="pt-BR" className={plusJakartaSans.className}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Critical CSS inline para evitar render blocking */}
        <style dangerouslySetInnerHTML={{__html: `:root{--background:0 0% 100%;--foreground:0 0% 15%;--primary:68 68% 45%;--primary-foreground:0 0% 100%;--accent:335 100% 50%;--radius:0.75rem}*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:hsl(0 0% 90%)}html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:system-ui,-apple-system,sans-serif}body{margin:0;line-height:inherit;background:hsl(var(--background));color:hsl(var(--foreground));-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.min-h-screen{min-height:100vh}img,video{max-width:100%;height:auto}button{cursor:pointer}a{color:inherit;text-decoration:inherit}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}`}} />
        
        {/* Otimizações de performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#A6C022" />
        <meta name="msapplication-TileColor" content="#A6C022" />
        
        {/* Pré-conexão com Google Fonts para Plus Jakarta Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload de recursos críticos LCP com fetchpriority HIGH */}
        <link rel="preload" href="/assets/unidade.avif" as="image" type="image/avif" fetchPriority="high" />
        <link rel="preload" href="/assets/teste-mobile.avif" as="image" type="image/avif" fetchPriority="high" media="(max-width: 1023px)" />
        <link rel="preload" href="/assets/teste.avif" as="image" type="image/avif" fetchPriority="high" media="(min-width: 1024px)" />
        
        {/* Pré-conexão com CDN do Instagram - APENAS dns-prefetch para não bloquear */}
        <link rel="dns-prefetch" href="https://scontent-bsb1-1.cdninstagram.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Logo com prioridade baixa */}
        <link rel="preload" href="/assets/logo.svg" as="image" type="image/svg+xml" fetchPriority="low" />
        
        {/* Preload dos primeiros thumbnails de vídeo para melhor performance */}
        <link rel="preload" href="/assets/reels/thumbnails/video-1.webp" as="image" type="image/webp" fetchPriority="low" />
        <link rel="preload" href="/assets/reels/thumbnails/video-2.webp" as="image" type="image/webp" fetchPriority="low" />
        <link rel="preload" href="/assets/reels/thumbnails/video-3.webp" as="image" type="image/webp" fetchPriority="low" />
        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}