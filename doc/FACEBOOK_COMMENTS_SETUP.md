# Configuração dos Comentários do Facebook

## Status Atual
- App ID: 4155112851395262
- Status: Desenvolvimento (precisa ser publicado)
- Problema: Comentários não aparecem em localhost nem em produção

## Passos para Ativar os Comentários

### 1. Configurar Domínios do App

No Facebook Developers (https://developers.facebook.com/apps/4155112851395262):

1. Vá em **Configurações** > **Básico**
2. Role até **Domínios do App**
3. Adicione: `anacli.com.br`
4. Clique em **Salvar alterações**

### 2. Configurar URLs Obrigatórias

Ainda em **Configurações** > **Básico**:

1. **URL da Política de Privacidade**: `https://anacli.com.br/privacidade`
2. **URL de Exclusão de Dados do Usuário**: `https://anacli.com.br/exclusao-dados`
3. Clique em **Salvar alterações**

### 3. Configurar Produto "Comentários"

1. No menu lateral, vá em **Produtos** > **Comentários**
2. Se não estiver adicionado, clique em **Adicionar Produto** e selecione **Comentários**
3. Em **Configurações de Comentários**:
   - Adicione o domínio: `anacli.com.br`
   - Ative a moderação se desejar

### 4. Publicar o App (Mudar de Desenvolvimento para Público)

1. No topo da página, você verá um botão ou alerta sobre **Modo do Aplicativo**
2. Clique em **Alternar para Modo Público** ou **Publicar App**
3. O Facebook pode pedir para revisar algumas configurações
4. Confirme que todas as URLs estão corretas
5. Publique o app

### 5. Verificar Configurações de Privacidade

1. Vá em **Configurações** > **Avançado**
2. Certifique-se de que:
   - **Tipo de aplicativo**: Consumidor
   - **Categoria do app**: Notícias

## Por que não funciona em Localhost?

Os comentários do Facebook **NÃO funcionam em localhost** por questões de segurança. Eles só funcionam em:
- Domínios públicos configurados no app
- URLs HTTPS (obrigatório)

## Testando Após Configuração

1. Aguarde o deploy no Vercel terminar
2. Acesse: `https://anacli.com.br/blog/[qualquer-post]`
3. Role até a seção de comentários
4. Você deverá ver a caixa de comentários do Facebook
5. Faça login com sua conta do Facebook para testar

## Troubleshooting

### Comentários ainda não aparecem?

1. Limpe o cache do navegador
2. Teste em modo anônimo
3. Verifique o console do navegador (F12) para erros
4. Certifique-se de que o app está em modo público
5. Aguarde alguns minutos após publicar (pode levar até 10 minutos)

### Erro "App Not Setup"?

- Verifique se o domínio está configurado corretamente
- Certifique-se de que o app está publicado
- Confirme que as URLs de privacidade estão acessíveis

### Erro de CORS?

- Verifique se o domínio está na lista de domínios permitidos
- Certifique-se de estar usando HTTPS

## Configuração Atual no Código

O componente `FacebookComments` está configurado com:
- App ID: `4155112851395262`
- Versão da API: `v18.0`
- Idioma: `pt_BR`
- Número de comentários: 10
- Ordem: Mais recentes primeiro

## Próximos Passos

1. ✅ Páginas de privacidade criadas
2. ✅ Código dos comentários implementado
3. ⏳ Aguardando deploy no Vercel
4. ⏳ Configurar domínio no Facebook
5. ⏳ Adicionar URLs de privacidade
6. ⏳ Publicar o app
7. ⏳ Testar em produção

## Observações Importantes

- **Localhost não funciona**: Sempre teste em produção
- **HTTPS obrigatório**: O Facebook não aceita HTTP
- **Moderação**: Configure a moderação de comentários no painel do Facebook
- **Notificações**: Você pode configurar notificações por email para novos comentários
