# 🧪 Guia de Teste - FASE 1: Sistema de Usuário

## 📋 **Checklist de Testes**

### ✅ **TESTE 1: Página de Login**
**URL**: `http://localhost:3000/usuario/login`

#### **O que verificar:**
- [ ] Página carrega sem erros
- [ ] Logo da Anacli aparece
- [ ] Formulário tem campos de email e senha
- [ ] Botão de mostrar/ocultar senha funciona
- [ ] Link "Esqueceu sua senha?" está presente
- [ ] Botão "Criar conta gratuita" redireciona para cadastro
- [ ] Dados de teste estão visíveis (caixa amarela)

#### **Teste de Login:**
1. **Credenciais corretas:**
   - Email: `joao.silva@email.com`
   - Senha: `senha123`
   - ✅ **Resultado esperado**: Login com sucesso, redirecionamento para `/usuario/dashboard`

2. **Credenciais incorretas:**
   - Email: `teste@teste.com`
   - Senha: `senha123`
   - ✅ **Resultado esperado**: Mensagem de erro "Email ou senha incorretos"

3. **Campos vazios:**
   - Deixar campos em branco
   - ✅ **Resultado esperado**: Botão desabilitado

---

### ✅ **TESTE 2: Página de Cadastro**
**URL**: `http://localhost:3000/usuario/cadastro`

#### **O que verificar:**
- [ ] Página carrega sem erros
- [ ] Todos os campos estão presentes (nome, email, senha, confirmar senha, telefone, CPF, data nascimento)
- [ ] Validação em tempo real funciona
- [ ] Formatação automática (CPF e telefone) funciona
- [ ] Link "Já tem conta? Fazer login" redireciona para login

#### **Teste de Cadastro:**
1. **Dados válidos:**
   - Nome: `Seu Nome Completo`
   - Email: `seuemail@teste.com`
   - Senha: `123456`
   - Confirmar Senha: `123456`
   - Telefone: `11999999999` (deve formatar para `(11) 99999-9999`)
   - CPF: `12345678900` (deve formatar para `123.456.789-00`)
   - ✅ **Resultado esperado**: Cadastro com sucesso, redirecionamento para dashboard

2. **Senhas diferentes:**
   - Senha: `123456`
   - Confirmar Senha: `654321`
   - ✅ **Resultado esperado**: Erro "Senhas não coincidem"

3. **Email inválido:**
   - Email: `emailinvalido`
   - ✅ **Resultado esperado**: Erro "Email inválido"

---

### ✅ **TESTE 3: Integração com Loja**
**URL**: `http://localhost:3000/loja`

#### **Teste sem login:**
1. Acesse a loja sem estar logado
2. Verifique o ícone de usuário no header (canto superior direito)
3. Clique no ícone de usuário
4. ✅ **Resultado esperado**: Redirecionamento para página de login

#### **Teste com login:**
1. Faça login primeiro (`/usuario/login`)
2. Acesse a loja (`/loja`)
3. Verifique o header - deve mostrar o nome do usuário
4. Clique no nome do usuário
5. ✅ **Resultado esperado**: Dropdown com "Minha Conta" e "Sair"
6. Clique em "Sair"
7. ✅ **Resultado esperado**: Logout, volta ao ícone de usuário simples

---

### ✅ **TESTE 4: Persistência de Sessão**

#### **Teste de persistência:**
1. Faça login na aplicação
2. Feche o navegador completamente
3. Abra novamente e acesse `/loja`
4. ✅ **Resultado esperado**: Usuário ainda logado (nome aparece no header)

#### **Teste de logout:**
1. Estando logado, clique em "Sair" no dropdown do usuário
2. Recarregue a página
3. ✅ **Resultado esperado**: Usuário deslogado (ícone simples no header)

---

### ✅ **TESTE 5: Redirecionamentos**

#### **Usuário já logado:**
1. Faça login na aplicação
2. Tente acessar `/usuario/login` diretamente
3. ✅ **Resultado esperado**: Redirecionamento automático para dashboard
4. Tente acessar `/usuario/cadastro` diretamente
5. ✅ **Resultado esperado**: Redirecionamento automático para dashboard

---

### ✅ **TESTE 6: Responsividade**

#### **Mobile:**
1. Abra as páginas em modo mobile (F12 > Toggle device toolbar)
2. Teste login e cadastro em tela pequena
3. ✅ **Resultado esperado**: Layout responsivo, formulários usáveis

---

## 🐛 **Problemas Conhecidos**

### **Dashboard não implementado:**
- Ao fazer login com sucesso, será redirecionado para `/usuario/dashboard`
- Esta página ainda não existe (será criada na FASE 2)
- ✅ **Comportamento atual**: Página 404 - isso é esperado!

---

## 📱 **Como Testar**

### **Passo a passo rápido:**
1. Abra `http://localhost:3000/usuario/login`
2. Use: `joao.silva@email.com` / `senha123`
3. Será redirecionado para dashboard (404 - normal)
4. Volte para `/loja` e veja seu nome no header
5. Teste o dropdown do usuário
6. Teste logout
7. Teste cadastro em `/usuario/cadastro`

### **URLs para testar:**
- 🔐 **Login**: `http://localhost:3000/usuario/login`
- 📝 **Cadastro**: `http://localhost:3000/usuario/cadastro`
- 🛒 **Loja**: `http://localhost:3000/loja`

---

## ✅ **Critérios de Sucesso**

A FASE 1 está funcionando corretamente se:
- ✅ Login funciona com credenciais corretas
- ✅ Cadastro cria novos usuários
- ✅ Sessão persiste entre recarregamentos
- ✅ Header da loja mostra estado do usuário
- ✅ Logout funciona corretamente
- ✅ Redirecionamentos automáticos funcionam
- ✅ Validações de formulário funcionam
- ✅ Interface é responsiva

---

**🚀 Pronto para testar! Relate qualquer problema encontrado.**