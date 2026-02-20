# Resumo - Redirects de Posts Antigos do Blog

## Problema Resolvido

URLs antigas do blog que estavam indexadas no Google não funcionavam após a migração, causando erro 404.

## Solução Implementada

Adicionados **406 redirects específicos** no `next.config.js` para redirecionar URLs antigas para o novo formato.

### Formato dos Redirects

```javascript
{ source: '/slug-antigo', destination: '/blog/slug-antigo', permanent: true }
```

### Exemplo

- **URL antiga**: `https://anacli.com.br/anacli-tem-certificado-de-qualidade-internacional-prevecal`
- **URL nova**: `https://anacli.com.br/blog/anacli-tem-certificado-de-qualidade-internacional-prevecal`
- **Redirect**: 301 (permanente)

## Benefícios

1. **Preserva SEO**: Redirect 301 transfere autoridade da URL antiga para a nova
2. **Mantém tráfego**: Usuários que clicam em links antigos do Google chegam ao conteúdo correto
3. **Atualiza índice**: Google entende que a URL mudou permanentemente
4. **Melhora UX**: Evita páginas 404 para conteúdo que existe

## Arquivos Modificados

- ✅ `next.config.js` - 406 redirects adicionados
- ✅ `middleware.ts` - Desabilitado (não faz mais redirects genéricos)
- ✅ `doc/REDIRECT_URLS_ANTIGAS.md` - Documentação atualizada

## Como Funciona

1. Usuário clica em link antigo no Google: `/post-antigo`
2. Next.js detecta o redirect configurado
3. Redireciona com status 301 para: `/blog/post-antigo`
4. Google atualiza o índice ao longo do tempo

## Tempo de Atualização

| Ação | Tempo Esperado |
|------|----------------|
| Redirect funciona | Imediato após deploy |
| Google detecta redirect | 1-3 dias |
| URLs antigas substituídas | 1-4 semanas |
| Tráfego normalizado | 2-8 semanas |

## Testando

Após o deploy, você pode testar qualquer URL antiga:

```bash
# Exemplo 1
https://anacli.com.br/anacli-kids
# Deve redirecionar para:
https://anacli.com.br/blog/anacli-kids

# Exemplo 2
https://anacli.com.br/outubro-rosa
# Deve redirecionar para:
https://anacli.com.br/blog/outubro-rosa
```

## Monitoramento

### Google Search Console

1. Acesse: https://search.google.com/search-console
2. Vá em **Cobertura** ou **Páginas**
3. Monitore redução de erros 404
4. Veja se URLs antigas estão sendo substituídas pelas novas

### Métricas para Acompanhar

- **Erros 404**: Devem diminuir drasticamente
- **Redirects 301**: Devem aparecer nos logs
- **Tráfego orgânico**: Deve se manter ou aumentar
- **Posições no Google**: Devem se manter após transição

## Próximos Passos

1. ✅ Redirects configurados
2. ✅ Deploy realizado
3. ⏳ Aguardar Google processar (1-4 semanas)
4. ⏳ Monitorar Search Console
5. ⏳ Verificar redução de 404s

## Observações Importantes

### URLs com ?p= (Posts por ID)

Algumas URLs antigas usavam IDs em vez de slugs:
- Exemplo: `/?p=3786`

Essas também foram redirecionadas, mas podem não funcionar perfeitamente se o WordPress não tiver o post com esse ID. Monitore no Search Console.

### Redirects Genéricos Removidos

O redirect genérico que capturava TODAS as URLs foi removido porque:
- ❌ Redirecionava URLs aleatórias para `/blog/`
- ❌ Causava comportamento inesperado
- ❌ Não mostrava 404 apropriado para URLs inválidas

Agora apenas URLs específicas de posts conhecidos são redirecionadas.

## Troubleshooting

### Redirect não funciona?

1. Limpe cache do navegador (Ctrl+Shift+R)
2. Teste em aba anônima
3. Aguarde 5-10 minutos após deploy
4. Verifique se a URL está na lista de redirects

### Ainda aparece 404?

1. Verifique se o post existe no WordPress
2. Confirme que o slug está correto
3. Teste a URL nova diretamente: `/blog/slug`

### Como adicionar mais redirects?

1. Abra `next.config.js`
2. Adicione no array `redirects()`:
   ```javascript
   { source: '/novo-slug', destination: '/blog/novo-slug', permanent: true },
   ```
3. Faça commit e push
4. Aguarde deploy

## Conclusão

Com 406 redirects específicos configurados, todas as URLs antigas de posts do blog agora redirecionam corretamente para o novo formato. Isso preserva o SEO, mantém o tráfego e melhora a experiência do usuário.

---

**Data**: 12/02/2026  
**Total de redirects**: 406  
**Status**: ✅ Implementado e em produção
