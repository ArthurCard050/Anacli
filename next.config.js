/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  reactStrictMode: true,
  async redirects() {
    // Redirects específicos para posts antigos do blog
    // Adicione aqui apenas os slugs de posts que realmente existem
    return [
      // Exemplo de redirect específico:
      // {
      //   source: '/anacli-tem-certificado-de-qualidade-internacional-prevecal',
      //   destination: '/blog/anacli-tem-certificado-de-qualidade-internacional-prevecal',
      //   permanent: true,
      // },
      
      // IMPORTANTE: NÃO use redirects genéricos como o que estava aqui antes
      // Isso causava redirecionamento de TODAS as URLs 404 para /blog/
      // Adicione apenas redirects específicos conforme necessário
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent-bsb1-1.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.anacli.com.br',
        port: '',
        pathname: '/**',
      }
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
  },
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig