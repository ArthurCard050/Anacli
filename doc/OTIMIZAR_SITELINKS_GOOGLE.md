# Otimização de Sitelinks do Google

## O que são Sitelinks?

Sitelinks são os links adicionais que aparecem abaixo do resultado principal no Google. Eles ajudam os usuários a navegar diretamente para páginas específicas do seu site.

## Problema Atual

Os Sitelinks atuais no Google podem estar apontando para URLs antigas ou páginas que não existem mais após a migração.

## Solução Implementada

### 1. Schema Markup (JSON-LD) ✅

Adicionamos dois schemas no `layout.tsx`:

#### a) MedicalBusiness Schema
- Define o tipo de negócio
- Informações de contato
- Localização
- Horários de funcionamento
- Certificações

#### b) WebSite Schema com hasPart
- Define a estrutura de navegação
- Lista as páginas principais que queremos como Sitelinks:
  - **Resultados de Exames**: `/#resultados`
  - **Contato**: `/contato`
  - **Exames**: `/loja/exames`
  - **Sobre**: `/sobre`
  - **Blog**: `/blog`

### 2. Sitemap.xml Otimizado ✅

Criamos um sitemap com prioridades estratégicas:

| Página | Priority | Changefreq | Objetivo |
|--------|----------|------------|----------|
| Home | 1.0 | daily | Página principal |
| Resultados | 0.9 | daily | Sitelink prioritário |
| Contato | 0.9 | monthly | Sitelink prioritário |
| Exames | 0.9 | weekly | Sitelink prioritário |
| Sobre | 0.8 | monthly | Sitelink secundário |
| Blog | 0.8 | daily | Sitelink secundário |

### 3. Redirects 301 ✅

Já configurados no `next.config.js` para URLs antigas.

## Próximos Passos

### 1. Verificar Estrutura de Navegação

Certifique-se de que o menu principal (Header) e rodapé (Footer) contenham links claros para:

- ✅ Resultados de Exames
- ✅ Contato
- ✅ Exames
- ✅ Sobre
- ✅ Blog

**Importante**: Use textos âncora idênticos ao que você quer que apareça no Google.

### 2. Google Search Console

#### a) Enviar Sitemap

1. Acesse: https://search.google.com/search-console
2. Selecione a propriedade `anacli.com.br`
3. Vá em **Sitemaps** no menu lateral
4. Adicione: `https://anacli.com.br/sitemap.xml`
5. Clique em **Enviar**

#### b) Solicitar Indexação das Páginas Principais

Para cada página que você quer como Sitelink:

1. Vá em **Inspeção de URL**
2. Cole a URL (ex: `https://anacli.com.br/contato`)
3. Clique em **Solicitar indexação**

Páginas para solicitar:
- `https://anacli.com.br/`
- `https://anacli.com.br/#resultados`
- `https://anacli.com.br/contato`
- `https://anacli.com.br/loja/exames`
- `https://anacli.com.br/sobre`
- `https://anacli.com.br/blog`

#### c) Remover URLs Antigas (Opcional)

Se houver URLs antigas aparecendo nos Sitelinks:

1. Vá em **Remoções** no Search Console
2. Clique em **Nova solicitação**
3. Cole a URL antiga
4. Selecione **Remover temporariamente da pesquisa**

**Nota**: Isso é temporário (6 meses). O redirect 301 é a solução permanente.

### 3. Validar Schema Markup

Use a ferramenta do Google para validar:

1. Acesse: https://search.google.com/test/rich-results
2. Cole a URL: `https://anacli.com.br`
3. Clique em **Testar URL**
4. Verifique se não há erros

Ou use:
- https://validator.schema.org/
- https://search.google.com/structured-data/testing-tool

### 4. Monitorar Desempenho

No Google Search Console:

#### a) Desempenho
- Monitore cliques nos Sitelinks
- Veja quais páginas estão recebendo mais tráfego
- Ajuste prioridades se necessário

#### b) Cobertura
- Verifique se todas as páginas estão indexadas
- Resolva erros 404
- Confirme que redirects 301 estão funcionando

#### c) Melhorias
- Verifique dados estruturados
- Confirme que não há erros no Schema Markup

## Tempo de Atualização

| Ação | Tempo Esperado |
|------|----------------|
| Schema detectado pelo Google | 1-3 dias |
| Sitemap processado | 1-7 dias |
| Sitelinks atualizados | 2-4 semanas |
| Sitelinks completamente otimizados | 1-3 meses |

## Dicas para Acelerar

### 1. Consistência nos Links

Certifique-se de que os links internos sempre usam o mesmo formato:
- ✅ Bom: Sempre `/contato`
- ❌ Ruim: Às vezes `/contato`, às vezes `/contato/`

### 2. Texto Âncora Claro

Use textos descritivos nos links:
- ✅ Bom: "Resultados de Exames"
- ❌ Ruim: "Clique aqui"

### 3. Links no Rodapé

Adicione links importantes no rodapé também. O Google considera links que aparecem em todas as páginas.

### 4. Breadcrumbs

Implemente breadcrumbs (migalhas de pão) nas páginas internas. Isso ajuda o Google a entender a hierarquia.

### 5. Internal Linking

Faça links internos entre páginas relacionadas. Isso ajuda o Google a entender a importância de cada página.

## Troubleshooting

### Sitelinks não aparecem?

**Possíveis causas:**
1. Site muito novo (< 6 meses)
2. Pouco tráfego orgânico
3. Estrutura de navegação confusa
4. Falta de autoridade do domínio

**Solução:**
- Continue otimizando
- Produza conteúdo de qualidade
- Construa backlinks
- Aguarde (pode levar meses)

### Sitelinks errados aparecem?

**Possíveis causas:**
1. Links antigos ainda indexados
2. Páginas antigas com mais autoridade
3. Texto âncora inconsistente

**Solução:**
- Configure redirects 301
- Solicite remoção no Search Console
- Fortaleça as páginas corretas com links internos
- Aguarde atualização do índice

### Como remover um Sitelink específico?

**Resposta**: Você não pode remover diretamente, mas pode:
1. Usar `noindex` na página (não recomendado se a página é importante)
2. Remover links para essa página do menu/rodapé
3. Fortalecer outras páginas que você prefere

## Checklist de Implementação

- [x] Schema Markup adicionado (MedicalBusiness)
- [x] Schema de navegação adicionado (WebSite hasPart)
- [x] Sitemap.xml criado com prioridades
- [x] Redirects 301 configurados
- [ ] Sitemap enviado no Search Console
- [ ] URLs principais solicitadas para indexação
- [ ] Schema validado (Rich Results Test)
- [ ] Links no menu/rodapé verificados
- [ ] Textos âncora otimizados
- [ ] Monitoramento configurado no Search Console

## Recursos Úteis

- **Google Search Console**: https://search.google.com/search-console
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Validator**: https://validator.schema.org/
- **Sitemap Validator**: https://www.xml-sitemaps.com/validate-xml-sitemap.html

## Conclusão

Com as implementações feitas:
1. ✅ Schema Markup está guiando o Google
2. ✅ Sitemap está priorizando páginas corretas
3. ✅ Redirects estão preservando SEO

Agora é aguardar o Google processar as mudanças (2-4 semanas) e monitorar no Search Console.

**Importante**: Sitelinks são gerados automaticamente pelo Google. Não há garantia de quais aparecerão, mas essas otimizações aumentam muito as chances de aparecerem os links corretos.
