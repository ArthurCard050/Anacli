# Configuração do Cusdis para Comentários

## O que é o Cusdis?

Cusdis é uma alternativa open-source, leve e focada em privacidade ao Disqus. É perfeito para blogs que querem comentários sem rastreamento ou anúncios.

## Vantagens do Cusdis

- ✅ Open-source e gratuito
- ✅ Sem anúncios
- ✅ Sem rastreamento de usuários
- ✅ Leve (apenas 5kb)
- ✅ Focado em privacidade
- ✅ Painel de moderação simples
- ✅ Notificações por email
- ✅ Pode ser self-hosted ou usar o serviço hospedado

## Opções de Hospedagem

### Opção 1: Serviço Hospedado (Recomendado - Mais Fácil)

Use o serviço oficial do Cusdis: https://cusdis.com

**Vantagens:**
- Configuração em 5 minutos
- Sem necessidade de servidor próprio
- Manutenção automática
- Gratuito

**Passos:**

1. Acesse: https://cusdis.com
2. Clique em "Get Started"
3. Crie uma conta (pode usar GitHub, Google ou email)
4. Crie um novo site:
   - **Website Name**: Anacli Blog
   - **Website URL**: https://anacli.com.br
5. Copie o **App ID** que será gerado
6. Substitua `YOUR_APP_ID_HERE` no arquivo `src/app/blog/components/CusdisComments.tsx` pelo seu App ID

### Opção 2: Self-Hosted (Avançado)

Se você quiser hospedar o Cusdis no seu próprio servidor:

1. Siga o guia: https://cusdis.com/doc#/self-host
2. Você precisará de:
   - Servidor Node.js
   - Banco de dados PostgreSQL
   - Domínio próprio

## Configuração Rápida (Serviço Hospedado)

### 1. Criar Conta

1. Acesse: https://cusdis.com
2. Clique em **"Sign in with GitHub"** ou **"Sign in with Google"**
3. Autorize o acesso

### 2. Adicionar Site

1. No dashboard, clique em **"Add Website"**
2. Preencha:
   - **Name**: Anacli Blog
   - **Domain**: anacli.com.br
3. Clique em **"Create"**

### 3. Obter App ID

1. Após criar o site, você verá o **App ID**
2. Copie esse ID (formato: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 4. Atualizar o Código

Abra o arquivo `src/app/blog/components/CusdisComments.tsx` e substitua:

```typescript
data-app-id="YOUR_APP_ID_HERE"
```

Por:

```typescript
data-app-id="seu-app-id-aqui"
```

### 5. Commit e Deploy

```bash
git add .
git commit -m "feat: configura App ID do Cusdis"
git push
```

## Moderação de Comentários

### Painel de Moderação

Acesse: https://cusdis.com/dashboard

Aqui você pode:
- Ver todos os comentários
- Aprovar/rejeitar comentários
- Responder comentários
- Deletar comentários
- Configurar notificações

### Configurações de Moderação

No dashboard do Cusdis:

1. Vá em **Settings** do seu site
2. Configure:
   - **Moderation**: Ativar para aprovar comentários manualmente
   - **Email Notifications**: Receber email quando houver novos comentários
   - **Webhook**: Integrar com outros serviços (opcional)

## Notificações por Email

### Configurar Notificações

1. No dashboard, vá em **Settings**
2. Ative **"Email Notification"**
3. Adicione seu email
4. Você receberá emails quando:
   - Alguém comentar
   - Alguém responder um comentário

### Webhook (Opcional)

Se quiser integrar com Slack, Discord ou outro serviço:

1. Vá em **Settings** > **Webhook**
2. Adicione a URL do webhook
3. Configure os eventos que deseja receber

## Personalização

### Tema

O Cusdis suporta tema claro e escuro. No código já está configurado como `light`:

```typescript
data-theme="light"
```

Para tema escuro, mude para:

```typescript
data-theme="dark"
```

### Idioma

Por padrão, o Cusdis detecta o idioma do navegador. Para forçar português:

```typescript
data-lang="pt-br"
```

## Recursos Avançados

### API

O Cusdis tem uma API REST para:
- Listar comentários
- Criar comentários programaticamente
- Moderar comentários via código

Documentação: https://cusdis.com/doc#/api

### Webhooks

Configure webhooks para:
- Notificar quando houver novos comentários
- Integrar com sistemas de moderação
- Sincronizar com banco de dados próprio

### Exportação de Dados

Você pode exportar todos os comentários:

1. Dashboard > Settings
2. Clique em **"Export Data"**
3. Baixe o arquivo JSON com todos os comentários

## Comparação: Cusdis vs Disqus

| Recurso | Cusdis | Disqus |
|---------|--------|--------|
| Open-source | ✅ Sim | ❌ Não |
| Gratuito | ✅ Sim | ⚠️ Com limitações |
| Sem anúncios | ✅ Sim | ❌ Tem anúncios |
| Privacidade | ✅ Excelente | ❌ Rastreia usuários |
| Tamanho | ✅ 5kb | ❌ 200kb+ |
| Self-hosting | ✅ Sim | ❌ Não |
| Moderação | ✅ Sim | ✅ Sim |
| Notificações | ✅ Sim | ✅ Sim |

## Troubleshooting

### Comentários não aparecem?

1. Verifique se o App ID está correto
2. Limpe o cache do navegador
3. Verifique o console do navegador (F12) para erros
4. Confirme que o domínio no Cusdis está correto

### Erro "Failed to load comments"?

1. Verifique se o script está carregando: https://cusdis.com/js/cusdis.es.js
2. Desative bloqueadores de anúncios temporariamente
3. Teste em modo anônimo

### Comentários não salvam?

1. Verifique se o site está ativo no dashboard do Cusdis
2. Confirme que o domínio está correto
3. Verifique se há erros no console

## Migração de Outros Sistemas

Se você já tem comentários em outro sistema:

1. Exporte os comentários do sistema antigo
2. Use a API do Cusdis para importar
3. Documentação: https://cusdis.com/doc#/migration

## Custos

- **Serviço Hospedado**: Gratuito
  - Comentários ilimitados
  - Sites ilimitados
  - Sem anúncios
  - Sem rastreamento

- **Self-hosted**: Custo do servidor
  - Controle total
  - Dados no seu servidor
  - Customização completa

## Próximos Passos

1. ✅ Código implementado
2. ⏳ Criar conta no Cusdis: https://cusdis.com
3. ⏳ Adicionar site e obter App ID
4. ⏳ Atualizar App ID no código
5. ⏳ Commit e push
6. ⏳ Aguardar deploy
7. ⏳ Testar comentários no site

## Links Úteis

- Site oficial: https://cusdis.com
- Documentação: https://cusdis.com/doc
- GitHub: https://github.com/djyde/cusdis
- Demo: https://cusdis.com/demo

## Suporte

- GitHub Issues: https://github.com/djyde/cusdis/issues
- Discord: https://discord.gg/cUsdisCommunity
- Email: support@cusdis.com
