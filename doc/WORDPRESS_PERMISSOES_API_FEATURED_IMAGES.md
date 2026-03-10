# Como Corrigir Permissões da API REST do WordPress para Featured Images

## Problema

A API REST do WordPress está retornando erro 401 ao tentar acessar featured images via `_embedded`:

```json
{
  "code": "rest_forbidden",
  "message": "Sem permissão para fazer isso.",
  "data": {"status": 401}
}
```

## Soluções (em ordem de preferência)

### Solução 1: Adicionar Código ao functions.php do Tema (RECOMENDADO)

Esta é a solução mais simples e eficaz. Adicione o seguinte código ao arquivo `functions.php` do seu tema ativo:

```php
/**
 * Permitir acesso público às featured images na API REST
 */
add_filter('rest_prepare_attachment', function($response, $post, $request) {
    // Remove a restrição de permissão para attachments
    return $response;
}, 10, 3);

/**
 * Alternativa: Forçar permissão de leitura para attachments
 */
add_filter('rest_pre_dispatch', function($result, $server, $request) {
    // Verifica se é uma requisição para media
    if (strpos($request->get_route(), '/wp/v2/media') !== false) {
        // Permite acesso público
        return $result;
    }
    return $result;
}, 10, 3);
```

**Como fazer:**

1. Acesse WordPress Admin
2. Vá em **Aparência → Editor de Arquivos do Tema**
3. Selecione o arquivo `functions.php`
4. Adicione o código acima no final do arquivo (antes do `?>` se existir)
5. Clique em **Atualizar Arquivo**

---

### Solução 2: Criar um Plugin Personalizado

Se preferir não modificar o tema, crie um plugin:

1. Crie uma pasta em `wp-content/plugins/` chamada `api-featured-images-fix`
2. Dentro dela, crie um arquivo `api-featured-images-fix.php`:

```php
<?php
/**
 * Plugin Name: API Featured Images Fix
 * Description: Permite acesso público às featured images via API REST
 * Version: 1.0
 * Author: Anacli
 */

// Prevenir acesso direto
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Permitir acesso público às featured images
 */
add_filter('rest_prepare_attachment', function($response, $post, $request) {
    return $response;
}, 10, 3);

/**
 * Garantir que attachments sejam públicos na API
 */
add_filter('rest_authentication_errors', function($result) {
    // Se já houver um erro, retornar
    if (is_wp_error($result)) {
        return $result;
    }
    
    // Permitir acesso público para leitura
    return $result;
});

/**
 * Adicionar featured image URL diretamente no post
 */
add_action('rest_api_init', function() {
    register_rest_field('post', 'featured_image_url', array(
        'get_callback' => function($post) {
            $image_id = get_post_thumbnail_id($post['id']);
            if ($image_id) {
                $image = wp_get_attachment_image_src($image_id, 'full');
                return $image ? $image[0] : null;
            }
            return null;
        },
        'schema' => array(
            'description' => 'URL da imagem destacada',
            'type' => 'string',
        ),
    ));
});
```

3. Ative o plugin em **Plugins → Plugins Instalados**

---

### Solução 3: Verificar Configurações de Privacidade

Verifique se o WordPress não está em modo privado:

1. Vá em **Configurações → Leitura**
2. Certifique-se que **"Visibilidade do site"** está como **"Pedir aos mecanismos de busca para não indexar este site"** está DESMARCADO
3. Verifique se não há plugins de privacidade bloqueando a API

---

### Solução 4: Verificar Permissões de Mídia

Certifique-se que as imagens estão públicas:

1. Vá em **Mídia → Biblioteca**
2. Clique em uma imagem
3. Verifique se o campo **"Visibilidade"** está como **"Público"**
4. Se necessário, edite em massa:

```php
// Adicionar ao functions.php temporariamente para corrigir todas as imagens
add_action('init', function() {
    if (isset($_GET['fix_media_permissions']) && current_user_can('manage_options')) {
        global $wpdb;
        
        // Tornar todos os attachments públicos
        $wpdb->query("
            UPDATE {$wpdb->posts} 
            SET post_status = 'inherit' 
            WHERE post_type = 'attachment' 
            AND post_status != 'inherit'
        ");
        
        echo 'Permissões de mídia corrigidas!';
        exit;
    }
});
```

Depois acesse: `https://cms.anacli.com.br/?fix_media_permissions=1`

---

### Solução 5: Usar Plugin Existente

Instale um plugin que gerencia permissões da API:

1. **WP REST API Controller** - Permite configurar permissões detalhadas
2. **Disable REST API** - Mas configure para permitir endpoints específicos
3. **JWT Authentication for WP REST API** - Se quiser autenticação mais robusta

---

### Solução 6: Configuração via .htaccess (Avançado)

Se o problema for de CORS ou headers HTTP, adicione ao `.htaccess`:

```apache
<IfModule mod_headers.c>
    # Permitir acesso à API REST
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
```

---

## Testando a Solução

Após aplicar qualquer solução, teste:

### 1. Teste direto da API

```bash
# Testar acesso a um post específico
curl https://cms.anacli.com.br/wp-json/wp/v2/posts/6789?_embed=true

# Testar acesso direto à mídia
curl https://cms.anacli.com.br/wp-json/wp/v2/media/8487
```

### 2. Verificar no navegador

Acesse diretamente:
- https://cms.anacli.com.br/wp-json/wp/v2/posts/6789?_embed=true
- https://cms.anacli.com.br/wp-json/wp/v2/media/8487

Procure por `"wp:featuredmedia"` e verifique se não há mais erro 401.

### 3. Testar no site

1. Acesse https://www.anacli.com.br/blog
2. Verifique se as imagens dos posts estão corretas
3. Abra o DevTools (F12) → Network
4. Recarregue a página
5. Verifique se não há mais erros 401

---

## Solução Recomendada para Anacli

Para o seu caso específico, recomendo a **Solução 1** (adicionar ao functions.php) ou **Solução 2** (criar plugin), pois:

✅ São soluções permanentes
✅ Não dependem de plugins de terceiros
✅ Não afetam outras funcionalidades
✅ Fáceis de implementar e manter

---

## Código Completo Recomendado

Adicione este código ao `functions.php` do seu tema:

```php
/**
 * ========================================
 * FIX: Permitir acesso público às Featured Images via API REST
 * ========================================
 */

// 1. Remover restrição de permissão para attachments
add_filter('rest_prepare_attachment', function($response, $post, $request) {
    return $response;
}, 10, 3);

// 2. Adicionar URL da featured image diretamente no post (backup)
add_action('rest_api_init', function() {
    register_rest_field('post', 'featured_image_url', array(
        'get_callback' => function($post) {
            $image_id = get_post_thumbnail_id($post['id']);
            if ($image_id) {
                $image = wp_get_attachment_image_src($image_id, 'full');
                return $image ? $image[0] : null;
            }
            return null;
        },
        'schema' => array(
            'description' => 'URL da imagem destacada',
            'type' => 'string',
        ),
    ));
});

// 3. Garantir que _embed funcione corretamente
add_filter('rest_post_dispatch', function($result, $server, $request) {
    // Adicionar headers CORS se necessário
    header('Access-Control-Allow-Origin: *');
    return $result;
}, 10, 3);
```

---

## Observações Importantes

⚠️ **Backup**: Sempre faça backup do `functions.php` antes de modificar

⚠️ **Tema Child**: Se usar um tema de terceiros, considere criar um tema filho (child theme) para não perder as modificações em atualizações

⚠️ **Cache**: Após fazer as mudanças, limpe o cache do WordPress e do navegador

⚠️ **Teste**: Teste em ambiente de desenvolvimento primeiro, se possível

---

## Alternativa: Usar o Campo Customizado

Se nenhuma solução acima funcionar, você pode usar o campo `featured_image_url` que será adicionado diretamente ao post:

No código Next.js (`src/lib/wordpress.ts`), adicione:

```typescript
// Tentar usar o campo customizado primeiro
if (wpPost.featured_image_url) {
  postImage = wpPost.featured_image_url;
} else if (featuredMedia?.source_url) {
  postImage = featuredMedia.source_url;
} else {
  // Fallback...
}
```

---

## Suporte

Se precisar de ajuda para implementar qualquer uma dessas soluções, entre em contato com o desenvolvedor do tema ou um especialista em WordPress.
