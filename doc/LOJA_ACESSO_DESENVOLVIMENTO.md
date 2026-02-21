# Acesso à Loja em Desenvolvimento

## Como Acessar

A loja está disponível no site em produção, mas protegida por senha.

### URL de Acesso
```
https://seusite.com/loja
```

### Credenciais
- **Senha**: `123AnacliBR`

## Passo a Passo

1. Acesse: `https://seusite.com/loja`
2. Você será redirecionado para a página de login
3. Digite a senha: `123AnacliBR`
4. Clique em "Acessar Loja"
5. Você terá acesso por 7 dias (cookie de autenticação)

## Rotas Disponíveis

Após fazer login, você pode acessar:

- `/loja` - Página inicial da loja
- `/loja/exames` - Lista de exames
- `/loja/pacotes` - Pacotes fitness
- `/loja/ia-receituario` - Leitura de receituário com IA
- `/loja-anacli` - Versão alternativa da loja

## Proteção Contra Indexação

A loja está protegida de 3 formas:

1. **Senha de acesso** - Apenas quem tem a senha consegue acessar
2. **Robots.txt** - Bloqueia crawlers de motores de busca
3. **Meta tags noindex** - Impede indexação mesmo se crawlers ignorarem robots.txt

Isso significa que:
- ✅ A loja está no ar e acessível com senha
- ✅ Seu parceiro pode acessar normalmente
- ✅ Google e outros motores de busca NÃO vão indexar
- ✅ Usuários comuns não conseguem acessar sem senha

## Observações

- O cookie de autenticação dura 7 dias
- Após 7 dias, será necessário fazer login novamente
- A senha pode ser alterada no arquivo `middleware.ts` e `src/app/api/loja-auth/route.ts`
- Para remover a proteção por senha no futuro, basta remover o código do middleware

## Suporte

Se houver problemas de acesso:
1. Limpe os cookies do navegador
2. Tente em uma aba anônima
3. Verifique se a senha está correta (case-sensitive)
