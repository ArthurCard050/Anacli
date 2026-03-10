# Como Adicionar Código ao functions.php do WordPress

## 📋 Passo a Passo Completo

### Método 1: Pelo Painel do WordPress (MAIS FÁCIL)

#### Passo 1: Fazer Login no WordPress
1. Acesse: `https://cms.anacli.com.br/wp-admin`
2. Digite seu usuário e senha
3. Clique em **Entrar**

#### Passo 2: Acessar o Editor de Temas
1. No menu lateral esquerdo, procure por **Aparência**
2. Clique em **Aparência**
3. Clique em **Editor de Arquivos do Tema** (ou **Theme File Editor**)

⚠️ **Se não aparecer essa opção:**
- Pode estar desabilitada por segurança
- Nesse caso, use o Método 2 (via FTP/cPanel)

#### Passo 3: Selecionar o Tema Correto
1. No canto superior direito, verifique qual tema está ativo
2. Deve aparecer algo como: **"Editando: Twenty Twenty-Five"** ou o nome do seu tema
3. Se não for o tema ativo, selecione o tema correto no dropdown

#### Passo 4: Encontrar o arquivo functions.php
1. No lado direito da tela, você verá uma lista de arquivos
2. Procure por **"Funções do Tema"** ou **"Theme Functions (functions.php)"**
3. Clique nesse arquivo
4. O conteúdo do arquivo aparecerá no editor central

#### Passo 5: Adicionar o Código
1. **Role até o FINAL do arquivo**
2. Você verá algo parecido com isso no final:

```php
    }
endif;
```

3. **DEPOIS** do último `endif;`, adicione o código abaixo:

```php

/**
 * ========================================
 * ANACLI: Adicionar campos customizados com featured image
 * Esta solução NÃO depende de permissões de attachment
 * ========================================
 */
add_action('rest_api_init', function() {
    // Campo simples com apenas a URL
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
    
    // Campo completo com todas as informações da imagem
    register_rest_field('post', 'featured_image_data', array(
        'get_callback' => function($post) {
            $image_id = get_post_thumbnail_id($post['id']);
            if ($image_id) {
                $image_full = wp_get_attachment_image_src($image_id, 'full');
                $image_medium = wp_get_attachment_image_src($image_id, 'medium');
                $image_thumbnail = wp_get_attachment_image_src($image_id, 'thumbnail');
                
                return array(
                    'id' => $image_id,
                    'url' => $image_full ? $image_full[0] : null,
                    'width' => $image_full ? $image_full[1] : null,
                    'height' => $image_full ? $image_full[2] : null,
                    'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true),
                    'sizes' => array(
                        'full' => $image_full ? $image_full[0] : null,
                        'medium' => $image_medium ? $image_medium[0] : null,
                        'thumbnail' => $image_thumbnail ? $image_thumbnail[0] : null,
                    ),
                );
            }
            return null;
        },
        'schema' => array(
            'description' => 'Dados completos da imagem destacada',
            'type' => 'object',
        ),
    ));
});
```

#### Passo 6: Salvar o Arquivo
1. Role até o final da página
2. Clique no botão azul **"Atualizar Arquivo"** ou **"Update File"**
3. Aguarde a mensagem de confirmação: **"Arquivo editado com sucesso"**

#### Passo 7: Testar se Funcionou
1. Abra uma nova aba do navegador
2. Acesse: `https://cms.anacli.com.br/wp-json/wp/v2/posts/6789`
3. Procure por `"featured_image_url"` na resposta
4. Se aparecer, está funcionando! ✅

---

### Método 2: Via FTP ou cPanel (SE O MÉTODO 1 NÃO FUNCIONAR)

#### Passo 1: Acessar o cPanel ou FTP
1. Acesse o painel de controle do seu servidor (cPanel, Plesk, etc.)
2. Ou use um cliente FTP como FileZilla

#### Passo 2: Navegar até a pasta do tema
1. Vá para: `public_html/wp-content/themes/`
2. Entre na pasta do tema ativo (ex: `twentytwentyfive`)
3. Procure o arquivo `functions.php`

#### Passo 3: Fazer Backup
⚠️ **IMPORTANTE: Sempre faça backup antes de editar!**
1. Clique com botão direito em `functions.php`
2. Selecione **Download** ou **Baixar**
3. Salve o arquivo no seu computador como `functions.php.backup`

#### Passo 4: Editar o Arquivo
1. Clique com botão direito em `functions.php`
2. Selecione **Editar** ou **Edit**
3. Role até o final do arquivo
4. Adicione o código (mesmo código do Método 1, Passo 5)
5. Salve o arquivo

#### Passo 5: Fazer Upload (se editou localmente)
1. Se você baixou o arquivo, editou no seu computador e salvou
2. Faça upload do arquivo editado de volta para o servidor
3. Substitua o arquivo antigo

---

### Método 3: Via Plugin (MAIS SEGURO)

Se você não quer mexer no `functions.php`, pode criar um plugin:

#### Passo 1: Criar a Pasta do Plugin
1. Acesse via FTP ou cPanel: `public_html/wp-content/plugins/`
2. Crie uma nova pasta chamada: `anacli-featured-images`

#### Passo 2: Criar o Arquivo do Plugin
1. Dentro da pasta `anacli-featured-images`, crie um arquivo chamado: `anacli-featured-images.php`
2. Cole este código completo:

```php
<?php
/**
 * Plugin Name: Anacli Featured Images Fix
 * Description: Adiciona URL da featured image diretamente ao post via API REST
 * Version: 1.0
 * Author: Anacli
 */

// Prevenir acesso direto
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Adicionar campos customizados com featured image
 */
add_action('rest_api_init', function() {
    // Campo simples com apenas a URL
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
    
    // Campo completo com todas as informações da imagem
    register_rest_field('post', 'featured_image_data', array(
        'get_callback' => function($post) {
            $image_id = get_post_thumbnail_id($post['id']);
            if ($image_id) {
                $image_full = wp_get_attachment_image_src($image_id, 'full');
                $image_medium = wp_get_attachment_image_src($image_id, 'medium');
                $image_thumbnail = wp_get_attachment_image_src($image_id, 'thumbnail');
                
                return array(
                    'id' => $image_id,
                    'url' => $image_full ? $image_full[0] : null,
                    'width' => $image_full ? $image_full[1] : null,
                    'height' => $image_full ? $image_full[2] : null,
                    'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true),
                    'sizes' => array(
                        'full' => $image_full ? $image_full[0] : null,
                        'medium' => $image_medium ? $image_medium[0] : null,
                        'thumbnail' => $image_thumbnail ? $image_thumbnail[0] : null,
                    ),
                );
            }
            return null;
        },
        'schema' => array(
            'description' => 'Dados completos da imagem destacada',
            'type' => 'object',
        ),
    ));
});
```

#### Passo 3: Ativar o Plugin
1. Acesse o WordPress Admin: `https://cms.anacli.com.br/wp-admin`
2. Vá em **Plugins → Plugins Instalados**
3. Procure por **"Anacli Featured Images Fix"**
4. Clique em **Ativar**

---

## 🎯 Qual Método Usar?

- **Método 1 (Editor do WordPress)**: Mais rápido, mas pode estar desabilitado
- **Método 2 (FTP/cPanel)**: Funciona sempre, mas requer acesso ao servidor
- **Método 3 (Plugin)**: Mais seguro, não perde as alterações ao atualizar o tema

## ✅ Como Saber se Funcionou?

Depois de adicionar o código por qualquer método:

1. Acesse: `https://cms.anacli.com.br/wp-json/wp/v2/posts/6789`
2. Pressione `Ctrl+F` (ou `Cmd+F` no Mac)
3. Procure por: `featured_image_url`
4. Se encontrar algo como:
   ```json
   "featured_image_url": "https://cms.anacli.com.br/wp-content/uploads/2026/03/imagem.jpg"
   ```
   **Está funcionando!** ✅

## ❌ Se Algo Der Errado

Se o site quebrar ou aparecer erro:

1. **Via FTP/cPanel**: Restaure o backup do `functions.php`
2. **Via Plugin**: Desative o plugin em `Plugins → Plugins Instalados`
3. **Via WordPress Admin**: Acesse via FTP e restaure o arquivo

## 📞 Precisa de Ajuda?

Se tiver dúvidas ou problemas:
1. Tire um print da tela onde está
2. Me envie o print
3. Vou te guiar passo a passo

---

## 📝 Resumo Visual

```
WordPress Admin
    ↓
Aparência
    ↓
Editor de Arquivos do Tema
    ↓
functions.php (lado direito)
    ↓
Rolar até o FINAL
    ↓
Colar o código DEPOIS do último endif;
    ↓
Clicar em "Atualizar Arquivo"
    ↓
Testar: https://cms.anacli.com.br/wp-json/wp/v2/posts/6789
```
