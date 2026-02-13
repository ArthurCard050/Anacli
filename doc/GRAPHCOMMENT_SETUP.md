# Configuração do GraphComment

## O que é o GraphComment?

GraphComment é uma plataforma de comentários moderna, gratuita e fácil de usar. Oferece design bonito, moderação simples e suporte a múltiplos idiomas incluindo português.

## Vantagens do GraphComment

- ✅ Gratuito para sempre
- ✅ Design moderno e responsivo
- ✅ Suporte a português
- ✅ Login social (Facebook, Twitter, Google, Disqus)
- ✅ Moderação fácil
- ✅ Notificações por email
- ✅ Analytics integrado
- ✅ Sem anúncios
- ✅ Customizável

## Passos para Configurar

### 1. Criar Conta

1. Acesse: https://graphcomment.com/
2. Clique em **"Sign Up"** ou **"Get Started"**
3. Preencha:
   - Email
   - Senha
   - Nome do site: Anacli Blog
4. Confirme seu email

### 2. Adicionar Site

1. No dashboard, clique em **"Add Website"**
2. Preencha:
   - **Website Name**: Anacli Blog
   - **Website URL**: https://anacli.com.br
   - **Unique ID**: `anacli-blog` (já configurado no código)
3. Clique em **"Create"**

### 3. Configurar Idioma

1. No dashboard, vá em **Settings**
2. Em **Language**, selecione **"Portuguese (Brazil)"**
3. Salve as alterações

### 4. Personalizar Aparência

1. Vá em **Settings** > **Appearance**
2. Configure:
   - **Primary Color**: #A6C022 (verde da marca)
   - **Theme**: Light
   - **Position**: Bottom
3. Salve

### 5. Configurar Moderação

1. Vá em **Settings** > **Moderation**
2. Configure:
   - **Auto-approve**: Ativado (comentários aparecem imediatamente)
   - **Spam Filter**: Ativado
   - **Profanity Filter**: Ativado
3. Salve

### 6. Notificações

1. Vá em **Settings** > **Notifications**
2. Ative:
   - **New Comment**: Receber email quando alguém comentar
   - **Reply**: Receber email quando responderem
3. Adicione seu email
4. Salve

## Verificar Instalação

Após configurar:

1. Aguarde o deploy no Vercel (2-3 minutos)
2. Acesse qualquer post: `https://anacli.com.br/blog/[slug]`
3. Role até a seção de comentários
4. Você deve ver o widget do GraphComment
5. Teste fazendo um comentário

## Moderação

### Painel de Moderação

Acesse: https://graphcomment.com/admin/

Aqui você pode:
- Ver todos os comentários
- Aprovar/rejeitar comentários
- Responder comentários
- Banir usuários
- Ver estatísticas

### Ações Rápidas

- **Aprovar**: Comentário fica visível
- **Rejeitar**: Comentário é removido
- **Spam**: Marca como spam e treina o filtro
- **Ban**: Bloqueia o usuário permanentemente

## Recursos Avançados

### Analytics

No dashboard você pode ver:
- Total de comentários
- Comentários por dia/semana/mês
- Posts mais comentados
- Usuários mais ativos

### Widgets

GraphComment oferece widgets para:
- Comentários recentes
- Posts mais comentados
- Usuários mais ativos

### API

GraphComment tem API REST para:
- Listar comentários
- Criar comentários programaticamente
- Moderar via código

Documentação: https://graphcomment.com/api

### Exportação

Você pode exportar todos os comentários:
1. Dashboard > Settings > Export
2. Formato: JSON ou CSV
3. Download

## Customização Avançada

### Cores

No código já está configurado para usar a cor da marca (#A6C022). Para mudar:

```tsx
.gc-button {
  background-color: #SUA_COR !important;
}
```

### Posição

Para mudar a posição do widget:

```tsx
gc_params = {
  graphcomment_id: 'anacli-blog',
  fixed_header_height: 80, // Altura do header fixo
};
```

### Idioma

O GraphComment detecta automaticamente o idioma do navegador, mas você pode forçar português:

1. Dashboard > Settings > Language
2. Selecione "Portuguese (Brazil)"

## Troubleshooting

### Comentários não aparecem?

1. Verifique se o Unique ID está correto: `anacli-blog`
2. Limpe o cache do navegador
3. Teste em modo anônimo
4. Verifique o console (F12) para erros

### Widget não carrega?

1. Verifique se o domínio está correto no dashboard
2. Confirme que o site está ativo
3. Aguarde alguns minutos (pode levar até 5 minutos)

### Comentários em spam?

1. Acesse o painel de moderação
2. Vá em "Spam"
3. Aprove os comentários legítimos
4. O filtro aprende com suas ações

## Comparação com Outras Plataformas

| Recurso | GraphComment | Disqus | Facebook |
|---------|--------------|--------|----------|
| Gratuito | ✅ Sim | ⚠️ Limitado | ✅ Sim |
| Sem anúncios | ✅ Sim | ❌ Não | ✅ Sim |
| Português | ✅ Sim | ✅ Sim | ✅ Sim |
| Customizável | ✅ Sim | ⚠️ Limitado | ❌ Não |
| Moderação | ✅ Sim | ✅ Sim | ✅ Sim |
| Analytics | ✅ Sim | ✅ Sim | ❌ Não |
| API | ✅ Sim | ✅ Sim | ⚠️ Limitada |

## Planos

- **Free**: Gratuito para sempre
  - Comentários ilimitados
  - Sites ilimitados
  - Moderação completa
  - Analytics básico
  - Sem anúncios

- **Pro**: $9/mês (opcional)
  - Analytics avançado
  - Suporte prioritário
  - Customização avançada
  - Widgets premium

Para o blog da Anacli, o plano Free é mais que suficiente.

## Próximos Passos

1. ✅ Código implementado
2. ⏳ Criar conta no GraphComment
3. ⏳ Adicionar site com ID `anacli-blog`
4. ⏳ Configurar idioma para português
5. ⏳ Personalizar cores (#A6C022)
6. ⏳ Aguardar deploy
7. ⏳ Testar comentários

## Links Úteis

- Site oficial: https://graphcomment.com
- Dashboard: https://graphcomment.com/admin/
- Documentação: https://graphcomment.com/docs
- Suporte: support@graphcomment.com
