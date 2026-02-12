# WordPress CMS - Guia Rápido

## ✅ Integração Completa

O blog da Anacli agora está integrado com WordPress como CMS headless!

## 🚀 Como Funciona

### Durante o Build
1. Next.js busca todos os posts do WordPress
2. Gera páginas estáticas para cada post
3. Cria a lista de posts com layout otimizado
4. Exporta tudo como HTML estático

### API WordPress
- **URL**: `https://cms.anacli.com.br/wp-json/wp/v2`
- **Método**: REST API
- **Dados**: Posts, categorias, autores, imagens

## 📝 Testando Localmente

### 1. Verificar a API
Abra no navegador:
```
https://cms.anacli.com.br/wp-json/wp/v2/posts
```

Você deve ver uma lista de posts em JSON.

### 2. Rodar o Dev Server
```bash
npm run dev
```

Acesse: `http://localhost:3000/blog`

### 3. Build para Produção
```bash
npm run build
```

Isso irá:
- Buscar todos os posts do WordPress
- Gerar páginas estáticas
- Criar a pasta `out/` com o site completo

## 📄 Páginas Criadas

### Lista de Posts
- **URL**: `/blog`
- **Conteúdo**: Últimos 20 posts
- **Layout**: Post em destaque + cards horizontais + grid

### Post Individual
- **URL**: `/blog/[slug]`
- **Conteúdo**: Post completo do WordPress
- **Features**:
  - Imagem de destaque
  - Conteúdo formatado
  - Informações do autor
  - Tags
  - Compartilhamento social
  - Posts relacionados
  - CTA para exames

## 🎨 Componentes

### BlogListSection
Exibe lista de posts com layout G1-style:
- 1 post em destaque (horizontal, 2 colunas)
- 1 card padrão ao lado
- 3 cards horizontais
- Grid de cards restantes

### BlogCategoriesSection
Mostra categorias do WordPress com ícones e contadores.

### BlogPostContent
Renderiza o conteúdo completo do post com:
- Formatação HTML preservada
- Estilos Tailwind Typography
- Botões de compartilhamento
- Bio do autor

### BlogRelatedPosts
Exibe 3 posts relacionados por categoria.

## 🔧 Configuração WordPress

### Permalinks
Configure para "Nome do post":
```
Configurações → Permalinks → Nome do post
```

### Categorias Sugeridas
- Prevenção
- Nutrição
- Exames
- Bem-estar
- Saúde Mental
- Família

### Imagem de Destaque
Sempre adicione uma imagem de destaque aos posts:
- Tamanho recomendado: 1200x630px
- Formato: JPG ou WebP
- Otimizada para web

## 📊 Dados Buscados

### Post
- Título
- Conteúdo (HTML)
- Excerpt
- Data de publicação
- Slug
- Categorias
- Tags
- Imagem de destaque
- Autor (nome, bio, avatar)

### Categoria
- Nome
- Slug
- Contador de posts

## 🎯 Próximos Passos

### Para Adicionar Novo Post
1. Acesse o WordPress: `https://cms.anacli.com.br/wp-admin`
2. Crie um novo post
3. Adicione imagem de destaque
4. Publique
5. Faça rebuild do site: `npm run build`

### Para Atualizar Posts
1. Edite o post no WordPress
2. Salve as alterações
3. Faça rebuild: `npm run build`

## ⚠️ Importante

### Static Export
O site usa `output: 'export'` no Next.js, o que significa:
- ✅ Páginas são geradas no build
- ✅ Pode hospedar em qualquer servidor estático
- ✅ Performance máxima
- ❌ Não tem ISR (Incremental Static Regeneration)
- ❌ Precisa rebuild para atualizar conteúdo

### Para Conteúdo Dinâmico
Se precisar de atualizações automáticas sem rebuild:
1. Remova `output: 'export'` do `next.config.js`
2. Adicione `export const revalidate = 60` nas páginas
3. Hospede em plataforma com Node.js (Vercel, Netlify Functions)

## 🐛 Troubleshooting

### Posts não aparecem
```bash
# Verifique a API
curl https://cms.anacli.com.br/wp-json/wp/v2/posts

# Limpe o cache e rebuild
rm -rf .next out
npm run build
```

### Imagens não carregam
Verifique se o domínio está no `next.config.js`:
```javascript
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'cms.anacli.com.br',
    pathname: '/**',
  }
]
```

### Erro 404 em post
1. Verifique se o post está publicado
2. Confirme o slug no WordPress
3. Faça rebuild completo

## 📞 Suporte

Para dúvidas:
1. Verifique a documentação completa em `WORDPRESS_INTEGRATION.md`
2. Teste a API diretamente no navegador
3. Verifique os logs do build

---

**Status**: ✅ Integração completa e funcional
**Última atualização**: Janeiro 2024
