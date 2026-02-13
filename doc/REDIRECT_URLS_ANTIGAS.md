# Redirecionamento de URLs Antigas do Blog

## Problema

Após a migração do blog, as URLs antigas indexadas no Google não funcionam mais:

- **URL antiga**: `https://www.anacli.com.br/anacli-tem-certificado-de-qualidade-internacional-prevecal/`
- **URL nova**: `https://www.anacli.com.br/blog/anacli-tem-certificado-de-qualidade-internacional-prevecal/`

Quando alguém clica no link antigo do Google, recebe erro 404.

## Solução Implementada

Criamos um **middleware do Next.js** que automaticamente redireciona todas as URLs antigas para o novo formato.

### Como Funciona

1. O middleware intercepta todas as requisições
2. Verifica se a URL não começa com `/blog/`
3. Verifica se não é uma rota conhecida (home, loja, sobre, etc.)
4. Se for um slug de post antigo, redireciona para `/blog/[slug]`
5. Usa redirect 301 (permanente) que é bom para SEO

### Exemplo de Redirecionamentos

| URL Antiga | URL Nova | Status |
|------------|----------|--------|
| `/anacli-tem-certificado/` | `/blog/anacli-tem-certificado/` | 301 |
| `/saude-sexual-prevencao/` | `/blog/saude-sexual-prevencao/` | 301 |
| `/dia-mundial-cancer/` | `/blog/dia-mundial-cancer/` | 301 |

### Rotas Excluídas (Não Redirecionadas)

O middleware NÃO redireciona estas rotas:
- `/` (home)
- `/blog/*` (já está correto)
- `/loja/*`
- `/sobre`
- `/contato`
- `/servicos`
- `/convenios`
- `/certificacoes`
- `/estrutura`
- `/privacidade`
- `/exclusao-dados`
- `/_next/*` (arquivos do Next.js)
- `/api/*` (APIs)
- `/assets/*` (imagens, etc)
- Arquivos estáticos (`.svg`, `.png`, `.jpg`, etc.)

## Benefícios para SEO

### 1. Redirect 301 (Permanente)

O redirect 301 informa ao Google que:
- A página mudou permanentemente de lugar
- O Google deve atualizar o índice
- O "link juice" (autoridade) é transferido para a nova URL

### 2. Preserva Rankings

- Os links antigos continuam funcionando
- Usuários não encontram erro 404
- O Google transfere a autoridade da página antiga para a nova

### 3. Atualização Automática no Google

Com o tempo, o Google vai:
1. Detectar o redirect 301
2. Atualizar o índice com as novas URLs
3. Mostrar as novas URLs nos resultados de busca

## Como Testar

### Teste Local

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Acesse uma URL antiga no navegador:
```
http://localhost:3000/anacli-tem-certificado-de-qualidade-internacional-prevecal/
```

3. Você deve ser redirecionado automaticamente para:
```
http://localhost:3000/blog/anacli-tem-certificado-de-qualidade-internacional-prevecal/
```

### Teste em Produção

1. Após o deploy, acesse:
```
https://www.anacli.com.br/anacli-tem-certificado-de-qualidade-internacional-prevecal/
```

2. Você deve ser redirecionado para:
```
https://www.anacli.com.br/blog/anacli-tem-certificado-de-qualidade-internacional-prevecal/
```

### Verificar Redirect 301

Use ferramentas online para verificar o status do redirect:

1. **Redirect Checker**: https://httpstatus.io/
2. **SEO Site Checkup**: https://seositecheckup.com/tools/redirect-checker
3. **Chrome DevTools**:
   - Abra DevTools (F12)
   - Vá na aba "Network"
   - Acesse a URL antiga
   - Veja o status code: deve ser **301**

## Atualizar Google Search Console

Para acelerar a atualização no Google:

### 1. Solicitar Reindexação

1. Acesse: https://search.google.com/search-console
2. Vá em **Inspeção de URL**
3. Cole a URL nova: `https://www.anacli.com.br/blog/[slug]`
4. Clique em **Solicitar indexação**

### 2. Enviar Sitemap Atualizado

1. Certifique-se de que o sitemap inclui as novas URLs
2. No Search Console, vá em **Sitemaps**
3. Envie o sitemap: `https://www.anacli.com.br/sitemap.xml`

### 3. Monitorar Cobertura

1. No Search Console, vá em **Cobertura**
2. Monitore:
   - URLs com erro 404 (devem diminuir)
   - URLs redirecionadas (devem aumentar)
   - URLs indexadas com novo formato

## Tempo de Atualização

- **Redirect funciona**: Imediatamente após deploy
- **Google detecta**: 1-7 dias
- **Índice atualizado**: 2-4 semanas
- **Rankings preservados**: 1-2 meses

## Troubleshooting

### Redirect não funciona?

1. Verifique se o arquivo `middleware.ts` está na raiz do projeto
2. Confirme que o deploy foi feito com sucesso
3. Limpe o cache do navegador
4. Teste em modo anônimo

### Ainda aparece 404?

1. Verifique se o slug está correto
2. Confirme que o post existe no WordPress
3. Verifique os logs do servidor

### Google ainda mostra URL antiga?

1. Isso é normal, leva tempo
2. Solicite reindexação no Search Console
3. Aguarde algumas semanas
4. O redirect 301 garante que funciona mesmo com URL antiga

## Código do Middleware

O arquivo `middleware.ts` está na raiz do projeto e contém:

```typescript
// Intercepta requisições
// Verifica se é URL antiga
// Redireciona para /blog/[slug]
// Usa status 301 (permanente)
```

## Manutenção

### Adicionar Nova Rota Excluída

Se você criar uma nova seção do site (ex: `/equipe`), adicione ao array `excludedPaths`:

```typescript
const excludedPaths = [
  '/blog',
  '/loja',
  '/equipe', // Nova rota
  // ...
];
```

### Remover Redirect no Futuro

Quando o Google atualizar completamente o índice (6-12 meses), você pode:
1. Manter o redirect (recomendado)
2. Ou remover o arquivo `middleware.ts`

**Recomendação**: Mantenha o redirect permanentemente para garantir que links antigos sempre funcionem.

## Impacto no Desempenho

- **Overhead**: Mínimo (~1-2ms por requisição)
- **Cache**: O redirect é cacheado pelo navegador
- **SEO**: Positivo (preserva rankings)

## Conclusão

O middleware resolve completamente o problema de URLs antigas:
- ✅ Links do Google funcionam
- ✅ Usuários não veem erro 404
- ✅ SEO preservado
- ✅ Rankings mantidos
- ✅ Atualização automática no Google
