# Configuração do Disqus para Comentários

## O que é o Disqus?

Disqus é uma plataforma de comentários usada por milhões de sites. É gratuita, confiável e muito mais simples que o Facebook Comments.

## Vantagens do Disqus

- ✅ Configuração simples (5 minutos)
- ✅ Funciona imediatamente após configuração
- ✅ Moderação de comentários integrada
- ✅ Notificações por email
- ✅ Login social (Facebook, Twitter, Google)
- ✅ Sistema anti-spam
- ✅ Gratuito para sites pequenos/médios
- ✅ Sem anúncios no plano básico

## Passos para Configurar

### 1. Criar Conta no Disqus

1. Acesse: https://disqus.com/
2. Clique em **"Get Started"**
3. Escolha **"I want to install Disqus on my site"**
4. Preencha os dados:
   - **Website Name**: `anacli-blog` (já configurado no código)
   - **Category**: Health
   - **Language**: Portuguese

### 2. Escolher o Plano

1. Selecione o plano **"Basic"** (gratuito)
2. Clique em **"Subscribe Now"**

### 3. Configurar o Site

1. **Platform**: Selecione "I don't see my platform listed, install manually with Universal Code"
2. **Website URL**: `https://anacli.com.br`
3. **Shortname**: `anacli-blog` (importante: deve ser exatamente isso)

### 4. Configurações Importantes

No painel do Disqus (https://disqus.com/admin/):

#### General Settings
- **Website Name**: Anacli Blog
- **Website URL**: https://anacli.com.br
- **Shortname**: anacli-blog

#### Community Settings
- **Comment Policy**: Defina suas regras de comentários
- **Guest Commenting**: Ativado (permite comentar sem login)
- **Social Login**: Ativado (Facebook, Twitter, Google)

#### Moderation
- **Pre-moderation**: Desativado (comentários aparecem imediatamente)
- **Spam Filter**: Ativado (Disqus tem filtro automático)
- **Blacklist**: Adicione palavras que deseja bloquear

#### Email Notifications
- **New Comments**: Ativado (você recebe email quando alguém comenta)
- **Moderation Queue**: Ativado

### 5. Verificar Instalação

Após configurar:

1. Aguarde o deploy no Vercel (2-3 minutos)
2. Acesse qualquer post do blog: `https://anacli.com.br/blog/[slug]`
3. Role até a seção de comentários
4. Você deve ver a caixa de comentários do Disqus
5. Teste fazendo um comentário

## Moderação de Comentários

### Painel de Moderação

Acesse: https://disqus.com/admin/moderate/

Aqui você pode:
- Aprovar/rejeitar comentários
- Banir usuários
- Marcar como spam
- Responder comentários

### Notificações

Você receberá emails quando:
- Alguém comentar em um post
- Alguém responder seu comentário
- Um comentário for marcado como spam

## Personalização

### Aparência

No painel do Disqus, você pode personalizar:
- Cores do tema
- Fonte
- Layout (lista ou grid)
- Ordem dos comentários (mais recentes ou mais antigos primeiro)

### Regras de Comentários

Recomendamos adicionar em "Comment Policy":

```
Regras de Comentários:
1. Seja respeitoso com outros usuários
2. Não use linguagem ofensiva
3. Comentários com spam serão removidos
4. Mantenha os comentários relevantes ao tema do post
```

## Troubleshooting

### Comentários não aparecem?

1. Verifique se o shortname está correto: `anacli-blog`
2. Limpe o cache do navegador
3. Teste em modo anônimo
4. Aguarde alguns minutos (pode levar até 5 minutos para propagar)

### Erro "We were unable to load Disqus"?

1. Verifique se o site está acessível publicamente
2. Confirme que a URL no Disqus está correta
3. Desative bloqueadores de anúncios temporariamente

### Comentários em spam?

1. Acesse o painel de moderação
2. Vá em "Spam"
3. Aprove os comentários legítimos
4. O Disqus aprende com suas ações

## Migração Futura

Se no futuro você quiser migrar para outro sistema:

1. Disqus permite exportar todos os comentários
2. Formato: XML ou JSON
3. Acesse: Settings > Export

## Custos

- **Plano Basic**: Gratuito
  - Comentários ilimitados
  - Moderação básica
  - Sem anúncios (para sites pequenos)

- **Plano Plus**: $11/mês
  - Sem anúncios garantido
  - Suporte prioritário
  - Analytics avançado

Para o blog da Anacli, o plano Basic é suficiente.

## Próximos Passos

1. ✅ Código implementado
2. ⏳ Criar conta no Disqus
3. ⏳ Configurar site com shortname `anacli-blog`
4. ⏳ Aguardar deploy
5. ⏳ Testar comentários no site
6. ⏳ Configurar moderação e notificações

## Suporte

- Documentação: https://help.disqus.com/
- Suporte: https://disqus.com/support/
