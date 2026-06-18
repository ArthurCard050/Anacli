import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOJA_PASSWORD = '123AnacliBR';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // PROTEÇÃO DA LOJA COM SENHA
  if (pathname.startsWith('/loja') || pathname.startsWith('/loja-anacli')) {
    // Verifica se tem o cookie de autenticação
    const authCookie = request.cookies.get('loja-auth');
    
    // Se não tem cookie ou cookie inválido, redireciona para login
    if (!authCookie || authCookie.value !== LOJA_PASSWORD) {
      // Se está tentando acessar a API de login, deixa passar
      if (pathname === '/api/loja-auth') {
        return NextResponse.next();
      }
      
      // Redireciona para página de login
      const loginUrl = new URL('/loja-login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

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
    '/sobre',
    '/contato',
    '/servicos',
    '/convenios',
    '/certificacoes',
    '/estrutura',
    '/privacidade',
    '/exclusao-dados',
    '/loja-login',
    '/admin',
  ];

  // Prefixos de rotas dinâmicas válidas
  const validPrefixes = [
    '/blog/',
    '/loja/',
    '/loja-anacli/',
    '/admin/',
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
