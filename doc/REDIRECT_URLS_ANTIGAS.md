# Redirect de URLs Antigas do Blog

## Problema

URLs antigas do blog indexadas no Google não funcionavam após migração:
- **Formato antigo**: `https://anacli.com.br/slug-do-post/`
- **Formato novo**: `https://anacli.com.br/blog/slug-do-post/`

## ❌ Solução Inicial (INCORRETA)

Tentamos usar um redirect genérico que redirecionava TODAS as URLs não encontradas para `/blog/`:

```javascript
// PROBLEMA: Isso redireciona TUDO para /blog/, até URLs que não existem!
{
  source: '/:slug((?!blog|loja|sobre|...).*)',
  destination: '/blog/:slug',
  permanent: true,
}
```

**Resultado**: Qualquer URL digitada (ex: `/teste123`) era redirecionada para `/blog/teste123`, mesmo que não existisse.

## ✅ Solução Correta

### Opção 1: Redirects Específicos (Recomendado)

Adicionar redirects apenas para posts que realmente existem no `next.config.js`:

```javascript
async redirects() {
  return [
    {
      source: '/anacli-tem-certificado-de-qualidade-internacional-prevecal',
      destination: '/blog/anacli-tem-certificado-de-qualidade-internacional-prevecal',
      permanent: true, // 301 redirect
    },
    {
      source: '/outro-post-antigo',
      destination: '/blog/outro-post-antigo',
      permanent: true,
    },
    // Adicione mais conforme necessário
  ];
}
```

**Vantagens**:
- ✅ Não redireciona URLs aleatórias
- ✅ Preserva SEO dos posts específicos
- ✅ Mostra 404 para URLs que realmente não existem

### Opção 2: Verificação Dinâmica (Avançado)

Se você tem muitos posts, pode verificar se o post existe antes de redirecionar:

```javascript
// middleware.ts
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Lista de rotas conhecidas
  const knownRoutes = ['/', '/blog', '/loja', '/sobre', ...];
  
  // Se não for uma rota conhecida
  if (!knownRoutes.some(route => pathname.startsWith(route))) {
    // Verifica se existe como post no blog
    const slug = pathname.replace(/^\//, '').replace(/\/$/, '');
    const postExists = await checkIfPostExists(slug); // Função que verifica no WordPress
    
    if (postExists) {
      return NextResponse.redirect(new URL(`/blog/${slug}`, request.url), 301);
    }
  }
  
  return NextResponse.next();
}
```

**Desvantagens**:
- ❌ Mais complexo
- ❌ Requer chamada à API do WordPress
- ❌ Pode ser mais lento

## Implementação Atual

### 1. Middleware Desabilitado

O `middleware.ts` agora apenas deixa passar as requisições sem fazer redirects automáticos:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Não faz redirects automáticos
  // Deixa o Next.js mostrar 404 para URLs não encontradas
  return NextResponse.next();
}
```

### 2. Redirects Vazios

O `next.config.js` tem um array vazio de redirects:

```javascript
async redirects() {
  return [
    // Adicione redirects específicos aqui conforme necessário
  ];
}
```

## Como Adicionar Redirects para Posts Específicos

### Passo 1: Identificar Posts Antigos

Use o Google Search Console para ver quais URLs antigas estão gerando 404:

1. Acesse: https://search.google.com/search-console
2. Vá em **Cobertura** ou **Páginas**
3. Veja erros 404
4. Identifique quais são posts do blog

### Passo 2: Adicionar Redirects

No `next.config.js`, adicione cada post:

```javascript
async redirects() {
  return [
    {
      source: '/post-antigo-1',
      destination: '/blog/post-antigo-1',
      permanent: true,
    },
    {
      source: '/post-antigo-2',
      destination: '/blog/post-antigo-2',
      permanent: true,
    },
  ];
}
```

### Passo 3: Deploy e Teste

1. Faça commit e push
2. Aguarde deploy
3. Teste as URLs antigas
4. Verifique no Search Console após alguns dias

## Exemplo Completo

```javascript
// next.config.js
async redirects() {
  return [
    // Posts do blog que existiam no formato antigo
    {
      source: '/anacli-tem-certificado-de-qualidade-internacional-prevecal',
      destination: '/blog/anacli-tem-certificado-de-qualidade-internacional-prevecal',
      permanent: true,
    },
    {
      source: '/importancia-exames-preventivos',
      destination: '/blog/importancia-exames-preventivos',
      permanent: true,
    },
    {
      source: '/check-up-anual-saude',
      destination: '/blog/check-up-anual-saude',
      permanent: true,
    },
    // Adicione mais conforme identificar no Search Console
  ];
}
```

## Benefícios do Redirect 301

- **Preserva SEO**: Transfere autoridade da URL antiga para a nova
- **Mantém tráfego**: Usuários que clicam em links antigos chegam ao conteúdo
- **Atualiza índice**: Google entende que a URL mudou permanentemente
- **Melhora UX**: Evita páginas 404 para conteúdo que existe

## Monitoramento

### Google Search Console

1. **Cobertura**: Monitore redução de erros 404
2. **Desempenho**: Veja se tráfego dos posts antigos está sendo mantido
3. **Sitemaps**: Certifique-se de que apenas URLs novas estão no sitemap

### Logs do Servidor

Se usar Vercel/Netlify, monitore:
- Quantidade de redirects 301
- URLs que ainda geram 404
- Tempo de resposta dos redirects

## Troubleshooting

### Redirect não funciona?

**Possíveis causas**:
1. Cache do navegador (Ctrl+Shift+R para limpar)
2. Cache do CDN (limpe no painel Vercel/Netlify)
3. Sintaxe incorreta no next.config.js

**Solução**:
1. Teste em aba anônima
2. Limpe cache do CDN
3. Verifique logs de build

### Ainda aparece 404?

**Possíveis causas**:
1. URL não está na lista de redirects
2. Slug está diferente (com/sem barra final)
3. Deploy não propagou

**Solução**:
1. Adicione o redirect específico
2. Teste ambas as variações (com e sem `/`)
3. Aguarde 5-10 minutos após deploy

## Conclusão

A solução correta é usar redirects específicos para posts conhecidos, não um redirect genérico que captura tudo. Isso:

- ✅ Preserva SEO dos posts antigos
- ✅ Mostra 404 apropriado para URLs inválidas
- ✅ Mantém controle sobre o que é redirecionado
- ✅ Evita comportamentos inesperados

**Próximos passos**:
1. Identifique posts antigos no Search Console
2. Adicione redirects específicos no `next.config.js`
3. Faça deploy e monitore

---

**Última atualização**: 12/02/2026
