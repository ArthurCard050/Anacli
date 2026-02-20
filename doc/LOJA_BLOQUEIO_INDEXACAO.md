# Bloqueio de Indexação da Loja

## Objetivo
Impedir que os motores de busca (Google, Bing, etc.) indexem as páginas da loja enquanto ela está em desenvolvimento.

## Implementações Realizadas

### 1. Robots.txt
Arquivo: `public/robots.txt`

Adicionado bloqueio para todos os user-agents:
```
Disallow: /loja
Disallow: /loja-anacli
Disallow: /loja-login
```

Isso impede que crawlers acessem essas rotas.

### 2. Meta Tags Noindex

#### Layout da Loja (`src/app/loja/layout.tsx`)
Adicionado metadata com robots noindex:
```typescript
robots: {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
  },
}
```

#### Layout da Loja Anacli (`src/app/loja-anacli/layout.tsx`)
Criado layout com mesmas configurações de noindex.

#### Página de Login (`src/app/loja-login/page.tsx`)
Adicionado meta tag diretamente no componente:
```html
<meta name="robots" content="noindex, nofollow" />
```

## Proteção em Camadas

A loja está protegida de 3 formas:

1. **Robots.txt**: Primeira linha de defesa, informa aos crawlers para não acessar
2. **Meta Tags**: Caso um crawler ignore o robots.txt, as meta tags reforçam o bloqueio
3. **Autenticação com Senha**: Mesmo que alguém tente acessar, precisa da senha `123AnacliBR`

## Verificação

Para verificar se está funcionando:

1. Acesse: `https://seusite.com/robots.txt`
   - Deve mostrar as regras de bloqueio

2. Inspecione o HTML das páginas da loja:
   - Deve conter `<meta name="robots" content="noindex, nofollow">`

3. Google Search Console:
   - Após alguns dias, verifique se as páginas não aparecem no índice

## Quando Remover o Bloqueio

Quando a loja estiver pronta para ir ao ar:

1. Remover as linhas `Disallow: /loja*` do `robots.txt`
2. Alterar `index: false` para `index: true` nos layouts
3. Remover a meta tag noindex da página de login (ou manter se quiser que ela não seja indexada)

## Observações

- O bloqueio não é instantâneo, pode levar alguns dias para os motores de busca respeitarem
- Se páginas já foram indexadas, use o Google Search Console para solicitar remoção
- A autenticação com senha garante que mesmo com link direto, usuários não autorizados não acessam
