# Próximos Passos - Otimização de Sitelinks

## ✅ Concluído

1. Schema Markup implementado no `layout.tsx`
2. Sitemap dinâmico criado em `src/app/sitemap.ts`
3. Sitemap estático removido
4. Deploy realizado
5. Sitemap disponível em: `https://anacli.com.br/sitemap.xml`

## 📋 Ações Manuais Necessárias

### 1. Enviar Sitemap no Google Search Console

1. Acesse: https://search.google.com/search-console
2. Selecione a propriedade `anacli.com.br`
3. No menu lateral, clique em **Sitemaps**
4. No campo "Adicionar um novo sitemap", digite: `sitemap.xml`
5. Clique em **Enviar**

**Resultado esperado**: O Google vai processar o sitemap em 1-7 dias.

---

### 2. Solicitar Indexação das Páginas Prioritárias

Para cada URL abaixo, faça:

1. No Search Console, clique em **Inspeção de URL** (topo da página)
2. Cole a URL
3. Aguarde a análise
4. Clique em **Solicitar indexação**
5. Aguarde confirmação (pode levar alguns minutos)

**URLs para solicitar indexação:**

- `https://anacli.com.br/`
- `https://anacli.com.br/#resultados`
- `https://anacli.com.br/contato`
- `https://anacli.com.br/loja/exames`
- `https://anacli.com.br/sobre`
- `https://anacli.com.br/blog`

**Dica**: Priorize as 3 primeiras (Home, Resultados, Contato).

---

### 3. Validar Schema Markup

Verifique se o Schema está correto:

1. Acesse: https://search.google.com/test/rich-results
2. Cole a URL: `https://anacli.com.br`
3. Clique em **Testar URL**
4. Verifique se não há erros

**Resultado esperado**: 
- ✅ Schema "MedicalBusiness" detectado
- ✅ Schema "WebSite" detectado
- ✅ Sem erros críticos

**Alternativas**:
- https://validator.schema.org/
- https://search.google.com/structured-data/testing-tool

---

### 4. Monitorar no Search Console

Após 1-2 semanas, verifique:

#### a) Cobertura
- Menu: **Cobertura** ou **Páginas**
- Verifique se todas as páginas importantes estão indexadas
- Resolva erros 404 se houver

#### b) Desempenho
- Menu: **Desempenho**
- Monitore cliques e impressões
- Veja quais páginas estão recebendo mais tráfego

#### c) Melhorias
- Menu: **Melhorias** > **Dados estruturados**
- Confirme que não há erros no Schema Markup

---

## ⏱️ Tempo Esperado

| Ação | Tempo |
|------|-------|
| Sitemap processado | 1-7 dias |
| Schema detectado | 1-3 dias |
| Páginas indexadas | 3-7 dias |
| Sitelinks atualizados | 2-4 semanas |
| Sitelinks otimizados | 1-3 meses |

---

## 🎯 Sitelinks Desejados

Configuramos o Schema e Sitemap para priorizar:

1. **Resultados de Exames** (`/#resultados`) - Priority 0.9
2. **Contato** (`/contato`) - Priority 0.9
3. **Exames** (`/loja/exames`) - Priority 0.9
4. **Sobre** (`/sobre`) - Priority 0.8
5. **Blog** (`/blog`) - Priority 0.8

---

## ❓ Troubleshooting

### Sitemap não foi encontrado?

**Possíveis causas:**
- Deploy ainda não propagou (aguarde 5-10 minutos)
- Cache do CDN (limpe o cache se usar Vercel/Netlify)

**Solução:**
1. Teste diretamente: https://anacli.com.br/sitemap.xml
2. Se não carregar, verifique o deploy
3. Se carregar, aguarde e tente reenviar no Search Console

### Schema não foi detectado?

**Possíveis causas:**
- Google ainda não rastreou a página
- Erro no JSON-LD

**Solução:**
1. Valide em: https://validator.schema.org/
2. Solicite indexação da home
3. Aguarde 24-48h

### Sitelinks não mudaram?

**Isso é normal!** O Google leva semanas/meses para atualizar Sitelinks.

**O que fazer:**
- Continue produzindo conteúdo de qualidade
- Fortaleça links internos para as páginas desejadas
- Monitore no Search Console
- Seja paciente (pode levar 2-3 meses)

---

## 📊 Métricas para Acompanhar

No Google Search Console > Desempenho:

1. **Cliques totais**: Deve aumentar com Sitelinks otimizados
2. **Impressões**: Monitore crescimento orgânico
3. **CTR**: Sitelinks relevantes aumentam CTR
4. **Posição média**: Deve melhorar com otimizações

---

## ✅ Checklist Rápido

- [ ] Sitemap enviado no Search Console
- [ ] Home indexada
- [ ] Resultados indexado
- [ ] Contato indexado
- [ ] Exames indexado
- [ ] Schema validado (sem erros)
- [ ] Monitoramento configurado

---

## 🔗 Links Úteis

- **Search Console**: https://search.google.com/search-console
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Validator**: https://validator.schema.org/
- **Sitemap do Site**: https://anacli.com.br/sitemap.xml

---

## 📝 Notas Importantes

1. **Sitelinks são automáticos**: O Google decide quais aparecem baseado em relevância, cliques e estrutura do site.

2. **Não há garantias**: Mesmo com todas as otimizações, o Google pode escolher outros links.

3. **Paciência é essencial**: Mudanças em Sitelinks levam tempo (semanas/meses).

4. **Continue otimizando**: Produza conteúdo, melhore UX, construa autoridade.

---

**Última atualização**: 12/02/2026
