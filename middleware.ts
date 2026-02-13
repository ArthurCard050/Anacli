import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect de URLs antigas do blog para o novo formato
  // Formato antigo: /slug-do-post/
  // Formato novo: /blog/slug-do-post/
  
  // IMPORTANTE: Este middleware está DESABILITADO por enquanto
  // Motivo: Estava redirecionando TODAS as URLs 404 para /blog/
  // Solução: Use redirects no next.config.js para URLs específicas conhecidas
  
  // Lista de caminhos conhecidos do site (rotas válidas)
  const knownPaths = [
    '/',
    '/blog',
    '/loja',
    '/sobre',
    '/contato',
    '/servicos',
    '/convenios',
    '/certificacoes',
    '/estrutura',
    '/privacidade',
    '/exclusao-dados',
  ];

  // Prefixos de rotas dinâmicas válidas
  const validPrefixes = [
    '/blog/',
    '/loja/',
    '/_next/',
    '/api/',
    '/assets/',
  ];

  // Verifica se é uma rota conhecida ou começa com um prefixo válido
  const isValidRoute = 
    knownPaths.includes(pathname) || 
    validPrefixes.some(prefix => pathname.startsWith(prefix)) ||
    pathname.includes('.'); // Arquivos estáticos

  // Se não for uma rota válida, deixa o Next.js mostrar a página 404
  // NÃO redireciona automaticamente para /blog/
  if (!isValidRoute) {
    // Apenas deixa passar - Next.js vai mostrar a página 404
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configurar quais rotas o middleware deve processar
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)',
  ],
};
