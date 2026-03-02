# Problema com Featured Images do WordPress

## Situação Atual

O sistema de blog está funcionando e exibindo imagens, mas não está usando as "Featured Images" (imagens destacadas) configuradas no WordPress.

## Diagnóstico

Ao fazer o build, identificamos que a API do WordPress está retornando `featured_media: 0` para TODOS os posts, o que indica que:

1. As featured images não estão sendo retornadas pela API do WordPress
2. O campo `_embedded['wp:featuredmedia']` está vazio/undefined
3. O sistema está fazendo fallback para extrair a primeira imagem do conteúdo do post

## Como o Sistema Funciona Atualmente

O código em `src/lib/wordpress.ts` segue esta ordem de prioridade para imagens:

1. **Featured Media do WordPress** (quando `featured_media > 0` e `_embedded['wp:featuredmedia']` existe)
2. **Primeira imagem do conteúdo** (fallback automático)
3. **Imagem padrão do Unsplash** (último recurso)

Como o WordPress está retornando `featured_media: 0`, o sistema sempre usa a opção 2 (primeira imagem do conteúdo).

## Possíveis Causas

### 1. Featured Images não configuradas no WordPress
- As imagens destacadas podem não estar definidas nos posts
- Verificar em: WordPress Admin → Posts → Editar Post → "Imagem Destacada" (sidebar direita)

### 2. Problema de permissões na API
- A API do WordPress pode não ter permissão para retornar as featured images
- Verificar configurações de API REST do WordPress

### 3. Plugin ou tema interferindo
- Algum plugin ou tema pode estar bloqueando o retorno das featured images na API
- Testar desativando plugins temporariamente

### 4. Configuração do _embed
- O parâmetro `_embed=true` pode não estar funcionando corretamente
- A API pode precisar de configuração adicional

## Solução Recomendada

### Opção 1: Configurar Featured Images no WordPress (RECOMENDADO)

Para cada post no WordPress:

1. Acesse WordPress Admin
2. Vá em Posts → Todos os Posts
3. Edite cada post
4. Na sidebar direita, procure por "Imagem Destacada" ou "Featured Image"
5. Clique em "Definir imagem destacada"
6. Selecione a imagem desejada
7. Salve o post

### Opção 2: Verificar Configuração da API REST

No WordPress, verifique se a API REST está configurada corretamente:

```php
// Adicionar ao functions.php do tema (se necessário)
add_action('rest_api_init', function () {
    register_rest_field('post', 'featured_image_url', array(
        'get_callback' => function($post) {
            return get_the_post_thumbnail_url($post['id'], 'full');
        },
    ));
});
```

### Opção 3: Usar Plugin para Featured Images

Instalar um plugin como "Featured Image from URL" ou "Auto Featured Image" para gerenciar as imagens destacadas automaticamente.

## Teste

Para testar se as featured images estão configuradas:

1. Acesse: `https://cms.anacli.com.br/wp-json/wp/v2/posts?_embed=true&per_page=1`
2. Procure por `featured_media` - deve ser um número maior que 0
3. Procure por `_embedded['wp:featuredmedia']` - deve conter um objeto com `source_url`

## Status Atual

✅ Blog funcionando normalmente
✅ Imagens sendo exibidas (extraídas do conteúdo)
⚠️ Featured Images do WordPress não sendo usadas
❌ API retornando `featured_media: 0` para todos os posts

## Próximos Passos

1. Configurar featured images no WordPress para os posts recentes
2. Testar se a API começa a retornar as imagens corretamente
3. Se necessário, investigar configuração da API REST do WordPress
4. Considerar adicionar código customizado no WordPress para forçar o retorno das featured images

## Observações

- O sistema atual está funcionando corretamente como fallback
- As imagens estão sendo exibidas (primeira imagem do conteúdo)
- Não há necessidade de mudanças urgentes no código Next.js
- O problema está na configuração do WordPress, não no código do site
