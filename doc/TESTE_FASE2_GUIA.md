# 🧪 Guia de Teste - FASE 2: Dashboard do Usuário

## 📋 **Checklist de Testes**

### ✅ **TESTE 1: Acesso ao Dashboard**

#### **Cenário 1: Usuário Logado**
1. Faça login em `http://localhost:3000/usuario/login`
   - Email: `joao.silva@email.com`
   - Senha: `senha123`
2. ✅ **Resultado esperado**: Redirecionamento automático para `/usuario/dashboard`
3. ✅ **Verificar**: Dashboard carrega com dados do usuário

#### **Cenário 2: Usuário Não Logado**
1. Acesse diretamente `http://localhost:3000/usuario/dashboard` sem estar logado
2. ✅ **Resultado esperado**: Redirecionamento automático para `/usuario/login`

---

### ✅ **TESTE 2: Header do Dashboard**

#### **O que verificar:**
- [ ] Logo da Anacli aparece no canto superior esquerdo
- [ ] Texto "Minha Conta" aparece ao lado do logo
- [ ] Nome do usuário aparece no canto superior direito: "Olá, João Silva"
- [ ] Botão "Sair" está presente e visível
- [ ] Em mobile, apenas o ícone de logout aparece (sem texto)

#### **Teste de Logout:**
1. Clique no botão "Sair"
2. ✅ **Resultado esperado**: Logout realizado, redirecionamento para `/loja`
3. Tente acessar `/usuario/dashboard` novamente
4. ✅ **Resultado esperado**: Redirecionamento para login

---

### ✅ **TESTE 3: Seção de Boas-Vindas**

#### **O que verificar:**
- [ ] Título: "Bem-vindo de volta, João!"
- [ ] Subtítulo explicativo está presente
- [ ] Texto está legível e bem formatado

---

### ✅ **TESTE 4: Cards de Estatísticas**

#### **O que verificar:**
- [ ] 4 cards aparecem em uma linha (desktop)
- [ ] Cards empilham em 2 colunas (tablet)
- [ ] Cards empilham em 1 coluna (mobile)

#### **Dados esperados:**
- **Card 1 - Exames Agendados**: 
  - Ícone: Calendário azul
  - Número: 1
  - Texto: "Exames Agendados"
  
- **Card 2 - Resultados Pendentes**:
  - Ícone: Documento verde
  - Número: 1
  - Texto: "Resultados Pendentes"
  
- **Card 3 - Total de Exames**:
  - Ícone: Pacote roxo
  - Número: 3
  - Texto: "Total de Exames"
  
- **Card 4 - Notificações**:
  - Ícone: Sino laranja
  - Número: 2
  - Texto: "Notificações"

---

### ✅ **TESTE 5: Seção de Exames Recentes**

#### **O que verificar:**
- [ ] Título "Exames Recentes" aparece
- [ ] 3 exames são listados
- [ ] Cada exame mostra:
  - Nome do exame
  - Badge de status colorido
  - Data do agendamento
  - Local (Domiciliar ou Laboratório)
  - Valor em R$
- [ ] Botão "Ver todos os exames" aparece no rodapé

#### **Exames esperados:**
1. **Hemograma Completo**
   - Status: Agendado (azul)
   - Data: 15/03/2024
   - Local: Laboratório
   - Valor: R$ 45.00

2. **Check-up Completo**
   - Status: Coletado (amarelo)
   - Data: 08/03/2024
   - Local: Domiciliar
   - Valor: R$ 280.00

3. **Glicemia de Jejum**
   - Status: Pronto (verde)
   - Data: 01/03/2024
   - Local: Laboratório
   - Valor: R$ 25.00

#### **Teste de Hover:**
- Passe o mouse sobre cada exame
- ✅ **Resultado esperado**: Background muda para cinza claro

---

### ✅ **TESTE 6: Seção de Resultados Disponíveis**

#### **O que verificar:**
- [ ] Título "Resultados Disponíveis" aparece
- [ ] 2 resultados são listados
- [ ] Cada resultado mostra:
  - Nome do exame
  - Badge de status
  - Data de criação
  - Botão de download (quando status = "Pronto")

#### **Resultados esperados:**
1. **Glicemia de Jejum**
   - Status: Pronto (verde)
   - Data: 02/03/2024
   - Botão: "📄 Baixar resultado" (visível)

2. **Check-up Completo**
   - Status: Processando (laranja)
   - Data: 08/03/2024
   - Botão: Não aparece (ainda processando)

---

### ✅ **TESTE 7: Painel de Notificações (Sidebar)**

#### **O que verificar:**
- [ ] Card "Notificações" aparece na sidebar direita
- [ ] 2 notificações não lidas são exibidas
- [ ] Cada notificação mostra:
  - Título em negrito
  - Mensagem completa
  - Data de criação

#### **Notificações esperadas:**
1. **Resultado Disponível**
   - Mensagem: "O resultado do seu exame de Glicemia de Jejum está pronto para download."
   - Data: 02/03/2024

2. **Lembrete de Exame**
   - Mensagem: "Você tem um exame agendado para amanhã às 08:00. Lembre-se do jejum de 12 horas."
   - Data: 14/03/2024

---

### ✅ **TESTE 8: Ações Rápidas (Sidebar)**

#### **O que verificar:**
- [ ] Card "Ações Rápidas" aparece na sidebar
- [ ] 3 botões estão presentes:
  - 📦 Agendar Exame
  - 👤 Meus Dados
  - 📄 Histórico

#### **Teste de Links:**
1. Clique em "Agendar Exame"
2. ✅ **Resultado esperado**: Redirecionamento para `/loja`

---

### ✅ **TESTE 9: Responsividade**

#### **Desktop (>1024px):**
- [ ] Layout em 3 colunas (2 principais + 1 sidebar)
- [ ] Cards de estatísticas em 4 colunas
- [ ] Sidebar fixa à direita

#### **Tablet (768px - 1024px):**
- [ ] Layout em 2 colunas
- [ ] Cards de estatísticas em 2 colunas
- [ ] Sidebar abaixo do conteúdo principal

#### **Mobile (<768px):**
- [ ] Layout em 1 coluna
- [ ] Cards de estatísticas empilhados
- [ ] Sidebar abaixo do conteúdo
- [ ] Texto "Olá, João Silva" oculto no header
- [ ] Apenas ícone de logout visível

---

### ✅ **TESTE 10: Loading States**

#### **Teste de carregamento:**
1. Faça logout
2. Faça login novamente
3. Observe o dashboard carregando
4. ✅ **Resultado esperado**: 
   - Spinner de loading aparece
   - Dados carregam após ~1 segundo
   - Transição suave

---

### ✅ **TESTE 11: Estados Vazios**

#### **Cenário: Usuário sem dados**
Para testar, você precisaria modificar temporariamente o mock-data para retornar arrays vazios.

**Estados vazios esperados:**
- Exames: "Nenhum exame agendado"
- Resultados: "Nenhum resultado disponível"
- Notificações: "Nenhuma notificação"

---

## 🎯 **Fluxo Completo de Teste**

### **Teste End-to-End:**
1. ✅ Acesse `/usuario/login`
2. ✅ Faça login com credenciais corretas
3. ✅ Verifique redirecionamento para dashboard
4. ✅ Confirme que todos os dados aparecem
5. ✅ Teste hover em cards e exames
6. ✅ Clique em "Agendar Exame" e volte
7. ✅ Faça logout
8. ✅ Tente acessar dashboard (deve redirecionar)
9. ✅ Faça login novamente
10. ✅ Teste em diferentes tamanhos de tela

---

## 🐛 **Problemas Conhecidos**

### **Funcionalidades Preparadas (Não Implementadas):**
- Botão "Ver todos os exames" - Preparado para FASE 3
- Botão "Meus Dados" - Preparado para FASE 3
- Botão "Histórico" - Preparado para FASE 3
- Botão "Baixar resultado" - Preparado para integração com backend

---

## ✅ **Critérios de Sucesso**

A FASE 2 está funcionando corretamente se:
- ✅ Dashboard carrega após login
- ✅ Todos os 4 cards de estatísticas aparecem
- ✅ Exames recentes são listados (3 itens)
- ✅ Resultados disponíveis aparecem (2 itens)
- ✅ Notificações são exibidas (2 itens)
- ✅ Ações rápidas estão presentes
- ✅ Logout funciona corretamente
- ✅ Redirecionamento de segurança funciona
- ✅ Layout é responsivo
- ✅ Hover states funcionam

---

**🚀 Dashboard pronto para uso! Teste e reporte qualquer problema.**
