import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect de URLs antigas do blog para o novo formato
  // Formato antigo: /slug-do-post/
  // Formato novo: /blog/slug-do-post/
  
  // Lista de caminhos que NÃO devem ser redirecionados
  const excludedPaths = [
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
    '/_next',
    '/api',
    '/assets',
    '/favicon',
  ];

  // Verifica se o caminho começa com algum dos caminhos excluídos
  const isExcluded = excludedPaths.some(path => pathname.startsWith(path));

  // Se não for excluído e não começar com /blog/, redireciona
  if (!isExcluded && pathname !== '/' && !pathname.startsWith('/blog/')) {
    // Remove a barra inicial e final se existir
    const slug = pathname.replace(/^\//, '').replace(/\/$/, '');
    
    // Se o slug não estiver vazio e não for um arquivo estático
    if (slug && !slug.includes('.')) {
      // Redireciona para /blog/slug
      const url = request.nextUrl.clone();
      url.pathname = `/blog/${slug}`;
      return NextResponse.redirect(url, 301); // 301 = Permanent redirect (bom para SEO)
    }
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
