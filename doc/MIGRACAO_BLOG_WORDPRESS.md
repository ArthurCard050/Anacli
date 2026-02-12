# Guia de Migração do Blog WordPress para Next.js

## Opções de Migração

### Opção 1: Headless WordPress (Recomendado para Transição)
Manter o WordPress como CMS e usar Next.js apenas no frontend.

**Vantagens:**
- ✅ Não perde nenhum conteúdo
- ✅ Equipe continua usando interface familiar do WordPress
- ✅ Migração gradual e segura
- ✅ SEO preservado com redirects

**Como funcionar:**
1. WordPress continua rodando (pode ser em subdomínio: `cms.anacli.com.br`)
2. Next.js consome dados via WordPress REST API ou GraphQL
3. Site público usa Next.js com design novo
4. Administração continua no WordPress

**Implementação:**
```bash
# Instalar dependência
npm install @wordpress/api-fetch
```

### Opção 2: Exportar e Migrar Conteúdo
Exportar posts do WordPress e importar para sistema de arquivos (Markdown/MDX).

**Vantagens:**
- ✅ Site 100% estático e rápido
- ✅ Sem dependência do WordPress
- ✅ Controle total do conteúdo
- ✅ Versionamento com Git

**Desvantagens:**
- ⚠️ Precisa migrar todo conteúdo
- ⚠️ Equipe precisa aprender novo sistema

### Opção 3: CMS Moderno (Strapi, Contentful, Sanity)
Migrar para um CMS headless moderno.

**Vantagens:**
- ✅ Interface moderna e intuitiva
- ✅ API nativa
- ✅ Melhor performance
- ✅ Recursos avançados

---

## RECOMENDAÇÃO: Opção 1 - Headless WordPress

### Passo 1: Preparar WordPress

1. **Instalar plugin WPGraphQL** (recomendado) ou usar REST API nativa
2. **Habilitar permalinks amigáveis**
3. **Configurar CORS** para permitir acesso do Next.js

### Passo 2: Criar Sistema de Blog Dinâmico no Next.js

Vou criar a estrutura para você:

#### 1. Criar serviço de API do WordPress
```typescript
// src/lib/wordpress.ts
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://seu-wordpress.com.br/wp-json/wp/v2';

export async function getPosts(page = 1, perPage = 12) {
  const res = await fetch(
    `${WORDPRESS_API_URL}/posts?page=${page}&per_page=${perPage}&_embed`,
    { next: { revalidate: 60 } } // Cache por 60 segundos
  );
  
  if (!res.ok) throw new Error('Failed to fetch posts');
  
  const posts = await res.json();
  const totalPages = res.headers.get('X-WP-TotalPages');
  
  return { posts, totalPages: parseInt(totalPages || '1') };
}

export async function getPost(slug: string) {
  const res = await fetch(
    `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`,
    { next: { revalidate: 60 } }
  );
  
  if (!res.ok) throw new Error('Failed to fetch post');
  
  const posts = await res.json();
  return posts[0];
}

export async function getCategories() {
  const res = await fetch(
    `${WORDPRESS_API_URL}/categories`,
    { next: { revalidate: 3600 } } // Cache por 1 hora
  );
  
  if (!res.ok) throw new Error('Failed to fetch categories');
  
  return res.json();
}
```

#### 2. Atualizar página do blog para usar dados reais
```typescript
// src/app/blog/page.tsx
import { getPosts, getCategories } from '@/lib/wordpress';
import BlogHeroSection from './components/BlogHeroSection';
import BlogListSection from './components/BlogListSection';
import BlogCategoriesSection from './components/BlogCategoriesSection';
import BlogNewsletterSection from './components/BlogNewsletterSection';

export default async function BlogPage() {
  const { posts, totalPages } = await getPosts();
  const categories = await getCategories();

  return (
    <main className="min-h-screen">
      <BlogHeroSection />
      <BlogCategoriesSection categories={categories} />
      <BlogListSection posts={posts} totalPages={totalPages} />
      <BlogNewsletterSection />
    </main>
  );
}
```

#### 3. Atualizar página de post individual
```typescript
// src/app/blog/[slug]/page.tsx
import { getPost } from '@/lib/wordpress';
import BlogPostContent from '../components/BlogPostContent';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <BlogPostContent post={post} />
    </main>
  );
}
```

### Passo 3: Configurar Variáveis de Ambiente

```env
# .env.local
WORDPRESS_API_URL=https://seu-wordpress.com.br/wp-json/wp/v2
```

### Passo 4: Preservar SEO com Redirects

```javascript
// next.config.js
module.exports = {
  async redirects() {
    return [
      // Redirecionar URLs antigas do WordPress para novas
      {
        source: '/blog/:year/:month/:day/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/category/:slug',
        destination: '/blog?category=:slug',
        permanent: true,
      },
    ];
  },
};
```

---

## Alternativa: Exportação Manual (Opção 2)

### Ferramentas de Exportação

1. **WordPress to Markdown Exporter**
   - Plugin: https://wordpress.org/plugins/wordpress-to-markdown-exporter/
   - Exporta posts como arquivos Markdown

2. **WP All Export**
   - Plugin premium que exporta para JSON/CSV
   - Mais controle sobre dados exportados

3. **Script Python personalizado**
   - Usa WordPress REST API
   - Baixa todos os posts e converte para Markdown

### Estrutura de Arquivos Markdown

```
src/content/blog/
├── 2024-01-15-exames-preventivos.md
├── 2024-01-12-hemograma-completo.md
└── 2024-01-10-alimentos-imunidade.md
```

### Formato do Arquivo Markdown

```markdown
---
title: "A Importância dos Exames Preventivos"
slug: "exames-preventivos-terceira-idade"
date: "2024-01-15"
category: "Prevenção"
author: "Dr. Carlos Silva"
excerpt: "Descubra quais exames são essenciais..."
image: "/blog/exames-preventivos.jpg"
---

Conteúdo do post aqui...
```

---

## Plano de Migração Recomendado

### Fase 1: Preparação (1-2 dias)
1. ✅ Fazer backup completo do WordPress
2. ✅ Documentar todas as URLs dos posts
3. ✅ Configurar WordPress para API
4. ✅ Testar acesso à API

### Fase 2: Desenvolvimento (2-3 dias)
1. ✅ Implementar integração com WordPress API
2. ✅ Adaptar componentes do blog para dados reais
3. ✅ Configurar redirects para SEO
4. ✅ Testar em ambiente de staging

### Fase 3: Deploy (1 dia)
1. ✅ Deploy do Next.js em produção
2. ✅ Configurar DNS
3. ✅ Testar todos os posts
4. ✅ Monitorar erros

### Fase 4: Otimização (contínuo)
1. ✅ Configurar cache
2. ✅ Otimizar imagens
3. ✅ Monitorar performance
4. ✅ Ajustar conforme necessário

---

## Checklist de Migração

### Antes do Deploy
- [ ] Backup completo do WordPress
- [ ] Lista de todas as URLs dos posts
- [ ] Imagens baixadas e otimizadas
- [ ] Redirects configurados
- [ ] Testes em staging

### Durante o Deploy
- [ ] WordPress API funcionando
- [ ] Next.js conectado à API
- [ ] DNS configurado
- [ ] SSL ativo
- [ ] Redirects testados

### Após o Deploy
- [ ] Todos os posts acessíveis
- [ ] Imagens carregando
- [ ] SEO preservado (Google Search Console)
- [ ] Performance monitorada
- [ ] Formulário de newsletter funcionando

---

## Ferramentas Úteis

### Para Headless WordPress
- **WPGraphQL**: https://www.wpgraphql.com/
- **ACF to REST API**: Para campos customizados
- **Yoast SEO**: Mantém metadados SEO

### Para Exportação
- **WordPress Exporter**: Ferramenta nativa
- **WP All Export**: Plugin premium
- **wordpress-export-to-markdown**: Script Node.js

### Para Monitoramento
- **Google Search Console**: Monitorar SEO
- **Vercel Analytics**: Performance do site
- **Sentry**: Monitorar erros

---

## Próximos Passos

1. **Decidir qual opção usar** (recomendo Opção 1 - Headless)
2. **Fazer backup do WordPress**
3. **Configurar ambiente de staging**
4. **Implementar integração**
5. **Testar exaustivamente**
6. **Deploy gradual**

Quer que eu implemente a integração com WordPress API agora?
