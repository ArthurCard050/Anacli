# Integração WordPress CMS - Blog Anacli

## Visão Geral

O blog da Anacli agora está integrado com WordPress como CMS headless, consumindo conteúdo através da API REST do WordPress.

## Configuração

### API WordPress
- **URL Base**: `https://cms.anacli.com.br/wp-json/wp/v2`
- **Revalidação**: 60 segundos (ISR - Incremental Static Regeneration)

### Arquivos Criados

1. **`src/lib/wordpress.ts`**
   - Funções para consumir a API do WordPress
   - Types TypeScript para posts, categorias e autores
   - Helpers para formatação de dados

2. **Páginas Atualizadas**
   - `src/app/blog/page.tsx` - Lista de posts
   - `src/app/blog/[slug]/page.tsx` - Post individual

3. **Componentes Atualizados**
   - `BlogListSection.tsx` - Exibe posts do WordPress
   - `BlogCategoriesSection.tsx` - Categorias dinâmicas
   - `BlogPostContent.tsx` - Conteúdo do post
   - `BlogRelatedPosts.tsx` - Posts relacionados

## Funcionalidades

### Lista de Posts (`/blog`)
- Busca até 20 posts mais recentes
- Layout em grid com post em destaque
- Cards horizontais estilo G1
- Categorias dinâmicas do WordPress
- Imagens otimizadas com Next.js Image

### Post Individual (`/blog/[slug]`)
- Conteúdo completo do WordPress
- Imagem de destaque
- Informações do autor com bio
- Tags do post
- Botões de compartilhamento (Facebook, Twitter, LinkedIn)
- Posts relacionados por categoria
- CTA para agendamento de exames
- Metadata dinâmica para SEO

### Recursos Técnicos

#### ISR (Incremental Static Regeneration)
```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

#### Static Site Generation
- Posts são gerados estaticamente no build
- `generateStaticParams()` busca todos os posts do WordPress
- Fallback para páginas não geradas

#### Metadata Dinâmica
- Título e descrição do post
- Open Graph tags para redes sociais
- Imagem de destaque

## Funções da API

### `getPosts(params?)`
Busca lista de posts com parâmetros opcionais:
```typescript
const posts = await getPosts({
  per_page: 20,
  page: 1,
  categories: '5,10',
  search: 'saúde'
});
```

### `getPostBySlug(slug)`
Busca um post específico pelo slug:
```typescript
const post = await getPostBySlug('exames-preventivos');
```

### `getCategories()`
Busca todas as categorias:
```typescript
const categories = await getCategories();
```

### `getRelatedPosts(categoryIds, excludeId, limit)`
Busca posts relacionados por categoria:
```typescript
const related = await getRelatedPosts([5, 10], 123, 3);
```

## Helpers

### `stripHtml(html)`
Remove tags HTML de uma string:
```typescript
const text = stripHtml('<p>Hello <strong>World</strong></p>');
// Result: "Hello World"
```

### `calculateReadingTime(content)`
Calcula tempo de leitura em minutos:
```typescript
const minutes = calculateReadingTime(post.content.rendered);
// Result: 5
```

### `formatDate(dateString)`
Formata data para pt-BR:
```typescript
const formatted = formatDate('2024-01-15T10:00:00');
// Result: "15 de janeiro de 2024"
```

## Estrutura de Dados WordPress

### Post
```typescript
interface WordPressPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: Array<{
      name: string;
      description: string;
      avatar_urls: { [key: string]: string };
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}
```

## Configuração no WordPress

### Plugins Recomendados
1. **Yoast SEO** - Para otimização de SEO
2. **Advanced Custom Fields** - Para campos personalizados (se necessário)
3. **WP REST API Cache** - Para melhorar performance

### Permalinks
Configure permalinks para usar "Nome do post":
- Configurações → Permalinks → Nome do post

### Categorias Recomendadas
- Prevenção
- Nutrição
- Exames
- Bem-estar
- Saúde Mental
- Família

## Performance

### Otimizações Implementadas
1. **ISR**: Revalidação a cada 60 segundos
2. **Static Generation**: Posts gerados no build
3. **Image Optimization**: Next.js Image component
4. **Caching**: Headers de cache configurados

### Métricas Esperadas
- **TTFB**: < 200ms (com cache)
- **LCP**: < 2.5s
- **CLS**: < 0.1

## Próximos Passos

### Melhorias Futuras
1. [ ] Implementar busca de posts
2. [ ] Filtro por categoria
3. [ ] Paginação na lista de posts
4. [ ] Newsletter integration
5. [ ] Comentários (Disqus ou similar)
6. [ ] Breadcrumbs
7. [ ] Schema.org markup para SEO

### Monitoramento
- Configurar Google Analytics
- Implementar error tracking (Sentry)
- Monitorar performance (Vercel Analytics)

## Troubleshooting

### Post não aparece
1. Verifique se o post está publicado no WordPress
2. Aguarde 60 segundos para revalidação
3. Force rebuild: `npm run build`

### Imagem não carrega
1. Verifique se a imagem de destaque está configurada
2. Confirme que a URL da imagem é acessível
3. Adicione domínio no `next.config.js`:
```javascript
images: {
  domains: ['cms.anacli.com.br'],
}
```

### Erro 404 em post
1. Verifique se o slug está correto
2. Execute `npm run build` para gerar páginas estáticas
3. Verifique se `generateStaticParams()` está funcionando

## Contato

Para dúvidas sobre a integração, entre em contato com a equipe de desenvolvimento.

---

**Última atualização**: Janeiro 2024
**Versão**: 1.0.0
